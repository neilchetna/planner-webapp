import { usePlanStore } from "@/lib/store";
import useQuery, { UseQuery } from "../useQuery";
import { Plan } from "@/models";
import { plansApiFactory } from "@/lib/http";

type Props = {
  id: string;
};

type UseFetchPlan = {
  plan?: Plan;
} & UseQuery;

export function useFetchPlan({ id }: Props): UseFetchPlan {
  const plan = usePlanStore((s) => s.plans.find((p) => String(p.id) === id));
  const { updatePlan } = usePlanStore();
  const { ...queryData } = useQuery<Plan>({
    queryFn: getPlan,
    setDataState: updatePlan,
  });
  const api = plansApiFactory();

  async function getPlan() {
    return await api.getPlan(id);
  }
  return { ...queryData, plan };
}
