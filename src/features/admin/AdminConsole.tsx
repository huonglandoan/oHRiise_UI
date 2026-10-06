import React, { useState } from "react";
import { AppShell, Navbar, NavLink, Group, Text, ThemeIcon, Avatar, Header, Burger, ScrollArea, Box } from "@mantine/core";
import { Icon, IconName } from "../../components/UI";
import logo from "../../imports/oHRiise_icon.png";
import { AdminTab } from "./types";

import { DashboardTab } from "./tabs/monitoring/DashboardTab";
import { BranchesTab } from "./tabs/organization/BranchesTab";
import { DepartmentsTab } from "./tabs/organization/DepartmentsTab";
import { UsersTab } from "./tabs/organization/UsersTab";
import { PermissionsTab } from "./tabs/security/PermissionsTab";
import { PermissionTemplatesTab } from "./tabs/security/PermissionTemplatesTab";
import { DelegationsTab } from "./tabs/security/DelegationsTab";
import { DualApprovalsTab } from "./tabs/security/DualApprovalsTab";
import { NotificationsTab } from "./tabs/system/NotificationsTab";
import { MasterDataTab } from "./tabs/system/MasterDataTab";
import { EmailPolicyTab } from "./tabs/system/EmailPolicyTab";
import { SystemConfigTab } from "./tabs/system/SystemConfigTab";
import { AuditLogsTab } from "./tabs/monitoring/AuditLogsTab";
import { AiSystemTab } from "./tabs/ai/AiSystemTab";
import { IconArrowLeft } from "@tabler/icons-react";
import { Paper, Title, TextInput, Select, Grid, Button as MantineButton, Flex } from "@mantine/core";
import {
  CompanySettingsTab,
  InvoiceSettingsTab,
  SalarySettingsTab,
  NotificationsSettingsTab,
  ChangePasswordTab,
  LeaveTypeTab,
  ApprovalSettingsTab,
  EmailSettingsTab,
  RolesPermissionsTab,
  ThemeSettingsTab,
  LocalizationTab,
  CronSettingsTab,
  ToxBoxSettingsTab,
} from "./tabs/settings/SettingsTabs";

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
  NAV_ITEMS
} from "./data";

const SETTINGS_NAV_ITEMS = [
  { id: "Company Settings", label: "Cấu hình công ty", icon: "settings" },
  { id: "Localization", label: "Định vị", icon: "settings" },
  { id: "Theme Settings", label: "Cấu hình giao diện", icon: "settings" },
  { id: "Roles & Permissions", label: "Vai trò & Quyền", icon: "settings" },
  { id: "Email Settings", label: "Cấu hình email", icon: "settings" },
  { id: "Performance Settings", label: "Cấu hình hiệu suất", icon: "settings" },
  { id: "Approval Settings", label: "Phê duyệt cấu hình", icon: "settings" },
  { id: "Invoice Settings", label: "Cấu hình hóa đơn", icon: "settings" },
  { id: "Salary Settings", label: "Cấu hình Lương", icon: "settings" },
  { id: "Notifications", label: "Thông báo", icon: "settings" },
  { id: "Change Password", label: "Đổi mật khẩu", icon: "settings" },
  { id: "Leave Type", label: "Kiểu nghỉ phép", icon: "settings" },
  { id: "ToxBox Settings", label: "Cấu hình ToxBox", icon: "settings" },
  { id: "Cron Settings", label: "Cấu hình Cron", icon: "settings" },
];

