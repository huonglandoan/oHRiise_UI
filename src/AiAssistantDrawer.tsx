import { useState } from "react";
import { Icon } from "./App";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  actionButton?: {
    label: string;
    actionType: "wfh" | "calendar" | "policy";
  };
}

interface AiAssistantDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  openRequestModal?: (type: "wfh" | "leave" | "expense") => void;
  navigate?: (page: string) => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "ai",
    text: "Xin chào! Tôi là Trợ lý AI oHRiise 🤖. Tôi có thể giúp bạn tra cứu chính sách công ty, kiểm tra lịch nghỉ phép của team hoặc hướng dẫn tạo các đơn từ HRMS.",
    time: "Vừa xong",
  },
];

export default function AiAssistantDrawer({
  isOpen,
  onClose,
  openRequestModal,
  navigate,
}: AiAssistantDrawerProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping]   = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: query.trim(),
      time: "Vừa xong",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // AI Intelligence Response Simulation
    setTimeout(() => {
      setIsTyping(false);
      let aiReply: Message;

      const q = query.toLowerCase();

      if (q.includes("wfh") || q.includes("từ xa")) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: "ai",
          text: "Chính sách WFH của oHRiise áp dụng:\n• Tối đa 4 ngày WFH/tháng cho mỗi nhân viên chính thức.\n• Đăng ký trước ít nhất 24 giờ.\n• Bắt buộc hoàn thành Daily Report trước 18:00 trong ngày WFH.",
          time: "Vừa xong",
          actionButton: {
            label: "Mở Modal Đăng ký WFH ngay 🚀",
            actionType: "wfh",
          },
        };
      } else if (q.includes("nghỉ phép") || q.includes("ai trong team")) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: "ai",
          text: "Hôm nay trong team Product Development:\n• Hồ Ngọc Liên (PM) đang nghỉ phép năm (Đã duyệt).\n• Trần Bảo Linh (Frontend) đang làm việc WFH tại nhà.\n• 13 thành viên còn lại có mặt đầy đủ tại Văn phòng.",
          time: "Vừa xong",
          actionButton: {
            label: "Xem Lịch làm việc Team 📅",
            actionType: "calendar",
          },
        };
      } else if (q.includes("điều chỉnh") || q.includes("trễ") || q.includes("quên")) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: "ai",
          text: "Để tạo Đơn điều chỉnh chấm công trễ / quên check-out:\n1. Vào màn hình Dashboard Nhân viên.\n2. Cuộn xuống bảng Nhật ký Chấm công.\n3. Bấm nút 'Điều chỉnh' ở dòng ngày bị thiếu để gửi Team Lead duyệt.",
          time: "Vừa xong",
          actionButton: {
            label: "Mở Cấu hình Chính sách HR 📜",
            actionType: "policy",
          },
        };
      } else {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: "ai",
          text: `Tôi đã nhận được câu hỏi: "${query}". Dữ liệu nhân sự và quy định chính sách của bạn luôn sẵn sàng. Bạn có cần tôi hỗ trợ mở form đăng ký dịch vụ nào không?`,
          time: "Vừa xong",
        };
      }

      setMessages((prev) => [...prev, aiReply]);
    }, 900);
  };

  const handleChipClick = (chipText: string) => {
    handleSend(chipText);
  };

  const handleActionButton = (btn: Message["actionButton"]) => {
    if (!btn) return;
    onClose?.();
    if (btn.actionType === "wfh" && openRequestModal) {
      openRequestModal("wfh");
    } else if (btn.actionType === "calendar" && navigate) {
      navigate("team");
    } else if (btn.actionType === "policy" && navigate) {
      navigate("policies");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop z-50" onMouseDown={onClose}>
      <div
        className="ai-drawer"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="ai-drawer-head">
          <div className="flex items-center gap-3">
            <div className="ai-symbol-icon">
              <Icon name="sparkles" />
            </div>
            <div>
              <h3>Trợ lý oHRiise AI</h3>
              <p>Hỏi đáp chính sách & Gợi ý vận hành HRMS 24/7</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="ai-chips-wrap">
          <small className="chip-title">GỢI Ý CÂU HỎI NHANH:</small>
          <div className="chips-list">
            <button
              type="button"
              className="chip-item"
              onClick={() => handleChipClick("Quy định WFH của công ty như thế nào?")}
            >
              💡 Quy định WFH công ty?
            </button>
            <button
              type="button"
              className="chip-item"
              onClick={() => handleChipClick("Ai trong team Frontend đang nghỉ phép hôm nay?")}
            >
              👥 Ai trong team đang nghỉ phép?
            </button>
            <button
              type="button"
              className="chip-item"
              onClick={() => handleChipClick("Cách tạo đơn điều chỉnh chấm công trễ?")}
            >
              ⏰ Hướng dẫn tạo đơn điều chỉnh trễ?
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="ai-chat-area">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`ai-msg-bubble ${m.sender === "user" ? "user-bubble" : "ai-bubble"}`}
            >
              <div className="msg-text">{m.text}</div>

              {m.actionButton && (
                <button
                  type="button"
                  className="ai-action-btn"
                  onClick={() => handleActionButton(m.actionButton)}
                >
                  {m.actionButton.label}
                </button>
              )}

              <small className="msg-time">{m.time}</small>
            </div>
          ))}

          {isTyping && (
            <div className="ai-msg-bubble ai-bubble typing-bubble">
              <span className="typing-dots">
                <i />
                <i />
                <i />
              </span>
              <small>oHRiise AI đang phân tích dữ liệu...</small>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          className="ai-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            placeholder="Hỏi AI về chính sách, ngày nghỉ, WFH..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="ai-send-btn" disabled={!inputText.trim()}>
            <Icon name="arrow" />
          </button>
        </form>
      </div>
    </div>
  );
}
