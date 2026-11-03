"use client";

import { useMemo } from "react";
import { Order, OrderStatus } from "@/features/dashboard/pages/orders/types/order";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { OrderActionsDropdown } from "./orders-actions-dropdown";

export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
  processing: "bg-sky-50 text-sky-800 border border-sky-200/80 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40",
  completed: "bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
  cancelled: "bg-rose-50 text-rose-800 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40",
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const useOrderColumns = () => {
  return useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "orderNumber",
        header: "Order Number",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("orderNumber")}</div>
        ),
      },
      {
        accessorKey: "customerName",
        header: "Customer",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span>{row.getValue("customerName")}</span>
            <span className="text-sm text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div>{format(new Date(row.getValue("date")), "MMM d, yyyy, h:mm a")}</div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <div className="font-medium">
            {formatCurrency(row.getValue("amount"))}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as OrderStatus;
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
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => <div>{row.getValue("items")} items</div>,
      },
      {
        id: "actions",
        cell: ({ row }) => <OrderActionsDropdown order={row.original} />,
      },
    ],
    []
  );
};
