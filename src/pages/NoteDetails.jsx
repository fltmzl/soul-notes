import Tiptap from "../components/Input/Tiptap";
import * as Y from "yjs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { encode, decode } from "uint8-to-b64/browser";
import { debounce } from "../utils";
import useTiptap from "../hooks/useTiptap";
import useUpdateValue from "../hooks/useUpdateValue";
import useCreateValue from "../hooks/useCreateValue";
import useGetOneNote from "../hooks/useGetOneNote";
import { serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

const NoteDetails = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { editor, ydoc } = useTiptap(id);
  const [updateValue, isLoadingUpdate, errorUpdate] = useUpdateValue();
  const [createValue, isLoadingCreate, errorCreate, createdNoteID] = useCreateValue();
  const [note, isLoadingGet, errorGet] = useGetOneNote(id);

  // Create New Note if Note not available yet
  useEffect(() => {
    if (!user || isLoadingGet || !errorGet) return;

    // if note not found, create New Note
    if (errorGet.message === "not-found") {
      createValue("notes", id, {
        body: "",
        collaborators: [user.uid],
        excerpt: "",
        details: {},
        user_id: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }, [user, isLoadingGet, errorGet]);

  // Get Initial Ydoc
  useEffect(() => {
    if (isLoadingGet || errorGet || !note || !ydoc) return;

    if (note.body) {
      Y.applyUpdate(ydoc, decode(note.body));
    }
  }, [note, isLoadingGet, ydoc, errorGet]);

  // Save to DB every update
  useEffect(() => {
    if (!editor || !ydoc || !note) return;

    const handlerUpdate = debounce(() => {
      const encodedBody = encode(Y.encodeStateAsUpdate(ydoc));
      const updateID = createdNoteID ?? note.id;

      updateValue("notes", updateID, {
        body: encodedBody,
        excerpt: editor.getHTML(),
        updatedAt: serverTimestamp(),
      });
    }, 500);

    ydoc.on("update", handlerUpdate);

    return () => {
      ydoc.off("update", handlerUpdate);
    };
  }, [editor, ydoc, note, createdNoteID]);

  return (
    <div className="w-full overflow-y-auto">
      <Tiptap editor={editor} />
    </div>
  );
};

export default NoteDetails;
