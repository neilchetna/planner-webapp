import { Plan, Task } from "@/models";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BLANK_TASK } from "../utils/const";

type PlanStoreState = {
  plans: Plan[];
};

type PlanStoreAction = {
  // Plans
  setPlans: (plans: Plan[]) => void;
  updatePlan: (plan: Plan) => void;
  addNewPlan: (plan: Plan) => void;
  removePlan: (planId: string) => void;
  //Tasks
  addBlankTask: (planId: string) => void;
  updateTaskById: (planId: string, taskId: string, task: Task) => void;
  removeTask: (planId: string, taskId: string) => void;
  updateTask: (planId: string, task: Task) => void;
  resetTasks: (planId: string) => void;
};

type PlanStore = PlanStoreState & PlanStoreAction;

export const usePlanStore = create<PlanStore>()(
  immer(set => ({
    plans: [],

    setPlans: (plans: Plan[]) =>
      set(state => {
        state.plans = plans;
      }),

    updatePlan: (plan: Plan) =>
      set(state => {
        const planIndex = state.plans.findIndex(p => p.id === plan.id);
        if (planIndex < 0) return;

        state.plans[planIndex] = { ...state.plans[planIndex], ...plan };
      }),

    addNewPlan: (plan: Plan) =>
      set(state => {
        state.plans.push(plan);
      }),

    removePlan: (planId: string) => {
      set(state => {
        state.plans = state.plans.filter(p => p.id !== planId);
      });
    },

    addBlankTask: (planId: string) =>
      set(state => {
        const plan = state.plans.find(p => p.id === planId);
        if (!plan) return;

        if (Array.isArray(plan.tasks)) {
          plan.tasks = [...plan.tasks, BLANK_TASK];
        } else {
          plan.tasks = [BLANK_TASK];
        }
      }),

    updateTask: (planId: string, task: Task) =>
      set(state => {
        const plan = state.plans.find(p => p.id === planId);
        if (!plan || !plan.tasks) return;

        const taskIndex = plan.tasks.findIndex(t => t.id === task.id);
        if (taskIndex < 0) return;

        plan.tasks[taskIndex] = task;
      }),

    updateTaskById: (planId: string, taskId: string, task: Task) =>
      set(state => {
        const plan = state.plans.find(p => p.id === planId);
        if (!plan || !plan.tasks) return;

        const taskIndex = plan.tasks.findIndex(t => t.id === taskId);
        if (taskIndex < 0) return;

        plan.tasks[taskIndex] = task;
      }),

    removeTask: (planId: string, taskId: string) =>
      set(state => {
        const plan = state.plans.find(p => p.id === planId);
        if (!plan || !plan.tasks) return;

        plan.tasks = plan.tasks.filter(t => t.id !== taskId);
      }),

    resetTasks: (planId: string) => {
      set(state => {
        const plan = state.plans.find(p => p.id === planId);
        if (!plan || !plan.tasks) return;

        plan.tasks = plan.tasks.map(t => ({ ...t, isSelected: false, isEditing: false }));
      });
    },
  }))
);
