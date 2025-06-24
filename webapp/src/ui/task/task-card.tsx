import { BLANK_TASK } from "@/lib/utils/const";
import { Task, TaskDTO } from "@/models";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import TaskForm from "./task-form";

type TaskCardProps = {
  task: Task;
  isSelected: boolean;
  isEditing: boolean;
  onTaskSubmit(taskId: string, task: TaskDTO): Promise<void>;
  deleteTask(taskId: string): Promise<void>;
  resetTaskStates(): void;
};

function TaskCard({
  task,
  isSelected,
  isEditing,
  onTaskSubmit,
  deleteTask,
  resetTaskStates,
}: TaskCardProps) {
  const handleOnTaskSubmit = (taskDTO: TaskDTO) => onTaskSubmit(task.id, taskDTO);
  const handleOnTaskDelete = () => deleteTask(task.id);
  return (
    <Box
      className={clsx(
        "-ml-3 rounded-md px-1 py-2",
        isSelected && !isEditing && "bg-blue-100",
        isEditing && "bg-white shadow",
        !isSelected && !isEditing && "hover:bg-slate-100"
      )}
    >
      {isEditing && (
        <div onClick={e => e.stopPropagation()}>
          <TaskForm
            onBackClick={resetTaskStates}
            isDeleteAvailable={task.id !== BLANK_TASK.id}
            onTaskDelete={handleOnTaskDelete}
            onTaskSubmit={handleOnTaskSubmit}
            task={task}
          />
        </div>
      )}
      {!isEditing && (
        <>
          <Flex className="flex items-center gap-3 px-2">
            <Checkbox onClick={e => e.stopPropagation()} size="2" />
            <Box className="pr-10" width="100%" as="div">
              <Text truncate as="p" weight="medium" className="m-0 text-base">
                {task.title}
              </Text>
              {task.description && (
                <Text truncate color="gray" as="p" size="1">
                  {task.description}
                </Text>
              )}
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
}

export default TaskCard;
