"use client";
import { KeystrokeMap, useFetchPlan, useKeystroke, usePlans, useTasks } from "@/lib/hooks";
import { PlanUpdateDTO } from "@/lib/http";
import { BLANK_TASK } from "@/lib/utils/const";
import { Task, TaskCreate, TaskUpdate } from "@/models/task";
import TaskCard from "@/ui/task/task-card";
import { Box, Button, Container, Flex, Heading, Skeleton } from "@radix-ui/themes";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { use } from "react";
import PlanMenuDropdown from "./(components)/plan-menu-dropdown";
import PlanTitle from "./(components)/plan-title";
import IconPicker from "./(components)/icon-picker";
import { usePlanStore } from "@/lib/store";

type Params = { id: string };

type PlansDetailPageProps = {
  params: Promise<Params>;
};

function PlansDetailPage({ params }: PlansDetailPageProps) {
  const { id } = use<Params>(params);
  const plan = usePlanStore(s => s.plans.find(p => p.id === id));
  const { loading } = useFetchPlan({ id });
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

  function handleUpdatePlanIcon(icon: string) {
    const planData: PlanUpdateDTO = { icon };
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
          <Skeleton height="80" loading={loading}>
            <Heading className="flex items-center gap-6" as="h1">
              <IconPicker onIconSelect={handleUpdatePlanIcon} currentIcon={plan.icon || "📋"} />
              <PlanTitle plan={plan} onTitleSubmit={handleUpdatePlanTitle} />
            </Heading>
          </Skeleton>
          <Button
            className="cursor-pointer"
            color="green"
            variant="ghost"
            my="6"
            size="2"
            radius="large"
            onClick={addNewBlankTask}
          >
            <IconPlaylistAdd size={20} />
            Add Task
          </Button>
          {!plan.tasks &&
            new Array(4).fill(null).map((_, i) => <Skeleton my="2" height="40" loading key={i} />)}
          {Array.isArray(plan.tasks) &&
            plan.tasks.map(task => (
              <Box
                key={task.id}
                onDoubleClick={() => setEditingTask(task)}
                onClick={() => handleTaskClick(task)}
              >
                <TaskCard
                  onStatusChange={handleUpdateTaskStatus}
                  resetTaskStates={resetTasks}
                  deleteTask={deleteTask}
                  onTaskSubmit={handleOnSubmitTask}
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
