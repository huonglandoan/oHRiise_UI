import { useState } from "react";
import { Icon, IconName, Status } from "../components/UI";

export default function PayrollPage() {
  const [sync, setSync] = useState<"ready" | "syncing" | "done">("ready");
  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>PAYROLL OPERATIONS</p>
          <h1>Đồng bộ bảng lương</h1>
          <span>oHRiise chuẩn bị bảng công; MISA AMIS xử lý nghiệp vụ tính lương.</span>
        </div>
        <button className="secondary">
          <Icon name="file" /> Lịch sử đồng bộ
        </button>
      </div>

      <section className="payroll-period">
        <div>
          <p>KỲ LƯƠNG HIỆN TẠI</p>
          <h2>Tháng 09 / 2026</h2>
          <span>186 nhân viên · Hạn chốt 28/09/2026</span>
        </div>
        <Status tone={sync === "done" ? "green" : "blue"}>
          {sync === "done" ? "Đã đồng bộ MISA AMIS" : "Đang chuẩn bị"}
        </Status>
      </section>

      <section className="sync-flow">
        {[
          ["clock", "Chấm công", "186/186 nhân viên", "done"],
          ["shield", "Kiểm tra dữ liệu", "3 mục cần xem xét", "current"],
          ["check", "Chốt bảng công", "Chưa chốt", ""],
          ["arrow", "Đồng bộ MISA AMIS", sync === "done" ? "Hoàn tất" : "Chưa bắt đầu", sync === "done" ? "done" : ""],
        ].map((x, i) => (
          <div className={`sync-step ${x[3]}`} key={x[1]}>
            <span>
              <Icon name={x[0] as IconName} />
            </span>
            <div>
              <small>BƯỚC {i + 1}</small>
              <b>{x[1]}</b>
              <em>{x[2]}</em>
            </div>
            {i < 3 && <i />}
          </div>
        ))}
      </section>

      {sync === "done" ? (
        <div className="sync-success">
          <Icon name="check" size={28} />
          <div>
            <b>Đồng bộ hoàn tất</b>
            <span>186 hồ sơ đã được gửi tới MISA AMIS lúc 14:32 hôm nay.</span>
          </div>
          <button className="secondary" onClick={() => setSync("ready")}>
            Đồng bộ lại
          </button>
        </div>
      ) : (
        <div className="validation-grid">
          <section className="panel">
            <div className="panel-title">
              <div>
                <p>KIỂM TRA DỮ LIỆU</p>
                <h2>Tình trạng bảng công</h2>
              </div>
              <strong className="validation-score">98,4%</strong>
            </div>

            {[
              ["Dữ liệu chấm công", "186/186", "green"],
              ["Điều chỉnh đang chờ", "3 yêu cầu", "amber"],
              ["Thông tin ngân hàng", "186/186", "green"],
              ["Loại hợp đồng", "186/186", "green"],
            ].map((x) => (
              <div className="validation-row" key={x[0]}>
                <span>{x[0]}</span>
                <b>{x[1]}</b>
                <Status tone={x[2] as "green" | "amber"}>
                  {x[2] === "green" ? "Hợp lệ" : "Cần xem"}
                </Status>
              </div>
            ))}
          </section>

          <section className="misa-card">
            <div className="misa-logo">
              MISA <b>AMIS</b>
            </div>
            <h3>Sẵn sàng kết nối</h3>
            <p>Dữ liệu bảng công sẽ được gửi an toàn đến hệ thống MISA AMIS.</p>
            <button
              className="primary"
              disabled={sync === "syncing"}
              onClick={() => {
                setSync("syncing");
                setTimeout(() => setSync("done"), 1200);
              }}
            >
              {sync === "syncing" ? "Đang đồng bộ..." : "Đồng bộ MISA AMIS"} <Icon name="arrow" />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
