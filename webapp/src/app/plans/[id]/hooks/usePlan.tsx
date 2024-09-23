import { apiFactory } from "@/http/plans.api";
import { Plan } from "@/models";
import { Task } from "@/models/task";
import { useEffect, useState } from "react";

type UsePlanProps = {
  id: string;
};

type UsePlan = {
  plan?: Plan;
  selectedTaskId?: string;
  editingTaskId?: string;
  selectTask: (task: Task) => void;
  setEditingTask: (task: Task) => void;
};

function usePlan({ id }: UsePlanProps): UsePlan {
  const [plan, setPlan] = useState<Plan>();
  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const [editingTaskId, setEditingTaskId] = useState<string>();
  const planApi = apiFactory();

  useEffect(() => {
    async function getPlan() {
      const planData = await planApi.getPlan(id);
      setPlan(planData);
    }

    getPlan();
  }, [id, planApi]);

  function selectTask(task: Task) {
    setSelectedTaskId(task.id);
  }

  function setEditingTask(task: Task) {
    setEditingTaskId(task.id);
  }

  return {
    plan,
    selectedTaskId,
    editingTaskId,
    setEditingTask,
    selectTask,
  };
}

export default usePlan;
