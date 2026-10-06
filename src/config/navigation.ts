import { Page, UserProfilePermissions } from "../types";
import { IconName } from "../components/UI";

export interface NavItem {
  page: Page;
  label: string;
  icon: IconName;
  badge?: number;
  /** If a requiredPermission is specified, the user must have it to see this tab */
  requiredPermission?: keyof UserProfilePermissions["permissions"];
}

// 1. Nhóm CÔNG VIỆC CỦA TÔI (Dành cho mọi nhân viên)
export const coreNavigation: NavItem[] = [
  { page: "dashboard", label: "Tổng quan", icon: "home" },
  { page: "attendance", label: "Chấm công", icon: "clock" },
  { page: "overtime", label: "Tăng ca (OT)", icon: "briefcase" },
  { page: "wfh", label: "Làm việc từ xa", icon: "laptop" },
  { page: "leave", label: "Nghỉ phép", icon: "calendar" },
  { page: "expense", label: "Chi phí", icon: "receipt" },
  { page: "payslip", label: "Phiếu lương", icon: "wallet" },
];

// Nhóm HỒ SƠ CÁ NHÂN
export const profileNavigation: NavItem[] = [
  { page: "profile", label: "Hồ sơ của tôi", icon: "user" },
  { page: "contracts", label: "Hợp đồng", icon: "file" },
  { page: "devices", label: "Thiết bị", icon: "laptop" },
  { page: "resignation", label: "Thôi việc", icon: "logout" as IconName },
];

// Nhóm AI THÔNG MINH
export const aiNavigation: NavItem[] = [
  { page: "ai", label: "Giám sát WFH bằng AI", icon: "sparkles" },
];

// 2. Nhóm QUẢN LÝ & ĐIỀU HÀNH (Chỉ hiển thị khi có quyền tương ứng)
// Khi bạn cần thêm một Tab/Chức năng mới (VD: CRM, Kế toán), chỉ cần khai báo vào đây:
export const featureNavigation: NavItem[] = [
  { page: "team", label: "Lịch team", icon: "users", requiredPermission: "canApproveRequests" },
  { page: "leave_approval", label: "Phê duyệt nghỉ phép", icon: "calendar", requiredPermission: "canApproveRequests" },
  { page: "wfh_approval", label: "Phê duyệt Làm việc từ xa", icon: "laptop", requiredPermission: "canApproveRequests" },
  { page: "approvals", label: "Trung tâm phê duyệt", icon: "check", badge: 8, requiredPermission: "canApproveRequests" },
  { page: "live_attendance", label: "Giám sát chấm công Live", icon: "clock", requiredPermission: "canMonitorAttendanceLive" },
  { page: "employees", label: "Hồ sơ nhân sự", icon: "users", requiredPermission: "canManageEmployees" },
  { page: "recruitment", label: "Tuyển dụng Kanban", icon: "briefcase", requiredPermission: "canManageRecruitment" },
  { page: "payroll", label: "Đồng bộ bảng lương", icon: "wallet", requiredPermission: "canManagePayroll" },
  { page: "analytics", label: "Phân tích nhân sự", icon: "chart" as IconName, requiredPermission: "canViewAnalytics" }, // Fallback icon name check
  { page: "policies", label: "Cấu hình chính sách", icon: "shield", requiredPermission: "canManagePolicies" },
  { page: "admin", label: "Quản trị hệ thống & RBAC", icon: "settings", requiredPermission: "canManageAdmin" },
];

/**
 * Hàm hỗ trợ lấy toàn bộ menu động dựa trên User Profile
 */
export const getDynamicNavigation = (perms: UserProfilePermissions["permissions"]): NavItem[] => {
  return featureNavigation.filter(
    (item) => !item.requiredPermission || perms[item.requiredPermission]
  );
};
