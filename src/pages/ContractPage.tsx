import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

export interface SimpleContract {
  id: string;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  remainingText: string;
  status: "active" | "expired" | "completed";
  statusText: string;
  pdfFileName: string;
  salary: string;
  signer: string;
}

const CONTRACT_DATA: SimpleContract[] = [
  {
    id: "c1",
    name: "Hợp đồng lao động xác định thời hạn (24 tháng)",
    code: "OH/HDLD/2025-018",
    startDate: "15/06/2025",
    endDate: "14/06/2027",
    remainingText: "Còn lại 627 ngày",
    status: "active",
    statusText: "Đang hiệu lực",
    pdfFileName: "Hop_Dong_Lao_Dong_2025_018.pdf",
    salary: "28.000.000 ₫ / tháng",
    signer: "Trần Hoàng Nam (Giám đốc Khối)",
  },
  {
    id: "c2",
    name: "Hợp đồng lao động xác định thời hạn (12 tháng)",
    code: "OH/HDLD/2024-018",
    startDate: "15/06/2024",
    endDate: "14/06/2025",
    remainingText: "Đã hết hạn",
    status: "expired",
    statusText: "Đã hết hạn",
    pdfFileName: "Hop_Dong_Lao_Dong_2024_018.pdf",
    salary: "22.000.000 ₫ / tháng",
    signer: "Trần Hoàng Nam (Giám đốc Khối)",
  },
  {
    id: "c3",
    name: "Hợp đồng thử việc (02 tháng)",
    code: "OH/HDTV/2024-002",
    startDate: "15/04/2024",
    endDate: "14/06/2024",
    remainingText: "Đã hoàn tất",
    status: "completed",
    statusText: "Đã hoàn tất",
    pdfFileName: "Hop_Dong_Thu_Viec_2024_002.pdf",
    salary: "18.700.000 ₫ / tháng (85% Lương)",
    signer: "Nguyễn Hoàng Hải (Trưởng phòng HR)",
  },
];

