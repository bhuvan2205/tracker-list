"use client";

import { FormEvent, useMemo, useState } from "react";
import { Pagination } from "./pagination";
import { ITEMS_PER_PAGE, TASKS } from "@/constants/goal";
import { Goal } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { checkCurrentDay } from "@/lib/utils";

type UserGoalsProps = {
  goalData: Goal;
};

const UserGoals = ({ goalData }: UserGoalsProps) => {
  const { targetDays = 1, createdAt } = goalData || {};
  const progress = useMemo(() => {
    const progress = [];
    for (let i = 1; i <= targetDays; i++) {
      progress.push({
        id: i,
        completed: false,
        workout: false,
        diet: false,
        sleep: false,
        meditation: false,
        reading: false,
      });
    }
    return progress;
  }, [targetDays]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(targetDays / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = progress?.slice(startIndex, endIndex);

  const handleSubmit = (
    id: number,
    event: FormEvent<HTMLFormElement>,
    btnDisabled: boolean
  ) => {
    if (btnDisabled) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries());
    const currentProgress = {
      workout: formDataObject?.Workout === "on",
      diet: formDataObject?.Diet === "on",
      sleep: formDataObject?.Sleep === "on",
      meditation: formDataObject?.Meditation === "on",
      reading: formDataObject?.Reading === "on",
    };

    console.log("🚀 ~ handleSubmit ~ currentProgress:", currentProgress);
    console.log("🚀 ~ handleSubmit ~ id:", id);
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {currentItems?.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>Day {item?.id}</AccordionTrigger>
            <AccordionContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(
                    item?.id,
                    e,
                    !checkCurrentDay(createdAt, item.id)
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
                        />
                        <label htmlFor={task?.name}>{task?.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="my-4">
                  <Button
                    type="submit"
                    className="w-fit px-6"
                    disabled={!checkCurrentDay(createdAt, item.id)}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default UserGoals;
