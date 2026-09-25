import { Icon, Status } from "../components/UI";

export default function EmployeeManagementPage() {
  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>VÒNG ĐỜI NHÂN VIÊN · HỒ CHÍ MINH</p>
          <h1>Hồ sơ nhân sự</h1>
          <span>Thông tin nhân viên kết nối với hợp đồng, chấm công và vận hành HR.</span>
        </div>
        <button className="primary">
          <Icon name="plus" /> Onboarding nhân viên
        </button>
      </div>

      <div className="employee-overview">
        <div>
          <strong>101</strong>
          <span>nhân viên hoạt động</span>
        </div>
        <div>
          <strong>4</strong>
          <span>đang onboarding</span>
        </div>
        <div>
          <strong>6</strong>
          <span>hợp đồng sắp hạn</span>
        </div>
        <div>
          <strong>2</strong>
          <span>đang offboarding</span>
        </div>
      </div>

      <div className="employee-management">
        <section className="panel employee-directory">
          <div className="directory-tools">
            <div className="mini-search">
              <Icon name="search" />
              Tìm theo tên, mã nhân viên...
            </div>
            <button className="filter">
              Product <Icon name="chevron" />
            </button>
            <button className="filter">
              Hồ Chí Minh <Icon name="chevron" />
            </button>
          </div>
          {[
            ["Nguyễn Minh Anh", "MA", "OH-2024-018", "Product Designer", "Product Development", "Full-time", "green"],
            ["Trần Hoàng Nam", "HN", "OH-2022-004", "Engineering Lead", "Product Development", "Full-time", "green"],
            ["Lê Hoài An", "LA", "OH-2025-031", "UX Researcher", "Product Development", "Probation", "amber"],
            ["Đỗ Thu Hà", "TH", "OH-2023-022", "Data Analyst", "Data Engineering", "Full-time", "green"],
          ].map((u, i) => (
            <button className={i === 0 ? "selected" : ""} key={u[0]}>
              <span className={`face f${i + 1}`}>{u[1]}</span>
              <span>
                <b>{u[0]}</b>
                <small>
                  {u[2]} · {u[3]}
                </small>
              </span>
              <span>
                <b>{u[4]}</b>
                <small>Team</small>
              </span>
              <Status tone={u[6] as "green" | "amber"}>{u[5]}</Status>
              <Icon name="chevron" />
            </button>
          ))}
        </section>

        <aside className="panel employee-spotlight">
          <div className="spotlight-head">
            <span className="profile-avatar">MA</span>
            <div>
              <p>OH-2024-018</p>
              <h2>Nguyễn Minh Anh</h2>
              <span>Product Designer · Hồ Chí Minh</span>
            </div>
            <button>
              <Icon name="more" />
            </button>
          </div>

          <div className="employee-tabs">
            <button className="active">Tổng quan</button>
            <button>Hợp đồng</button>
            <button>Chấm công</button>
            <button>Hồ sơ</button>
          </div>

          <div className="spotlight-facts">
            <div>
              <span>Ngày gia nhập</span>
              <b>15/04/2024</b>
            </div>
            <div>
              <span>Team Lead</span>
              <b>Trần Hoàng Nam</b>
            </div>
            <div>
              <span>Hợp đồng</span>
              <b>Chính thức · 12 tháng</b>
            </div>
            <div>
              <span>Trạng thái</span>
              <Status tone="green">Đang làm việc</Status>
            </div>
          </div>

          <div className="employee-links">
            <button>
              <Icon name="file" /> Xem hợp đồng <Icon name="chevron" />
            </button>
            <button>
              <Icon name="clock" /> Lịch sử chấm công <Icon name="chevron" />
            </button>
            <button>
              <Icon name="calendar" /> Nghỉ phép & WFH <Icon name="chevron" />
            </button>
            <button>
              <Icon name="briefcase" /> Tài sản được giao <Icon name="chevron" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
