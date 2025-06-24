import { plansApiFactory } from "@/lib/http";
import { usePlanStore } from "@/lib/store";
import { Plan, PlanDTO } from "@/models";

type UsePlan = {
  plans: Plan[];
  createPlan: (plan: PlanDTO) => Promise<Plan>;
  deletePlan: (planId: string) => Promise<void>;
  updatePlanTitle: (planId: string, title: string) => Promise<void>;
};

export function usePlans(): UsePlan {
  const { plans, addNewPlan, removePlan, updatePlan } = usePlanStore();

  const plansApi = plansApiFactory();

  async function createPlan(plan: PlanDTO) {
    const res = await plansApi.postPlan(plan);
    addNewPlan(res);
    return res;
  }

  async function deletePlan(planId: string) {
    await plansApi.deletePlan(planId);
    removePlan(planId);
  }

  async function updatePlanTitle(planId: string, title: string) {
    const res = await plansApi.patchPlan(planId, { title });
    updatePlan(res);
  }

  return { plans, createPlan, deletePlan, updatePlanTitle };
}
