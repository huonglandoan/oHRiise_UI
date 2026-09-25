import { Icon, IconName } from "../components/UI";
import { Page } from "../types";

export default function NotificationsPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="page inner-page narrow-page">
      <div className="page-heading">
        <div>
          <p>TRUNG TÂM THÔNG BÁO</p>
          <h1>Thông báo</h1>
          <span>Cập nhật quan trọng từ công việc và các yêu cầu của bạn.</span>
        </div>
        <button className="secondary">Đánh dấu tất cả đã đọc</button>
      </div>

      <div className="notification-tabs">
        <button className="active">
          Tất cả <em>3</em>
        </button>
        <button>Yêu cầu</button>
        <button>Hệ thống</button>
      </div>

      <section className="notification-list">
        {[
          ["check", "Đơn WFH đã được duyệt", "Trần Hoàng Nam đã duyệt yêu cầu WFH ngày 25/09.", "wfh", "5 phút trước", "green"],
          ["calendar", "Đơn nghỉ phép đang chờ xử lý", "Yêu cầu nghỉ 28–29/09 đã được chuyển đến Team Lead.", "leave", "1 giờ trước", "amber"],
          ["file", "Phiếu lương tháng 09 đã phát hành", "Phiếu lương mới của bạn đã sẵn sàng để xem.", "payslip", "Hôm qua", "blue"],
          ["clock", "Bổ sung checkout ngày 18/09", "Dữ liệu chấm công đang thiếu giờ ra. Vui lòng bổ sung.", "attendance", "2 ngày trước", "red"],
        ].map((n, i) => (
          <button className={i < 3 ? "unread" : ""} onClick={() => navigate(n[3] as Page)} key={n[1]}>
            <span className={`notice-icon ${n[5]}`}>
              <Icon name={n[0] as IconName} />
            </span>
            <span>
              <b>{n[1]}</b>
              <small>{n[2]}</small>
              <em>{n[4]}</em>
            </span>
            <Icon name="chevron" />
          </button>
        ))}
      </section>
    </div>
  );
}
