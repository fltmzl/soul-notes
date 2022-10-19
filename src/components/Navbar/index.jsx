import NavbarBrand from "./NavbarBrand";
import NavbarLink from "./NavbarLink";
import NavbarUser from "./NavbarUser";
import { AiOutlineTags } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { BsFolder2Open } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { HiOutlineTrash } from "react-icons/hi";
import NavbarLinkGroup from "./NavbarLinkGroup";
import useGetTags from "../../hooks/useGetTags";
import Theme from "../Toggle/Theme";

const Navbar = () => {
  const [tags, isLoading] = useGetTags();

  return (
    <nav className="flex flex-col justify-between py-7 pl-5 w-fit md:w-52 h-full bg-customPrimary overflow-y-auto transition-all duration-300 ease-out">
      <div>
        <div className="mb-8 flex justify-center">
          <NavbarBrand />
        </div>
        <div>
          <NavbarLink end to="/" icon={<CgNotes />} text={"All Notes"} />
          <NavbarLink to="/archive" icon={<BiArchiveIn />} text={"Archive"} />
          <NavbarLinkGroup icon={<AiOutlineTags />} text={"Tags"} />
          <div className="pl-8">
            {isLoading ? (
              <span>loading</span>
            ) : (
              <>
                {tags.map((tag, index) => (
                  <NavbarLink key={index} to={`/tags/${tag.id}`} icon={<AiOutlineTags />} text={tag.name} />
                ))}
              </>
            )}
          </div>
          <NavbarLinkGroup icon={<BsFolder2Open />} text={"Categories"} />
          <NavbarLink to="/trash" icon={<HiOutlineTrash />} text={"Trash"} />
        </div>
      </div>
      <Theme />
      <div>
        <NavbarUser />
      </div>
    </nav>
  );
};

export default Navbar;
