"use client";

import { useMemo } from "react";
import { Lead, LeadStatus } from "@/features/dashboard/pages/leads/types/lead";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { LeadActionsDropdown } from "./leads-actions-dropdown";

export const statusColors: Record<LeadStatus, string> = {
  new: "bg-sky-50 text-sky-800 border border-sky-200/80 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40",
  contacted: "bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
  qualified: "bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
  unqualified: "bg-rose-50 text-rose-800 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40",
  converted: "bg-purple-50 text-purple-800 border border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40",
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const useLeadColumns = () => {
  return useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: "leadNumber",
        header: "Lead ID",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("leadNumber")}</div>
        ),
      },
      {
        accessorKey: "fullName",
        header: "Contact",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span>{row.getValue("fullName")}</span>
            <span className="text-sm text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => <div>{row.getValue("company")}</div>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div>{format(new Date(row.getValue("date")), "MMM d, yyyy, h:mm a")}</div>
        ),
      },
      {
        accessorKey: "potentialValue",
        header: "Potential Value",
        cell: ({ row }) => (
          <div className="font-medium">
            {formatCurrency(row.getValue("potentialValue"))}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as LeadStatus;
          return (
            <Badge
              className={statusColors[status]}
              variant="outline"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      },
      {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => <div>{row.getValue("source")}</div>,
      },
      {
        id: "actions",
        cell: ({ row }) => <LeadActionsDropdown lead={row.original} />,
      },
    ],
    []
  );
};
