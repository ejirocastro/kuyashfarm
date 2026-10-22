"use client";

import { FileText, CheckCircle, XCircle, Clock, Truck } from "lucide-react";
import { StatsGrid } from "./StatsGrid";
import { getTierDisplayName, getTierBadgeColor } from "@/lib/features/distributor/distributor-utils";
import type { DistributorApplication } from "@/lib/types";

interface DistributorStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface DistributorsTabProps {
  stats: DistributorStats;
  applications: DistributorApplication[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function DistributorsTab({ stats, applications, onApprove, onReject }: DistributorsTabProps) {
  const cards = [
    { label: "Total Applications", value: stats.total,    icon: FileText,    iconBg: "bg-blue-100",  iconColor: "text-blue-600" },
    { label: "Pending Review",     value: stats.pending,  icon: Clock,       iconBg: "bg-amber-100", iconColor: "text-amber-600", valueColor: "text-amber-600" },
    { label: "Approved",           value: stats.approved, icon: CheckCircle, iconBg: "bg-green-100", iconColor: "text-green-600", valueColor: "text-green-600" },
    { label: "Rejected",           value: stats.rejected, icon: XCircle,     iconBg: "bg-red-100",   iconColor: "text-red-600",   valueColor: "text-red-600" },
  ];

  return (
    <>
      <StatsGrid cards={cards} />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Distributor Applications</h2>
          <p className="mt-1 text-sm text-gray-600">Review and manage distributor partnership applications</p>
        </div>

        {applications.length === 0 ? (
          <div className="p-12 text-center">
            <Truck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-sm font-medium text-gray-900">No applications yet</h3>
            <p className="mt-2 text-sm text-gray-600">Distributor applications will appear here for review.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Applicant", "Business Details", "Distribution Area", "Tier", "Expected Volume", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.userName}</div>
                      <div className="text-sm text-gray-500">{app.userEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{app.businessName}</div>
                      <div className="text-sm text-gray-500">{app.yearsInBusiness} years</div>
                      <div className="text-xs text-gray-400 mt-1">{app.businessAddress}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{app.distributionArea}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.tier && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getTierBadgeColor(app.tier)}`}>
                          {getTierDisplayName(app.tier).split(" - ")[0]}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{app.expectedVolume}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        app.status === "pending"  ? "bg-amber-100 text-amber-800" :
                        app.status === "approved" ? "bg-green-100 text-green-800" :
                                                    "bg-red-100 text-red-800"
                      }`}>
                        {app.status === "pending" ? "Pending" : app.status === "approved" ? "Approved" : "Rejected"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.status === "pending" ? (
                        <div className="flex gap-2">
                          <button onClick={() => onApprove(app.id)} className="text-green-600 hover:text-green-900 font-medium">
                            Approve
                          </button>
                          <button onClick={() => onReject(app.id)} className="text-red-600 hover:text-red-900 font-medium">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 capitalize">{app.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
