import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import { useContext } from "react";
import useInput from "@/hooks/useInput";
import Button from "../Button";
import { db } from "@/config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContext";

const NewNoteForm = () => {
  const { user, loadingAuth } = useContext(AuthContext);
  const { quill, quillRef } = useQuill({ theme: "snow", placeholder: "Description" });
  const [title, handleTitle, setValue] = useInput("");

  const onSave = async (e) => {
    e.preventDefault();

    try {
      const addedNote = await addDoc(collection(db, "notes"), {
        title,
        body: quill.root.innerHTML,
        user_id: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={onSave} className="space-y-6 p-5">
      <input type="text" className="form-input rounded-none border-0 border-b focus:ring-0 focus:border-primary" placeholder="Title" value={title} onChange={handleTitle} />
      <div className={`w-full bg-customLight-50 dark:bg-customDark-50`}>
        <div ref={quillRef} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default NewNoteForm;
