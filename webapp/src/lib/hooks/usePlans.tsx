import { PlanCreateDTO, plansApiFactory, PlanUpdateDTO } from "@/lib/http";
import { usePlanStore } from "@/lib/store";
import { Plan } from "@/models";

type UsePlan = {
  plans: Plan[];
  createPlan: (plan: PlanCreateDTO) => Promise<Plan>;
  deletePlan: (planId: string) => Promise<void>;
  updatePlan: (planId: string, plan: PlanUpdateDTO) => Promise<void>;
};

export function usePlans(): UsePlan {
  const { plans, addNewPlan, removePlan, updatePlan: updatePlanState } = usePlanStore();

  const plansApi = plansApiFactory();

  async function createPlan(plan: PlanCreateDTO) {
    const res = await plansApi.postPlan(plan);
    addNewPlan(res);
    return res;
  }

  async function deletePlan(planId: string) {
    await plansApi.deletePlan(planId);
    removePlan(planId);
  }

  async function updatePlan(planId: string, plan: PlanUpdateDTO) {
    const res = await plansApi.patchPlan(planId, plan);
    updatePlanState(res);
  }

  return { plans, createPlan, deletePlan, updatePlan };
}
