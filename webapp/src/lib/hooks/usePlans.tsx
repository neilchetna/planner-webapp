import { plansApiFactory } from "@/lib/http";
import useQuery from "./useQuery";
import { Plan } from "@/models";
import { usePlanStore } from "@/lib/store";

export function usePlans() {
  const { plans, setPlans } = usePlanStore();
  const { loading, errorMessage } = useQuery<Plan[]>({
    setDataState: setPlans,
    queryFn: getPlans,
  });
  const plansApi = plansApiFactory();

  async function getPlans() {
    return await plansApi.getPlans();
  }

  return { plans, loading, errorMessage };
}
