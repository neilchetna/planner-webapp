import { tasksApiFactory } from "@/lib/http";
import { Task } from "@/models";
import { TaskCreateDTO, TaskUpdateDTO } from "../http";
import { usePlanStore } from "../store";
import { BLANK_TASK } from "../utils/const";

type Props = {
  planId: string;
};

type UseTasks = {
  toggleSelectTask: (task: Task) => void;
  setEditingTask: (task: Task) => void;
  addNewBlankTask: () => void;
  onTaskSubmit: (taskId: string, task: TaskCreateDTO) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  resetTasks: () => void;
  updateTask: (taskId: string, task: TaskUpdateDTO) => Promise<void>;
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

  async function onTaskSubmit(taskId: string, task: TaskUpdateDTO) {
    if (taskId === BLANK_TASK.id) {
      return await createNewTask(task);
    }

    return await updateTask(taskId, task);
  }

  async function createNewTask(task: TaskCreateDTO) {
    const res = await taskApi.postTask(planId, task);
    updateTaskById(planId, BLANK_TASK.id, res);
    resetTasks();
  }

  async function updateTask(taskId: string, task: TaskUpdateDTO) {
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
    onTaskSubmit,
    resetTasks,
    deleteTask,
    updateTask,
  };
}
