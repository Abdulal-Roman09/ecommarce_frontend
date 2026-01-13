"use client";


export interface Column<T> {
  headers: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface ManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey?: (row: T) => string | number;
  emptyMessage?: string;
  isRefreshing?: boolean;
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, MoreHorizontal, Edit, Trash2 } from "lucide-react";

function ManagementTable<T>({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage = "No records found",
  isRefreshing = false,
}: ManagementTableProps<T>) {
  const hasAction = onView || onEdit || onDelete;

  return (
    <div className="rounded-lg border relative overflow-hidden">
      {/* Loading overlay for refresh state */}
      {isRefreshing && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Refreshing....</p>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {/* Dynamic Headers */}
            {columns.map((col, colIndex) => (
              <TableHead key={colIndex} className={col.className}>
                {col.headers}
              </TableHead>
            ))}
            {/* Action Header */}
            {hasAction && (
              <TableHead className="w-[70px] text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            /* Empty State */
            <TableRow>
              <TableCell
                colSpan={columns.length + (hasAction ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            /* Data Rows */
            data.map((item, rowIndex) => (
              <TableRow key={getRowKey ? getRowKey(item) : rowIndex}>
                {/* Dynamic Cells */}
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : (item[col.accessor] as React.ReactNode)}
                  </TableCell>
                ))}

                {/* Actions Dropdown */}
                {hasAction && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(item)}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                        )}
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(item)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => onDelete(item)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ManagementTable;
