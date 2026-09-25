import React, { useState } from "react";
import { Icon, Status } from "../components/UI";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  avatarColor: string;
  schedules: Record<number, ("office" | "wfh" | "leave" | "trip")[]>; // keyed by weekOffset
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "m1",
    name: "Nguyễn Minh Anh",
    initials: "MA",
    role: "Senior UI/UX Product Designer",
    department: "Product Development",
    avatarColor: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    schedules: {
      0: ["office", "wfh", "office", "office", "wfh", "leave", "leave"],
      "-1": ["office", "office", "wfh", "office", "office", "leave", "leave"],
      1: ["wfh", "office", "office", "office", "office", "leave", "leave"],
    },
  },
  {
    id: "m2",
    name: "Trần Hoàng Nam",
    initials: "HN",
    role: "Product Lead & Manager",
    department: "Product Development",
    avatarColor: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
    schedules: {
      0: ["office", "office", "wfh", "office", "office", "leave", "leave"],
      "-1": ["office", "wfh", "office", "office", "trip", "leave", "leave"],
      1: ["office", "office", "office", "wfh", "office", "leave", "leave"],
    },
  },
  {
    id: "m3",
    name: "Lê Hoài An",
    initials: "LA",
    role: "Product Designer",
    department: "Product Development",
    avatarColor: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
    schedules: {
      0: ["wfh", "office", "office", "wfh", "wfh", "leave", "leave"],
      "-1": ["office", "office", "office", "office", "wfh", "leave", "leave"],
      1: ["office", "wfh", "office", "office", "office", "leave", "leave"],
    },
  },
  {
    id: "m4",
    name: "Đỗ Thu Hà",
    initials: "TH",
    role: "Senior HR Specialist",
    department: "Human Resources",
    avatarColor: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    schedules: {
      0: ["office", "office", "office", "leave", "leave", "leave", "leave"],
      "-1": ["office", "office", "wfh", "office", "office", "leave", "leave"],
      1: ["leave", "leave", "office", "office", "office", "leave", "leave"],
    },
  },
  {
    id: "m5",
    name: "Nguyễn Đức Phúc",
    initials: "ĐP",
    role: "Frontend Engineer",
    department: "Engineering",
    avatarColor: "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)",
    schedules: {
      0: ["office", "wfh", "office", "office", "office", "leave", "leave"],
      "-1": ["office", "office", "office", "wfh", "office", "leave", "leave"],
      1: ["office", "office", "wfh", "office", "office", "leave", "leave"],
    },
  },
  {
    id: "m6",
    name: "Trần Thảo My",
    initials: "TM",
    role: "Graphic Brand Designer",
    department: "Product Development",
    avatarColor: "linear-gradient(135deg, #65a30d 0%, #84cc16 100%)",
    schedules: {
      0: ["office", "office", "trip", "trip", "office", "leave", "leave"],
      "-1": ["office", "wfh", "office", "office", "office", "leave", "leave"],
      1: ["office", "office", "office", "wfh", "office", "leave", "leave"],
    },
  },
  {
    id: "m7",
    name: "Hoàng Quốc Việt",
    initials: "QV",
    role: "DevOps & Cloud Engineer",
    department: "Engineering",
    avatarColor: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    schedules: {
      0: ["wfh", "office", "office", "office", "wfh", "leave", "leave"],
      "-1": ["office", "office", "wfh", "office", "office", "leave", "leave"],
      1: ["office", "office", "office", "wfh", "office", "leave", "leave"],
    },
  },
];

