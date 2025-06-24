import { Button, DropdownMenu } from "@radix-ui/themes";
import {
  IconArchive,
  IconDots,
  IconEdit,
  IconLink,
  IconTrash,
  IconUpload,
  IconProps,
} from "@tabler/icons-react";
import { cloneElement, Fragment, ReactElement } from "react";

type MenuItem = {
  label: string;
  icon: ReactElement<IconProps>;
  separator?: boolean;
  onClick?: () => void; // TODO: Make this non-optional once all the click events are derived
  additionalProps?: DropdownMenu.ItemProps;
};

type Props = {
  onPlanDelete: () => void;
};

function PlanMenuDropdown({ onPlanDelete }: Props) {
  const menuItems: MenuItem[] = [
    {
      label: "Edit plan",
      icon: <IconEdit />,
      separator: true,
    },
    {
      label: "Share",
      icon: <IconLink />,
    },
    {
      label: "Export",
      icon: <IconUpload />,
      separator: true,
    },
    {
      label: "Archive",
      icon: <IconArchive />,
    },
    {
      label: "Delete plan",
      icon: <IconTrash />,
      additionalProps: { color: "red" },
      onClick: onPlanDelete,
    },
  ];

  menuItems.forEach(item => {
    item.icon = cloneElement(item.icon as ReactElement<IconProps>, {
      size: 20,
    });
  });

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            className="self-end px-1.5"
            color="gray"
            size="3"
            variant="ghost"
            aria-label="Plans menu"
          >
            <IconDots size={20} />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          {menuItems.map(item => (
            <Fragment key={item.label}>
              <DropdownMenu.Item onClick={item.onClick} {...item.additionalProps}>
                {item.icon}
                {item.label}
              </DropdownMenu.Item>
              {item.separator && <DropdownMenu.Separator />}
            </Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}

export default PlanMenuDropdown;
