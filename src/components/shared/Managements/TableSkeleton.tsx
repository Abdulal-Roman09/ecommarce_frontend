import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  row?: number;
  columns?: number;
  showActions?: boolean;
}

export default function TableSkeleton({
  row = 10,
  columns = 6,
  showActions = true,
}: TableSkeletonProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}

            {showActions && (
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Generating skeleton rows */}
          {Array.from({ length: row }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <div className="flex items-center gap-2">
                    {colIndex === 0 && (
                      <Skeleton className="h-10 w-10 rounded-md" />
                    )}
                    <Skeleton className="h-5 w-full" />
                  </div>
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
