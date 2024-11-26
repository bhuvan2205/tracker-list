import GoalCard from "@/components/GoalCard/GoalCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { NewGoalForm } from "./_components/new-goal-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/config/db";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const goals = await prisma.goal.findMany({
    where: { userId: user?.id },
  });

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Goals</h1>
          <NewGoalForm />
        </div>

        {goals.length === 0 ? (
          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle>No Goals Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You have not created any goals yet. Start by adding your first
                goal!
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <NewGoalForm />
            </CardFooter>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
