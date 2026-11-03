"use client";

import { useMemo } from "react";
import { Customer, CustomerStatus } from "@/features/dashboard/pages/customers/types/customer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerActionsDropdown } from "./customers-actions-dropdown";

export const statusColors: Record<CustomerStatus, string> = {
  active: "bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
  inactive: "bg-stone-100 text-stone-700 border border-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800",
  pending: "bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
  blocked: "bg-rose-50 text-rose-800 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40",
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const useCustomerColumns = () => {
  return useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "customerNumber",
        header: "Customer ID",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("customerNumber")}</div>
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
        accessorKey: "dateJoined",
        header: "Date Joined",
        cell: ({ row }) => format(new Date(row.getValue("dateJoined")), "PP"),
      },
      {
        accessorKey: "totalSpent",
        header: "Total Spent",
        cell: ({ row }) => formatCurrency(row.getValue("totalSpent")),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as CustomerStatus;
          return (
            <Badge className={statusColors[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <CustomerActionsDropdown customer={row.original} />,
      },
    ],
    []
  );
};
