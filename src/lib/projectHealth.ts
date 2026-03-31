import { differenceInDays, parseISO, isValid } from "date-fns";

export type HealthStatus = "on-track" | "at-risk" | "delayed";

export interface HealthInfo {
  status: HealthStatus;
  label: string;
  daysUntilDue: number | null;
}

export function getProjectHealth(dueDate: string | undefined): HealthInfo {
  if (!dueDate) return { status: "on-track", label: "On Track", daysUntilDue: null };

  const due = parseISO(dueDate);
  if (!isValid(due)) return { status: "on-track", label: "On Track", daysUntilDue: null };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = differenceInDays(due, today);

  if (days < 0) return { status: "delayed", label: "Delayed", daysUntilDue: days };
  if (days <= 2) return { status: "at-risk", label: "At Risk", daysUntilDue: days };
  return { status: "on-track", label: "On Track", daysUntilDue: days };
}
