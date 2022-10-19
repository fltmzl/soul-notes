import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NavbarUser = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button className="flex items-center justify-between w-full px-3" onClick={handleLogout}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-500"></div>
        <p className="hidden lg:block">Admin Test</p>
      </div>
      <IoIosArrowDown />
    </button>
  );
};

export default NavbarUser;
