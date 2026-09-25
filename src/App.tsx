import { useState } from "react";
import logo from "./imports/oHRiise_icon.png";
import { Icon, IconName, Status } from "./components/UI";
import { UserProfilePermissions, DYNAMIC_PROFILES, Page } from "./types";

// Extracted Page Components
import EmployeeDashboard from "./EmployeeDashboard";
import LeadDashboard from "./LeadDashboard";
import HrDashboard from "./HrDashboard";
import PolicyPage from "./PolicyPage";
import AdminPage from "./AdminPage";
import AiAssistantDrawer from "./AiAssistantDrawer";

import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import WfhPage from "./pages/WfhPage";
import LeavePage from "./pages/LeavePage";
import ExpensePage from "./pages/ExpensePage";
import PayslipPage from "./pages/PayslipPage";
import TeamCalendarPage from "./pages/TeamCalendarPage";
import ProfilePage from "./pages/ProfilePage";
import ContractPage from "./pages/ContractPage";
import DevicesPage from "./pages/DevicesPage";
import ResignationPage from "./pages/ResignationPage";
import AIPage from "./pages/AIPage";
import ApprovalPage from "./pages/ApprovalPage";
import NotificationsPage from "./pages/NotificationsPage";
import EmployeeManagementPage from "./pages/EmployeeManagementPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import PayrollPage from "./pages/PayrollPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LoginPage from "./pages/LoginPage";

// Re-export for compatibility across pages
export { Icon, Status } from "./components/UI";
export type { IconName } from "./components/UI";
export type { UserProfilePermissions, Page } from "./types";
export { DYNAMIC_PROFILES } from "./types";

const coreNav: { page: Page; label: string; icon: IconName }[] = [
  { page: "dashboard", label: "Tổng quan", icon: "home" },
  { page: "attendance", label: "Chấm công", icon: "clock" },
  { page: "wfh", label: "Làm việc từ xa", icon: "laptop" },
  { page: "leave", label: "Nghỉ phép", icon: "calendar" },
  { page: "expense", label: "Chi phí", icon: "receipt" },
  { page: "payslip", label: "Phiếu lương", icon: "wallet" },
  { page: "team", label: "Lịch team", icon: "users" },
];

