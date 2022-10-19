import { ImFileEmpty } from "react-icons/im";

const NotesNotfound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="text-7xl text-customGray-100">
        <ImFileEmpty />
      </div>
      <p className="text-xl text-customGray-100">No Notes</p>
    </div>
  );
};

export default NotesNotfound;
