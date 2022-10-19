import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { v4 } from "uuid";

const AddNoteBtn = ({ onClick, ...others }) => {
  return (
    <Link to={`/notes/${v4()}`}>
      <button className="flex gap-2 w-fit items-center text-customLight-50 bg-primary rounded-lg py-2 px-4" onClick={onClick} {...others}>
        <BiPlus />
        <p>Add Note</p>
      </button>
    </Link>
  );
};

export default AddNoteBtn;
