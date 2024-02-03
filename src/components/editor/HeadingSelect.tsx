"use client";

import React from "react";
import { Levels } from "@/types/editor-types";
import { z } from "zod";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const headings: Array<{
  name: string;
  props: {
    value: string;
    className: string;
  };
}> = [
  {
    name: "Heading 1",
    props: {
      value: "1",
      className: "font-medium text-2xl",
    },
  },
  {
    name: "Heading 2",
    props: {
      value: "2",
      className: "font-medium text-xl",
    },
  },
  {
    name: "Heading 3",
    props: {
      value: "3",
      className: "font-medium text-lg",
    },
  },
  {
    name: "Heading 4",
    props: {
      value: "4",
      className: "font-medium text-base",
    },
  },
  {
    name: "Heading 5",
    props: {
      value: "5",
      className: "font-medium text-sm",
    },
  },
  {
    name: "Heading 6",
    props: {
      value: "6",
      className: "font-medium text-xs",
    },
  },
  {
    name: "Normal",
    props: {
      value: "paragraph",
      className: "text-sm",
    },
  },
];

interface HeadingSelectProps {
  editor: Editor;
}

export default function HeadingSelect({ editor }: HeadingSelectProps) {
  return (
    <Select
      value={
        editor.isActive("heading")
          ? z.coerce.string().parse(editor.getAttributes("heading").level)
          : "paragraph"
      }
      onValueChange={(value) =>
        value === "paragraph"
          ? editor.chain().setParagraph().run()
          : editor
              .chain()
              .toggleHeading({ level: z.coerce.number().parse(value) as Levels })
              .run()
      }
    >
      <SelectTrigger
        className="w-[7rem] border-none shadow-none"
        onFocusCapture={() => editor.chain().focus().run()}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {headings.map((heading, index) => (
          <SelectItem key={index} {...heading.props}>
            {heading.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
