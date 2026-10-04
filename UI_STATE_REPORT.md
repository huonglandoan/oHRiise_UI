# Báo cáo hiện trạng giao diện oHRiise UI

## 1. Stack
- **Framework & Version**: React 19 (`^19.0.0`), Vite (`^8.0.5`)
- **Ngôn ngữ**: TypeScript (`^5.7.0`)
- **UI Library**: Không dùng UI framework bên thứ 3 (Tự dựng với SVG & Tailwind CSS)
- **Cách viết CSS**: Pha trộn 3 kiểu (Tailwind CSS v4 `@tailwindcss/vite`, Custom CSS file `index.css`/`domain.css`/`employee-domain.css`, Inline styles `style={{ ... }}`)
- **State management**: Local React State (`useState`, `useMemo`)
- **Router**: Không dùng thư viện router (Tự điều hướng qua state `useState<Page>` trong `App.tsx`)
- **Thư viện bảng / form / biểu đồ / ngày tháng**: Không dùng (Dùng HTML `<table>`, `<input>`, `<select>`, SVG tự vẽ, và `<input type="date">` gốc)

---

## 2. Cấu trúc thư mục UI
```
src/
├── components/ (6 files)
│   ├── UI.tsx
│   ├── HRAttendanceMonitor.tsx
│   ├── EmployeeDetailView.tsx
│   ├── DepartmentScopedIAM.tsx
│   ├── OrgTreeChartView.tsx
│   └── AttendanceApprovalCenter.tsx
├── pages/ (19 files)
│   ├── DashboardPage.tsx
│   ├── AttendancePage.tsx
│   ├── WfhPage.tsx
│   ├── LeavePage.tsx
│   ├── ExpensePage.tsx
│   ├── PayslipPage.tsx
│   ├── TeamCalendarPage.tsx
│   ├── ProfilePage.tsx
│   ├── ContractPage.tsx
│   ├── DevicesPage.tsx
│   ├── SchedulePage.tsx
│   ├── ResignationPage.tsx
│   ├── NotificationsPage.tsx
│   ├── AIPage.tsx
│   ├── ApprovalPage.tsx
│   ├── EmployeeManagementPage.tsx
│   ├── RecruitmentPage.tsx
│   ├── PayrollPage.tsx
│   ├── AnalyticsPage.tsx
│   └── LoginPage.tsx
├── App.tsx, AdminPage.tsx, HrDashboard.tsx, LeadDashboard.tsx, EmployeeDashboard.tsx, PolicyPage.tsx (6 layouts/screens)
└── index.css, domain.css, employee-domain.css (3 CSS files)
```

---

## 3. Danh sách trang

