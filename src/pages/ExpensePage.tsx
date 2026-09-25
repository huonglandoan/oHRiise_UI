import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

export interface ExpenseRecord {
  id: string;
  category: string;
  title: string;
  amount: number;
  date: string;
  department: string;
  description: string;
  status: "pending" | "hr_review" | "paid" | "cancelled";
  statusText: string;
  attachment?: string;
}

const INITIAL_EXPENSE_RECORDS: ExpenseRecord[] = [
  {
    id: "#BH-2026-0922",
    category: "Phần mềm & công cụ",
    title: "Figma Professional · Tháng 9/2026",
    amount: 1850000,
    date: "22/09/2026",
    department: "Product & Design Team",
    description: "Gói bản quyền hàng tháng cho 3 nhân sự UI/UX Designer.",
    status: "pending",
    statusText: "Chờ Team Lead duyệt",
    attachment: "Invoice_Figma_Sep2026.pdf",
  },
  {
    id: "#BH-2026-0910",
    category: "Chứng chỉ chuyên môn",
    title: "Google UX Design Certificate",
    amount: 1420000,
    date: "10/09/2026",
    department: "Product & Design Team",
    description: "Chi phí đăng ký khóa học nâng cao kỹ năng thiết kế sản phẩm.",
    status: "paid",
    statusText: "Đã thanh toán",
    attachment: "Coursera_Receipt_GoogleUX.pdf",
  },
  {
    id: "#BH-2026-0904",
    category: "Team bonding",
    title: "Bữa trưa gắn kết Product Team",
    amount: 1200000,
    date: "04/09/2026",
    department: "Product & Design Team",
    description: "Tiệc gắn kết nội bộ hàng tháng theo ngân sách phòng ban.",
    status: "hr_review",
    statusText: "HR / Kế toán xử lý",
    attachment: "HoaDon_Manwah_0409.jpg",
  },
  {
    id: "#BH-2026-0901",
    category: "Thiết bị làm việc",
    title: "Bàn phím không dây Bluetooth Keychron K2",
    amount: 350000,
    date: "01/09/2026",
    department: "Engineering",
    description: "Hỗ trợ 50% chi phí thiết bị ngoại vi cá nhân theo chính sách.",
    status: "paid",
    statusText: "Đã thanh toán",
  },
];

