import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

export interface DeviceItem {
  id: string;
  code: string;
  name: string;
  fullName: string;
  category: string;
  issuedDate: string;
  serialNumber: string;
  status: "active" | "maintenance" | "replaced";
  statusText: string;
  condition: string;
  value: string;
  warrantyUntil: string;
  notes: string;
}

const INITIAL_DEVICES: DeviceItem[] = [
  {
    id: "d1",
    code: "#EQ-2024-089",
    name: 'MacBook Pro 16"',
    fullName: 'MacBook Pro 16" M3 Max (36GB RAM / 1TB SSD) - Space Black',
    category: "Laptop / Máy tính làm việc",
    issuedDate: "15/04/2024",
    serialNumber: "C02GX088Q05N",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% nguyên seal bàn giao kèm Sạc Magsafe 140W",
    value: "68.500.000 ₫",
    warrantyUntil: "14/04/2027 (AppleCare+)",
    notes: "Thiết bị chính dùng thiết kế UI/UX & render đồ họa.",
  },
  {
    id: "d2",
    code: "#EQ-2024-090",
    name: 'Màn hình Dell 27" 4K',
    fullName: 'Màn hình hiển thị Dell UltraSharp 27" 4K USB-C (U2723QE)',
    category: "Màn hình mở rộng",
    issuedDate: "20/04/2024",
    serialNumber: "CN-0TY789-74445",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% bàn giao kèm cáp Type-C & cáp nguồn",
    value: "11.200.000 ₫",
    warrantyUntil: "19/04/2027 (Bảo hành 3 năm Dell)",
    notes: "Màn hình đồ họa chuẩn màu 98% DCI-P3 đặt tại bàn làm việc công ty.",
  },
  {
    id: "d3",
    code: "#EQ-2024-112",
    name: "Tai nghe Sony WH-1000XM5",
    fullName: "Tai nghe không dây chống ồn Sony WH-1000XM5 Black",
    category: "Thiết bị âm thanh",
    issuedDate: "05/05/2024",
    serialNumber: "SN-8823192003",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% kèm hộp đựng và cáp sạc USB-C",
    value: "6.800.000 ₫",
    warrantyUntil: "04/05/2025 (Bảo hành 1 năm)",
    notes: "Trang bị tập trung công việc và họp trực tuyến từ xa WFH.",
  },
  {
    id: "d4",
    code: "#EQ-2024-150",
    name: "Bàn phím Keychron & Chuột Master 3S",
    fullName: "Bộ bàn phím cơ Keychron K2 Pro & Chuột Logitech MX Master 3S",
    category: "Phụ kiện ngoại vi",
    issuedDate: "01/09/2024",
    serialNumber: "SN-998811234",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% bàn giao kèm cáp sạc",
    value: "3.500.000 ₫",
    warrantyUntil: "31/08/2025",
    notes: "Bộ chuột phím thái công học chuyên dùng thiết kế.",
  },
];

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceItem[]>(INITIAL_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null);
  const [reportModalDevice, setReportModalDevice] = useState<DeviceItem | null>(null);
  const [reportIssueText, setReportIssueText] = useState("");
  const [isRequestNewOpen, setIsRequestNewOpen] = useState(false);
  const [newRequestType, setNewRequestType] = useState("Thay thế thiết bị hỏng");
  const [newRequestNote, setNewRequestNote] = useState("");

  const handleReportIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportIssueText.trim()) {
      alert("Vui lòng mô tả tình trạng hỏng hóc hoặc sự cố của thiết bị.");
      return;
    }
    alert(
      `Đã gửi yêu cầu hỗ trợ IT / Bảo hành cho thiết bị ${reportModalDevice?.code} (${reportModalDevice?.name}) thành công!\n\nBộ phận IT Helpdesk sẽ liên hệ xử lý trong vòng 24h.`
    );
    setReportModalDevice(null);
    setReportIssueText("");
  };

  const handleNewRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestNote.trim()) {
      alert("Vui lòng nhập lý do đề xuất cấp mới / đổi thiết bị.");
      return;
    }
    alert("Đã gửi đề xuất cấp bổ sung / đổi mới thiết bị tới Trưởng phòng HR & IT thành công!");
    setIsRequestNewOpen(false);
    setNewRequestNote("");
  };

  return (
    <div className="page inner-page" style={{ gap: "28px" }}>
      {/* PAGE HEADER */}
      <div
        className="page-heading"
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
            QUẢN LÝ TÀI SẢN CÔNG TY
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
            Thiết bị được cấp
          </h1>
          <span style={{ fontSize: "16px", color: "var(--text-sub)", fontWeight: 500 }}>
            Danh sách đầy đủ các thiết bị công ty bàn giao: mã thiết bị, tên đầy đủ, ngày cấp, số serial và trạng thái.
          </span>
        </div>

        <button
          className="primary"
          onClick={() => setIsRequestNewOpen(true)}
          style={{
            padding: "15px 28px",
            fontSize: "16px",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "14px",
          }}
        >
          <Icon name="plus" size={20} /> Đề xuất cấp / Đổi thiết bị
        </button>
      </div>



      {/* MAIN DEVICES LIST TABLE & CARDS PANEL */}
      <section
        className="panel"
        style={{
          background: "white",
          borderRadius: "28px",
          padding: "32px",
          border: "1px solid var(--border-soft)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
              DANH SÁCH BÀN GIAO
            </p>
            <h2 style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0" }}>
              Các thiết bị đang quản lý ({devices.length})
            </h2>
          </div>

          <Status tone="green">
            <Icon name="check" size={16} /> Đã kiểm kê 2026
          </Status>
        </div>

        {/* Devices Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "16px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-soft)", color: "var(--text-sub)", fontSize: "14px" }}>
                <th style={{ padding: "16px 18px", fontWeight: 800 }}>MÃ THIẾT BỊ</th>
                <th style={{ padding: "16px 18px", fontWeight: 800 }}>TÊN THIẾT BỊ</th>
                <th style={{ padding: "16px 18px", fontWeight: 800 }}>LOẠI THIẾT BỊ</th>
                <th style={{ padding: "16px 18px", fontWeight: 800 }}>NGÀY CẤP</th>
                <th style={{ padding: "16px 18px", fontWeight: 800 }}>SỐ SERIAL</th>
                <th style={{ padding: "16px 18px", fontWeight: 800 }}>TRẠNG THÁI</th>
                <th style={{ padding: "16px 18px", fontWeight: 800, textAlign: "right" }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                  <td style={{ padding: "18px 18px", fontWeight: 900, color: "var(--brand)", fontSize: "16px" }}>
                    {d.code}
                  </td>
                  <td style={{ padding: "18px 18px", color: "var(--text-main)" }}>
                    <b style={{ fontSize: "17px", fontWeight: 900, color: "var(--text-main)" }}>
                      {d.name}
                    </b>
                  </td>
                  <td style={{ padding: "18px 18px", fontWeight: 700, color: "var(--text-main)" }}>
                    {d.category}
                  </td>
                  <td style={{ padding: "18px 18px", fontWeight: 800, color: "#1e40af" }}>
                    {d.issuedDate}
                  </td>
                  <td style={{ padding: "18px 18px", fontWeight: 700, fontFamily: "monospace", fontSize: "15px", color: "#475569" }}>
                    {d.serialNumber}
                  </td>
                  <td style={{ padding: "18px 18px" }}>
                    <Status tone={d.status === "active" ? "green" : "amber"}>
                      {d.statusText}
                    </Status>
                  </td>
                  <td style={{ padding: "18px 18px", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      <button
                        className="secondary"
                        onClick={() => setSelectedDevice(d)}
                        style={{ padding: "8px 14px", fontSize: "14px", fontWeight: 800, borderRadius: "10px" }}
                      >
                        Chi tiết
                      </button>

                      <button
                        className="secondary"
                        onClick={() => setReportModalDevice(d)}
                        style={{
                          padding: "8px 14px",
                          fontSize: "14px",
                          fontWeight: 800,
                          borderRadius: "10px",
                          color: "#dc2626",
                          borderColor: "#fca5a5",
                        }}
                      >
                        Báo hỏng / IT
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DEVICE DETAIL MODAL */}
      {selectedDevice && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedDevice(null)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "28px",
              padding: "36px",
              width: "100%",
              maxWidth: "620px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "2px solid var(--border-soft)",
                paddingBottom: "18px",
                marginBottom: "24px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "var(--brand)",
                    background: "#eff6ff",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  SỔ TÀI SẢN THIẾT BỊ {selectedDevice.code}
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: "8px 0 2px 0" }}>
                  {selectedDevice.name}
                </h3>
              </div>
              <button
                className="secondary"
                onClick={() => setSelectedDevice(null)}
                style={{ padding: "8px", borderRadius: "10px" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* Full Name & Specs Card */}
            <div style={{ background: "#eff6ff", padding: "16px 20px", borderRadius: "14px", border: "1px solid #bfdbfe", marginBottom: "20px" }}>
              <span style={{ fontSize: "13px", color: "#1e40af", fontWeight: 800, display: "block", marginBottom: "4px", textTransform: "uppercase" }}>
                Tên đầy đủ & Cấu hình thiết bị
              </span>
              <b style={{ fontSize: "17px", color: "#1e3a8a", fontWeight: 900, display: "block" }}>
                {selectedDevice.fullName}
              </b>
            </div>

            {/* Grid details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", border: "1px solid var(--border-soft)" }}>
                <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700, display: "block" }}>Loại thiết bị</span>
                <b style={{ fontSize: "16px", fontWeight: 800 }}>{selectedDevice.category}</b>
              </div>

              <div style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", border: "1px solid var(--border-soft)" }}>
                <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700, display: "block" }}>Giá trị tài sản</span>
                <b style={{ fontSize: "16px", fontWeight: 900, color: "#059669" }}>{selectedDevice.value}</b>
              </div>

              <div style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", border: "1px solid var(--border-soft)" }}>
                <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700, display: "block" }}>Ngày cấp bàn giao</span>
                <b style={{ fontSize: "16px", fontWeight: 800, color: "#1e40af" }}>{selectedDevice.issuedDate}</b>
              </div>

              <div style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", border: "1px solid var(--border-soft)" }}>
                <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700, display: "block" }}>Số Serial Number</span>
                <b style={{ fontSize: "15px", fontWeight: 800, fontFamily: "monospace" }}>{selectedDevice.serialNumber}</b>
              </div>

              <div style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", border: "1px solid var(--border-soft)", gridColumn: "span 2" }}>
                <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700, display: "block" }}>Hạn bảo hành</span>
                <b style={{ fontSize: "16px", fontWeight: 800, color: "#166534" }}>{selectedDevice.warrantyUntil}</b>
              </div>
            </div>

            {/* Condition & Notes */}
            <div style={{ background: "#f8fafc", padding: "16px 20px", borderRadius: "14px", border: "1px solid var(--border-soft)", marginBottom: "24px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                TÌNH TRẠNG KHI BÀN GIAO & GHI CHÚ
              </span>
              <p style={{ fontSize: "15px", color: "var(--text-main)", margin: "0 0 6px 0", fontWeight: 600 }}>
                {selectedDevice.condition}
              </p>
              <small style={{ fontSize: "14px", color: "var(--text-sub)", display: "block", marginTop: "6px", borderTop: "1px dashed var(--border-soft)", paddingTop: "6px" }}>
                <b>Mục đích sử dụng & Ghi chú:</b> {selectedDevice.notes}
              </small>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                className="secondary"
                onClick={() => setSelectedDevice(null)}
                style={{ padding: "12px 20px", fontSize: "15px", fontWeight: 700, borderRadius: "12px" }}
              >
                Đóng
              </button>
              <button
                className="primary"
                onClick={() => {
                  setReportModalDevice(selectedDevice);
                  setSelectedDevice(null);
                }}
                style={{ padding: "12px 24px", fontSize: "15px", fontWeight: 900, borderRadius: "12px", background: "#dc2626", borderColor: "#dc2626" }}
              >
                Báo hỏng / Cần IT hỗ trợ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT ISSUE / IT SUPPORT MODAL */}
      {reportModalDevice && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setReportModalDevice(null)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "28px",
              padding: "32px",
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
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
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#dc2626", letterSpacing: "0.5px" }}>
                  BÁO SỰ CỐ THIẾT BỊ IT
                </p>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Báo hỏng {reportModalDevice.code}
                </h3>
              </div>
              <button
                className="secondary"
                onClick={() => setReportModalDevice(null)}
                style={{ padding: "8px", borderRadius: "10px" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleReportIssueSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ background: "#fef2f2", padding: "14px 18px", borderRadius: "14px", border: "1px solid #fecaca" }}>
                <b style={{ fontSize: "16px", color: "#991b1b", display: "block" }}>{reportModalDevice.name}</b>
                <small style={{ fontSize: "13px", color: "#b91c1c" }}>Số Serial: {reportModalDevice.serialNumber}</small>
              </div>

              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Mô tả tình trạng sự cố / hỏng hóc <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  rows={4}
                  value={reportIssueText}
                  onChange={(e) => setReportIssueText(e.target.value)}
                  placeholder="Ví dụ: Màn hình bị giật sọc, pin chai không tích điện, bàn phím kẹt nút..."
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setReportModalDevice(null)}
                  style={{ padding: "12px 20px", fontSize: "15px", fontWeight: 700 }}
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "12px 24px", fontSize: "15px", fontWeight: 900, background: "#dc2626", borderColor: "#dc2626" }}
                >
                  Gửi báo hỏng cho IT Helpdesk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST NEW / REPLACEMENT DEVICE MODAL */}
      {isRequestNewOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsRequestNewOpen(false)}
        >
          <div
            className="modal-card"
            style={{
              background: "white",
              borderRadius: "28px",
              padding: "32px",
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
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
                  ĐỀ XUẤT TÀI SẢN
                </p>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Đề xuất cấp bổ sung / Đổi mới thiết bị
                </h3>
              </div>
              <button
                className="secondary"
                onClick={() => setIsRequestNewOpen(false)}
                style={{ padding: "8px", borderRadius: "10px" }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleNewRequestSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Hình thức đề xuất
                </label>
                <select
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "white",
                  }}
                >
                  <option value="Thay thế thiết bị hỏng">Thay thế thiết bị hỏng / Cũ</option>
                  <option value="Cấp mới phục vụ dự án">Cấp bổ sung thiết bị phục vụ dự án mới</option>
                  <option value="Nâng cấp cấu hình">Nâng cấp cấu hình (RAM / SSD)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "6px" }}>
                  Lý do đề xuất & Tên thiết bị mong muốn <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  rows={4}
                  value={newRequestNote}
                  onChange={(e) => setNewRequestNote(e.target.value)}
                  placeholder="Ghi rõ lý do nhu cầu công việc và thiết bị cần trang bị..."
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsRequestNewOpen(false)}
                  style={{ padding: "12px 20px", fontSize: "15px", fontWeight: 700 }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary"
                  style={{ padding: "12px 24px", fontSize: "15px", fontWeight: 900 }}
                >
                  <Icon name="check" size={18} /> Gửi đề xuất tới HR & IT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
