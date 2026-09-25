import { Icon, Status } from "../components/UI";

export default function AnalyticsPage() {
  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>PEOPLE ANALYTICS · TOÀN CÔNG TY</p>
          <h1>Phân tích nhân sự</h1>
          <span>Hiểu lực lượng lao động để đưa ra quyết định tốt hơn.</span>
        </div>
        <div className="heading-actions">
          <button className="secondary">
            Năm 2026 <Icon name="chevron" />
          </button>
          <button className="primary">Xuất báo cáo</button>
        </div>
      </div>

      <div className="analytics-kpis">
        <div>
          <span>Nhân sự hiện tại</span>
          <strong>186</strong>
          <em>+12 từ đầu năm</em>
        </div>
        <div>
          <span>Tỷ lệ nghỉ việc</span>
          <strong>7,8%</strong>
          <em className="good">-1,2% so với 2025</em>
        </div>
        <div>
          <span>Tỷ lệ hiện diện</span>
          <strong>96,2%</strong>
          <em className="good">Trong mục tiêu</em>
        </div>
      </div>

      <div className="analytics-grid">
        <section className="panel headcount-chart">
          <div className="panel-title">
            <div>
              <p>BIẾN ĐỘNG NHÂN SỰ</p>
              <h2>Headcount 12 tháng</h2>
            </div>
            <Status tone="green">+6,9%</Status>
          </div>
          <div className="chart-area">
            <div className="grid-lines">
              <i /><i /><i /><i />
            </div>
            <svg viewBox="0 0 600 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#13c8c8" stopOpacity=".28" />
                  <stop offset="1" stopColor="#13c8c8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 150 C70 145 90 130 145 128 S220 110 280 118 S360 90 420 92 S520 55 600 48 L600 180 L0 180Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0 150 C70 145 90 130 145 128 S220 110 280 118 S360 90 420 92 S520 55 600 48"
                fill="none"
                stroke="#13aeb2"
                strokeWidth="3"
              />
            </svg>
            <div className="chart-labels">
              {["T10", "T11", "T12", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel branch-chart">
          <div className="panel-title">
            <div>
              <p>PHÂN BỔ</p>
              <h2>Theo chi nhánh</h2>
            </div>
          </div>
          <div
            className="donut"
            style={{
              background: "conic-gradient(#1267e8 0 54%,#13c8c8 54% 83%,#8bea19 83%)",
            }}
          >
            <div>
              <b>186</b>
              <span>nhân viên</span>
            </div>
          </div>
          <ul>
            <li>
              <i className="b1" />
              Hồ Chí Minh <b>101</b>
            </li>
            <li>
              <i className="b2" />
              Hà Nội <b>54</b>
            </li>
            <li>
              <i className="b3" />
              Đà Nẵng <b>31</b>
            </li>
          </ul>
        </section>

        <section className="panel workforce-bars">
          <div className="panel-title">
            <div>
              <p>CƠ CẤU</p>
              <h2>Theo loại nhân sự</h2>
            </div>
          </div>
          {[
            ["Full-time", 126, 68],
            ["Part-time", 28, 15],
            ["Contractor", 20, 11],
            ["Intern", 12, 6],
          ].map((x) => (
            <div key={x[0]}>
              <span>
                {x[0]} <b>{x[1]}</b>
              </span>
              <div>
                <i style={{ width: `${x[2]}%` }} />
              </div>
              <em>{x[2]}%</em>
            </div>
          ))}
        </section>

        <section className="panel insight-card">
          <div className="ai-symbol">
            <Icon name="sparkles" />
          </div>
          <p>PEOPLE INSIGHT</p>
          <h2>Xu hướng tích cực tại Product</h2>
          <span>
            Tỷ lệ giữ chân tăng 8% sau khi áp dụng chính sách hybrid mới. Chi nhánh HCM có mức cải thiện rõ nhất.
          </span>
          <button>
            Xem phân tích chi tiết <Icon name="arrow" />
          </button>
        </section>
      </div>
    </div>
  );
}
