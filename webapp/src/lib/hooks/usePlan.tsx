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
  deleteTask: (taskId: string) => Promise<void>;
  resetTasks: () => void;
  updatePlanTitle: (newTitle: string) => Promise<void>;
  deletePlan: () => Promise<void>;
};

export function usePlan({ id }: UsePlanProps): UsePlan {
  const plan = usePlanStore((s) => s.plans.find((p) => String(p.id) === id));
  const updatePlan = usePlanStore((s) => s.updatePlan);
  const addBlankTask = usePlanStore((s) => s.addBlankTask);
  const updateTaskById = usePlanStore((s) => s.updateTaskById);
  const updateTaskStore = usePlanStore((s) => s.updateTask);
  const removeTask = usePlanStore((s) => s.removeTask);
  const removePlan = usePlanStore((s) => s.removePlan);

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
    removeTask(id, BLANK_TASK.id);
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
    resetTasks();
  }

  async function updateTask(taskId: string, task: TaskDTO) {
    const res = await taskApi.patchTask(id, taskId, task);
    updateTaskStore(id, res);
    resetTasks();
  }

  async function deleteTask(taskId: string) {
    await taskApi.deleteTask(id, taskId);
    removeTask(id, taskId);
  }

  async function updatePlanTitle(title: string) {
    const res = await planApi.patchPlan(id, { title });
    updatePlan(res);
  }

  async function deletePlan() {
    await planApi.deletePlan(id);
    removePlan(id);
  }

  function resetTasks() {
    setEditingTaskId("");
    setSelectedTaskId("");
    removeTask(id, BLANK_TASK.id);
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
    deleteTask,
    updatePlanTitle,
    deletePlan,
    ...queryData,
  };
}
