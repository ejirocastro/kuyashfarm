"use client";

import { LucideIcon } from "lucide-react";

interface StatCard {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  valueColor?: string;
}

interface StatsGridProps {
  cards: StatCard[];
}

export function StatsGrid({ cards }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className={`mt-2 text-3xl font-bold ${card.valueColor ?? "text-gray-900"}`}>
                  {card.value}
                </p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconBg}`}>
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
