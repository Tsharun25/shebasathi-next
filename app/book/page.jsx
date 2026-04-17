"use client";
import toast from "react-hot-toast";
import { Suspense } from "react";
import BookContent from "./BookContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookContent />
    </Suspense>
  );
}