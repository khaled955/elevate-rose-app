"use client";

import { WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
        <div className="flex justify-center mb-3">
          <WifiOff className="h-12 w-12 text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          You’re Offline
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Please check your internet connection and try again.
        </p>

        <span className="inline-block px-4 py-2 text-sm font-semibold rounded bg-red-100 text-red-600">
          No Internet Connection
        </span>
      </div>
    </div>
  );
}
