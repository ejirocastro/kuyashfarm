"use client";

import Link from "next/link";
import { Users, FileText, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { StatsGrid } from "./StatsGrid";

interface WholesaleStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface WholesaleTabProps {
  stats: WholesaleStats;
}

export function WholesaleTab({ stats }: WholesaleTabProps) {
  const cards = [
    { label: "Total Applications", value: stats.total,    icon: FileText,    iconBg: "bg-blue-100",   iconColor: "text-blue-600" },
    { label: "Pending Review",     value: stats.pending,  icon: TrendingUp,  iconBg: "bg-amber-100",  iconColor: "text-amber-600",  valueColor: "text-amber-600" },
    { label: "Approved",           value: stats.approved, icon: CheckCircle, iconBg: "bg-green-100",  iconColor: "text-green-600",  valueColor: "text-green-600" },
    { label: "Rejected",           value: stats.rejected, icon: XCircle,     iconBg: "bg-red-100",    iconColor: "text-red-600",    valueColor: "text-red-600" },
  ];

  return (
    <>
      <StatsGrid cards={cards} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/wholesale-applications"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Review Applications</h3>
              <p className="text-sm text-gray-600">{stats.pending} pending applications</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <FileText className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-500">More Features Coming</h3>
              <p className="text-sm text-gray-500">User management, reports, etc.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex gap-3">
          <svg className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Admin Panel Information</h3>
            <p className="text-sm text-blue-800">
              This is a frontend-only admin panel using localStorage. In production,
              this would connect to a backend API. All changes affect local browser data only.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
