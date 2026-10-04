import React, { useState } from "react";
import { Icon } from "./UI";

export interface OrgDivision {
  id: string;
  name: string;
  code: string;
  headName: string;
  headRole: string;
  headAvatar: string;
  avatarColor: string;
  costCenter: string;
  totalMembers: number;
  primaryCount: number;
  concurrentCount: number;
  budgetMonthly: string;
  departments: OrgDept[];
}

export interface OrgDept {
  id: string;
  name: string;
  code: string;
  headName: string;
  headRole: string;
  headAvatar: string;
  avatarColor: string;
  costCenter: string;
  totalMembers: number;
  primaryCount: number;
  concurrentCount: number;
  location: string;
  squads: OrgSquad[];
}

export interface OrgSquad {
  id: string;
  name: string;
  code: string;
  leadName: string;
  leadRole: string;
  membersCount: number;
  keyTechStack: string[];
}

const ORG_TREE_DATA: OrgDivision[] = [
  {
    id: "div-tech",
    name: "Khối Công nghệ & Phát triển Sản phẩm (Tech & Product Division)",
    code: "DIV-TECH",
    headName: "Trần Hoàng Nam",
    headRole: "Vice President of Technology (VP of Tech)",
    headAvatar: "HN",
    avatarColor: "#16a34a",
    costCenter: "CC-TECH-001",
    totalMembers: 68,
    primaryCount: 52,
    concurrentCount: 16,
    budgetMonthly: "2.8 tỷ ₫",
    departments: [
      {
        id: "dept-eng",
        name: "Phòng Kỹ thuật & Hạ tầng (Engineering)",
        code: "DEP-ENG",
        headName: "Nguyễn Minh Tuấn",
        headRole: "Engineering Director",
        headAvatar: "MT",
        avatarColor: "#0284c7",
        costCenter: "CC-TECH-804",
        totalMembers: 24,
        primaryCount: 18,
        concurrentCount: 6,
        location: "Bitexco TPHCM (Tầng 22)",
        squads: [
          {
            id: "sqd-1",
            name: "Ban Dự án Core Platform 2.0",
            code: "PRJ-CORE",
            leadName: "Lê Văn Hùng (Tech Lead)",
            leadRole: "Staff Backend Architect",
            membersCount: 11,
            keyTechStack: ["Go", "Kubernetes", "PostgreSQL", "Kafka"],
          },
          {
            id: "sqd-2",
            name: "Nhóm Mobile & Security Squad",
            code: "SQD-MBL",
            leadName: "Hoàng Minh Tuấn (Squad Lead)",
            leadRole: "Mobile & IAM Lead",
            membersCount: 7,
            keyTechStack: ["Flutter", "React Native", "OAuth 2.1", "Biometrics"],
          },
          {
            id: "sqd-3",
            name: "Nhóm SRE & DevOps Reliability",
            code: "SQD-SRE",
            leadName: "Phạm Thảo My (SRE Lead)",
            leadRole: "Principal DevOps",
            membersCount: 6,
            keyTechStack: ["Terraform", "AWS Cloud", "Grafana", "ArgoCD"],
          },
        ],
      },
      {
        id: "dept-prod",
        name: "Phòng Phát triển Sản phẩm (Product Development)",
        code: "DEP-PROD",
        headName: "Phạm Quỳnh Chi",
        headRole: "Head of Product & Design",
        headAvatar: "QC",
        avatarColor: "#7c3aed",
        costCenter: "CC-PROD-501",
        totalMembers: 19,
        primaryCount: 15,
        concurrentCount: 4,
        location: "Bitexco TPHCM (Tầng 22)",
        squads: [
          {
            id: "sqd-4",
            name: "Nhóm Thiết kế Design System & UX",
            code: "SQD-DS",
            leadName: "Nguyễn Minh Anh (Lead Designer)",
            leadRole: "Senior Product Designer",
            membersCount: 8,
            keyTechStack: ["Figma Enterprise", "Design Tokens", "Prototyping"],
          },
          {
            id: "sqd-5",
            name: "Nhóm Product Operations & Growth",
            code: "SQD-POPS",
            leadName: "Vũ Hải Đăng (Product Lead)",
            leadRole: "Senior Product Manager",
            membersCount: 11,
            keyTechStack: ["Mixpanel", "Amplitude", "Agile Scrum"],
          },
        ],
      },
      {
        id: "dept-data",
        name: "Phòng Dữ liệu & Trí tuệ Nhân tạo (Data & AI Intelligence)",
        code: "DEP-DATA",
        headName: "Đỗ Thu Hà",
        headRole: "Data Principal & Chief AI Architect",
        headAvatar: "TH",
        avatarColor: "#0d9488",
        costCenter: "CC-DATA-302",
        totalMembers: 14,
        primaryCount: 11,
        concurrentCount: 3,
        location: "Keangnam Hà Nội (Tầng 18)",
        squads: [
          {
            id: "sqd-6",
            name: "Nhóm Data Warehouse & BI Analytics",
            code: "SQD-BI",
            leadName: "Nguyễn Đức Phúc (BI Lead)",
            leadRole: "Lead Data Engineer",
            membersCount: 8,
            keyTechStack: ["Snowflake", "dbt", "Tableau", "Apache Spark"],
          },
          {
            id: "sqd-7",
            name: "Nhóm GenAI & ML Applications",
            code: "SQD-AI",
            leadName: "Lý Minh Triết (AI Lead)",
            leadRole: "Senior ML Engineer",
            membersCount: 6,
            keyTechStack: ["PyTorch", "LangChain", "Gemini API", "Vector DB"],
          },
        ],
      },
    ],
  },
  {
    id: "div-people",
    name: "Khối Quản trị Nhân sự & Vận hành (People & Culture Division)",
    code: "DIV-PEOPLE",
    headName: "Lê Thu Thủy",
    headRole: "Chief People Officer (CPO)",
    headAvatar: "TT",
    avatarColor: "#e11d48",
    costCenter: "CC-HR-002",
    totalMembers: 22,
    primaryCount: 19,
    concurrentCount: 3,
    budgetMonthly: "1.2 tỷ ₫",
    departments: [
      {
        id: "dept-hr-ops",
        name: "Phòng Nhân sự & Tiền lương (HR & Payroll Operations)",
        code: "DEP-HROPS",
        headName: "Phạm Quốc Bảo",
        headRole: "Senior HR Operations Lead",
        headAvatar: "QB",
        avatarColor: "#ea580c",
        costCenter: "CC-HR-101",
        totalMembers: 12,
        primaryCount: 10,
        concurrentCount: 2,
        location: "Bitexco TPHCM (Tầng 21)",
        squads: [
          {
            id: "sqd-8",
            name: "Ban Chế độ đãi ngộ & Payroll C&B",
            code: "SQD-CB",
            leadName: "Võ Thị Quỳnh Như",
            leadRole: "C&B Lead Specialist",
            membersCount: 6,
            keyTechStack: ["HRIS", "Payroll Engine", "Bảo hiểm Xã hội"],
          },
          {
            id: "sqd-9",
            name: "Ban Tuyển dụng & Thu hút Nhân tài",
            code: "SQD-TA",
            leadName: "Đặng Bích Ngọc",
            leadRole: "Talent Acquisition Lead",
            membersCount: 6,
            keyTechStack: ["ATS", "LinkedIn Recruiter", "Onboarding Portal"],
          },
        ],
      },
    ],
  },
];

