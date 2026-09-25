import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

export interface LeaveRecord {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  timeSlot: string;
  reason: string;
  handover: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  statusText: string;
  attachment?: string;
}

const INITIAL_LEAVE_RECORDS: LeaveRecord[] = [
  {
    id: "#NP-2026-0928",
    leaveType: "Phép năm",
    startDate: "28/09/2026",
    endDate: "29/09/2026",
    totalDays: 2,
    timeSlot: "Cả ngày",
    reason: "Đi du lịch cùng gia đình",
    handover: "Trần Thảo My (Design Lead)",
    status: "pending",
    statusText: "Chờ Team Lead duyệt",
  },
  {
    id: "#NP-2026-0915",
    leaveType: "Nghỉ ốm",
    startDate: "15/09/2026",
    endDate: "15/09/2026",
    totalDays: 1,
    timeSlot: "Cả ngày",
    reason: "Sốt siêu vi (Có giấy xác nhận phòng khám)",
    handover: "Lê Hoàng Nam (Frontend Dev)",
    status: "approved",
    statusText: "Đã duyệt",
    attachment: "Giấy_khám_bệnh_1509.pdf",
  },
  {
    id: "#NP-2026-0810",
    leaveType: "Phép năm",
    startDate: "10/08/2026",
    endDate: "10/08/2026",
    totalDays: 1,
    timeSlot: "Cả ngày",
    reason: "Giải quyết việc cá nhân gia đình",
    handover: "Phạm Minh Đức (Product Owner)",
    status: "approved",
    statusText: "Đã duyệt",
  },
  {
    id: "#NP-2026-0704",
    leaveType: "Nghỉ không lương",
    startDate: "04/07/2026",
    endDate: "04/07/2026",
    totalDays: 1,
    timeSlot: "Cả ngày",
    reason: "Xử lý thủ tục giấy tờ cá nhân",
    handover: "Trần Thảo My",
    status: "cancelled",
    statusText: "Đã hủy",
  },
];

