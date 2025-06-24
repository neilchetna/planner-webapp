import { Task, TaskDTO, TaskDTOSchema } from "@/models";
import { Button, Checkbox, Flex } from "@radix-ui/themes";
import {
  IconArrowLeft,
  IconHash,
  IconHourglassLow,
  IconListCheck,
  IconTargetArrow,
  IconTrash,
} from "@tabler/icons-react";
import GhostInput from "../ghost-input/ghost-input";

type TaskFormProps = {
  task: Task;
  isDeleteAvailable: boolean;
  onTaskSubmit(task: TaskDTO): Promise<void>;
  onTaskDelete(): void;
  onBackClick(): void;
};

function TaskForm({
  task,
  isDeleteAvailable,
  onTaskSubmit,
  onTaskDelete,
  onBackClick,
}: TaskFormProps) {
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Validate Schema
    const res = TaskDTOSchema.safeParse(data);

    if (res.success) {
      await onTaskSubmit(res.data);
    }
  };
  return (
    <form onSubmit={(e) => onFormSubmit(e)} className="px-2 relative">
      <Flex align="center" className="absolute -left-10 h-full">
        <Button
          type="button"
          onClick={() => {
            onBackClick();
          }}
          className="px-1.5"
          color="gray"
          size="2"
          variant="ghost"
        >
          <IconArrowLeft size={19} />
        </Button>
      </Flex>
      <Flex className="gap-3 mb-5" align="center">
        <Checkbox className="self-start mt-2" />
        <div className="w-full">
          <GhostInput
            name="title"
            className="text-base font-medium m-0"
            type="text"
            placeholder="New Task"
            defaultValue={task.title}
          />
          <GhostInput
            defaultValue={task.description}
            name="description"
            className="text-sm"
            placeholder="Description"
          />
        </div>
      </Flex>
      <Flex className="items-center justify-between">
        <Flex className="gap-2">
          <Button
            type="button"
            color="gray"
            className="rounded-full"
            size="1"
            variant="soft"
          >
            <IconListCheck size={16} />
            Reminder
          </Button>
          <Button
            type="button"
            color="gray"
            className="rounded-full"
            size="1"
            variant="soft"
          >
            <IconHourglassLow size={16} />
            Deadline
          </Button>
          <Button
            type="button"
            color="gray"
            className="rounded-full"
            size="1"
            variant="soft"
          >
            <IconTargetArrow size={16} />
            Add Goal
          </Button>
          <Button
            type="button"
            color="gray"
            className="rounded-full"
            size="1"
            variant="soft"
          >
            <IconHash size={16} />
            Tags
          </Button>
        </Flex>
        <Flex gap="4">
          {isDeleteAvailable && (
            <Button
              type="button"
              color="red"
              onClick={() => {
                onTaskDelete();
              }}
              className="mr-0 rounded-md"
              variant="ghost"
              size="1"
            >
              <IconTrash size={16} />
              Delete task
            </Button>
          )}
          <Button
            className="mr-0 rounded-md"
            type="submit"
            variant="ghost"
            size="1"
          >
            ↵ Save task
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

export default TaskForm;