export default function AdminConsole({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<AdminTab | string>("dash");
  const [mode, setMode] = useState<"main" | "settings">("main");
  const [opened, setOpened] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // States
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [depts, setDepts] = useState(INITIAL_DEPTS);
  const [users, setUsers] = useState(generateInitialUsers);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [offboardingQueue, setOffboardingQueue] = useState(INITIAL_OFFBOARDING_QUEUE);
  const [delegations, setDelegations] = useState(INITIAL_DELEGATIONS);
  const [approvalRules, setApprovalRules] = useState(INITIAL_APPROVAL_RULES);
  const [pendingDualApprovals, setPendingDualApprovals] = useState(INITIAL_PENDING_DUAL_APPROVALS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [masterData, setMasterData] = useState(INITIAL_MASTER_DATA);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  const [switches, setSwitches] = useState<Record<string, boolean>>({
    q1: true, q2: true, ai1: true, ai2: true, blur: true, ssl: true, smtpTls: true, fcm: true, d1: true, d2: true, d3: false, lh: true,
  });

  const toggleSwitch = (key: string) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast("Đã cập nhật cấu hình");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Modals state
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalWide, setModalWide] = useState(false);

  const openModal = (content: React.ReactNode, wide = false) => {
    setModalWide(wide);
    setModalContent(content);
  };
  const closeModal = () => setModalContent(null);

  const triggerAuditAction = (actionTitle: string, callback?: () => void) => {
    let reasonText = "";
    openModal(
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Xác nhận thao tác quản trị</h3>
        <p className="text-sm text-slate-500">Thao tác: <b className="text-slate-800">{actionTitle}</b></p>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Lý do thay đổi</label>
          <input
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            onChange={(e) => (reasonText = e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <button className="px-4 py-2 bg-slate-100 rounded-lg" onClick={closeModal}>Hủy</button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              if (reasonText.trim().length < 4) return showToast("Nhập lý do tối thiểu 4 ký tự");
              setLogs((prev) => [{ time: "Vừa xong", user: "Admin", action: `${actionTitle}: ${reasonText.trim()}`, type: "w" }, ...prev]);
              closeModal();
              showToast("Đã lưu thao tác");
              if (callback) callback();
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    );
  };

  return (
    <AppShell
      padding="md"
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 60 }}
      bg="#f8fafc"
    >
      <AppShell.Header p="md">
        <Group justify="space-between" h="100%">
          <Group>
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="sm" size="sm" />
            <img src={logo} alt="Logo" width={32} />
            <Text fw={700} size="lg">oHRiise Admin</Text>
          </Group>
          <Group>
            <Avatar color="blue" radius="xl" onClick={onLogout} style={{ cursor: "pointer" }}>SA</Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <AppShell.Section grow component={ScrollArea}>
          {mode === "settings" && (
            <>
              <NavLink
                label="Quay lại"
                leftSection={<IconArrowLeft size={16} />}
                onClick={() => {
                  setMode("main");
                  setTab("dash");
                }}
                variant="subtle"
                color="gray"
                style={{ borderRadius: 8, marginBottom: 16, fontWeight: 600 }}
              />
              <Text size="sm" fw={700} c="dimmed" tt="uppercase" px="sm" mb="sm">Cấu hình</Text>
              {SETTINGS_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  active={tab === item.id}
                  label={item.label}
                  leftSection={<Icon name={item.icon as IconName} size={16} />}
                  onClick={() => setTab(item.id)}
                  variant="filled"
                  color="blue"
                  style={{ borderRadius: 8, marginBottom: 4 }}
                />
              ))}
            </>
          )}

          {mode === "main" && NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              active={tab === item.id}
              label={item.label}
              leftSection={<Icon name={item.icon as IconName} size={16} />}
              onClick={() => {
                if (item.id === "sy") {
                  setMode("settings");
                  setTab("Company Settings");
                } else {
                  setTab(item.id as AdminTab);
                }
              }}
              variant="filled"
              color="blue"
              style={{ borderRadius: 8, marginBottom: 4 }}
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p="md">
          {tab === "dash" && (
            <DashboardTab
              users={users} branches={branches} alerts={alerts}
              pendingDualApprovals={pendingDualApprovals}
              offboardingQueue={offboardingQueue}
              logs={logs} setTab={setTab}
            />
          )}
          {tab === "br" && (
            <BranchesTab branches={branches} setBranches={setBranches} openModal={openModal} closeModal={closeModal} showToast={showToast} />
          )}
          {tab === "org" && (
            <DepartmentsTab depts={depts} setDepts={setDepts} templates={templates} openModal={openModal} closeModal={closeModal} showToast={showToast} />
          )}
          {tab === "us" && (
            <UsersTab users={users} setUsers={setUsers} depts={depts} branches={branches} templates={templates} offboardingQueue={offboardingQueue} setOffboardingQueue={setOffboardingQueue} showToast={showToast} openModal={openModal} closeModal={closeModal} />
          )}
          {tab === "pm" && (
            <PermissionsTab users={users} setUsers={setUsers} templates={templates} openModal={openModal} closeModal={closeModal} showToast={showToast} checkSoDConflicts={() => []} />
          )}
          {tab === "tp" && (
            <PermissionTemplatesTab templates={templates} setTemplates={setTemplates} openModal={openModal} closeModal={closeModal} showToast={showToast} />
          )}
          {tab === "dg" && (
            <DelegationsTab delegations={delegations} setDelegations={setDelegations} approvalRules={approvalRules} setApprovalRules={setApprovalRules} openModal={openModal} closeModal={closeModal} showToast={showToast} />
          )}
          {tab === "rv" && (
            <DualApprovalsTab pendingDualApprovals={pendingDualApprovals} setPendingDualApprovals={setPendingDualApprovals} openModal={openModal} closeModal={closeModal} showToast={showToast} triggerAuditAction={triggerAuditAction} />
          )}
          {tab === "nt" && (
            <NotificationsTab notifications={notifications} setNotifications={setNotifications} showToast={showToast} />
          )}
          {tab === "st" && (
            <MasterDataTab masterData={masterData} setMasterData={setMasterData} openModal={openModal} closeModal={closeModal} showToast={showToast} />
          )}
          {tab === "em" && (
            <EmailPolicyTab showToast={showToast} triggerAuditAction={triggerAuditAction} />
          )}
          {mode === "settings" && tab === "Company Settings" && <CompanySettingsTab />}
          {mode === "settings" && tab === "Invoice Settings" && <InvoiceSettingsTab />}
          {mode === "settings" && tab === "Salary Settings" && <SalarySettingsTab />}
          {mode === "settings" && tab === "Notifications" && <NotificationsSettingsTab />}
          {mode === "settings" && tab === "Change Password" && <ChangePasswordTab />}
          {mode === "settings" && tab === "Leave Type" && <LeaveTypeTab />}
          {mode === "settings" && tab === "Approval Settings" && <ApprovalSettingsTab />}
          {mode === "settings" && tab === "Email Settings" && <EmailSettingsTab />}
          {mode === "settings" && tab === "Roles & Permissions" && <RolesPermissionsTab />}
          {mode === "settings" && tab === "Theme Settings" && <ThemeSettingsTab />}
          {mode === "settings" && tab === "Localization" && <LocalizationTab />}
          {mode === "settings" && tab === "Cron Settings" && <CronSettingsTab />}
          {mode === "settings" && tab === "ToxBox Settings" && <ToxBoxSettingsTab />}
          {mode === "settings" && 
            !["Company Settings", "Invoice Settings", "Salary Settings", "Notifications", "Change Password", "Leave Type", "Approval Settings", "Email Settings", "Roles & Permissions", "Theme Settings", "Localization", "Cron Settings", "ToxBox Settings"].includes(tab) && (
            <Box>
              <Title order={2} fw={600} mb="xl">{tab}</Title>
              <Text c="dimmed">Tính năng cho {tab} đang được phát triển.</Text>
            </Box>
          )}
          {tab === "lg" && (
            <AuditLogsTab logs={logs} sessions={sessions} setSessions={setSessions} showToast={showToast} />
          )}
          {tab === "ai" && (
            <AiSystemTab switches={switches} toggleSwitch={toggleSwitch} showToast={showToast} />
          )}
        </Box>

        {toastMsg && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl border-l-4 border-emerald-400 shadow-2xl">
            {toastMsg}
          </div>
        )}

        {modalContent && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-white rounded-2xl p-6 shadow-2xl w-full ${modalWide ? "max-w-3xl" : "max-w-md"}`}>
              {modalContent}
            </div>
          </div>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