function Sidebar({
  page,
  setPage,
  currentProfile,
}: {
  page: Page;
  setPage: (p: Page) => void;
  currentProfile: UserProfilePermissions;
}) {
  const perms = currentProfile.permissions;

  // Build dynamic management nav items based on granted permissions
  const dynamicNav: { page: Page; label: string; icon: IconName; badge?: number }[] = [];

  if (perms.canApproveRequests) {
    dynamicNav.push({ page: "approvals", label: "Trung tâm phê duyệt", icon: "check", badge: 8 });
  }
  if (perms.canManageEmployees) {
    dynamicNav.push({ page: "employees", label: "Hồ sơ nhân sự", icon: "users" });
  }
  if (perms.canManageRecruitment) {
    dynamicNav.push({ page: "recruitment", label: "Tuyển dụng Kanban", icon: "briefcase" });
  }
  if (perms.canManagePayroll) {
    dynamicNav.push({ page: "payroll", label: "Đồng bộ bảng lương", icon: "wallet" });
  }
  if (perms.canViewAnalytics) {
    dynamicNav.push({ page: "analytics", label: "Phân tích nhân sự", icon: "chart" });
  }
  if (perms.canManagePolicies) {
    dynamicNav.push({ page: "policies", label: "Cấu hình chính sách", icon: "shield" });
  }
  if (perms.canManageAdmin) {
    dynamicNav.push({ page: "admin", label: "Quản trị hệ thống & RBAC", icon: "settings" });
  }

  // Filter out team calendar for regular employees (privacy rule: employee cannot view others' presence)
  const userCoreNav = coreNav.filter((item) => {
    if (item.page === "team" && !perms.canApproveRequests) {
      return false;
    }
    return true;
  });

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo-crop">
          <img src={logo} alt="oHRiise" />
        </div>
        <div>
          <b>oHRiise</b>
          <span>People rise together</span>
        </div>
      </div>
      <nav>
        <p className="nav-label">CÔNG VIỆC CỦA TÔI</p>
        {userCoreNav.map((item) => (
          <button
            key={item.page}
            className={page === item.page ? "active" : ""}
            onClick={() => setPage(item.page)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.page === "leave" && <em>2</em>}
          </button>
        ))}
        <p className="nav-label">HỒ SƠ CÁ NHÂN</p>
        <button
          className={page === "profile" ? "active" : ""}
          onClick={() => setPage("profile")}
        >
          <Icon name="user" />
          <span>Hồ sơ của tôi</span>
        </button>
        <button
          className={page === "contracts" ? "active" : ""}
          onClick={() => setPage("contracts")}
        >
          <Icon name="file" />
          <span>Hợp đồng</span>
        </button>
        <button
          className={page === "devices" ? "active" : ""}
          onClick={() => setPage("devices")}
        >
          <Icon name="laptop" />
          <span>Thiết bị được cấp</span>
        </button>
        <button
          className={page === "resignation" ? "active" : ""}
          onClick={() => setPage("resignation")}
        >
          <Icon name="logout" />
          <span>Thôi việc</span>
        </button>
        <p className="nav-label">AI THÔNG MINH</p>
        <button
          className={page === "ai" ? "active" : ""}
          onClick={() => setPage("ai")}
        >
          <Icon name="sparkles" />
          <span>AI WFH Monitoring</span>
        </button>

        {dynamicNav.length > 0 && (
          <p className="nav-label">TÍNH NĂNG QUẢN LÝ ĐƯỢC CẤP</p>
        )}
        {dynamicNav.map((item) => (
          <button
            key={item.page}
            className={page === item.page ? "active" : ""}
            onClick={() => setPage(item.page)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.badge && <em>{item.badge}</em>}
          </button>
        ))}
      </nav>
      <button className="profile-link" onClick={() => setPage("profile")}>
        <span className="avatar sm">{currentProfile.initials}</span>
        <div>
          <b>{currentProfile.name}</b>
          <small>{currentProfile.title}</small>
        </div>
        <Icon name="more" />
      </button>
    </aside>
  );
}

function Header({
  profileKey,
  setProfileKey,
  profiles,
  onMenu,
  onNotifications,
  onLogout,
}: {
  profileKey: string;
  setProfileKey: (pk: string) => void;
  profiles: Record<string, UserProfilePermissions>;
  onMenu: () => void;
  onNotifications: () => void;
  onLogout: () => void;
}) {
  const activeProfile = profiles[profileKey] || profiles.emp_standard;

  return (
    <header>
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Mở menu">
        <Icon name="menu" />
      </button>
      <div className="global-search">
        <Icon name="search" />
        <input placeholder="Tìm nhân viên, yêu cầu, tài liệu..." />
        <kbd>⌘ K</kbd>
      </div>
      <div className="header-actions">
        <div className="role-switch">
          <span>Tập quyền Động:</span>
          <select value={profileKey} onChange={(e) => setProfileKey(e.target.value)}>
            {Object.values(profiles).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.customRoleName})
              </option>
            ))}
          </select>
        </div>
        <button className="icon-btn has-badge" aria-label="Thông báo" onClick={onNotifications}>
          <Icon name="bell" />
          <i>3</i>
        </button>
        <span className="avatar">{activeProfile.initials}</span>
        <button className="icon-btn desktop-logout" aria-label="Đăng xuất" onClick={onLogout}>
          <Icon name="logout" />
        </button>
      </div>
    </header>
  );
}

