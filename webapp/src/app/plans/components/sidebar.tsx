"use client";
import { usePlans } from "@/lib/hooks";
import { BLANK_PLAN } from "@/lib/utils/const";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { IconCalendar, IconLayoutKanban, IconProps, IconTargetArrow } from "@tabler/icons-react";
import { redirect, usePathname } from "next/navigation";
import React, { ReactElement } from "react";
import SidebarMenuItem from "./sidebar-menu-item";

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
  actionText?: string;
  actionFn?: () => void;
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
  const { createPlan, plans } = usePlans();

  const plansList = plans?.map(plan => ({
    name: plan.title,
    title: plan.title,
    icon: plan.icon || "📋",
    pathname: plan.id,
  }));

  // Setting stylings for activityListItems
  activityItems.list.forEach(item => {
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

  const onCreateNewPlan = async () => {
    const plan = await createPlan(BLANK_PLAN);
    const path = getRedirectionPath(plan.id);
    redirect(path);
  };

  const items: NavigationList[] = [
    activityItems,
    {
      actionText: "New Plan",
      actionFn: () => onCreateNewPlan(),
      listTitle: "Plans",
      list: plansList || [],
    },
  ];

  return (
    <Box height="100vh" p="4" className="bg-slate-100">
      <nav>
        <ul>
          {items.map(({ actionText, listTitle, list, actionFn }) => (
            <li className="mb-2" key={listTitle}>
              <Flex justify="between">
                <Text mb="2" as="p" weight="medium" className="text-gray-500">
                  {listTitle}
                </Text>
                {actionText && (
                  <Button
                    className="rounded-md"
                    variant="soft"
                    size="1"
                    color="gray"
                    onClick={actionFn}
                  >
                    {actionText}
                  </Button>
                )}
              </Flex>
              <ul>
                {list.map(menuItem => (
                  <li key={menuItem.pathname}>
                    <SidebarMenuItem
                      {...menuItem}
                      isActive={getRedirectionPath(menuItem.pathname) === pathname}
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
