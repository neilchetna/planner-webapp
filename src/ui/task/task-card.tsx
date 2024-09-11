import { Task } from "@/models/task";
import { Box, Checkbox, Flex, IconButton, Text } from "@radix-ui/themes";
import { IconGripVertical } from "@tabler/icons-react";
import clsx from "clsx";
import TaskForm from "./task-form";

type TaskCardProps = {
  task: Task;
  isSelected: boolean;
  isEditing: boolean;
};

function TaskCard({ task, isSelected, isEditing }: TaskCardProps) {
  return (
    <Box
      className={clsx(
        "relative rounded-md group pl-1 -ml-3 py-2",
        isSelected && !isEditing && "bg-blue-100",
        isEditing && "shadow bg-white",
        !isSelected && !isEditing && "hover:bg-slate-100"
      )}
    >
      {isEditing && <TaskForm task={task} />}

      {!isEditing && (
        <>
          <Flex
            align="center"
            className="absolute hidden group-hover:flex inset-y-0 -left-5"
          >
            <IconButton size="1" variant="ghost" color="gray">
              <IconGripVertical size="18px" />
            </IconButton>
          </Flex>
          <Text
            className="px-2 text-base flex items-center gap-3"
            as="p"
            weight="medium"
          >
            <Checkbox onClick={(e) => e.stopPropagation()} size="2" />
            {task.title}
          </Text>
        </>
      )}
    </Box>
  );
}

export default TaskCard;
