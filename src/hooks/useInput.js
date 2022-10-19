import { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  return [value, handleChangeValue, setValue];
};

export default useInput;
