"use client";

import { Suspense } from "react";
import BookContent from "./BookContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-5">লোড হচ্ছে...</p>}>
      <BookContent />
    </Suspense>
  );
}