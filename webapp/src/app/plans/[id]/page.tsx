"use client";
import TaskCard from "@/ui/task/task-card";
import { Box, Button, Container, Heading } from "@radix-ui/themes";
import { KeystrokeMap, useKeystroke, usePlan } from "@/lib/hooks";
import { Task } from "@/models/task";
import { use } from "react";

type Params = { id: string };

type PlansDetailPageProps = {
  params: Promise<Params>;
};

function PlansDetailPage({ params }: PlansDetailPageProps) {
  const { id } = use<Params>(params);
  const {
    plan,
    selectedTaskId,
    editingTaskId,
    selectTask,
    setEditingTask,
    addNewBlankTask,
    onTaskSubmit,
    loading,
    resetTasks,
  } = usePlan({
    id,
  });

  function handleTaskClick(task: Task) {
    if (task.id === selectedTaskId) {
      setEditingTask(task);
    } else {
      selectTask(task);
    }
  }
  const cancelEditAndSelection: KeystrokeMap = {
    keys: ["Escape"],
    onPress: () => {
      resetTasks();
    },
  };
  useKeystroke({ keysMap: [cancelEditAndSelection] });

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
            onClick={addNewBlankTask}
          >
            Add Task
          </Button>
          {loading ? (
            <>Loading</>
          ) : (
            plan?.tasks?.map((task) => (
              <Box
                onDoubleClick={() => setEditingTask(task)}
                onClick={() => handleTaskClick(task)}
                key={task.id}
              >
                <TaskCard
                  onTaskSubmit={onTaskSubmit}
                  isEditing={task.id === editingTaskId}
                  isSelected={task.id === selectedTaskId}
                  task={task}
                />
              </Box>
            ))
          )}
        </Container>
      )}
    </>
  );
}

export default PlansDetailPage;
