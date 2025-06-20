import { Task, TaskDTO } from "@/models";
import { Box, Checkbox, Flex, IconButton, Text } from "@radix-ui/themes";
import { IconGripVertical } from "@tabler/icons-react";
import clsx from "clsx";
import TaskForm from "./task-form";

type TaskCardProps = {
  task: Task;
  isSelected: boolean;
  isEditing: boolean;
  onTaskSubmit(taskId: string, task: TaskDTO): Promise<void>;
  deleteTask(taskId: string): Promise<void>;
};

function TaskCard({
  task,
  isSelected,
  isEditing,
  onTaskSubmit,
  deleteTask,
}: TaskCardProps) {
  const handleOnTaskSubmit = (taskDTO: TaskDTO) =>
    onTaskSubmit(task.id, taskDTO);
  const handleOnTaskDelete = () => deleteTask(task.id);
  return (
    <Box
      className={clsx(
        "relative rounded-md group px-1 -ml-3 py-2",
        isSelected && !isEditing && "bg-blue-100",
        isEditing && "shadow bg-white",
        !isSelected && !isEditing && "hover:bg-slate-100"
      )}
    >
      {isEditing && (
        <TaskForm
          onTaskDelete={handleOnTaskDelete}
          onTaskSubmit={handleOnTaskSubmit}
          task={task}
        />
      )}
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
          <Flex className="px-2 flex items-center gap-3">
            <Checkbox onClick={(e) => e.stopPropagation()} size="2" />
            <Box className="pr-10" width="100%" as="div">
              <Text truncate as="p" weight="medium" className="text-base m-0">
                {task.title}
              </Text>
              {task.description ? (
                <Text truncate color="gray" as="p" size="1">
                  {task.description}
                </Text>
              ) : null}
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
}

export default TaskCard;
