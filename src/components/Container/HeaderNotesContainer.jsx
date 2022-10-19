import { BiSortDown } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { HiOutlineFilter } from "react-icons/hi";

const HeaderNotesContainer = ({ totalNotes }) => {
  return (
    <div className="flex justify-between text-customGray-50 my-6">
      <div className="text-xs">
        <p>{totalNotes} Notes</p>
      </div>
      <div className="flex gap-2">
        <BsGridFill />
        <BiSortDown />
        <HiOutlineFilter />
      </div>
    </div>
  );
};

export default HeaderNotesContainer;
