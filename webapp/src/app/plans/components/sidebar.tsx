"use client";
import { Box, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import SidebarMenuItem from "./sidebar-menu-item";
import {
  IconCalendar,
  IconLayoutKanban,
  IconProps,
  IconTargetArrow,
} from "@tabler/icons-react";
import React, { ReactElement } from "react";
import usePlans from "@/hooks/usePlans";

export type NavigationItem = {
  name: string;
  title: string;
  pathname: string;
  icon: React.ReactNode;
  KBDShortcut?: string;
};

type NavigationList = {
  listTitle: string;
  list: NavigationItem[];
};

const activityItems: NavigationList = {
  listTitle: "Activity",
  list: [
    {
      name: "today",
      title: "Today",
      pathname: "/",
      icon: <IconCalendar />,
      KBDShortcut: "kdb",
    },
    {
      name: "upcoming",
      title: "Upcoming",
      pathname: "/upcoming",
      icon: <IconLayoutKanban />,
      KBDShortcut: "jdklf",
    },
    {
      name: "goals",
      title: "Goals",
      pathname: "/goals",
      icon: <IconTargetArrow />,
    },
  ],
};

function Sidebar() {
  const pathname = usePathname();
  const { plans } = usePlans();

  const plansList = plans?.map((plan) => ({
    name: plan.title,
    title: plan.title,
    icon: plan.icon,
    pathname: plan.id,
  }));

  // Setting stylings for activityListItems
  activityItems.list.forEach((item) => {
    item.icon = React.cloneElement(item.icon as ReactElement<IconProps>, {
      stroke: 2,
      height: 20,
      width: 20,
    });
  });

  const getRedirectionPath = (subpath: string): string => {
    const subpathWithSlash = subpath[0] === "/" ? subpath : "/" + subpath;
    const subpathWithoutTrailingSlash = subpathWithSlash.replace(/\/$/, "");
    return "/plans" + subpathWithoutTrailingSlash;
  };

  const items: NavigationList[] = [
    activityItems,
    { listTitle: "Plans", list: plansList || [] },
  ];

  return (
    <Box height="100vh" p="4" className="bg-slate-100">
      <nav>
        <ul>
          {items.map(({ listTitle, list }) => (
            <li className="mb-2" key={listTitle}>
              <Text mb="2" as="p" size="1" className="text-gray-500">
                {listTitle}
              </Text>
              <ul>
                {list.map((menuItem) => (
                  <li key={menuItem.name}>
                    <SidebarMenuItem
                      {...menuItem}
                      isActive={
                        getRedirectionPath(menuItem.pathname) === pathname
                      }
                      pathname={getRedirectionPath(menuItem.pathname)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </Box>
  );
}

export default Sidebar;
