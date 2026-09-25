import { useState, useMemo } from "react";
import { Icon, Status } from "./App";

// ─── Types ─────────────────────────────────────────────
type ApprovalTab = "wfh" | "adjust" | "shift";
type MatrixStatus = "office" | "wfh" | "leave" | "night";

interface WFHReq {
  id: string;
  code: string;
  emp: string;
  init: string;
  cls: string;
  dept: string;
  date: string;
  reason: string;
  submitted: string;
}

interface AdjReq {
  id: string;
  code: string;
  emp: string;
  init: string;
  cls: string;
  date: string;
  correctIn: string;
  correctOut: string;
  reason: string;
  submitted: string;
}

interface ShiftReq {
  id: string;
  code: string;
  emp: string;
  init: string;
  cls: string;
  from: string;
  to: string;
  date: string;
  reason: string;
  submitted: string;
  swapPeer: string;
  peerStatus: "agreed" | "pending";
}

interface OTReq {
  id: string;
  code: string;
  emp: string;
  init: string;
  cls: string;
  jiraTicket: string;
  date: string;
  hours: number;
  reason: string;
  selected?: boolean;
}

interface TeamMember {
  id: string;
  code: string;
  name: string;
  init: string;
  cls: string;
  role: string;
  teamGroup: "Frontend" | "Backend" | "QC" | "Helpdesk";
  schedule: MatrixStatus[]; // 31 days
}

// ─── Seed Data ─────────────────────────────────────────
const INIT_WFH: WFHReq[] = [
  { id: "w1", code: "NV-0101", emp: "Nguyễn Minh Anh", init: "MA", cls: "f3", dept: "Product Design", date: "30/09/2026", reason: "Hoàn thiện prototype cho usability testing – cần tập trung sâu", submitted: "24/09" },
  { id: "w2", code: "NV-0102", emp: "Trần Bảo Linh", init: "BL", cls: "f4", dept: "Frontend Dev", date: "01/10/2026", reason: "Setup môi trường dev mới tại nhà để tránh rủi ro hội nghị", submitted: "24/09" },
  { id: "w3", code: "NV-0103", emp: "Lê Hoàng Khoa", init: "HK", cls: "f5", dept: "Backend Dev", date: "02/10/2026", reason: "Research và viết kỹ thuật về distributed tracing", submitted: "23/09" },
];

const INIT_ADJ: AdjReq[] = [
  { id: "a1", code: "NV-0101", emp: "Nguyễn Minh Anh", init: "MA", cls: "f3", date: "18/09/2026", correctIn: "08:29", correctOut: "17:30", reason: "Quên bấm check-out do họp liên tục đến cuối ngày", submitted: "19/09" },
  { id: "a2", code: "NV-0104", emp: "Phạm Quốc Bảo", init: "QB", cls: "f2", date: "22/09/2026", correctIn: "07:55", correctOut: "17:00", reason: "Check-in ghi nhận muộn do lỗi GPS tại tầng hầm", submitted: "22/09" },
];

const INIT_SHIFT: ShiftReq[] = [
  { id: "s1", code: "NV-0105", emp: "Vũ Thị Thu Hà", init: "TH", cls: "amber", from: "Ca sáng (7:30–16:30)", to: "Ca chiều (12:00–21:00)", date: "27/09/2026", reason: "Chăm con ốm buổi sáng", submitted: "24/09", swapPeer: "Đinh Công Minh (DevOps)", peerStatus: "agreed" },
];

const INIT_OT: OTReq[] = [
  { id: "o1", code: "NV-0102", emp: "Trần Bảo Linh", init: "BL", cls: "f4", jiraTicket: "JIRA-4821: Release Hotfix Payment Gateway", date: "25/09/2026", hours: 2.5, reason: "Hoàn thiện release hotfix trước 22:00 cho đối tác ngân hàng", selected: false },
  { id: "o2", code: "NV-0103", emp: "Lê Hoàng Khoa", init: "HK", cls: "f5", jiraTicket: "JIRA-5012: Deploy Staging DB Migration", date: "26/09/2026", hours: 3.0, reason: "Deploy hệ thống staging và test tải DB cho client demo", selected: false },
  { id: "o3", code: "NV-0104", emp: "Phạm Quốc Bảo", init: "QB", cls: "f2", jiraTicket: "JIRA-5104: Fix CORS & Auth Interceptor", date: "27/09/2026", hours: 2.0, reason: "Sửa lỗi bảo mật token refresh trên iOS client", selected: false },
];

