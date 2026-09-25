import { useState } from "react";
import { Icon, Status } from "./App";

// ─── Types ─────────────────────────────────────────────
type AdminTab = "user_delegation" | "custom_groups" | "branches" | "audit";

const ALL_SYSTEM_TEAMS = [
  "Dev Team (Backend)",
  "Dev Team (Frontend)",
  "Mobile Chapter (iOS & Android)",
  "UI/UX Design Studio",
  "HR Operations & Policy",
  "Talent Acquisition",
  "Marketing & Growth",
  "Sales Team",
  "Finance & Payroll",
  "QA & Automation Testing",
];

interface UserCustomPermission {
  empCode: string;
  empName: string;
  dept: string; // Primary Dept
  secondaryDepts: string[]; // Các phòng ban / team kiêm nhiệm
  managedTeams: string[]; // Các team thuộc phạm vi Quản lý & Duyệt công
  assignedGroup: string;
  grantedFeatures: {
    approveTeamRequests: boolean; // Duyệt WFH & Công
    confirmOt: boolean; // Xác nhận Overtime
    lockTimesheet: boolean; // Chốt Timesheet
    manageRecruitment: boolean; // Quản lý Tuyển dụng Kanban
    viewAnalytics: boolean; // Xem Báo cáo Analytics
    configPolicies: boolean; // Cấu hình Chính sách
  };
}

interface CustomPermissionGroup {
  id: string;
  name: string;
  desc: string;
  memberCount: number;
  features: {
    approveTeamRequests: boolean;
    confirmOt: boolean;
    lockTimesheet: boolean;
    manageRecruitment: boolean;
    viewAnalytics: boolean;
    configPolicies: boolean;
  };
}

interface Branch {
  id: string;
  name: string;
  address: string;
  gps: string;
  wifiIp: string;
  empCount: number;
  assignedHr: string[];
}

interface AuditLog {
  id: string;
  time: string;
  user: string;
  role: string;
  init: string;
  cls: string;
  action: string;
  ip: string;
  diff: string;
  type: "info" | "warn" | "danger" | "success";
}

// ─── Seed Data ─────────────────────────────────────────
const INITIAL_CUSTOM_GROUPS: CustomPermissionGroup[] = [
  {
    id: "g1",
    name: "Nhóm Quản lý Duyệt Team (Team Approver)",
    desc: "Cấp quyền duyệt đơn WFH, giải trình công và xác nhận OT cho các thành viên trong nhóm",
    memberCount: 14,
    features: {
      approveTeamRequests: true,
      confirmOt: true,
      lockTimesheet: false,
      manageRecruitment: false,
      viewAnalytics: true,
      configPolicies: false,
    },
  },
  {
    id: "g2",
    name: "Nhóm Vận hành Tuyển dụng (Talent Acquisition)",
    desc: "Quản lý Pipeline ứng viên Kanban: Ứng tuyển -> Phỏng vấn -> Offer -> Onboarding",
    memberCount: 5,
    features: {
      approveTeamRequests: false,
      confirmOt: false,
      lockTimesheet: false,
      manageRecruitment: true,
      viewAnalytics: false,
      configPolicies: false,
    },
  },
  {
    id: "g3",
    name: "Nhóm Chốt công & Tính lương (Payroll Controller)",
    desc: "Quyền Auto-Calculate công tháng, đối soát nhật ký và khóa Timesheet chuyển MISA AMIS",
    memberCount: 3,
    features: {
      approveTeamRequests: true,
      confirmOt: true,
      lockTimesheet: true,
      manageRecruitment: false,
      viewAnalytics: true,
      configPolicies: true,
    },
  },
  {
    id: "g4",
    name: "Nhóm Kiểm soát Chính sách Chi nhánh (Branch Policy Admin)",
    desc: "Cấu hình giờ Core Hours, số phút phạt trễ và tọa độ GPS/BSSID Wi-Fi văn phòng",
    memberCount: 6,
    features: {
      approveTeamRequests: false,
      confirmOt: false,
      lockTimesheet: false,
      manageRecruitment: false,
      viewAnalytics: true,
      configPolicies: true,
    },
  },
];

