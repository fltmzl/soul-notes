import Masonry from "react-masonry-css";
import NoteCard from "../Card/NoteCard";
import { useState } from "react";
import DeleteDialog from "../Dialog/DeleteDialog";
import useDeleteValue from "../../hooks/useDeleteValue";
import { AnimatePresence } from "framer-motion";
import useGetArchivedNotes from "../../hooks/useGetArchivedNotes";
import HeaderNotesContainer from "./HeaderNotesContainer";
import NotesNotfound from "../Notfound/NotesNotfound";
import NotesSkeleton from "../Loading/NotesSkeleton";

const ArchivedNotesContainer = () => {
  const [notes, loadingNotes] = useGetArchivedNotes();
  const [deleteValue] = useDeleteValue();
  const [deleteDialog, setDeleteDialog] = useState({
    show: false,
    id: null,
  });

  const showDeleteDialog = (id) => {
    setDeleteDialog({
      show: true,
      id,
    });
  };

  const onDelete = () => {
    deleteValue("notes", deleteDialog.id);
    setDeleteDialog({
      show: false,
      id: null,
    });
  };

  const onCancel = () => {
    setDeleteDialog({
      show: false,
      id: null,
    });
  };

  const breakpointColumnsObj = {
    default: 5,
    1900: 4,
    1300: 3,
    1000: 2,
    620: 1,
  };

  if (!loadingNotes && !notes.length) {
    return <NotesNotfound />;
  }

  return (
    <>
      <HeaderNotesContainer totalNotes={notes.length} />

      {loadingNotes ? (
        <NotesSkeleton />
      ) : (
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {notes.map((note, index) => {
            return <NoteCard key={index} item={note} onDelete={() => showDeleteDialog(note.id)} delayAnimation={index} isArchived />;
          })}
        </Masonry>
      )}

      <AnimatePresence>{deleteDialog.show && <DeleteDialog onDelete={onDelete} onCancel={onCancel} />}</AnimatePresence>
    </>
  );
};

export default ArchivedNotesContainer;
