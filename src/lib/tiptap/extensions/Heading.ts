import BaseHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";
import { Levels } from "@/types/editor-types";

const classes: Record<Levels, string> = {
  1: "text-2xl",
  2: "text-xl",
  3: "text-lg",
  4: "text-base",
  5: "text-sm",
  6: "text-xs",
};

export const Heading = BaseHeading.configure({
  levels: Object.keys(classes).map(Number) as Levels[],
}).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${classes[level]} font-medium`,
      }),
      0,
    ];
  },
});