| Route (State `page`) | File | Module | Vai trò truy cập |
| :--- | :--- | :--- | :--- |
| `dashboard` | `pages/DashboardPage.tsx` | Tổng quan | Tất cả vai trò |
| `attendance` | `pages/AttendancePage.tsx` | Chấm công | Tất cả vai trò |
| `live_attendance` | `components/HRAttendanceMonitor.tsx` | Giám sát chấm công Live | HR (`canMonitorAttendanceLive`) |
| `wfh` | `pages/WfhPage.tsx` | Làm việc từ xa (WFH) | Tất cả vai trò |
| `leave` | `pages/LeavePage.tsx` | Nghỉ phép | Tất cả vai trò |
| `expense` | `pages/ExpensePage.tsx` | Quản lý chi phí | Tất cả vai trò |
| `payslip` | `pages/PayslipPage.tsx` | Phiếu lương cá nhân | Tất cả vai trò |
| `team` | `pages/TeamCalendarPage.tsx` | Lịch làm việc Team | Quản lý (`canApproveRequests`) |
| `profile` | `pages/ProfilePage.tsx` | Hồ sơ cá nhân | Tất cả vai trò |
| `contracts` | `pages/ContractPage.tsx` | Hợp đồng lao động | Tất cả vai trò |
| `devices` | `pages/DevicesPage.tsx` | Thiết bị cấp phát | Tất cả vai trò |
| `schedule` | `pages/SchedulePage.tsx` | Ca làm việc | Tất cả vai trò |
| `resignation` | `pages/ResignationPage.tsx` | Thôi việc / Offboarding | Tất cả vai trò |
| `notifications` | `pages/NotificationsPage.tsx` | Thông báo | Tất cả vai trò |
| `ai` | `pages/AIPage.tsx` | Giám sát AI WFH | Tất cả vai trò |
| `approvals` | `pages/ApprovalPage.tsx` | Trung tâm phê duyệt | Quản lý (`canApproveRequests`) |
| `employees` | `pages/EmployeeManagementPage.tsx` | Quản lý nhân sự | HR / Quản lý (`canManageEmployees`) |
| `recruitment` | `pages/RecruitmentPage.tsx` | Tuyển dụng Kanban | HR / TA (`canManageRecruitment`) |
| `payroll` | `pages/PayrollPage.tsx` | Đống bộ bảng lương | HR C&B (`canManagePayroll`) |
| `analytics` | `pages/AnalyticsPage.tsx` | Báo cáo phân tích | Quản lý / HR (`canViewAnalytics`) |
| `policies` | `PolicyPage.tsx` | Cấu hình chính sách | Admin / HR (`canManagePolicies`) |
| `admin` / `rbac` / `system` | `AdminPage.tsx` | Quản trị hệ thống & RBAC | System Admin (`canManageAdmin`) |
| `login` | `pages/LoginPage.tsx` | Đăng nhập hệ thống | Khách / Chưa đăng nhập |

---

## 4. Layout và phân quyền

- **Số lượng Layout**: 2 Layout chính
  - `AppShell` (Sidebar + Header + Main Area): Nằm trực tiếp trong `src/App.tsx`.
  - `LoginPage`: Nằm trong `src/pages/LoginPage.tsx`.
- **Định vị Sidebar & Menu**:
  - Được định nghĩa trong hàm `Sidebar()` thuộc file `src/App.tsx`.
  - Phân menu tự động theo danh sách cờ quyền (`currentProfile.permissions`).
- **Danh sách vai trò & Kiểm tra quyền**:
  - Định nghĩa tại `src/types.ts` trong object `DYNAMIC_PROFILES` với 5 Profile mẫu: `emp_standard` (Nhân viên), `emp_delegated_lead` (Nhân viên kiêm nhiệm), `lead_manager` (Trưởng phòng), `hr_ops` (HR Chi nhánh), `system_admin` (Admin hệ thống).
  - Kiểm tra quyền qua 9 cờ boolean (`canApproveRequests`, `canManageEmployees`, `canManageRecruitment`, `canManagePayroll`, `canViewAnalytics`, `canManagePolicies`, `canManageAdmin`, `canMonitorAttendanceLive`, `canManageAttendanceApproval`).

---

## 5. Component dùng chung hiện có

| Tên Component | File | Số nơi import | Ghi chú |
| :--- | :--- | :--- | :--- |
| `Icon`, `Status` | `src/components/UI.tsx` | 19 pages | Bộ Icon SVG và Status badge dùng chung |
| `ProgressRing` | `src/components/UI.tsx` | 1 page | Vòng tròn phần trăm (Dùng ở `RecruitmentPage`) |
| `HRAttendanceMonitor` | `src/components/HRAttendanceMonitor.tsx` | 2 nơi | Dùng ở `App.tsx` & `HrDashboard.tsx` |
| `EmployeeDetailView` | `src/components/EmployeeDetailView.tsx` | 1 nơi | Dùng ở `EmployeeManagementPage.tsx` |
| `DepartmentScopedIAM` | `src/components/DepartmentScopedIAM.tsx` | 1 nơi | Dùng ở `EmployeeManagementPage.tsx` |
| `OrgTreeChartView` | `src/components/OrgTreeChartView.tsx` | 1 nơi | Dùng ở `EmployeeManagementPage.tsx` |
| `AttendanceApprovalCenter` | `src/components/AttendanceApprovalCenter.tsx` | **0 nơi** | **Bị trùng lặp logic**: Tồn tại độc lập nhưng không được import, logic bị chép vào `HrDashboard.tsx` |

