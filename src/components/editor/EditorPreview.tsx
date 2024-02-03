"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import { StarterKit } from "@/lib/tiptap/extensions/StarterKit";
import { Heading } from "@/lib/tiptap/extensions/Heading";

interface EditorPreviewProps {
  description: string;
}

export default function EditorPreview({ description }: EditorPreviewProps) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: false,
        }),
        Heading,
        Placeholder.configure({
          placeholder: "Add a description...",
        }),
      ],
      editorProps: {
        attributes: {
          class: "focus-visible:outline-none",
        },
      },
      content: description,
    },
    [description]
  );

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} spellCheck={false} />;
}
