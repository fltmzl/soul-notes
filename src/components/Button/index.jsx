const Button = ({ type = "button", size, fit, children, className, onClick, ...others }) => {
  let sizeClassname = "py-3 px-4 text-lg rounded-xl";
  switch (size) {
    case "base":
      sizeClassname = "py-3 px-4 text-lg rounded-xl";
      break;
    case "sm":
      sizeClassname = "py-2 px-4 text-xs rounded-md";
      break;
    default:
      break;
  }

  return (
    <button type={type} className={`${fit ? "w-fit" : "w-full"} ${sizeClassname} text-customLight-50 bg-primary font-semibold flex justify-center items-center transition-all duration-300 ${className}`} onClick={onClick} {...others}>
      {children || "Button"}
    </button>
  );
};

export default Button;
