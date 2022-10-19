import { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import useCloseDropdown from "../../hooks/useCloseDropdown";

const ActionBtn = ({ iconComponent, dropdown, onClick, ...others }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { domRef } = useCloseDropdown(() => {
    setIsDropdownOpen(false);
  });

  const dropdownVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const handleClick = (e) => {
    if (dropdown) {
      setIsDropdownOpen((prev) => !prev);
    }

    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <button ref={domRef} onClick={handleClick} className="relative hover:bg-primary/10 hover:text-primary p-1 rounded-full transition-all duration-300" {...others}>
      <span>{iconComponent || <AiOutlineUsergroupAdd />}</span>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden" transition={{ duration: 0.2, ease: "easeIn" }}>
            {dropdown}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ActionBtn;
