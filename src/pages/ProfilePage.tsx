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
    bankName: "Techcombank (TMCP Kỹ Thương VN)",
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
    type: "Chuyên môn UI/UX",
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
    setCertForm({ name: "", issuer: "", year: "2026", type: "Chuyên môn UI/UX", link: "" });
    alert("Đã cập nhật chứng chỉ chuyên môn mới thành công!");
  };

  return (
    <div className="page inner-page">
      <div className="profile-minimal-container">
        {/* MINIMAL PROFILE HERO HEADER */}
        <div className="profile-header-minimal">
          <div className="profile-header-main">
            <div className="profile-avatar-minimal">
              MA
            </div>
            <div className="profile-header-info">
              <div className="profile-badge-row">
                <span className="profile-code-badge">MÃ NV: {profileData.code}</span>
                <Status tone="green">Đang làm việc</Status>
                <Status tone="blue">Chính thức (Full-time)</Status>
              </div>
              <h1 className="profile-name">{profileData.name}</h1>
              <p className="profile-title">{profileData.title} · {profileData.department}</p>
            </div>
          </div>

          <div className="profile-header-actions">
            <button className="primary profile-edit-btn" onClick={handleOpenEditModal}>
              <Icon name="edit" size={18} />
              <span>Chỉnh sửa thông tin</span>
            </button>
          </div>
        </div>

        {/* MINIMAL NAVIGATION SUB-TABS */}
        <div className="profile-tabs-minimal">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            <Icon name="user" size={16} />
            <span>Tất cả thông tin</span>
          </button>
          <button
            className={activeTab === "personal" ? "active" : ""}
            onClick={() => setActiveTab("personal")}
          >
            <Icon name="user" size={16} />
            <span>Cá nhân & Liên hệ</span>
          </button>
          <button
            className={activeTab === "job" ? "active" : ""}
            onClick={() => setActiveTab("job")}
          >
            <Icon name="briefcase" size={16} />
            <span>Công việc & Tổ chức</span>
          </button>
          <button
            className={activeTab === "contract" ? "active" : ""}
            onClick={() => setActiveTab("contract")}
          >
            <Icon name="file" size={16} />
            <span>Hợp đồng & Chứng chỉ</span>
          </button>
        </div>

        {/* UNIFIED MINIMAL CONTENT SHEET */}
        <div className="profile-content-minimal">
          {/* SECTION 1: CÁ NHÂN & LIÊN HỆ */}
          {(activeTab === "all" || activeTab === "personal") && (
            <div className="profile-section-minimal">
              <div className="profile-section-top">
                <h2 className="profile-section-heading">
                  <Icon name="user" size={20} />
                  <span>Thông tin cá nhân & Liên hệ</span>
                </h2>
                <button className="profile-link-btn" onClick={handleOpenEditModal}>
                  <Icon name="edit" size={15} /> <span>Chỉnh sửa</span>
                </button>
              </div>

              <div className="profile-list-minimal">
                <div className="profile-row-item">
                  <span className="profile-row-label">Họ và tên khai sinh</span>
                  <span className="profile-row-val">{profileData.name}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Ngày sinh</span>
                  <span className="profile-row-val">{profileData.dob}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Giới tính</span>
                  <span className="profile-row-val">{profileData.gender}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Số CCCD / CMND</span>
                  <span className="profile-row-val">{profileData.cccd}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Email công ty</span>
                  <span className="profile-row-val highlight">{profileData.companyEmail}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Email cá nhân</span>
                  <span className="profile-row-val">{profileData.personalEmail}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Số điện thoại di động</span>
                  <span className="profile-row-val">{profileData.phone}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Địa chỉ thường trú</span>
                  <span className="profile-row-val">{profileData.address}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Liên hệ khẩn cấp</span>
                  <span className="profile-row-val">{profileData.emergencyContact}</span>
                </div>
                <div className="profile-row-item full-width-row">
                  <span className="profile-row-label">Ngân hàng nhận lương</span>
                  <div className="profile-row-val-group">
                    <span className="profile-bank-text">
                      <strong>{profileData.bankName}</strong> — STK: <code className="bank-acc">{profileData.bankAccountNo}</code> ({profileData.bankAccountName})
                    </span>
                    <button className="profile-mini-edit-btn" onClick={handleOpenEditModal}>
                      <Icon name="edit" size={14} /> Sửa STK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: CÔNG VIỆC & TỔ CHỨC */}
          {(activeTab === "all" || activeTab === "job") && (
            <div className="profile-section-minimal">
              <div className="profile-section-top">
                <h2 className="profile-section-heading">
                  <Icon name="briefcase" size={20} />
                  <span>Thông tin công việc & Tổ chức</span>
                </h2>
                <Status tone="blue">Chính thức</Status>
              </div>

              <div className="profile-list-minimal">
                <div className="profile-row-item">
                  <span className="profile-row-label">Mã nhân viên</span>
                  <span className="profile-row-val font-mono">{profileData.code}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Phòng ban</span>
                  <span className="profile-row-val">Product & Design</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Chức danh chuyên môn</span>
                  <span className="profile-row-val">{profileData.title}</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Nhóm chuyên môn (Team)</span>
                  <span className="profile-row-val">Product Development</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Quản lý trực tiếp (Lead)</span>
                  <span className="profile-row-val">Trần Hoàng Nam (Product Lead)</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Chi nhánh làm việc</span>
                  <span className="profile-row-val">Văn phòng TP. Hồ Chí Minh</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Loại hình nhân sự</span>
                  <span className="profile-row-val">Chính thức (Full-time)</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Ngày gia nhập công ty</span>
                  <span className="profile-row-val">15/04/2024</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Thâm niên làm việc</span>
                  <span className="profile-row-val">2 năm 5 tháng</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: HỢP ĐỒNG & CHỨNG CHỈ */}
          {(activeTab === "all" || activeTab === "contract") && (
            <div className="profile-section-minimal">
              <div className="profile-section-top">
                <h2 className="profile-section-heading">
                  <Icon name="file" size={20} />
                  <span>Hợp đồng & Chứng chỉ</span>
                </h2>
                <button className="profile-link-btn" onClick={() => setIsCertModalOpen(true)}>
                  <Icon name="plus" size={15} /> <span>Thêm chứng chỉ</span>
                </button>
              </div>

              <div className="profile-list-minimal">
                <div className="profile-row-item">
                  <span className="profile-row-label">Loại hợp đồng lao động</span>
                  <span className="profile-row-val">Hợp đồng Không xác định thời hạn</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Mã hợp đồng</span>
                  <span className="profile-row-val font-mono">HDLD-2024-018/OH</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Ngày hiệu lực</span>
                  <span className="profile-row-val">15/04/2024</span>
                </div>
                <div className="profile-row-item">
                  <span className="profile-row-label">Trình độ học vấn</span>
                  <span className="profile-row-val">Cử nhân Thiết kế Đồ họa - ĐH Kiến trúc TP.HCM</span>
                </div>
              </div>

              <div className="profile-certs-minimal">
                <h3 className="profile-subheading">Chứng chỉ & Bằng cấp đã xác minh ({certificates.length})</h3>
                <div className="profile-cert-rows">
                  {certificates.map((c) => (
                    <div key={c.id} className="profile-cert-row-item">
                      <div className="profile-cert-info">
                        <div className="profile-cert-title-line">
                          <span className="cert-type-tag">{c.type}</span>
                          <strong className="cert-name">{c.name}</strong>
                        </div>
                        <span className="cert-issuer">Cấp bởi {c.issuer} · Năm {c.year}</span>
                      </div>
                      <Status tone="green">Đã duyệt</Status>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
