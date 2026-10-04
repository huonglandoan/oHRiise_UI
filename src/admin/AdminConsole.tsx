import React, { useState } from "react";
import {
  AdminTab,
  BranchData,
  DeptData,
  UserAcc,
  AuditLogItem,
  AlertItem,
  PermissionTemplate,
  DelegationItem,
  ApprovalRuleItem,
  NotificationItem,
  SessionItem,
} from "./types";
import {
  INITIAL_BRANCHES,
  INITIAL_DEPTS,
  generateInitialUsers,
  INITIAL_LOGS,
  INITIAL_ALERTS,
  INITIAL_TEMPLATES,
  INITIAL_OFFBOARDING_QUEUE,
  INITIAL_DELEGATIONS,
  INITIAL_APPROVAL_RULES,
  INITIAL_PENDING_DUAL_APPROVALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MASTER_DATA,
  INITIAL_SESSIONS,
  MODULE_NAMES,
  NAV_ITEMS,
} from "./data";

import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";

import { DashboardTab } from "./tabs/DashboardTab";
import { BranchesTab } from "./tabs/BranchesTab";
import { DepartmentsTab } from "./tabs/DepartmentsTab";
import { UsersTab } from "./tabs/UsersTab";
import { PermissionsTab } from "./tabs/PermissionsTab";
import { PermissionTemplatesTab } from "./tabs/PermissionTemplatesTab";
import { DelegationsTab } from "./tabs/DelegationsTab";
import { DualApprovalsTab } from "./tabs/DualApprovalsTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { MasterDataTab } from "./tabs/MasterDataTab";
import { EmailPolicyTab } from "./tabs/EmailPolicyTab";
import { SystemConfigTab } from "./tabs/SystemConfigTab";
import { AuditLogsTab } from "./tabs/AuditLogsTab";
import { AiSystemTab } from "./tabs/AiSystemTab";

export interface AdminConsoleProps {
  activeAdminTab?: AdminTab;
  onTabChange?: (tab: AdminTab) => void;
  hideSubNav?: boolean;
}