function RequestModal({ type, close }: { type: "wfh" | "leave" | "expense"; close: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const meta =
    type === "wfh"
      ? ["Đăng ký làm việc từ xa", "laptop"]
      : type === "leave"
      ? ["Tạo đơn nghỉ phép", "calendar"]
      : ["Gửi bồi hoàn chi phí", "receipt"];

  if (submitted)
    return (
      <div className="modal-backdrop" onMouseDown={close}>
        <div className="modal success-modal" onMouseDown={(e) => e.stopPropagation()}>
          <div className="success-mark">
            <Icon name="check" size={30} />
          </div>
          <h2>Đã gửi yêu cầu</h2>
          <p>Yêu cầu của bạn đã được chuyển đến Trần Hoàng Nam. Chúng tôi sẽ thông báo khi có cập nhật.</p>
          <div className="flow">
            <span className="done">Bạn đã gửi</span>
            <i />
            <span>Team Lead duyệt</span>
            <i />
            <span>Hoàn tất</span>
          </div>
          <button className="primary wide" onClick={close}>
            Trở về tổng quan
          </button>
        </div>
      </div>
    );

  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <form
        className="modal"
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="modal-head">
          <div>
            <span className="qa-icon cyan">
              <Icon name={meta[1] as IconName} />
            </span>
            <div>
              <p>YÊU CẦU MỚI</p>
              <h2>{meta[0]}</h2>
            </div>
          </div>
          <button type="button" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <div className="policy-ok">
          <Icon name="shield" />
          <span>
            <b>Đủ điều kiện theo chính sách</b>Yêu cầu sẽ được gửi đến Trần Hoàng Nam · Team Lead
          </span>
        </div>
        <label>
          {type === "expense" ? "Loại chi phí" : "Ngày áp dụng"}
          <div className="field">
            <Icon name={type === "expense" ? "receipt" : "calendar"} />
            <input defaultValue={type === "expense" ? "Phần mềm / Công cụ làm việc" : "25/09/2026"} />
          </div>
        </label>
        <div className="form-row">
          <label>
            {type === "expense" ? "Số tiền" : "Thời gian"}
            <select defaultValue="a">
              <option value="a">{type === "expense" ? "1.850.000 ₫" : "Cả ngày"}</option>
              <option>Buổi sáng</option>
              <option>Buổi chiều</option>
            </select>
          </label>
          <label>
            {type === "expense" ? "Dự án / Team" : "Địa điểm"}
            <select>
              <option>{type === "expense" ? "Product Development" : "Nhà riêng · TP.HCM"}</option>
            </select>
          </label>
        </div>
        <label>
          Lý do / mô tả
          <textarea
            placeholder="Chia sẻ ngắn gọn để người duyệt có đủ ngữ cảnh..."
            defaultValue={type === "wfh" ? "Hoàn thiện prototype và chuẩn bị cho buổi usability testing." : ""}
          />
        </label>
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={close}>
            Hủy
          </button>
          <button className="primary" type="submit">
            Gửi yêu cầu <Icon name="arrow" />
          </button>
        </div>
      </form>
    </div>
  );
}

