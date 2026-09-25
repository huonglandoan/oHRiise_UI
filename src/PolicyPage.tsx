import { useState } from "react";
import { Icon, Status } from "./App";

type PolicyTab = "attendance" | "wfh_leave" | "expense";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState<PolicyTab>("attendance");
  const [toastMsg, setToastMsg]     = useState("");
  const [isSaving, setIsSaving]     = useState(false);

  // ─── TAB 1 STATES: Attendance & GPS ───────────────────────────
  const [flexCore, setFlexCore]           = useState(true);
  const [coreStart, setCoreStart]         = useState("10:00");
  const [coreEnd, setCoreEnd]             = useState("16:00");
  const [graceMinutes, setGraceMinutes]   = useState(15);

  const [forgetCheckOut, setForgetCheckOut] = useState("adjustment_alert");
  const [autoLock, setAutoLock]             = useState(true);
  const [lockDay, setLockDay]               = useState(15);

  const [wifiList, setWifiList]           = useState<string[]>([
    "118.69.182.42 (Public IP Tầng 4 · TP.HCM)",
    "a4:cf:99:21:8b:01 (BSSID Wi-Fi Main Office)",
    "14.232.208.99 (Public IP Hà Nội Office)",
  ]);
  const [newWifi, setNewWifi]             = useState("");
  const [gpsRadius, setGpsRadius]         = useState(100);

  // ─── TAB 2 STATES: WFH & Leave ────────────────────────────────
  const [maxWfhDays, setMaxWfhDays]       = useState(4);
  const [requireDailyReport, setRequireDailyReport] = useState(true);
  const [requireLeadApproval, setRequireLeadApproval] = useState(true);
  const [leadNoticeHours, setLeadNoticeHours] = useState(24);

  const [otWeekdayRatio, setOtWeekdayRatio] = useState("1.0");
  const [otWeekendRatio, setOtWeekendRatio] = useState("2.0");

  // ─── TAB 3 STATES: Expense Thresholds ─────────────────────────
  const [licenseLimit, setLicenseLimit]   = useState(2000000);
  const [level1Approver, setLevel1Approver] = useState("Team Lead Direct Manager");
  const [level2Approver, setLevel2Approver] = useState("HR Branch Manager");
  const [level3Approver, setLevel3Approver] = useState("HR Head / CFO");

  // Save handler
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMsg("✅ Đã cập nhật và áp dụng Chính sách HR mới thành công!");
      setTimeout(() => setToastMsg(""), 3500);
    }, 800);
  };

  const addWifi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWifi.trim()) return;
    setWifiList((prev) => [...prev, newWifi.trim()]);
    setNewWifi("");
  };

  const removeWifi = (index: number) => {
    setWifiList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="page inner-page policy-page">
      {/* Heading */}
      <div className="page-heading">
        <div>
          <p>HR BUSINESS RULES & COMPLIANCE</p>
          <h1>Cấu hình Chính sách & Quy định HR</h1>
          <span>
            Thiết lập quy tắc nghiệp vụ chấm công, hạn mức WFH, quy đổi OT và quy trình duyệt chi phí.
          </span>
        </div>
        <div className="heading-actions">
          {toastMsg && <div className="lead-toast">{toastMsg}</div>}
          <button
            type="button"
            className="primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Icon name="check" /> {isSaving ? "Đang lưu..." : "Lưu thay đổi chính sách"}
          </button>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="policy-tabs-bar">
        <button
          type="button"
          className={activeTab === "attendance" ? "active" : ""}
          onClick={() => setActiveTab("attendance")}
        >
          <Icon name="clock" />
          <div>
            <b>1. Quy định Chấm công & Geoforcing</b>
            <small>Giờ linh hoạt, xử lý vi phạm, GPS & Wi-Fi</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "wfh_leave" ? "active" : ""}
          onClick={() => setActiveTab("wfh_leave")}
        >
          <Icon name="laptop" />
          <div>
            <b>2. Chính sách WFH & Nghỉ phép</b>
            <small>Hạn mức WFH, Daily Report & Quy đổi OT</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "expense" ? "active" : ""}
          onClick={() => setActiveTab("expense")}
        >
          <Icon name="receipt" />
          <div>
            <b>3. Quy trình Duyệt Chi phí</b>
            <small>Hạn mức mua License, chứng chỉ & Cấp phê duyệt</small>
          </div>
        </button>
      </div>

      {/* ─── TAB 1: ATTENDANCE & GPS RULES ───────────────────────────────── */}
      {activeTab === "attendance" && (
        <div className="policy-tab-content fade-in">
          {/* Card 1: Working Hours Rules */}
          <section className="panel policy-card">
            <div className="panel-title">
              <div>
                <p>THỜI GIAN LÀM VIỆC</p>
                <h2>1.1. Quy định Giờ làm việc & Khung giờ lõi</h2>
              </div>
              <Status tone="green">Đang áp dụng</Status>
            </div>

            <div className="policy-form-grid">
              <div className="toggle-row">
                <div>
                  <b>Áp dụng Giờ linh hoạt (Flexible Core Hours)</b>
                  <span>
                    Cho phép nhân viên tự chọn giờ check-in từ 07:30 đến 10:00, miễn bảo đảm khung giờ bắt buộc có mặt.
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={flexCore}
                    onChange={(e) => setFlexCore(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>

              {flexCore && (
                <div className="form-sub-box">
                  <div className="form-row">
                    <label>
                      Bắt đầu giờ lõi (Core Hours From)
                      <div className="field">
                        <Icon name="clock" />
                        <input
                          type="time"
                          value={coreStart}
                          onChange={(e) => setCoreStart(e.target.value)}
                        />
                      </div>
                    </label>

                    <label>
                      Kết thúc giờ lõi (Core Hours To)
                      <div className="field">
                        <Icon name="clock" />
                        <input
                          type="time"
                          value={coreEnd}
                          onChange={(e) => setCoreEnd(e.target.value)}
                        />
                      </div>
                    </label>
                  </div>
                  <small className="help-text">
                    📍 Nhân viên bắt buộc phải có mặt trực tuyến hoặc tại văn phòng từ{" "}
                    <b>{coreStart}</b> đến <b>{coreEnd}</b> hàng ngày.
                  </small>
                </div>
              )}

              <div className="form-row-single" style={{ marginTop: 14 }}>
                <label>
                  Số phút cho phép đi trễ không phạt (Grace Period)
                  <div className="field-with-unit">
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={graceMinutes}
                      onChange={(e) => setGraceMinutes(Number(e.target.value))}
                      className="field-input"
                    />
                    <span className="unit">phút / lần</span>
                  </div>
                  <small className="help-text">
                    Check-in trong vòng {graceMinutes} phút đầu giờ làm việc sẽ không bị ghi nhận phạt trừ công.
                  </small>
                </label>
              </div>
            </div>
          </section>

          {/* Card 2: Violation Config */}
          <section className="panel policy-card">
            <div className="panel-title">
              <div>
                <p>VI PHẠM CHẤM CÔNG</p>
                <h2>1.2. Cấu hình Xử lý Vi phạm & Tự động khóa công</h2>
              </div>
            </div>

            <div className="policy-form-grid">
              <label>
                Quy tắc xử lý Quên Check-out (Missing Checkout)
                <select
                  value={forgetCheckOut}
                  onChange={(e) => setForgetCheckOut(e.target.value)}
                  className="field-input block-input"
                  style={{ marginTop: 6 }}
                >
                  <option value="absent">Tự động coi là Vắng công (Unexcused Absence)</option>
                  <option value="fixed_18">Tự động lấy mốc 18:00 (Auto 18:00 Finish)</option>
                  <option value="adjustment_alert">Cảnh báo nhắc nộp Đơn điều chỉnh (Send Adjustment Prompt)</option>
                </select>
              </label>

              <div className="toggle-row" style={{ marginTop: 16 }}>
                <div>
                  <b>Tự động khóa dữ liệu công tháng (Auto Lock Payroll Period)</b>
                  <span>
                    Khóa toàn bộ bảng chấm công để chuyển tiếp cho HR tính toán bảng lương đúng hạn.
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={autoLock}
                    onChange={(e) => setAutoLock(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>

              {autoLock && (
                <div className="form-sub-box">
                  <label>
                    Tự động khóa dữ liệu công vào ngày hàng tháng
                    <div className="field-with-unit">
                      <input
                        type="number"
                        min="1"
                        max="28"
                        value={lockDay}
                        onChange={(e) => setLockDay(Number(e.target.value))}
                        className="field-input"
                      />
                      <span className="unit">hàng tháng</span>
                    </div>
                  </label>
                  <small className="help-text">
                    🔒 Dữ liệu chấm công tháng trước sẽ bị khóa cứng vào 23:59 ngày <b>{lockDay}</b> hàng tháng.
                  </small>
                </div>
              )}
            </div>
          </section>

          {/* Card 3: Geofencing & Wi-Fi Rules */}
          <section className="panel policy-card">
            <div className="panel-title">
              <div>
                <p>GEOFORCING & MẠNG NỘI BỘ</p>
                <h2>1.3. Định vị GPS & Wi-Fi BSSID Chi nhánh</h2>
              </div>
            </div>

            <div className="policy-form-grid">
              <label>
                Danh sách Wi-Fi BSSID / Public IP hợp lệ tại văn phòng
                <form onSubmit={addWifi} className="wifi-add-row" style={{ marginTop: 6 }}>
                  <input
                    type="text"
                    placeholder="Nhập IP hoặc BSSID (Ví dụ: 118.69.182.42)..."
                    value={newWifi}
                    onChange={(e) => setNewWifi(e.target.value)}
                    className="field-input"
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="primary sm-btn">
                    <Icon name="plus" /> Thêm địa chỉ
                  </button>
                </form>
              </label>

              <div className="wifi-tag-list">
                {wifiList.map((item, index) => (
                  <div key={index} className="wifi-item-tag">
                    <Icon name="laptop" size={13} />
                    <span>{item}</span>
                    <button type="button" onClick={() => removeWifi(index)}>
                      <Icon name="close" size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-row-single" style={{ marginTop: 16 }}>
                <label>
                  Bán kính GPS hợp lệ (Geofence Radius)
                  <div className="field-with-unit">
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={gpsRadius}
                      onChange={(e) => setGpsRadius(Number(e.target.value))}
                      className="field-input"
                    />
                    <span className="unit">mét quanh tọa độ chi nhánh</span>
                  </div>
                  <small className="help-text">
                    📍 Nhân viên chỉ được ghi nhận Check-in "Tại văn phòng" khi vị trí GPS nằm trong bán kính <b>{gpsRadius}m</b>.
                  </small>
                </label>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── TAB 2: WFH & LEAVE POLICY ──────────────────────────────────── */}
      {activeTab === "wfh_leave" && (
        <div className="policy-tab-content fade-in">
          {/* Card 1: WFH Allowance */}
          <section className="panel policy-card">
            <div className="panel-title">
              <div>
                <p>LÀM VIỆC TỪ XA</p>
                <h2>2.1. Hạn mức & Quy tắc WFH hàng tháng</h2>
              </div>
              <Status tone="green">Đang áp dụng</Status>
            </div>

            <div className="policy-form-grid">
              <label>
                Số ngày WFH tối đa / tháng cho phép
                <div className="field-with-unit">
                  <input
                    type="number"
                    min="0"
                    max="22"
                    value={maxWfhDays}
                    onChange={(e) => setMaxWfhDays(Number(e.target.value))}
                    className="field-input"
                  />
                  <span className="unit">ngày / tháng / nhân viên</span>
                </div>
              </label>

              <div className="toggle-row" style={{ marginTop: 16 }}>
                <div>
                  <b>Bắt buộc Nộp Báo cáo Ngày (Daily Report) khi WFH</b>
                  <span>
                    Hệ thống sẽ nhắc nhở và khóa tính công nếu nhân viên không hoàn thành Daily Report trước 18:00.
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={requireDailyReport}
                    onChange={(e) => setRequireDailyReport(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="toggle-row" style={{ marginTop: 16 }}>
                <div>
                  <b>Bắt buộc Team Lead duyệt WFH trước thời hạn</b>
                  <span>Yêu cầu nhân viên gửi đơn WFH trước một khoảng thời gian nhất định.</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={requireLeadApproval}
                    onChange={(e) => setRequireLeadApproval(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>

              {requireLeadApproval && (
                <div className="form-sub-box">
                  <label>
                    Thời gian phải đăng ký trước
                    <div className="field-with-unit">
                      <input
                        type="number"
                        min="1"
                        max="168"
                        value={leadNoticeHours}
                        onChange={(e) => setLeadNoticeHours(Number(e.target.value))}
                        className="field-input"
                      />
                      <span className="unit">giờ trước ngày WFH</span>
                    </div>
                  </label>
                  <small className="help-text">
                    ⏳ Nhân viên cần gửi đơn WFH trước ít nhất <b>{leadNoticeHours} giờ</b> (Ví dụ: 24h trước ngày áp dụng).
                  </small>
                </div>
              )}
            </div>
          </section>

          {/* Card 2: OT Conversion Ratios */}
          <section className="panel policy-card">
            <div className="panel-title">
              <div>
                <p>OVERTIME & NGHỈ BÙ</p>
                <h2>2.2. Quy đổi Overtime (OT) sang Phép bù (Compensatory Leave)</h2>
              </div>
            </div>

            <div className="policy-form-grid">
              <div className="form-row">
                <label>
                  Tỷ lệ quy đổi OT Ngày thường
                  <select
                    value={otWeekdayRatio}
                    onChange={(e) => setOtWeekdayRatio(e.target.value)}
                    className="field-input block-input"
                    style={{ marginTop: 6 }}
                  >
                    <option value="1.0">1 giờ OT = 1.0 giờ phép bù (1.0x Ratio)</option>
                    <option value="1.25">1 giờ OT = 1.25 giờ phép bù (1.25x Ratio)</option>
                    <option value="1.5">1 giờ OT = 1.5 giờ phép bù (1.5x Ratio)</option>
                  </select>
                </label>

                <label>
                  Tỷ lệ quy đổi OT Ngày lễ / Cuối tuần
                  <select
                    value={otWeekendRatio}
                    onChange={(e) => setOtWeekendRatio(e.target.value)}
                    className="field-input block-input"
                    style={{ marginTop: 6 }}
                  >
                    <option value="1.5">1 giờ OT = 1.5 giờ phép bù (1.5x Ratio)</option>
                    <option value="2.0">1 giờ OT = 2.0 giờ phép bù (2.0x Ratio)</option>
                    <option value="2.5">1 giờ OT = 2.5 giờ phép bù (2.5x Ratio)</option>
                    <option value="3.0">1 giờ OT = 3.0 giờ phép bù (3.0x Ratio)</option>
                  </select>
                </label>
              </div>

              <div className="policy-formula-box">
                <Icon name="sparkles" size={16} />
                <span>
                  <b>Công thức tính:</b> Làm thêm 4 giờ vào Cuối tuần sẽ quy đổi thành{" "}
                  <b>{4 * Number(otWeekendRatio)} giờ</b> nghỉ phép bù có hưởng nguyên lương.
                </span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── TAB 3: EXPENSE CLAIM THRESHOLDS ────────────────────────────── */}
      {activeTab === "expense" && (
        <div className="policy-tab-content fade-in">
          <section className="panel policy-card">
            <div className="panel-title">
              <div>
                <p>BỒI HOÀN & DUYỆT CHI PHÍ</p>
                <h2>3.1. Hạn mức Chi phí & Phân cấp Phê duyệt</h2>
              </div>
              <Status tone="green">Đang áp dụng</Status>
            </div>

            <div className="policy-form-grid">
              <label>
                Hạn mức mua License phần mềm / Thi chứng chỉ (VNĐ)
                <div className="field-with-unit">
                  <input
                    type="number"
                    step="500000"
                    value={licenseLimit}
                    onChange={(e) => setLicenseLimit(Number(e.target.value))}
                    className="field-input"
                  />
                  <span className="unit">VNĐ / đơn chi phí</span>
                </div>
              </label>

              {/* Threshold Flow Visualization */}
              <div className="threshold-flow-wrap">
                <h3>Luồng phê duyệt tự động theo hạn mức ({licenseLimit.toLocaleString("vi-VN")} ₫)</h3>

                {/* Level 1 Flow */}
                <div className="tf-card tf-level1">
                  <div className="tf-badge">CẤP 1 — DƯỚI {(licenseLimit / 1000000).toFixed(1)} TRIỆU VNĐ</div>
                  <h4>Duyệt 1 cấp đơn giản (Fast-track Approval)</h4>
                  <div className="tf-steps">
                    <div className="tf-step-pill">
                      <Icon name="user" />
                      <span>Nhân viên gửi</span>
                    </div>
                    <Icon name="arrow" />
                    <div className="tf-step-pill active-pill">
                      <Icon name="check" />
                      <span>{level1Approver}</span>
                    </div>
                    <Icon name="arrow" />
                    <div className="tf-step-pill done-pill">
                      <Icon name="receipt" />
                      <span>Chi trả bồi hoàn</span>
                    </div>
                  </div>
                </div>

                {/* Level 3 Flow */}
                <div className="tf-card tf-level3">
                  <div className="tf-badge alert-badge">CẤP 3 — TỪ {(licenseLimit / 1000000).toFixed(1)} TRIỆU VNĐ TRỞ LÊN</div>
                  <h4>Duyệt 3 cấp chặt chẽ (Multi-tier Enterprise Approval)</h4>
                  <div className="tf-steps">
                    <div className="tf-step-pill">
                      <Icon name="user" />
                      <span>Nhân viên</span>
                    </div>
                    <Icon name="arrow" />
                    <div className="tf-step-pill">
                      <Icon name="users" />
                      <span>1. {level1Approver}</span>
                    </div>
                    <Icon name="arrow" />
                    <div className="tf-step-pill">
                      <Icon name="briefcase" />
                      <span>2. {level2Approver}</span>
                    </div>
                    <Icon name="arrow" />
                    <div className="tf-step-pill active-pill">
                      <Icon name="shield" />
                      <span>3. {level3Approver}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approvers Form */}
              <div className="form-row" style={{ marginTop: 16 }}>
                <label>
                  Cấp phê duyệt 1 (Direct Lead)
                  <input
                    type="text"
                    value={level1Approver}
                    onChange={(e) => setLevel1Approver(e.target.value)}
                    className="field-input block-input"
                    style={{ marginTop: 6 }}
                  />
                </label>

                <label>
                  Cấp phê duyệt 2 (HR Branch)
                  <input
                    type="text"
                    value={level2Approver}
                    onChange={(e) => setLevel2Approver(e.target.value)}
                    className="field-input block-input"
                    style={{ marginTop: 6 }}
                  />
                </label>

                <label>
                  Cấp phê duyệt 3 (HR Head / CFO)
                  <input
                    type="text"
                    value={level3Approver}
                    onChange={(e) => setLevel3Approver(e.target.value)}
                    className="field-input block-input"
                    style={{ marginTop: 6 }}
                  />
                </label>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
