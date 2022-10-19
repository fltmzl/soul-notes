import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import MainLayout from "../Layout/MainLayout";

const ProtectedRoutes = () => {
  const { user, loadingAuth } = useAuthContext();

  if (loadingAuth) {
    return null;
  }

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  return <MainLayout />;
};

export default ProtectedRoutes;
