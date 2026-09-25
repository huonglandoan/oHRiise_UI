import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  type: string;
  link?: string;
}

export default function ProfilePage() {
  // Editable profile state
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Minh Anh",
    code: "OH-2024-018",
    title: "Senior UI/UX Product Designer",
    department: "Phòng Phát triển Sản phẩm (Product Development)",
    dob: "12/08/1996",
    gender: "Nữ",
    cccd: "079196888999",
    companyEmail: "minhanh@ohriise.vn",
    personalEmail: "minhanh.design@gmail.com",
    phone: "090 123 4567",
    address: "128 Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
    emergencyContact: "Nguyễn Văn Hùng (Bố) · 091 234 5678",
    bankName: "Techcombank (Ngân hàng TMCP Kỹ Thương Việt Nam)",
    bankAccountNo: "1903 8888 999 018",
    bankAccountName: "NGUYEN MINH ANH",
  });

  // Certificate items state
  const [certificates, setCertificates] = useState<CertificateItem[]>([
    {
      id: "cert-1",
      name: "Google UX Design Professional Certificate",
      issuer: "Google / Coursera",
      year: "2025",
      type: "Chuyên môn UI/UX",
      link: "https://coursera.org/verify/google-ux",
    },
    {
      id: "cert-2",
      name: "TOEIC 850 / 990 (IELTS 7.0 Equivalent)",
      issuer: "ETS Global",
      year: "2024",
      type: "Ngoại ngữ",
    },
  ]);

  // Subtabs state
  const [activeTab, setActiveTab] = useState<"all" | "personal" | "job" | "contract">("all");

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...profileData });

  // Update Certificate Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certForm, setCertForm] = useState({
    name: "",
    issuer: "",
    year: "2026",
    type: "Chuyên môn",
    link: "",
  });

  const handleOpenEditModal = () => {
    setEditForm({ ...profileData });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setIsEditModalOpen(false);
    alert("Đã cập nhật thông tin hồ sơ cá nhân thành công!");
  };

  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.name.trim()) {
      alert("Vui lòng nhập tên chứng chỉ chuyên môn / bằng cấp.");
      return;
    }
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      name: certForm.name,
      issuer: certForm.issuer || "Tổ chức cấp",
      year: certForm.year,
      type: certForm.type,
      link: certForm.link || undefined,
    };
    setCertificates([...certificates, newCert]);
    setIsCertModalOpen(false);
    setCertForm({ name: "", issuer: "", year: "2026", type: "Chuyên môn", link: "" });
    alert("Đã cập nhật chứng chỉ chuyên môn mới thành công!");
  };

  return (
    <div className="page inner-page" style={{ gap: "24px" }}>
      {/* HERO AVATAR & HEADER - RESPONSIVE HERO CARD */}
      <section className="panel profile-hero-card">
        <div className="profile-hero-inner">
          {/* Avatar & Basic Info */}
          <div className="profile-hero-user">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-large">
                MA
              </div>
              <div className="profile-avatar-check">
                <Icon name="check" size={18} />
              </div>
            </div>

            <div className="profile-hero-meta">
              <div className="profile-badge-row">
                <span className="profile-code-badge">
                  MÃ NV: {profileData.code}
                </span>
                <Status tone="green">Đang làm việc</Status>
                <Status tone="blue">Chính thức (Full-time)</Status>
              </div>

              <h1 className="profile-name">
                {profileData.name}
              </h1>

              <p className="profile-title">
                {profileData.title} · {profileData.department}
              </p>
            </div>
          </div>

          {/* Action Button: Edit Profile */}
          <div className="profile-hero-actions">
            <button
              className="primary profile-edit-btn"
              onClick={handleOpenEditModal}
            >
              <Icon name="edit" size={20} />
              <span>Cập nhật thông tin hồ sơ</span>
            </button>
          </div>
        </div>
      </section>

      {/* TOP SUB-TABS NAVIGATION FOR PROFILE SECTIONS */}
      <div className="page-sub-tabs profile-sub-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          <Icon name="user" size={18} />
          <span>Tất cả thông tin</span>
        </button>
        <button
          className={activeTab === "personal" ? "active" : ""}
          onClick={() => setActiveTab("personal")}
        >
          <Icon name="user" size={18} />
          <span>Cá nhân & Liên hệ</span>
        </button>
        <button
          className={activeTab === "job" ? "active" : ""}
          onClick={() => setActiveTab("job")}
        >
          <Icon name="briefcase" size={18} />
          <span>Công việc & Tổ chức</span>
        </button>
        <button
          className={activeTab === "contract" ? "active" : ""}
          onClick={() => setActiveTab("contract")}
        >
          <Icon name="file-text" size={18} />
          <span>Hợp đồng & Chứng chỉ</span>
        </button>
      </div>

      {/* SECTION 1: THÔNG TIN CÁ NHÂN & LIÊN HỆ */}
      {(activeTab === "all" || activeTab === "personal") && (
        <section className="panel profile-section-panel">
          <div className="profile-section-header">
            <div>
              <p className="profile-section-tag">
                HỒ SƠ LÝ LỊCH
              </p>
              <h2 className="profile-section-title">
                Thông tin cá nhân & Liên hệ
              </h2>
            </div>
            <button
              className="secondary profile-sec-btn"
              onClick={handleOpenEditModal}
            >
              <Icon name="edit" size={16} /> <span>Chỉnh sửa</span>
            </button>
          </div>

          <div className="profile-field-grid">
            {[
              ["Họ và tên khai sinh", profileData.name],
              ["Ngày sinh", profileData.dob],
              ["Giới tính", profileData.gender],
              ["Số CCCD / CMND", profileData.cccd],
              ["Email công ty", profileData.companyEmail],
              ["Email cá nhân", profileData.personalEmail],
              ["Số điện thoại di động", profileData.phone],
              ["Địa chỉ thường trú", profileData.address],
              ["Liên hệ khẩn cấp", profileData.emergencyContact],
              ["Ngân hàng nhận lương", profileData.bankName],
              ["Số tài khoản (STK)", profileData.bankAccountNo],
              ["Tên chủ tài khoản", profileData.bankAccountName],
            ].map(([lbl, val]) => (
              <div key={lbl} className="profile-field-card">
                <span className="profile-field-label">
                  {lbl}
                </span>
                <b className="profile-field-val">
                  {val}
                </b>
              </div>
            ))}
          </div>

          {/* Highlighted Bank Account Card for Salary Payment */}
          <div className="profile-bank-card">
            <div className="profile-bank-inner">
              <div className="profile-bank-icon">
                <Icon name="wallet" size={28} />
              </div>
              <div>
                <p className="profile-bank-label">
                  Tài khoản ngân hàng nhận lương hàng tháng
                </p>
                <h3 className="profile-bank-name">
                  {profileData.bankName}
                </h3>
                <div className="profile-bank-details">
                  <span>
                    STK: <strong style={{ color: "#38bdf8", fontWeight: 800, fontSize: "17px" }}>{profileData.bankAccountNo}</strong>
                  </span>
                  <span>
                    Chủ tài khoản: <strong style={{ color: "white", fontWeight: 800 }}>{profileData.bankAccountName}</strong>
                  </span>
                </div>
              </div>
            </div>

            <button
              className="secondary profile-bank-btn"
              onClick={handleOpenEditModal}
            >
              <Icon name="edit" size={16} /> <span>Thay đổi STK</span>
            </button>
          </div>
        </section>
      )}

      {/* SECTION 2: THÔNG TIN CÔNG VIỆC & TỔ CHỨC */}
      {(activeTab === "all" || activeTab === "job") && (
        <section className="panel profile-section-panel">
          <div className="profile-section-header">
            <div>
              <p className="profile-section-tag">
                TỔ CHỨC & VỊ TRÍ
              </p>
              <h2 className="profile-section-title">
                Thông tin công việc & Phòng ban
              </h2>
            </div>
            <Status tone="blue">
              <Icon name="briefcase" size={16} /> Chính thức
            </Status>
          </div>

          <div className="profile-field-grid">
            {[
              ["Mã nhân viên", profileData.code],
              ["Phòng ban", "Product & Design"],
              ["Chức danh chuyên môn", profileData.title],
              ["Nhóm chuyên môn (Team)", "Product Development"],
              ["Quản lý trực tiếp (Lead)", "Trần Hoàng Nam (Product Lead)"],
              ["Chi nhánh làm việc", "Văn phòng TP. Hồ Chí Minh"],
              ["Loại hình nhân sự", "Chính thức (Full-time)"],
              ["Ngày gia nhập công ty", "15/04/2024"],
              ["Thâm niên làm việc", "2 năm 5 tháng"],
            ].map(([lbl, val]) => (
              <div key={lbl} className="profile-field-card">
                <span className="profile-field-label">
                  {lbl}
                </span>
                <b className="profile-field-val">
                  {val}
                </b>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: HỢP ĐỒNG & CHỨNG CHỈ CHUYÊN MÔN */}
      {(activeTab === "all" || activeTab === "contract") && (
        <section className="panel profile-section-panel">
          <div className="profile-section-header">
            <div>
              <p className="profile-section-tag">
                PHÁP LÝ & BẰNG CẤP
              </p>
              <h2 className="profile-section-title">
                Hợp đồng & Chứng chỉ chuyên môn
              </h2>
            </div>
            <button
              className="primary profile-sec-btn"
              onClick={() => setIsCertModalOpen(true)}
            >
              <Icon name="plus" size={18} /> <span>Cập nhật chứng chỉ</span>
            </button>
          </div>

          {/* Contract Info Grid */}
          <div className="profile-field-grid" style={{ marginBottom: "28px" }}>
            {[
              ["Loại hợp đồng lao động", "Hợp đồng Không xác định thời hạn"],
              ["Mã hợp đồng", "HDLD-2024-018/OH"],
              ["Ngày hiệu lực", "15/04/2024"],
              ["Trình độ học vấn", "Cử nhân Thiết kế Đồ họa - ĐH Kiến trúc TP.HCM"],
            ].map(([lbl, val]) => (
              <div key={lbl} className="profile-field-card">
                <span className="profile-field-label">
                  {lbl}
                </span>
                <b className="profile-field-val">
                  {val}
                </b>
              </div>
            ))}
          </div>

          {/* Certificates List Cards */}
          <div>
            <h3 className="profile-subhead">
              Danh sách chứng chỉ đã xác minh ({certificates.length})
            </h3>
            <div className="profile-cert-grid">
              {certificates.map((c) => (
                <div key={c.id} className="profile-cert-card">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "#166534", background: "#dcfce7", padding: "2px 8px", borderRadius: "6px" }}>
                        {c.type}
                      </span>
                      <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 600 }}>Năm {c.year}</span>
                    </div>
                    <b style={{ fontSize: "17px", fontWeight: 900, color: "#14532d", display: "block", marginBottom: "4px" }}>
                      {c.name}
                    </b>
                    <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 600 }}>
                      Cấp bởi: {c.issuer}
                    </span>
                  </div>
                  <Status tone="green">Đã duyệt</Status>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DIRECT EDIT PROFILE MODAL */}
      {isEditModalOpen && (
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
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "640px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid var(--border-soft)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                  CHỈNH SỬA HỒ SƠ
                </p>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Cập nhật thông tin cá nhân
                </h3>
              </div>
              <button
                className="secondary"
                onClick={() => setIsEditModalOpen(false)}
                style={{ padding: "8px", borderRadius: "10px" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className="profile-modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                    Ngày sinh
                  </label>
                  <input
                    type="text"
                    value={editForm.dob}
                    onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </div>

              <div className="profile-modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                    Số điện thoại di động
                  </label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                    Email cá nhân
                  </label>
                  <input
                    type="email"
                    value={editForm.personalEmail}
                    onChange={(e) => setEditForm({ ...editForm, personalEmail: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Địa chỉ thường trú
                </label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Liên hệ khẩn cấp (Tên & SĐT người thân)
                </label>
                <input
                  type="text"
                  value={editForm.emergencyContact}
                  onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ borderTop: "2px solid var(--border-soft)", paddingTop: "16px", marginTop: "4px" }}>
                <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--brand)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Icon name="wallet" size={18} /> Thông tin ngân hàng nhận lương
                </h4>
                <div className="profile-modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                      Ngân hàng thụ hưởng
                    </label>
                    <input
                      type="text"
                      value={editForm.bankName}
                      onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                      placeholder="Techcombank, Vietcombank, MB Bank..."
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-soft)",
                        fontSize: "15px",
                        fontWeight: 700,
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                      Số tài khoản (STK)
                    </label>
                    <input
                      type="text"
                      value={editForm.bankAccountNo}
                      onChange={(e) => setEditForm({ ...editForm, bankAccountNo: e.target.value })}
                      placeholder="1903 8888 999 018"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-soft)",
                        fontSize: "15px",
                        fontWeight: 700,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                    Tên chủ tài khoản (In hoa không dấu)
                  </label>
                  <input
                    type="text"
                    value={editForm.bankAccountName}
                    onChange={(e) => setEditForm({ ...editForm, bankAccountName: e.target.value })}
                    placeholder="NGUYEN MINH ANH"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ padding: "12px 20px", fontSize: "15px", fontWeight: 700 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "12px 24px", fontSize: "15px", fontWeight: 900 }}
                >
                  <Icon name="check" size={18} /> Lưu thay đổi hồ sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE CERTIFICATE MODAL */}
      {isCertModalOpen && (
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
          onClick={() => setIsCertModalOpen(false)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid var(--border-soft)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                  BẰNG CẤP & CHỨNG CHỈ
                </p>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Cập nhật chứng chỉ chuyên môn
                </h3>
              </div>
              <button
                className="secondary"
                onClick={() => setIsCertModalOpen(false)}
                style={{ padding: "8px", borderRadius: "10px" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Tên chứng chỉ / Bằng cấp chuyên môn <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  placeholder="Ví dụ: AWS Certified Solutions Architect, Google UX..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                />
              </div>

              <div className="profile-modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                    Tổ chức cấp
                  </label>
                  <input
                    type="text"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    placeholder="Ví dụ: Google, ETS, PMI..."
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                    Năm cấp
                  </label>
                  <input
                    type="text"
                    value={certForm.year}
                    onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                    placeholder="2026"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Phân loại chứng chỉ
                </label>
                <select
                  value={certForm.type}
                  onChange={(e) => setCertForm({ ...certForm, type: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "white",
                  }}
                >
                  <option value="Chuyên môn UI/UX">Chuyên môn UI/UX & Design</option>
                  <option value="Công nghệ & Lập trình">Công nghệ & Lập trình</option>
                  <option value="Ngoại ngữ">Ngoại ngữ (IELTS, TOEIC, JLPT...)</option>
                  <option value="Quản lý dự án">Quản lý dự án (PMP, Agile...)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Link đính kèm file chứng chỉ (Drive / Dropbox)
                </label>
                <input
                  type="text"
                  value={certForm.link}
                  onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsCertModalOpen(false)}
                  style={{ padding: "12px 20px", fontSize: "15px", fontWeight: 700 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "12px 24px", fontSize: "15px", fontWeight: 900 }}
                >
                  <Icon name="check" size={18} /> Lưu chứng chỉ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
