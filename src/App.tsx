import { useState } from "react";
import logo from "./imports/oHRiise_icon.png";
import { Icon, IconName, Status } from "./components/UI";
import { UserProfilePermissions, DYNAMIC_PROFILES, Page } from "./types";
import { AdminTab } from "./admin/types";
import { Sidebar } from "./components/Layout/Sidebar";
import { Header } from "./components/Layout/Header";
import { AppShell } from "@mantine/core";

// Extracted Page Components
import PolicyPage from "./pages/PolicyPage";
import AdminConsole from "./features/admin/AdminConsole";
import AiAssistantDrawer from "./components/AiAssistantDrawer";

import DynamicDashboard from "./features/dashboard/DynamicDashboard";
import AttendancePage from "./pages/AttendancePage";
import OvertimePage from "./pages/OvertimePage";
import WfhPage from "./pages/WfhPage";
import LeavePage from "./pages/LeavePage";
import ExpensePage from "./pages/ExpensePage";
import PayslipPage from "./pages/PayslipPage";
import TeamCalendarPage from "./pages/TeamCalendarPage";
import LeaveApprovalPage from "./pages/LeaveApprovalPage";
import WfhApprovalPage from "./pages/WfhApprovalPage";
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
import HRAttendanceMonitor from "./components/HRAttendanceMonitor";

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
];

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
  const [adminTab, setAdminTab] = useState<AdminTab>("dash");
  const [checkedIn, setCheckedIn] = useState(false);
  const [request, setRequest] = useState<"wfh" | "leave" | "expense" | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const currentProfile = DYNAMIC_PROFILES[profileKey] || DYNAMIC_PROFILES.emp_standard;

  const handleProfileSwitch = (pk: string) => {
    setProfileKey(pk);
    if (pk === "system_admin") {
      setPage("admin");
    }
  };

  if (!authenticated) {
    return (
      <LoginPage
        onLogin={(pk) => {
          setProfileKey(pk);
          if (pk === "system_admin") {
            setPage("admin");
          }
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
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 256,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileMenu }
      }}
      bg="gray.0"
    >
      <AppShell.Header>
        <Header
          profileKey={profileKey}
          setProfileKey={handleProfileSwitch}
          profiles={DYNAMIC_PROFILES}
          onMenu={() => setMobileMenu((m) => !m)}
          onNotifications={() => setPage("notifications")}
          onLogout={() => setAuthenticated(false)}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar
          page={page}
          setPage={handleMobileNav}
          currentProfile={currentProfile}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        {page === "dashboard" && (
          <DynamicDashboard
            personName={currentProfile.name.split(" ").slice(-2).join(" ")}
            checkedIn={checkedIn}
            onCheck={() => setCheckedIn(!checkedIn)}
            openRequest={(t) => setRequest(t)}
            navigate={setPage}
            currentProfile={currentProfile}
          />
        )}

        {page === "attendance" && <AttendancePage />}
        {page === "overtime" && <OvertimePage />}
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
        {page === "leave_approval" && <LeaveApprovalPage />}
        {page === "wfh_approval" && <WfhApprovalPage />}

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
        {page === "live_attendance" && (
          currentProfile.permissions.canMonitorAttendanceLive ? (
            <HRAttendanceMonitor />
          ) : (
            <div className="panel" style={{ textAlign: "center", padding: "40px" }}>
              <h2 style={{ color: "#e11d48", marginBottom: "12px" }}>Không có quyền truy cập</h2>
              <p style={{ color: "var(--text-sub)" }}>
                Tính năng Giám sát Chấm công Realtime chỉ dành riêng cho vai trò Quản trị Nhân sự (HR).
              </p>
            </div>
          )
        )}
        {page === "employees" && <EmployeeManagementPage />}
        {page === "recruitment" && <RecruitmentPage />}
        {page === "payroll" && <PayrollPage />}
        {page === "analytics" && <AnalyticsPage />}
        {page === "policies" && <PolicyPage />}
        {page === "admin" && (
          <AdminConsole
            activeAdminTab={adminTab}
            onTabChange={setAdminTab}
            hideSubNav={currentProfile.id === "system_admin"}
          />
        )}
      </AppShell.Main>

      {request && <RequestModal type={request} close={() => setRequest(null)} />}
      <AiAssistantDrawer />
    </AppShell>
  );
}
