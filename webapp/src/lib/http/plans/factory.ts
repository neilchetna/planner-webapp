import { Plan } from "@/models";
import { AxiosResponse } from "axios";
import { useApi } from "../api";
import { PlanCreateDTO, PlanResponseDTO, PlanUpdateDTO } from "./dto";
import { planToVM } from "./transformer";

export const apiFactory = () => {
  const http = useApi();
  const transformPlanDTO2VM = (res: AxiosResponse<PlanResponseDTO>) => planToVM(res.data);
  const transformPlansDTO2VM = (res: AxiosResponse<PlanResponseDTO[]>) => res.data.map(planToVM);

  return {
    async getPlans(): Promise<Plan[]> {
      return http.get<PlanResponseDTO[]>("/plan").then(transformPlansDTO2VM);
    },

    async getPlan(planId: string): Promise<Plan> {
      return http.get<PlanResponseDTO>(`plan/${planId}`).then(transformPlanDTO2VM);
    },

    async patchPlan(planId: string, planData: PlanUpdateDTO): Promise<Plan> {
      return http.patch<PlanResponseDTO>(`plan/${planId}`, planData).then(transformPlanDTO2VM);
    },

    async postPlan(plan: PlanCreateDTO) {
      return http.post<PlanResponseDTO>("/plan", plan).then(transformPlanDTO2VM);
    },

    async deletePlan(planId: string) {
      return http.delete(`/plan/${planId}`).then(transformPlanDTO2VM);
    },
  };
};
