import { Task } from "@/models/task";
import { Button, Checkbox, Flex, Text, TextArea } from "@radix-ui/themes";
import GhostInput from "../ghost-input/ghost-input";
import {
  IconHash,
  IconHourglassLow,
  IconListCheck,
  IconTargetArrow,
} from "@tabler/icons-react";

type TaskFormProps = {
  task: Task;
};

function TaskForm({ task }: TaskFormProps) {
  return (
    <form className="px-2">
      <Flex className="gap-3 mb-5" align="center">
        <Checkbox className="self-start mt-2" />
        <div className="w-full">
          <GhostInput
            autoFocus
            className="text-base font-medium m-0"
            type="text"
            placeholder="New Task"
            value={task.title}
          />
          <GhostInput className="text-sm" placeholder="Description" />
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
        <Text className="text-slate-500 text-xs pr-1">↵ Save task</Text>
      </Flex>
    </form>
  );
}

export default TaskForm;
