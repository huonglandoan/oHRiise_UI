import { useState } from "react";
import { Icon, Status } from "../components/UI";

interface WfhRecord {
  id: string;
  date: string;
  dayOfWeek: string;
  timeSlot: string;
  reason: string;
  project: string;
  status: "approved" | "pending" | "completed" | "cancelled";
  statusText: string;
  hasReport: boolean;
  reportSummary?: string;
  aiScore?: string;
}

const INITIAL_WFH_LIST: WfhRecord[] = [
  {
    id: "#WFH-2026-0930",
    date: "30/09/2026",
    dayOfWeek: "Thứ Tư",
    timeSlot: "Buổi sáng (08:30 - 12:00)",
    reason: "Design system documentation",
    project: "Design System v2",
    status: "pending",
    statusText: "Đang chờ duyệt",
    hasReport: false,
  },
  {
    id: "#WFH-2026-0925",
    date: "25/09/2026",
    dayOfWeek: "Thứ Sáu",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    reason: "Product Design & Layout Review",
    project: "HRMS Portal",
    status: "approved",
    statusText: "Đã duyệt",
    hasReport: false,
  },
  {
    id: "#WFH-2026-0918",
    date: "18/09/2026",
    dayOfWeek: "Thứ Sáu",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    reason: "Product Design & Mockup UI",
    project: "HRMS Portal",
    status: "completed",
    statusText: "Đã hoàn thành",
    hasReport: true,
    reportSummary: "Hoàn tất 5 screen UI dashboard, nộp file Figma trên Jira #UI-102.",
    aiScore: "20/20 ảnh mẫu minh bạch (99%)",
  },
  {
    id: "#WFH-2026-0911",
    date: "11/09/2026",
    dayOfWeek: "Thứ Sáu",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    reason: "Research synthesis & User journey mapping",
    project: "UX Research",
    status: "completed",
    statusText: "Đã hoàn thành",
    hasReport: true,
    reportSummary: "Tổng hợp 12 cuộc phỏng vấn người dùng và vẽ sơ đồ Customer Journey.",
    aiScore: "18/18 ảnh mẫu minh bạch (96%)",
  },
  {
    id: "#WFH-2026-0904",
    date: "04/09/2026",
    dayOfWeek: "Thứ Sáu",
    timeSlot: "Buổi chiều (13:00 - 17:35)",
    reason: "Design review & Release notes",
    project: "Release v1.4",
    status: "cancelled",
    statusText: "Đã hủy",
    hasReport: false,
  },
];

