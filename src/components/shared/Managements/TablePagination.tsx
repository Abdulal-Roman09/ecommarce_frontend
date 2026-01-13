import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPage: number;
}

export default function TablePagination({
  currentPage,
  totalPage,
}: TablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage <= 1 || isPending}
        onClick={() => navigateToPage(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPage) }, (_, index) => {
          let pageNumber: number;

          if (totalPage <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPage - 2) {
            pageNumber = totalPage - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }

          return (
            <Button
              key={pageNumber}
              size="sm"
              className="w-10"
              disabled={isPending}
              variant={pageNumber === currentPage ? "default" : "outline"}
              onClick={() => navigateToPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalPage || isPending}
        onClick={() => navigateToPage(currentPage + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>

      {/* Page Info */}
      <span className="ml-2 text-sm text-muted-foreground">
        {currentPage} of {totalPage}
      </span>
    </div>
  );
}
