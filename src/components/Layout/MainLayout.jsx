import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <div className="flex bg-customLight-100 dark:bg-customDark-100 w-full h-full">
      <aside className="hidden sm:block">
        <Navbar />
      </aside>
      <Outlet />
    </div>
  );
};

export default MainLayout;
