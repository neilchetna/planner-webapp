import { Plan } from "@/models";

const dummyPlans: Plan[] = [
  {
    id: "1",
    title: "Earning $100k",
    icon: "💸",
    tasks: [
      {
        id: "1",
        title: "Start Passive Income this ",
      },
      { id: "2", title: "Get a High-Paying Job" },
      { id: "3", title: "Invest in Stocks" },
      { id: "4", title: "Save and Budget" },
    ],
  },
  {
    id: "2",
    title: "Start a Business",
    icon: "🏢",
    tasks: [
      { id: "1", title: "Research Market" },
      { id: "2", title: "Create a Business Plan" },
      { id: "3", title: "Register the Business" },
      { id: "4", title: "Launch Product/Service" },
    ],
  },
  {
    id: "3",
    title: "Travel the World",
    icon: "🌍",
    tasks: [
      { id: "1", title: "Get a Passport" },
      { id: "2", title: "Plan Itinerary" },
      { id: "3", title: "Book Flights and Hotels" },
      { id: "4", title: "Pack and Prepare" },
    ],
  },
  {
    id: "4",
    title: "Buy a House",
    icon: "🏠",
    tasks: [
      { id: "1", title: "Save for Down Payment" },
      { id: "2", title: "Get Pre-approved for a Mortgage" },
      { id: "3", title: "Find a Real Estate Agent" },
      { id: "4", title: "Search for Homes" },
    ],
  },
  {
    id: "5",
    title: "Get Fit",
    icon: "💪",
    tasks: [
      { id: "1", title: "Set Fitness Goals" },
      { id: "2", title: "Create a Workout Plan" },
      { id: "3", title: "Join a Gym or Start Home Workouts" },
      { id: "4", title: "Track Progress" },
    ],
  },
  {
    id: "6",
    title: "Learn a New Language Like Japanese to make this longer",
    icon: "🗣️",
    tasks: [
      { id: "1", title: "Choose a Language Course" },
      { id: "2", title: "Practice Daily" },
      { id: "3", title: "Join a Language Exchange" },
      { id: "4", title: "Travel to a Country That Speaks the Language" },
    ],
  },
  {
    id: "7",
    title: "Invest in Stocks",
    icon: "📈",
    tasks: [
      { id: "1", title: "Research Stock Market Basics" },
      { id: "2", title: "Open a Brokerage Account" },
      { id: "3", title: "Create a Diversified Portfolio" },
      { id: "4", title: "Monitor and Adjust Investments" },
    ],
  },
  {
    id: "8",
    title: "Write a Book",
    icon: "📚",
    tasks: [
      { id: "1", title: "Choose a Genre and Topic" },
      { id: "2", title: "Outline the Book" },
      { id: "3", title: "Write Daily" },
      { id: "4", title: "Edit and Revise" },
    ],
  },
];
export const apiFactory = () => {
  return {
    getPlans(): Promise<Plan[]> {
      return new Promise((resolve) => {
        resolve(dummyPlans);
      });
    },

    getPlan(planId: string): Promise<Plan> {
      const plan = dummyPlans.find((plan) => plan.id === planId);

      if (!plan) {
        throw new Error("Plan for the given Id not found");
      }

      return new Promise((resolve) => {
        resolve(plan);
      });
    },
  };
};
