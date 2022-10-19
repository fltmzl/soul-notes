import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsPinAngle } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { VscSymbolColor } from "react-icons/vsc";
import Tag from "../Button/Tag";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import parse from "html-react-parser";
import ActionBtn from "../Button/ActionBtn";
import { motion } from "framer-motion";
import useUpdateValue from "../../hooks/useUpdateValue";
import { useAuthContext } from "../../context/AuthContext";
import { getColorClassname, getDateString } from "../../utils";
import { Link } from "react-router-dom";

const NoteCard = ({ item, onDelete, delayAnimation, isArchived = false }) => {
  const { user } = useAuthContext();
  const [updateValue] = useUpdateValue();
  // const itemDetails = item.details[user.uid];
  // const cardColor = getColorClassname(itemDetails.color);
  const cardColor = getColorClassname("default");

  const moveToArchive = () => {
    updateValue("notes", item.id, {
      [`details.${user.uid}.archived`]: true,
    });
  };

  const unarchive = () => {
    updateValue("notes", item.id, {
      [`details.${user.uid}.archived`]: false,
    });
  };

  const cardVariants = {
    hidden: {
      x: -100,
      y: 50,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: delayAnimation * 0.15,
      },
    },
  };

  return (
    <>
      <motion.article variants={cardVariants} initial="hidden" animate="visible" className={`${cardColor} rounded-xl p-5 space-y-3`}>
        <Link to={`/notes/${item.id}`}>
          <h6 className="text-customGray-50 text-xs">Sat, 20 Oct</h6>
          <div className="max-h-52 overflow-hidden min-h-[20px]">{parse(item.excerpt)}</div>
        </Link>
        <div className="flex flex-wrap gap-2 py-4">
          <Tag label="Tugas" />
          <Tag label="Golang" />
          <Tag label="Test" />
        </div>
        <div className="flex gap-2 justify-end text-lg text-customGray-100 dark:text-customGray-50">
          <ActionBtn iconComponent={<AiOutlineUsergroupAdd />} dropdown={<DropdownEl />} />
          <ActionBtn iconComponent={<BsPinAngle />} dropdown={<DropdownEl />} />
          <ActionBtn iconComponent={<MdFavoriteBorder />} dropdown={<DropdownEl />} />
          <ActionBtn iconComponent={<VscSymbolColor />} />
          {isArchived ? (
            <>
              <ActionBtn iconComponent={<BiArchiveOut />} onClick={unarchive} />
            </>
          ) : (
            <>
              <ActionBtn iconComponent={<BiArchiveIn />} onClick={moveToArchive} />
            </>
          )}
          <ActionBtn iconComponent={<FiTrash2 />} onClick={onDelete} />
        </div>
      </motion.article>
    </>
  );
};

const DropdownEl = () => {
  return (
    <div className="absolute bottom-8 text-xs p-1 w-24 bg-red-50">
      <div>Link 1</div>
      <div>Link 2</div>
      <div>Link 3</div>
    </div>
  );
};

export default NoteCard;
