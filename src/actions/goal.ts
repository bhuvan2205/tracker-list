"use server";

import prisma from "@/config/db";
import { HTTP_STATUS } from "@/constants/http";
import { ROUTES } from "@/constants/routes";
import isLoggedIn from "@/lib/checkAuth";
import { handleErrors } from "@/lib/error";
import { createGoalSchema, createProgressSchema } from "@/schemas/goal";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const createNewGoal = async (formData: unknown) => {
  try {
    const validatedData = createGoalSchema.safeParse(formData);

    if (!validatedData.success) {
      return { status: HTTP_STATUS.BAD_REQUEST, message: "Invalid data" };
    }

    await isLoggedIn();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    await prisma.goal.create({
      data: {
        ...validatedData?.data,
        userId: user.id,
        createdAt: new Date(),
      },
    });

    revalidatePath(ROUTES.DASHBOARD);

    return {
      status: HTTP_STATUS.CREATED,
      message: "Goal Created!",
    };
  } catch (error) {
    const message = handleErrors(error, "Could not create goal");
    return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, message };
  }
};

export const updateDailyTask = async (formData: unknown) => {
  try {
    const validatedData = createProgressSchema.safeParse(formData);

    if (!validatedData.success) {
      return { status: HTTP_STATUS.BAD_REQUEST, message: "Invalid data" };
    }

    await isLoggedIn();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { status: HTTP_STATUS.UNAUTHORIZED, message: "Unauthorized" };
    }

    const isAllCompleted = Object.values(validatedData.data).every(
      (value) => !!value
    );

    const data = {
      ...validatedData?.data,
      isAllCompleted,
      createdAt: new Date(),
    };

    await prisma.progress.create({
      data,
    });

    revalidatePath(`${ROUTES.GOALS}/${validatedData?.data?.goalId}`);

    return {
      status: HTTP_STATUS.OK,
      message: "Status updated!",
    };
  } catch (error) {
    const message = handleErrors(error, "Could not submit goal");
    return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, message };
  }
};
