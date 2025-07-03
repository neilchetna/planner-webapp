import { Spinner } from "@radix-ui/themes";
import { EmojiPicker } from "frimousse";
type Props = {
  onSelect(emoji: string): void;
};
export default function EmojiMenu({ onSelect }: Props) {
  return (
    <EmojiPicker.Root
      onEmojiSelect={({ emoji }) => onSelect(emoji)}
      className="isolate flex h-[368px] w-fit flex-col bg-slate-50"
    >
      <EmojiPicker.Search className="z-10 mx-2 mt-2 appearance-none rounded-md bg-slate-100 px-2.5 py-2 text-sm" />
      <EmojiPicker.Viewport className="outline-hidden relative flex-1">
        <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-sm">
          <Spinner /> Loading…
        </EmojiPicker.Loading>
        <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-sm">
          No emoji found :(.
        </EmojiPicker.Empty>
        <EmojiPicker.List
          className="select-none pb-1.5"
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <div
                className="bg-white px-3 pb-1.5 pt-3 text-xs font-medium text-neutral-600"
                {...props}
              >
                {category.label}
              </div>
            ),
            Row: ({ children, ...props }) => (
              <div className="scroll-my-1.5 px-1.5" {...props}>
                {children}
              </div>
            ),
            Emoji: ({ emoji, ...props }) => (
              <button
                className="flex size-8 items-center justify-center rounded-md text-lg data-[active]:bg-slate-200"
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  );
}
