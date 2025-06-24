import { plansApiFactory } from "@/lib/http";
import useQuery, { UseQuery } from "../useQuery";
import { Plan } from "@/models";
import { usePlanStore } from "@/lib/store";

type UseFetchPlans = {
  plans?: Plan[];
} & UseQuery;

export function useFetchPlans(): UseFetchPlans {
  const api = plansApiFactory();
  const { setPlans, plans } = usePlanStore();
  const { ...queryData } = useQuery<Plan[]>({
    queryFn: getPlans,
    setDataState: setPlans,
  });
  async function getPlans() {
    return await api.getPlans();
  }
  return { ...queryData, plans };
}
