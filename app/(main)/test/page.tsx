"use client";

import { Suspense } from "react";
import DocumentsCheckoutContent from "./DocumentsCheckoutContent";

export default function DocumentsCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      }
    >
      <DocumentsCheckoutContent />
    </Suspense>
  );
}
