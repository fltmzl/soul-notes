import { BsTypeBold } from "react-icons/bs";
import { MdFormatClear, MdHorizontalRule } from "react-icons/md";
import { RiCodeBoxFill } from "react-icons/ri";
import { CgSpaceBetweenV } from "react-icons/cg";
import { ImQuotesLeft } from "react-icons/im";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BiItalic, BiStrikethrough, BiCodeAlt, BiParagraph, BiUndo, BiRedo, BiImageAdd } from "react-icons/bi";
import { useCallback } from "react";
import { uploadImage } from "../../utils";

const TiptapMenubar = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = uploadImage();
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-menubar">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is-active" : ""}>
        <BsTypeBold />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "is-active" : ""}>
        <BiItalic />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "is-active" : ""}>
        <BiStrikethrough />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={editor.isActive("code") ? "is-active" : ""}>
        <BiCodeAlt />
      </button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <MdFormatClear />
      </button>
      <button type="button" onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive("paragraph") ? "is-active" : ""}>
        <BiParagraph />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
        H<span className="text-sm">1</span>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
        H<span className="text-sm">2</span>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}>
        H<span className="text-sm">3</span>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}>
        H<span className="text-sm">4</span>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
        <AiOutlineUnorderedList />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
        <AiOutlineOrderedList />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? "is-active" : ""}>
        <RiCodeBoxFill />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is-active" : ""}>
        <ImQuotesLeft />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <MdHorizontalRule />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setHardBreak().run()}>
        <CgSpaceBetweenV />
      </button>
      <button type="button" onClick={addImage}>
        <BiImageAdd />
      </button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive("highlight") ? "is-active" : ""}>
        toggleHighlight
      </button>
      <button onClick={setLink} className={editor.isActive("link") ? "is-active" : ""}>
        setLink
      </button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")}>
        unsetLink
      </button>
      <button onClick={() => editor.chain().focus().toggleSubscript().run()} className={editor.isActive("subscript") ? "is-active" : ""}>
        toggleSubscript
      </button>
      <button onClick={() => editor.chain().focus().toggleSuperscript().run()} className={editor.isActive("superscript") ? "is-active" : ""}>
        toggleSuperscript
      </button>
      <button type="button" onClick={() => editor.commands.undo()} disabled={!editor.can().chain().focus().undo().run()}>
        <BiUndo />
      </button>
      <button type="button" onClick={() => editor.commands.redo()} disabled={!editor.can().chain().focus().redo().run()}>
        <BiRedo />
      </button>
    </div>
  );
};

export default TiptapMenubar;
