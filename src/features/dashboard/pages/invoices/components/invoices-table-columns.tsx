"use client";

import { useMemo } from "react";
import { Invoice, InvoiceStatus } from "@/features/dashboard/pages/invoices/types/invoice";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceActionsDropdown } from "./invoices-actions-dropdown";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const statusColors: Record<InvoiceStatus, string> = {
  draft: "bg-stone-100 text-stone-700 border border-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800",
  pending: "bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
  paid: "bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
  overdue: "bg-rose-50 text-rose-800 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40",
  cancelled: "bg-rose-50 text-rose-800 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40",
};

export const useInvoiceColumns = () => {
  return useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        accessorKey: "invoiceNumber",
        header: "Invoice Number",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("invoiceNumber")}</div>
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
        header: "Issue Date",
        cell: ({ row }) => format(new Date(row.getValue("date")), "PPp"),
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => format(new Date(row.getValue("dueDate")), "PPp"),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => formatCurrency(row.getValue("amount")),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as InvoiceStatus;
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
        cell: ({ row }) => <InvoiceActionsDropdown invoice={row.original} />,
      },
    ],
    []
  );
};
