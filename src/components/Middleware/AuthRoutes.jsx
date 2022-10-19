import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const AuthRoutes = () => {
  const { user, loadingAuth } = useAuthContext();

  if (loadingAuth) {
    return null;
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default AuthRoutes;
