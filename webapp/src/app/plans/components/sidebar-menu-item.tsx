import { Flex, Kbd, Text } from "@radix-ui/themes";
import Link from "next/link";
import { NavigationItem } from "./sidebar";
import clsx from "clsx";

type SidebarMenuItemProps = {
  isActive: boolean;
} & NavigationItem;

function SidebarMenuItem({ pathname, title, icon, KBDShortcut, isActive }: SidebarMenuItemProps) {
  return (
    <Link
      className={clsx(
        "group my-0.5 inline-block w-full rounded-md px-3 py-1.5",
        isActive && "bg-white shadow-md shadow-slate-200",
        !isActive && "hover:bg-slate-200"
      )}
      href={pathname}
    >
      <Flex align="center" justify="between">
        <Flex className="min-w-0" align="center" gap="3">
          <Text className={clsx("text-slate-600", isActive && "text-slate-800")}>{icon}</Text>
          <Text
            truncate
            as="span"
            className={clsx(
              "mb-0 flex-1 font-medium text-slate-600",
              isActive && "weight font-semibold text-slate-800"
            )}
            size="3"
          >
            {title}
          </Text>
        </Flex>
        {KBDShortcut && (
          <div className="hidden group-hover:block">
            <Kbd size="1">⌘A</Kbd>
          </div>
        )}
      </Flex>
    </Link>
  );
}

export default SidebarMenuItem;
