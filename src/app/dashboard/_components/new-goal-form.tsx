"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { createGoalSchema, createGoalSchemaType } from "@/schemas/goal";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateGoalBtn from "./new-goal-form-btn";
import { createNewGoal } from "@/actions/goal";
import { HTTP_STATUS } from "@/constants/http";
import { toast } from "react-toastify";

export function NewGoalForm() {
  const [open, setOpen] = useState(false);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<createGoalSchemaType>({
    resolver: zodResolver(createGoalSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
          <DialogDescription>
            Set a new goal with a name and the number of days to achieve it.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async () => {
            const results = await trigger();
            if (!results) return;

            const data = await createNewGoal(getValues());

            if (data?.status === HTTP_STATUS.CREATED) {
              setOpen(false);
              toast.success("Goal created successfully", {
                position: "top-right",
                autoClose: 1500,
                theme: "light",
              });
            }
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Goal Name
              </Label>
              <Input id="title" className="col-span-3" {...register("title")} />
            </div>
            {errors?.title && (
              <small className="text-red-500 ps-24">
                {errors?.title?.message}
              </small>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="targetDays" className="text-right">
                Target days
              </Label>
              <Input
                id="targetDays"
                type="number"
                className="col-span-3"
                {...register("targetDays", { valueAsNumber: true })}
              />
            </div>
            {errors?.targetDays && (
              <small className="text-red-500 ps-24">
                {errors?.targetDays?.message}
              </small>
            )}
          </div>
          <DialogFooter>
            <CreateGoalBtn />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
