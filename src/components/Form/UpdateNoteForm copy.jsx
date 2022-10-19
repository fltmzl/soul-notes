import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import { useContext, useEffect, useState } from "react";
import useInput from "@/hooks/useInput";
import Button from "../Button";
import { db } from "@/config/firebase";
import { doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

const UpdateNoteForm = () => {
  const { user, loadingAuth } = useContext(AuthContext);
  const { query } = useRouter();
  const { quill, quillRef } = useQuill({ theme: "snow", placeholder: "Description" });
  const [title, handleTitle, setValue] = useInput("");
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("jalan 1");
    let unsubscribe = () => {};

    if (quill && query.notes) {
      console.log("jalan 2");
      const docRef = doc(db, "notes", query.notes);

      const unsub = onSnapshot(
        docRef,
        (doc) => {
          const note = doc.data();
          console.log("jalan 3");
          if (note) {
            console.log("jalan 4");
            setNote({ id: doc.id, ...note });
            setValue(note.title);
            quill.clipboard.dangerouslyPasteHTML(note.body);
          }
        },
        (error) => {
          console.log(error.message);
        }
      );

      setLoading(false);
      unsubscribe = unsub;
    }

    return () => unsubscribe();
  }, [query.notes, quill]);

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const noteRef = doc(db, "notes", note.id);
      const updatedNote = await updateDoc(noteRef, {
        title: title,
        body: quill.root.innerHTML,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // if (loading) {
  //   return <h1>loading</h1>;
  // }

  // if (Object.keys(note).length === 0) {
  //   return <h1>Note tidak ditemukan</h1>;
  // }

  return (
    <form onSubmit={onUpdate} className="space-y-6 p-5">
      <input type="text" className="form-input rounded-none border-0 border-b focus:ring-0 focus:border-primary" placeholder="Title" value={title} onChange={handleTitle} />
      <div className={`w-full bg-customLight-50 dark:bg-customDark-50`}>
        <div ref={quillRef} />
      </div>
      <Button type="submit">Edit</Button>
    </form>
  );
};

export default UpdateNoteForm;