export default function ExpensePage({ open }: { open?: () => void }) {
  // Sub-tabs: "form" comes first, "history" is second (at the end)
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");
  const [records, setRecords] = useState<ExpenseRecord[]>(INITIAL_EXPENSE_RECORDS);

  // Form States
  const [category, setCategory] = useState("Phần mềm & công cụ");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState("2026-09-25");
  const [department, setDepartment] = useState("Product & Design Team");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState("");

  // History Filter States
  const [filterStartDate, setFilterStartDate] = useState("2026-09-01");
  const [filterEndDate, setFilterEndDate] = useState("2026-09-30");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Modal Cancel State
  const [cancelModalRecord, setCancelModalRecord] = useState<ExpenseRecord | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Format currency helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);
  };

  // Submit Expense Form
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Vui lòng nhập tên khoản chi / nội dung bồi hoàn.");
      return;
    }
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ lớn hơn 0.");
      return;
    }

    const dateFormatted = date.split("-").reverse().join("/");

    const newRecord: ExpenseRecord = {
      id: `#BH-2026-09${Math.floor(Math.random() * 90 + 10)}`,
      category,
      title,
      amount: numAmount,
      date: dateFormatted,
      department,
      description: description || title,
      status: "pending",
      statusText: "Chờ Team Lead duyệt",
      attachment: attachment ? attachment : undefined,
    };

    setRecords([newRecord, ...records]);
    alert("Đã gửi phiếu đề nghị bồi hoàn chi phí thành công! Phiếu đang chờ Team Lead duyệt.");
    setTitle("");
    setAmount("");
    setDescription("");
    setAttachment("");
    setActiveTab("history");
  };

  // Confirm Cancel Expense
  const handleConfirmCancel = () => {
    if (!cancelModalRecord) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === cancelModalRecord.id
          ? { ...r, status: "cancelled", statusText: "Đã hủy" }
          : r
      )
    );
    alert(`Đã hủy phiếu bồi hoàn chi phí ${cancelModalRecord.id} thành công.`);
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

  // Filtered History Records
  const filteredRecords = records
    .filter((r) => {
      // Filter status
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      // Filter date range
      const parts = r.date.split("/");
      if (parts.length === 3) {
        const recIso = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
        if (filterStartDate && recIso < filterStartDate) return false;
        if (filterEndDate && recIso > filterEndDate) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = getRecordTimestamp(a.date);
      const timeB = getRecordTimestamp(b.date);
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

  // Total amount summary
  const totalAmountSubmitted = records.reduce((acc, cur) => acc + (cur.status !== "cancelled" ? cur.amount : 0), 0);

  return (
    <div className="page inner-page">
      {/* PAGE HEADER - LARGER FONTS */}
      <div className="page-heading" style={{ marginBottom: "28px" }}>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
            CHI PHÍ CÔNG VIỆC
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
            Bồi hoàn chi phí
          </h1>
          <span style={{ fontSize: "16px", color: "var(--text-sub)", fontWeight: 500 }}>
            Theo dõi hóa đơn chứng từ, luồng phê duyệt và trạng thái thanh toán khoản chi.
          </span>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION BAR: TẠO PHIẾU FIRST, LỊCH SỬ BỒI HOÀN AT THE END */}
      <div style={{ marginBottom: "28px", borderBottom: "2px solid var(--border-soft)" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          {/* TAB 1: TẠO PHIẾU BỒI HOÀN (FIRST) */}
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
            <Icon name="plus" size={22} /> Tạo phiếu bồi hoàn
          </button>

          {/* TAB 2: LỊCH SỬ BỒI HOÀN (AT THE END) */}
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
            <Icon name="receipt" size={22} /> Lịch sử bồi hoàn
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: TẠO PHIẾU BỒI HOÀN */}
      {activeTab === "form" && (
        <section className="panel" style={{ padding: "32px", width: "100%" }}>
          <div style={{ marginBottom: "26px" }}>
            <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
              PHIẾU ĐỀ NGHỊ MỚI
            </p>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
              Tạo phiếu đề nghị bồi hoàn chi phí
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-sub)", marginTop: "4px" }}>
              Điền thông tin khoản chi công việc và đính kèm hóa đơn chứng từ hợp lệ.
            </p>
          </div>

          <form onSubmit={handleSubmitForm} style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
            {/* Row 1: Danh mục & Tên khoản chi */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Danh mục chi phí <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  <option value="Phần mềm & công cụ">Phần mềm & công cụ (Figma, ChatGPT, GitHub...)</option>
                  <option value="Chứng chỉ chuyên môn">Học tập & Chứng chỉ chuyên môn</option>
                  <option value="Team bonding">Tiếp khách & Team bonding</option>
                  <option value="Thiết bị làm việc">Thiết bị & Đồ dùng làm việc</option>
                  <option value="Công tác phí">Công tác phí & Di chuyển</option>
                  <option value="Chi phí khác">Chi phí phát sinh khác</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Tên khoản chi / Nội dung bồi hoàn <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Bản quyền Figma Professional tháng 9/2026..."
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

            {/* Row 2: Số tiền, Ngày phát sinh & Phong ban */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Số tiền đề nghị (VNĐ) <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1850000"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-soft)",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "var(--brand)",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Ngày phát sinh chi phí <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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

              <div>
                <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                  Bộ phận / Phòng ban chịu chi phí
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
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
                  <option value="Product & Design Team">Product & Design Team</option>
                  <option value="Engineering Team">Engineering Team</option>
                  <option value="Marketing & Business">Marketing & Business</option>
                  <option value="Vận hành & Nhân sự">Vận hành & HR</option>
                </select>
              </div>
            </div>

            {/* Row 3: Description */}
            <div>
              <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                Mô tả chi tiết & Ghi chú mục đích sử dụng
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ghi rõ thông tin chi tiết mục đích phục vụ công việc..."
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Row 4: Attachment Link */}
            <div>
              <label style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "10px" }}>
                Đính kèm Link hóa đơn VAT / Chứng từ biên lai <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="text"
                value={attachment}
                onChange={(e) => setAttachment(e.target.value)}
                placeholder="Link Google Drive, Dropbox hoặc ảnh biên lai hóa đơn chuyển khoản"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
              <button
                className="primary"
                type="submit"
                style={{ padding: "16px 36px", fontSize: "17px", fontWeight: 900 }}
              >
                <Icon name="check" size={22} /> Gửi phiếu đề nghị bồi hoàn
              </button>
            </div>
          </form>
        </section>
      )}

      {/* SUB-TAB 2: LỊCH SỬ BỒI HOÀN (AT THE END) */}
      {activeTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          {/* Filter Panel */}
          <section className="panel" style={{ padding: "28px", width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.5px" }}>
                BỘ LỌC TRA CỨU
              </p>
              <h2 style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
                Tra cứu lịch sử bồi hoàn chi phí
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
                  <option value="hr_review">HR / Kế toán xử lý</option>
                  <option value="paid">Đã thanh toán</option>
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
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>MÃ PHIẾU</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>DANH MỤC</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>NỘI DUNG CHI</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>SỐ TIỀN (VNĐ)</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>NGÀY PHÁT SINH</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800 }}>TRẠNG THÁI</th>
                    <th style={{ padding: "16px 18px", fontWeight: 800, textAlign: "right" }}>THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                      <td style={{ padding: "18px 18px", fontWeight: 900, color: "var(--brand)", fontSize: "17px" }}>{r.id}</td>
                      <td style={{ padding: "18px 18px", fontWeight: 700, color: "var(--text-main)" }}>
                        {r.category}
                      </td>
                      <td style={{ padding: "18px 18px", color: "var(--text-main)" }}>
                        <b style={{ fontSize: "16px", display: "block" }}>{r.title}</b>
                        <small style={{ color: "var(--text-sub)", fontSize: "14px" }}>
                          Phòng ban: {r.department}
                        </small>
                      </td>
                      <td style={{ padding: "18px 18px", fontWeight: 900, color: "#166534", fontSize: "17px" }}>
                        {formatCurrency(r.amount)}
                      </td>
                      <td style={{ padding: "18px 18px", fontWeight: 700, color: "#1e40af" }}>
                        {r.date}
                      </td>
                      <td style={{ padding: "18px 18px" }}>
                        <Status
                          tone={
                            r.status === "paid"
                              ? "green"
                              : r.status === "hr_review"
                              ? "blue"
                              : r.status === "pending"
                              ? "amber"
                              : "gray"
                          }
                        >
                          {r.statusText}
                        </Status>
                      </td>
                      <td style={{ padding: "18px 18px", textAlign: "right" }}>
                        {(r.status === "pending" || r.status === "hr_review") && (
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
                            Hủy phiếu
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
              Xác nhận Hủy phiếu bồi hoàn {cancelModalRecord.id}?
            </h3>
            <p style={{ fontSize: "16px", color: "var(--text-sub)", marginBottom: "20px" }}>
              Bạn đang yêu cầu hủy phiếu đề nghị bồi hoàn khoản chi <b>{cancelModalRecord.title}</b> ({formatCurrency(cancelModalRecord.amount)}).
            </p>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "8px" }}>
                Lý do hủy phiếu
              </label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Nhập lý do hủy phiếu bồi hoàn..."
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
                Xác nhận Hủy phiếu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