const INITIAL_USER_PERMISSIONS: UserCustomPermission[] = [
  {
    empCode: "NV-0101",
    empName: "Nguyễn Minh Anh",
    dept: "Dev Team (Backend)",
    secondaryDepts: ["Mobile Chapter (iOS & Android)", "QA & Automation Testing"],
    managedTeams: ["Dev Team (Backend)", "Mobile Chapter (iOS & Android)"],
    assignedGroup: "Nhóm Quản lý Duyệt Team (Team Approver)",
    grantedFeatures: {
      approveTeamRequests: true,
      confirmOt: true,
      lockTimesheet: false,
      manageRecruitment: false,
      viewAnalytics: true,
      configPolicies: false,
    },
  },
  {
    empCode: "NV-0102",
    empName: "Trần Bảo Linh",
    dept: "Dev Team (Frontend)",
    secondaryDepts: ["UI/UX Design Studio"],
    managedTeams: ["Dev Team (Frontend)"],
    assignedGroup: "Nhóm Vận hành Tuyển dụng (Talent Acquisition)",
    grantedFeatures: {
      approveTeamRequests: false,
      confirmOt: false,
      lockTimesheet: false,
      manageRecruitment: true,
      viewAnalytics: false,
      configPolicies: false,
    },
  },
  {
    empCode: "NV-0103",
    empName: "Lê Hoàng Khoa",
    dept: "Dev Team (Backend)",
    secondaryDepts: ["Dev Team (Frontend)", "QA & Automation Testing"],
    managedTeams: ["Dev Team (Backend)", "Dev Team (Frontend)", "QA & Automation Testing"],
    assignedGroup: "Nhóm Chốt công & Tính lương (Payroll Controller)",
    grantedFeatures: {
      approveTeamRequests: true,
      confirmOt: true,
      lockTimesheet: true,
      manageRecruitment: true,
      viewAnalytics: true,
      configPolicies: false,
    },
  },
  {
    empCode: "NV-0104",
    empName: "Phạm Thu Hà",
    dept: "HR Operations & Policy",
    secondaryDepts: ["Talent Acquisition", "Marketing & Growth"],
    managedTeams: ["HR Operations & Policy", "Talent Acquisition"],
    assignedGroup: "Nhóm Quản lý Duyệt Team (Team Approver)",
    grantedFeatures: {
      approveTeamRequests: true,
      confirmOt: true,
      lockTimesheet: false,
      manageRecruitment: true,
      viewAnalytics: true,
      configPolicies: false,
    },
  },
  {
    empCode: "NV-0105",
    empName: "Nguyễn Văn Hùng",
    dept: "Marketing & Growth",
    secondaryDepts: ["Sales Team"],
    managedTeams: [],
    assignedGroup: "Nhóm Quyền Mặc định",
    grantedFeatures: {
      approveTeamRequests: false,
      confirmOt: false,
      lockTimesheet: false,
      manageRecruitment: false,
      viewAnalytics: false,
      configPolicies: false,
    },
  },
  {
    empCode: "NV-0106",
    empName: "Đặng Hoàng Nam",
    dept: "Sales Team",
    secondaryDepts: ["Marketing & Growth"],
    managedTeams: ["Sales Team", "Marketing & Growth"],
    assignedGroup: "Nhóm Quản lý Duyệt Team (Team Approver)",
    grantedFeatures: {
      approveTeamRequests: true,
      confirmOt: false,
      lockTimesheet: false,
      manageRecruitment: false,
      viewAnalytics: false,
      configPolicies: false,
    },
  },
  {
    empCode: "NV-0107",
    empName: "Vũ Thị Kim Anh",
    dept: "Finance & Payroll",
    secondaryDepts: ["HR Operations & Policy"],
    managedTeams: ["Finance & Payroll"],
    assignedGroup: "Nhóm Chốt công & Tính lương (Payroll Controller)",
    grantedFeatures: {
      approveTeamRequests: false,
      confirmOt: true,
      lockTimesheet: true,
      manageRecruitment: false,
      viewAnalytics: true,
      configPolicies: false,
    },
  },
];


const BRANCHES: Branch[] = [
  { id: "b1", name: "Chi nhánh TP. Hồ Chí Minh", address: "Tòa nhà Saigon Centre, Quận 1, TP.HCM", gps: "10.7731° N, 106.7005° E", wifiIp: "118.69.182.42", empCount: 101, assignedHr: ["Lê Khánh Linh (HRB)", "Nguyễn Hải Yến (HRB)"] },
  { id: "b2", name: "Chi nhánh Hà Nội", address: "Tòa nhà Keangnam Landmark, Cầu Giấy, Hà Nội", gps: "21.0168° N, 105.7839° E", wifiIp: "14.232.208.99", empCount: 54, assignedHr: ["Phạm Tuấn Anh (HRB)", "Lê Mai Phương (HRB)"] },
  { id: "b3", name: "Chi nhánh Đà Nẵng", address: "Tòa nhà Software Park, Hải Châu, Đà Nẵng", gps: "16.0748° N, 108.2240° E", wifiIp: "116.109.112.5", empCount: 31, assignedHr: ["Trần Minh Thư (HRB)"] },
];

