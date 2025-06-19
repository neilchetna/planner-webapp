import { plansApiFactory, tasksApiFactory } from "@/lib/http";
import { Plan, Task, TaskDTO } from "@/models";
import { useState } from "react";
import { usePlanStore } from "../store";
import { BLANK_TASK } from "../utils/const";
import useQuery from "./useQuery";

type UsePlanProps = {
  id: string;
};

type UsePlan = {
  plan?: Plan;
  errorMessage: string;
  loading: boolean;
  selectedTaskId?: string;
  editingTaskId?: string;
  selectTask: (task: Task) => void;
  setEditingTask: (task: Task) => void;
  addNewBlankTask: () => void;
  onTaskSubmit: (taskId: string, task: TaskDTO) => Promise<void>;
  resetTasks: () => void;
};

export function usePlan({ id }: UsePlanProps): UsePlan {
  const plan = usePlanStore((s) => s.plans.find((p) => String(p.id) === id));
  const updatePlan = usePlanStore((s) => s.updatePlan);
  const addBlankTask = usePlanStore((s) => s.addBlankTask);
  const updateTaskById = usePlanStore((s) => s.updateTaskById);
  const updateTaskStore = usePlanStore((s) => s.updateTask);
  const { ...queryData } = useQuery<Plan>({
    queryFn: getPlan,
    setDataState: updatePlan,
  });

  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const [editingTaskId, setEditingTaskId] = useState<string>();

  const planApi = plansApiFactory();
  const taskApi = tasksApiFactory();

  async function getPlan() {
    return await planApi.getPlan(id);
  }

  function selectTask(task: Task) {
    setSelectedTaskId(task.id);
  }

  function setEditingTask(task: Task) {
    setEditingTaskId(task.id);
  }

  function addNewBlankTask() {
    addBlankTask(id);
    setEditingTask(BLANK_TASK);
  }

  async function onTaskSubmit(taskId: string, task: TaskDTO) {
    if (taskId === BLANK_TASK.id) {
      return await addNewTask(task);
    }

    return await updateTask(taskId, task);
  }

  async function addNewTask(task: TaskDTO) {
    const res = await taskApi.postTask(id, task);
    updateTaskById(id, BLANK_TASK.id, res);
    setEditingTaskId("");
  }

  async function updateTask(taskId: string, task: TaskDTO) {
    const res = await taskApi.patchTask(id, taskId, task);
    updateTaskStore(id, res);
    setEditingTaskId("");
  }

  function resetTasks() {
    setEditingTaskId("");
    setSelectedTaskId("");
  }

  return {
    plan,
    selectedTaskId,
    editingTaskId,
    setEditingTask,
    selectTask,
    addNewBlankTask,
    onTaskSubmit,
    resetTasks,
    ...queryData,
  };
}
