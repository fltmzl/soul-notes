import { BsFillTrashFill } from "react-icons/bs";
import Button from "../Button";
import { motion } from "framer-motion";

const DeleteDialog = ({ onDelete, onCancel }) => {
  const stopBubbling = (e) => e.stopPropagation();

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.07,
      },
    },
  };

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 grid place-content-center p-5 bg-customDark-100/80" onClick={onCancel}>
      <div className="relative text-center bg-customPrimary px-8 pt-10 pb-5 max-w-xs rounded-xl" onClick={stopBubbling}>
        <div className="flex justify-center p-3 rounded-full bg-customPrimary absolute left-1/2 -translate-x-1/2 -top-9">
          <BsFillTrashFill className="text-5xl text-red-500" />
        </div>
        <h3 className="text-base mb-5">Are you sure you want to delete this note?</h3>
        <p className="text-xs text-customGray-50 mb-9">
          The note that you delete will be moved to the trash, and will be <strong>permanently deleted in 7 days</strong>
        </p>
        <div className="flex justify-end gap-5">
          <Button size={"sm"} fit className={"bg-transparent"} onClick={onCancel} tabIndex={"1"}>
            Cancel
          </Button>
          <Button size={"sm"} fit className={"bg-red-500 hover:bg-red-600"} onClick={onDelete} tabIndex={"2"}>
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteDialog;
