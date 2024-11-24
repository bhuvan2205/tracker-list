"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Pagination } from "./_components/pagination";

// Mock data - replace with actual data fetching in a real application
const goalData = {
  id: "1",
  title: "Healthy Lifestyle",
  createdAt: "2023-11-01",
  daysLeft: 30,
  dailyProgress: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    date: new Date(2023, 10, i + 1).toISOString().split("T")[0],
    goals: [
      {
        type: "walking",
        target: 10000,
        completed: Math.random() > 0.5,
        unit: "steps",
      },
      {
        type: "water",
        target: 8,
        completed: Math.random() > 0.5,
        unit: "glasses",
      },
      {
        type: "workout",
        target: 30,
        completed: Math.random() > 0.5,
        unit: "minutes",
      },
      {
        type: "diet",
        target: 2000,
        completed: Math.random() > 0.5,
        unit: "calories",
      },
    ],
    notes: `Progress notes for day ${i + 1}`,
  })),
};

export default function GoalDetail() {
  const params = useParams();
  console.log("🚀 ~ GoalDetail ~ params:", params);

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [goals, setGoals] = useState(goalData.dailyProgress);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<number>>(new Set());

  const itemsPerPage = 7;
  const totalPages = Math.ceil(goals.length / itemsPerPage);
  const currentItems = goals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleGoalToggle = (dayIndex: number, goalIndex: number) => {
    setGoals((prevGoals) => {
      const newGoals = [...prevGoals];
      newGoals[dayIndex].goals[goalIndex].completed =
        !newGoals[dayIndex].goals[goalIndex].completed;
      return newGoals;
    });
    setUnsavedChanges((prev) => new Set(prev).add(dayIndex));
  };

  const handleSave = (dayIndex: number) => {
    // Here you would typically make an API call to save the changes
    console.log(`Saving changes for day ${dayIndex + 1}`);
    setUnsavedChanges((prev) => {
      const newSet = new Set(prev);
      newSet.delete(dayIndex);
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{goalData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Created on: {goalData.createdAt}
          </p>
          <p className="text-sm font-medium mt-2">
            {goalData.daysLeft > 0
              ? `${goalData.daysLeft} days left`
              : "Goal completed"}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Daily Progress</h2>

      {currentItems.map((item, dayIndex) => (
        <Card key={item.day} className="mb-4">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Day {item.day}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setExpandedDay(expandedDay === item.day ? null : item.day)
              }
              aria-expanded={expandedDay === item.day}
              aria-controls={`day-${item.day}-content`}
            >
              {expandedDay === item.day ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">
                {expandedDay === item.day ? "Collapse" : "Expand"} day{" "}
                {item.day} details
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleSave((currentPage - 1) * itemsPerPage + dayIndex)
              }
              disabled={
                !unsavedChanges.has((currentPage - 1) * itemsPerPage + dayIndex)
              }
            >
              Save
            </Button>
          </CardHeader>
          {expandedDay === item.day && (
            <CardContent id={`day-${item.day}-content`} className="p-4">
              {item.goals.map((goal, goalIndex) => (
                <div
                  key={goal.type}
                  className="flex items-center space-x-2 mb-2"
                >
                  <Checkbox
                    id={`${item.day}-${goal.type}`}
                    checked={goal.completed}
                    onCheckedChange={() =>
                      handleGoalToggle(
                        (currentPage - 1) * itemsPerPage + dayIndex,
                        goalIndex
                      )
                    }
                  />
                  <label
                    htmlFor={`${item.day}-${goal.type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} (
                    {goal.target} {goal.unit})
                  </label>
                </div>
              ))}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Notes:</h3>
                <p className="text-sm">{item.notes}</p>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