function MobileNav({
  page,
  setPage,
  onMore,
}: {
  page: Page;
  setPage: (p: Page) => void;
  onMore: () => void;
}) {
  return (
    <nav className="mobile-nav">
      {coreNav.slice(0, 4).map((n) => (
        <button
          className={page === n.page ? "active" : ""}
          onClick={() => setPage(n.page)}
          key={n.page}
        >
          <Icon name={n.icon} />
          <span>{n.label}</span>
        </button>
      ))}
      <button onClick={onMore}>
        <Icon name="more" />
        <span>Thêm</span>
      </button>
    </nav>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [profileKey, setProfileKey] = useState<string>("emp_standard");
  const [checkedIn, setCheckedIn] = useState(false);
  const [request, setRequest] = useState<"wfh" | "leave" | "expense" | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const currentProfile = DYNAMIC_PROFILES[profileKey] || DYNAMIC_PROFILES.emp_standard;

  if (!authenticated) {
    return (
      <LoginPage
        onLogin={(pk) => {
          setProfileKey(pk);
          setAuthenticated(true);
        }}
      />
    );
  }

  // Auto-close mobile menu when navigating
  const handleMobileNav = (p: Page) => {
    setPage(p);
    setMobileMenu(false);
  };

  return (
    <div className="app-shell">
      {/* Desktop sidebar — hidden on mobile via CSS */}
      <Sidebar page={page} setPage={setPage} currentProfile={currentProfile} />

      {/* Mobile sidebar overlay */}
      <div
        className={`mobile-drawer-overlay${mobileMenu ? " open" : ""}`}
        onClick={() => setMobileMenu(false)}
      >
        <aside
          className={`mobile-drawer-sidebar${mobileMenu ? " open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-drawer-head">
            <div className="brand">
              <div className="logo-crop">
                <img src={logo} alt="oHRiise" />
              </div>
              <div>
                <b>oHRiise</b>
                <span>People rise together</span>
              </div>
            </div>
            <button className="icon-btn" onClick={() => setMobileMenu(false)} aria-label="Đóng menu">
              <Icon name="close" />
            </button>
          </div>

          <div className="mobile-drawer-role">
            <span>Tập quyền Động:</span>
            <select value={profileKey} onChange={(e) => setProfileKey(e.target.value)}>
              {Object.values(DYNAMIC_PROFILES).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.customRoleName})
                </option>
              ))}
            </select>
          </div>

          <Sidebar page={page} setPage={handleMobileNav} currentProfile={currentProfile} />

          <div className="mobile-drawer-footer">
            <button
              className="primary"
              style={{ width: "100%" }}
              onClick={() => setAuthenticated(false)}
            >
              <Icon name="logout" /> Đăng xuất
            </button>
          </div>
        </aside>
      </div>

      <div className="main-content">
        <Header
          profileKey={profileKey}
          setProfileKey={setProfileKey}
          profiles={DYNAMIC_PROFILES}
          onMenu={() => setMobileMenu(true)}
          onNotifications={() => setPage("notifications")}
          onLogout={() => setAuthenticated(false)}
        />

        <main>
          {page === "dashboard" && (
            <DashboardPage
              personName={currentProfile.name.split(" ").slice(-2).join(" ")}
              checkedIn={checkedIn}
              onCheck={() => setCheckedIn(!checkedIn)}
              openRequest={(t) => setRequest(t)}
              navigate={setPage}
              currentProfile={currentProfile}
            />
          )}

          {page === "attendance" && <AttendancePage />}
          {page === "wfh" && <WfhPage open={() => setRequest("wfh")} />}
          {page === "leave" && <LeavePage open={() => setRequest("leave")} />}
          {page === "expense" && <ExpensePage open={() => setRequest("expense")} />}
          {page === "payslip" && <PayslipPage />}
          {page === "team" && (
            currentProfile.permissions.canApproveRequests ? (
              <TeamCalendarPage />
            ) : (
              <div className="panel" style={{ textAlign: "center", padding: "40px" }}>
                <h2 style={{ color: "#e11d48", marginBottom: "12px" }}>Không có quyền truy cập</h2>
                <p style={{ color: "var(--text-sub)" }}>
                  Trang theo dõi trạng thái / vị trí làm việc của nhân sự khác chỉ dành cho Quản lý / Ban giám đốc.
                </p>
              </div>
            )
          )}

          {page === "profile" && <ProfilePage />}
          {page === "contracts" && <ContractPage />}
          {page === "devices" && <DevicesPage />}
          {page === "resignation" && <ResignationPage />}

          {page === "notifications" && <NotificationsPage navigate={setPage} />}
          {page === "ai" && <AIPage />}

          {/* Dynamic Feature Authorized Pages */}
          {page === "approvals" && (
            <ApprovalPage role={currentProfile.permissions.canApproveRequests ? "lead" : "emp"} />
          )}
          {page === "employees" && <EmployeeManagementPage />}
          {page === "recruitment" && <RecruitmentPage />}
          {page === "payroll" && <PayrollPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "policies" && <PolicyPage />}
          {page === "admin" && <AdminPage />}
        </main>
      </div>

      <MobileNav page={page} setPage={setPage} onMore={() => setMobileMenu(true)} />
      {request && <RequestModal type={request} close={() => setRequest(null)} />}
      <AiAssistantDrawer />
    </div>
  );
}