export default function LeavePage({ open }: { open?: () => void }) {
  // Subtab Order: "form" comes first, "history" is at the end (second)
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");
  const [records, setRecords] = useState<LeaveRecord[]>(INITIAL_LEAVE_RECORDS);

  // Form States
  const [leaveType, setLeaveType] = useState("Phép năm");
  const [timeMode, setTimeMode] = useState<"full" | "morning" | "afternoon">("full");
  const [startDate, setStartDate] = useState("2026-10-05");
  const [endDate, setEndDate] = useState("2026-10-05");
  const [reason, setReason] = useState("");
  const [handover, setHandover] = useState("");
  const [attachment, setAttachment] = useState("");

  // History Filter States
  const [filterStartDate, setFilterStartDate] = useState("2026-09-01");
  const [filterEndDate, setFilterEndDate] = useState("2026-09-30");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Modal Cancel State
  const [cancelModalRecord, setCancelModalRecord] = useState<LeaveRecord | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Total calculated days
  const calculateTotalDays = () => {
    if (timeMode !== "full") return 0.5;
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 1;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // Submit Leave Request
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do xin nghỉ phép.");
      return;
    }
    const totalDays = calculateTotalDays();
    const startFormatted = startDate.split("-").reverse().join("/");
    const endFormatted = endDate.split("-").reverse().join("/");

    const newRecord: LeaveRecord = {
      id: `#NP-2026-10${Math.floor(Math.random() * 90 + 10)}`,
      leaveType,
      startDate: startFormatted,
      endDate: timeMode === "full" ? endFormatted : startFormatted,
      totalDays,
      timeSlot:
        timeMode === "full"
          ? "Cả ngày"
          : timeMode === "morning"
          ? "Buổi sáng"
          : "Buổi chiều",
      reason,
      handover: handover || "Chưa bàn giao",
      status: "pending",
      statusText: "Chờ Team Lead duyệt",
      attachment: attachment ? attachment : undefined,
    };

    setRecords([newRecord, ...records]);
    alert("Đã gửi đơn xin nghỉ phép thành công! Đơn đang chờ Team Lead phê duyệt.");
    setReason("");
    setHandover("");
    setAttachment("");
    setActiveTab("history");
  };

  // Confirm Cancel Leave
  const handleConfirmCancel = () => {
    if (!cancelModalRecord) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === cancelModalRecord.id
          ? { ...r, status: "cancelled", statusText: "Đã hủy" }
          : r
      )
    );
    alert(`Đã hủy đơn nghỉ phép ${cancelModalRecord.id} thành công.`);
    setCancelModalRecord(null);
    setCancelReason("");
  };

  // Date timestamp parser
  const getRecordTimestamp = (dateStr: string) => {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
    }
    return 0;
  };

  // Filtered History
  const filteredRecords = records
    .filter((r) => {
      // Filter status
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      // Filter date range
      const parts = r.startDate.split("/");
      if (parts.length === 3) {
        const recIso = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
        if (filterStartDate && recIso < filterStartDate) return false;
        if (filterEndDate && recIso > filterEndDate) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = getRecordTimestamp(a.startDate);
      const timeB = getRecordTimestamp(b.startDate);
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

  return (
    <div className="page inner-page">
      {/* PAGE HEADER - LARGER FONTS */}
      <div className="page-heading" style={{ marginBottom: "28px" }}>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
            QUẢN LÝ NGHỈ PHÉP
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
            Nghỉ phép
          </h1>
          <span style={{ fontSize: "16px", color: "var(--text-sub)", fontWeight: 500 }}>
            Quản lý quỹ phép cá nhân và gửi đơn xin nghỉ phép tối giản, nhanh chóng.
          </span>
        </div>
      </div>

      {/* OVERVIEW: SỐ NGÀY PHÉP CÒN LẠI (CARDS WITH LARGER TYPOGRAPHY) */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Main Card: Phép năm */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              borderRadius: "22px",
              padding: "28px",
              color: "white",
              boxShadow: "0 12px 28px -6px rgba(59, 130, 246, 0.35)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1px", opacity: 0.9 }}>
                QUỸ PHÉP NĂM 2026
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "12px" }}>
                <strong style={{ fontSize: "48px", fontWeight: 900, lineHeight: 1 }}>8,5</strong>
                <span style={{ fontSize: "18px", fontWeight: 700, opacity: 0.95 }}>ngày phép còn lại</span>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div style={{ background: "rgba(255,255,255,0.28)", borderRadius: "10px", height: "9px", overflow: "hidden", marginBottom: "10px" }}>
                <div style={{ background: "white", height: "100%", width: "70.8%", borderRadius: "10px" }} />
              </div>
              <small style={{ fontSize: "15px", opacity: 0.95, fontWeight: 600 }}>
                Đã sử dụng 3,5 trên tổng 12,0 ngày phép
              </small>
            </div>
          </div>

          {/* Sub Card 1: Phép năm */}
          <div
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="calendar" size={24} />
              </div>
              <div>
                <b style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>8,5 ngày</b>
                <span style={{ fontSize: "15px", color: "var(--text-sub)", fontWeight: 700 }}>Phép năm</span>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-sub)", marginTop: "18px", margin: 0, fontWeight: 500 }}>
              Áp dụng cho nghỉ phép thường niên có hưởng lương.
            </p>
          </div>

          {/* Sub Card 2: Nghỉ ốm */}
          <div
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#fef2f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="shield" size={24} />
              </div>
              <div>
                <b style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>5,0 ngày</b>
                <span style={{ fontSize: "15px", color: "var(--text-sub)", fontWeight: 700 }}>Nghỉ ốm</span>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-sub)", marginTop: "18px", margin: 0, fontWeight: 500 }}>
              Cần đính kèm giấy xác nhận của cơ sở y tế.
            </p>
          </div>

          {/* Sub Card 3: Nghỉ bù */}
          <div
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "24px",
              border: "1px solid var(--border-soft)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#f0fdf4", color: "#166534", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="clock" size={24} />
              </div>
              <div>
                <b style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>1,0 ngày</b>
                <span style={{ fontSize: "15px", color: "var(--text-sub)", fontWeight: 700 }}>Nghỉ bù OT</span>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-sub)", marginTop: "18px", margin: 0, fontWeight: 500 }}>
              Quy đổi từ giờ tăng ca Overtime đã tích lũy.
            </p>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION BAR: ĐƠN NGHỈ PHÉP FIRST, LỊCH SỬ NGHỈ PHÉP AT THE END */}
      <div className="page-sub-tabs" style={{ marginBottom: "28px", borderBottom: "2px solid var(--border-soft)" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          {/* TAB 1: ĐƠN NGHỈ PHÉP (FIRST) */}
          <button
            onClick={() => setActiveTab("form")}
            style={{
              padding: "16px 28px",
              fontSize: "18px",
              fontWeight: 800,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: activeTab === "form" ? "var(--brand)" : "var(--text-sub)",
              borderBottom: activeTab === "form" ? "3.5px solid var(--brand)" : "3.5px solid transparent",
              marginBottom: "-2px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Icon name="plus" size={22} /> Đơn nghỉ phép
          </button>

          {/* TAB 2: LỊCH SỬ NGHỈ PHÉP (AT THE END / SECOND) */}
          <button
            onClick={() => setActiveTab("history")}
            style={{
              padding: "16px 28px",
              fontSize: "18px",
              fontWeight: 800,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: activeTab === "history" ? "var(--brand)" : "var(--text-sub)",
              borderBottom: activeTab === "history" ? "3.5px solid var(--brand)" : "3.5px solid transparent",
              marginBottom: "-2px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Icon name="file" size={22} /> Lịch sử nghỉ phép ({filteredRecords.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: TẠO ĐƠN NGHỈ PHÉP */}
      {activeTab === "form" && (
        <section className="panel" style={{ padding: "32px", width: "100%" }}>
          <div style={{ marginBottom: "26px" }}>
            <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
              ĐƠN ĐĂNG KÝ MỚI
            </p>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
              Tạo đơn xin nghỉ phép
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-sub)", marginTop: "4px" }}>
              Đơn xin nghỉ phép sẽ được gửi trực tiếp đến Quản lý trực tiếp (Team Lead) phê duyệt.
            </p>
          </div>

          <form onSubmit={handleSubmitForm} style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
            {/* Row 1: Loại phép & Khung giờ */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Loại hình nghỉ phép <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                    fontWeight: 700,
                    background: "white",
                  }}
                >
                  <option value="Phép năm">Phép năm (Còn 8,5 ngày)</option>
                  <option value="Nghỉ ốm">Nghỉ ốm (Có chứng từ y tế)</option>
                  <option value="Nghỉ bù">Nghỉ bù (Do tích lũy OT)</option>
                  <option value="Nghỉ không lương">Nghỉ không hưởng lương</option>
                  <option value="Nghỉ chế độ">Nghỉ chế độ (Hiếu, hỉ, thai sản...)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Khung giờ nghỉ trong ngày
                </label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setTimeMode("full")}
                    style={{
                      flex: 1,
                      padding: "14px",
                      borderRadius: "12px",
                      border: timeMode === "full" ? "2px solid var(--brand)" : "1px solid var(--border-soft)",
                      background: timeMode === "full" ? "#eff6ff" : "white",
                      color: timeMode === "full" ? "var(--brand)" : "var(--text-main)",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                  >
                    Cả ngày
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeMode("morning")}
                    style={{
                      flex: 1,
                      padding: "14px",
                      borderRadius: "12px",
                      border: timeMode === "morning" ? "2px solid var(--brand)" : "1px solid var(--border-soft)",
                      background: timeMode === "morning" ? "#eff6ff" : "white",
                      color: timeMode === "morning" ? "var(--brand)" : "var(--text-main)",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                  >
                    Buổi sáng (½)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeMode("afternoon")}
                    style={{
                      flex: 1,
                      padding: "14px",
                      borderRadius: "12px",
                      border: timeMode === "afternoon" ? "2px solid var(--brand)" : "1px solid var(--border-soft)",
                      background: timeMode === "afternoon" ? "#eff6ff" : "white",
                      color: timeMode === "afternoon" ? "var(--brand)" : "var(--text-main)",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                  >
                    Buổi chiều (½)
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Date Pickers & Total calculation */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", alignItems: "end" }}>
              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Từ ngày <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                />
              </div>

              {timeMode === "full" && (
                <div>
                  <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                    Đến ngày <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  />
                </div>
              )}

              <div style={{ paddingBottom: "2px" }}>
                <div
                  style={{
                    padding: "14px 20px",
                    borderRadius: "14px",
                    background: "#f8fafc",
                    border: "1px solid var(--border-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "15px", color: "var(--text-sub)", fontWeight: 700 }}>Tổng cộng:</span>
                  <b style={{ fontSize: "20px", fontWeight: 900, color: "var(--brand)" }}>
                    {calculateTotalDays()} ngày phép
                  </b>
                </div>
              </div>
            </div>

            {/* Row 3: Reason */}
            <div>
              <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                Lý do xin nghỉ phép <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập chi tiết lý do nghỉ phép..."
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Row 4: Handover Person */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Người bàn giao công việc & Số điện thoại liên hệ
                </label>
                <input
                  type="text"
                  value={handover}
                  onChange={(e) => setHandover(e.target.value)}
                  placeholder="Ví dụ: Trần Thảo My (Design Lead) - 0987.654.321"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Đính kèm giấy xác nhận / Chứng từ (nếu có)
                </label>
                <input
                  type="text"
                  value={attachment}
                  onChange={(e) => setAttachment(e.target.value)}
                  placeholder="Dán link Google Drive hoặc tên tập tin chứng từ y tế"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
              <button
                className="primary"
                type="submit"
                style={{ padding: "16px 36px", fontSize: "17px", fontWeight: 900 }}
              >
                <Icon name="check" size={22} /> Gửi đơn xin nghỉ phép
              </button>
            </div>
          </form>
        </section>
      )}

      {/* SUB-TAB 2: LỊCH SỬ NGHỈ PHÉP (AT THE END) */}
      {activeTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          {/* Filter Panel */}
          <section className="panel" style={{ padding: "28px", width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                BỘ LỌC TRA CỨU
              </p>
              <h2 style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
                Tra cứu danh sách đơn nghỉ phép
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                alignItems: "end",
              }}
            >
              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "8px" }}>
                  Từ ngày
                </label>
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px 15px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "8px" }}>
                  Đến ngày
                </label>
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px 15px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "8px" }}>
                  Trạng thái duyệt
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px 15px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                    fontWeight: 800,
                    background: "white",
                  }}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ Team Lead duyệt</option>
                  <option value="approved">Đã phê duyệt</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "8px" }}>
                  Sắp xếp thời gian
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                  style={{
                    width: "100%",
                    padding: "13px 15px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                    fontWeight: 800,
                    background: "white",
                  }}
                >
                  <option value="newest">Gần nhất (Mới nhất)</option>
                  <option value="oldest">Xa nhất (Cũ nhất)</option>
                </select>
              </div>
            </div>
          </section>

          {/* History Table */}
          <section className="panel" style={{ padding: "28px", width: "100%" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "16px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)", fontSize: "15px" }}>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>MÃ ĐƠN</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>LOẠI PHÉP</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>THỜI GIAN NGHỈ</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>SỐ NGÀY</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>LÝ DO & BÀN GIAO</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>TRẠNG THÁI</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800, textAlign: "right" }}>THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                      <td style={{ padding: "18px 18px", fontWeight: 900, color: "var(--brand)", fontSize: "17px" }}>{r.id}</td>
                      <td style={{ padding: "18px 18px", fontWeight: 800, color: "var(--text-main)" }}>
                        {r.leaveType}
                      </td>
                      <td style={{ padding: "18px 18px", fontWeight: 700, color: "#1e40af" }}>
                        {r.startDate === r.endDate ? r.startDate : `${r.startDate} - ${r.endDate}`}
                        <small style={{ display: "block", color: "var(--text-sub)", fontSize: "14px", fontWeight: 600 }}>{r.timeSlot}</small>
                      </td>
                      <td style={{ padding: "18px 18px", fontWeight: 900, color: "var(--text-main)" }}>
                        {r.totalDays} ngày
                      </td>
                      <td style={{ padding: "18px 18px", color: "var(--text-main)" }}>
                        <b style={{ fontSize: "16px", display: "block" }}>{r.reason}</b>
                        <small style={{ color: "var(--text-sub)", fontSize: "14px" }}>
                          Bàn giao: {r.handover}
                        </small>
                      </td>
                      <td style={{ padding: "18px 18px" }}>
                        <Status
                          tone={
                            r.status === "approved"
                              ? "green"
                              : r.status === "pending"
                              ? "amber"
                              : "gray"
                          }
                        >
                          {r.statusText}
                        </Status>
                      </td>
                      <td style={{ padding: "18px 18px", textAlign: "right" }}>
                        {(r.status === "approved" || r.status === "pending") && (
                          <button
                            className="secondary"
                            onClick={() => setCancelModalRecord(r)}
                            style={{
                              color: "#dc2626",
                              borderColor: "#fca5a5",
                              fontSize: "14px",
                              fontWeight: 800,
                              padding: "8px 16px",
                            }}
                          >
                            Hủy đơn nghỉ
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* CANCEL MODAL */}
      {cancelModalRecord && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setCancelModalRecord(null)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "32px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#dc2626", marginBottom: "12px" }}>
              Xác nhận Hủy đơn nghỉ phép {cancelModalRecord.id}?
            </h3>
            <p style={{ fontSize: "16px", color: "var(--text-sub)", marginBottom: "20px" }}>
              Bạn đang yêu cầu hủy đơn nghỉ phép <b>{cancelModalRecord.leaveType}</b> ngày <b>{cancelModalRecord.startDate}</b>.
            </p>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "8px" }}>
                Lý do hủy đơn
              </label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Nhập lý do hủy đơn..."
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}>
              <button
                className="secondary"
                onClick={() => setCancelModalRecord(null)}
                style={{ padding: "12px 20px", fontSize: "15px", fontWeight: 700 }}
              >
                Quay lại
              </button>
              <button
                className="primary"
                onClick={handleConfirmCancel}
                style={{
                  background: "#dc2626",
                  borderColor: "#dc2626",
                  padding: "12px 24px",
                  fontSize: "15px",
                  fontWeight: 800,
                }}
              >
                Xác nhận Hủy đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
