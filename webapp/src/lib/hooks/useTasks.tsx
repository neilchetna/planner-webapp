import { tasksApiFactory } from "@/lib/http";
import { Task, TaskCreate, TaskUpdate } from "@/models";
import { usePlanStore } from "../store";
import { BLANK_TASK } from "../utils/const";

type Props = {
  planId: string;
};

type UseTasks = {
  toggleSelectTask: (task: Task) => void;
  setEditingTask: (task: Task) => void;
  addNewBlankTask: () => void;
  deleteTask: (taskId: string) => Promise<void>;
  resetTasks: () => void;
  createNewTask: (task: TaskCreate) => Promise<void>;
  updateTask: (taskId: string, task: TaskUpdate) => Promise<void>;
};

export function useTasks({ planId }: Props): UseTasks {
  const {
    addBlankTask,
    updateTaskById,
    updateTask: updateTaskState,
    removeTask,
    resetTasks: resetTasksState,
  } = usePlanStore();
  const taskApi = tasksApiFactory();

  function toggleSelectTask(task: Task) {
    removeTask(planId, BLANK_TASK.id);
    const updatedTask: Task = { ...task, isSelected: !task.isSelected };
    updateTaskState(planId, updatedTask);
  }

  function setEditingTask(task: Task) {
    resetTasksState(planId);
    updateTaskState(planId, { ...task, isEditing: true });
  }

  function addNewBlankTask() {
    removeTask(planId, BLANK_TASK.id);
    addBlankTask(planId);
    setEditingTask(BLANK_TASK);
  }

  async function createNewTask(task: TaskCreate) {
    const res = await taskApi.postTask(planId, task);
    updateTaskById(planId, BLANK_TASK.id, res);
    resetTasks();
  }

  async function updateTask(taskId: string, task: TaskUpdate) {
    const res = await taskApi.patchTask(planId, taskId, task);
    updateTaskState(planId, res);
    resetTasks();
  }

  async function deleteTask(taskId: string) {
    await taskApi.deleteTask(planId, taskId);
    removeTask(planId, taskId);
  }

  function resetTasks() {
    resetTasksState(planId);
    removeTask(planId, BLANK_TASK.id);
  }

  return {
    setEditingTask,
    toggleSelectTask,
    addNewBlankTask,
    createNewTask,
    resetTasks,
    deleteTask,
    updateTask,
  };
}
