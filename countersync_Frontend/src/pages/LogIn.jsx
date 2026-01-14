import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const LOGIN_URL = `http://localhost:3000/countersync/desk/login`;

const LogIn = () => {
  const [desk, setDesk] = useState({
    deskName: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setDesk({
      ...desk,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(desk);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(desk),
      });

      const res_data = await response.json();

      if (!response.ok) {
        console.log(response);
        toast.error(
          res_data.extraDetails || res_data.errMsg
        );
        console.log("Invalid Credentials");
        return;
      } 

      console.log(response);
      setDesk({
          deskName: "",
          password: "",
        });

        login(res_data.token);
        toast.success("Login Successfull");
        navigate("/");
    } 
    catch (err) {
      console.error(err);
      toast.error("Unable to login");
    }
  };


  return (
    <div className="hero-container">
      <div className="create-rectangle">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="InputDeskInfo" className="form-label create-text">
              Desk Name
            </label>
            <input
              type="text"
              name="deskName"
              className="form-control-lg create-input"
              id="InputDeskInfo"
              value={desk.deskName}
              onChange={handleInput}
              required
            />
          </div>


          <div className="mb-3">
            <label htmlFor="InputPassword1" className="form-label create-text">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control-lg create-input"
              id="InputPassword1"
              value={desk.password}
              onChange={handleInput}
              required
            />
          </div>


          <button type="submit" className="btn btn-primary btn-text">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
