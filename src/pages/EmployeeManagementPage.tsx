import React, { useState } from "react";
import { Icon, Status } from "../components/UI";
import EmployeeDetailView from "../components/EmployeeDetailView";
import DepartmentScopedIAM from "../components/DepartmentScopedIAM";
import OrgTreeChartView from "../components/OrgTreeChartView";

export interface VisilyEmployee {
  id: string;
  avatarUrl?: string;
  avatarInitials: string;
  avatarBg: string;
  name: string;
  employeeId: string;
  jobTitle: string;
  department: string;
  employmentType: "Full time" | "Part time" | "Contractor" | "Probation";
  office: string;
  phone: string;
  email: string;
}

const VISILY_EMPLOYEES: VisilyEmployee[] = [
  {
    id: "A0001",
    employeeId: "A0001",
    name: "Elizabeth Lopez",
    avatarInitials: "EL",
    avatarBg: "#fce7f3",
    jobTitle: "UX Leader",
    department: "Products",
    employmentType: "Full time",
    office: "Axis Building",
    phone: "(719) 860-5684",
    email: "elizabethlopez95@hotmail.com",
  },
  {
    id: "A0002",
    employeeId: "A0002",
    name: "Matthew Martinez",
    avatarInitials: "MM",
    avatarBg: "#dbeafe",
    jobTitle: "Senior UI/UX Designer",
    department: "Products",
    employmentType: "Full time",
    office: "Axis Building",
    phone: "202-555-0143",
    email: "mmartinez@gmail.com",
  },
  {
    id: "A0003",
    employeeId: "A0003",
    name: "Brian Harris",
    avatarInitials: "BH",
    avatarBg: "#dcfce7",
    jobTitle: "Senior UI Designer",
    department: "Products",
    employmentType: "Full time",
    office: "Elevate Complex",
    phone: "202-555-0123",
    email: "bharris@gmail.com",
  },
  {
    id: "A0004",
    employeeId: "A0004",
    name: "Maria White",
    avatarInitials: "MW",
    avatarBg: "#fef3c7",
    jobTitle: "UI/UX Designer",
    department: "Products",
    employmentType: "Full time",
    office: "Elevate Complex",
    phone: "202-555-0188",
    email: "mwhite@gmail.com",
  },
  {
    id: "A0005",
    employeeId: "A0005",
    name: "Elizabeth Watson",
    avatarInitials: "EW",
    avatarBg: "#ede9fe",
    jobTitle: "UI/UX Designer",
    department: "Products",
    employmentType: "Part time",
    office: "Elevate Complex",
    phone: "202-555-0432",
    email: "ewatson@gmail.com",
  },
  {
    id: "A0006",
    employeeId: "A0006",
    name: "John Nelson",
    avatarInitials: "JN",
    avatarColor: "#0284c7",
    avatarBg: "#e0f2fe",
    jobTitle: "UI/UX Designer",
    department: "Products",
    employmentType: "Part time",
    office: "Elevate Complex",
    phone: "202-555-0199",
    email: "jnelson@gmail.com",
  },
  {
    id: "A0007",
    employeeId: "A0007",
    name: "Caleb Jones",
    avatarInitials: "CJ",
    avatarBg: "#ffedd5",
    jobTitle: "UX Designer",
    department: "Growth",
    employmentType: "Full time",
    office: "Innovate Tower",
    phone: "202-555-0177",
    email: "cjones@gmail.com",
  },
  {
    id: "A0008",
    employeeId: "A0008",
    name: "Ashley Robinson",
    avatarInitials: "AR",
    avatarBg: "#fae8ff",
    jobTitle: "Graphic Designer",
    department: "Marketing",
    employmentType: "Full time",
    office: "Innovate Tower",
    phone: "202-555-0166",
    email: "arobinson@gmail.com",
  },
  {
    id: "A0009",
    employeeId: "A0009",
    name: "Brooklyn Wilson",
    avatarInitials: "BW",
    avatarBg: "#ccfbf1",
    jobTitle: "UX Designer Intern",
    department: "Growth",
    employmentType: "Contractor",
    office: "Innovate Tower",
    phone: "202-555-0155",
    email: "bwilson@gmail.com",
  },
  {
    id: "A0010",
    employeeId: "A0010",
    name: "Brian Harris (Contract)",
    avatarInitials: "BH",
    avatarBg: "#e2e8f0",
    jobTitle: "UI/UX Designer Intern",
    department: "Growth",
    employmentType: "Contractor",
    office: "Axis Building",
    phone: "202-555-0144",
    email: "bharris.intern@gmail.com",
  },
];

