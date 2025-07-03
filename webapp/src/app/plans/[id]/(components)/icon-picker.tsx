import EmojiMenu from "@/ui/emoji-menu/emoji-menu";
import { Button, Popover } from "@radix-ui/themes";

type Props = {
  currentIcon: string;
  onIconSelect: (icon: string) => void;
};

export default function IconPicker({ currentIcon, onIconSelect }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button className="aspect-square p-1 text-3xl" variant="ghost" size="4">
          {currentIcon}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="p-0">
        <EmojiMenu onSelect={onIconSelect} />
      </Popover.Content>
    </Popover.Root>
  );
}
