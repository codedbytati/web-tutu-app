import { tv } from "tailwind-variants";

export const makeStyles = tv({
  slots: {
    base: "group relative flex items-center gap-3 py-3 px-4 rounded-2xl cursor-pointer transition-colors",
    icon: "size-6 transition-colors",
    label: "font-display font-semibold text-sm transition-colors",
  },
  variants: {
    color: {
      violet: "bg-tutu-violet",
      mint: "bg-tutu-mint",
      sky: "bg-tutu-sky",
      amber: "bg-tutu-amber",
      coral: "bg-tutu-coral",
    },
    isActive: {
      false: {
        base: "bg-transparent hover:bg-tutu-surface",
        icon: "text-tutu-muted group-hover:text-tutu-ink",
        label: "text-tutu-muted group-hover:text-tutu-ink",
      },
      true: {
        base: [
          "cursor-default after:absolute after:right-3 after:size-2",
          "after:bg-tutu-card/60 after:rounded-full",
        ],
        icon: "text-tutu-card group-hover:text-tutu-card",
        label: "text-tutu-card group-hover:text-tutu-card",
      },
    },
  },
  compoundVariants: [
    { isActive: true, color: "violet", slots: { base: "bg-tutu-violet" } },
    { isActive: true, color: "mint", slots: { base: "bg-tutu-mint" } },
    { isActive: true, color: "sky", slots: { base: "bg-tutu-sky" } },
    { isActive: true, color: "amber", slots: { base: "bg-tutu-amber" } },
    { isActive: true, color: "coral", slots: { base: "bg-tutu-coral" } },
  ],
});
