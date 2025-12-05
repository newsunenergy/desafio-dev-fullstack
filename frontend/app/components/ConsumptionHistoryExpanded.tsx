"use client";

import { ConsumptionHistory } from "@/types";
import { useState } from "react";

interface ConsumptionHistoryExpandedProps {
  history: ConsumptionHistory[];
}

export function ConsumptionHistoryExpanded({
  history,
}: ConsumptionHistoryExpandedProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pt-3 border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded hover:bg-orange-200 transition-colors cursor-pointer"
      >
        <span>
          Histórico
          {isExpanded ? " ▼" : " ▶"}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 bg-orange-50 rounded-md p-4 border border-orange-200">
          <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {history.map((item, index) => {
              const totalKwh = item.offPeakKwh + item.peakKwh;
              return (
                <div
                  key={index}
                  className="bg-white rounded p-2 text-center border border-orange-100"
                >
                  <p className="text-xs text-gray-500 font-medium">
                    {new Date(item.consumptionDate).toLocaleDateString(
                      "pt-BR",
                      {
                        month: "short",
                        year: "2-digit",
                      }
                    )}
                  </p>
                  <p className="text-sm font-semibold text-orange-700">
                    {totalKwh} kWh
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Ponta: {item.peakKwh} kWh
                  </p>
                  <p className="text-xs text-gray-600">
                    Fora de ponta: {item.offPeakKwh} kWh
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
