import { CgNotes } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const NavbarLink = ({ to = "/", end = false, text, icon }) => {
  return (
    <NavLink end={end} to={to} className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}>
      <span className="text-base">{icon || <CgNotes />}</span>
      <span className="text-sm hidden md:block whitespace-nowrap">{text}</span>
    </NavLink>
  );
};

export default NavbarLink;
