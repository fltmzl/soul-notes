import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { v4 } from "uuid";

const useQuillCustom = () => {
  const { quill, quillRef, Quill } = useQuill({ theme: "snow", placeholder: "Description" });

  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  const saveToServer = (file) => {
    const imageRef = ref(storage, `image/${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        insertToEditor(downloadURL);
      });
    });
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      console.log("save to server");
      saveToServer(file);
    };
  };

  useEffect(() => {
    if (!quill) return;

    quill.getModule("toolbar").addHandler("image", selectLocalImage);
  }, [quill]);

  return { quill, quillRef, Quill };
};

export default useQuillCustom;
