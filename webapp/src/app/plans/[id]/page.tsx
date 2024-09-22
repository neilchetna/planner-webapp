"use client";
import TaskCard from "@/ui/task/task-card";
import { Box, Button, Container, Heading } from "@radix-ui/themes";
import usePlan from "./hooks/usePlan";
import { Task } from "@/models/task";

type PlansDetailPageProps = {
  params: {
    id: string;
  };
};

function PlansDetailPage({ params }: PlansDetailPageProps) {
  const { plan, selectedTaskId, editingTaskId, selectTask, setEditingTask } =
    usePlan({
      id: params.id,
    });

  function handleTaskClick(task: Task) {
    if (task.id === selectedTaskId) {
      setEditingTask(task);
    } else {
      selectTask(task);
    }
  }

  return (
    <>
      <Box py="4">Options</Box>
      {plan && (
        <Container p="3" size="3">
          <Heading as="h1">
            {plan.icon}
            {"  "}
            {plan.title}
          </Heading>
          <Button
            className="cursor-pointer"
            color="green"
            variant="soft"
            my="3"
            size="1"
            radius="full"
          >
            Add Task
          </Button>

          {plan.tasks.map((task) => (
            <Box
              onDoubleClick={() => setEditingTask(task)}
              onClick={() => handleTaskClick(task)}
              key={task.id}
            >
              <TaskCard
                isEditing={task.id === editingTaskId}
                isSelected={task.id === selectedTaskId}
                task={task}
              />
            </Box>
          ))}
        </Container>
      )}
    </>
  );
}

export default PlansDetailPage;
