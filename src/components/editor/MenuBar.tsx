"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import { Code, List, ListOrdered, Redo, Undo } from "lucide-react";
import HeadingSelect from "@/components/editor/HeadingSelect";
import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  QuoteIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons";

const iconProps = {
  className: "h-5 w-5",
  strokeWidth: 1.5,
};

interface MenuBarProps {
  editor: Editor;
}
export default function MenuBar({ editor }: MenuBarProps) {
  return (
    <ToggleGroup type="multiple" className="flex-wrap justify-start p-1">
      <ToggleGroupItem
        size="sm"
        value="undo"
        aria-label="Toggle undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        data-state={editor.isActive("undo") ? "on" : "off"}
      >
        <Undo {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="redo"
        aria-label="Toggle redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        data-state={editor.isActive("redo") ? "on" : "off"}
      >
        <Redo {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="bold"
        aria-label="Toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-state={editor.isActive("bold") ? "on" : "off"}
      >
        <FontBoldIcon {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="italic"
        aria-label="Toggle italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-state={editor.isActive("italic") ? "on" : "off"}
      >
        <FontItalicIcon {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="strikethrough"
        aria-label="Toggle strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        data-state={editor.isActive("strike") ? "on" : "off"}
      >
        <StrikethroughIcon {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="blockquote"
        aria-label="Toggle blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        data-state={editor.isActive("blockquote") ? "on" : "off"}
      >
        <QuoteIcon {...iconProps} />
      </ToggleGroupItem>
      <HeadingSelect editor={editor} />
      <ToggleGroupItem
        size="sm"
        value="bullet list"
        aria-label="Toggle bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        data-state={editor.isActive("bulletList") ? "on" : "off"}
      >
        <List {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="ordered list"
        aria-label="Toggle ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        data-state={editor.isActive("orderedList") ? "on" : "off"}
      >
        <ListOrdered {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="code"
        aria-label="Toggle code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        data-state={editor.isActive("code") ? "on" : "off"}
      >
        <CodeIcon {...iconProps} />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        value="code block"
        aria-label="Toggle code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        data-state={editor.isActive("codeBlock") ? "on" : "off"}
      >
        <Code {...iconProps} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
