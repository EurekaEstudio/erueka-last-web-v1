'use client'

import React, { Suspense } from 'react';
import { cn } from "@/lib/utils";

const Spline = React.lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense fallback={<div className="w-full h-full bg-gray-900 animate-pulse" />}>
      <Spline
        scene={scene}
        className={cn("w-full h-full", className)}
      />
    </Suspense>
  );
}