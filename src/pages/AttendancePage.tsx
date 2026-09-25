import { useState } from "react";
import { Icon, Status } from "../components/UI";

interface DayActivity {
  type: "office" | "remote" | "leave" | "late" | "weekend";
  label: string;
  checkIn?: string;
  checkOut?: string;
  location?: string;
  detailsNote?: string;
  requestStatus?: string;
}

interface RequestRecord {
  id: string;
  type: "checkin" | "late" | "ot" | "wfh" | "leave";
  typeName: string;
  date: string; // Ngày áp dụng
  submittedDate: string; // Ngày nộp đơn
  details: string;
  reason: string;
  status: "approved" | "pending" | "rejected";
  statusText: string;
}

const SAMPLE_REQUESTS: RequestRecord[] = [
  {
    id: "#OT-2026-0925",
    type: "ot",
    typeName: "Đăng ký Tăng ca (OT)",
    date: "25/09/2026",
    submittedDate: "24/09/2026 16:30",
    details: "18:00 - 20:30 (2.5 giờ · Hệ số 150%)",
    reason: "Đốt tiến độ bàn giao Module HRMS v2.0",
    status: "pending",
    statusText: "Chờ duyệt",
  },
  {
    id: "#ADJ-2026-0922",
    type: "checkin",
    typeName: "Bổ sung giờ Check-out",
    date: "22/09/2026",
    submittedDate: "23/09/2026 08:15",
    details: "Check-out bổ sung: 17:45 PM",
    reason: "Quên bấm máy chấm công khi ra ca",
    status: "pending",
    statusText: "Chờ duyệt",
  },
  {
    id: "#WFH-2026-0918",
    type: "wfh",
    typeName: "Đăng ký WFH",
    date: "18/09/2026",
    submittedDate: "17/09/2026 14:20",
    details: "08:30 - 17:35 (Làm việc tại nhà)",
    reason: "AI camera xác thực 20/20 ảnh làm việc",
    status: "approved",
    statusText: "Đã duyệt",
  },
  {
    id: "#EX-2026-0909",
    type: "late",
    typeName: "Giải trình đi muộn",
    date: "09/09/2026",
    submittedDate: "09/09/2026 09:10",
    details: "Check-in: 08:47 AM (Muộn 17 phút)",
    reason: "Sự cố giao thông kẹt xe cầu Sài Gòn",
    status: "approved",
    statusText: "Đã chấp nhận",
  },
  {
    id: "#LV-2026-0915",
    type: "leave",
    typeName: "Đơn xin nghỉ phép",
    date: "15/09/2026",
    submittedDate: "12/09/2026 10:00",
    details: "Nghỉ nguyên ngày (Phép năm)",
    reason: "Giải quyết việc cá nhân gia đình",
    status: "approved",
    statusText: "Đã duyệt",
  },
];

