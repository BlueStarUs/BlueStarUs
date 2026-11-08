"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  X,
  Edit3,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { ConsultationLead, LeadStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All Leads" },
  { value: "new", label: "New Leads" },
  { value: "contacted", label: "Contacted" },
  { value: "consulted", label: "Consulted" },
  { value: "enrolled", label: "Enrolled" },
  { value: "archived", label: "Archived" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<ConsultationLead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notesInput, setNotesInput] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.fullName.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        (lead.phone && lead.phone.toLowerCase().includes(q)) ||
        (lead.targetColleges && lead.targetColleges.toLowerCase().includes(q)) ||
        lead.message.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, searchQuery]);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLead.id, notes: notesInput }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: notesInput } : l))
        );
        setSelectedLead((prev) => (prev ? { ...prev, notes: notesInput } : null));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this consultation lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Full Name", "Email", "Phone", "Grade", "Interest", "Target Colleges", "Status", "Date", "Message", "Notes"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.studentGrade || ""}"`,
      `"${l.interest || ""}"`,
      `"${(l.targetColleges || "").replace(/"/g, '""')}"`,
      l.status,
      l.createdAt,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bluestars_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
            Consultation Leads &amp; Inquiries
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
            Manage, review, and track families seeking college admissions consulting.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-white hover:bg-brand-sky border border-brand-border text-brand-navy font-bold text-xs sm:text-[13px] font-heading shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-brand-blue" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-[5px] border border-brand-border shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-text/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, email, target school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-xs sm:text-[13px] text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-sans"
            />
          </div>

          {/* Result Count */}
          <div className="text-xs font-bold font-heading text-brand-navy/70">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                "px-3 py-1.5 rounded-[5px] text-xs font-bold font-heading whitespace-nowrap transition-colors cursor-pointer",
                statusFilter === opt.value
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-[#F8FBFE] text-brand-navy/80 hover:bg-brand-sky hover:text-brand-blue border border-brand-border/60"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[5px] border border-brand-border shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-brand-navy text-xs font-bold font-heading">
            <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
            <span>Loading Consultation Leads...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 text-center text-brand-text text-xs sm:text-sm">
            No consultation inquiries match your search or filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F8FBFE] border-b border-brand-border text-brand-navy font-bold font-heading uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Applicant / Parent</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Grade &amp; Target</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F8FBFE]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-navy text-sm font-heading">
                        {lead.fullName}
                      </div>
                      <div className="text-[11px] text-brand-text truncate max-w-xs mt-0.5">
                        {lead.interest}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-brand-navy font-medium">{lead.email}</div>
                      {lead.phone && <div className="text-brand-text mt-0.5">{lead.phone}</div>}
                    </td>

                    <td className="py-3.5 px-4">
                      {lead.studentGrade ? (
                        <span className="inline-block px-2 py-0.5 rounded-[3px] bg-brand-sky text-brand-blue font-bold text-[11px] font-heading mb-1">
                          {lead.studentGrade}
                        </span>
                      ) : (
                        <span className="text-brand-text/50">-</span>
                      )}
                      <div className="text-brand-navy truncate max-w-[200px]">
                        {lead.targetColleges || "General Admissions"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={cn(
                          "px-2.5 py-1 rounded-[4px] font-bold text-[11px] font-heading border cursor-pointer focus:outline-none",
                          lead.status === "new" && "bg-amber-50 text-amber-800 border-amber-200",
                          lead.status === "contacted" && "bg-blue-50 text-blue-800 border-blue-200",
                          lead.status === "consulted" && "bg-purple-50 text-purple-800 border-purple-200",
                          lead.status === "enrolled" && "bg-[#E3F5EA] text-[#2F9E5C] border-[#c0ebd2]",
                          lead.status === "archived" && "bg-gray-100 text-gray-700 border-gray-300"
                        )}
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="consulted">Consulted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-brand-text">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLead(lead);
                            setNotesInput(lead.notes || "");
                          }}
                          className="px-2.5 py-1 rounded-[4px] bg-[#E8F3FC] hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-[11px] font-heading transition-colors"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          title="Delete Lead"
                          className="p-1 rounded-[4px] text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details & Counselor Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#072442]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[5px] border border-brand-border w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1 rounded-[5px] text-brand-text hover:text-brand-navy hover:bg-brand-sky"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue font-heading">
                CONSULTATION LEAD DETAILS
              </span>
              <h3 className="text-xl font-extrabold text-brand-navy font-heading mt-0.5">
                {selectedLead.fullName}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-[5px] bg-[#F8FBFE] border border-brand-border mb-4 text-xs font-sans">
              <div>
                <span className="text-brand-text/70 block">Email Address</span>
                <span className="font-bold text-brand-navy font-heading">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-brand-text/70 block">Phone Number</span>
                <span className="font-bold text-brand-navy font-heading">{selectedLead.phone || "Not provided"}</span>
              </div>
              <div>
                <span className="text-brand-text/70 block">Student Grade</span>
                <span className="font-bold text-brand-navy font-heading">{selectedLead.studentGrade || "Not specified"}</span>
              </div>
              <div>
                <span className="text-brand-text/70 block">Interest Area</span>
                <span className="font-bold text-brand-navy font-heading">{selectedLead.interest}</span>
              </div>
            </div>

            {selectedLead.targetColleges && (
              <div className="mb-4">
                <span className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Target Colleges &amp; Majors
                </span>
                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-navy font-sans bg-[#F8FBFE] p-3 rounded-[5px] border border-brand-border">
                  {selectedLead.targetColleges}
                </p>
              </div>
            )}

            <div className="mb-4">
              <span className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                Applicant Inquiry Message
              </span>
              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-navy font-sans bg-[#F8FBFE] p-3 rounded-[5px] border border-brand-border whitespace-pre-wrap">
                {selectedLead.message}
              </p>
            </div>

            {/* Counselor Notes */}
            <div className="mb-6">
              <label className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1.5">
                Counselor Internal Notes
              </label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add meeting notes, test scores, scholarship package recommendations..."
                className="w-full p-3 rounded-[5px] border border-brand-border bg-white text-xs text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:border-brand-blue font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-[5px] text-xs font-bold font-heading text-brand-navy hover:bg-brand-sky transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isUpdating}
                className="px-5 py-2 rounded-[5px] text-xs font-bold font-heading bg-brand-blue hover:bg-brand-navy text-white transition-colors cursor-pointer shadow-xs"
              >
                {isUpdating ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

