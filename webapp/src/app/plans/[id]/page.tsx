"use client";
import { KeystrokeMap, useFetchPlan, useKeystroke, usePlans, useTasks } from "@/lib/hooks";
import { PlanUpdateDTO } from "@/lib/http";
import { BLANK_TASK } from "@/lib/utils/const";
import { Task, TaskCreate, TaskUpdate } from "@/models/task";
import TaskCard from "@/ui/task/task-card";
import { Box, Button, Container, Flex, Heading } from "@radix-ui/themes";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { use } from "react";
import PlanMenuDropdown from "./(components)/plan-menu-dropdown";
import PlanTitle from "./(components)/plan-title";

type Params = { id: string };

type PlansDetailPageProps = {
  params: Promise<Params>;
};

function PlansDetailPage({ params }: PlansDetailPageProps) {
  const { id } = use<Params>(params);
  const { plan, loading } = useFetchPlan({ id });
  const { updatePlan, deletePlan } = usePlans();
  const {
    toggleSelectTask,
    setEditingTask,
    addNewBlankTask,
    resetTasks,
    deleteTask,
    updateTask,
    createNewTask,
  } = useTasks({
    planId: id,
  });

  function handleTaskClick(task: Task) {
    toggleSelectTask(task);
  }

  function handlePlanDelete() {
    deletePlan(id);
    redirect("/plans");
  }

  function handleUpdatePlanTitle(title: string) {
    const planData: PlanUpdateDTO = { title };
    updatePlan(id, planData);
  }

  function handleUpdateTaskStatus(taskId: string, status: boolean) {
    const taskData: Partial<Task> = { isCompleted: status };
    updateTask(taskId, taskData);
  }

  function handleOnSubmitTask(taskId: string, task: TaskCreate | TaskUpdate) {
    if (taskId === BLANK_TASK.id) {
      createNewTask(task as TaskCreate);
    } else {
      updateTask(taskId, task);
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
      <Flex justify="between" className="w-full" py="4" px="4">
        <p></p>
        <PlanMenuDropdown onPlanDelete={handlePlanDelete} />
      </Flex>
      {plan && (
        <Container p="3" size="3">
          <Heading className="flex gap-2" as="h1">
            {plan.icon || "📋"}
            <PlanTitle plan={plan} onTitleSubmit={handleUpdatePlanTitle} />
          </Heading>
          <Button
            className="cursor-pointer"
            color="green"
            variant="soft"
            my="6"
            size="2"
            radius="large"
            onClick={addNewBlankTask}
          >
            <IconPlaylistAdd size={20} />
            Add Task
          </Button>
          {loading ? (
            <>Loading</>
          ) : (
            plan?.tasks?.map(task => (
              <Box
                onDoubleClick={() => setEditingTask(task)}
                onClick={() => handleTaskClick(task)}
                key={task.id}
              >
                <TaskCard
                  onStatusChange={handleUpdateTaskStatus}
                  resetTaskStates={resetTasks}
                  deleteTask={deleteTask}
                  onTaskSubmit={handleOnSubmitTask}
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
