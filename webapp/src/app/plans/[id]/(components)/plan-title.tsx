import { Plan } from "@/models";
import GhostInput from "@/ui/ghost-input/ghost-input";
import { useRef, useState } from "react";
import { z } from "zod/v4";

type Props = {
  plan: Plan;
  onTitleSubmit(title: string): void;
};

export default function PlanTitle({ plan, onTitleSubmit }: Props) {
  const [textValue, setTextValue] = useState<string>(plan.title);
  const titleSchema = z
    .string()
    .nonempty()
    .refine(val => val !== plan.title); // Prevent network calls from the same title
  const ref = useRef<HTMLTextAreaElement>(null);

  const submitTitle = () => {
    const res = titleSchema.safeParse(textValue);

    if (res.success) {
      onTitleSubmit(res.data);
      ref.current?.blur();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitTitle();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <GhostInput
        onBlur={() => submitTitle()}
        onChange={e => setTextValue(e.target.value)}
        className="plan-title-input h-fit bg-transparent text-3xl"
        name="title"
        type="text"
        placeholder="Whats your plan?"
        defaultValue={plan.title}
      />
    </form>
  );
}
