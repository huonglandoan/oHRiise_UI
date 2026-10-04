import React, { useState } from "react";
import { Icon, Status } from "./UI";

export interface DepartmentAssignment {
  id: string;
  departmentCode: string;
  departmentName: string;
  type: "primary" | "concurrent"; // Chính / Kiêm nhiệm
  jobTitle: string;
  roleInUnit: "Manager" | "Lead" | "Member" | "Reviewer";
  allocationPercentage: number; // e.g. 70%
  appointedDate: string; // e.g. 15/04/2024
}

export interface TransferHistoryRecord {
  id: string;
  fromDate: string;
  toDate: string;
  previousDepartment: string;
  previousJobTitle: string;
  previousRole: string;
  reason: string;
  decisionNumber: string;
  signedBy: string;
  handoverCompleted: boolean;
}

export interface PayrollRecord {
  period: string; // e.g. Tháng 09/2026
  departmentAtPeriod: string; // Đơn vị tại kỳ chốt (Bảo toàn nguyên vẹn)
  baseSalary: number;
  concurrentAllowance: number;
  otherAllowance: number;
  deductions: number;
  netSalary: number;
  status: "paid" | "pending";
}

export interface EmployeeData {
  id: string;
  code: string;
  fullName: string;
  avatarInitials: string;
  avatarColor: string;
  status: "active" | "probation" | "suspended" | "resigned";
  statusLabel: string;
  primaryJobTitle: string;
  primaryDepartment: string;
  branch: string;
  workEmail: string;
  personalEmail: string;
  phoneNumber: string;
  joinDate: string;
  seniority: string;
  contractType: string;
  directManager: string;
  location: string;
  // Personal Info
  identityCardNumber: string;
  identityIssueDate: string;
  identityIssuePlace: string;
  birthDate: string;
  gender: "Nam" | "Nữ" | "Khác";
  nationality: string;
  maritalStatus: string;
  permanentAddress: string;
  currentAddress: string;
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  emergencyContactAddress: string;
  // Bank & Tax
  bankAccountNumber: string;
  bankName: string;
  taxCode: string;
  socialInsuranceNumber: string;
  // Assignments & History
  assignments: DepartmentAssignment[];
  transferHistory: TransferHistoryRecord[];
  payrollHistory: PayrollRecord[];
  // HR Admin & Compliance
  contractNumber: string;
  contractSignDate: string;
  contractExpiryDate: string;
  annualLeaveTotal: number;
  annualLeaveUsed: number;
  kpiRatings: { quarter: string; rating: string; score: number; note: string }[];
  assets: { name: string; serial: string; handoverDate: string; status: string }[];
  hrInternalNotes: string;
}

const SAMPLE_EMPLOYEE: EmployeeData = {
  id: "emp-089",
  code: "EMP-2026-089",
  fullName: "Nguyễn Minh Anh",
  avatarInitials: "MA",
  avatarColor: "#0284c7",
  status: "active",
  statusLabel: "Đang làm việc",
  primaryJobTitle: "Senior Product Designer",
  primaryDepartment: "Phòng Phát triển Sản phẩm (Product Development)",
  branch: "Trụ sở TP. Hồ Chí Minh",
  workEmail: "minhanh.nguyen@ohriise.vn",
  personalEmail: "minhanh.design@gmail.com",
  phoneNumber: "0908 123 456",
  joinDate: "15/04/2024",
  seniority: "2 năm 5 tháng",
  contractType: "Toàn thời gian (Chính thức)",
  directManager: "Trần Hoàng Nam (Head of Product & Tech)",
  location: "Tòa nhà Bitexco Financial Tower, Q.1, TP.HCM",
  
  identityCardNumber: "079201008892",
  identityIssueDate: "12/03/2021",
  identityIssuePlace: "Cục Cảnh sát Quản lý Hành chính về Trật tự Xã hội",
  birthDate: "18/09/1996",
  gender: "Nam",
  nationality: "Việt Nam",
  maritalStatus: "Độc thân",
  permanentAddress: "Số 188 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
  currentAddress: "Căn hộ Landmark 4, Vinhomes Central Park, Q. Bình Thạnh, TP. Hồ Chí Minh",
  
  emergencyContactName: "Nguyễn Văn Hùng",
  emergencyContactRelationship: "Bố ruột",
  emergencyContactPhone: "0913 998 877",
  emergencyContactAddress: "Số 188 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP.HCM",
  
  bankAccountNumber: "1029 3847 5689",
  bankName: "Ngân hàng Ngoại thương Việt Nam (Vietcombank - CN Tân Bình)",
  taxCode: "8492019482",
  socialInsuranceNumber: "7914029481",
  
  assignments: [
    {
      id: "asg-1",
      departmentCode: "DEP-PROD",
      departmentName: "Phòng Phát triển Sản phẩm (Product Development)",
      type: "primary",
      jobTitle: "Senior Product Designer",
      roleInUnit: "Lead",
      allocationPercentage: 70,
      appointedDate: "15/04/2024",
    },
    {
      id: "asg-2",
      departmentCode: "DEP-TECH",
      departmentName: "Phòng Công nghệ & Nền tảng (Core Engineering)",
      type: "concurrent",
      jobTitle: "Design System Lead Consultant",
      roleInUnit: "Manager",
      allocationPercentage: 30,
      appointedDate: "01/02/2025",
    },
  ],
  
  transferHistory: [
    {
      id: "tf-1",
      fromDate: "01/01/2025",
      toDate: "30/06/2025",
      previousDepartment: "Ban Thiết kế Giao diện (UI/UX Team)",
      previousJobTitle: "Product Designer",
      previousRole: "Member",
      reason: "Tái cơ cấu sáp nhập bộ phận theo quyết định chiến lược Q1/2025",
      decisionNumber: "#QD-2025-012/NS",
      signedBy: "Lê Thu Thủy (Giám đốc Nhân sự)",
      handoverCompleted: true,
    },
    {
      id: "tf-2",
      fromDate: "15/04/2024",
      toDate: "31/12/2024",
      previousDepartment: "Trung tâm Đổi mới Sáng tạo (Innovation Lab)",
      previousJobTitle: "Junior UX Specialist",
      previousRole: "Member",
      reason: "Hoàn tất thử việc và bổ nhiệm chính thức ngạch Senior",
      decisionNumber: "#QD-2024-089/NS",
      signedBy: "Trần Hoàng Nam (Head of Tech)",
      handoverCompleted: true,
    },
  ],
  
  payrollHistory: [
    {
      period: "Tháng 09/2026",
      departmentAtPeriod: "Phòng Phát triển Sản phẩm (Product Development)",
      baseSalary: 32000000,
      concurrentAllowance: 5000000,
      otherAllowance: 1500000,
      deductions: 4200000,
      netSalary: 34300000,
      status: "pending",
    },
    {
      period: "Tháng 08/2026",
      departmentAtPeriod: "Phòng Phát triển Sản phẩm (Product Development)",
      baseSalary: 32000000,
      concurrentAllowance: 5000000,
      otherAllowance: 1500000,
      deductions: 4200000,
      netSalary: 34300000,
      status: "paid",
    },
    {
      period: "Tháng 07/2026",
      departmentAtPeriod: "Phòng Phát triển Sản phẩm (Product Development)",
      baseSalary: 32000000,
      concurrentAllowance: 5000000,
      otherAllowance: 1500000,
      deductions: 4200000,
      netSalary: 34300000,
      status: "paid",
    },
    {
      period: "Tháng 05/2025",
      departmentAtPeriod: "Ban Thiết kế Giao diện (UI/UX Team)",
      baseSalary: 28000000,
      concurrentAllowance: 0,
      otherAllowance: 1500000,
      deductions: 3600000,
      netSalary: 25900000,
      status: "paid",
    },
    {
      period: "Tháng 10/2024",
      departmentAtPeriod: "Trung tâm Đổi mới Sáng tạo (Innovation Lab)",
      baseSalary: 25000000,
      concurrentAllowance: 0,
      otherAllowance: 1200000,
      deductions: 3200000,
      netSalary: 23000000,
      status: "paid",
    },
  ],
  
  contractNumber: "HDLD-2024-089/OH",
  contractSignDate: "15/04/2024",
  contractExpiryDate: "14/04/2026",
  annualLeaveTotal: 14,
  annualLeaveUsed: 3.5,
  
  kpiRatings: [
    { quarter: "Quý 2/2026", rating: "A", score: 96.5, note: "Hoàn thành vượt mức dự án Design System 2.0 và Mobile SDK." },
    { quarter: "Quý 1/2026", rating: "A", score: 94.0, note: "Đóng góp xuất sắc trong việc tối ưu UI luồng Chấm công & Payroll." },
    { quarter: "Quý 4/2025", rating: "B+", score: 88.5, note: "Đáp ứng đầy đủ chỉ tiêu công việc, chủ động hỗ trợ team dev." },
  ],
  
  assets: [
    { name: "MacBook Pro 16\" M3 Max (36GB / 1TB)", serial: "OH-DEV-2024-089", handoverDate: "15/04/2024", status: "Đang sử dụng tốt" },
    { name: "Màn hình Dell UltraSharp 27\" 4K (U2723QE)", serial: "OH-MON-2024-104", handoverDate: "15/04/2024", status: "Đang sử dụng tốt" },
    { name: "Thẻ từ an ninh ra vào tòa nhà Bitexco", serial: "CARD-8842-HCM", handoverDate: "15/04/2024", status: "Đang hoạt động" },
  ],
  
  hrInternalNotes: "Nhân sự thuộc nhóm cán bộ nguồn phát triển quy hoạch Lead Design. Thái độ làm việc chuyên nghiệp, được tín nhiệm cao từ các bộ phận liên quan.",
};