export default function ContractPage() {
  const [previewPdfContract, setPreviewPdfContract] = useState<SimpleContract | null>(null);

  const handleDownload = (c: SimpleContract) => {
    alert(`Đã tải xuống văn bản PDF "${c.pdfFileName}" thành công!`);
  };

  return (
    <div className="page inner-page" style={{ gap: "28px" }}>
      {/* PAGE HEADER - MINIMAL & CLEAN */}
      <div className="page-heading" style={{ marginBottom: "24px" }}>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
            HỒ SƠ LẠO ĐỘNG
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
            Hợp đồng
          </h1>
          <span style={{ fontSize: "16px", color: "var(--text-sub)", fontWeight: 500 }}>
            Danh sách hợp đồng lao động cá nhân. Nhấn "Xem chi tiết" để mở bản PDF hợp đồng.
          </span>
        </div>
      </div>

      {/* SIMPLE CONTRACTS LIST PANEL */}
      <section
        className="panel"
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "32px",
          border: "1px solid var(--border-soft)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
            Danh sách hợp đồng ({CONTRACT_DATA.length})
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {CONTRACT_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewPdfContract(item)}
              style={{
                background: item.status === "active" ? "#eff6ff" : "#f8fafc",
                borderRadius: "18px",
                padding: "20px 24px",
                border: item.status === "active" ? "2px solid #93c5fd" : "1px solid var(--border-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "18px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {/* Left Column: Icon, Title & Date range */}
              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: item.status === "active" ? "var(--brand)" : "#e2e8f0",
                    color: item.status === "active" ? "white" : "var(--text-sub)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="file" size={22} />
                </div>

                <div>
                  <b style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>
                    {item.name}
                  </b>
                  <p style={{ fontSize: "15px", color: "var(--text-sub)", margin: "2px 0 0 0", fontWeight: 600 }}>
                    Mã HĐ: <b style={{ color: "var(--brand)" }}>{item.code}</b> · Ngày: <b>{item.startDate} – {item.endDate}</b>
                  </p>
                </div>
              </div>

              {/* Right Column: Remaining Duration & View Detail Action */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Remaining Duration Badge */}
                <div
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    background:
                      item.status === "active"
                        ? "#dcfce7"
                        : item.status === "completed"
                        ? "#e0f2fe"
                        : "#f1f5f9",
                    color:
                      item.status === "active"
                        ? "#166534"
                        : item.status === "completed"
                        ? "#0369a1"
                        : "var(--text-sub)",
                    fontSize: "14px",
                    fontWeight: 800,
                  }}
                >
                  {item.remainingText}
                </div>

                <button
                  className="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewPdfContract(item);
                  }}
                  style={{
                    padding: "10px 20px",
                    fontSize: "15px",
                    fontWeight: 800,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Icon name="file" size={18} /> Xem chi tiết (PDF)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIMPLE PDF DOCUMENT PREVIEW MODAL */}
      {previewPdfContract && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setPreviewPdfContract(null)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "720px",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid var(--border-soft)",
                paddingBottom: "16px",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ color: "var(--brand)" }}>
                  <Icon name="file" size={24} />
                </div>
                <div>
                  <b style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>
                    BẢN XEM TRƯỚC PDF HỢP ĐỒNG
                  </b>
                  <small style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 600 }}>
                    {previewPdfContract.pdfFileName}
                  </small>
                </div>
              </div>

              <button
                className="secondary"
                onClick={() => setPreviewPdfContract(null)}
                style={{ padding: "8px", borderRadius: "10px" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* MINIMAL PDF PAPER SHEET PREVIEW */}
            <div
              style={{
                background: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderRadius: "20px",
                padding: "36px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                marginBottom: "24px",
              }}
            >
              {/* PDF Header Stamp & Organization */}
              <div style={{ textAlign: "center", borderBottom: "2px solid #cbd5e1", paddingBottom: "20px", marginBottom: "24px" }}>
                <p style={{ fontSize: "14px", fontWeight: 800, color: "#475569", letterSpacing: "1px", margin: 0 }}>
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </p>
                <small style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>
                  Độc lập - Tự do - Hạnh phúc
                </small>
                <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#0f172a", marginTop: "16px", marginBottom: "4px" }}>
                  HỢP ĐỒNG LAO ĐỘNG
                </h2>
                <span style={{ fontSize: "14px", color: "var(--brand)", fontWeight: 800 }}>
                  Số: {previewPdfContract.code}
                </span>
              </div>

              {/* PDF Main Info Summary */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "#1e293b", marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "white", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Tên hợp đồng:</span>
                  <b style={{ fontWeight: 800 }}>{previewPdfContract.name}</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "white", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Bên A (Người sử dụng lao động):</span>
                  <b style={{ fontWeight: 800 }}>Công ty Cổ phần oHRiise ({previewPdfContract.signer})</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "white", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Bên B (Người lao động):</span>
                  <b style={{ fontWeight: 800 }}>Nguyễn Minh Anh (Mã NV: OH-2024-018)</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "white", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Thời gian hiệu lực:</span>
                  <b style={{ fontWeight: 800 }}>{previewPdfContract.startDate} đến {previewPdfContract.endDate}</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "#eff6ff", borderRadius: "10px", border: "1px solid #bfdbfe", color: "#1e40af" }}>
                  <span style={{ fontWeight: 700 }}>Thời hạn còn lại:</span>
                  <b style={{ fontWeight: 900, fontSize: "16px" }}>{previewPdfContract.remainingText}</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "white", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Mức lương cơ bản:</span>
                  <b style={{ fontWeight: 900, color: "#166534" }}>{previewPdfContract.salary}</b>
                </div>
              </div>

              {/* Digital Stamp Footer */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  background: "#f0fdf4",
                  border: "1px dashed #22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#166534" }}>
                  <Icon name="shield" size={22} />
                  <span style={{ fontSize: "14px", fontWeight: 800 }}>
                    XÁC NHẬN CHỮ KÝ ĐIỆN TỬ VÀ DẤU MỘC BẢO MẬT HỢP LỆ
                  </span>
                </div>
                <Status tone="green">{previewPdfContract.statusText}</Status>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                className="secondary"
                onClick={() => setPreviewPdfContract(null)}
                style={{ padding: "12px 20px", fontSize: "15px", fontWeight: 700, borderRadius: "12px" }}
              >
                Đóng
              </button>
              <button
                className="primary"
                onClick={() => handleDownload(previewPdfContract)}
                style={{ padding: "12px 24px", fontSize: "15px", fontWeight: 900, borderRadius: "12px" }}
              >
                <Icon name="file" size={18} /> Tải xuống tệp PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
