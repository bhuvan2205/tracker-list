import GoalCard from "@/components/GoalCard/GoalCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { NewGoalForm } from "./_components/new-goal-form";

// This would typically come from a database
const goals = [
  { id: 1, title: "Learn React", createdAt: "2023-11-01", daysLeft: 30 },
  {
    id: 2,
    title: "Build a personal project",
    createdAt: "2023-11-15",
    daysLeft: 45,
  },
  {
    id: 3,
    title: "Exercise 3 times a week",
    createdAt: "2023-11-20",
    daysLeft: 60,
  },
];

export default function Dashboard() {
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
