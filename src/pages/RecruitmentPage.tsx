import { useState } from "react";
import { Icon, Status, ProgressRing } from "../components/UI";

export default function RecruitmentPage() {
  const [stage, setStage] = useState<"jobs" | "match" | "result">("jobs");

  if (stage === "match")
    return (
      <div className="page inner-page">
        <div className="page-heading">
          <div>
            <p>TUYỂN DỤNG · AI MATCHING</p>
            <h1>Phân tích độ phù hợp CV–JD</h1>
            <span>AI giải thích rõ từng tiêu chí; quyết định cuối cùng luôn thuộc về HR.</span>
          </div>
          <button className="secondary" onClick={() => setStage("jobs")}>
            Quay lại tuyển dụng
          </button>
        </div>

        <div className="match-layout">
          <section className="panel match-setup">
            <div className="match-step">
              <span>1</span>
              <div>
                <b>Vị trí tuyển dụng</b>
                <small>Senior Product Designer · HCM</small>
              </div>
              <Icon name="check" />
            </div>
            <div className="match-step">
              <span>2</span>
              <div>
                <b>Hồ sơ ứng viên</b>
                <small>CV_Tran_Thu_Ha.pdf · 2,4 MB</small>
              </div>
              <Icon name="check" />
            </div>

            <div className="cv-preview">
              <div className="cv-head">
                <span className="face f3">TH</span>
                <div>
                  <b>Trần Thu Hà</b>
                  <small>Product Designer · 5 năm kinh nghiệm</small>
                </div>
              </div>
              <h4>Kinh nghiệm gần nhất</h4>
              <p>Senior Product Designer · Fintech Labs</p>
              <h4>Kỹ năng</h4>
              <div className="skill-tags">
                <span>Figma</span>
                <span>Design System</span>
                <span>User Research</span>
                <span>Fintech</span>
              </div>
            </div>
          </section>

          <section className="analysis-start">
            <div className="ai-orbit">
              <Icon name="sparkles" size={28} />
              <i /><i /><i />
            </div>
            <p>AI CANDIDATE MATCHING</p>
            <h2>Sẵn sàng phân tích</h2>
            <span>
              AI sẽ đối chiếu kỹ năng, kinh nghiệm, học vấn và yêu cầu JD. Không có quyết định tự động.
            </span>
            <button className="primary" onClick={() => setStage("result")}>
              Phân tích CV <Icon name="arrow" />
            </button>
          </section>
        </div>
      </div>
    );

  if (stage === "result")
    return (
      <div className="page inner-page">
        <div className="page-heading">
          <div>
            <p>KẾT QUẢ PHÂN TÍCH</p>
            <h1>Trần Thu Hà</h1>
            <span>Senior Product Designer · Phân tích hoàn tất lúc 14:28</span>
          </div>
          <button className="secondary" onClick={() => setStage("jobs")}>
            Đóng kết quả
          </button>
        </div>

        <div className="candidate-result">
          <section className="match-score">
            <ProgressRing value={87} label="phù hợp" />
            <p>ĐỘ PHÙ HỢP TỔNG THỂ</p>
            <h2>Ứng viên rất phù hợp</h2>
            <span>Kinh nghiệm sản phẩm và design system đáp ứng tốt yêu cầu cốt lõi.</span>
            <div className="score-parts">
              {[
                ["Kỹ năng", 92],
                ["Kinh nghiệm", 84],
                ["Học vấn", 90],
                ["JD Alignment", 85],
              ].map((x) => (
                <div key={x[0]}>
                  <span>
                    {x[0]} <b>{x[1]}%</b>
                  </span>
                  <i>
                    <em style={{ width: `${x[1]}%` }} />
                  </i>
                </div>
              ))}
            </div>
          </section>

          <section className="panel explainability">
            <p>VÌ SAO CÓ KẾT QUẢ NÀY?</p>
            <h2>Giải thích minh bạch</h2>
            <div className="explain-block matched">
              <Icon name="check" />
              <div>
                <b>Yêu cầu phù hợp</b>
                <ul>
                  <li>5 năm kinh nghiệm thiết kế sản phẩm số</li>
                  <li>Đã xây dựng design system quy mô lớn</li>
                  <li>Kinh nghiệm research và fintech phù hợp</li>
                </ul>
              </div>
            </div>

            <div className="explain-block missing">
              <Icon name="clock" />
              <div>
                <b>Điểm cần làm rõ</b>
                <ul>
                  <li>Chưa thể hiện kinh nghiệm quản lý trực tiếp</li>
                  <li>Tiếng Anh cần xác minh trong phỏng vấn</li>
                </ul>
              </div>
            </div>

            <div className="interview-focus">
              <b>Gợi ý trọng tâm phỏng vấn</b>
              <span>Khả năng dẫn dắt design critique và phối hợp với Engineering.</span>
            </div>

            <footer>
              <button className="reject">Từ chối</button>
              <button className="secondary">Lưu shortlist</button>
              <button className="primary">
                Chuyển sang phỏng vấn <Icon name="arrow" />
              </button>
            </footer>
          </section>
        </div>
      </div>
    );

  return (
    <div className="page inner-page">
      <div className="page-heading">
        <div>
          <p>TALENT ACQUISITION</p>
          <h1>Tuyển dụng</h1>
          <span>Quản lý vị trí, pipeline ứng viên và phỏng vấn.</span>
        </div>
        <button className="primary">
          <Icon name="plus" /> Tạo vị trí
        </button>
      </div>

      <div className="recruit-stats">
        <div>
          <span>Vị trí đang tuyển</span>
          <strong>8</strong>
        </div>
        <div>
          <span>Ứng viên mới</span>
          <strong>24</strong>
        </div>
        <div>
          <span>Phỏng vấn tuần này</span>
          <strong>7</strong>
        </div>
        <button onClick={() => setStage("match")}>
          <span className="ai-symbol">
            <Icon name="sparkles" />
          </span>
          <span>
            <b>AI Candidate Matching</b>
            <small>Phân tích CV với JD minh bạch</small>
          </span>
          <Icon name="arrow" />
        </button>
      </div>

      <section className="panel pipeline">
        <div className="panel-title">
          <div>
            <p>PIPELINE ỨNG VIÊN</p>
            <h2>Senior Product Designer</h2>
          </div>
          <button>
            Đổi vị trí <Icon name="chevron" />
          </button>
        </div>

        <div className="pipeline-cols">
          {[
            ["Mới", 4, ["Trần Thu Hà", "Nguyễn Hoàng An"]],
            ["Sàng lọc", 3, ["Lê Minh Tâm", "Phạm Hải Yến"]],
            ["AI Review", 2, ["Vũ Anh Khoa"]],
            ["Phỏng vấn", 3, ["Đỗ Khánh Linh", "Mai Quốc Huy"]],
            ["Offer", 1, ["Trịnh Kim Oanh"]],
          ].map((c, i) => (
            <div key={c[0]}>
              <header>
                <span>{c[0]}</span>
                <b>{c[1]}</b>
              </header>
              {c[2].map((n, j) => (
                <article key={n}>
                  <div>
                    <span className={`face f${i + 1}`}>
                      {n
                        .split(" ")
                        .map((x) => x[0])
                        .slice(-2)
                        .join("")}
                    </span>
                    <span>
                      <b>{n}</b>
                      <small>{j === 0 && i === 0 ? "AI match 87%" : "Product Designer"}</small>
                    </span>
                  </div>
                  {j === 0 && i === 0 && <Status tone="green">87% phù hợp</Status>}
                  <small>Ứng tuyển {i + 2} ngày trước</small>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