export default function OrgTreeChartView({
  onSelectDepartment,
}: {
  onSelectDepartment?: (deptCode: string) => void;
}) {
  const [divisions] = useState<OrgDivision[]>(ORG_TREE_DATA);
  const [selectedDivId, setSelectedDivId] = useState<string>("div-tech");
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    "dept-eng": true,
    "dept-prod": true,
    "dept-data": true,
    "dept-hr-ops": true,
  });
  const [searchFilter, setSearchFilter] = useState("");

  const toggleDeptExpand = (id: string) => {
    setExpandedDepts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeDivision = divisions.find((d) => d.id === selectedDivId) || divisions[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Banner Toolbar */}
      <section
        className="panel"
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "24px 32px",
          border: "1px solid var(--border-soft)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "18px",
        }}
      >
        <div>
          <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
            SƠ ĐỒ CÂY TỔ CHỨC ĐA CẤP (ENTERPRISE ORG CHART)
          </span>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0 0 0" }}>
            Cấu trúc Khối · Phòng ban · Ban Dự án & Squad
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "var(--text-sub)", fontWeight: 600 }}>
            Trực quan hóa cây phả hệ tổ chức doanh nghiệp, định mức nhân sự chính và nhân sự kiêm nhiệm.
          </p>
        </div>

        {/* Division Selector Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {divisions.map((div) => (
            <button
              key={div.id}
              onClick={() => setSelectedDivId(div.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                background: selectedDivId === div.id ? "#1e40af" : "#f1f5f9",
                color: selectedDivId === div.id ? "white" : "var(--text-main)",
                boxShadow: selectedDivId === div.id ? "0 4px 12px rgba(30, 64, 175, 0.25)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.15s ease",
              }}
            >
              <span>{div.code === "DIV-TECH" ? "💻" : "👥"}</span>
              <span>{div.name.split("(")[0]}</span>
              <span
                style={{
                  background: selectedDivId === div.id ? "rgba(255,255,255,0.25)" : "#e2e8f0",
                  padding: "1px 6px",
                  borderRadius: "6px",
                  fontSize: "11px",
                }}
              >
                {div.totalMembers}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Division Master Card (Root Level) */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          borderRadius: "24px",
          padding: "28px 32px",
          color: "white",
          boxShadow: "0 15px 35px rgba(30, 64, 175, 0.25)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background: activeDivision.avatarColor,
              color: "white",
              fontWeight: 900,
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255,255,255,0.3)",
            }}
          >
            {activeDivision.headAvatar}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, fontFamily: "monospace" }}>
                {activeDivision.code} · {activeDivision.costCenter}
              </span>
              <span style={{ background: "#22c55e", color: "white", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>
                Cấp Khối (Division)
              </span>
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 900, margin: "6px 0 2px 0" }}>
              {activeDivision.name}
            </h3>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.9, fontWeight: 600 }}>
              Trưởng khối phụ trách: <b>{activeDivision.headName}</b> ({activeDivision.headRole})
            </p>
          </div>
        </div>

        {/* Division KPI Metrics */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.12)", padding: "12px 18px", borderRadius: "14px", textAlign: "center" }}>
            <span style={{ fontSize: "12px", opacity: 0.8, fontWeight: 700, display: "block" }}>TỔNG NHÂN SỰ</span>
            <b style={{ fontSize: "22px" }}>{activeDivision.totalMembers}</b>
          </div>
          <div style={{ background: "rgba(255,255,255,0.12)", padding: "12px 18px", borderRadius: "14px", textAlign: "center" }}>
            <span style={{ fontSize: "12px", opacity: 0.8, fontWeight: 700, display: "block" }}>BỔ NHIỆM CHÍNH</span>
            <b style={{ fontSize: "22px", color: "#86efac" }}>{activeDivision.primaryCount}</b>
          </div>
          <div style={{ background: "rgba(255,255,255,0.12)", padding: "12px 18px", borderRadius: "14px", textAlign: "center" }}>
            <span style={{ fontSize: "12px", opacity: 0.8, fontWeight: 700, display: "block" }}>KIÊM NHIỆM</span>
            <b style={{ fontSize: "22px", color: "#fde047" }}>{activeDivision.concurrentCount}</b>
          </div>
        </div>
      </div>

      {/* Visual Down Connector */}
      <div style={{ display: "flex", justifyContent: "center", margin: "-12px 0" }}>
        <div style={{ width: "3px", height: "28px", background: "#cbd5e1" }} />
      </div>

      {/* Departments Grid & Level 2 / Level 3 Nodes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: "24px" }}>
        {activeDivision.departments.map((dept) => {
          const isExpanded = expandedDepts[dept.id];

          return (
            <div
              key={dept.id}
              className="panel"
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "24px",
                border: "1px solid var(--border-soft)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.02)",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {/* Department Header Card */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: dept.avatarColor,
                      color: "white",
                      fontWeight: 900,
                      fontSize: "17px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {dept.headAvatar}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ background: "#f1f5f9", color: "#334155", padding: "1px 6px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, fontFamily: "monospace" }}>
                        {dept.code}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 700 }}>
                        {dept.location}
                      </span>
                    </div>
                    <h4 style={{ fontSize: "17px", fontWeight: 900, color: "var(--text-main)", margin: "3px 0 1px 0" }}>
                      {dept.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: "13px", color: "#1e40af", fontWeight: 700 }}>
                      Trưởng phòng: {dept.headName} ({dept.headRole})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleDeptExpand(dept.id)}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid var(--border-soft)",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    fontWeight: 800,
                    cursor: "pointer",
                    color: "var(--text-main)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {isExpanded ? "Thu gọn ▲" : `Mở rộng (${dept.squads.length} squad) ▼`}
                </button>
              </div>

              {/* Department Headcount Bar */}
              <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: "14px", border: "1px solid var(--border-soft)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-sub)" }}>
                    Định mức nhân sự: <b>{dept.totalMembers} thành viên</b>
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e40af" }}>
                    {dept.primaryCount} chính · {dept.concurrentCount} kiêm nhiệm
                  </span>
                </div>
                <div style={{ width: "100%", height: "8px", borderRadius: "4px", background: "#e2e8f0", overflow: "hidden", display: "flex" }}>
                  <div
                    style={{
                      width: `${(dept.primaryCount / dept.totalMembers) * 100}%`,
                      background: "#2563eb",
                      height: "100%",
                    }}
                    title={`Nhân sự chính: ${dept.primaryCount}`}
                  />
                  <div
                    style={{
                      width: `${(dept.concurrentCount / dept.totalMembers) * 100}%`,
                      background: "#a855f7",
                      height: "100%",
                    }}
                    title={`Nhân sự kiêm nhiệm: ${dept.concurrentCount}`}
                  />
                </div>
              </div>

              {/* Squads / Projects List (Level 3 Children) */}
              {isExpanded && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-sub)", textTransform: "uppercase" }}>
                    Các Ban Dự án & Squad trực thuộc ({dept.squads.length}):
                  </span>

                  {dept.squads.map((sqd) => (
                    <div
                      key={sqd.id}
                      style={{
                        background: "white",
                        borderRadius: "14px",
                        padding: "14px 16px",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "14px" }}>⚡</span>
                          <b style={{ fontSize: "14px", color: "var(--text-main)" }}>{sqd.name}</b>
                          <span style={{ background: "#eff6ff", color: "#1e40af", padding: "1px 6px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, fontFamily: "monospace" }}>
                            {sqd.code}
                          </span>
                        </div>
                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--text-sub)", fontWeight: 600 }}>
                          Lead phụ trách: <b>{sqd.leadName}</b> ({sqd.leadRole})
                        </p>
                        <div style={{ display: "flex", gap: "4px", marginTop: "6px", flexWrap: "wrap" }}>
                          {sqd.keyTechStack.map((tech, i) => (
                            <span key={i} style={{ background: "#f1f5f9", color: "#475569", padding: "1px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            background: "#dbeafe",
                            color: "#1e40af",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: 900,
                            display: "inline-block",
                          }}
                        >
                          {sqd.membersCount} nhân sự
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