export default function EmployeeManagementPage() {
  // Visily Subtabs: 'scoped_iam' | 'team' | 'directory' | 'org_chart' | 'profile_detail'
  const [activeTab, setActiveTab] = useState<"team" | "directory" | "org_chart" | "scoped_iam" | "profile_detail">("scoped_iam");
  const [selectedEmployee, setSelectedEmployee] = useState<VisilyEmployee>(VISILY_EMPLOYEES[0]);

  // Filters State (Visily Format)
  const [searchQuery, setSearchQuery] = useState("");
  const [officeFilter, setOfficeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [jobTitleFilter, setJobTitleFilter] = useState("all");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("all");

  // Selection Checkboxes for Table View
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(VISILY_EMPLOYEES.map((emp) => emp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setOfficeFilter("all");
    setDepartmentFilter("all");
    setJobTitleFilter("all");
    setEmploymentTypeFilter("all");
  };

  // Filtered List
  const filteredEmployees = VISILY_EMPLOYEES.filter((emp) => {
    if (officeFilter !== "all" && emp.office !== officeFilter) return false;
    if (departmentFilter !== "all" && emp.department !== departmentFilter) return false;
    if (jobTitleFilter !== "all" && emp.jobTitle !== jobTitleFilter) return false;
    if (employmentTypeFilter !== "all" && emp.employmentType !== employmentTypeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        emp.name.toLowerCase().includes(q) ||
        emp.employeeId.toLowerCase().includes(q) ||
        emp.jobTitle.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getEmploymentBadgeStyle = (type: string) => {
    switch (type) {
      case "Full time":
        return { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0" };
      case "Part time":
        return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };
      case "Contractor":
        return { bg: "#f3e8ff", color: "#7e22ce", border: "#e9d5ff" };
      default:
        return { bg: "#fffbeb", color: "#d97706", border: "#fde68a" };
    }
  };

  return (
    <div
      className="visily-page-container"
      style={{
        width: "100%",
        maxWidth: "1520px",
        margin: "0 auto",
        padding: "24px 32px 60px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* =================================================================== */}
      {/* VISILY HEADER & SUBTABS ROW (PAGES 2, 3, 4)                         */}
      {/* =================================================================== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "4px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#1e293b",
              margin: 0,
            }}
          >
            Employee Management
          </h1>

          {/* Visily Subtabs Navigation */}
          <div
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "16px",
            }}
          >
            <button
              onClick={() => setActiveTab("team")}
              style={{
                background: "none",
                border: "none",
                padding: "8px 0",
                fontSize: "14px",
                fontWeight: activeTab === "team" ? 700 : 600,
                color: activeTab === "team" ? "#db2777" : "#64748b",
                borderBottom: activeTab === "team" ? "3px solid #db2777" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Team members
            </button>

            <button
              onClick={() => setActiveTab("directory")}
              style={{
                background: "none",
                border: "none",
                padding: "8px 0",
                fontSize: "14px",
                fontWeight: activeTab === "directory" ? 700 : 600,
                color: activeTab === "directory" ? "#db2777" : "#64748b",
                borderBottom: activeTab === "directory" ? "3px solid #db2777" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Directory
            </button>

            <button
              onClick={() => setActiveTab("org_chart")}
              style={{
                background: "none",
                border: "none",
                padding: "8px 0",
                fontSize: "14px",
                fontWeight: activeTab === "org_chart" ? 700 : 600,
                color: activeTab === "org_chart" ? "#db2777" : "#64748b",
                borderBottom: activeTab === "org_chart" ? "3px solid #db2777" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Org chart
            </button>

            <button
              onClick={() => setActiveTab("scoped_iam")}
              style={{
                background: "none",
                border: "none",
                padding: "8px 0",
                fontSize: "14px",
                fontWeight: activeTab === "scoped_iam" ? 700 : 600,
                color: activeTab === "scoped_iam" ? "#db2777" : "#64748b",
                borderBottom: activeTab === "scoped_iam" ? "3px solid #db2777" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Phân quyền Đơn vị (Scoped IAM)
            </button>
          </div>
        </div>

        {/* Visily Action Buttons */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
          <button
            onClick={() => setActiveTab("scoped_iam")}
            style={{
              padding: "9px 16px",
              fontSize: "13px",
              fontWeight: 800,
              borderRadius: "10px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            🚫 Thu hồi & Bàn giao Quyền
          </button>

          <button
            onClick={() => alert("Đang xuất tập tin báo cáo 'Employee_Roster_2026.csv' thành công!")}
            style={{
              padding: "9px 16px",
              fontSize: "13px",
              fontWeight: 700,
              borderRadius: "10px",
              background: "white",
              border: "1px solid #cbd5e1",
              color: "#334155",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <Icon name="file" size={15} /> Download
          </button>

          <button
            onClick={() => setActiveTab("profile_detail")}
            style={{
              padding: "9px 18px",
              fontSize: "13px",
              fontWeight: 700,
              borderRadius: "10px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              cursor: "pointer",
            }}
          >
            <Icon name="plus" size={15} /> Add new
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* VISILY FILTER TOOLBAR (PAGES 2 & 3)                                */}
      {/* =================================================================== */}
      {activeTab !== "org_chart" && activeTab !== "scoped_iam" && activeTab !== "profile_detail" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            background: "#f8fafc",
            padding: "12px 16px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", flex: 1 }}>
            {/* Search Input */}
            <div style={{ position: "relative", minWidth: "200px" }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "8px 12px 8px 32px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: "white",
                  width: "100%",
                }}
              />
              <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                <Icon name="search" size={14} />
              </div>
            </div>

            {/* All Offices Dropdown */}
            <select
              value={officeFilter}
              onChange={(e) => setOfficeFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                fontWeight: 600,
                background: "white",
              }}
            >
              <option value="all">All Offices</option>
              <option value="Axis Building">Axis Building</option>
              <option value="Elevate Complex">Elevate Complex</option>
              <option value="Innovate Tower">Innovate Tower</option>
            </select>

            {/* All Departments Dropdown */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                fontWeight: 600,
                background: "white",
              }}
            >
              <option value="all">All Departments</option>
              <option value="Products">Products</option>
              <option value="Growth">Growth</option>
              <option value="Marketing">Marketing</option>
            </select>

            {/* All Job Titles Dropdown */}
            {activeTab === "team" && (
              <select
                value={jobTitleFilter}
                onChange={(e) => setJobTitleFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: "white",
                }}
              >
                <option value="all">All Job Titles</option>
                <option value="UX Leader">UX Leader</option>
                <option value="Senior UI/UX Designer">Senior UI/UX Designer</option>
                <option value="Senior UI Designer">Senior UI Designer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="UX Designer">UX Designer</option>
                <option value="Graphic Designer">Graphic Designer</option>
              </select>
            )}

            {/* All Employment Type Dropdown */}
            {activeTab === "team" && (
              <select
                value={employmentTypeFilter}
                onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: "white",
                }}
              >
                <option value="all">All Employment Type</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Contractor">Contractor</option>
              </select>
            )}
          </div>

          {/* Clear Filters Link */}
          <button
            onClick={handleClearFilters}
            style={{
              background: "none",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              color: "#64748b",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. PAGE 2: TEAM MEMBERS (VISILY TABLE VIEW)                        */}
      {/* =================================================================== */}
      {activeTab === "team" && (
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "12px", textTransform: "uppercase" }}>
                  <th style={{ padding: "14px 16px", width: "40px" }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.length === VISILY_EMPLOYEES.length}
                      onChange={handleSelectAll}
                      style={{ cursor: "pointer" }}
                    />
                  </th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>AVATAR</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>NAME</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>EMPLOYEE ID</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>JOB TITLE</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>DEPARTMENT</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>EMPLOYMENT TYPE</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>OFFICE</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700, textAlign: "right" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => {
                  const isChecked = selectedIds.includes(emp.id);
                  const badge = getEmploymentBadgeStyle(emp.employmentType);

                  return (
                    <tr
                      key={emp.id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        background: isChecked ? "#f0fdf4" : "white",
                        transition: "background 0.12s ease",
                      }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(emp.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>

                      {/* Avatar */}
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: emp.avatarBg,
                            color: "#334155",
                            fontWeight: 800,
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {emp.avatarInitials}
                        </div>
                      </td>

                      {/* Name */}
                      <td style={{ padding: "14px 16px" }}>
                        <b
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setActiveTab("profile_detail");
                          }}
                          style={{
                            color: "#1e293b",
                            cursor: "pointer",
                            fontWeight: 700,
                            display: "block",
                          }}
                        >
                          {emp.name}
                        </b>
                      </td>

                      {/* Employee ID */}
                      <td style={{ padding: "14px 16px", color: "#64748b", fontFamily: "monospace", fontWeight: 700 }}>
                        {emp.employeeId}
                      </td>

                      {/* Job Title */}
                      <td style={{ padding: "14px 16px", color: "#334155", fontWeight: 600 }}>
                        {emp.jobTitle}
                      </td>

                      {/* Department */}
                      <td style={{ padding: "14px 16px", color: "#334155", fontWeight: 600 }}>
                        {emp.department}
                      </td>

                      {/* Employment Type */}
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.color,
                            border: `1px solid ${badge.border}`,
                            display: "inline-block",
                          }}
                        >
                          {emp.employmentType}
                        </span>
                      </td>

                      {/* Office */}
                      <td style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>
                        {emp.office}
                      </td>

                      {/* Action */}
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <button
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setActiveTab("profile_detail");
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#4f46e5",
                            fontWeight: 700,
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                        >
                          View profile →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Visily Pagination Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              background: "#fafafa",
              borderTop: "1px solid #e2e8f0",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            <span>
              Show 1 to {filteredEmployees.length} of {VISILY_EMPLOYEES.length} results
            </span>

            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <button style={{ padding: "4px 8px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
                ‹
              </button>
              <button style={{ padding: "4px 10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", fontWeight: 700 }}>
                1
              </button>
              <button style={{ padding: "4px 10px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
                2
              </button>
              <button style={{ padding: "4px 10px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
                3
              </button>
              <button style={{ padding: "4px 10px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
                4
              </button>
              <span>...</span>
              <button style={{ padding: "4px 8px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
                ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. PAGE 3: DIRECTORY (VISILY CARD GRID VIEW)                        */}
      {/* =================================================================== */}
      {activeTab === "directory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(240px, 1fr))", gap: "20px" }}>
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  border: "1px solid #e2e8f0",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                {/* Pastel Avatar Circle */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: emp.avatarBg,
                    color: "#334155",
                    fontWeight: 900,
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #f1f5f9",
                    marginBottom: "14px",
                  }}
                >
                  {emp.avatarInitials}
                </div>

                {/* Name & Role */}
                <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                  {emp.name}
                </h4>
                <p style={{ margin: "2px 0 12px 0", fontSize: "13px", color: "#64748b", fontWeight: 600 }}>
                  {emp.jobTitle}
                </p>

                {/* Contact Info */}
                <div style={{ fontSize: "12px", color: "#64748b", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px", width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <span>📞</span> {emp.phone}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", wordBreak: "break-all" }}>
                    <span>✉️</span> {emp.email}
                  </div>
                </div>

                {/* View Profile Button */}
                <button
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setActiveTab("profile_detail");
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 0",
                    borderRadius: "8px",
                    background: "#f1f5f9",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#4f46e5",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                >
                  View profile
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "6px",
              alignItems: "center",
              paddingTop: "12px",
            }}
          >
            <button style={{ padding: "4px 10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", fontWeight: 700 }}>
              1
            </button>
            <button style={{ padding: "4px 10px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
              2
            </button>
            <button style={{ padding: "4px 10px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
              3
            </button>
            <span>...</span>
            <button style={{ padding: "4px 10px", background: "white", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>
              11
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. PAGE 4: ORG CHART (VISILY TREE VIEW)                            */}
      {/* =================================================================== */}
      {activeTab === "org_chart" && <OrgTreeChartView />}

      {/* =================================================================== */}
      {/* 4. SCOPED IAM (DEPARTMENT-SCOPED ACCESS CONTROL)                   */}
      {/* =================================================================== */}
      {activeTab === "scoped_iam" && <DepartmentScopedIAM />}

      {/* =================================================================== */}
      {/* 5. PAGE 5: PROFILE DETAILS (VISILY PROFILE DETAIL VIEW)             */}
      {/* =================================================================== */}
      {activeTab === "profile_detail" && (
        <EmployeeDetailView
          onBack={() => setActiveTab("team")}
        />
      )}
    </div>
  );
}
