import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

interface SalaryDetail {
  month: string;
  monthLabel: string;
  paymentDate: string;
  status: string;
  baseSalary: number;
  lunchAllowance: number;
  responsibilityAllowance: number;
  kpiBonus: number;
  insuranceDeduction: number;
  taxDeduction: number;
  bankAccount: string;
}

const SALARY_DATA: Record<string, SalaryDetail> = {
  "09/2026": {
    month: "09/2026",
    monthLabel: "Tháng 09/2026",
    paymentDate: "30/09/2026",
    status: "Đã thanh toán",
    baseSalary: 28000000,
    lunchAllowance: 730000,
    responsibilityAllowance: 1500000,
    kpiBonus: 0,
    insuranceDeduction: 2940000,
    taxDeduction: 1184000,
    bankAccount: "Techcombank · **** **** 9018",
  },
  "08/2026": {
    month: "08/2026",
    monthLabel: "Tháng 08/2026",
    paymentDate: "31/08/2026",
    status: "Đã thanh toán",
    baseSalary: 28000000,
    lunchAllowance: 730000,
    responsibilityAllowance: 1200000,
    kpiBonus: 0,
    insuranceDeduction: 2940000,
    taxDeduction: 1120000,
    bankAccount: "Techcombank · **** **** 9018",
  },
  "07/2026": {
    month: "07/2026",
    monthLabel: "Tháng 07/2026",
    paymentDate: "31/07/2026",
    status: "Đã thanh toán",
    baseSalary: 28000000,
    lunchAllowance: 730000,
    responsibilityAllowance: 1200000,
    kpiBonus: 2000000,
    insuranceDeduction: 2940000,
    taxDeduction: 1350000,
    bankAccount: "Techcombank · **** **** 9018",
  },
  "06/2026": {
    month: "06/2026",
    monthLabel: "Tháng 06/2026",
    paymentDate: "30/06/2026",
    status: "Đã thanh toán",
    baseSalary: 28000000,
    lunchAllowance: 730000,
    responsibilityAllowance: 1000000,
    kpiBonus: 0,
    insuranceDeduction: 2940000,
    taxDeduction: 1090000,
    bankAccount: "Techcombank · **** **** 9018",
  },
};