const ALL_DEPARTMENTS = [
  { code: "DEP-PROD", name: "Phòng Phát triển Sản phẩm (Product Development)" },
  { code: "DEP-TECH", name: "Phòng Công nghệ & Nền tảng (Core Engineering)" },
  { code: "DEP-DATA", name: "Phòng Dữ liệu & AI (Data & Intelligence)" },
  { code: "DEP-HR", name: "Phòng Nhân sự & Văn hóa (HR & People Ops)" },
  { code: "DEP-SALES", name: "Phòng Kinh doanh & Đối tác (Sales & Partnerships)" },
  { code: "DEP-MKT", name: "Phòng Tiếp thị & Truyền thông (Marketing & Growth)" },
  { code: "DEP-FIN", name: "Phòng Tài chính Kế toán (Finance & Accounting)" },
];

export default function EmployeeDetailView({
  employee = SAMPLE_EMPLOYEE,
  onBack,
}: {
  employee?: EmployeeData;
  onBack?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"profile" | "assignments" | "compensation" | "hr_admin">("assignments");
  const [empData, setEmpData] = useState<EmployeeData>(employee);

  // Dialog States
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isAddConcurrentOpen, setIsAddConcurrentOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<DepartmentAssignment | null>(null);

  // Transfer Dialog Form
  const [transferTargetDept, setTransferTargetDept] = useState(ALL_DEPARTMENTS[1].name);
  const [transferNewJobTitle, setTransferNewJobTitle] = useState("Staff Product Architect");
  const [transferEffectiveDate, setTransferEffectiveDate] = useState("2026-10-01");
  const [transferRevokeOldRights, setTransferRevokeOldRights] = useState(true);
  const [transferNewRole, setTransferNewRole] = useState<"Manager" | "Lead" | "Member">("Lead");
  const [transferReason, setTransferReason] = useState("Điều động nhân sự nòng cốt hỗ trợ xây dựng kiến trúc đa nền tảng cho khối Engineering.");

  // Add Concurrent Position Form
  const [concurrentDept, setConcurrentDept] = useState(ALL_DEPARTMENTS[2].name);
  const [concurrentJobTitle, setConcurrentJobTitle] = useState("AI Product Experience Advisor");
  const [concurrentRole, setConcurrentRole] = useState<"Manager" | "Lead" | "Member" | "Reviewer">("Reviewer");
  const [concurrentAllocation, setConcurrentAllocation] = useState(20);
  const [concurrentDate, setConcurrentDate] = useState("2026-10-01");

  // Edit Role Form
  const [editRoleValue, setEditRoleValue] = useState<"Manager" | "Lead" | "Member" | "Reviewer">("Manager");
  const [editAllocationValue, setEditAllocationValue] = useState(30);

  // Handlers
  const handleConfirmTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    // Move current primary assignment to history
    const primaryAsg = empData.assignments.find((a) => a.type === "primary");
    const newHistoryRecord: TransferHistoryRecord = {
      id: `tf-${Date.now()}`,
      fromDate: primaryAsg?.appointedDate || "15/04/2024",
      toDate: new Date(transferEffectiveDate).toLocaleDateString("vi-VN"),
      previousDepartment: primaryAsg?.departmentName || empData.primaryDepartment,
      previousJobTitle: primaryAsg?.jobTitle || empData.primaryJobTitle,
      previousRole: primaryAsg?.roleInUnit || "Lead",
      reason: transferReason,
      decisionNumber: `#QD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}/NS`,
      signedBy: "Trần Hoàng Nam (Giám đốc Khối)",
      handoverCompleted: true,
    };

    // New primary assignment
    const newPrimaryAsg: DepartmentAssignment = {
      id: `asg-${Date.now()}`,
      departmentCode: ALL_DEPARTMENTS.find((d) => d.name === transferTargetDept)?.code || "DEP-TECH",
      departmentName: transferTargetDept,
      type: "primary",
      jobTitle: transferNewJobTitle,
      roleInUnit: transferNewRole,
      allocationPercentage: transferRevokeOldRights ? 100 : 70,
      appointedDate: new Date(transferEffectiveDate).toLocaleDateString("vi-VN"),
    };

    let updatedAssignments = empData.assignments.filter((a) => a.type !== "primary");
    if (transferRevokeOldRights) {
      updatedAssignments = [];
    }
    updatedAssignments.unshift(newPrimaryAsg);

    setEmpData({
      ...empData,
      primaryDepartment: transferTargetDept,
      primaryJobTitle: transferNewJobTitle,
      assignments: updatedAssignments,
      transferHistory: [newHistoryRecord, ...empData.transferHistory],
    });

    setIsTransferDialogOpen(false);
    alert("Điều chuyển công tác nhân sự thành công! Lịch sử công tác đã được cập nhật tự động.");
  };

  const handleAddConcurrent = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsg: DepartmentAssignment = {
      id: `asg-${Date.now()}`,
      departmentCode: ALL_DEPARTMENTS.find((d) => d.name === concurrentDept)?.code || "DEP-CONC",
      departmentName: concurrentDept,
      type: "concurrent",
      jobTitle: concurrentJobTitle,
      roleInUnit: concurrentRole,
      allocationPercentage: Number(concurrentAllocation),
      appointedDate: new Date(concurrentDate).toLocaleDateString("vi-VN"),
    };

    setEmpData({
      ...empData,
      assignments: [...empData.assignments, newAsg],
    });

    setIsAddConcurrentOpen(false);
    alert(`Đã thêm đơn vị kiêm nhiệm "${concurrentDept}" thành công!`);
  };

  const handleSaveRoleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    const updated = empData.assignments.map((a) =>
      a.id === selectedAssignment.id
        ? { ...a, roleInUnit: editRoleValue, allocationPercentage: Number(editAllocationValue) }
        : a
    );

    setEmpData({ ...empData, assignments: updated });
    setIsEditRoleOpen(false);
    setSelectedAssignment(null);
    alert("Đã cập nhật phân quyền và tỷ lệ phân bổ tại đơn vị thành công!");
  };

  const handleRemoveAssignment = (asg: DepartmentAssignment) => {
    if (asg.type === "primary") {
      alert("Không thể rút khỏi đơn vị công tác chính. Vui lòng thực hiện 'Điều chuyển công tác' nếu thay đổi đơn vị chính!");
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn rút nhân sự khỏi đơn vị kiêm nhiệm "${asg.departmentName}"?`)) {
      const newHistory: TransferHistoryRecord = {
        id: `tf-${Date.now()}`,
        fromDate: asg.appointedDate,
        toDate: new Date().toLocaleDateString("vi-VN"),
        previousDepartment: asg.departmentName,
        previousJobTitle: asg.jobTitle,
        previousRole: asg.roleInUnit,
        reason: "Hoàn tất nhiệm vụ kiêm nhiệm và rút khỏi đơn vị",
        decisionNumber: `#QD-RUT-${Math.floor(100 + Math.random() * 900)}/NS`,
        signedBy: "Trần Hoàng Nam (Head of Tech)",
        handoverCompleted: true,
      };

      setEmpData({
        ...empData,
        assignments: empData.assignments.filter((a) => a.id !== asg.id),
        transferHistory: [newHistory, ...empData.transferHistory],
      });
      alert(`Đã rút nhân sự khỏi đơn vị "${asg.departmentName}" thành công!`);
    }
  };

  // Helper Badge Color
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Manager":
        return {
          bg: "#312e81",
          color: "#e0e7ff",
          border: "#4338ca",
          label: "Manager · Quản lý",
        };
      case "Lead":
        return {
          bg: "#083344",
          color: "#cffafe",
          border: "#0e7490",
          label: "Lead · Trưởng nhóm",
        };
      case "Reviewer":
        return {
          bg: "#3f2c06",
          color: "#fef08a",
          border: "#a16207",
          label: "Reviewer · Thẩm định",
        };
      default:
        return {
          bg: "#1e293b",
          color: "#f1f5f9",
          border: "#475569",
          label: "Member · Thành viên",
        };
    }
  };

  return (
    <div
      className="employee-detail-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      {/* TOP NAVIGATION BACK BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={onBack}
          className="secondary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: 800,
            borderRadius: "12px",
            border: "1px solid var(--border-soft)",
            background: "white",
            cursor: "pointer",
          }}
        >
          <Icon name="arrow" size={16} /> Quay lại danh sách nhân sự
        </button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)" }}>
            Phân hệ Quản trị Nhân sự (HR Core) · Hồ sơ chi tiết
          </span>
        </div>
      </div>

      {/* 1. HEADER SECTION */}
      <section
        className="panel"
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px 32px",
          border: "1px solid var(--border-soft)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.02)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* Left: Avatar & Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background: empData.avatarColor,
                color: "white",
                fontWeight: 900,
                fontSize: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px rgba(2, 132, 199, 0.25)",
              }}
            >
              {empData.avatarInitials}
            </div>
            {/* Status Indicator Dot */}
            <div
              style={{
                position: "absolute",
                bottom: "-2px",
                right: "-2px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#10b981",
                border: "3px solid white",
              }}
              title="Đang hoạt động trên hệ thống"
            />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                {empData.fullName}
              </h1>
              <span
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 800,
                  fontFamily: "monospace",
                }}
              >
                {empData.code}
              </span>
              <span
                style={{
                  background: "#ecfdf5",
                  color: "#059669",
                  border: "1px solid #a7f3d0",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                {empData.statusLabel}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "8px",
                fontSize: "14px",
                color: "var(--text-sub)",
                fontWeight: 600,
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-main)", fontWeight: 700 }}>
                <Icon name="briefcase" size={16} /> {empData.primaryJobTitle}
              </span>
              <span>·</span>
              <span>{empData.primaryDepartment}</span>
              <span>·</span>
              <span>{empData.branch}</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            className="secondary"
            onClick={() => setIsExportDialogOpen(true)}
            style={{
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 800,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid var(--border-soft)",
              background: "white",
              cursor: "pointer",
            }}
          >
            <Icon name="file" size={16} /> Xuất hồ sơ
          </button>

          <button
            className="primary"
            onClick={() => setIsTransferDialogOpen(true)}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 800,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
              color: "white",
              border: "none",
              boxShadow: "0 4px 14px rgba(30, 64, 175, 0.35)",
              cursor: "pointer",
            }}
          >
            <Icon name="arrow" size={16} /> Điều chuyển công tác
          </button>
        </div>
      </section>

      {/* 2. TABS COMPONENT NAVIGATION */}
      <div
        className="employee-tabs-bar"
        style={{
          display: "flex",
          gap: "8px",
          background: "white",
          borderRadius: "18px",
          padding: "8px",
          border: "1px solid var(--border-soft)",
          overflowX: "auto",
        }}
      >
        <button
          onClick={() => setActiveTab("profile")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 800,
            border: "none",
            background: activeTab === "profile" ? "#f1f5f9" : "transparent",
            color: activeTab === "profile" ? "var(--text-main)" : "var(--text-sub)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s ease",
          }}
        >
          <Icon name="user" size={16} /> Hồ sơ cá nhân
        </button>

        <button
          onClick={() => setActiveTab("assignments")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 800,
            border: "none",
            background: activeTab === "assignments" ? "#1e40af" : "transparent",
            color: activeTab === "assignments" ? "white" : "var(--text-sub)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: activeTab === "assignments" ? "0 4px 12px rgba(30, 64, 175, 0.25)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          <Icon name="users" size={16} /> Công tác & Phân quyền
          <span
            style={{
              background: activeTab === "assignments" ? "rgba(255,255,255,0.25)" : "#e2e8f0",
              color: activeTab === "assignments" ? "white" : "var(--text-main)",
              padding: "2px 7px",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 900,
            }}
          >
            {empData.assignments.length} đơn vị
          </span>
        </button>

        <button
          onClick={() => setActiveTab("compensation")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 800,
            border: "none",
            background: activeTab === "compensation" ? "#f1f5f9" : "transparent",
            color: activeTab === "compensation" ? "var(--text-main)" : "var(--text-sub)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s ease",
          }}
        >
          <Icon name="wallet" size={16} /> Lương & Đãi ngộ
        </button>

        <button
          onClick={() => setActiveTab("hr_admin")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 800,
            border: "none",
            background: activeTab === "hr_admin" ? "#f1f5f9" : "transparent",
            color: activeTab === "hr_admin" ? "var(--text-main)" : "var(--text-sub)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s ease",
          }}
        >
          <Icon name="shield" size={16} /> Quản lý HR & Tuân thủ
          <span
            style={{
              background: "#dbeafe",
              color: "#1d4ed8",
              padding: "2px 7px",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 900,
            }}
          >
            HR Role
          </span>
        </button>
      </div>

      {/* 3. TABS CONTENT */}

      {/* TAB 1: HỒ SƠ CÁ NHÂN (READONLY FORM) */}
      {activeTab === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Group 1: Thông tin định danh & Nhân thân */}
          <section
            className="panel"
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "28px",
              border: "1px solid var(--border-soft)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "6px", background: "#f1f5f9", borderRadius: "10px", color: "#1e40af" }}>
                <Icon name="user" size={18} />
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                I. Thông tin Định danh & Nhân thân
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Số CCCD / Hộ chiếu
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.identityCardNumber}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Ngày cấp CCCD
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.identityIssueDate}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Nơi cấp
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.identityIssuePlace}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Ngày sinh
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${empData.birthDate} (30 tuổi)`}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Giới tính & Quốc tịch
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${empData.gender} · ${empData.nationality}`}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Tình trạng hôn nhân
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.maritalStatus}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>
            </div>
          </section>

          {/* Group 2: Thông tin liên lạc & Địa chỉ */}
          <section
            className="panel"
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "28px",
              border: "1px solid var(--border-soft)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "6px", background: "#f1f5f9", borderRadius: "10px", color: "#1e40af" }}>
                <Icon name="bell" size={18} />
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                II. Thông tin Liên lạc & Nơi cư trú
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Email công vụ (@ohriise.vn)
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.workEmail}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 700, color: "#1e40af" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Email cá nhân
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.personalEmail}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Số điện thoại di động
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.phoneNumber}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Địa chỉ thường trú (theo CCCD)
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.permanentAddress}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                  Địa chỉ tạm trú hiện tại
                </label>
                <input
                  type="text"
                  readOnly
                  value={empData.currentAddress}
                  style={{ width: "100%", marginTop: "6px", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                />
              </div>
            </div>
          </section>

          {/* Group 3: Thông tin tổ chức & Liên hệ khẩn cấp */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <section
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ padding: "6px", background: "#f1f5f9", borderRadius: "10px", color: "#1e40af" }}>
                  <Icon name="briefcase" size={18} />
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                  III. Thông tin Tổ chức
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                    Ngày gia nhập & Thâm niên
                  </label>
                  <p style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: 800, color: "var(--text-main)" }}>
                    {empData.joinDate} <span style={{ color: "#059669", fontWeight: 700 }}>({empData.seniority})</span>
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                    Quản lý trực tiếp (Manager)
                  </label>
                  <p style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: 800, color: "#1e40af" }}>
                    {empData.directManager}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                    Địa điểm làm việc cố định
                  </label>
                  <p style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: 600, color: "var(--text-main)" }}>
                    {empData.location}
                  </p>
                </div>
              </div>
            </section>

            <section
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ padding: "6px", background: "#fef2f2", borderRadius: "10px", color: "#dc2626" }}>
                  <Icon name="shield" size={18} />
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                  IV. Liên hệ Khẩn cấp
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                    Người liên hệ & Mối quan hệ
                  </label>
                  <p style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: 800, color: "var(--text-main)" }}>
                    {empData.emergencyContactName} <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>({empData.emergencyContactRelationship})</span>
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                    Số điện thoại khẩn cấp
                  </label>
                  <p style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: 800, color: "#dc2626" }}>
                    {empData.emergencyContactPhone}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", textTransform: "uppercase" }}>
                    Địa chỉ liên hệ
                  </label>
                  <p style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: 600, color: "var(--text-main)" }}>
                    {empData.emergencyContactAddress}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* TAB 2: CÔNG TÁC & PHÂN QUYỀN (TRỌNG TÂM) */}
      {activeTab === "assignments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Card 1: Các đơn vị đang trực thuộc */}
          <section
            className="panel"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid var(--border-soft)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                    Các đơn vị đang trực thuộc
                  </h2>
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    {empData.assignments.length} phòng ban
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-sub)", margin: "4px 0 0 0", fontWeight: 600 }}>
                  Quản lý vị trí công tác chính, các nhiệm vụ kiêm nhiệm và vai trò phân quyền theo từng đơn vị.
                </p>
              </div>

              <button
                className="secondary"
                onClick={() => setIsAddConcurrentOpen(true)}
                style={{
                  padding: "10px 18px",
                  fontSize: "14px",
                  fontWeight: 800,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1.5px dashed #0284c7",
                  background: "#f0f9ff",
                  color: "#0369a1",
                  cursor: "pointer",
                }}
              >
                <Icon name="plus" size={16} /> + Thêm đơn vị kiêm nhiệm
              </button>
            </div>

            {/* Table: Các đơn vị đang trực thuộc */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0", color: "var(--text-sub)", fontSize: "13px" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>TÊN PHÒNG BAN / ĐƠN VỊ</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>LOẠI CÔNG TÁC</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>CHỨC DANH</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>QUYỀN TẠI ĐƠN VỊ</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>PHÂN BỔ %</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>NGÀY BỔ NHIỆM</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800, textAlign: "right" }}>THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {empData.assignments.map((asg) => {
                    const badge = getRoleBadge(asg.roleInUnit);
                    const isPrimary = asg.type === "primary";

                    return (
                      <tr
                        key={asg.id}
                        style={{
                          borderBottom: "1px solid var(--border-soft)",
                          background: isPrimary ? "#f8fafc" : "white",
                        }}
                      >
                        <td style={{ padding: "18px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                background: isPrimary ? "#dbeafe" : "#f3e8ff",
                                color: isPrimary ? "#1e40af" : "#7e22ce",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 800,
                                fontSize: "12px",
                              }}
                            >
                              {asg.departmentCode.replace("DEP-", "")}
                            </div>
                            <div>
                              <b style={{ fontSize: "15px", color: "var(--text-main)", display: "block" }}>
                                {asg.departmentName}
                              </b>
                              <small style={{ color: "var(--text-sub)", fontFamily: "monospace", fontSize: "12px" }}>
                                {asg.departmentCode}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: "18px 16px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 800,
                              background: isPrimary ? "#1e40af" : "#6b21a8",
                              color: "white",
                              display: "inline-block",
                            }}
                          >
                            {isPrimary ? "⭐ Đơn vị Chính" : "⚡ Kiêm nhiệm"}
                          </span>
                        </td>

                        <td style={{ padding: "18px 16px", fontWeight: 700, color: "var(--text-main)" }}>
                          {asg.jobTitle}
                        </td>

                        <td style={{ padding: "18px 16px" }}>
                          <span
                            style={{
                              padding: "5px 12px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 900,
                              background: badge.bg,
                              color: badge.color,
                              border: `1px solid ${badge.border}`,
                              display: "inline-block",
                            }}
                          >
                            {badge.label}
                          </span>
                        </td>

                        <td style={{ padding: "18px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                              style={{
                                width: "60px",
                                height: "8px",
                                borderRadius: "4px",
                                background: "#e2e8f0",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${asg.allocationPercentage}%`,
                                  height: "100%",
                                  background: isPrimary ? "#2563eb" : "#9333ea",
                                }}
                              />
                            </div>
                            <b style={{ fontSize: "13px", color: "var(--text-main)" }}>
                              {asg.allocationPercentage}%
                            </b>
                          </div>
                        </td>

                        <td style={{ padding: "18px 16px", color: "var(--text-sub)", fontWeight: 600 }}>
                          {asg.appointedDate}
                        </td>

                        <td style={{ padding: "18px 16px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <button
                              onClick={() => {
                                setSelectedAssignment(asg);
                                setEditRoleValue(asg.roleInUnit);
                                setEditAllocationValue(asg.allocationPercentage);
                                setIsEditRoleOpen(true);
                              }}
                              style={{
                                padding: "6px 12px",
                                fontSize: "13px",
                                fontWeight: 700,
                                borderRadius: "8px",
                                background: "white",
                                border: "1px solid var(--border-soft)",
                                color: "var(--text-main)",
                                cursor: "pointer",
                              }}
                              title="Sửa quyền hạn & tỷ lệ"
                            >
                              <Icon name="edit" size={14} /> Sửa quyền
                            </button>

                            {!isPrimary && (
                              <button
                                onClick={() => handleRemoveAssignment(asg)}
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "13px",
                                  fontWeight: 700,
                                  borderRadius: "8px",
                                  background: "#fef2f2",
                                  border: "1px solid #fecaca",
                                  color: "#dc2626",
                                  cursor: "pointer",
                                }}
                                title="Rút khỏi đơn vị kiêm nhiệm"
                              >
                                Rút đơn vị
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Card 2: Lịch sử luân chuyển (Timeline) */}
          <section
            className="panel"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid var(--border-soft)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Lịch sử luân chuyển & Điều động
                </h2>
                <p style={{ fontSize: "13px", color: "var(--text-sub)", margin: "4px 0 0 0", fontWeight: 600 }}>
                  Dòng thời gian các kỳ công tác đã hoàn thành, đảm bảo tính liên tục và minh bạch trong hồ sơ sự nghiệp.
                </p>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)" }}>
                {empData.transferHistory.length} kỳ công tác đã đóng
              </span>
            </div>

            {/* Timeline UI */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative", paddingLeft: "28px" }}>
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: "11px",
                  top: "14px",
                  bottom: "20px",
                  width: "2px",
                  background: "#e2e8f0",
                }}
              />

              {empData.transferHistory.map((h, idx) => (
                <div
                  key={h.id}
                  style={{
                    position: "relative",
                    paddingBottom: idx === empData.transferHistory.length - 1 ? "0" : "28px",
                  }}
                >
                  {/* Timeline Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-28px",
                      top: "2px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "white",
                      border: "4px solid #1e40af",
                      boxShadow: "0 0 0 4px #dbeafe",
                    }}
                  />

                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid var(--border-soft)",
                      borderRadius: "16px",
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            background: "#e2e8f0",
                            color: "#334155",
                            padding: "3px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 800,
                          }}
                        >
                          ⏱️ {h.fromDate} – {h.toDate}
                        </span>
                        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 900, color: "var(--text-main)" }}>
                          {h.previousDepartment}
                        </h4>
                        <span
                          style={{
                            background: "#ecfdf5",
                            color: "#059669",
                            padding: "2px 8px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 800,
                          }}
                        >
                          ✓ Bàn giao hoàn tất
                        </span>
                      </div>

                      <p style={{ margin: "8px 0 4px 0", fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>
                        Chức vụ: <b>{h.previousJobTitle}</b> · Vai trò: <span style={{ color: "#1e40af" }}>{h.previousRole}</span>
                      </p>

                      <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "var(--text-sub)", fontWeight: 600 }}>
                        Lý do: {h.reason}
                      </p>
                    </div>

                    <div style={{ textAlign: "right", minWidth: "160px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", display: "block" }}>
                        Quyết định số
                      </span>
                      <b style={{ fontSize: "13px", color: "#1e40af", fontFamily: "monospace" }}>
                        {h.decisionNumber}
                      </b>
                      <small style={{ display: "block", color: "var(--text-sub)", marginTop: "2px" }}>
                        Ký duyệt: {h.signedBy}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: LƯƠNG & ĐÃI NGỘ */}
      {activeTab === "compensation" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Top Summary Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            <div
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)" }}>
                Mức lương cơ bản hiện tại
              </span>
              <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#1e40af", margin: "8px 0 4px 0" }}>
                32.000.000 ₫
              </h3>
              <small style={{ color: "var(--text-sub)", fontWeight: 600 }}>Theo ngạch Senior Designer Level 3</small>
            </div>

            <div
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)" }}>
                Phụ cấp kiêm nhiệm & Trách nhiệm
              </span>
              <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#7c3aed", margin: "8px 0 4px 0" }}>
                +5.000.000 ₫
              </h3>
              <small style={{ color: "var(--text-sub)", fontWeight: 600 }}>Chi trả theo đơn vị kiêm nhiệm Core Tech</small>
            </div>

            <div
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)" }}>
                Tổng thu nhập Gross ước tính
              </span>
              <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#059669", margin: "8px 0 4px 0" }}>
                38.500.000 ₫
              </h3>
              <small style={{ color: "var(--text-sub)", fontWeight: 600 }}>Bao gồm 1.500.000 ₫ ăn trưa & điện thoại</small>
            </div>

            <div
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)" }}>
                Tài khoản nhận lương (Payroll)
              </span>
              <h4 style={{ fontSize: "16px", fontWeight: 900, color: "var(--text-main)", margin: "8px 0 2px 0" }}>
                Vietcombank · {empData.bankAccountNumber}
              </h4>
              <small style={{ color: "var(--text-sub)", fontWeight: 600 }}>CN Tân Bình, TP.HCM</small>
            </div>
          </div>

          {/* Table: Lịch sử chi trả lương từng tháng & Bảo toàn dữ liệu theo đơn vị */}
          <section
            className="panel"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid var(--border-soft)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Lịch sử chi trả lương theo từng kỳ chốt
                </h2>
                <p style={{ fontSize: "13px", color: "var(--text-sub)", margin: "4px 0 0 0", fontWeight: 600 }}>
                  Dữ liệu lương được bảo toàn nguyên vẹn gắn với <b>Đơn vị tại kỳ chốt</b>, đảm bảo tính nhất quán kể cả khi nhân sự đã luân chuyển phòng ban.
                </p>
              </div>

              <span
                style={{
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                🔒 Bảo toàn lịch sử hạch toán Payroll
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0", color: "var(--text-sub)", fontSize: "13px" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>KỲ LƯƠNG</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>ĐƠN VỊ TẠI KỲ CHỐT (BẢO TOÀN)</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>LƯƠNG CƠ BẢN</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>PHỤ CẤP KIÊM NHIỆM</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>THỰC NHẬN (NET)</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800 }}>TRẠNG THÁI</th>
                    <th style={{ padding: "14px 16px", fontWeight: 800, textAlign: "right" }}>PHIẾU LƯƠNG</th>
                  </tr>
                </thead>
                <tbody>
                  {empData.payrollHistory.map((p, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                      <td style={{ padding: "16px", fontWeight: 800, color: "var(--text-main)" }}>
                        {p.period}
                      </td>

                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            background: p.departmentAtPeriod.includes("Product")
                              ? "#eff6ff"
                              : p.departmentAtPeriod.includes("Giao diện")
                              ? "#faf5ff"
                              : "#f1f5f9",
                            color: p.departmentAtPeriod.includes("Product")
                              ? "#1e40af"
                              : p.departmentAtPeriod.includes("Giao diện")
                              ? "#6b21a8"
                              : "#334155",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 700,
                            display: "inline-block",
                          }}
                        >
                          🏛️ {p.departmentAtPeriod}
                        </span>
                      </td>

                      <td style={{ padding: "16px", fontWeight: 700 }}>
                        {p.baseSalary.toLocaleString("vi-VN")} ₫
                      </td>

                      <td style={{ padding: "16px", fontWeight: 700, color: p.concurrentAllowance > 0 ? "#7c3aed" : "var(--text-sub)" }}>
                        {p.concurrentAllowance > 0 ? `+${p.concurrentAllowance.toLocaleString("vi-VN")} ₫` : "—"}
                      </td>

                      <td style={{ padding: "16px", fontWeight: 900, color: "#059669", fontSize: "15px" }}>
                        {p.netSalary.toLocaleString("vi-VN")} ₫
                      </td>

                      <td style={{ padding: "16px" }}>
                        <Status tone={p.status === "paid" ? "green" : "amber"}>
                          {p.status === "paid" ? "Đã chi trả" : "Chờ chốt sổ"}
                        </Status>
                      </td>

                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <button
                          onClick={() => alert(`Đang tải phiếu lương PDF cho ${p.period} của ${empData.fullName}...`)}
                          style={{
                            padding: "6px 12px",
                            fontSize: "13px",
                            fontWeight: 700,
                            borderRadius: "8px",
                            background: "white",
                            border: "1px solid var(--border-soft)",
                            color: "var(--brand)",
                            cursor: "pointer",
                          }}
                        >
                          <Icon name="file" size={14} /> Tải PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: QUẢN LÝ HR & TUÂN THỦ (HR ROLE) */}
      {activeTab === "hr_admin" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Section 1: Hợp đồng & Pháp lý */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <section
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                  📄 Hợp đồng Lao động & Quyết định
                </h3>
                <span
                  style={{
                    background: "#ecfdf5",
                    color: "#059669",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  Đang hiệu lực
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-sub)" }}>Số hợp đồng:</span>
                  <b style={{ fontFamily: "monospace", color: "#1e40af" }}>{empData.contractNumber}</b>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-sub)" }}>Loại hợp đồng:</span>
                  <b>{empData.contractType}</b>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-sub)" }}>Thời hạn:</span>
                  <b>{empData.contractSignDate} – {empData.contractExpiryDate}</b>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-sub)" }}>Mã BHXH cá nhân:</span>
                  <b style={{ fontFamily: "monospace" }}>{empData.socialInsuranceNumber}</b>
                </div>
              </div>
            </section>

            {/* Quỹ phép năm */}
            <section
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                  🌴 Quỹ phép năm & Ngày nghỉ
                </h3>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)" }}>Năm 2026</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", textAlign: "center" }}>
                <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "12px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 700 }}>Tổng hạn ngạch</span>
                  <h4 style={{ margin: "4px 0 0 0", fontSize: "20px", fontWeight: 900, color: "var(--text-main)" }}>
                    {empData.annualLeaveTotal} ngày
                  </h4>
                </div>
                <div style={{ background: "#fef2f2", padding: "14px", borderRadius: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#dc2626", fontWeight: 700 }}>Đã sử dụng</span>
                  <h4 style={{ margin: "4px 0 0 0", fontSize: "20px", fontWeight: 900, color: "#dc2626" }}>
                    {empData.annualLeaveUsed} ngày
                  </h4>
                </div>
                <div style={{ background: "#ecfdf5", padding: "14px", borderRadius: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#059669", fontWeight: 700 }}>Còn lại</span>
                  <h4 style={{ margin: "4px 0 0 0", fontSize: "20px", fontWeight: 900, color: "#059669" }}>
                    {empData.annualLeaveTotal - empData.annualLeaveUsed} ngày
                  </h4>
                </div>
              </div>
            </section>
          </div>

          {/* Section 2: Đánh giá hiệu suất KPI & Bàn giao tài sản */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }}>
            {/* KPI Ratings */}
            <section
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 16px 0" }}>
                🏆 Đánh giá Hiệu suất & Xếp loại KPI
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {empData.kpiRatings.map((kpi, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 18px",
                      background: "#f8fafc",
                      borderRadius: "14px",
                      border: "1px solid var(--border-soft)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <b style={{ fontSize: "15px", color: "var(--text-main)" }}>{kpi.quarter}</b>
                      <p style={{ margin: "3px 0 0 0", fontSize: "13px", color: "var(--text-sub)", fontWeight: 600 }}>
                        {kpi.note}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          background: "#1e40af",
                          color: "white",
                          padding: "3px 10px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: 900,
                        }}
                      >
                        Loại {kpi.rating} ({kpi.score}đ)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Assets */}
            <section
              className="panel"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid var(--border-soft)",
              }}
            >
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 16px 0" }}>
                💻 Tài sản & Thiết bị IT đang bàn giao
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {empData.assets.map((ast, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 16px",
                      background: "#f8fafc",
                      borderRadius: "12px",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <b style={{ fontSize: "14px", color: "var(--text-main)", display: "block" }}>{ast.name}</b>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "12px", color: "var(--text-sub)", fontWeight: 600 }}>
                      <span>S/N: {ast.serial}</span>
                      <span style={{ color: "#059669" }}>{ast.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Section 3: Ghi chú bảo mật HR Admin */}
          <section
            className="panel"
            style={{
              background: "#fffbeb",
              borderRadius: "20px",
              padding: "24px 28px",
              border: "1.5px solid #fde68a",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "18px" }}>🔒</span>
              <h3 style={{ fontSize: "16px", fontWeight: 900, color: "#92400e", margin: 0 }}>
                Ghi chú & Quyết định Nhân sự Nội bộ (HR Internal Only)
              </h3>
            </div>
            <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#78350f", fontWeight: 600 }}>
              {empData.hrInternalNotes}
            </p>
            <small style={{ color: "#b45309", fontWeight: 700 }}>
              Chỉ các tài khoản được phân quyền Quản trị Nhân sự (HR Ops) hoặc Ban Giám đốc mới có thể xem và chỉnh sửa mục này.
            </small>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DIALOG: ĐIỀU CHUYỂN CÔNG TÁC (TRANSFER DIALOG) */}
      {/* ========================================================================= */}
      {isTransferDialogOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsTransferDialogOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Điều chuyển công tác (Transfer Position)
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-sub)", margin: "4px 0 0 0", fontWeight: 600 }}>
                  Nhân sự: <b>{empData.fullName}</b> ({empData.code})
                </p>
              </div>
              <button
                onClick={() => setIsTransferDialogOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmTransfer} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Select phòng ban mới */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Chọn phòng ban / Đơn vị mới <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <select
                  value={transferTargetDept}
                  onChange={(e) => setTransferTargetDept(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 700,
                    background: "white",
                  }}
                  required
                >
                  {ALL_DEPARTMENTS.map((d) => (
                    <option key={d.code} value={d.name}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Input chức danh mới */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Chức danh / Vị trí mới <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  value={transferNewJobTitle}
                  onChange={(e) => setTransferNewJobTitle(e.target.value)}
                  placeholder="Ví dụ: Staff Product Architect"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                  required
                />
              </div>

              {/* Vai trò / Quyền hạn tại đơn vị mới */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Vai trò / Quyền hạn tại đơn vị mới <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {(["Manager", "Lead", "Member"] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setTransferNewRole(r)}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: transferNewRole === r ? "2px solid #1e40af" : "1px solid var(--border-soft)",
                        background: transferNewRole === r ? "#eff6ff" : "white",
                        color: transferNewRole === r ? "#1e40af" : "var(--text-main)",
                        fontWeight: 800,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      {r === "Manager" ? "👑 Manager" : r === "Lead" ? "🎯 Lead" : "👤 Member"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date picker: Ngày bắt đầu hiệu lực */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Ngày bắt đầu hiệu lực điều chuyển <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="date"
                  value={transferEffectiveDate}
                  onChange={(e) => setTransferEffectiveDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  required
                />
              </div>

              {/* Switch: Thu hồi quyền quản lý tại đơn vị cũ */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid var(--border-soft)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <b style={{ fontSize: "14px", color: "var(--text-main)", display: "block" }}>
                    Thu hồi quyền hạn & đơn vị công tác cũ
                  </b>
                  <small style={{ color: "var(--text-sub)", fontSize: "12px", fontWeight: 600 }}>
                    Tự động chuyển các đơn vị hiện tại sang lịch sử luân chuyển đã đóng.
                  </small>
                </div>
                <input
                  type="checkbox"
                  checked={transferRevokeOldRights}
                  onChange={(e) => setTransferRevokeOldRights(e.target.checked)}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </div>

              {/* Textarea: Lý do điều chuyển */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Lý do điều chuyển & Căn cứ quyết định
                </label>
                <textarea
                  rows={3}
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "13px",
                    fontWeight: 600,
                    resize: "none",
                  }}
                  placeholder="Nhập lý do điều động cán bộ..."
                />
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsTransferDialogOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "12px", fontWeight: 800 }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{
                    padding: "10px 24px",
                    borderRadius: "12px",
                    fontWeight: 800,
                    background: "#1e40af",
                  }}
                >
                  Xác nhận điều chuyển
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DIALOG: THÊM ĐƠN VỊ KIÊM NHIỆM */}
      {/* ========================================================================= */}
      {isAddConcurrentOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsAddConcurrentOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                Thêm đơn vị kiêm nhiệm (Concurrent Position)
              </h3>
              <button
                onClick={() => setIsAddConcurrentOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleAddConcurrent} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Chọn phòng ban kiêm nhiệm
                </label>
                <select
                  value={concurrentDept}
                  onChange={(e) => setConcurrentDept(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  required
                >
                  {ALL_DEPARTMENTS.map((d) => (
                    <option key={d.code} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Chức danh kiêm nhiệm
                </label>
                <input
                  type="text"
                  value={concurrentJobTitle}
                  onChange={(e) => setConcurrentJobTitle(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 600 }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Quyền hạn tại đơn vị
                  </label>
                  <select
                    value={concurrentRole}
                    onChange={(e) => setConcurrentRole(e.target.value as any)}
                    style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  >
                    <option value="Manager">Manager (Quản lý)</option>
                    <option value="Lead">Lead (Trưởng nhóm)</option>
                    <option value="Member">Member (Thành viên)</option>
                    <option value="Reviewer">Reviewer (Thẩm định)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Tỷ lệ thời gian phân bổ (%)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={concurrentAllocation}
                    onChange={(e) => setConcurrentAllocation(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Ngày bắt đầu kiêm nhiệm
                </label>
                <input
                  type="date"
                  value={concurrentDate}
                  onChange={(e) => setConcurrentDate(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsAddConcurrentOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "12px", fontWeight: 800 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "10px 22px", borderRadius: "12px", fontWeight: 800, background: "#0284c7" }}
                >
                  Thêm kiêm nhiệm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. DIALOG: SỬA QUYỀN TẠI ĐƠN VỊ */}
      {/* ========================================================================= */}
      {isEditRoleOpen && selectedAssignment && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsEditRoleOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                Chỉnh sửa quyền tại đơn vị
              </h3>
              <button
                onClick={() => setIsEditRoleOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <p style={{ fontSize: "14px", color: "#1e40af", fontWeight: 700, margin: "0 0 16px 0" }}>
              Đơn vị: {selectedAssignment.departmentName}
            </p>

            <form onSubmit={handleSaveRoleEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Quyền tại đơn vị
                </label>
                <select
                  value={editRoleValue}
                  onChange={(e) => setEditRoleValue(e.target.value as any)}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                >
                  <option value="Manager">👑 Manager (Toàn quyền quản trị đơn vị)</option>
                  <option value="Lead">🎯 Lead (Trưởng nhóm / Phê duyệt cấp 1)</option>
                  <option value="Member">👤 Member (Thành viên thông thường)</option>
                  <option value="Reviewer">🔍 Reviewer (Thẩm định chuyên môn)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Tỷ lệ phân bổ thời gian (%)
                </label>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={editAllocationValue}
                  onChange={(e) => setEditAllocationValue(Number(e.target.value))}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-soft)", fontWeight: 700 }}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsEditRoleOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "12px", fontWeight: 800 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "10px 22px", borderRadius: "12px", fontWeight: 800, background: "#1e40af" }}
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DIALOG: XUẤT HỒ SƠ NHÂN SỰ */}
      {/* ========================================================================= */}
      {isExportDialogOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setIsExportDialogOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "#eff6ff",
                color: "#1e40af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <Icon name="file" size={28} />
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: "0 0 6px 0" }}>
              Xuất Hồ sơ Trích ngang Nhân sự
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-sub)", margin: "0 0 24px 0", fontWeight: 600 }}>
              Hệ thống sẽ tổng hợp sơ yếu lý lịch, các đơn vị công tác, lịch sử luân chuyển và bảo lưu lương thành tập tin PDF chuẩn lưu trữ.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                className="primary"
                onClick={() => {
                  alert(`Đã xuất tập tin 'Ho_so_nhan_su_${empData.code}.pdf' thành công!`);
                  setIsExportDialogOpen(false);
                }}
                style={{ padding: "12px", borderRadius: "12px", fontWeight: 800, background: "#1e40af" }}
              >
                Tải xuống bản PDF đầy đủ
              </button>
              <button
                className="secondary"
                onClick={() => {
                  window.print();
                  setIsExportDialogOpen(false);
                }}
                style={{ padding: "12px", borderRadius: "12px", fontWeight: 800 }}
              >
                In hồ sơ (Print view)
              </button>
              <button
                onClick={() => setIsExportDialogOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-sub)", fontWeight: 700, padding: "8px", cursor: "pointer" }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