const PRESENCE_CONFIG = {
  office: { label: "Văn phòng", icon: "home", tone: "blue", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  wfh: { label: "WFH", icon: "laptop", tone: "cyan", bg: "#ecfeff", color: "#0891b2", border: "#a5f3fc" },
  leave: { label: "Nghỉ phép", icon: "calendar", tone: "amber", bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  trip: { label: "Công tác", icon: "briefcase", tone: "purple", bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
};

export default function TeamCalendarPage() {
  const [weekOffset, setWeekOffset] = useState(0); // 0 = Current Week, -1 = Prev, +1 = Next
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  // Dynamic Date Calculations
  const getWeekDates = (offset: number) => {
    // Sept 21, 2026 is Monday
    const monday = new Date(2026, 8, 21);
    monday.setDate(monday.getDate() + offset * 7);

    const days = [];
    const dayNames = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
    const shortNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateNum = d.getDate();
      const monthNum = d.getMonth() + 1;
      const dateStr = `${dateNum < 10 ? "0" + dateNum : dateNum}/${monthNum < 10 ? "0" + monthNum : monthNum}`;
      const isToday = offset === 0 && i === 4; // Sept 25, 2026 is Friday
      days.push({
        index: i,
        dayName: dayNames[i],
        shortName: shortNames[i],
        dateStr,
        isToday,
      });
    }
    return days;
  };

  const weekDays = getWeekDates(weekOffset);
  const startDay = weekDays[0].dateStr;
  const endDay = weekDays[6].dateStr;

  // Filter members
  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    if (selectedDept !== "all" && m.department !== selectedDept) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q);
    }
    return true;
  });

  // Calculate summary counters for the week
  let totalOffice = 0;
  let totalWfh = 0;
  let totalLeave = 0;
  let totalTrip = 0;

  filteredMembers.forEach((m) => {
    const sched = m.schedules[weekOffset] || m.schedules[0];
    sched.forEach((status) => {
      if (status === "office") totalOffice++;
      if (status === "wfh") totalWfh++;
      if (status === "leave") totalLeave++;
      if (status === "trip") totalTrip++;
    });
  });

  return (
    <div className="page inner-page" style={{ gap: "28px" }}>
      {/* PAGE HEADER WITH LARGE TYPOGRAPHY & WEEK NAVIGATION */}
      <div
        className="page-heading"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", letterSpacing: "0.8px" }}>
            LỊCH HIỆN DIỆN & PHỐI HỢP DỰ ÁN
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
            Lịch Team
          </h1>
          <span style={{ fontSize: "17px", color: "var(--text-sub)", fontWeight: 600 }}>
            Theo dõi trạng thái làm việc tại văn phòng, WFH, nghỉ phép và công tác theo từng tuần.
          </span>
        </div>

        {/* WEEK PREVIOUS / NEXT NAVIGATION CONTROLS */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <button
            className="secondary"
            onClick={() => setWeekOffset(weekOffset - 1)}
            style={{
              padding: "12px 20px",
              fontSize: "15px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "14px",
              background: "white",
              border: "1.5px solid var(--border-soft)",
            }}
          >
            ← Tuần trước
          </button>

          <button
            className={weekOffset === 0 ? "primary" : "secondary"}
            onClick={() => setWeekOffset(0)}
            style={{
              padding: "12px 22px",
              fontSize: "15px",
              fontWeight: 900,
              borderRadius: "14px",
            }}
          >
            Hôm nay / Tuần này
          </button>

          <button
            className="secondary"
            onClick={() => setWeekOffset(weekOffset + 1)}
            style={{
              padding: "12px 20px",
              fontSize: "15px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "14px",
              background: "white",
              border: "1.5px solid var(--border-soft)",
            }}
          >
            Tuần sau →
          </button>
        </div>
      </div>

      {/* WEEK RANGE & STATS SUMMARY BANNER */}
      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "24px 32px",
          border: "1px solid var(--border-soft)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            className="secondary"
            onClick={() => setWeekOffset(weekOffset - 1)}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 900,
              background: "#f1f5f9",
              border: "1px solid var(--border-soft)",
              cursor: "pointer",
            }}
            title="Tuần trước"
          >
            ◀
          </button>

          <div>
            <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--brand)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              ĐANG XEM LỊCH THEO TUẦN
            </span>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
              Tuần {38 + weekOffset}: Từ {startDay} đến {endDay}/2026
            </h2>
          </div>

          <button
            className="secondary"
            onClick={() => setWeekOffset(weekOffset + 1)}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 900,
              background: "#f1f5f9",
              border: "1px solid var(--border-soft)",
              cursor: "pointer",
            }}
            title="Tuần sau"
          >
            ▶
          </button>
        </div>

        {/* Quick filters & Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Tìm tên nhân sự..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "12px 16px 12px 38px",
                borderRadius: "14px",
                border: "1.5px solid var(--border-soft)",
                fontSize: "15px",
                fontWeight: 600,
                width: "220px",
              }}
            />
            <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-sub)" }}>
              <Icon name="search" size={18} />
            </div>
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              border: "1.5px solid var(--border-soft)",
              fontSize: "15px",
              fontWeight: 700,
              background: "white",
            }}
          >
            <option value="all">Tất cả phòng ban</option>
            <option value="Product Development">Phòng Product Development</option>
            <option value="Human Resources">Phòng HR</option>
            <option value="Engineering">Phòng Engineering</option>
          </select>
        </div>
      </div>

      {/* WEEKLY PRESENCE GRID TABLE WITH EXTRA LARGE TYPOGRAPHY */}
      <section
        className="panel"
        style={{
          background: "white",
          borderRadius: "28px",
          padding: "32px",
          border: "1px solid var(--border-soft)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0", textAlign: "left" }}>
            <thead>
              <tr>
                {/* Employee Header Column */}
                <th
                  style={{
                    padding: "20px 24px",
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "var(--text-sub)",
                    borderBottom: "3px solid var(--border-soft)",
                    minWidth: "280px",
                    background: "#fafafa",
                    borderRadius: "16px 0 0 0",
                  }}
                >
                  NHÂN SỰ TEAM ({filteredMembers.length})
                </th>

                {/* 7 Week Days Headers with Large Typography */}
                {weekDays.map((day) => (
                  <th
                    key={day.dayName}
                    style={{
                      padding: "18px 12px",
                      textAlign: "center",
                      borderBottom: "3px solid var(--border-soft)",
                      background: day.isToday ? "#eff6ff" : "#fafafa",
                      minWidth: "125px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: day.isToday ? "var(--brand)" : "var(--text-sub)",
                        display: "block",
                        textTransform: "uppercase",
                      }}
                    >
                      {day.dayName}
                    </span>
                    <b
                      style={{
                        fontSize: "20px",
                        fontWeight: 900,
                        color: day.isToday ? "var(--brand)" : "var(--text-main)",
                        display: "block",
                        marginTop: "2px",
                      }}
                    >
                      {day.dateStr}
                    </b>
                    {day.isToday && (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 900,
                          background: "var(--brand)",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          display: "inline-block",
                          marginTop: "4px",
                        }}
                      >
                        Hôm nay
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((member) => {
                const sched = member.schedules[weekOffset] || member.schedules[0];

                return (
                  <tr key={member.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                    {/* Employee Profile Cell */}
                    <td
                      style={{
                        padding: "20px 24px",
                        borderBottom: "1px solid var(--border-soft)",
                        background: "white",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "16px",
                            background: member.avatarColor,
                            color: "white",
                            fontSize: "18px",
                            fontWeight: 900,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                            flexShrink: 0,
                          }}
                        >
                          {member.initials}
                        </div>
                        <div>
                          <b style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", display: "block" }}>
                            {member.name}
                          </b>
                          <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 600 }}>
                            {member.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 7 Days Status Cells */}
                    {weekDays.map((day) => {
                      const statusKey = sched[day.index] || "office";
                      const cfg = PRESENCE_CONFIG[statusKey];

                      return (
                        <td
                          key={day.dayName}
                          style={{
                            padding: "16px 8px",
                            textAlign: "center",
                            borderBottom: "1px solid var(--border-soft)",
                            background: day.isToday ? "#f8fafc" : "white",
                          }}
                        >
                          <div
                            style={{
                              background: cfg.bg,
                              color: cfg.color,
                              border: `1.5px solid ${cfg.border}`,
                              borderRadius: "14px",
                              padding: "12px 8px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "4px",
                              fontWeight: 900,
                              fontSize: "14px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                              transition: "transform 0.15s ease",
                            }}
                          >
                            <Icon name={cfg.icon as any} size={20} />
                            <span>{cfg.label}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER LEGEND WITH COUNTERS */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "20px 28px",
          border: "1px solid var(--border-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-sub)", textTransform: "uppercase" }}>
            Chú thích trạng thái:
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#2563eb", display: "inline-block" }} />
            <b style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>Văn phòng</b>
            <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 700 }}>({totalOffice} lượt)</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#0891b2", display: "inline-block" }} />
            <b style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>WFH</b>
            <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 700 }}>({totalWfh} lượt)</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#b45309", display: "inline-block" }} />
            <b style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>Nghỉ phép</b>
            <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 700 }}>({totalLeave} lượt)</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#7e22ce", display: "inline-block" }} />
            <b style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>Công tác</b>
            <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 700 }}>({totalTrip} lượt)</span>
          </div>
        </div>

        <small style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: 600 }}>
          Dữ liệu đồng bộ tự động từ Đơn phê duyệt WFH & Nghỉ phép.
        </small>
      </div>
    </div>
  );
}
