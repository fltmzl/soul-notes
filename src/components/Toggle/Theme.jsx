import useTheme from "../../hooks/useTheme";

const Theme = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="bg-orange-700">
      <button onClick={toggleTheme}>{theme}</button>
    </div>
  );
};

export default Theme;
