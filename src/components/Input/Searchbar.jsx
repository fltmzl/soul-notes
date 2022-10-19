import { IoIosSearch } from "react-icons/io";

const Searchbar = ({ onChange, value, ...others }) => {
  return (
    <div className="relative max-w-[200px]">
      <label htmlFor="searchbar" className="absolute text-2xl translate-y-1/2 translate-x-3 text-primary">
        <IoIosSearch />
      </label>
      <input type="text" className="pl-12 form-input border-customGray-50 dark:border-customGray-100 text-sm" placeholder="Search By Title" id="searchbar" name="searchbar" value={value} onChange={onChange} {...others} />
    </div>
  );
};

export default Searchbar;
