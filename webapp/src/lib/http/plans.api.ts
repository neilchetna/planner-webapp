import { Plan, PlanDTO } from "@/models";
import http from "./api";

export const apiFactory = () => {
  return {
    async getPlans(): Promise<Plan[]> {
      return http.get("/plan").then(res => res.data);
    },

    async getPlan(planId: string): Promise<Plan> {
      return http.get(`plan/${planId}`).then(res => res.data);
    },

    async patchPlan(planId: string, planData: Partial<PlanDTO>): Promise<Plan> {
      return http.patch(`plan/${planId}`, planData).then(res => res.data);
    },

    async postPlan(plan: PlanDTO) {
      return http.post("/plan", plan).then(res => res.data);
    },

    async deletePlan(planId: string) {
      return http.delete(`/plan/${planId}`).then(res => res.data);
    },
  };
};