const AUDIT_LOGS: AuditLog[] = [
  { id: "al1", time: "25/09/2026 16:15", user: "Nguyễn Hải Yến", role: "HR Operations", init: "HY", cls: "f3", action: "Duyệt đơn WFH hàng loạt", ip: "118.69.182.42", diff: "WFH Approved: [MA, BL, HK] for 30/09/2026", type: "success" },
  { id: "al2", time: "25/09/2026 15:42", user: "Phùng Tiến Đạt", role: "HR Controller", init: "TĐ", cls: "f1", action: "Chốt Timesheet Tháng 09/2026", ip: "118.69.182.42", diff: "Period status: OPEN -> LOCKED (9 employees)", type: "warn" },
  { id: "al3", time: "24/09/2026 14:10", user: "Vũ Thanh Tùng", role: "System Admin", init: "TT", cls: "cyan", action: "Tạo Nhóm Quyền Động Mới", ip: "14.232.208.99", diff: "Created Group: [Nhóm Vận hành Tuyển dụng]", type: "info" },
  { id: "al4", time: "25/09/2026 11:28", user: "Trần Hoàng Nam", role: "Team Manager", init: "HN", cls: "f2", action: "Xác nhận Overtime hàng loạt", ip: "118.69.182.42", diff: "OT Confirmed: 5.5h (Trần Bảo Linh, Lê Hoàng Khoa)", type: "success" },
  { id: "al5", time: "24/09/2026 18:00", user: "System Scheduler", role: "System", init: "SYS", cls: "amber", action: "Tự động khóa sổ công tháng", ip: "127.0.0.1", diff: "Lock execution timestamp: 18:00:00 GMT+7", type: "danger" },
];

