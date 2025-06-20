import { Task, TaskDTO, TaskDTOSchema } from "@/models";
import { Button, Checkbox, Flex } from "@radix-ui/themes";
import {
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
};

function TaskForm({
  task,
  isDeleteAvailable,
  onTaskSubmit,
  onTaskDelete,
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
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => onFormSubmit(e)}
      className="px-2"
    >
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
          <Button color="gray" className="rounded-full" size="1" variant="soft">
            <IconListCheck size={16} />
            Reminder
          </Button>
          <Button color="gray" className="rounded-full" size="1" variant="soft">
            <IconHourglassLow size={16} />
            Deadline
          </Button>
          <Button color="gray" className="rounded-full" size="1" variant="soft">
            <IconTargetArrow size={16} />
            Add Goal
          </Button>
          <Button color="gray" className="rounded-full" size="1" variant="soft">
            <IconHash size={16} />
            Tags
          </Button>
        </Flex>
        <Flex gap="4">
          {isDeleteAvailable && (
            <Button
              color="red"
              onClick={(e) => {
                e.stopPropagation();
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
