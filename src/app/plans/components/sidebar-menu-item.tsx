import { Flex, Kbd, Text } from "@radix-ui/themes";
import Link from "next/link";
import { NavigationItem } from "./sidebar";
import clsx from "clsx";

type SidebarMenuItemProps = {
  isActive: boolean;
} & NavigationItem;

function SidebarMenuItem({
  pathname,
  title,
  icon,
  KBDShortcut,
  isActive,
}: SidebarMenuItemProps) {
  return (
    <Link
      className={clsx(
        "inline-block w-full my-0.5 py-1.5 px-3 rounded-md group",
        isActive && "bg-white shadow-md shadow-slate-200",
        !isActive && "hover:bg-slate-200"
      )}
      href={pathname}
    >
      <Flex align="center" justify="between">
        <Flex className="min-w-0" align="center" gap="4">
          <Text
            className={clsx("text-slate-600", isActive && "text-slate-800")}
          >
            {icon}
          </Text>
          <Text
            truncate
            as="span"
            className={clsx(
              "text-slate-600 mb-0 flex-1 font-medium",
              isActive && "text-slate-800 weight font-semibold"
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
