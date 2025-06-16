import { Plan } from "@/models";
import HTTPBuilder from "./api";

export const apiFactory = () => {
  const http = HTTPBuilder({});
  return {
    async getPlans(): Promise<Plan[]> {
      return http.get("/plan").then((res) => res.data);
    },

    async getPlan(planId: string): Promise<Plan> {
      return http.get(`plan/${planId}`).then((res) => res.data);
    },
  };
};
