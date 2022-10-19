import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useAuthContext } from "../context/AuthContext";

const useTiptap = (roomName) => {
  const { user } = useAuthContext();
  const [editor, setEditor] = useState(null);
  const ydoc = useMemo(() => new Y.Doc(), []);

  const getRandomName = useCallback(() => {
    const names = ["Rizki", "Cumi", "Lumba", "Paus"];
    const randomIndex = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    return names[randomIndex];
  }, []);

  useEffect(() => {
    if (!roomName || !user) return;

    const provider = new WebrtcProvider(roomName, ydoc);

    const editor = new Editor({
      extensions: [
        Highlight,
        Image,
        Link,
        Subscript,
        Superscript,
        StarterKit.configure({
          history: false,
        }),
        Placeholder.configure({
          placeholder: "My Custom Placeholder",
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: getRandomName(),
            color: "#f783ac",
          },
        }),
      ],
    });

    setEditor(editor);

    return () => {
      provider.destroy();
    };
  }, [roomName, ydoc, user]);

  return { editor, ydoc };
};

export default useTiptap;
