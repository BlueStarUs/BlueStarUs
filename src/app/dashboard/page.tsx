import React from "react";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  PlusCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const stats = [
    { label: "Target Colleges", value: "8", change: "3 Reach, 3 Match, 2 Safety", icon: GraduationCap },
    { label: "Applications Active", value: "4", change: "In Progress", icon: Clock },
    { label: "Essays Completed", value: "6 / 9", change: "66% Done", icon: CheckCircle2 },
    { label: "Next Major Deadline", value: "Nov 15", change: "Early Action (14 days)", icon: Calendar },
  ];

  const collegeList = [
    { name: "Stanford University", type: "Reach", status: "Essay Review", deadline: "Nov 01", progress: 85 },
    { name: "UC Berkeley", type: "Match", status: "Personal Insight Draft", deadline: "Nov 30", progress: 60 },
    { name: "Columbia University", type: "Reach", status: "Gathering Recommendation", deadline: "Jan 01", progress: 40 },
    { name: "University of Michigan", type: "Match", status: "Application Ready", deadline: "Feb 01", progress: 95 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-brand shadow-card border border-brand-border">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading">
            Application Overview &amp; Strategy
          </h1>
          <p className="text-xs text-brand-text mt-1">
            Tracking your college admission milestones for the upcoming cycle.
          </p>
        </div>
        <Button variant="primary" size="sm" className="w-fit">
          <PlusCircle className="w-4 h-4 mr-1.5" />
          <span>Add College</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5 flex flex-col justify-between" hoverEffect={false}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-brand-text font-heading">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-full bg-brand-sky text-brand-blue grid place-items-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-brand-navy font-heading">
                  {stat.value}
                </div>
                <div className="text-[11px] text-brand-blue font-medium mt-1">
                  {stat.change}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Target College Strategy Table */}
      <div className="bg-white rounded-brand shadow-card border border-brand-border overflow-hidden">
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <h2 className="font-heading font-bold text-base text-brand-navy">
            Selected Institutions &amp; Deadlines
          </h2>
          <span className="text-xs text-brand-blue font-semibold">Active Cycle: 2024-2025</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-bg text-brand-navy font-heading uppercase text-[10px] tracking-wider border-b border-brand-border">
              <tr>
                <th className="p-4">College Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Readiness</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {collegeList.map((col) => (
                <tr key={col.name} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="p-4 font-semibold text-brand-navy">{col.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        col.type === "Reach"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-brand-sky text-brand-blue"
                      }`}
                    >
                      {col.type}
                    </span>
                  </td>
                  <td className="p-4 text-brand-text">{col.status}</td>
                  <td className="p-4 font-medium text-brand-navy">{col.deadline}</td>
                  <td className="p-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-brand-blue h-2 rounded-full"
                        style={{ width: `${col.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-brand-blue hover:text-brand-navy font-semibold inline-flex items-center gap-1">
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