export default function AdminConsole({
  activeAdminTab,
  onTabChange,
  hideSubNav = false,
}: AdminConsoleProps = {}) {
  const [internalTab, setInternalTab] = useState<AdminTab>("dash");
  const tab = activeAdminTab !== undefined ? activeAdminTab : internalTab;
  const setTab = onTabChange || setInternalTab;

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Global settings switches
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    q1: true,
    q2: true,
    ai1: true,
    ai2: true,
    blur: true,
    ssl: true,
    smtpTls: true,
    fcm: true,
    d1: true,
    d2: true,
    d3: false,
    lh: true,
  });

  const toggleSwitch = (key: string) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast("Đã cập nhật cấu hình");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // State Collections
  const [branches, setBranches] = useState<BranchData[]>(INITIAL_BRANCHES);
  const [depts, setDepts] = useState<DeptData[]>(INITIAL_DEPTS);
  const [users, setUsers] = useState<UserAcc[]>(generateInitialUsers);
  const [logs, setLogs] = useState<AuditLogItem[]>(INITIAL_LOGS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [templates, setTemplates] = useState<PermissionTemplate[]>(INITIAL_TEMPLATES);
  const [offboardingQueue, setOffboardingQueue] = useState<[string, string, string][]>(INITIAL_OFFBOARDING_QUEUE);
  const [delegations, setDelegations] = useState<DelegationItem[]>(INITIAL_DELEGATIONS);
  const [approvalRules, setApprovalRules] = useState<ApprovalRuleItem[]>(INITIAL_APPROVAL_RULES);
  const [pendingDualApprovals, setPendingDualApprovals] = useState<[string, string, number][]>(INITIAL_PENDING_DUAL_APPROVALS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [masterData, setMasterData] = useState<string[][][]>(INITIAL_MASTER_DATA);
  const [sessions, setSessions] = useState<SessionItem[]>(INITIAL_SESSIONS);

  // Modals state
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalWide, setModalWide] = useState(false);

  const openModal = (content: React.ReactNode, wide = false) => {
    setModalWide(wide);
    setModalContent(content);
  };
  const closeModal = () => setModalContent(null);

  // SoD conflict calculation helper
  const checkSoDConflicts = (matrix: number[][]) => {
    const warnings: string[] = [];
    MODULE_NAMES.forEach(([mName], i) => {
      if (matrix[i][1] && matrix[i][3]) {
        warnings.push(`${mName}: cùng quyền Tạo và Duyệt, nên tách người tạo và người duyệt`);
      }
    });
    if (matrix[7][4] && !matrix[5][0]) {
      warnings.push("Xuất MISA cần quyền Xem Chấm công");
    }
    if (matrix[12][4] && !matrix[5][4]) {
      warnings.push("Xuất dải lương mà không có quyền Xuất chấm công, cần kiểm tra lại");
    }
    return warnings;
  };

  // Audit log reason helper
  const triggerAuditAction = (actionTitle: string, callback?: () => void) => {
    let reasonText = "";
    openModal(
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Xác nhận thao tác quản trị</h3>
        <p className="text-sm text-slate-500">
          Thao tác: <b className="text-slate-800">{actionTitle}</b>
        </p>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Lý do thay đổi (bắt buộc, ghi vết audit log)
          </label>
          <input
            id="audit-reason-input"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ví dụ: Cập nhật quyền theo quyết định giao việc quý 4..."
            onChange={(e) => (reasonText = e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <button
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium rounded-lg transition"
            onClick={closeModal}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
            onClick={() => {
              if (reasonText.trim().length < 4) {
                showToast("Nhập lý do tối thiểu 4 ký tự");
                return;
              }
              setLogs((prev) => [
                { time: "Vừa xong", user: "Admin", action: `${actionTitle}: ${reasonText.trim()}`, type: "w" },
                ...prev,
              ]);
              closeModal();
              showToast("Đã lưu thao tác và ghi nhận Audit Log");
              if (callback) callback();
            }}
          >
            Xác nhận & Lưu
          </button>
        </div>
      </div>
    );
  };

  const activeNavItem = NAV_ITEMS.find((n) => n.id === tab) || NAV_ITEMS[0];

  const getBadgeCount = (key?: string) => {
    if (key === "users") return users.length;
    if (key === "alerts") return alerts.length;
    if (key === "notif") return notifications.filter((n) => !n.processed).length;
    if (key === "dlp") return 3;
    if (key === "duals") return pendingDualApprovals.filter((p) => !p[2]).length;
    return 0;
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#10213a] font-sans p-4 md:p-6">
      {/* Top Header */}
      <AdminHeader activeNavItem={activeNavItem} />



      {/* Main Active Tab Content View */}
      <div className="w-full">
        {tab === "dash" && (
          <DashboardTab
            users={users}
            branches={branches}
            alerts={alerts}
            pendingDualApprovals={pendingDualApprovals}
            offboardingQueue={offboardingQueue}
            logs={logs}
            setTab={setTab}
          />
        )}
        {tab === "br" && (
          <BranchesTab
            branches={branches}
            setBranches={setBranches}
            openModal={openModal}
            closeModal={closeModal}
            showToast={showToast}
          />
        )}
        {tab === "org" && (
          <DepartmentsTab
            depts={depts}
            setDepts={setDepts}
            templates={templates}
            openModal={openModal}
            closeModal={closeModal}
            showToast={showToast}
          />
        )}
        {tab === "us" && (
          <UsersTab
            users={users}
            setUsers={setUsers}
            depts={depts}
            branches={branches}
            templates={templates}
            offboardingQueue={offboardingQueue}
            setOffboardingQueue={setOffboardingQueue}
            showToast={showToast}
            openModal={openModal}
            closeModal={closeModal}
          />
        )}
        {tab === "pm" && (
          <PermissionsTab
            users={users}
            setUsers={setUsers}
            templates={templates}
            showToast={showToast}
            triggerAuditAction={triggerAuditAction}
            checkSoDConflicts={checkSoDConflicts}
          />
        )}
        {tab === "tp" && (
          <PermissionTemplatesTab
            users={users}
            templates={templates}
            setTemplates={setTemplates}
            openModal={openModal}
            closeModal={closeModal}
            showToast={showToast}
            triggerAuditAction={triggerAuditAction}
          />
        )}
        {tab === "dg" && (
          <DelegationsTab
            delegations={delegations}
            setDelegations={setDelegations}
            approvalRules={approvalRules}
            setApprovalRules={setApprovalRules}
            users={users}
            showToast={showToast}
            openModal={openModal}
            closeModal={closeModal}
          />
        )}
        {tab === "rv" && (
          <DualApprovalsTab
            users={users}
            templates={templates}
            pendingDualApprovals={pendingDualApprovals}
            setPendingDualApprovals={setPendingDualApprovals}
            showToast={showToast}
          />
        )}
        {tab === "nt" && (
          <NotificationsTab
            notifications={notifications}
            setNotifications={setNotifications}
            switches={switches}
            toggleSwitch={toggleSwitch}
            openModal={openModal}
            closeModal={closeModal}
            showToast={showToast}
          />
        )}
        {tab === "st" && (
          <MasterDataTab
            masterData={masterData}
            setMasterData={setMasterData}
            openModal={openModal}
            closeModal={closeModal}
            showToast={showToast}
          />
        )}
        {tab === "em" && (
          <EmailPolicyTab
            showToast={showToast}
            triggerAuditAction={triggerAuditAction}
          />
        )}
        {tab === "sy" && (
          <SystemConfigTab
            switches={switches}
            toggleSwitch={toggleSwitch}
            showToast={showToast}
          />
        )}
        {tab === "lg" && (
          <AuditLogsTab
            logs={logs}
            sessions={sessions}
            setSessions={setSessions}
            showToast={showToast}
          />
        )}
        {tab === "ai" && (
          <AiSystemTab
            switches={switches}
            toggleSwitch={toggleSwitch}
            showToast={showToast}
          />
        )}
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl border-l-4 border-emerald-400 shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="text-emerald-400">✓</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Modal Dialog Container */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div
            className={`bg-white text-slate-900 border border-slate-200 rounded-2xl p-6 shadow-2xl w-full max-h-[90vh] overflow-y-auto ${
              modalWide ? "max-w-3xl" : "max-w-md"
            }`}
          >
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
}
