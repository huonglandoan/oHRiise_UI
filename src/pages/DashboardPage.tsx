import React, { useState } from "react";
import { Icon, Status } from "../components/UI";
import { Page, UserProfilePermissions } from "../types";
import EmployeeDashboard from "../EmployeeDashboard";
import LeadDashboard from "../LeadDashboard";
import HrDashboard from "../HrDashboard";

export default function DashboardPage({
  personName,
  checkedIn,
  onCheck,
  openRequest,
  navigate,
  currentProfile,
}: {
  personName: string;
  checkedIn: boolean;
  onCheck: () => void;
  openRequest: (t: "wfh" | "leave" | "expense") => void;
  navigate: (p: Page) => void;
  currentProfile?: UserProfilePermissions;
}) {
  const profileId = currentProfile?.id || "emp_standard";

  // 1. LEAD MANAGER ROLE -> Render LeadDashboard Directly
  if (profileId === "lead_manager") {
    return <LeadDashboard />;
  }

  // 2. HR OPERATIONS ROLE -> Render HrDashboard Directly
  if (profileId === "hr_ops") {
    return <HrDashboard />;
  }

  // 3. SYSTEM ADMIN ROLE -> Render System Administration & RBAC Overview
  if (profileId === "system_admin") {
    return (
      <div className="page" style={{ gap: "24px" }}>
        {/* Welcome Header */}
        <section
          className="welcome"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "white",
            borderRadius: "28px",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div>
            <p style={{ fontSize: "13px", fontWeight: 800, color: "#94a3b8", letterSpacing: "1px" }}>
              SYSTEM ADMIN & GOVERNANCE DASHBOARD
            </p>
            <h1 style={{ fontSize: "32px", fontWeight: 900, margin: "6px 0", color: "white" }}>
              Quản trị Hệ thống & Phân quyền RBAC
            </h1>
            <span style={{ fontSize: "16px", color: "#cbd5e1", fontWeight: 500 }}>
              Chào {currentProfile?.name}. Giám sát cụm máy chủ, phiên làm việc, phân quyền RBAC và chứng thư bảo mật.
            </span>
          </div>
        </section>

        {/* System Health Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px 24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="shield" size={24} />
            </div>
            <div>
              <b style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", display: "block", lineHeight: 1.1 }}>99.98%</b>
              <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700 }}>Uptime Cụm Máy Chủ HCM-01</span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px 24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#eaf8f1", color: "#16845d", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="users" size={24} />
            </div>
            <div>
              <b style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", display: "block", lineHeight: 1.1 }}>145 / 145</b>
              <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700 }}>Tài khoản Nhân sự Đồng bộ SSO</span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px 24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#fff5df", color: "#a76a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="settings" size={24} />
            </div>
            <div>
              <b style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", display: "block", lineHeight: 1.1 }}>5 Tập quyền</b>
              <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700 }}>Cấu hình RBAC Động</span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px 24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#f1f5f9", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="clock" size={24} />
            </div>
            <div>
              <b style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", display: "block", lineHeight: 1.1 }}>12ms</b>
              <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700 }}>Độ trễ API Máy chấm công</span>
            </div>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <section className="panel" style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid var(--border-soft)" }}>
          <div className="panel-title" style={{ marginBottom: "16px" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>LỆNH THAO TÁC HỆ THỐNG</p>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)" }}>Công cụ Quản trị cho Admin</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <button
              onClick={() => navigate("admin")}
              style={{
                padding: "18px 20px",
                borderRadius: "16px",
                border: "1px solid var(--border-soft)",
                background: "#f8fafc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#dbeafe", color: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="settings" size={20} />
              </div>
              <div>
                <b style={{ fontSize: "15px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>Quản trị Phân quyền RBAC</b>
                <small style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 600 }}>Cấp role & permission</small>
              </div>
            </button>

            <button
              onClick={() => navigate("policies")}
              style={{
                padding: "18px 20px",
                borderRadius: "16px",
                border: "1px solid var(--border-soft)",
                background: "#f8fafc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="shield" size={20} />
              </div>
              <div>
                <b style={{ fontSize: "15px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>Cấu hình Chính sách Công ty</b>
                <small style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 600 }}>Chính sách WFH & Nghỉ phép</small>
              </div>
            </button>

            <button
              onClick={() => navigate("approvals")}
              style={{
                padding: "18px 20px",
                borderRadius: "16px",
                border: "1px solid var(--border-soft)",
                background: "#f8fafc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#dcfce7", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="clock" size={20} />
              </div>
              <div>
                <b style={{ fontSize: "15px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>Tra cứu Audit Log Hệ thống</b>
                <small style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 600 }}>Nhật ký phê duyệt toàn công ty</small>
              </div>
            </button>

            <button
              onClick={() => navigate("employees")}
              style={{
                padding: "18px 20px",
                borderRadius: "16px",
                border: "1px solid var(--border-soft)",
                background: "#f8fafc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#f3e8ff", color: "#6b21a8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="users" size={20} />
              </div>
              <div>
                <b style={{ fontSize: "15px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>Đồng bộ Máy chấm công Kiosk</b>
                <small style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: 600 }}>Chi nhánh HCM, HN, ĐN</small>
              </div>
            </button>
          </div>
        </section>

        {/* Security Audit Table */}
        <section className="panel" style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid var(--border-soft)" }}>
          <div className="panel-title" style={{ marginBottom: "16px" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>NHẬT KÝ BẢO MẬT & PHÂN QUYỀN</p>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)" }}>System Security & Audit Stream</h2>
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)" }}>
                <th style={{ padding: "12px 16px" }}>THỜI GIAN</th>
                <th style={{ padding: "12px 16px" }}>NGƯỜI THỰC HIỆN</th>
                <th style={{ padding: "12px 16px" }}>HÀNH ĐỘNG HỆ THỐNG</th>
                <th style={{ padding: "12px 16px" }}>ĐỊA CHỈ IP / THIẾT BỊ</th>
                <th style={{ padding: "12px 16px" }}>TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-soft)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--text-sub)" }}>25/09/2026 20:15</td>
                <td style={{ padding: "14px 16px", fontWeight: 800 }}>Vũ Thanh Tùng (Admin)</td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>Cập nhật phân quyền RBAC cho role 'emp_delegated_lead'</td>
                <td style={{ padding: "14px 16px", color: "var(--text-sub)" }}>14.225.26.11 · MacOS Chrome</td>
                <td style={{ padding: "14px 16px" }}><Status tone="green">Thành công</Status></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-soft)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--text-sub)" }}>25/09/2026 19:40</td>
                <td style={{ padding: "14px 16px", fontWeight: 800 }}>Hệ thống Sync Auto</td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>Đồng bộ dữ liệu máy chấm công Kiosk Chi nhánh Keangnam HN</td>
                <td style={{ padding: "14px 16px", color: "var(--text-sub)" }}>10.0.4.12 · API Gateway</td>
                <td style={{ padding: "14px 16px" }}><Status tone="green">Đã đồng bộ</Status></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-soft)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--text-sub)" }}>25/09/2026 18:00</td>
                <td style={{ padding: "14px 16px", fontWeight: 800 }}>Lê Khánh Linh (HR Ops)</td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>Khóa bảng lương kỳ Tháng 8/2026 (Locked Period)</td>
                <td style={{ padding: "14px 16px", color: "var(--text-sub)" }}>118.69.182.4 · Web Client</td>
                <td style={{ padding: "14px 16px" }}><Status tone="blue">Đã khóa</Status></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }

  // 4. DELEGATED LEAD ROLE -> Render Employee Dashboard with Delegated Approvals Top Banner
  if (profileId === "emp_delegated_lead") {
    return (
      <div className="page" style={{ gap: "24px" }}>
        {/* Delegated Role Banner */}
        <section
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            color: "white",
            borderRadius: "24px",
            padding: "24px 28px",
            boxShadow: "0 8px 24px rgba(30, 58, 138, 0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span style={{ fontSize: "12px", fontWeight: 900, background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "10px", letterSpacing: "0.5px" }}>
              QUYỀN ĐƯỢC ỦY QUYỀN (DELEGATED LEAD)
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 900, margin: "6px 0", color: "white" }}>
              Chào {personName}, Bạn có 3 yêu cầu Team chờ duyệt!
            </h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#dbeafe" }}>
              Bạn vừa là Senior Developer vừa được gán quyền duyệt đơn & xem phân tích của Dev Team Direct.
            </p>
          </div>
          <button
            className="primary"
            onClick={() => navigate("approvals")}
            style={{ padding: "12px 20px", fontSize: "14px", fontWeight: 900, borderRadius: "14px", background: "white", color: "#1e3a8a", border: "none" }}
          >
            Mở Trung tâm phê duyệt <Icon name="arrow" />
          </button>
        </section>

        {/* Delegated Approval Quick Action Card */}
        <section className="panel" style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid var(--border-soft)" }}>
          <div className="panel-title" style={{ marginBottom: "16px" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>YÊU CẦU CẦN DUYỆT NHANH CỦA DEV TEAM DIRECT</p>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)" }}>Duyệt nhanh từ trang tổng quan</h2>
            </div>
            <button className="secondary" onClick={() => navigate("approvals")}>
              Xem tất cả ({3}) <Icon name="arrow" />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: "16px", background: "#f8fafc", border: "1px solid var(--border-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#06b6d4", color: "white", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  LA
                </div>
                <div>
                  <b style={{ fontSize: "15px", color: "var(--text-main)" }}>Lê Hoài An · WFH Ngày 25/09</b>
                  <small style={{ display: "block", color: "var(--text-sub)", fontWeight: 600 }}>Tập trung hoàn thiện Design System & Wireframe</small>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="primary"
                  onClick={() => alert("Đã phê duyệt yêu cầu WFH của Lê Hoài An!")}
                  style={{ padding: "8px 14px", fontSize: "13px", fontWeight: 800, borderRadius: "10px", background: "#166534" }}
                >
                  ✓ Duyệt nhanh
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: "16px", background: "#f8fafc", border: "1px solid var(--border-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#f59e0b", color: "white", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  ĐP
                </div>
                <div>
                  <b style={{ fontSize: "15px", color: "var(--text-main)" }}>Nguyễn Đức Phúc · Điều chỉnh chấm công 18/09</b>
                  <small style={{ display: "block", color: "var(--text-sub)", fontWeight: 600 }}>Quên Checkout lúc 18:15 do vội họp với khách hàng</small>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="primary"
                  onClick={() => alert("Đã phê duyệt điều chỉnh chấm công của Nguyễn Đức Phúc!")}
                  style={{ padding: "8px 14px", fontSize: "13px", fontWeight: 800, borderRadius: "10px", background: "#166534" }}
                >
                  ✓ Duyệt nhanh
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Render Employee Dashboard component below */}
        <EmployeeDashboard />
      </div>
    );
  }

  // 5. DEFAULT STANDARD EMPLOYEE ROLE -> Render EmployeeDashboard Directly
  return <EmployeeDashboard />;
}