// Generate 31 days for matrix view
const MATRIX_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const FULL_TEAM: TeamMember[] = [
  { id: "t1", code: "NV-0101", name: "Nguyễn Minh Anh", init: "MA", cls: "f3", role: "Product Designer", teamGroup: "Frontend", schedule: ["office", "office", "wfh", "office", "leave", "office", "office", "wfh", "office", "office", "office", "leave", "office", "office", "office", "wfh", "office", "office", "office", "leave", "office", "office", "wfh", "office", "office", "office", "leave", "office", "office", "office", "wfh"] },
  { id: "t2", code: "NV-0102", name: "Trần Bảo Linh", init: "BL", cls: "f4", role: "Frontend Engineer", teamGroup: "Frontend", schedule: ["wfh", "office", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office"] },
  { id: "t3", code: "NV-0103", name: "Lê Hoàng Khoa", init: "HK", cls: "f5", role: "Backend Engineer", teamGroup: "Backend", schedule: ["office", "office", "office", "wfh", "office", "night", "office", "office", "wfh", "office", "office", "night", "office", "office", "wfh", "office", "office", "night", "office", "office", "wfh", "office", "office", "night", "office", "office", "wfh", "office", "office", "night", "office"] },
  { id: "t4", code: "NV-0104", name: "Phạm Quốc Bảo", init: "QB", cls: "f2", role: "Fullstack Dev", teamGroup: "Backend", schedule: ["office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office"] },
  { id: "t5", code: "NV-0105", name: "Vũ Thị Thu Hà", init: "TH", cls: "amber", role: "QA Lead", teamGroup: "QC", schedule: ["office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office", "wfh", "office", "office", "office", "office"] },
  { id: "t6", code: "NV-0106", name: "Đinh Công Minh", init: "CM", cls: "cyan", role: "DevOps Engineer", teamGroup: "Helpdesk", schedule: ["office", "office", "office", "office", "office", "night", "office", "office", "office", "office", "office", "night", "office", "office", "office", "office", "office", "night", "office", "office", "office", "office", "office", "night", "office", "office", "office", "office", "office", "night", "office"] },
  { id: "t7", code: "NV-0107", name: "Hồ Ngọc Liên", init: "NL", cls: "lime", role: "Product Manager", teamGroup: "Frontend", schedule: ["office", "office", "leave", "leave", "leave", "office", "office", "leave", "leave", "leave", "office", "office", "leave", "leave", "leave", "office", "office", "leave", "leave", "leave", "office", "office", "leave", "leave", "leave", "office", "office", "leave", "leave", "leave", "office"] },
];

const WEEKLY_CHART = [
  { day: "Thứ 2", date: "22/09", office: 10, wfh: 3, leave: 2 },
  { day: "Thứ 3", date: "23/09", office: 11, wfh: 3, leave: 1 },
  { day: "Thứ 4", date: "24/09", office: 9, wfh: 5, leave: 1 },
  { day: "Thứ 5", date: "25/09", office: 10, wfh: 4, leave: 1 },
  { day: "Thứ 6", date: "26/09", office: 10, wfh: 3, leave: 2 },
];

const MATRIX_CFG: Record<MatrixStatus, { label: string; cls: string }> = {
  office: { label: "OFF", cls: "m-office" },
  wfh: { label: "WFH", cls: "m-wfh" },
  leave: { label: "OFF-P", cls: "m-leave" },
  night: { label: "NIGHT", cls: "m-night" },
};

const MANAGED_TEAMS_SCOPE = [
  { id: "all", name: "Tất cả Team thuộc quyền quản lý", count: 15 },
  { id: "backend", name: "Dev Team (Backend)", count: 6 },
  { id: "mobile", name: "Mobile Chapter (iOS/Android)", count: 5 },
  { id: "design", name: "UI/UX Design Studio", count: 4 },
];

export default function LeadDashboard() {
  // Approval Tabs
  const [tab, setTab] = useState<ApprovalTab>("wfh");
  const [wfhReqs, setWfhReqs] = useState<WFHReq[]>(INIT_WFH);
  const [adjReqs, setAdjReqs] = useState<AdjReq[]>(INIT_ADJ);
  const [shiftReqs, setShiftReqs] = useState<ShiftReq[]>(INIT_SHIFT);

  // Multi-Team Scope state
  const [activeManagedTeam, setActiveManagedTeam] = useState<string>("all");

  // Reject Modal
  const [rejectCtx, setRejectCtx] = useState<{ id: string; type: ApprovalTab; empName: string } | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // OT Widget
  const [otReqs, setOtReqs] = useState<OTReq[]>(INIT_OT);

  // Matrix Timeline Filters
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>("all");

  // Toast
  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3200);
  };

  // Actions for Approvals
  const approveWFH = (r: WFHReq) => {
    setWfhReqs((prev) => prev.filter((item) => item.id !== r.id));
    toast(`✅ Đã phê duyệt yêu cầu WFH của ${r.emp} (${r.code}) thành công!`);
  };

  const approveAdj = (r: AdjReq) => {
    setAdjReqs((prev) => prev.filter((item) => item.id !== r.id));
    toast(`✅ Đã phê duyệt đơn điều chỉnh chấm công của ${r.emp} (${r.code}) thành công!`);
  };

  const approveShift = (r: ShiftReq) => {
    setShiftReqs((prev) => prev.filter((item) => item.id !== r.id));
    toast(`✅ Đã phê duyệt đơn đổi ca của ${r.emp} (${r.code}) thành công!`);
  };

  const openRejectModal = (id: string, type: ApprovalTab, empName: string) => {
    setRejectCtx({ id, type, empName });
    setRejectReason("");
  };

  const submitReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectCtx) return;
    if (rejectCtx.type === "wfh") setWfhReqs((prev) => prev.filter((r) => r.id !== rejectCtx.id));
    if (rejectCtx.type === "adjust") setAdjReqs((prev) => prev.filter((r) => r.id !== rejectCtx.id));
    if (rejectCtx.type === "shift") setShiftReqs((prev) => prev.filter((r) => r.id !== rejectCtx.id));
    toast(`❌ Đã từ chối yêu cầu của ${rejectCtx.empName} với lý do: "${rejectReason}"`);
    setRejectCtx(null);
  };

  // Actions for OT
  const toggleOtSelect = (id: string) => {
    setOtReqs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const approveSingleOt = (r: OTReq) => {
    setOtReqs((prev) => prev.filter((item) => item.id !== r.id));
    toast(`✅ Đã xác nhận ${r.hours}h OT cho ${r.emp}!`);
  };

  const batchApproveOt = () => {
    const selected = otReqs.filter((r) => r.selected);
    if (selected.length === 0) {
      setOtReqs([]);
      toast("✅ Đã xác nhận phê duyệt toàn bộ đơn Overtime mùa Release!");
      return;
    }
    setOtReqs((prev) => prev.filter((r) => !r.selected));
    toast(`✅ Đã xác nhận phê duyệt hàng loạt cho ${selected.length} đơn Overtime!`);
  };

  // Filtered Matrix Team
  const filteredTeam = useMemo(() => {
    return FULL_TEAM.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.code.toLowerCase().includes(search.toLowerCase());
      const matchGroup = teamFilter === "all" || m.teamGroup === teamFilter;
      return matchSearch && matchGroup;
    });
  }, [search, teamFilter]);

  const totalPendingCount = wfhReqs.length + adjReqs.length + shiftReqs.length;

  return (
    <div className="page lead-dash">
      {/* Header */}
      <div className="page-heading">
        <div>
          <p>MULTI-TEAM MANAGER DASHBOARD · PRODUCT & ENGINEERING</p>
          <h1>Trung tâm quản lý & Phê duyệt Đa Team Kiêm nhiệm</h1>
          <span>Thứ Năm, 25 tháng 9, 2026</span>
        </div>
        {toastMsg && <div className="lead-toast">{toastMsg}</div>}
      </div>

      {/* Multi-Team Selector Bar */}
      <div className="mb-5 p-3.5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl shadow-md border border-blue-700/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/30 border border-blue-400/40 flex items-center justify-center font-bold text-blue-200">
            <Icon name="users" size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Góc nhìn Quản lý Đa Team:</span>
              <span className="text-[10px] bg-blue-500/40 text-blue-100 font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                Ủy quyền 3 Team
              </span>
            </div>
            <p className="text-xs text-blue-100/90 font-medium">Chuyển đổi phạm vi quản lý & phê duyệt đơn từ giữa các team kiêm nhiệm được gán</p>
          </div>
        </div>

        {/* Team Switcher Chips */}
        <div className="flex flex-wrap gap-2">
          {MANAGED_TEAMS_SCOPE.map((team) => {
            const isActive = activeManagedTeam === team.id;
            return (
              <button
                key={team.id}
                type="button"
                onClick={() => {
                  setActiveManagedTeam(team.id);
                  toast(`⚡ Đã chuyển góc nhìn phê duyệt sang: ${team.name}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-white text-blue-900 border-white shadow-lg scale-[1.02]"
                    : "bg-blue-800/60 text-blue-100 border-blue-700/60 hover:bg-blue-800/90"
                }`}
              >
                <span>{team.name}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${isActive ? "bg-blue-100 text-blue-900" : "bg-blue-950/60 text-blue-200"}`}>
                  {team.count} NV
                </span>
              </button>
            );
          })}
        </div>
      </div>


      {/* ─── SECTION 3: Metric Stat Cards (Grid 4 cột Top Dashboard) ──────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        <div className="panel lead-stat-card lsc-brand">
          <div className="lsc-icon lsc-icon-brand">
            <Icon name="users" />
          </div>
          <div>
            <strong>15</strong>
            <span>Tổng nhân sự team</span>
            <small>Product & Engineering</small>
          </div>
        </div>

        <div className="panel lead-stat-card lsc-navy">
          <div className="lsc-icon lsc-icon-navy">
            <Icon name="briefcase" />
          </div>
          <div>
            <strong>10</strong>
            <span>Đang tại Văn phòng</span>
            <small className="text-cyan-600 font-semibold">Tầng 4 · TP.HCM</small>
          </div>
        </div>

        <div className="panel lead-stat-card lsc-teal">
          <div className="lsc-icon lsc-icon-teal">
            <Icon name="laptop" />
          </div>
          <div>
            <strong>4</strong>
            <span>Đang WFH hôm nay</span>
            <small className="text-emerald-600 font-semibold">Đã được duyệt</small>
          </div>
        </div>

        <div className="panel lead-stat-card lsc-amber">
          <div className="lsc-icon lsc-icon-amber">
            <Icon name="bell" />
          </div>
          <div>
            <strong>{totalPendingCount}</strong>
            <span>Yêu cầu chờ xử lý</span>
            <small className="text-amber-600 font-semibold">Cần duyệt hôm nay</small>
          </div>
        </div>
      </div>

      {/* Top Grid: Approval Hub + Stacked Bar Chart */}
      <div className="lead-top-grid">
        {/* ─── SECTION 1: APPROVAL HUB ────────────────────────────────────── */}
        <section className="panel approval-main flex-1">
          <div className="panel-title">
            <div>
              <p>TRUNG TÂM PHÊ DUYỆT</p>
              <h2>Giao diện duyệt Yêu cầu Nhân viên</h2>
            </div>
            {totalPendingCount > 0 && (
              <span className="pending-badge">{totalPendingCount} đơn chờ duyệt</span>
            )}
          </div>

          {/* Tab Bar with Badges */}
          <div className="approval-tabs">
            <button
              type="button"
              className={tab === "wfh" ? "active" : ""}
              onClick={() => setTab("wfh")}
            >
              <Icon name="laptop" size={14} /> Chờ duyệt WFH
              {wfhReqs.length > 0 && <em>{wfhReqs.length}</em>}
            </button>

            <button
              type="button"
              className={tab === "adjust" ? "active" : ""}
              onClick={() => setTab("adjust")}
            >
              <Icon name="clock" size={14} /> Chờ duyệt Điều chỉnh công
              {adjReqs.length > 0 && <em>{adjReqs.length}</em>}
            </button>

            <button
              type="button"
              className={tab === "shift" ? "active" : ""}
              onClick={() => setTab("shift")}
            >
              <Icon name="calendar" size={14} /> Chờ duyệt Đổi ca (Shift Swap)
              {shiftReqs.length > 0 && <em>{shiftReqs.length}</em>}
            </button>
          </div>

          {/* Detailed Approval Table - TAB 1: WFH */}
          {tab === "wfh" && (
            <div className="req-table">
              <div className="req-head req-head-wfh">
                <span>NHÂN VIÊN</span>
                <span>NGÀY ÁP DỤNG</span>
                <span>LÝ DO / MÔ TẢ</span>
                <span>THỜI GIAN GỬI</span>
                <span>HÀNH ĐỘNG</span>
              </div>

              {wfhReqs.length === 0 && (
                <div className="req-empty">
                  <Icon name="check" size={18} /> Không có yêu cầu WFH nào đang chờ duyệt.
                </div>
              )}

              {wfhReqs.map((r) => (
                <div className="req-row req-row-wfh" key={r.id}>
                  <div className="req-emp">
                    <span className={`face ${r.cls}`}>{r.init}</span>
                    <div>
                      <b>{r.emp}</b>
                      <small>{r.code} · {r.dept}</small>
                    </div>
                  </div>

                  <div className="req-date-cell">
                    <b>{r.date}</b>
                  </div>

                  <div className="req-reason" title={r.reason}>
                    {r.reason}
                  </div>

                  <div className="req-sub">{r.submitted}</div>

                  <div className="req-actions">
                    <button
                      type="button"
                      className="approve-btn"
                      onClick={() => approveWFH(r)}
                    >
                      <Icon name="check" size={13} /> Duyệt
                    </button>
                    <button
                      type="button"
                      className="reject-btn"
                      onClick={() => openRejectModal(r.id, "wfh", r.emp)}
                    >
                      <Icon name="close" size={13} /> Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Attendance Adjustment */}
          {tab === "adjust" && (
            <div className="req-table">
              <div className="req-head req-head-adj">
                <span>NHÂN VIÊN</span>
                <span>NGÀY ÁP DỤNG</span>
                <span>GIỜ ĐÚNG</span>
                <span>LÝ DO / MÔ TẢ</span>
                <span>NGÀY GỬI</span>
                <span>HÀNH ĐỘNG</span>
              </div>

              {adjReqs.length === 0 && (
                <div className="req-empty">
                  <Icon name="check" size={18} /> Không có yêu cầu điều chỉnh nào đang chờ.
                </div>
              )}

              {adjReqs.map((r) => (
                <div className="req-row req-row-adj" key={r.id}>
                  <div className="req-emp">
                    <span className={`face ${r.cls}`}>{r.init}</span>
                    <div>
                      <b>{r.emp}</b>
                      <small>{r.code}</small>
                    </div>
                  </div>

                  <div className="req-date-cell">
                    <b>{r.date}</b>
                  </div>

                  <div>
                    <span className="time-badge">{r.correctIn}</span>
                    <span className="time-sep">→</span>
                    <span className="time-badge">{r.correctOut}</span>
                  </div>

                  <div className="req-reason" title={r.reason}>
                    {r.reason}
                  </div>

                  <div className="req-sub">{r.submitted}</div>

                  <div className="req-actions">
                    <button
                      type="button"
                      className="approve-btn"
                      onClick={() => approveAdj(r)}
                    >
                      <Icon name="check" size={13} /> Duyệt
                    </button>
                    <button
                      type="button"
                      className="reject-btn"
                      onClick={() => openRejectModal(r.id, "adjust", r.emp)}
                    >
                      <Icon name="close" size={13} /> Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Shift Swap */}
          {tab === "shift" && (
            <div className="req-table">
              <div className="req-head req-head-shift-new">
                <span>NHÂN VIÊN</span>
                <span>NGÀY ĐỔI</span>
                <span>CA CŨ → CA MỚI</span>
                <span>ĐỒNG NGHIỆP ĐỔI CÙNG</span>
                <span>LÝ DO / MÔ TẢ</span>
                <span>HÀNH ĐỘNG</span>
              </div>

              {shiftReqs.length === 0 && (
                <div className="req-empty">
                  <Icon name="check" size={18} /> Không có yêu cầu đổi ca nào đang chờ.
                </div>
              )}

              {shiftReqs.map((r) => (
                <div className="req-row req-row-shift-new" key={r.id}>
                  <div className="req-emp">
                    <span className={`face ${r.cls}`}>{r.init}</span>
                    <div>
                      <b>{r.emp}</b>
                      <small>{r.code}</small>
                    </div>
                  </div>

                  <div className="req-date-cell">
                    <b>{r.date}</b>
                  </div>

                  <div>
                    <span className="shift-tag old">{r.from}</span>
                    <span className="time-sep">→</span>
                    <span className="shift-tag new">{r.to}</span>
                  </div>

                  <div>
                    <b>{r.swapPeer}</b>
                    <br />
                    {r.peerStatus === "agreed" ? (
                      <span className="tc-status s-office" style={{ fontSize: 9 }}>
                        ✓ Đã đồng ý
                      </span>
                    ) : (
                      <span className="tc-status s-leave" style={{ fontSize: 9 }}>
                        ⏳ Chờ đồng ý
                      </span>
                    )}
                  </div>

                  <div className="req-reason" title={r.reason}>
                    {r.reason}
                  </div>

                  <div className="req-actions">
                    <button
                      type="button"
                      className="approve-btn"
                      onClick={() => approveShift(r)}
                    >
                      <Icon name="check" size={13} /> Duyệt
                    </button>
                    <button
                      type="button"
                      className="reject-btn"
                      onClick={() => openRejectModal(r.id, "shift", r.emp)}
                    >
                      <Icon name="close" size={13} /> Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ─── SECTION 3: WEEKLY ATTENDANCE STACKED BAR CHART ─────────────── */}
        <div className="panel lead-chart-panel">
          <div className="panel-title">
            <div>
              <p>BIỂU ĐỒ TRỰC QUAN</p>
              <h2>Tỷ lệ Chấm công trong Tuần</h2>
            </div>
            <div className="chart-legend">
              <span>
                <i className="dot office" /> VP
              </span>
              <span>
                <i className="dot remote" /> WFH
              </span>
              <span>
                <i className="dot leave" /> Nghỉ
              </span>
            </div>
          </div>

          <div className="attend-chart">
            {WEEKLY_CHART.map((col, idx) => {
              const total = col.office + col.wfh + col.leave;
              const offPct = (col.office / total) * 100;
              const wfhPct = (col.wfh / total) * 100;
              const leavePct = (col.leave / total) * 100;

              return (
                <div className="chart-col group relative" key={idx}>
                  {/* Tooltip Hover */}
                  <div className="absolute -top-12 hidden group-hover:flex flex-col bg-slate-900 text-white text-[10px] p-2 rounded shadow-lg z-20 whitespace-nowrap pointer-events-none">
                    <b>{col.day} ({col.date}):</b>
                    <span>• VP: {col.office} NV</span>
                    <span>• WFH: {col.wfh} NV</span>
                    <span>• Nghỉ: {col.leave} NV</span>
                  </div>

                  <div className="chart-bars cursor-pointer">
                    <div
                      className="chart-bar cb-office"
                      style={{ height: `${offPct}%` }}
                      title={`Văn phòng: ${col.office}`}
                    />
                    <div
                      className="chart-bar cb-wfh"
                      style={{ height: `${wfhPct}%` }}
                      title={`WFH: ${col.wfh}`}
                    />
                    <div
                      className="chart-bar cb-leave"
                      style={{ height: `${leavePct}%` }}
                      title={`Nghỉ phép: ${col.leave}`}
                    />
                  </div>
                  <span className={`chart-label ${idx === 3 ? "chart-today" : ""}`}>
                    {col.day}
                    <br />
                    <small>{col.date}</small>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="chart-numbers">
            {WEEKLY_CHART.map((d, i) => (
              <div key={i} className="chart-num">
                <b className="cn-office">{d.office} VP</b>
                <b className="cn-wfh">{d.wfh} WFH</b>
                <b className="cn-leave">{d.leave} Nghỉ</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: WIDGET XÁC NHẬN OVERTIME (OT Confirmation) ──────── */}
      <section className="panel ot-panel-full mb-5">
        <div className="panel-title">
          <div>
            <p>XÁC NHẬN LÀM THÊM GIỜ</p>
            <h2>Xác nhận Overtime Mùa Release / Fix bug</h2>
          </div>
          <button
            type="button"
            className="primary sm-btn"
            onClick={batchApproveOt}
          >
            <Icon name="check" /> Xác nhận tất cả (Batch Approve)
          </button>
        </div>

        <div className="hr-table-wrap">
          <div className="ot-tbl-head">
            <span>CHỌN</span>
            <span>NHÂN VIÊN</span>
            <span>DỰ ÁN / TICKET JIRA</span>
            <span>NGÀY OT</span>
            <span>SỐ GIỜ OT</span>
            <span>GHI CHÚ CÔNG VIỆC</span>
            <span>HÀNH ĐỘNG</span>
          </div>

          {otReqs.length === 0 && (
            <div className="req-empty">
              <Icon name="check" size={18} /> Không có đơn Overtime nào đang chờ xác nhận.
            </div>
          )}

          {otReqs.map((r) => (
            <div className="ot-tbl-row" key={r.id}>
              <div>
                <input
                  type="checkbox"
                  checked={!!r.selected}
                  onChange={() => toggleOtSelect(r.id)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="req-emp">
                <span className={`face ${r.cls}`}>{r.init}</span>
                <div>
                  <b>{r.emp}</b>
                  <small>{r.code}</small>
                </div>
              </div>

              <div>
                <span className="jira-tag">{r.jiraTicket}</span>
              </div>

              <div>
                <b>{r.date}</b>
              </div>

              <div>
                <b className="text-blue-600 font-extrabold text-sm">{r.hours}h</b> OT
              </div>

              <div className="req-reason" title={r.reason}>
                {r.reason}
              </div>

              <div className="req-actions">
                <button
                  type="button"
                  className="confirm-btn"
                  onClick={() => approveSingleOt(r)}
                >
                  <Icon name="check" size={13} /> Duyệt
                </button>
                <button
                  type="button"
                  className="reject-btn"
                  onClick={() => {
                    setOtReqs((prev) => prev.filter((item) => item.id !== r.id));
                    toast(`❌ Đã từ chối đơn OT của ${r.emp}`);
                  }}
                >
                  <Icon name="close" size={13} /> Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4: DEPARTMENT TIMELINE MATRIX VIEW ─────────────────── */}
      <section className="panel team-cal-panel">
        <div className="panel-title">
          <div>
            <p>MA TRẬN PHÂN CÔNG</p>
            <h2>Lịch làm việc Phòng ban (Department Timeline Matrix)</h2>
          </div>
        </div>

        {/* Toolbar */}
        <div className="cal-filter-row">
          <div className="mini-search" style={{ flex: 1 }}>
            <Icon name="search" />
            <input
              placeholder="Tìm tên nhân viên, mã NV hoặc vị trí..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hr-filter-group">
            <label>Nhóm Team:</label>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="all">Tất cả nhóm (Frontend, Backend, QC, Helpdesk)</option>
              <option value="Frontend">Frontend Team</option>
              <option value="Backend">Backend Team</option>
              <option value="QC">QC / QA Team</option>
              <option value="Helpdesk">Helpdesk / DevOps</option>
            </select>
          </div>

          <div className="cal-legend compact">
            <span>
              <i className="dot office" /> VP (OFF)
            </span>
            <span>
              <i className="dot remote" /> WFH
            </span>
            <span>
              <i className="dot leave" /> Nghỉ (OFF-P)
            </span>
            <span>
              <i className="dot late" /> Đêm (NIGHT)
            </span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="matrix-table-wrap">
          <div className="matrix-header-row">
            <div className="matrix-emp-col">NHÂN VIÊN / VỊ TRÍ</div>
            <div className="matrix-days-container">
              {MATRIX_DAYS.map((dayNum) => (
                <div
                  className={`matrix-day-cell ${dayNum === 25 ? "matrix-today" : ""}`}
                  key={dayNum}
                >
                  <span>Ngày {dayNum}</span>
                </div>
              ))}
            </div>
          </div>

          {filteredTeam.length === 0 && (
            <div className="req-empty">Không tìm thấy nhân viên khớp với bộ lọc.</div>
          )}

          {filteredTeam.map((m) => (
            <div className="matrix-member-row" key={m.id}>
              <div className="matrix-emp-col">
                <span className={`face ${m.cls}`}>{m.init}</span>
                <div>
                  <b>{m.name}</b>
                  <small>{m.code} · {m.role}</small>
                </div>
              </div>

              <div className="matrix-days-container">
                {m.schedule.map((status, di) => {
                  const cfg = MATRIX_CFG[status];
                  return (
                    <div
                      className={`matrix-status-cell ${di === 24 ? "matrix-today-cell" : ""}`}
                      key={di}
                    >
                      <span className={`tc-status ${cfg.cls}`}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Summary Footer Row */}
          <div className="matrix-summary-row">
            <div className="matrix-emp-col font-extrabold text-slate-500 text-xs">
              TỔNG CÔNG KHỎI (VP / WFH)
            </div>
            <div className="matrix-days-container">
              {MATRIX_DAYS.map((d, i) => {
                const dayOfficeCount = filteredTeam.filter(
                  (m) => m.schedule[i] === "office"
                ).length;
                const dayWfhCount = filteredTeam.filter(
                  (m) => m.schedule[i] === "wfh"
                ).length;

                return (
                  <div
                    className={`matrix-summary-cell ${i === 24 ? "matrix-today-cell" : ""}`}
                    key={i}
                  >
                    <span className="text-blue-600 font-bold">{dayOfficeCount} VP</span>
                    <span className="text-teal-600 font-medium">{dayWfhCount} WFH</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODAL: REJECT REASON ───────────────────────────────────────── */}
      {rejectCtx && (
        <div className="modal-backdrop" onMouseDown={() => setRejectCtx(null)}>
          <form
            className="modal"
            onMouseDown={(e) => e.stopPropagation()}
            onSubmit={submitReject}
          >
            <div className="modal-head">
              <div>
                <span className="qa-icon" style={{ background: "#fff0ee", color: "#b64f4f" }}>
                  <Icon name="close" />
                </span>
                <div>
                  <p>TỪ CHỐI YÊU CẦU</p>
                  <h2>Lý do từ chối [{rejectCtx.empName}]</h2>
                </div>
              </div>
              <button type="button" onClick={() => setRejectCtx(null)}>
                <Icon name="close" />
              </button>
            </div>

            <div
              className="policy-ok"
              style={{ background: "#fff8f8", borderColor: "#f5d0d0", color: "#b64f4f" }}
            >
              <Icon name="bell" size={14} />
              <span>
                Hệ thống sẽ tự động gửi thông báo từ chối kèm lý do này đến nhân viên qua ứng dụng.
              </span>
            </div>

            <label>
              Lý do từ chối bắt buộc <span style={{ color: "#e35f55" }}>*</span>
              <textarea
                rows={4}
                placeholder="Ví dụ: Team đang trong giai đoạn Sprint cao điểm, cần đủ nhân sự tại văn phòng để phối hợp release..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                required
                className="field-input block-input"
                style={{ marginTop: 6 }}
              />
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setRejectCtx(null)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="primary"
                style={{ background: "#e35f55", boxShadow: "0 4px 14px #e35f5530" }}
              >
                <Icon name="close" /> Xác nhận từ chối
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
