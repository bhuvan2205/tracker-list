import { z } from "zod";

export const createGoalSchema = z.object({
  title: z
    .string({
      required_error: "Goal name is required",
      invalid_type_error: "Goal name must be a string",
    })
    .min(5, {
      message: "Goal Name must be at least 5 characters",
    }),
  targetDays: z
    .number({
      required_error: "Target days is required",
      invalid_type_error: "Target days must be a number",
    })
    .min(14, {
      message: "Target days must be greater than 15",
    }),
});

export type createGoalSchemaType = z.infer<typeof createGoalSchema>;

export const updateProgressSchema = z.object({
  workout: z.boolean(),
  diet: z.boolean(),
  sleep: z.boolean(),
  meditation: z.boolean(),
  reading: z.boolean(),
});

export type Progress = z.infer<typeof updateProgressSchema>;

export const createProgressSchema = z.object({
  goalId: z.string(),
  progressDay: z.number(),
  ...updateProgressSchema.shape,
});