export default function WfhPage({ open }: { open: () => void }) {
  const [activeTab, setActiveTab] = useState<"register" | "report" | "history">("register");
  const [records, setRecords] = useState<WfhRecord[]>(INITIAL_WFH_LIST);
  const [cancelModalRecord, setCancelModalRecord] = useState<WfhRecord | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Form states for WFH Registration
  const [regDate, setRegDate] = useState("2026-10-02");
  const [regTimeSlot, setRegTimeSlot] = useState("Cả ngày (08:30 - 17:35)");
  const [regProject, setRegProject] = useState("oHRiise UI/UX");
  const [regReason, setRegReason] = useState("");

  // Form states for Daily Report
  const [reportWfhId, setReportWfhId] = useState("#WFH-2026-0925");
  const [reportContent, setReportContent] = useState("");
  const [reportLink, setReportLink] = useState("");
  const [reportProgress, setReportProgress] = useState(100);

  // History Filter States
  const [wfhStartDate, setWfhStartDate] = useState("2026-09-01");
  const [wfhEndDate, setWfhEndDate] = useState("2026-09-30");
  const [wfhSortOrder, setWfhSortOrder] = useState<"newest" | "oldest">("newest");

  // Handle Cancel WFH
  const handleConfirmCancel = () => {
    if (!cancelModalRecord) return;
    setRecords((prev) =>
      prev.map((item) =>
        item.id === cancelModalRecord.id
          ? { ...item, status: "cancelled", statusText: "Đã hủy" }
          : item
      )
    );
    alert(`Đã hủy đơn WFH ${cancelModalRecord.id} thành công.`);
    setCancelModalRecord(null);
    setCancelReason("");
  };

  // Handle Submit WFH Register Form
  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regReason.trim()) {
      alert("Vui lòng nhập lý do / mục tiêu công việc WFH.");
      return;
    }
    const newRecord: WfhRecord = {
      id: `#WFH-2026-10${Math.floor(Math.random() * 90 + 10)}`,
      date: regDate.split("-").reverse().join("/"),
      dayOfWeek: "Thứ Sáu",
      timeSlot: regTimeSlot,
      reason: regReason,
      project: regProject,
      status: "pending",
      statusText: "Đang chờ duyệt",
      hasReport: false,
    };
    setRecords([newRecord, ...records]);
    alert("Đã gửi đăng ký WFH thành công! Đơn đang chờ duyệt.");
    setRegReason("");
  };

  // Handle Submit Daily Report
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportContent.trim()) {
      alert("Vui lòng nhập nội dung công việc đã hoàn thành trong ngày.");
      return;
    }
    setRecords((prev) =>
      prev.map((item) =>
        item.id === reportWfhId
          ? {
              ...item,
              hasReport: true,
              status: "completed",
              statusText: "Đã hoàn thành",
              reportSummary: reportContent,
            }
          : item
      )
    );
    alert("Đã nộp báo cáo Daily Report WFH thành công!");
    setReportContent("");
    setReportLink("");
  };

  const getRecordTimestamp = (dateStr: string) => {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
    }
    return 0;
  };

  const filteredHistoryRecords = records
    .filter((r) => {
      // Filter status
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      // Filter date range
      const parts = r.date.split("/");
      if (parts.length === 3) {
        const recIso = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
        if (wfhStartDate && recIso < wfhStartDate) return false;
        if (wfhEndDate && recIso > wfhEndDate) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = getRecordTimestamp(a.date);
      const timeB = getRecordTimestamp(b.date);
      return wfhSortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

  return (
    <div className="page inner-page">
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.5px" }}>LÀM VIỆC LINH HOẠT</p>
          <h1 style={{ fontSize: "28px", fontWeight: 800 }}>Làm việc từ xa (WFH)</h1>
          <span style={{ fontSize: "15px" }}>Đăng ký ngày WFH, nộp Báo cáo Daily Report và xem Lịch sử đơn từ.</span>
        </div>
      </div>

      {/* TOP SUB-TABS NAVIGATION */}
      <div
        className="page-sub-tabs"
        style={{
          display: "flex",
          gap: "28px",
          borderBottom: "2px solid var(--border-soft)",
          marginBottom: "28px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActiveTab("register")}
          style={{
            padding: "14px 6px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "register" ? "3px solid var(--brand)" : "3px solid transparent",
            color: activeTab === "register" ? "var(--brand)" : "var(--text-sub)",
            fontWeight: 800,
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.15s",
          }}
        >
          <Icon name="laptop" size={20} /> Đăng ký WFH
        </button>

        <button
          onClick={() => setActiveTab("report")}
          style={{
            padding: "14px 6px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "report" ? "3px solid var(--brand)" : "3px solid transparent",
            color: activeTab === "report" ? "var(--brand)" : "var(--text-sub)",
            fontWeight: 800,
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.15s",
          }}
        >
          <Icon name="file" size={20} /> Nộp Daily Report
        </button>

        <button
          onClick={() => setActiveTab("history")}
          style={{
            padding: "14px 6px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "history" ? "3px solid var(--brand)" : "3px solid transparent",
            color: activeTab === "history" ? "var(--brand)" : "var(--text-sub)",
            fontWeight: 800,
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.15s",
          }}
        >
          <Icon name="clock" size={20} /> Lịch sử WFH & Báo cáo
        </button>
      </div>

      {/* SUB-TAB 1: ĐĂNG KÝ WFH (FULL WIDTH CLEAN DESIGN WITH LARGER TYPOGRAPHY) */}
      {activeTab === "register" && (
        <section className="panel" style={{ padding: "32px", width: "100%" }}>
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
              TẠO YÊU CẦU MỚI
            </p>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)", marginTop: "4px" }}>
              Đăng ký ngày Làm việc từ xa (WFH)
            </h2>
          </div>

          <form onSubmit={handleSubmitRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                  Chọn ngày đăng ký WFH <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="date"
                  value={regDate}
                  onChange={(e) => setRegDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                  Khung thời gian WFH <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  value={regTimeSlot}
                  onChange={(e) => setRegTimeSlot(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  <option value="Cả ngày (08:30 - 17:35)">Cả ngày (08:30 - 17:35)</option>
                  <option value="Buổi sáng (08:30 - 12:00)">Buổi sáng (08:30 - 12:00)</option>
                  <option value="Buổi chiều (13:00 - 17:35)">Buổi chiều (13:00 - 17:35)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                Dự án / Nhóm công việc liên quan
              </label>
              <input
                type="text"
                value={regProject}
                onChange={(e) => setRegProject(e.target.value)}
                placeholder="Nhập tên dự án hoặc nhóm công việc..."
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "15px",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                Lý do & Mục tiêu đầu ra công việc <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <textarea
                rows={4}
                value={regReason}
                onChange={(e) => setRegReason(e.target.value)}
                placeholder="Mô tả cụ thể mục tiêu đầu ra và lý do làm việc từ xa..."
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button className="primary" type="submit" style={{ padding: "14px 32px", fontSize: "16px", fontWeight: 800 }}>
                <Icon name="check" size={20} /> Nộp đơn đăng ký WFH
              </button>
            </div>
          </form>
        </section>
      )}

      {/* SUB-TAB 2: NỘP BÁO CÁO NGÀY (DAILY REPORT WFH) */}
      {activeTab === "report" && (
        <section className="panel" style={{ padding: "32px", width: "100%" }}>
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
              BÁO CÁO CUỐI NGÀY
            </p>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)" }}>
              Nộp Báo cáo ngày (Daily Report WFH)
            </h2>
            <p style={{ fontSize: "15px", color: "var(--text-sub)", marginTop: "4px" }}>
              Báo cáo tiến độ kết quả công việc dành riêng cho ngày làm việc từ xa.
            </p>
          </div>

          <form onSubmit={handleSubmitReport} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div>
              <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                Chọn ngày WFH cần nộp báo cáo <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <select
                value={reportWfhId}
                onChange={(e) => setReportWfhId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {records
                  .filter((r) => r.status === "approved" || r.status === "completed")
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id} - Ngày {r.date} ({r.reason})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                Nội dung công việc & Kết quả đã hoàn thành <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <textarea
                rows={5}
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                placeholder="Liệt kê các đầu việc đã làm trong ngày WFH, kết quả nghiệm thu..."
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                  Mức độ hoàn thành (%)
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={reportProgress}
                    onChange={(e) => setReportProgress(Number(e.target.value))}
                    placeholder="100"
                    style={{
                      width: "100%",
                      padding: "13px",
                      paddingRight: "36px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "14px",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--text-sub)",
                      pointerEvents: "none",
                    }}
                  >
                    %
                  </span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "15px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                  Link đính kèm kết quả (Figma / Jira / Docs)
                </label>
                <input
                  type="text"
                  value={reportLink}
                  onChange={(e) => setReportLink(e.target.value)}
                  placeholder="https://figma.com/file/... hoặc link báo cáo"
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button className="primary" type="submit" style={{ padding: "14px 32px", fontSize: "16px", fontWeight: 800 }}>
                <Icon name="check" size={20} /> Nộp Báo cáo Daily Report
              </button>
            </div>
          </form>
        </section>
      )}

      {/* SUB-TAB 3: LỊCH SỬ WFH & BÁO CÁO (HAS CANCEL ACTION & DATE FILTERS) */}
      {activeTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <section className="panel" style={{ padding: "28px", width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                TRA CỨU LỊCH SỬ
              </p>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)" }}>
                Bộ lọc tra cứu đơn WFH ({filteredHistoryRecords.length})
              </h2>
            </div>

            {/* Date Range & Status Filter Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                alignItems: "end",
              }}
            >
              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Từ ngày
                </label>
                <input
                  type="date"
                  value={wfhStartDate}
                  onChange={(e) => setWfhStartDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Đến ngày
                </label>
                <input
                  type="date"
                  value={wfhEndDate}
                  onChange={(e) => setWfhEndDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Trạng thái duyệt
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "white",
                  }}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Đang chờ duyệt</option>
                  <option value="approved">Đã phê duyệt</option>
                  <option value="completed">Đã hoàn thành (Có report)</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Sắp xếp thời gian
                </label>
                <select
                  value={wfhSortOrder}
                  onChange={(e) => setWfhSortOrder(e.target.value as "newest" | "oldest")}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "white",
                  }}
                >
                  <option value="newest">Gần nhất (Mới nhất)</option>
                  <option value="oldest">Xa nhất (Cũ nhất)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="panel" style={{ padding: "24px", width: "100%" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)", fontSize: "14px" }}>
                    <th style={{ padding: "14px 16px" }}>MÃ ĐƠN</th>
                    <th style={{ padding: "14px 16px" }}>NGÀY WFH</th>
                    <th style={{ padding: "14px 16px" }}>KHUNG GIỜ</th>
                    <th style={{ padding: "14px 16px" }}>LÝ DO / DỰ ÁN</th>
                    <th style={{ padding: "14px 16px" }}>DAILY REPORT</th>
                    <th style={{ padding: "14px 16px" }}>TRẠNG THÁI</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistoryRecords.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                      <td style={{ padding: "16px 16px", fontWeight: 800, color: "var(--brand)" }}>{r.id}</td>
                      <td style={{ padding: "16px 16px", fontWeight: 700 }}>{r.date}</td>
                      <td style={{ padding: "16px 16px", color: "#1e40af", fontWeight: 600 }}>{r.timeSlot}</td>
                      <td style={{ padding: "16px 16px", color: "var(--text-main)" }}>
                        <b style={{ fontSize: "15px" }}>{r.project}</b>
                        <small style={{ display: "block", color: "var(--text-sub)", fontSize: "13px" }}>{r.reason}</small>
                      </td>
                      <td style={{ padding: "16px 16px" }}>
                        {r.hasReport ? (
                          <span style={{ fontSize: "14px", color: "#166534", fontWeight: 700 }}>
                            Đã nộp Report
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-sub)", fontSize: "14px" }}>Chưa nộp</span>
                        )}
                      </td>
                      <td style={{ padding: "16px 16px" }}>
                        <Status
                          tone={
                            r.status === "completed"
                              ? "green"
                              : r.status === "approved"
                              ? "blue"
                              : r.status === "pending"
                              ? "amber"
                              : "gray"
                          }
                        >
                          {r.statusText}
                        </Status>
                      </td>
                      <td style={{ padding: "16px 16px", textAlign: "right" }}>
                        {(r.status === "approved" || r.status === "pending") && (
                          <button
                            className="secondary"
                            onClick={() => setCancelModalRecord(r)}
                            style={{
                              color: "#dc2626",
                              borderColor: "#fca5a5",
                              fontSize: "13px",
                              fontWeight: 700,
                              padding: "6px 14px",
                            }}
                          >
                            Hủy đơn WFH
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

      {/* CANCEL CONFIRMATION MODAL */}
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
              borderRadius: "20px",
              padding: "28px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#dc2626", marginBottom: "10px" }}>
              Xác nhận Hủy đơn WFH {cancelModalRecord.id}?
            </h3>
            <p style={{ fontSize: "15px", color: "var(--text-sub)", marginBottom: "18px" }}>
              Bạn đang yêu cầu hủy đơn đăng ký WFH ngày <b>{cancelModalRecord.date}</b> ({cancelModalRecord.timeSlot}).
            </p>

            <div style={{ marginBottom: "22px" }}>
              <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                Lý do hủy đơn WFH
              </label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Nhập lý do thay đổi kế hoạch..."
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button className="secondary" onClick={() => setCancelModalRecord(null)} style={{ padding: "10px 18px", fontSize: "14px", fontWeight: 600 }}>
                Quay lại
              </button>
              <button
                className="primary"
                onClick={handleConfirmCancel}
                style={{ background: "#dc2626", borderColor: "#dc2626", padding: "10px 20px", fontSize: "14px", fontWeight: 700 }}
              >
                Xác nhận Hủy WFH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
