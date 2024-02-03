import { StarterKit as BaseStarterKit } from "@tiptap/starter-kit";

export const StarterKit = BaseStarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: "list-disc list-outside ml-5",
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: "list-decimal list-outside ml-5",
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: "bg-foreground text-background p-3 rounded-sm my-2",
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: "ml-1 pl-2 border-l-4 border-l-accent-foreground/20 h-[2rem] items-center flex my-2",
    },
  },
  paragraph: {
    HTMLAttributes: {
      class: "text-sm",
    },
  },
});
