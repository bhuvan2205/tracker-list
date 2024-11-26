"use server";

import prisma from "@/config/db";
import { HTTP_STATUS } from "@/constants/http";
import { ROUTES } from "@/constants/routes";
import isLoggedIn from "@/lib/checkAuth";
import { handleErrors } from "@/lib/error";
import { createGoalSchema } from "@/schemas/goal";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const createNewGoal = async (formData: unknown) => {
  const validatedData = createGoalSchema.safeParse(formData);

  if (!validatedData.success) {
    return { status: HTTP_STATUS.BAD_REQUEST, message: "Invalid data" };
  }

  try {
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
