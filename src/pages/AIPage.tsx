import { Icon, Status } from "../components/UI";

export default function AIPage() {
  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>AI INTELLIGENCE</p>
          <h1>Hoạt động WFH của tôi</h1>
          <span>Minh bạch về dữ liệu được ghi nhận và cách AI hỗ trợ đánh giá.</span>
        </div>
        <button className="secondary">
          <Icon name="shield" /> Quyền riêng tư & dữ liệu
        </button>
      </div>

      <section className="ai-hero">
        <div className="ai-orbit">
          <Icon name="sparkles" size={26} />
          <i /><i /><i />
        </div>
        <div>
          <p>PHIÊN HÔM NAY · 22/09</p>
          <h2>Đang ghi nhận hoạt động</h2>
          <span>Phiên buổi sáng hoàn tất · Phiên buổi chiều đang diễn ra</span>
        </div>
        <div className="ai-stats">
          <div>
            <strong>15</strong>
            <span>ảnh đã lấy mẫu</span>
          </div>
          <div>
            <strong>75%</strong>
            <span>tiến trình phiên</span>
          </div>
          <Status tone="green">Hoạt động rõ ràng</Status>
        </div>
      </section>

      <div className="split-grid ai-content">
        <section className="panel timeline">
          <div className="panel-title">
            <div>
              <p>DÒNG THỜI GIAN</p>
              <h2>Thứ Ba, 22 tháng 9</h2>
            </div>
            <button>Chi tiết dữ liệu</button>
          </div>

          {[
            ["08:02", "Bắt đầu phiên làm việc", "Đã xác thực thiết bị và lịch WFH."],
            ["09:16", "Lấy mẫu hoạt động", "Figma · oHRiise Design System"],
            ["10:34", "Lấy mẫu hoạt động", "Google Meet · Product weekly"],
            ["11:00", "Hoàn tất phiên buổi sáng", "10 ảnh mẫu đã được xử lý."],
            ["13:04", "Bắt đầu phiên buổi chiều", "5/10 ảnh mẫu đã được ghi nhận."],
          ].map((x, i) => (
            <div className={`timeline-item ${i === 4 ? "current" : ""}`} key={x[0]}>
              <time>{x[0]}</time>
              <i />
              <div>
                <b>{x[1]}</b>
                <span>{x[2]}</span>
              </div>
              {i === 1 || i === 2 ? (
                <div className="sample-thumb">
                  <Icon name={i === 1 ? "sparkles" : "users"} />
                </div>
              ) : null}
            </div>
          ))}
        </section>

        <section className="panel assessment">
          <p>ĐÁNH GIÁ AI</p>
          <h2>Tín hiệu hoạt động nhất quán</h2>
          <span>
            AI chỉ hỗ trợ tổng hợp dữ liệu. Kết quả này không phải điểm năng suất và luôn có thể được con người xem xét.
          </span>
          <div className="signal">
            <span>Hoạt động liên quan công việc</span>
            <strong>
              Đã ghi nhận <Icon name="check" />
            </strong>
          </div>
          <div className="signal">
            <span>Báo cáo cuối ngày</span>
            <strong className="muted">Chưa đến hạn</strong>
          </div>
          <div className="signal">
            <span>Trạng thái họp</span>
            <strong>
              1 cuộc họp <Icon name="check" />
            </strong>
          </div>
          <div className="privacy-note">
            <Icon name="shield" />
            <span>
              <b>Bạn kiểm soát dữ liệu của mình</b>
              <br />
              Ảnh lấy mẫu chỉ hiển thị cho người có quyền phù hợp.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
