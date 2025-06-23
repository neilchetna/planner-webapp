import { plansApiFactory } from "@/lib/http";
import useQuery from "./useQuery";
import { Plan, PlanDTO } from "@/models";
import { usePlanStore } from "@/lib/store";

export function usePlans() {
  const { plans, setPlans, addNewPlan } = usePlanStore();
  const { loading, errorMessage } = useQuery<Plan[]>({
    setDataState: setPlans,
    queryFn: getPlans,
  });
  const plansApi = plansApiFactory();

  async function getPlans() {
    return await plansApi.getPlans();
  }

  async function createPlan(plan: PlanDTO) {
    const res = await plansApi.postPlan(plan);
    addNewPlan(res);
    return res;
  }

  return { plans, loading, errorMessage, createPlan };
}