---

## 6. Audit mức độ không đồng bộ (có số liệu)

- **Mã màu hard-code**: 
  - Tổng số mã hex duy nhất: **833 mã**.
  - Top 10 mã màu xuất hiện nhiều nhất: `#1267e8` (115 lần), `#f8fafc` (109 lần), `#1e40af` (63 lần), `#dc2626` (62 lần), `#64748b` (45 lần), `#e2e8f0` (44 lần), `#f1f5f9` (42 lần), `#cbd5e1` (41 lần), `#eff6ff` (36 lần), `#e8f1ff` (35 lần).
- **Font-size**: Top kích thước dùng nhiều nhất: `13px` (235 lần), `14px` (169 lần), `12px` (146 lần), `15px` (135 lần), `11px` (110 lần), `16px` (102 lần).
- **Border-radius**: Top bán kính góc bo: `12px` (162 lần), `10px` (142 lần), `8px` (79 lần), `14px` (77 lần), `50%` (64 lần), `6px` (58 lần).
- **Shadow**: Dùng song song `shadow-sm`/`shadow-md` của Tailwind và 167 lần inline `boxShadow`.
- **Biến thể UI Component**:
  - **Button**: 8 kiểu viết (`.btn.p`, `.primary`, `bg-blue-600`, inline `background: #1267e8`).
  - **Table**: 6 kiểu bảng (`.tw table`, `.mx`, custom Tailwind table) rải rác ở 21 file.
  - **Modal**: 12 cách dựng modal bằng inline `fixed inset-0` hoặc `modal-backdrop` rải rác từng file.
  - **Badge**: 5 kiểu hiển thị (`.tag.ok`, `.chip`, `<Status />`, inline `span`).
- **Hiển thị trạng thái**: Trạng thái "Đã duyệt/Chờ duyệt/Từ chối" mỗi trang tự style màu sắc khác nhau (dùng `#16845d`, `#b97612`, `#dc2626` hoặc Tailwind `bg-emerald-100`).
- **Trang thiếu Empty / Loading / Error states**: `AttendancePage.tsx`, `PayrollPage.tsx`, `DevicesPage.tsx`, `SchedulePage.tsx`.
- **Trang có Header / Filter bar lệch kiểu**: `EmployeeManagementPage.tsx` (dùng header flex tùy chỉnh), `LeavePage.tsx` (dùng `tabs-inline`), `AdminPage.tsx` (dùng header riêng).

---

## 7. Ba trang tiêu biểu

### Trang 1: Danh sách - `src/pages/EmployeeManagementPage.tsx` (882 dòng)
- **Mô tả bố cục**: Header chứa ô tìm kiếm và dropdown bộ lọc phòng ban/chi nhánh. Thẻ thống kê tổng quan ở trên, phía dưới là bảng danh sách nhân sự có avatar, thông tin liên hệ, phòng ban và nút mở Drawer chi tiết.
- **Trích đoạn code**:
```tsx
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", flexWrap: "wrap", gap: "16px" }}>
  <div>
    <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Hồ sơ Nhân sự</h1>
    <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>Quản lý danh sách nhân viên & phân quyền dữ liệu</p>
  </div>
</div>
```

### Trang 2: Form / Đơn từ - `src/pages/LeavePage.tsx` (880 dòng)
- **Mô tả bố cục**: Phía trên là thẻ Gradient hiển thị quỹ phép năm. Bên trái là form đăng ký nghỉ phép với các trường chọn ngày và lý do. Bên phải là lịch nghỉ phép mini và danh sách lịch sử đơn đã nộp.
- **Trích đoạn code**:
```tsx
<div style={{ background: "white", borderRadius: "22px", padding: "18px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
  <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>TỔNG NGHỈ PHÉP NĂM 2026</span>
  <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: "4px 0" }}>12,0 ngày</h2>
  <small style={{ fontSize: "13px", color: "#10b981", fontWeight: 600 }}>Còn lại 8,5 ngày khả dụng</small>
</div>
```

