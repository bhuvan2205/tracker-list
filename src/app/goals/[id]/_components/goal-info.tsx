"use client";

import { FormEvent, useMemo, useState } from "react";
import { Pagination } from "./pagination";
import { ITEMS_PER_PAGE } from "@/constants/goal";
import { Goal } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { updateDailyTask } from "@/actions/goal";
import ProgressInfoForm from "./goal-info-form";

type UserGoalsProps = {
  goalData: Goal;
  goalId: Promise<string>;
};

const UserGoals = ({ goalData, goalId }: UserGoalsProps) => {
  const { targetDays = 1, createdAt } = goalData || {};
  const progress = useMemo(() => {
    return [...Array(targetDays)].map((_, index) => {
      return {
        id: index + 1,
        completed: false,
        workout: false,
        diet: false,
        sleep: false,
        meditation: false,
        reading: false,
      };
    });
  }, [targetDays]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(targetDays / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = progress?.slice(startIndex, endIndex);

  const handleSubmit = async (
    id: number,
    event: FormEvent<HTMLFormElement>,
    btnDisabled: boolean
  ) => {
    if (btnDisabled) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries());

    const payload = {
      workout: formDataObject?.Workout === "on",
      diet: formDataObject?.Diet === "on",
      sleep: formDataObject?.Sleep === "on",
      meditation: formDataObject?.Meditation === "on",
      reading: formDataObject?.Reading === "on",
      goalId: Number(goalId),
      progressDay: id,
    };

    await updateDailyTask(payload);
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {currentItems?.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>Day {item?.id}</AccordionTrigger>
            <AccordionContent>
              <ProgressInfoForm
                handleSubmit={handleSubmit}
                progress={item}
                createdAt={createdAt}
              />
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
