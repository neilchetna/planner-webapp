import { tasksApiFactory } from "@/lib/http";
import { Task, TaskDTO } from "@/models";
import { useState } from "react";
import { usePlanStore } from "../store";
import { BLANK_TASK } from "../utils/const";

type Props = {
  id: string;
};

type UseTasks = {
  selectedTaskId?: string;
  editingTaskId?: string;
  selectTask: (task: Task) => void;
  setEditingTask: (task: Task) => void;
  addNewBlankTask: () => void;
  onTaskSubmit: (taskId: string, task: TaskDTO) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  resetTasks: () => void;
};

export function useTasks({ id }: Props): UseTasks {
  const { addBlankTask, updateTaskById, updateTask: updateStoreTask, removeTask } = usePlanStore();

  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const [editingTaskId, setEditingTaskId] = useState<string>();

  const taskApi = tasksApiFactory();

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
      return await createNewTask(task);
    }

    return await updateTask(taskId, task);
  }

  async function createNewTask(task: TaskDTO) {
    const res = await taskApi.postTask(id, task);
    updateTaskById(id, BLANK_TASK.id, res);
    resetTasks();
  }

  async function updateTask(taskId: string, task: TaskDTO) {
    const res = await taskApi.patchTask(id, taskId, task);
    updateStoreTask(id, res);
    resetTasks();
  }

  async function deleteTask(taskId: string) {
    await taskApi.deleteTask(id, taskId);
    removeTask(id, taskId);
  }
  function resetTasks() {
    setEditingTaskId("");
    setSelectedTaskId("");
    removeTask(id, BLANK_TASK.id);
  }

  return {
    selectedTaskId,
    editingTaskId,
    setEditingTask,
    selectTask,
    addNewBlankTask,
    onTaskSubmit,
    resetTasks,
    deleteTask,
  };
}
