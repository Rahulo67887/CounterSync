import { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const LogOut = () => {
  const { logOutUser } = useAuth();

  useEffect(() => {
    toast.success("Logged out Successfully");
    console.log("hii");
    logOutUser();
  }, [logOutUser]);

  return (
    <>
      <Navigate to="/login" />;
    </>
  );
};

export default LogOut;
