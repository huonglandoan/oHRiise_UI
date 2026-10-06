import React, { useState } from "react";
import { Icon, Status } from "./UI";
import { ApprovalRequest } from "../pages/ApprovalPage";

interface Props {
  requests: ApprovalRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function LeaveApprovalTable({ requests, onApprove, onReject }: Props) {
  // Parsing helpers
  const parseLeaveDate = (summary: string) => {
    // Attempt to extract dates and days from summary.
    // e.g. "28–29/09/2026 · 2 ngày (Trừ 2 ngày phép năm)"
    let from = "-";
    let to = "-";
    let days = "-";
    
    if (summary) {
       const parts = summary.split("·");
       if (parts.length > 0) {
          const datePart = parts[0].trim();
          if (datePart.includes("–")) {
             const dates = datePart.split("–");
             from = dates[0].trim();
             to = dates[1].trim();
             // if to is like 29/09/2026 and from is 28, from becomes 28/09/2026
             if (from.length <= 2 && to.length > 2) {
                from = from + to.substring(2);
             }
          } else {
             from = datePart;
             to = datePart;
          }
       }
       if (parts.length > 1) {
          days = parts[1].split("(")[0].trim();
       }
    }
    return { from, to, days };
  };

  const getStatusDropdownStyle = (status: string) => {
    switch (status) {
      case "approved":
        return { border: "1px solid #16a34a", color: "#16a34a", background: "white" };
      case "rejected":
        return { border: "1px solid #dc2626", color: "#dc2626", background: "white" };
      default:
        return { border: "1px solid #2563eb", color: "#2563eb", background: "white" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", background: "#f8fafc", padding: "20px", borderRadius: "8px" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, margin: 0, color: "#1e293b", letterSpacing: "-0.5px" }}>Nghỉ phép</h2>
          <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px", fontWeight: 500 }}>Dashboard / <span style={{ color: "#334155" }}>Nghỉ phép</span></div>
        </div>
        <button style={{ background: "#ef4444", color: "white", border: "none", padding: "10px 20px", borderRadius: "30px", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 4px 10px rgba(239,68,68,0.2)" }}>
          <Icon name="plus" size={16} /> Thêm đơn nghỉ
        </button>
      </div>

      {/* Top Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {[
          { label: "Hôm nay đi làm", value: "12 / 60", sub: "" },
          { label: "Nghỉ có kế hoạch", value: "8", sub: "Hôm nay" },
          { label: "Nghỉ đột xuất", value: "0", sub: "Hôm nay" },
          { label: "Yêu cầu chờ duyệt", value: requests.filter((r) => r.status === "pending").length.toString(), sub: "" },
        ].map((c, i) => (
          <div key={i} style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            padding: "24px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
          }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#475569", marginBottom: "12px" }}>{c.label}</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "6px" }}>
              <strong style={{ fontSize: "28px", fontWeight: 700, color: "#1e293b" }}>{c.value}</strong>
              {c.sub && <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>{c.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Filters */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr auto", gap: "16px", alignItems: "center" }}>
        <input type="text" placeholder="Tên nhân viên" style={{ padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px" }} />
        <select style={{ padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "white", fontSize: "14px", color: "#64748b" }}>
          <option>Loại phép -- Chọn --</option>
        </select>
        <select style={{ padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "white", fontSize: "14px", color: "#64748b" }}>
          <option>Trạng thái -- Chọn --</option>
        </select>
        <input type="date" placeholder="Từ ngày" style={{ padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px", color: "#64748b" }} />
        <input type="date" placeholder="Đến ngày" style={{ padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px", color: "#64748b" }} />
        <button style={{ padding: "12px 32px", background: "#22c55e", color: "white", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "14px", letterSpacing: "0.5px" }}>TÌM KIẾM</button>
      </div>

      {/* Data Table */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#475569", display: "flex", alignItems: "center" }}>
          Hiển thị <select style={{ margin: "0 8px", padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "white" }}><option>10</option></select> dòng
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px" }}>Nhân viên <Icon name="updown" size={12}/></th>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px" }}>Loại phép <Icon name="updown" size={12}/></th>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px" }}>Từ <Icon name="updown" size={12}/></th>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px" }}>Đến <Icon name="updown" size={12}/></th>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px" }}>Số ngày <Icon name="updown" size={12}/></th>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px" }}>Lý do <Icon name="updown" size={12}/></th>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px" }}>Trạng thái <Icon name="updown" size={12}/></th>
              <th style={{ padding: "16px 20px", fontWeight: 700, color: "#475569", fontSize: "14px", textAlign: "right" }}>Thao tác <Icon name="updown" size={12}/></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => {
              const { from, to, days } = parseLeaveDate(r.summary);
              return (
                <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#3b82f6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>
                        {r.avatarInitials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "14px" }}>{r.employeeName}</div>
                        <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{r.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 600, color: "#334155" }}>{r.typeLabel}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#475569" }}>{from}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#475569" }}>{to}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#475569" }}>{days}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#475569", maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.reason}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <select
                      value={r.status}
                      onChange={(e) => {
                         if (e.target.value === "approved") onApprove(r.id);
                         if (e.target.value === "rejected") onReject(r.id);
                      }}
                      style={{
                        padding: "6px 24px 6px 12px",
                        borderRadius: "16px",
                        fontSize: "13px",
                        fontWeight: 700,
                        appearance: "none",
                        cursor: "pointer",
                        outline: "none",
                        ...getStatusDropdownStyle(r.status)
                      }}
                    >
                      <option value="pending">Chờ duyệt</option>
                      <option value="approved">Đã duyệt</option>
                      <option value="rejected">Từ chối</option>
                    </select>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                      <Icon name="more" size={24} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "20px", borderTop: "1px solid #f1f5f9", fontSize: "14px", color: "#64748b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>Đang hiển thị 1 tới {requests.length} trong tổng số {requests.length} dòng</div>
          <div style={{ display: "flex" }}>
            <button style={{ padding: "8px 16px", border: "1px solid #cbd5e1", background: "white", fontSize: "14px", color: "#475569", borderRight: "none", borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Trước</button>
            <button style={{ padding: "8px 16px", border: "1px solid #ef4444", background: "#ef4444", color: "white", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>1</button>
            <button style={{ padding: "8px 16px", border: "1px solid #cbd5e1", background: "white", fontSize: "14px", color: "#475569", borderLeft: "none", borderRight: "none", cursor: "pointer", fontWeight: 600 }}>2</button>
            <button style={{ padding: "8px 16px", border: "1px solid #cbd5e1", background: "white", fontSize: "14px", color: "#475569", borderTopRightRadius: "6px", borderBottomRightRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}
