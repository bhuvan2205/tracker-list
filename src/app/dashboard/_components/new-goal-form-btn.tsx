"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";


export default function CreateGoalBtn() {
	const { pending } = useFormStatus();
	return (
		<Button disabled={pending}>
			{pending ? "..." : "Create Goal"}
		</Button>
	);
}