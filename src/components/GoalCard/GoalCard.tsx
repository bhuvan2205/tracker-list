import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Goal } from "@/lib/type";

type GoalCardProps = {
  goal: Goal;
};

function GoalCard({ goal }: GoalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Created on: {goal.createdAt}
        </p>
        <p className="text-sm font-medium mt-2">
          {goal.daysLeft > 0
            ? `${goal.daysLeft} days left`
            : "Goal deadline passed"}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/goals/${goal.id}`}>
            View Goal <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default GoalCard;