### Trang 3: Dashboard - `src/HrDashboard.tsx` (1125 dòng)
- **Mô tả bố cục**: Dashboard quản trị HR tổng hợp. Gồm 3 tab chính: Realtime, History, Timesheet. Chứa các card KPI chấm công, bảng theo dõi nhân sự realtime, modal điều chỉnh công thủ công, và bộ công cụ chốt bảng lương chuyển MISA.
- **Trích đoạn code**:
```tsx
<div className="card kpi" style={{ borderLeft: "4px solid #1267e8" }}>
  <span>Tổng nhân sự theo dõi</span>
  <b>{employees.length}</b>
  <small style={{ color: "#1267e8" }}>Toàn công ty</small>
</div>
```

---

## 8. Những chỗ không được đụng
1. **Model Phân quyền & Profile**: `src/types.ts` (`UserProfilePermissions`, `DYNAMIC_PROFILES`, 9 cờ quyền boolean).
2. **Logic kiểm tra quyền Sidebar & Switcher Profile**: `src/App.tsx` (Hàm `Sidebar()`, `Header()`, state `profileKey`).
3. **Logic tính toán công & lương**: `src/HrDashboard.tsx` (`handleCalculateTimesheet`, `handleLockTimesheet`, `handleSyncMisa`, công thức tính `workDays`, `paidLeave`, `penaltyAmount`).
4. **Cấu trúc dữ liệu Mock**: `INIT_EMPLOYEES`, `PAST_HISTORY_LOGS`, `PERIODS` trong `src/HrDashboard.tsx` và `VISILY_EMPLOYEES` trong `EmployeeManagementPage.tsx`.

---

## 9. Top 10 vấn đề gây lộn xộn nhất

1. **Lạm dụng Inline Style tràn lan** (`src/pages/LeavePage.tsx`, `src/pages/EmployeeManagementPage.tsx`, `src/HrDashboard.tsx`): Hơn 800 mã màu hex và CSS inline trực tiếp trong JSX.
2. **Không có hệ thống Design Tokens trung tâm**: Font-size (`11px` đến `28px`) và border-radius (`6px` đến `22px`) được viết tự do không qua biến CSS hay Tailwind config.
3. **Trùng lặp & Trôi dạt Component Modal** (`src/App.tsx`, `src/HrDashboard.tsx`, `src/AdminPage.tsx`): Mỗi trang tự viết overlay modal riêng.
4. **File component rác không được sử dụng** (`src/components/AttendanceApprovalCenter.tsx`): Tồn tại 18KB code không nơi nào import.
5. **Pha trộn 3 hình thức viết CSS**: Dùng đồng thời Tailwind v4, CSS thuần trong 3 file css, và inline JSX style.
6. **Badge & Status không nhất quán**: Component `Status` trong `UI.tsx` bị bỏ qua ở nhiều trang để tự style tag màu tùy tiện.
7. **Không có Router tiêu chuẩn**: Điều hướng bằng `useState` trong `App.tsx` khiến ứng dụng không có URL route rõ ràng.
8. **Thiếu Loading & Empty state chuẩn hóa**: Không có Skeleton loader khi load dữ liệu hoặc placeholder khi danh sách trống.
9. **Form Controls tự do**: Các ô `<input>`, `<select>` không có component wrapper chung, dẫn đến font-size và padding lệch nhau giữa các trang.
10. **Tệp CSS quá lớn & chồng chéo**: `index.css`, `domain.css`, và `employee-domain.css` chứa nhiều selector ghi đè lẫn nhau.

---

## ❓ Câu hỏi cần làm rõ trước khi refactor UI:
1. Bạn muốn ưu tiên chuyển toàn bộ style về **Tailwind CSS v4** thuần hay định nghĩa hệ thống **CSS Variables / Design Tokens** chuẩn trong `index.css`?
2. Có cần giữ lại khả năng chuyển đổi vai trò (Profile Switcher ở Header) để test phân quyền không?
3. Bạn có muốn xóa bỏ hẳn component thừa `AttendanceApprovalCenter.tsx` và chuẩn hóa lại các Modal thành 1 Modal Component duy nhất không?
