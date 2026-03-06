"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  loading?: boolean;
  /** How many sibling pages to show around the current page (default: 1) */
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

// ─────────────────────────────────────────────────────────────
// Helper — pure function, easy to unit-test
// ─────────────────────────────────────────────────────────────
function buildPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | "...")[] {
  // Show everything when total is small
  const showAll = totalPages <= siblingCount * 2 + 5;
  if (showAll) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left  = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);

  const showLeftDots  = left > 2;
  const showRightDots = right < totalPages - 1;

  const pages: (number | "...")[] = [1];

  if (showLeftDots)  pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (showRightDots) pages.push("...");
  pages.push(totalPages);

  return pages;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export function Pagination({
  currentPage,
  totalPages,
  loading = false,
  siblingCount = 1,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages, siblingCount);
  const isFirst = currentPage === 1;
  const isLast  = currentPage === totalPages;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
      {/* Page count */}
      <p className="text-sm text-muted-foreground order-2 sm:order-1">
        Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirst || loading}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Previous</span>
        </Button>

        {/* Page buttons */}
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-muted-foreground select-none">
              …
            </span>
          ) : (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
              className={`w-9 ${currentPage !== page ? "bg-transparent" : ""}`}
              onClick={() => onPageChange(page)}
              disabled={loading}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLast || loading}
          aria-label="Next page"
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}