export default function AdminPage({ page }: { page?: string }) {
  const [activeTab, setActiveTab] = useState<AdminTab>(
    page === "branches" ? "branches" : page === "system" ? "audit" : "user_delegation"
  );
  
  const [customGroups, setCustomGroups] = useState<CustomPermissionGroup[]>(INITIAL_CUSTOM_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("g1");
  const [userPermissions, setUserPermissions] = useState<UserCustomPermission[]>(INITIAL_USER_PERMISSIONS);
  const [selectedEmpCode, setSelectedEmpCode] = useState<string>("NV-0101");
  const [empSearchQuery, setEmpSearchQuery] = useState<string>("");

  // Modal create new custom group
  const [newGroupModal, setNewGroupModal] = useState(false);
  const [newGroupName, setNewGroupName]   = useState("");
  const [newGroupDesc, setNewGroupDesc]   = useState("");

  // Drawer for Branch Scope assignment
  const [scopeDrawerOpen, setScopeDrawerOpen] = useState(false);
  const [targetHr, setTargetHr]               = useState("Lê Khánh Linh (HRB)");
  const [selectedBranches, setSelectedBranches] = useState<string[]>(["b1", "b2"]);

  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3200);
  };

  // Toggle user specific functional feature permission
  const toggleUserFeature = (featKey: keyof UserCustomPermission["grantedFeatures"]) => {
    setUserPermissions((prev) =>
      prev.map((u) => {
        if (u.empCode === selectedEmpCode) {
          return {
            ...u,
            grantedFeatures: {
              ...u.grantedFeatures,
              [featKey]: !u.grantedFeatures[featKey],
            },
          };
        }
        return u;
      })
    );
    toast(`⚡ Đã cập nhật quyền chức năng cá nhân cho nhân viên ${selectedEmpCode}`);
  };

  // Toggle user secondary department
  const toggleUserSecondaryDept = (teamName: string) => {
    setUserPermissions((prev) =>
      prev.map((u) => {
        if (u.empCode === selectedEmpCode) {
          const exists = u.secondaryDepts.includes(teamName);
          const next = exists
            ? u.secondaryDepts.filter((t) => t !== teamName)
            : [...u.secondaryDepts, teamName];
          return { ...u, secondaryDepts: next };
        }
        return u;
      })
    );
    toast(`⚡ Đã cập nhật Phòng ban kiêm nhiệm cho ${selectedEmpCode}`);
  };

  // Toggle user managed teams scope
  const toggleUserManagedTeam = (teamName: string) => {
    setUserPermissions((prev) =>
      prev.map((u) => {
        if (u.empCode === selectedEmpCode) {
          const exists = u.managedTeams.includes(teamName);
          const next = exists
            ? u.managedTeams.filter((t) => t !== teamName)
            : [...u.managedTeams, teamName];
          return { ...u, managedTeams: next };
        }
        return u;
      })
    );
    toast(`⚡ Đã cập nhật Phạm vi Quản lý Team cho ${selectedEmpCode}`);
  };

  // Toggle custom group feature
  const toggleGroupFeature = (featKey: keyof CustomPermissionGroup["features"]) => {
    setCustomGroups((prev) =>
      prev.map((g) => {
        if (g.id === selectedGroupId) {
          return {
            ...g,
            features: {
              ...g.features,
              [featKey]: !g.features[featKey],
            },
          };
        }
        return g;
      })
    );
    toast(`⚡ Đã cập nhật ma trận quyền cho nhóm tùy chỉnh`);
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const newG: CustomPermissionGroup = {
      id: `g${Date.now()}`,
      name: newGroupName.trim(),
      desc: newGroupDesc.trim() || "Nhóm quyền tùy chỉnh do HR tạo",
      memberCount: 0,
      features: {
        approveTeamRequests: true,
        confirmOt: false,
        lockTimesheet: false,
        manageRecruitment: false,
        viewAnalytics: true,
        configPolicies: false,
      },
    };
    setCustomGroups((prev) => [...prev, newG]);
    setSelectedGroupId(newG.id);
    setNewGroupModal(false);
    setNewGroupName("");
    setNewGroupDesc("");
    toast(`✅ Đã tạo Nhóm Quyền Động mới [${newG.name}] thành công!`);
  };

  const filteredEmployees = userPermissions.filter(
    (u) =>
      u.empCode.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
      u.empName.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
      u.dept.toLowerCase().includes(empSearchQuery.toLowerCase())
  );

  const currentEmpPerm = userPermissions.find((u) => u.empCode === selectedEmpCode) || userPermissions[0] || {
    empCode: "NV-0101",
    empName: "Nguyễn Minh Anh",
    dept: "Dev Team (Backend)",
    secondaryDepts: [],
    managedTeams: [],
    assignedGroup: "Mặc định",
    grantedFeatures: {
      approveTeamRequests: true,
      confirmOt: true,
      lockTimesheet: false,
      manageRecruitment: false,
      viewAnalytics: true,
      configPolicies: false,
    },
  };
  const currentGroup = customGroups.find((g) => g.id === selectedGroupId) || customGroups[0];

  const secondaryDeptsList = currentEmpPerm.secondaryDepts || [];
  const managedTeamsList = currentEmpPerm.managedTeams || [];

  const handleSaveScope = (e: React.FormEvent) => {
    e.preventDefault();
    setScopeDrawerOpen(false);
    toast(`✅ Đã gán phạm vi Chi nhánh thành công cho ${targetHr}!`);
  };

  return (
    <div className="page inner-page admin-page">
      {/* Heading */}
      <div className="page-heading">
        <div>
          <p>DYNAMIC ACCESS CONTROL & SECURITY</p>
          <h1>Quản trị Hệ thống & Ủy quyền Chức năng Động</h1>
          <span>
            Phân quyền linh hoạt trực tiếp cho Nhân viên & Quản lý danh mục Nhóm quyền Tùy chỉnh (Không dùng Role cứng).
          </span>
        </div>
        <div className="heading-actions">
          {toastMsg && <div className="lead-toast">{toastMsg}</div>}
          <button
            type="button"
            className="primary"
            onClick={() => toast("✅ Đã đồng bộ cấu hình phân quyền động lên Server thành công!")}
          >
            <Icon name="shield" /> Đồng bộ Cấu hình
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="policy-tabs-bar">
        <button
          type="button"
          className={activeTab === "user_delegation" ? "active" : ""}
          onClick={() => setActiveTab("user_delegation")}
        >
          <Icon name="user" />
          <div>
            <b>1. Gán Quyền Chức năng cho NV</b>
            <small>Ủy quyền trực tiếp tính năng quản lý cho nhân viên</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "custom_groups" ? "active" : ""}
          onClick={() => setActiveTab("custom_groups")}
        >
          <Icon name="shield" />
          <div>
            <b>2. Quản lý Nhóm Quyền Tùy chỉnh</b>
            <small>Tự tạo & định nghĩa các nhóm quyền động linh hoạt</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "branches" ? "active" : ""}
          onClick={() => setActiveTab("branches")}
        >
          <Icon name="briefcase" />
          <div>
            <b>3. Phân vùng Chi nhánh (Multi-site)</b>
            <small>Gán phạm vi dữ liệu Branch Scope cho HR Chi nhánh</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "audit" ? "active" : ""}
          onClick={() => setActiveTab("audit")}
        >
          <Icon name="file" />
          <div>
            <b>4. Nhật ký Kiểm toán (Audit Logs)</b>
            <small>Theo dõi lịch sử thao tác, địa chỉ IP và chi tiết Diff</small>
          </div>
        </button>
      </div>

      {/* ─── SECTION 1: USER FUNCTIONAL DELEGATION ──────────────────────── */}
      {activeTab === "user_delegation" && (
        <div className="policy-tab-content fade-in">
          <section className="panel">
            <div className="panel-title">
              <div>
                <p>ỦY QUYỀN CHỨC NĂNG CÁ NHÂN (DYNAMIC USER DELEGATION)</p>
                <h2>1. Gán Quyền Quản lý & Chức năng Cụ thể cho Nhân viên</h2>
              </div>
              <Status tone="blue">HR Feature Assignment Hub</Status>
            </div>

            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-950 mb-5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                <Icon name="sparkles" size={18} />
              </span>
              <div>
                <b>Hệ thống Phân quyền Linh hoạt (Dynamic Feature Delegation):</b> HR có quyền gán trực tiếp bất kỳ tính năng quản lý nào cho từng Nhân viên mà không bị bó hẹp bởi Role mặc định. Nhân viên được gán sẽ tự động mở rộng Menu & Dashboard tương ứng.
              </div>
            </div>

            {/* Employee Search & Selection Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-2 flex items-center justify-between">
                  <span>Tìm kiếm & Chọn nhân viên:</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    {filteredEmployees.length}/{userPermissions.length} kết quả
                  </span>
                </label>

                {/* Search Input Field */}
                <div className="relative mb-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Icon name="search" size={14} />
                  </div>
                  <input
                    type="text"
                    value={empSearchQuery}
                    onChange={(e) => setEmpSearchQuery(e.target.value)}
                    placeholder="Nhập Mã NV (VD: NV-0101) hoặc Tên..."
                    className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {empSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setEmpSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <Icon name="close" size={13} />
                    </button>
                  )}
                </div>

                {/* Select Box for Filtered Results */}
                <select
                  value={selectedEmpCode}
                  onChange={(e) => setSelectedEmpCode(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-extrabold text-blue-600 mb-3"
                >
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((u) => (
                      <option key={u.empCode} value={u.empCode}>
                        {u.empCode} — {u.empName} ({u.dept})
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Không tìm thấy nhân viên phù hợp
                    </option>
                  )}
                </select>

                {/* Quick Selection List */}
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 mb-3">
                  {filteredEmployees.map((u) => {
                    const isSelected = u.empCode === selectedEmpCode;
                    return (
                      <button
                        key={u.empCode}
                        type="button"
                        onClick={() => setSelectedEmpCode(u.empCode)}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="truncate">
                          <span className={`font-mono text-[11px] mr-1.5 px-1.5 py-0.5 rounded ${isSelected ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"}`}>
                            {u.empCode}
                          </span>
                          <span>{u.empName}</span>
                        </div>
                        <small className={`text-[10px] ml-1 flex-shrink-0 ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                          {u.dept}
                        </small>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã NV:</span>
                    <b className="text-slate-900">{currentEmpPerm.empCode}</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Họ và tên:</span>
                    <b className="text-slate-900">{currentEmpPerm.empName}</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phòng chính:</span>
                    <b className="text-blue-700 font-bold">{currentEmpPerm.dept}</b>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Kiêm nhiệm ({currentEmpPerm.secondaryDepts.length} Team):</span>
                    <div className="flex flex-wrap gap-1">
                      {currentEmpPerm.secondaryDepts.length > 0 ? (
                        currentEmpPerm.secondaryDepts.map((t, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] border border-slate-200">
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">Chưa có team kiêm nhiệm</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Duyệt quản lý ({currentEmpPerm.managedTeams.length} Team):</span>
                    <div className="flex flex-wrap gap-1">
                      {currentEmpPerm.managedTeams.length > 0 ? (
                        currentEmpPerm.managedTeams.map((t, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
                            ✓ {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">Chưa gán quyền quản lý team</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Toggles & Multi-Team Scope Panel */}
              <div className="md:col-span-2 space-y-4">
                {/* 1. Functional Features */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>1. Chức năng Ủy quyền Trực tiếp cho {currentEmpPerm.empName}:</span>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      Feature Flags Active
                    </span>
                  </h3>

                  {/* Privilege Toggle 1 */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Duyệt Đơn WFH & Điều chỉnh Chấm công Team</b>
                      <small className="text-slate-500">Cho phép duyệt yêu cầu làm từ xa và giải trình công của đồng nghiệp thuộc phạm vi quản lý</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentEmpPerm.grantedFeatures.approveTeamRequests}
                      onChange={() => toggleUserFeature("approveTeamRequests")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Privilege Toggle 2 */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Xác nhận Overtime & Đổi ca Làm việc</b>
                      <small className="text-slate-500">Quyền phê duyệt ca OT thực tế và xác nhận đơn đổi ca giữa các nhân viên</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentEmpPerm.grantedFeatures.confirmOt}
                      onChange={() => toggleUserFeature("confirmOt")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Privilege Toggle 3 */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Quyền Chốt dữ liệu Timesheet & Kỳ công</b>
                      <small className="text-slate-500">Mở quyền Auto-Calculate công tháng và chốt khóa dữ liệu chuyển sang Payroll</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentEmpPerm.grantedFeatures.lockTimesheet}
                      onChange={() => toggleUserFeature("lockTimesheet")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Privilege Toggle 4 */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Quản lý Quy trình Tuyển dụng Kanban</b>
                      <small className="text-slate-500">Quyền truy cập Kanban Board ứng viên: Ứng tuyển -&gt; Phỏng vấn -&gt; Offer -&gt; Onboarding</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentEmpPerm.grantedFeatures.manageRecruitment}
                      onChange={() => toggleUserFeature("manageRecruitment")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Privilege Toggle 5 */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Xem Báo cáo Phân tích HR Analytics</b>
                      <small className="text-slate-500">Xem biểu đồ biến động nhân sự, tỷ lệ nghỉ việc và ngân sách chi phí OT toàn công ty</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentEmpPerm.grantedFeatures.viewAnalytics}
                      onChange={() => toggleUserFeature("viewAnalytics")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* 2. Multi-Department Membership Config */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        2. Cấu hình Đa Phòng ban / Team Kiêm nhiệm (Multi-Department Membership)
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Bấm chọn các phòng ban/team nhân viên {currentEmpPerm.empName} tham gia kiêm nhiệm dự án:
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">
                      {currentEmpPerm.secondaryDepts.length} Team kiêm nhiệm
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {ALL_SYSTEM_TEAMS.map((tName) => {
                      const isPrimary = currentEmpPerm.dept === tName;
                      const isSecondary = currentEmpPerm.secondaryDepts.includes(tName);
                      return (
                        <button
                          key={tName}
                          type="button"
                          disabled={isPrimary}
                          onClick={() => toggleUserSecondaryDept(tName)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                            isPrimary
                              ? "bg-slate-200 text-slate-700 border-slate-300 cursor-not-allowed font-bold"
                              : isSecondary
                              ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {isPrimary ? (
                            <span className="text-[10px] bg-slate-300 text-slate-800 px-1 rounded">Chính</span>
                          ) : isSecondary ? (
                            <Icon name="check" size={12} />
                          ) : (
                            <Icon name="plus" size={12} />
                          )}
                          <span>{tName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Multi-Team Management Approval Scope Config */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        3. Phạm vi Quản lý & Phê duyệt Đa Team (Multi-Team Manager Scope)
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Chọn các Team mà {currentEmpPerm.empName} có thẩm quyền phê duyệt đơn từ & quản lý trực tiếp:
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      ✓ Đang quản lý {currentEmpPerm.managedTeams.length} Team
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {ALL_SYSTEM_TEAMS.map((tName) => {
                      const isManaged = currentEmpPerm.managedTeams.includes(tName);
                      return (
                        <button
                          key={tName}
                          type="button"
                          onClick={() => toggleUserManagedTeam(tName)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                            isManaged
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {isManaged ? <Icon name="check" size={13} /> : <Icon name="plus" size={13} />}
                          <span>{tName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── SECTION 2: DYNAMIC CUSTOM GROUPS ───────────────────────────── */}
      {activeTab === "custom_groups" && (
        <div className="policy-tab-content fade-in">
          <section className="panel">
            <div className="panel-title">
              <div>
                <p>NHÓM QUYỀN TỰ ĐỊNH NGHĨA (CUSTOM PERMISSION GROUPS)</p>
                <h2>2. Quản lý Nhóm Quyền Tùy chỉnh (Động 100%)</h2>
              </div>
              <button
                type="button"
                className="primary sm-btn"
                onClick={() => setNewGroupModal(true)}
              >
                <Icon name="plus" /> Tạo Nhóm Quyền Mới
              </button>
            </div>

            {/* Custom Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
              {customGroups.map((g) => (
                <div
                  key={g.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedGroupId === g.id
                      ? "bg-blue-50/90 border-blue-500 shadow-md ring-2 ring-blue-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedGroupId(g.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Icon name="shield" size={16} />
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {g.memberCount} thành viên
                    </span>
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 mb-1 leading-snug">{g.name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{g.desc}</p>
                </div>
              ))}
            </div>

            {/* Group Feature Customizer Panel */}
            {currentGroup && (
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                      Đang chỉnh sửa Ma trận cho nhóm:
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{currentGroup.name}</h3>
                    <p className="text-xs text-slate-500">{currentGroup.desc}</p>
                  </div>
                  <Status tone="blue">{currentGroup.memberCount} Thành viên áp dụng</Status>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Quyền Phê duyệt WFH & Chấm công</b>
                      <small className="text-slate-500">Duyệt yêu cầu làm việc từ xa và điều chỉnh công</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentGroup.features.approveTeamRequests}
                      onChange={() => toggleGroupFeature("approveTeamRequests")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Xác nhận Overtime & Ca làm việc</b>
                      <small className="text-slate-500">Xác nhận giờ OT thực tế và đổi ca</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentGroup.features.confirmOt}
                      onChange={() => toggleGroupFeature("confirmOt")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Quyền Chốt dữ liệu Timesheet</b>
                      <small className="text-slate-500">Tính toán công và khóa sổ kỳ công</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentGroup.features.lockTimesheet}
                      onChange={() => toggleGroupFeature("lockTimesheet")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Quản lý Tuyển dụng Kanban</b>
                      <small className="text-slate-500">Quản lý danh sách vị trí & pipeline ứng viên</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentGroup.features.manageRecruitment}
                      onChange={() => toggleGroupFeature("manageRecruitment")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Xem Báo cáo Phân tích HR Analytics</b>
                      <small className="text-slate-500">Xem biểu đồ Headcount, Turnover rate & Chi phí</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentGroup.features.viewAnalytics}
                      onChange={() => toggleGroupFeature("viewAnalytics")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                    <div>
                      <b className="text-xs text-slate-900 block">Cấu hình Chính sách HR & Wi-Fi/GPS</b>
                      <small className="text-slate-500">Cấu hình quy định giờ làm việc và GPS chi nhánh</small>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentGroup.features.configPolicies}
                      onChange={() => toggleGroupFeature("configPolicies")}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ─── SECTION 3: BRANCH SCOPING & MULTI-SITE ─────────────────────── */}
      {activeTab === "branches" && (
        <div className="policy-tab-content fade-in">
          <section className="panel branch-panel">
            <div className="panel-title">
              <div>
                <p>CẤU TRÚC CHI NHÁNH & PHÂN VÙNG</p>
                <h2>3. Danh sách Chi nhánh & Gán phạm vi (Branch Scope)</h2>
              </div>
              <button
                type="button"
                className="primary sm-btn"
                onClick={() => setScopeDrawerOpen(true)}
              >
                <Icon name="user" /> Gán HR Chi nhánh
              </button>
            </div>

            {/* Branch Cards Grid */}
            <div className="branch-grid-new">
              {BRANCHES.map((b) => (
                <article className="branch-card-item" key={b.id}>
                  <div className="bc-head">
                    <div>
                      <span className="bc-icon">
                        <Icon name="briefcase" />
                      </span>
                      <h3>{b.name}</h3>
                    </div>
                    <Status tone="green">Hoạt động</Status>
                  </div>

                  <div className="bc-body">
                    <div className="bc-info-row">
                      <Icon name="search" size={13} />
                      <span>{b.address}</span>
                    </div>

                    <div className="bc-info-row">
                      <Icon name="shield" size={13} />
                      <span>
                        Tọa độ GPS: <b>{b.gps}</b>
                      </span>
                    </div>

                    <div className="bc-info-row">
                      <Icon name="laptop" size={13} />
                      <span>
                        IP Wi-Fi công ty: <b>{b.wifiIp}</b>
                      </span>
                    </div>

                    <div className="bc-hr-list">
                      <small>HRB phụ trách phạm vi:</small>
                      <div className="bc-hr-tags">
                        {b.assignedHr.map((hr, idx) => (
                          <span key={idx} className="hr-scope-pill">
                            <Icon name="user" size={10} /> {hr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bc-footer">
                    <span>
                      Quy mô: <b>{b.empCount} nhân sự</b>
                    </span>
                    <button
                      type="button"
                      className="secondary sm-btn"
                      onClick={() => setScopeDrawerOpen(true)}
                    >
                      Cấu hình Scope <Icon name="chevron" size={12} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ─── SECTION 4: SYSTEM AUDIT LOGS ────────────────────────────────── */}
      {activeTab === "audit" && (
        <div className="policy-tab-content fade-in">
          <section className="panel audit-panel">
            <div className="panel-title">
              <div>
                <p>AN NINH & TRUY VẾT</p>
                <h2>4. Nhật ký Kiểm toán Hoạt động Hệ thống</h2>
              </div>
              <div className="mini-search" style={{ width: 260 }}>
                <Icon name="search" />
                <input placeholder="Tìm theo thao tác, IP, người thực hiện..." />
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="hr-table-wrap">
              <div className="audit-tbl-head">
                <span>THỜI GIAN</span>
                <span>NGƯỜI THỰC HIỆN</span>
                <span>CHỨC DANH</span>
                <span>HÀNH ĐỘNG</span>
                <span>ĐỊA CHỈ IP</span>
                <span>CHI TIẾT THAY ĐỔI (DIFF LOG)</span>
              </div>

              {AUDIT_LOGS.map((log) => (
                <div className="audit-tbl-row" key={log.id}>
                  <div className="audit-time-cell">{log.time}</div>

                  <div className="req-emp">
                    <span className={`face ${log.cls}`}>{log.init}</span>
                    <b>{log.user}</b>
                  </div>

                  <div>
                    <span className="audit-role-tag">{log.role}</span>
                  </div>

                  <div className="audit-action-cell">
                    <b>{log.action}</b>
                  </div>

                  <div className="audit-ip-cell">{log.ip}</div>

                  <div className="audit-diff-cell">
                    <code className={`diff-code ${log.type}`}>{log.diff}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ── MODAL: Tạo Nhóm Quyền Động Mới ───────────────────────────── */}
      {newGroupModal && (
        <div className="modal-backdrop" onMouseDown={() => setNewGroupModal(false)}>
          <form
            className="modal"
            onMouseDown={(e) => e.stopPropagation()}
            onSubmit={handleCreateGroup}
          >
            <div className="modal-head">
              <div>
                <span className="qa-icon cyan">
                  <Icon name="shield" />
                </span>
                <div>
                  <p>CUSTOM GROUP CREATION</p>
                  <h2>Tạo Nhóm Quyền Tùy chỉnh Mới</h2>
                </div>
              </div>
              <button type="button" onClick={() => setNewGroupModal(false)}>
                <Icon name="close" />
              </button>
            </div>

            <div className="policy-ok">
              <Icon name="sparkles" />
              <span>
                Nhóm quyền động cho phép gán ma trận tính năng chung cho nhiều nhân viên mà không phụ thuộc vai trò cố định.
              </span>
            </div>

            <label>
              Tên Nhóm Quyền <span className="text-rose-500">*</span>
              <input
                type="text"
                placeholder="Ví dụ: Nhóm Quản lý Dự án & Phê duyệt Team HCM"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                required
                className="field-input block-input"
                style={{ marginTop: 6 }}
              />
            </label>

            <label style={{ marginTop: 12 }}>
              Mô tả ngắn nhóm quyền
              <textarea
                placeholder="Mô tả phạm vi trách nhiệm của nhóm..."
                value={newGroupDesc}
                onChange={(e) => setNewGroupDesc(e.target.value)}
                className="field-input block-input"
                rows={3}
                style={{ marginTop: 6 }}
              />
            </label>

            <div className="modal-actions" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="secondary"
                onClick={() => setNewGroupModal(false)}
              >
                Hủy
              </button>
              <button className="primary" type="submit">
                <Icon name="plus" /> Khởi tạo Nhóm Quyền
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── MODAL / DRAWER: Gán HR Chi nhánh (Branch Scope) ─────────────── */}
      {scopeDrawerOpen && (
        <div className="modal-backdrop" onMouseDown={() => setScopeDrawerOpen(false)}>
          <form
            className="modal"
            onMouseDown={(e) => e.stopPropagation()}
            onSubmit={handleSaveScope}
          >
            <div className="modal-head">
              <div>
                <span className="qa-icon cyan">
                  <Icon name="shield" />
                </span>
                <div>
                  <p>PHÂN VÙNG DỮ LIỆU</p>
                  <h2>Gán Phạm vi Chi nhánh (Branch Scope)</h2>
                </div>
              </div>
              <button type="button" onClick={() => setScopeDrawerOpen(false)}>
                <Icon name="close" />
              </button>
            </div>

            <div className="policy-ok">
              <Icon name="shield" />
              <span>
                Nhân viên HRB chỉ được quyền xem, sửa và phê duyệt dữ liệu nhân sự thuộc Chi nhánh được gán.
              </span>
            </div>

            <label>
              Chọn Nhân viên HRB
              <select
                value={targetHr}
                onChange={(e) => setTargetHr(e.target.value)}
                className="field-input block-input"
                style={{ marginTop: 6 }}
              >
                <option value="Lê Khánh Linh (HRB)">Lê Khánh Linh — HRB HCM</option>
                <option value="Phạm Tuấn Anh (HRB)">Phạm Tuấn Anh — HRB Hà Nội</option>
                <option value="Nguyễn Hải Yến (HRB)">Nguyễn Hải Yến — HRB HCM</option>
                <option value="Trần Minh Thư (HRB)">Trần Minh Thư — HRB Đà Nẵng</option>
              </select>
            </label>

            <div className="scope-select-box" style={{ marginTop: 14 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>
                Các chi nhánh cho phép truy cập dữ liệu:
              </label>

              {BRANCHES.map((b) => {
                const isChecked = selectedBranches.includes(b.id);
                return (
                  <label key={b.id} className="scope-check-item">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        setSelectedBranches((prev) =>
                          isChecked ? prev.filter((id) => id !== b.id) : [...prev, b.id]
                        );
                      }}
                    />
                    <div>
                      <b>{b.name}</b>
                      <small>{b.address}</small>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="modal-actions" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="secondary"
                onClick={() => setScopeDrawerOpen(false)}
              >
                Hủy
              </button>
              <button className="primary" type="submit">
                <Icon name="check" /> Lưu gán Scope
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

