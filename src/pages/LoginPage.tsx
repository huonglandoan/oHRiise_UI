import { useState } from "react";
import logo from "../imports/oHRiise_icon.png";
import { Icon } from "../components/UI";
import { DYNAMIC_PROFILES } from "../types";

export default function LoginPage({ onLogin }: { onLogin: (profileKey: string) => void }) {
  const [selected, setSelected] = useState<string>("emp_standard");
  return (
    <div className="login-screen">
      <section className="login-brand-panel">
        <div className="login-brand">
          <div className="login-logo">
            <img src={logo} alt="oHRiise" />
          </div>
          <div>
            <b>oHRiise</b>
            <span>People rise together</span>
          </div>
        </div>
        <div className="login-message">
          <div className="login-nodes">
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>NỀN TẢNG NHÂN SỰ HỢP NHẤT</p>
          <h1>
            Mỗi ngày làm việc,
            <br />
            <em>một bước tiến lên.</em>
          </h1>
          <span>
            Một trải nghiệm liền mạch cho nhân viên, quản lý và HR trong tổ chức hybrid hiện đại.
          </span>
        </div>
        <div className="login-trust">
          <Icon name="shield" />
          <span>Dữ liệu nhân sự được bảo vệ theo ủy quyền chức năng cá nhân.</span>
        </div>
      </section>

      <section className="login-form-panel">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(selected);
          }}
        >
          <div className="mobile-login-brand">oHRiise</div>
          <p>CHÀO MỪNG TRỞ LẠI</p>
          <h2>Đăng nhập vào oHRiise</h2>
          <span className="login-sub">Tiếp tục ngày làm việc của bạn.</span>
          <label>
            Email / Tài khoản
            <div className="login-field">
              <Icon name="user" />
              <input defaultValue="minhanh@ohriise.vn" aria-label="Email" />
            </div>
          </label>
          <label>
            Mật khẩu
            <div className="login-field">
              <Icon name="shield" />
              <input type="password" defaultValue="password" aria-label="Mật khẩu" />
            </div>
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập
            </label>
            <button type="button">Quên mật khẩu?</button>
          </div>
          <button className="primary login-submit" type="submit">
            Đăng nhập <Icon name="arrow" />
          </button>
          <div className="demo-divider">
            <span>CHẾ ĐỘ THỬ TẬP QUYỀN ĐỘNG</span>
          </div>
          <p className="demo-help">Chọn tài khoản nhân viên để trải nghiệm tập quyền đã được ủy quyền</p>
          <div className="demo-accounts">
            {Object.values(DYNAMIC_PROFILES).map((p) => (
              <button
                type="button"
                onClick={() => setSelected(p.id)}
                className={selected === p.id ? "selected" : ""}
                key={p.id}
              >
                <span className="avatar sm">{p.initials}</span>
                <div>
                  <b>{p.name}</b>
                  <small>{p.customRoleName}</small>
                </div>
                {selected === p.id && <Icon name="check" />}
              </button>
            ))}
          </div>
        </form>
      </section>
    </div>
  );
}
