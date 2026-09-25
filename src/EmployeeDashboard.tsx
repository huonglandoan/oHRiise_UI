import { useState, useEffect } from "react";
import { Icon, Status } from "./App";

// ─── Types ───────────────────────────────────────────────────────
type WorkMode = "office" | "wfh";
type ReqStatus = "pending" | "approved" | "rejected";
type LogTab = "log" | "history";

interface WFHEntry { id:string; date:string; displayDate:string; reason:string; status:ReqStatus; submitted:string; }
interface AttendLog { dateKey:string; label:string; inTime:string|null; outTime:string|null; mode:WorkMode; note:string; }
interface AdjReq { id:string; date:string; correctIn:string; correctOut:string; reason:string; status:ReqStatus; submitted:string; }

// ─── Helpers ─────────────────────────────────────────────────────
function pad(n:number) { return n.toString().padStart(2,"0"); }
function fmtClock(d:Date) { return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; }
function fmtHHMM(d:Date)  { return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function fmtFull(d:Date) {
  const days=["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
  const mons=["tháng 1","tháng 2","tháng 3","tháng 4","tháng 5","tháng 6","tháng 7","tháng 8","tháng 9","tháng 10","tháng 11","tháng 12"];
  return `${days[d.getDay()]}, ${d.getDate()} ${mons[d.getMonth()]} ${d.getFullYear()}`;
}
function isoDisplay(iso:string) { if(!iso) return ""; const d=new Date(iso+"T00:00:00"); return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`; }
function sTone(s:ReqStatus):"amber"|"green"|"red" { return s==="pending"?"amber":s==="approved"?"green":"red"; }
function sLabel(s:ReqStatus) { return s==="pending"?"Chờ duyệt":s==="approved"?"Đã duyệt":"Từ chối"; }

// ─── Seed Data ────────────────────────────────────────────────────
const INIT_WFH:WFHEntry[] = [
  {id:"w1",date:"2026-09-25",displayDate:"25/09",reason:"Hoàn thiện prototype cho usability testing",status:"approved",submitted:"23/09"},
  {id:"w2",date:"2026-09-30",displayDate:"30/09",reason:"Design system documentation",status:"pending",submitted:"24/09"},
  {id:"w3",date:"2026-09-18",displayDate:"18/09",reason:"Sprint design review",status:"approved",submitted:"16/09"},
  {id:"w4",date:"2026-09-11",displayDate:"11/09",reason:"Research synthesis",status:"rejected",submitted:"09/09"},
];
const INIT_LOGS:AttendLog[] = [
  {dateKey:"2026-09-22",label:"T3, 22/09",inTime:"08:34",outTime:null,   mode:"office",note:"Đang làm việc"},
  {dateKey:"2026-09-19",label:"T6, 19/09",inTime:"08:31",outTime:"17:45",mode:"office",note:""},
  {dateKey:"2026-09-18",label:"T5, 18/09",inTime:"08:29",outTime:null,   mode:"wfh",  note:"Thiếu checkout"},
  {dateKey:"2026-09-17",label:"T4, 17/09",inTime:"08:42",outTime:"17:38",mode:"office",note:""},
  {dateKey:"2026-09-16",label:"T3, 16/09",inTime:"08:55",outTime:"17:30",mode:"office",note:"Đi muộn"},
  {dateKey:"2026-09-15",label:"T2, 15/09",inTime:null,   outTime:null,   mode:"office",note:"Nghỉ ốm"},
];
const INIT_ADJ:AdjReq[] = [
  {id:"a1",date:"18/09/2026",correctIn:"08:29",correctOut:"17:30",reason:"Quên bấm check-out do họp liên tục cuối ngày",status:"pending",submitted:"19/09"},
];

// ─── Component ────────────────────────────────────────────────────
export default function EmployeeDashboard() {
  const [now, setNow]             = useState(new Date());
  useEffect(() => { const t=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(t); },[]);

  // Check-in/out
  const [workMode, setWorkMode]       = useState<WorkMode>("office");
  const [checkInTime, setCheckInTime] = useState<string|null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string|null>(null);
  const [checkInMode, setCheckInMode] = useState<WorkMode>("office");
  const doCheckIn  = () => { setCheckInTime(fmtHHMM(new Date())); setCheckInMode(workMode); setCheckOutTime(null); };
  const doCheckOut = () => setCheckOutTime(fmtHHMM(new Date()));

  // WFH form
  const [wfhDate, setWfhDate]     = useState("");
  const [wfhReason, setWfhReason] = useState("");
  const [wfhList, setWfhList]     = useState<WFHEntry[]>(INIT_WFH);
  const [wfhFlash, setWfhFlash]   = useState(false);
  const handleWFHSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(!wfhDate) return;
    const entry:WFHEntry = { id:`w${Date.now()}`, date:wfhDate, displayDate:isoDisplay(wfhDate).slice(0,5), reason:wfhReason.trim()||"Không có lý do cụ thể", status:"pending", submitted:`${pad(new Date().getDate())}/${pad(new Date().getMonth()+1)}` };
    setWfhList(p=>[entry,...p]); setWfhFlash(true); setWfhDate(""); setWfhReason("");
    setTimeout(()=>setWfhFlash(false),3500);
  };
  const cancelWFH=(id:string)=>setWfhList(p=>p.filter(w=>w.id!==id));

  // Attendance log
  const [logTab, setLogTab] = useState<LogTab>("log");
  const [adjReqs, setAdjReqs] = useState<AdjReq[]>(INIT_ADJ);
  const pendingAdj = adjReqs.filter(r=>r.status==="pending").length;

  // Adjustment modal
  const [adjOpen, setAdjOpen]   = useState(false);
  const [adjDone, setAdjDone]   = useState(false);
  const [adjDate, setAdjDate]   = useState("");
  const [adjIn, setAdjIn]       = useState("");
  const [adjOut, setAdjOut]     = useState("");
  const [adjReason, setAdjReason] = useState("");
  const openAdj=(log?:AttendLog)=>{ setAdjDate(log?.dateKey??""); setAdjIn(log?.inTime??""); setAdjOut(log?.outTime??""); setAdjReason(""); setAdjDone(false); setAdjOpen(true); };
  const handleAdjSubmit=(e:React.FormEvent)=>{ e.preventDefault(); const req:AdjReq={id:`a${Date.now()}`,date:isoDisplay(adjDate),correctIn:adjIn,correctOut:adjOut,reason:adjReason,status:"pending",submitted:`${pad(new Date().getDate())}/${pad(new Date().getMonth()+1)}`}; setAdjReqs(p=>[req,...p]); setAdjDone(true); setTimeout(()=>{setAdjOpen(false);setAdjDone(false);},2200); };

  // Calendar & Daily Report modals
  const [calOpen, setCalOpen] = useState(false);
  const [drOpen, setDrOpen]   = useState(false);
  const [drDate, setDrDate]   = useState("");

  useEffect(()=>{ const fn=(e:KeyboardEvent)=>{ if(e.key==="Escape"){setAdjOpen(false);setCalOpen(false);setDrOpen(false);} }; window.addEventListener("keydown",fn); return ()=>window.removeEventListener("keydown",fn); },[]);

  // Calendar data
  const Y=2026,M=8;
  const daysInMonth=new Date(Y,M+1,0).getDate();
  const rawFirst=new Date(Y,M,1).getDay();
  const blanks=rawFirst===0?6:rawFirst-1;
  const logMap:Record<string,AttendLog>={};
  INIT_LOGS.forEach(l=>{ logMap[l.dateKey]=l; });
  const todayISO=`${Y}-09-22`;

  return (
    <div className="page emp-dash">

      {/* Page heading */}
      <div className="page-heading">
        <div>
          <p>NHÂN VIÊN · HỒ CHÍ MINH</p>
          <h1>Tổng quan của tôi</h1>
          <span>{fmtFull(now)}</span>
        </div>
        <button className="secondary" onClick={()=>setCalOpen(true)} type="button">
          <Icon name="calendar"/> Xem lịch tháng
        </button>
      </div>

      {/* ── SECTION 1: CHECK-IN ──────────────────────── */}
      <section className="ci-section">
        <div className="ci-card">
          {/* Header */}
          <div className="ci-header">
            <div className="ci-header-left">
              <p>CHẤM CÔNG HÔM NAY</p>
              <div className="ci-clock">{fmtClock(now)}</div>
              <div className="ci-date">{fmtFull(now)}</div>
            </div>
            {checkInTime && (
              <div className="ci-status-pill">
                <Icon name="check" size={13}/>
                <span>Check-in <b>{checkInTime}</b> · {checkInMode==="office"?"📍 Văn phòng":"🏠 WFH"}{checkOutTime&&<> → Check-out <b>{checkOutTime}</b></>}</span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="ci-body">
            {!checkInTime && (
              <div className="ci-mode-row">
                <span className="ci-mode-label">Hình thức làm việc</span>
                <div className="ci-mode-toggle">
                  <button type="button" className={workMode==="office"?"active":""} onClick={()=>setWorkMode("office")}>
                    <Icon name="briefcase" size={14}/> Tại văn phòng
                  </button>
                  <button type="button" className={workMode==="wfh"?"active":""} onClick={()=>setWorkMode("wfh")}>
                    <Icon name="laptop" size={14}/> Làm việc từ xa
                  </button>
                </div>
              </div>
            )}

            {!checkInTime && (
              <button className="ci-big-btn ci-color-in" onClick={doCheckIn} type="button">
                <span className="ci-big-icon"><Icon name="arrow" size={24}/></span>
                <span><b>CHECK IN</b><small>Bắt đầu ngày làm việc</small></span>
              </button>
            )}

            {checkInTime && !checkOutTime && (
              <div className="ci-active-state">
                <div className="ci-active-pill">
                  <Icon name="check" size={13}/>
                  Check-in lúc <b>{checkInTime}</b> · {checkInMode==="office"?"📍 Văn phòng HCM":"🏠 WFH"}
                </div>
                <button className="ci-big-btn ci-color-out" onClick={doCheckOut} type="button">
                  <span className="ci-big-icon"><Icon name="logout" size={22}/></span>
                  <span><b>CHECK OUT</b><small>Kết thúc ngày làm việc</small></span>
                </button>
              </div>
            )}

            {checkInTime && checkOutTime && (
              <div className="ci-done-state">
                <div className="ci-done-mark"><Icon name="check" size={24}/></div>
                <div>
                  <b>Hoàn tất ngày làm việc</b>
                  <span>{checkInTime} → {checkOutTime} · {checkInMode==="office"?"Văn phòng HCM":"WFH"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Work meta */}
          {checkInTime && (
            <div className="ci-meta">
              <span><Icon name="clock" size={13}/> Vào: <b>{checkInTime}</b></span>
              {checkOutTime && <span><Icon name="logout" size={13}/> Ra: <b>{checkOutTime}</b></span>}
              <span><Icon name={checkInMode==="office"?"briefcase":"laptop"} size={13}/> {checkInMode==="office"?"Văn phòng HCM":"Làm việc từ xa"}</span>
              <span><Icon name="shield" size={13}/> GPS đã xác thực</span>
            </div>
          )}
        </div>

        {/* Stat cards */}
        <div className="ci-stats">
          {[
            {label:"Ngày công T9",val:"16,5",sub:"/ 22 ngày",pct:75,color:"brand"},
            {label:"WFH đã dùng", val:"3",   sub:"/ 6 ngày", pct:50,color:"teal"},
            {label:"Phép còn lại",val:"8,5", sub:"ngày",     pct:71,color:"lime"},
            {label:"Đi muộn T9", val:"1",   sub:"lần",      pct:10,color:"red"},
          ].map(s=>(
            <div className="ci-stat-card" key={s.label}>
              <span className="cs-label">{s.label}</span>
              <strong>{s.val}</strong>
              <small>{s.sub}</small>
              <div className={`cs-track cs-${s.color}`}><i style={{width:`${s.pct}%`}}/></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTIONS 2 + 3: WFH ─────────────────────── */}
      <div className="wfh-grid">

        {/* Form */}
        <section className="panel wfh-form-panel">
          <div className="panel-title">
            <div><p>ĐĂNG KÝ MỚI</p><h2>Đăng ký WFH</h2></div>
            <span className="quota-badge">Còn 3 ngày / tháng</span>
          </div>

          {wfhFlash ? (
            <div className="wfh-flash">
              <div className="flash-mark"><Icon name="check" size={18}/></div>
              <div><b>Đã gửi yêu cầu thành công!</b><span>Trần Hoàng Nam sẽ phê duyệt trong 24 giờ.</span></div>
            </div>
          ) : (
            <form className="wfh-form" onSubmit={handleWFHSubmit}>
              <label>Ngày WFH
                <input className="field-input" type="date" value={wfhDate} onChange={e=>setWfhDate(e.target.value)} min={new Date().toISOString().split("T")[0]} required/>
              </label>
              <label>Lý do <span className="opt-tag">(tuỳ chọn)</span>
                <textarea rows={3} placeholder="Mô tả ngắn để người duyệt có đủ ngữ cảnh..." value={wfhReason} onChange={e=>setWfhReason(e.target.value)}/>
              </label>
              <div className="policy-ok">
                <Icon name="shield" size={14}/>
                <span>Đủ điều kiện · Tối đa 2 ngày/tuần · Báo trước ≥ 24 giờ</span>
              </div>
              <button type="submit" className="primary wide"><Icon name="arrow"/> Gửi yêu cầu WFH</button>
            </form>
          )}

          {/* Daily Report reminder */}
          <div className="dr-reminder">
            <div className="dr-reminder-head"><Icon name="file" size={14}/><b>Nhắc nhở: Daily Report</b></div>
            <p>Với mỗi ngày WFH, bạn cần nộp <strong>Daily Report</strong> trước 18:00 cùng ngày. Báo cáo phải ghi nhận để hoàn tất phiên WFH.</p>
            <button type="button" className="dr-btn" onClick={()=>{setDrDate(wfhDate||todayISO);setDrOpen(true);}}>
              <Icon name="plus" size={13}/> Tạo Daily Report
            </button>
          </div>
        </section>

        {/* WFH List */}
        <section className="panel wfh-list-panel">
          <div className="panel-title">
            <div><p>QUẢN LÝ</p><h2>Các đăng ký WFH</h2></div>
            <span className="list-tag">{wfhList.length} yêu cầu</span>
          </div>
          <div className="wfh-tbl">
            <div className="wfh-tbl-head"><span>NGÀY</span><span>LÝ DO</span><span>TRẠNG THÁI</span><span></span></div>
            {wfhList.map(w=>(
              <div className="wfh-tbl-row" key={w.id}>
                <div className="wfh-date-cell"><b>{w.displayDate}</b><small>Gửi {w.submitted}</small></div>
                <div className="wfh-reason-cell" title={w.reason}>{w.reason.length>45?w.reason.slice(0,45)+"…":w.reason}</div>
                <div><Status tone={sTone(w.status)}>{sLabel(w.status)}</Status></div>
                <div>{w.status==="pending"&&<button className="tbl-icon-btn red-icon" title="Hủy" type="button" onClick={()=>cancelWFH(w.id)}><Icon name="close" size={14}/></button>}</div>
              </div>
            ))}
            {wfhList.length===0&&<div className="tbl-empty">Chưa có đăng ký WFH nào.</div>}
          </div>
        </section>
      </div>

      {/* ── SECTION 4: ATTENDANCE LOG ────────────────── */}
      <section className="panel att-panel">
        <div className="panel-title">
          <div><p>CHẤM CÔNG</p><h2>Nhật ký &amp; Điều chỉnh</h2></div>
          <div className="att-actions">
            <button className="secondary sm" type="button" onClick={()=>setCalOpen(true)}><Icon name="calendar" size={14}/> Xem lịch tháng</button>
            <button className="primary sm" type="button" onClick={()=>openAdj()}><Icon name="plus" size={14}/> Yêu cầu điều chỉnh</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="att-tabs">
          <button type="button" className={logTab==="log"?"active":""} onClick={()=>setLogTab("log")}>Nhật ký chấm công</button>
          <button type="button" className={logTab==="history"?"active":""} onClick={()=>setLogTab("history")}>
            Lịch sử điều chỉnh {pendingAdj>0&&<em>{pendingAdj}</em>}
          </button>
        </div>

        {/* Log table */}
        {logTab==="log" && (
          <div className="att-tbl">
            <div className="att-tbl-head"><span>NGÀY</span><span>GIỜ VÀO</span><span>GIỜ RA</span><span>HÌNH THỨC</span><span>GHI CHÚ</span><span></span></div>
            {INIT_LOGS.map(l=>{
              const isWarn=l.note==="Thiếu checkout"||l.note==="Đi muộn";
              return (
                <div className={`att-tbl-row${isWarn?" row-warn":""}`} key={l.dateKey}>
                  <span className="att-date-cell"><b>{l.label}</b></span>
                  <span>{l.inTime??<span className="no-val">—</span>}</span>
                  <span>{l.outTime?l.outTime:l.note==="Thiếu checkout"?<span className="miss-tag">Thiếu</span>:<span className="no-val">—</span>}</span>
                  <span>{l.inTime?<span className={`mode-badge ${l.mode}`}>{l.mode==="office"?"Văn phòng":"WFH"}</span>:<span className="no-val">—</span>}</span>
                  <span className={`att-note${isWarn?" note-warn":""}`}>{l.note||"—"}</span>
                  <span>{isWarn&&<button className="adj-link" type="button" onClick={()=>openAdj(l)}>Điều chỉnh</button>}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* History table */}
        {logTab==="history" && (
          <div className="att-tbl">
            <div className="att-tbl-head att-hist-cols"><span>NGÀY</span><span>GIỜ VÀO ĐÚNG</span><span>GIỜ RA ĐÚNG</span><span>LÝ DO</span><span>TRẠNG THÁI</span><span>GỬI LÚC</span></div>
            {adjReqs.length===0&&<div className="tbl-empty">Chưa có yêu cầu điều chỉnh nào.</div>}
            {adjReqs.map(r=>(
              <div className="att-tbl-row att-hist-cols" key={r.id}>
                <span><b>{r.date}</b></span>
                <span>{r.correctIn}</span>
                <span>{r.correctOut}</span>
                <span className="att-note" title={r.reason}>{r.reason.length>40?r.reason.slice(0,40)+"…":r.reason}</span>
                <span><Status tone={sTone(r.status)}>{sLabel(r.status)}</Status></span>
                <span className="att-note">{r.submitted}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── MODAL: ADJUSTMENT ────────────────────────── */}
      {adjOpen&&(
        <div className="modal-backdrop" onMouseDown={()=>{if(!adjDone)setAdjOpen(false);}}>
          <form className="modal" onMouseDown={e=>e.stopPropagation()} onSubmit={handleAdjSubmit}>
            <div className="modal-head">
              <div><span className="qa-icon amber"><Icon name="clock"/></span><div><p>ĐIỀU CHỈNH CHẤM CÔNG</p><h2>Yêu cầu chỉnh sửa</h2></div></div>
              {!adjDone&&<button type="button" onClick={()=>setAdjOpen(false)}><Icon name="close"/></button>}
            </div>
            {adjDone ? (
              <div className="modal-success">
                <div className="success-mark"><Icon name="check" size={28}/></div>
                <h3>Đã gửi yêu cầu!</h3>
                <p>Team Lead sẽ xem xét và phê duyệt trong vòng 24 giờ.</p>
              </div>
            ) : (
              <>
                <label>Ngày cần điều chỉnh
                  <input className="field-input block-input" type="date" value={adjDate} onChange={e=>setAdjDate(e.target.value)} required/>
                </label>
                <div className="form-row">
                  <label>Giờ vào đúng<input className="field-input block-input" type="time" value={adjIn} onChange={e=>setAdjIn(e.target.value)} required/></label>
                  <label>Giờ ra đúng<input className="field-input block-input" type="time" value={adjOut} onChange={e=>setAdjOut(e.target.value)} required/></label>
                </div>
                <label>Lý do điều chỉnh
                  <textarea placeholder="Giải thích ngắn gọn (vd: Quên bấm check-out do họp liên tục)..." value={adjReason} onChange={e=>setAdjReason(e.target.value)} required/>
                </label>
                <div className="modal-actions">
                  <button type="button" className="secondary" onClick={()=>setAdjOpen(false)}>Hủy</button>
                  <button type="submit" className="primary"><Icon name="arrow"/> Gửi yêu cầu</button>
                </div>
              </>
            )}
          </form>
        </div>
      )}

      {/* ── MODAL: MONTHLY CALENDAR ──────────────────── */}
      {calOpen&&(
        <div className="modal-backdrop" onMouseDown={()=>setCalOpen(false)}>
          <div className="modal cal-modal" onMouseDown={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div><p>ĐIỂM DANH</p><h2>Lịch chấm công — Tháng 9, 2026</h2></div>
              <button type="button" onClick={()=>setCalOpen(false)}><Icon name="close"/></button>
            </div>
            <div className="cal-legend">
              <span><i className="dot office"/>Văn phòng</span>
              <span><i className="dot remote"/>WFH</span>
              <span><i className="dot leave"/>Nghỉ phép</span>
              <span><i className="dot late"/>Đi muộn / Thiếu</span>
            </div>
            <div className="cal-grid-modal">
              {["T2","T3","T4","T5","T6","T7","CN"].map(d=><b key={d}>{d}</b>)}
              {Array.from({length:blanks},(_,i)=><div key={`b${i}`} className="cal-blank"/>)}
              {Array.from({length:daysInMonth},(_,i)=>{
                const day=i+1;
                const key=`${Y}-${pad(M+1)}-${pad(day)}`;
                const log=logMap[key];
                const dow=new Date(Y,M,day).getDay();
                const isWknd=dow===0||dow===6;
                const isToday=day===22;
                const hasIssue=log?.note==="Thiếu checkout"||log?.note==="Đi muộn";
                const dotCls=!log||(!log.inTime&&!isWknd)?"leave":hasIssue?"late":log.mode==="wfh"?"remote":"office";
                return (
                  <div key={day} className={`cal-day-tile${isWknd?" wknd":""}${isToday?" today":""}${hasIssue?" has-issue":""}`}>
                    <span>{day}</span>
                    {!isWknd&&<i className={`dot ${dotCls}`}/>}
                    {log?.inTime&&<small>{hasIssue?log.note==="Thiếu checkout"?"Thiếu OUT":"Muộn":log.outTime?`${log.inTime}–${log.outTime}`:log.inTime}</small>}
                    {!isWknd&&!log&&<small className="no-val">—</small>}
                  </div>
                );
              })}
            </div>
            <div className="cal-summary">
              {[{val:"16,5",label:"Ngày công"},{val:"3",label:"Ngày WFH"},{val:"1",label:"Nghỉ phép"},{val:"2",label:"Đi muộn / Thiếu"}].map(s=>(
                <div key={s.label}><strong>{s.val}</strong><span>{s.label}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: DAILY REPORT ──────────────────────── */}
      {drOpen&&(
        <div className="modal-backdrop" onMouseDown={()=>setDrOpen(false)}>
          <form className="modal" onMouseDown={e=>e.stopPropagation()} onSubmit={e=>{e.preventDefault();setDrOpen(false);}}>
            <div className="modal-head">
              <div><span className="qa-icon blue"><Icon name="file"/></span><div><p>BÁO CÁO NGÀY — WFH</p><h2>Daily Report</h2></div></div>
              <button type="button" onClick={()=>setDrOpen(false)}><Icon name="close"/></button>
            </div>
            <label>Ngày báo cáo<input className="field-input block-input" type="date" value={drDate} onChange={e=>setDrDate(e.target.value)} required/></label>
            <label>Công việc đã hoàn thành<textarea rows={4} placeholder={"- Hoàn thiện wireframe màn hình X\n- Họp Engineering về API spec\n- Review design system tokens"} required/></label>
            <label>Kế hoạch ngày mai<textarea rows={3} placeholder="- Tiếp tục prototype flow thanh toán..."/></label>
            <label>Ghi chú / Cần hỗ trợ <span className="opt-tag">(tuỳ chọn)</span><textarea rows={2} placeholder="Blocker, cần review từ team..."/></label>
            <div className="dr-policy-note"><Icon name="clock" size={13}/><span>Hạn nộp: trước <b>18:00</b> ngày WFH</span></div>
            <div className="modal-actions">
              <button type="button" className="secondary" onClick={()=>setDrOpen(false)}>Hủy</button>
              <button type="submit" className="primary"><Icon name="arrow"/> Gửi Daily Report</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