export default function PayslipPage() {
  const [selectedMonth, setSelectedMonth] = useState("09/2026");
  const [isDownloading, setIsDownloading] = useState(false);

  const currentData = SALARY_DATA[selectedMonth] || SALARY_DATA["09/2026"];

  const grossIncome =
    currentData.baseSalary +
    currentData.lunchAllowance +
    currentData.responsibilityAllowance +
    currentData.kpiBonus;

  const totalDeduction = currentData.insuranceDeduction + currentData.taxDeduction;
  const netSalary = grossIncome - totalDeduction;

  const formatVnd = (val: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);
  };

  // Simulate PDF Download Action
  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert(
        `Đã tải xuống tập tin "Phieu_Luong_Thang_${selectedMonth.replace("/", "_")}.pdf" thành công!\n\nMật khẩu mở tệp PDF bảo mật là 6 số cuối CCCD của bạn.`
      );
    }, 800);
  };

  return (
    <div className="page inner-page">
      {/* PAGE HEADER & FILTERS */}
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
            THU NHẬP CỦA TÔI
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
            Phiếu lương
          </h1>
          <span style={{ fontSize: "16px", color: "var(--text-sub)", fontWeight: 500 }}>
            Thông tin thu nhập cá nhân riêng tư, được mã hóa bảo mật theo chính sách công ty.
          </span>
        </div>

        {/* Action Controls: Month Filter & PDF Download Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-sub)", display: "block", marginBottom: "4px" }}>
              CHỌN PHIẾU LƯƠNG THÁNG
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: "13px 20px",
                borderRadius: "12px",
                border: "2px solid var(--brand)",
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--brand)",
                background: "white",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.1)",
              }}
            >
              <option value="09/2026">Tháng 09 / 2026</option>
              <option value="08/2026">Tháng 08 / 2026</option>
              <option value="07/2026">Tháng 07 / 2026</option>
              <option value="06/2026">Tháng 06 / 2026</option>
            </select>
          </div>

          <button
            className="primary"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            style={{
              padding: "15px 28px",
              fontSize: "16px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Icon name="file" size={20} />
            {isDownloading ? "Đang xuất PDF..." : "Tải xuống dạng PDF"}
          </button>
        </div>
      </div>

      {/* PRIVACY SECURITY BANNER */}
      <div
        className="privacy-banner"
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "16px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "28px",
        }}
      >
        <div style={{ color: "#2563eb" }}>
          <Icon name="shield" size={24} />
        </div>
        <span style={{ fontSize: "15px", color: "#1e40af" }}>
          <b style={{ fontWeight: 800 }}>Dữ liệu được bảo mật mã hóa:</b> Tập tin PDF tải xuống được mã hóa mật khẩu theo số CMND/CCCD cá nhân của bạn để đảm bảo an toàn tuyệt đối.
        </span>
      </div>

      {/* PAYSLIP MAIN LAYOUT */}
      <div style={{ width: "100%" }}>
        {/* DETAILED PAYSLIP SHEET */}
        <section
          className="panel"
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "36px",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
            width: "100%",
          }}
        >
          {/* Paper Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "2px solid var(--border-soft)",
              paddingBottom: "24px",
              marginBottom: "28px",
            }}
          >
            <div>
              <b style={{ fontSize: "26px", fontWeight: 900, color: "var(--brand)", display: "block" }}>
                oHRiise Corp
              </b>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)", marginTop: "4px", display: "block" }}>
                PHIẾU LƯƠNG CHI TIẾT · THÁNG {currentData.month}
              </span>
              <small style={{ fontSize: "14px", color: "var(--text-sub)" }}>
                Kỳ thanh toán: {currentData.paymentDate}
              </small>
            </div>
            <Status tone="green">{currentData.status}</Status>
          </div>

          {/* Employee Info Card */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "18px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
              border: "1px solid var(--border-soft)",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                MA
              </div>
              <div>
                <b style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>
                  Nguyễn Minh Anh
                </b>
                <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 600 }}>
                  Mã NV: OH-2024-018 · Chức danh: Senior UI/UX Designer
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: 700, display: "block" }}>
                TÀI KHOẢN NHẬN LƯƠNG
              </span>
              <b style={{ fontSize: "15px", fontWeight: 800, color: "#1e40af" }}>
                {currentData.bankAccount}
              </b>
            </div>
          </div>

          {/* Section A: Thu nhập (Gross) */}
          <div style={{ marginBottom: "28px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", marginBottom: "14px", borderLeft: "4px solid #166534", paddingLeft: "12px" }}>
              A. CÁC KHOẢN THU NHẬP (INCOME)
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc" }}>
                <span>Lương cơ bản theo hợp đồng</span>
                <b style={{ fontWeight: 800 }}>{formatVnd(currentData.baseSalary)}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc" }}>
                <span>Phụ cấp ăn trưa</span>
                <b style={{ fontWeight: 800 }}>{formatVnd(currentData.lunchAllowance)}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc" }}>
                <span>Phụ cấp trách nhiệm công việc</span>
                <b style={{ fontWeight: 800 }}>{formatVnd(currentData.responsibilityAllowance)}</b>
              </div>
              {currentData.kpiBonus > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "#f0fdf4", color: "#166534" }}>
                  <span>Thưởng hiệu suất KPI xuất sắc</span>
                  <b style={{ fontWeight: 800 }}>{formatVnd(currentData.kpiBonus)}</b>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#eff6ff",
                  color: "#1e40af",
                  fontWeight: 900,
                  fontSize: "17px",
                  marginTop: "6px",
                }}
              >
                <span>TỔNG THU NHẬP (GROSS)</span>
                <span>{formatVnd(grossIncome)}</span>
              </div>
            </div>
          </div>

          {/* Section B: Khấu trừ (Deductions) */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", marginBottom: "14px", borderLeft: "4px solid #dc2626", paddingLeft: "12px" }}>
              B. CÁC KHOẢN KHẤU TRỪ (DEDUCTIONS)
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc" }}>
                <span>Trích nộp Bảo hiểm (BHXH, BHYT, BHTN - 10.5%)</span>
                <b style={{ fontWeight: 800, color: "#dc2626" }}>- {formatVnd(currentData.insuranceDeduction)}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc" }}>
                <span>Thuế thu nhập cá nhân (TNCN) tạm tính</span>
                <b style={{ fontWeight: 800, color: "#dc2626" }}>- {formatVnd(currentData.taxDeduction)}</b>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#fef2f2",
                  color: "#991b1b",
                  fontWeight: 900,
                  fontSize: "17px",
                  marginTop: "6px",
                }}
              >
                <span>TỔNG KHẤU TRỪ</span>
                <span>- {formatVnd(totalDeduction)}</span>
              </div>
            </div>
          </div>

          {/* Net Salary Result Bar */}
          <div
            style={{
              background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
              borderRadius: "20px",
              padding: "24px 28px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 10px 25px -5px rgba(22, 101, 52, 0.4)",
            }}
          >
            <div>
              <span style={{ fontSize: "14px", fontWeight: 800, opacity: 0.9, letterSpacing: "1px" }}>
                LƯƠNG THỰC NHẬN (NET)
              </span>
              <strong style={{ fontSize: "36px", fontWeight: 900, display: "block", marginTop: "4px" }}>
                {formatVnd(netSalary)}
              </strong>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="check" size={28} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
