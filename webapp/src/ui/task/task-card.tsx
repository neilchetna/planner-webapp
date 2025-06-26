import { TaskCreateDTO } from "@/lib/http/tasks/dto";
import { BLANK_TASK } from "@/lib/utils/const";
import { Task } from "@/models";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import TaskForm from "./task-form";

type TaskCardProps = {
  task: Task;
  onTaskSubmit(taskId: string, task: TaskCreateDTO): Promise<void>;
  deleteTask(taskId: string): Promise<void>;
  resetTaskStates(): void;
};

function TaskCard({ task, onTaskSubmit, deleteTask, resetTaskStates }: TaskCardProps) {
  const handleOnTaskSubmit = (taskDTO: TaskCreateDTO) => onTaskSubmit(task.id, taskDTO);
  const handleOnTaskDelete = () => deleteTask(task.id);
  return (
    <Box
      className={clsx(
        "my-0.5 -ml-3 rounded-md px-1 py-2",
        task.isSelected && !task.isEditing && "bg-blue-100",
        task.isEditing && "bg-white shadow",
        !task.isSelected && !task.isEditing && "hover:bg-slate-100"
      )}
    >
      {task.isEditing && (
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
      {!task.isEditing && (
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
