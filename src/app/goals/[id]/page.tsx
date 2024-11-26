import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserGoals from "./_components/goal-info";
import prisma from "@/config/db";
import isLoggedIn from "@/lib/checkAuth";
import { notFound } from "next/navigation";
import { getDaysLeftUntilTargetDay } from "@/lib/utils";

const GoalDetail = async ({ params }: { params: { id: string } }) => {
  await isLoggedIn();
  const id = params?.id;

  const goalData = await prisma.goal.findUnique({
    where: { id: Number(id) },
  });

  if (!goalData) {
    return notFound();
  }

  const daysLeft = getDaysLeftUntilTargetDay(
    goalData.createdAt,
    goalData.targetDays
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{goalData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Created on: {goalData.createdAt.toLocaleDateString()}
          </p>
          <p className="text-sm font-medium mt-2">
            {daysLeft > 0 ? `${daysLeft} days left` : "Goal completed"}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Daily Progress</h2>
      <UserGoals goalData={goalData} />
    </div>
  );
};

export default GoalDetail;
