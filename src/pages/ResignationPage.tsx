import { useState } from "react";
import { Icon, IconName, Status } from "../components/UI";

export default function ResignationPage() {
  const [started, setStarted] = useState(false);
  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>VÒNG ĐỜI NHÂN VIÊN</p>
          <h1>Thôi việc</h1>
          <span>Thông tin rõ ràng, quy trình tôn trọng và bảo mật.</span>
        </div>
      </div>

      {started ? (
        <section className="resignation-form panel">
          <div className="panel-title">
            <div>
              <p>YÊU CẦU THÔI VIỆC</p>
              <h2>Thông tin dự kiến</h2>
            </div>
            <Status tone="blue">Bản nháp</Status>
          </div>

          <div className="notice-check">
            <Icon name="shield" />
            <span>
              <b>Thời hạn báo trước: 30 ngày</b>
              <br />
              Ngày làm việc cuối sớm nhất theo hợp đồng là 22/10/2026.
            </span>
          </div>

          <div className="form-row">
            <label>
              Ngày làm việc cuối
              <input type="date" defaultValue="2026-10-30" />
            </label>
            <label>
              Loại nhân sự
              <input value="Full-time · Chính thức" readOnly />
            </label>
          </div>

          <label>
            Lý do
            <textarea placeholder="Chia sẻ lý do của bạn..." />
          </label>

          <label>
            Kế hoạch bàn giao
            <textarea placeholder="Các dự án, tài liệu và người tiếp nhận..." />
          </label>

          <div className="modal-actions static">
            <button className="secondary" onClick={() => setStarted(false)}>
              Hủy
            </button>
            <button className="primary">
              Gửi yêu cầu <Icon name="arrow" />
            </button>
          </div>
        </section>
      ) : (
        <div className="resignation-layout">
          <section className="resignation-intro">
            <div className="rise-line">
              <i /><i /><i />
            </div>
            <p>TRƯỚC KHI BẮT ĐẦU</p>
            <h2>Chúng tôi sẽ đồng hành cùng bạn qua từng bước</h2>
            <span>
              Yêu cầu sẽ được xử lý riêng tư bởi Team Lead và HR. Bạn có thể lưu bản nháp trước khi gửi.
            </span>
            <button className="primary" onClick={() => setStarted(true)}>
              Bắt đầu yêu cầu <Icon name="arrow" />
            </button>
          </section>

          <section className="panel notice-policy">
            <p>THÔNG TIN HỢP ĐỒNG</p>
            <div>
              <span>Loại nhân sự</span>
              <b>Full-time · Chính thức</b>
            </div>
            <div>
              <span>Báo trước tối thiểu</span>
              <b>30 ngày</b>
            </div>
            <div>
              <span>Người xử lý</span>
              <b>Trần Hoàng Nam · HR HCM</b>
            </div>
            <div className="privacy-note">
              <Icon name="shield" />
              <span>
                <b>Bảo mật thông tin</b>
                <br />
                Chỉ người tham gia xử lý mới xem được yêu cầu.
              </span>
            </div>
          </section>
        </div>
      )}

      <section className="offboard-preview">
        <p>SAU KHI ĐƯỢC DUYỆT</p>
        <h2>Quy trình bàn giao</h2>
        <div>
          {[
            ["file", "Xác nhận hồ sơ"],
            ["users", "Bàn giao công việc"],
            ["laptop", "Bàn giao tài sản"],
            ["shield", "Thu hồi quyền truy cập"],
            ["check", "Hoàn tất"],
          ].map((x, i) => (
            <span key={x[1]}>
              <i>
                <Icon name={x[0] as IconName} />
              </i>
              <b>{x[1]}</b>
              {i < 4 && <em />}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
