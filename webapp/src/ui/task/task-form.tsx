import { Task } from "@/models";
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
import { TaskCreateDTO, TasksCreateSchema } from "@/lib/http";

type TaskFormProps = {
  task: Task;
  isDeleteAvailable: boolean;
  onTaskSubmit(task: TaskCreateDTO): Promise<void>;
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
    const res = TasksCreateSchema.safeParse(data);

    if (res.success) {
      await onTaskSubmit(res.data);
    }
  };
  return (
    <form onSubmit={e => onFormSubmit(e)} className="relative px-2">
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
      <Flex className="mb-5 gap-3" align="center">
        <Checkbox className="mt-2 self-start" />
        <div className="w-full">
          <GhostInput
            name="title"
            className="m-0 text-base font-medium"
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
          <Button type="button" color="gray" className="rounded-full" size="1" variant="soft">
            <IconListCheck size={16} />
            Reminder
          </Button>
          <Button type="button" color="gray" className="rounded-full" size="1" variant="soft">
            <IconHourglassLow size={16} />
            Deadline
          </Button>
          <Button type="button" color="gray" className="rounded-full" size="1" variant="soft">
            <IconTargetArrow size={16} />
            Add Goal
          </Button>
          <Button type="button" color="gray" className="rounded-full" size="1" variant="soft">
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
          <Button className="mr-0 rounded-md" type="submit" variant="ghost" size="1">
            ↵ Save task
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

export default TaskForm;
