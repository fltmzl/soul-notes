import { EditorContent } from "@tiptap/react";
import TiptapMenubar from "./TiptapMenubar";

const Tiptap = ({ editor }) => {
  return (
    <div className="mx-auto flex flex-col items-center">
      <TiptapMenubar editor={editor} />
      <EditorContent editor={editor} className="prose dark:prose-invert prose-stone w-full" />
    </div>
  );
};

export default Tiptap;
