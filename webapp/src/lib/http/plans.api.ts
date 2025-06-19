import { Plan } from "@/models";
import http from "./api";

export const apiFactory = () => {
  return {
    async getPlans(): Promise<Plan[]> {
      return http.get("/plan").then((res) => res.data);
    },

    async getPlan(planId: string): Promise<Plan> {
      return http.get(`plan/${planId}`).then((res) => res.data);
    },
  };
};
