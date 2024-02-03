"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Placeholder } from "@tiptap/extension-placeholder";
import MenuBar from "@/components/editor/MenuBar";
import { StarterKit } from "@/lib/tiptap/extensions/StarterKit";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/lib/tiptap/extensions/Heading";

interface EditorProps {
  description: string;
  onChange: (content: string) => void;
}

export default function Editor({ description, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading,
      Placeholder.configure({
        placeholder: "Describe the issue",
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "p-4 focus-visible:outline-none min-h-[10rem]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    autofocus: true,
    editable: true,
  });

  if (!editor) {
    return <div className="min-h-[13rem]"></div>;
  }

  return (
    <>
      <div className="w-full rounded-sm border shadow-sm">
        <MenuBar editor={editor} />
        <Separator />
        <EditorContent editor={editor} spellCheck={false} />
      </div>
    </>
  );
}
