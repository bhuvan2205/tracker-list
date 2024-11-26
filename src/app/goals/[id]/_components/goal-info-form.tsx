import { Button } from "@/components/ui/button";
import { TASKS } from "@/constants/goal";
import { checkCurrentDay } from "@/lib/utils";
import { Progress } from "@/schemas/goal";
import React, { FormEvent } from "react";

type GoalInfoFormProps = {
  handleSubmit: (
    id: number,
    event: FormEvent<HTMLFormElement>,
    btnDisabled: boolean
  ) => Promise<void>;
  progress: Progress & { id: number };
  createdAt: Date;
};

const ProgressInfoForm = ({
  handleSubmit,
  progress,
  createdAt,
}: GoalInfoFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(
          progress?.id,
          e,
          !checkCurrentDay(createdAt, progress?.id)
        );
      }}
    >
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2">
          {TASKS.map((task, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                name={task?.name}
                id={task?.name}
                className="cursor-pointer"
              />
              <label className="cursor-pointer" htmlFor={task?.name}>
                {task?.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <Button
          type="submit"
          className="w-fit px-6"
          disabled={!checkCurrentDay(createdAt, progress?.id)}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProgressInfoForm;
