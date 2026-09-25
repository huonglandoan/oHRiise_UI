import { Icon, Status } from "../components/UI";

export default function SchedulePage() {
  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>LỊCH LÀM VIỆC CỦA TÔI</p>
          <h1>Ca làm việc</h1>
          <span>Lịch hiện tại và quy trình đổi ca minh bạch.</span>
        </div>
        <button className="primary">
          <Icon name="arrow" /> Đề xuất đổi ca
        </button>
      </div>

      <section className="shift-current">
        <div>
          <p>CA HIỆN TẠI</p>
          <h2>Ca hành chính linh hoạt</h2>
          <span>Thứ Hai – Thứ Sáu · 08:00–17:00</span>
        </div>
        <div>
          <Icon name="clock" />
          <span>
            <b>8 giờ / ngày</b>Nghỉ trưa 12:00–13:00
          </span>
        </div>
        <Status tone="green">Đang áp dụng</Status>
      </section>

      <section className="panel shift-week">
        <div className="panel-title">
          <div>
            <p>TUẦN NÀY</p>
            <h2>21–25 tháng 9</h2>
          </div>
        </div>
        {[
          ["T2", "21", "08:00 — 17:00", "Văn phòng", "blue"],
          ["T3", "22", "08:00 — 17:00", "Văn phòng", "blue"],
          ["T4", "23", "08:00 — 17:00", "WFH", "green"],
          ["T5", "24", "09:00 — 18:00", "Văn phòng", "blue"],
          ["T6", "25", "08:00 — 17:00", "WFH", "green"],
        ].map((x) => (
          <div className="shift-day" key={x[1]}>
            <div>
              <span>{x[0]}</span>
              <b>{x[1]}</b>
            </div>
            <i />
            <span>
              <b>{x[2]}</b>
              <small>Ca hành chính</small>
            </span>
            <Status tone={x[4] as "blue" | "green"}>{x[3]}</Status>
          </div>
        ))}
      </section>

      <section className="panel swap-flow">
        <div className="panel-title">
          <div>
            <p>ĐỀ XUẤT ĐỔI CA</p>
            <h2>Quy trình phê duyệt</h2>
          </div>
        </div>
        <div>
          <span className="done">
            <Icon name="check" />
            Bạn đề xuất
          </span>
          <i />
          <span className="current">Đồng nghiệp xác nhận</span>
          <i />
          <span>Team Lead phê duyệt</span>
          <i />
          <span>Lịch được cập nhật</span>
        </div>
        <small>Yêu cầu chỉ được chuyển đến Team Lead sau khi đồng nghiệp đồng ý.</small>
      </section>
    </div>
  );
}
