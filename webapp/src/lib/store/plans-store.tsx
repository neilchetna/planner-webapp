import { Plan, Task } from "@/models";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BLANK_TASK } from "../utils/const";

type PlanStoreState = {
  plans: Plan[];
};

type PlanStoreAction = {
  setPlans: (plans: Plan[]) => void;
  updatePlan: (plan: Plan) => void;
  addBlankTask: (planId: string) => void;
  updateTaskById: (planId: string, taskId: string, task: Task) => void;
  removeTask: (planId: string, taskId: string) => void;
  updateTask: (planId: string, task: Task) => void;
};

type PlanStore = PlanStoreState & PlanStoreAction;

export const usePlanStore = create<PlanStore>()(
  immer((set) => ({
    plans: [],
    setPlans: (plans: Plan[]) => set({ plans }),
    updatePlan: (plan: Plan) =>
      set((state) => {
        const planIndex = state.plans.findIndex((p) => p.id === plan.id);
        if (planIndex < 0) return;

        state.plans[planIndex] = plan;
      }),
    addBlankTask: (planId: string) =>
      set((state) => {
        const planIndex = state.plans.findIndex((p) => p.id === planId);
        if (planIndex < 0) return;

        const tasks = state.plans[planIndex].tasks;
        tasks.push(BLANK_TASK);
      }),
    updateTask: (planId: string, task: Task) =>
      set((state) => {
        const planIndex = state.plans.findIndex((p) => p.id === planId);
        if (planIndex < 0) return;

        const tasks = state.plans[planIndex].tasks;
        const taskIndex = tasks.findIndex(
          (t) => String(t.id) === String(task.id)
        );
        tasks[taskIndex] = task;
      }),
    updateTaskById: (planId: string, taskId: string, task: Task) =>
      set((state) => {
        const planIndex = state.plans.findIndex((p) => p.id === planId);
        if (planIndex < 0) return;

        const tasks = state.plans[planIndex].tasks;
        const taskIndex = tasks.findIndex((t) => t.id === taskId);
        tasks[taskIndex] = task;
      }),
    removeTask: (planId: string, taskId: string) =>
      set((state) => {
        const planIndex = state.plans.findIndex((p) => p.id === planId);
        if (planIndex < 0) return;

        const tasks = state.plans[planIndex].tasks.filter(
          (t) => t.id !== taskId
        );
        state.plans[planIndex].tasks = tasks;
      }),
  }))
);
