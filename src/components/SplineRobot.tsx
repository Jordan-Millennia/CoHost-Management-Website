"use client";

import { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function SplineRobot({ className = "" }: { className?: string }) {
  return (
    <Suspense
      fallback={
        <div className={`flex items-center justify-center ${className}`}>
          <div className="w-8 h-8 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
        </div>
      }
    >
      <Spline scene={SCENE_URL} className={className} />
    </Suspense>
  );
}