export default function AttendancePage() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9);
  const [selectedDay, setSelectedDay] = useState(22);
  const [activePageTab, setActivePageTab] = useState<"calendar" | "checkin" | "ot" | "history">("calendar");

  // History Filter States
  const [historySearch, setHistorySearch] = useState("");
  const [historyTypeFilter, setHistoryTypeFilter] = useState("all");
  const [historyStatusFilter, setHistoryStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("2026-09-01");
  const [endDateFilter, setEndDateFilter] = useState("2026-09-30");

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleMonthSelect = (val: string) => {
    const [m, y] = val.split("-").map(Number);
    setCurrentMonth(m);
    setCurrentYear(y);
  };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // Derive mockup day activity based on day number
  const getDayActivity = (day: number): DayActivity => {
    const isWeekend = [5, 6, 12, 13, 19, 20, 26, 27].includes(day);
    if (isWeekend) {
      return {
        type: "weekend",
        label: "Nghỉ cuối tuần",
        detailsNote: "Ngày nghỉ hàng tuần theo quy định công ty.",
      };
    }
    if (day === 4 || day === 11 || day === 18) {
      return {
        type: "remote",
        label: "WFH",
        checkIn: "08:30",
        checkOut: "17:35",
        location: "Làm việc tại nhà (WFH)",
        requestStatus: "Đơn WFH #WFH-09" + day + " - Đã phê duyệt",
        detailsNote: "Báo cáo AI camera ghi nhận 20 ảnh mẫu hoàn thành công việc minh bạch.",
      };
    }
    if (day === 15) {
      return {
        type: "leave",
        label: "Nghỉ phép",
        requestStatus: "Đơn xin nghỉ phép năm #LV-0915",
        detailsNote: "Đã được Trưởng phòng & HR duyệt (Hạn mức nghỉ phép năm).",
      };
    }
    if (day === 9) {
      return {
        type: "late",
        label: "08:47 · Muộn",
        checkIn: "08:47",
        checkOut: "17:45",
        location: "Văn phòng HCM (Tầng 4)",
        requestStatus: "Đơn giải trình đi muộn #EX-0909 - Đã duyệt",
        detailsNote: "Đi muộn 17 phút do sự cố giao thông. Đã gửi giải trình bổ sung.",
      };
    }
    return {
      type: "office",
      label: "08:32 · 17:41",
      checkIn: "08:32",
      checkOut: "17:41",
      location: "Văn phòng HCM (GPS Xác thực)",
      detailsNote: "Ngày làm việc tiêu chuẩn 8 giờ 09 phút.",
    };
  };

  const selectedActivity = getDayActivity(selectedDay);

  const checkinRequests = SAMPLE_REQUESTS.filter(
    (r) => r.type === "checkin" || r.type === "late"
  );
  const otRequests = SAMPLE_REQUESTS.filter((r) => r.type === "ot");

  // Filtered History List
  const filteredHistory = SAMPLE_REQUESTS.filter((r) => {
    // Type Filter
    if (historyTypeFilter !== "all" && r.type !== historyTypeFilter) {
      if (historyTypeFilter === "checkin" && r.type !== "checkin" && r.type !== "late") return false;
      if (historyTypeFilter !== "checkin" && r.type !== historyTypeFilter) return false;
    }
    // Status Filter
    if (historyStatusFilter !== "all" && r.status !== historyStatusFilter) return false;
    // Search Filter
    if (
      historySearch.trim() !== "" &&
      !r.id.toLowerCase().includes(historySearch.toLowerCase()) &&
      !r.reason.toLowerCase().includes(historySearch.toLowerCase()) &&
      !r.typeName.toLowerCase().includes(historySearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>CÔNG VIỆC CỦA TÔI</p>
          <h1>Chấm công</h1>
          <span>Theo dõi thời gian làm việc, bổ sung giờ công và tra cứu lịch sử đơn từ.</span>
        </div>
      </div>

      {/* 4 SUB-TABS NAVIGATION BAR */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          borderBottom: "1px solid var(--border-soft)",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActivePageTab("calendar")}
          style={{
            padding: "12px 6px",
            background: "none",
            border: "none",
            borderBottom: activePageTab === "calendar" ? "2px solid var(--brand)" : "2px solid transparent",
            color: activePageTab === "calendar" ? "var(--brand)" : "var(--text-sub)",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s",
          }}
        >
          <Icon name="calendar" size={18} /> Lịch chấm công & Lịch biểu
        </button>

        <button
          onClick={() => setActivePageTab("checkin")}
          style={{
            padding: "12px 6px",
            background: "none",
            border: "none",
            borderBottom: activePageTab === "checkin" ? "2px solid var(--brand)" : "2px solid transparent",
            color: activePageTab === "checkin" ? "var(--brand)" : "var(--text-sub)",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s",
          }}
        >
          <Icon name="edit" size={18} /> Bổ sung giờ công / Đi muộn
        </button>

        <button
          onClick={() => setActivePageTab("ot")}
          style={{
            padding: "12px 6px",
            background: "none",
            border: "none",
            borderBottom: activePageTab === "ot" ? "2px solid var(--brand)" : "2px solid transparent",
            color: activePageTab === "ot" ? "var(--brand)" : "var(--text-sub)",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s",
          }}
        >
          <Icon name="plus" size={18} /> Đăng ký Tăng ca (OT)
        </button>

        <button
          onClick={() => setActivePageTab("history")}
          style={{
            padding: "12px 6px",
            background: "none",
            border: "none",
            borderBottom: activePageTab === "history" ? "2px solid var(--brand)" : "2px solid transparent",
            color: activePageTab === "history" ? "var(--brand)" : "var(--text-sub)",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s",
          }}
        >
          <Icon name="file" size={18} /> Lịch sử đơn từ & Yêu cầu
        </button>
      </div>

      {/* SUB-TAB 1: CALENDAR & METRICS VIEW */}
      {activePageTab === "calendar" && (
        <>
          <div className="metric-row">
            <div>
              <span>Ngày công tháng {currentMonth}</span>
              <strong>
                16,5 <small>/ 22 ngày</small>
              </strong>
              <em className="sparkline" />
            </div>
            <div>
              <span>Thời gian trung bình</span>
              <strong>8h 12m</strong>
              <small>+18 phút so với tháng trước</small>
            </div>
            <div>
              <span>Đi muộn / về sớm</span>
              <strong>
                1 <small>lần</small>
              </strong>
              <small>Đã gửi giải trình</small>
            </div>
            <div>
              <span>Ngày WFH</span>
              <strong>
                3 <small>ngày</small>
              </strong>
              <small>Trong hạn mức</small>
            </div>
          </div>

          {/* Main Calendar Panel */}
          <section className="panel calendar-panel">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <p>LỊCH CHẤM CÔNG</p>
                  <h2 style={{ fontSize: "20px" }}>Lịch làm việc</h2>
                </div>
                <div className="legend">
                  <span>
                    <i className="dot office" /> Văn phòng
                  </span>
                  <span>
                    <i className="dot remote" /> WFH
                  </span>
                  <span>
                    <i className="dot leave" /> Nghỉ phép
                  </span>
                  <span>
                    <i className="dot late" /> Đi muộn
                  </span>
                </div>
              </div>

              {/* Full-width Month Navigation Bar with Buttons at Far Left & Far Right Edges */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 0",
                  borderTop: "1px solid var(--border-soft)",
                }}
              >
                <button
                  title="Tháng trước"
                  onClick={handlePrevMonth}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-soft)",
                    background: "white",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
                    <Icon name="chevron" size={18} />
                  </span>
                </button>

                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                    Tháng {currentMonth}, {currentYear}
                  </h3>
                </div>

                <button
                  title="Tháng sau"
                  onClick={handleNextMonth}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-soft)",
                    background: "white",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ display: "inline-flex" }}>
                    <Icon name="chevron" size={18} />
                  </span>
                </button>
              </div>
            </div>

            <div className="calendar-grid">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                <b key={d}>{d}</b>
              ))}
              {days.map((d) => {
                const act = getDayActivity(d);
                const isWeekend = act.type === "weekend";
                const isSelected = d === selectedDay;
                const isToday = d === 22 && currentMonth === 9;

                return (
                  <div
                    className={`${isToday ? "today" : ""} ${isWeekend ? "weekend" : ""} ${
                      isSelected ? "selected" : ""
                    }`}
                    key={d}
                    onClick={() => setSelectedDay(d)}
                  >
                    <span>{d}</span>
                    {!isWeekend && (
                      <>
                        <i className={act.type} />
                        <small>{act.label}</small>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Selected Day Activity Details */}
          <section className="panel" style={{ marginTop: "16px", padding: "26px" }}>
            <div className="panel-title" style={{ marginBottom: "20px" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px", color: "var(--text-sub)" }}>
                  CHI TIẾT HOẠT ĐỘNG
                </p>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)", marginTop: "4px" }}>
                  Ngày {selectedDay} tháng {currentMonth}, {currentYear}
                </h2>
              </div>
              <Status
                tone={
                  selectedActivity.type === "remote"
                    ? "blue"
                    : selectedActivity.type === "leave"
                    ? "amber"
                    : selectedActivity.type === "late"
                    ? "amber"
                    : selectedActivity.type === "weekend"
                    ? "gray"
                    : "green"
                }
              >
                {selectedActivity.type === "remote"
                  ? "Làm việc từ xa (WFH)"
                  : selectedActivity.type === "leave"
                  ? "Nghỉ phép"
                  : selectedActivity.type === "late"
                  ? "Đi muộn"
                  : selectedActivity.type === "weekend"
                  ? "Ngày nghỉ"
                  : "Có mặt làm việc"}
              </Status>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {/* Left Column: Time & Location */}
              <div
                style={{
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "14px",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "var(--text-main)",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Icon name="clock" size={18} /> Thời gian & Địa điểm
                </h4>
                {selectedActivity.type === "weekend" || selectedActivity.type === "leave" ? (
                  <p style={{ color: "var(--text-sub)", fontSize: "15px", fontWeight: 500, margin: 0 }}>
                    Không có dữ liệu điểm danh trong ngày nghỉ.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "15px", fontWeight: 600 }}>Giờ vào ca:</span>
                      <b style={{ color: "#16a34a", fontSize: "18px", fontWeight: 800 }}>
                        {selectedActivity.checkIn} AM
                      </b>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "15px", fontWeight: 600 }}>Giờ ra ca:</span>
                      <b style={{ color: "#2563eb", fontSize: "18px", fontWeight: 800 }}>
                        {selectedActivity.checkOut} PM
                      </b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "10px",
                        borderTop: "1px dashed #cbd5e1",
                      }}
                    >
                      <span style={{ color: "var(--text-sub)", fontSize: "15px", fontWeight: 600 }}>Vị trí:</span>
                      <b style={{ color: "var(--text-main)", fontSize: "15px", fontWeight: 700 }}>
                        {selectedActivity.location}
                      </b>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Approved WFH Code / Leave Application Code */}
              <div
                style={{
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "14px",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "var(--text-main)",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Icon name="file" size={18} /> Đơn từ & Mã duyệt
                </h4>

                {selectedActivity.type === "remote" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "14px", fontWeight: 600 }}>Mã đơn WFH:</span>
                      <b style={{ color: "#2563eb", fontSize: "17px", fontWeight: 800 }}>
                        #WFH-2026-09{selectedDay < 10 ? "0" + selectedDay : selectedDay}
                      </b>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "14px", fontWeight: 600 }}>Trạng thái:</span>
                      <Status tone="green">Đã phê duyệt</Status>
                    </div>
                    <p style={{ color: "var(--text-sub)", fontSize: "14px", margin: "6px 0 0 0", lineHeight: "1.4" }}>
                      {selectedActivity.detailsNote}
                    </p>
                  </div>
                )}

                {selectedActivity.type === "leave" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "14px", fontWeight: 600 }}>Mã đơn phép:</span>
                      <b style={{ color: "#d97706", fontSize: "17px", fontWeight: 800 }}>
                        #LV-2026-09{selectedDay < 10 ? "0" + selectedDay : selectedDay}
                      </b>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "14px", fontWeight: 600 }}>Trạng thái:</span>
                      <Status tone="green">Đã phê duyệt</Status>
                    </div>
                    <p style={{ color: "var(--text-sub)", fontSize: "14px", margin: "6px 0 0 0", lineHeight: "1.4" }}>
                      {selectedActivity.detailsNote}
                    </p>
                  </div>
                )}

                {selectedActivity.type === "late" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "14px", fontWeight: 600 }}>Mã giải trình:</span>
                      <b style={{ color: "#dc2626", fontSize: "17px", fontWeight: 800 }}>
                        #EX-2026-09{selectedDay < 10 ? "0" + selectedDay : selectedDay}
                      </b>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--text-sub)", fontSize: "14px", fontWeight: 600 }}>Trạng thái:</span>
                      <Status tone="green">Đã chấp nhận</Status>
                    </div>
                    <p style={{ color: "var(--text-sub)", fontSize: "14px", margin: "6px 0 0 0", lineHeight: "1.4" }}>
                      {selectedActivity.detailsNote}
                    </p>
                  </div>
                )}

                {selectedActivity.type === "office" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <b style={{ color: "#16a34a", fontSize: "16px", fontWeight: 800 }}>
                      Ngày làm việc tiêu chuẩn
                    </b>
                    <p style={{ color: "var(--text-sub)", fontSize: "14px", margin: 0 }}>
                      {selectedActivity.detailsNote}
                    </p>
                  </div>
                )}

                {selectedActivity.type === "weekend" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <b style={{ color: "#64748b", fontSize: "16px", fontWeight: 800 }}>
                      Nghỉ hàng tuần
                    </b>
                    <p style={{ color: "var(--text-sub)", fontSize: "14px", margin: 0 }}>
                      {selectedActivity.detailsNote}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button
                className="secondary"
                onClick={() => setActivePageTab("checkin")}
                style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}
              >
                <Icon name="edit" size={16} /> Chuyển sang tab Gửi yêu cầu điều chỉnh
              </button>
            </div>
          </section>
        </>
      )}

      {/* SUB-TAB 2: BỔ SUNG GIỜ CÔNG / ĐI MUỘN FORM & HISTORY */}
      {activePageTab === "checkin" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <section className="panel" style={{ padding: "28px" }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                TẠO ĐƠN MỚI
              </p>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-main)" }}>
                Bổ sung Giờ công & Giải trình đi muộn / về sớm
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Đã nộp đơn bổ sung giờ công / giải trình đi muộn thành công!");
              }}
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Ngày áp dụng <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-09-22"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Loại yêu cầu <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    <option>Quên Check-in giờ vào ca</option>
                    <option>Quên Check-out giờ ra ca</option>
                    <option>Bổ sung cả Check-in & Check-out</option>
                    <option>Giải trình đi muộn / về sớm</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Giờ vào thực tế (Check-in)
                  </label>
                  <input
                    type="time"
                    defaultValue="08:30"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Giờ ra thực tế (Check-out)
                  </label>
                  <input
                    type="time"
                    defaultValue="17:30"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Lý do điều chỉnh <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                  }}
                >
                  <option>Quên bấm máy chấm công</option>
                  <option>Lỗi nhận diện khuôn mặt máy chấm công</option>
                  <option>Gặp khách hàng / Đi công tác ngoài văn phòng</option>
                  <option>Sự cố giao thông kẹt xe nghiêm trọng</option>
                  <option>Lý do cá nhân khác</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Mô tả hoàn cảnh chi tiết
                </label>
                <textarea
                  rows={3}
                  placeholder="Ghi rõ chi tiết lý do hoặc hoàn cảnh công tác..."
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Đính kèm bằng chứng (Vé xe, Hình ảnh, Xác nhận...)
                </label>
                <div
                  style={{
                    border: "2px dashed var(--border-soft)",
                    borderRadius: "10px",
                    padding: "18px",
                    textAlign: "center",
                    background: "#fafbfd",
                    cursor: "pointer",
                  }}
                >
                  <Icon name="file" size={26} />
                  <p style={{ fontSize: "14px", color: "var(--text-sub)", margin: "6px 0 0 0" }}>
                    Kéo thả file vào đây hoặc <span style={{ color: "var(--brand)", fontWeight: 700 }}>Chọn tải ảnh lên</span>
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <button className="primary" type="submit" style={{ padding: "12px 28px", fontSize: "15px", fontWeight: 700 }}>
                  <Icon name="check" /> Nộp đơn bổ sung giờ công
                </button>
              </div>
            </form>
          </section>

          {/* History of Checkin Requests */}
          <section className="panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "16px" }}>
              Lịch sử đơn Bổ sung giờ công & Giải trình ({checkinRequests.length})
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)", fontSize: "13px" }}>
                  <th style={{ padding: "12px 16px" }}>MÃ ĐƠN</th>
                  <th style={{ padding: "12px 16px" }}>LOẠI YÊU CẦU</th>
                  <th style={{ padding: "12px 16px" }}>NGÀY ÁP DỤNG</th>
                  <th style={{ padding: "12px 16px" }}>GIỜ THỰC TẾ</th>
                  <th style={{ padding: "12px 16px" }}>LÝ DO CHI TIẾT</th>
                  <th style={{ padding: "12px 16px" }}>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {checkinRequests.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--brand)" }}>{r.id}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{r.typeName}</td>
                    <td style={{ padding: "14px 16px" }}>{r.date}</td>
                    <td style={{ padding: "14px 16px", color: "#1e40af", fontWeight: 600 }}>{r.details}</td>
                    <td style={{ padding: "14px 16px", color: "var(--text-sub)" }}>{r.reason}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Status tone={r.status === "approved" ? "green" : "amber"}>{r.statusText}</Status>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}

      {/* SUB-TAB 3: ĐĂNG KÝ TĂNG CA (OT) FORM & HISTORY */}
      {activePageTab === "ot" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <section className="panel" style={{ padding: "28px" }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                ĐĂNG KÝ LÀM THÊM GIỜ
              </p>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-main)" }}>
                Đơn đăng ký Tăng ca (Overtime / OT)
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Đã nộp đơn đăng ký Tăng ca (OT) thành công!");
              }}
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Ngày đăng ký tăng ca <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-09-25"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Loại hình tăng ca <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    <option>OT Ngày thường (Hệ số 150%)</option>
                    <option>OT Ngày nghỉ hàng tuần (Hệ số 200%)</option>
                    <option>OT Ngày Lễ / Tết (Hệ số 300%)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Giờ bắt đầu OT <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="time"
                    defaultValue="18:00"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Giờ kết thúc OT <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="time"
                    defaultValue="20:30"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "12px 18px",
                  background: "#eff6ff",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#1d4ed8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Tổng thời gian OT tự động tính toán:</span>
                <b style={{ fontSize: "18px", fontWeight: 800 }}>2,5 giờ OT</b>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Tên dự án / Công việc OT <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đốt tiến độ bàn giao Module HRMS v2.0"
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Nội dung công việc chi tiết trong ca OT
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả cụ thể nhiệm vụ cần hoàn thành trong giờ OT..."
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Phương thức quy đổi / Chi trả <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                  }}
                >
                  <option>Thanh toán lương tăng ca (Chi trả trong kỳ lương)</option>
                  <option>Quy đổi thành ngày nghỉ bù (Comp-off)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <button className="primary" type="submit" style={{ padding: "12px 28px", fontSize: "15px", fontWeight: 700 }}>
                  <Icon name="plus" /> Nộp đơn đăng ký OT
                </button>
              </div>
            </form>
          </section>

          {/* OT Requests History Table */}
          <section className="panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "16px" }}>
              Lịch sử đăng ký Tăng ca (OT) ({otRequests.length})
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)", fontSize: "13px" }}>
                  <th style={{ padding: "12px 16px" }}>MÃ ĐƠN</th>
                  <th style={{ padding: "12px 16px" }}>NGÀY TĂNG CA</th>
                  <th style={{ padding: "12px 16px" }}>KHUNG GIỜ OT</th>
                  <th style={{ padding: "12px 16px" }}>NỘI DUNG / DỰ ÁN</th>
                  <th style={{ padding: "12px 16px" }}>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {otRequests.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--brand)" }}>{r.id}</td>
                    <td style={{ padding: "14px 16px" }}>{r.date}</td>
                    <td style={{ padding: "14px 16px", color: "#1e40af", fontWeight: 700 }}>{r.details}</td>
                    <td style={{ padding: "14px 16px", color: "var(--text-sub)" }}>{r.reason}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Status tone={r.status === "approved" ? "green" : "amber"}>{r.statusText}</Status>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}

      {/* SUB-TAB 4: DEDICATED HISTORY WITH ADVANCED FILTERS */}
      {activePageTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Filter Toolbar Panel */}
          <section className="panel" style={{ padding: "24px" }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                BỘ LỌC TRA CỨU DỮ LIỆU
              </p>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-main)" }}>
                Tra cứu Lịch sử Đơn từ & Yêu cầu
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
                alignItems: "end",
              }}
            >
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Từ ngày
                </label>
                <input
                  type="date"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Đến ngày
                </label>
                <input
                  type="date"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Loại đơn từ
                </label>
                <select
                  value={historyTypeFilter}
                  onChange={(e) => setHistoryTypeFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <option value="all">Tất cả các loại đơn</option>
                  <option value="checkin">Bổ sung giờ công / Đi muộn</option>
                  <option value="ot">Đăng ký Tăng ca (OT)</option>
                  <option value="wfh">Đăng ký WFH</option>
                  <option value="leave">Đơn xin nghỉ phép</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Trạng thái duyệt
                </label>
                <select
                  value={historyStatusFilter}
                  onChange={(e) => setHistoryStatusFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Đang chờ duyệt</option>
                  <option value="approved">Đã phê duyệt</option>
                  <option value="rejected">Bị từ chối</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  Tìm theo từ khóa
                </label>
                <input
                  type="text"
                  placeholder="Mã đơn, lý do..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          </section>

          {/* Filtered History Results Table */}
          <section className="panel" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800 }}>
                Kết quả tra cứu ({filteredHistory.length} đơn từ)
              </h3>
              <button
                className="secondary"
                onClick={() => {
                  setHistoryTypeFilter("all");
                  setHistoryStatusFilter("all");
                  setHistorySearch("");
                }}
                style={{ fontSize: "13px", padding: "6px 14px" }}
              >
                Đặt lại bộ lọc
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)", fontSize: "13px" }}>
                    <th style={{ padding: "12px 16px" }}>MÃ ĐƠN</th>
                    <th style={{ padding: "12px 16px" }}>LOẠI ĐƠN TỪ</th>
                    <th style={{ padding: "12px 16px" }}>NGÀY NỘP ĐƠN</th>
                    <th style={{ padding: "12px 16px" }}>NGÀY ÁP DỤNG</th>
                    <th style={{ padding: "12px 16px" }}>THỜI GIAN / KHUNG GIỜ</th>
                    <th style={{ padding: "12px 16px" }}>LÝ DO / DỰ ÁN CHI TIẾT</th>
                    <th style={{ padding: "12px 16px" }}>TRẠNG THÁI</th>
                    <th style={{ padding: "12px 16px", textAlign: "right" }}>THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", padding: "30px", color: "var(--text-sub)" }}>
                        Không tìm thấy đơn từ nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((r) => (
                      <tr key={r.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--brand)" }}>{r.id}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--text-main)" }}>{r.typeName}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-sub)", fontSize: "13px" }}>{r.submittedDate}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 600 }}>{r.date}</td>
                        <td style={{ padding: "14px 16px", color: "#1e40af", fontWeight: 700 }}>{r.details}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-sub)", maxWidth: "240px" }}>{r.reason}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <Status tone={r.status === "approved" ? "green" : r.status === "pending" ? "amber" : "red"}>
                            {r.statusText}
                          </Status>
                        </td>
                        <td style={{ padding: "14px 16px", textAlign: "right" }}>
                          <button
                            className="secondary"
                            onClick={() => alert(`Xem chi tiết đơn ${r.id}`)}
                            style={{ padding: "6px 12px", fontSize: "13px" }}
                          >
                            Xem
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
