import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserGoals from "./_components/goal-info";
import prisma from "@/config/db";
import isLoggedIn from "@/lib/checkAuth";
import { notFound } from "next/navigation";
import { getDaysLeftUntilTargetDay } from "@/lib/utils";

type tParams = Promise<{ id: string[] }>;

const GoalDetail = async ({ params }: { params: tParams }) => {
  await isLoggedIn();
  const { id } = await params;
  const goalId = id?.toString();

  const goalData = await prisma.goal.findUnique({
    where: { id: goalId?.toString() },
  });

  const progress = await prisma.progress.findMany({
    where: { goalId },
  });
  const progressSubmitted = progress.length;

  const fullyCompleted = progress.filter(
    (progress) => !!progress?.isAllCompleted
  ).length;

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
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Created on: {goalData.createdAt.toLocaleDateString()}
              </p>
              <p className="text-sm font-medium mt-2">
                {daysLeft > 0 ? `${daysLeft} days left` : "Goal completed"}
              </p>
            </div>
            {!!progressSubmitted && (
              <div>
                <p className="text-sm">
                  <span className="text-muted-foreground">
                    Toal no of days updated:{" "}
                  </span>
                  {progressSubmitted} {progressSubmitted > 1 ? "days" : "day"}
                </p>
                <p className="text-sm mt-2">
                  <span className="text-muted-foreground">
                    Fully Completed:{" "}
                  </span>
                  {fullyCompleted} {fullyCompleted > 1 ? "days" : "day"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Daily Progress</h2>
      <UserGoals goalData={goalData} goalId={goalId} />
    </div>
  );
};

export default GoalDetail;
