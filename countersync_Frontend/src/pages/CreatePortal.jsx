import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CREATE_DESK_URL = `http://localhost:3000/countersync/desk/create`;

const CreatePortal = () => {
  const [desk, setDesk] = useState({
    deskName: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const response = await fetch(CREATE_DESK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(desk),
      });

      const res_data = await response.json();

      if (!response.ok) {
        toast.error(
          res_data.extraDetails || res_data.errMsg
        );
        return;
      } 

      console.log(response);
        setDesk({
          deskName: "",
          password: "",
        });
        toast.success("Portal Created Successfully");
        navigate("/login");
    } catch (err) {
      console.log("error error", err);
      toast.error("Server error. Try again.");
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePortal;
