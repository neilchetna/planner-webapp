import { apiFactory } from "@/http/plans.api";
import { Plan } from "@/models";
import { useEffect, useState } from "react";

function usePlans() {
  const [plans, setPlans] = useState<Plan[]>();

  useEffect(() => {
    getPlans();
  }, []);

  async function getPlans() {
    const plansApi = apiFactory();
    const plans = await plansApi.getPlans();

    setPlans(plans);
  }

  return { plans };
}

export default usePlans;
