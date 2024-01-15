import { Navigate, Outlet } from "react-router-dom";

const ProtectedLogin = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return <Navigate to={"/"} />;
  }
  return <>{children || <Outlet />}</>;
};

export default ProtectedLogin;
