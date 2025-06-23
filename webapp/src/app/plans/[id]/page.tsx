"use client";
import { KeystrokeMap, useKeystroke, usePlan } from "@/lib/hooks";
import { Task } from "@/models/task";
import TaskCard from "@/ui/task/task-card";
import { Box, Button, Container, Flex, Heading } from "@radix-ui/themes";
import { use } from "react";
import PlanMenuDropdown from "./(components)/plan-menu-dropdown";
import PlanTitle from "./(components)/plan-title";
import { redirect } from "next/navigation";

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
    deleteTask,
    updatePlanTitle,
    deletePlan,
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

  function handlePlanDelete() {
    deletePlan();
    redirect("/plans");
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
      <Flex justify="between" className="w-full" py="4" px="4">
        <p></p>
        <PlanMenuDropdown onPlanDelete={handlePlanDelete} />
      </Flex>
      {plan && (
        <Container p="3" size="3">
          <Heading className="flex gap-2" as="h1">
            {plan.icon}
            <PlanTitle plan={plan} onTitleSubmit={updatePlanTitle} />
          </Heading>
          <Button
            className="cursor-pointer"
            color="green"
            variant="soft"
            my="5"
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
                  resetTaskStates={resetTasks}
                  deleteTask={deleteTask}
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
