const fs = require('fs');

const code = `import React, { useState } from "react";
import {
  Box, Stack, Group, Text, Title, Card, Grid,
  Select, TextInput, Textarea, Button, Table, Badge, ScrollArea, Breadcrumbs, Anchor, Pagination, Menu, ActionIcon, Modal, Tabs
} from "@mantine/core";
import { IconPlus, IconCheck, IconFileUpload, IconChevronUp, IconChevronDown, IconDotsVertical, IconEdit, IconTrash, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// --- Static calendar data keyed by "YYYY-M" ---
const CALENDAR_DATA: Record<string, any[][]> = {
  "2026-9": [
    [ { d: "31", gray: true }, { d: "01", ci: "08:30", co: "17:35", type: "office" }, { d: "02", ci: "08:25", co: "17:30", type: "office" }, { d: "03", ci: "08:32", co: "18:00", type: "office" }, { d: "04", ci: "08:29", co: "17:35", type: "office" }, { d: "05", ci: "08:30", co: "17:30", type: "wfh", wfhCode: "WFH-0905", wfhProject: "Hoàn thiện prototype UI" }, { d: "06", empty: true } ],
    [ { d: "07", ci: "08:28", co: "17:40", type: "office" }, { d: "08", ci: "08:35", co: "17:35", type: "office" }, { d: "09", ci: "08:47", co: "17:30", type: "late" }, { d: "10", ci: "08:30", co: "17:30", type: "office" }, { d: "11", ci: "08:25", co: "17:30", type: "office" }, { d: "12", ci: "08:31", co: "17:35", type: "wfh", wfhCode: "WFH-0912", wfhProject: "Sprint review & planning" }, { d: "13", empty: true } ],
    [ { d: "14", ci: "08:30", co: "17:35", type: "office" }, { d: "15", type: "leave" }, { d: "16", ci: "08:25", co: "17:30", type: "office" }, { d: "17", ci: "08:30", co: "17:40", type: "office" }, { d: "18", ci: "08:30", co: "17:35", type: "wfh", wfhCode: "WFH-0918", wfhProject: "Làm việc tại nhà - dự án HRMS" }, { d: "19", ci: "08:29", co: "17:30", type: "office" }, { d: "20", empty: true } ],
    [ { d: "21", ci: "08:32", co: "17:30", type: "office" }, { d: "22", ci: "08:30", co: "", type: "missing" }, { d: "23", ci: "08:28", co: "17:35", type: "office" }, { d: "24", ci: "08:30", co: "17:30", type: "office" }, { d: "25", ci: "08:29", co: "20:30", type: "ot", ot: "2.5h" }, { d: "26", ci: "08:30", co: "12:00", type: "office" }, { d: "27", empty: true } ],
    [ { d: "28", ci: "08:30", co: "17:35", type: "office" }, { d: "29", ci: "08:25", co: "17:30", type: "office" }, { d: "30", ci: "08:32", co: "17:45", type: "office" }, { d: "01", gray: true }, { d: "02", gray: true }, { d: "03", gray: true }, { d: "04", gray: true } ],
  ],
  "2026-10": [
    [ { d: "28", gray: true }, { d: "29", gray: true }, { d: "30", gray: true }, { d: "01", ci: "08:30", co: "17:35", type: "office" }, { d: "02", ci: "08:29", co: "17:30", type: "office" }, { d: "03", empty: true }, { d: "04", empty: true } ],
    [ { d: "05", ci: "08:31", co: "17:40", type: "office" }, { d: "06", ci: "08:28", co: "17:35", type: "office" }, { d: "07", ci: "08:30", co: "17:30", type: "wfh", wfhCode: "WFH-1007", wfhProject: "Dự án bàn giao Q4" }, { d: "08", ci: "08:35", co: "17:30", type: "office" }, { d: "09", ci: "08:30", co: "17:30", type: "office" }, { d: "10", empty: true }, { d: "11", empty: true } ],
    [ { d: "12", ci: "08:30", co: "17:35", type: "office" }, { d: "13", ci: "08:28", co: "17:30", type: "office" }, { d: "14", ci: "08:30", co: "17:40", type: "office" }, { d: "15", ci: "08:32", co: "17:30", type: "office" }, { d: "16", ci: "08:29", co: "17:35", type: "office" }, { d: "17", empty: true }, { d: "18", empty: true } ],
    [ { d: "19", ci: "08:30", co: "17:30", type: "office" }, { d: "20", ci: "08:31", co: "17:35", type: "office" }, { d: "21", ci: "08:30", co: "17:30", type: "office" }, { d: "22", ci: "08:28", co: "17:35", type: "office" }, { d: "23", ci: "08:30", co: "17:30", type: "office" }, { d: "24", empty: true }, { d: "25", empty: true } ],
    [ { d: "26", ci: "08:30", co: "17:35", type: "office" }, { d: "27", ci: "08:29", co: "17:30", type: "office" }, { d: "28", ci: "08:32", co: "17:40", type: "office" }, { d: "29", ci: "08:30", co: "17:35", type: "office" }, { d: "30", ci: "08:28", co: "17:30", type: "office" }, { d: "31", empty: true }, { d: "01", gray: true } ],
  ],
};

const MONTH_LABELS: Record<number, string> = {
  1: "Tháng 1", 2: "Tháng 2", 3: "Tháng 3", 4: "Tháng 4",
  5: "Tháng 5", 6: "Tháng 6", 7: "Tháng 7", 8: "Tháng 8",
  9: "Tháng 9", 10: "Tháng 10", 11: "Tháng 11", 12: "Tháng 12",
};

function calcWork(ci: string, co: string): string {
  if (!ci || !co) return "-";
  const [ch, cm] = ci.split(":").map(Number);
  const [oh, om] = co.split(":").map(Number);
  const totalMins = (oh * 60 + om) - (ch * 60 + cm) - 60; // trừ 1h nghỉ trưa
  if (totalMins <= 0) return "-";
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return m > 0 ? \`\${h} giờ \${m} phút\` : \`\${h} giờ\`;
}

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<string | null>("calendar");
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [adjModalOpened, setAdjModalOpened] = useState(false);

  // State for Adjustment Form
  const [adjDate, setAdjDate] = useState("2026-09-22");
  const [adjType, setAdjType] = useState("Quên Check-out");
  const [adjCheckIn, setAdjCheckIn] = useState("08:30");
  const [adjCheckOut, setAdjCheckOut] = useState("17:30");
  const [adjReason, setAdjReason] = useState("Quên bấm máy chấm công");
  const [adjDetail, setAdjDetail] = useState("");

  // State for History
  const [historySortConfig, setHistorySortConfig] = useState<{ key: string | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const [requestsHistory, setRequestsHistory] = useState([
    { code: "ADJ-0922", type: "Bổ sung giờ Check-out", submitDate: "23/09/2026 08:15", applyDate: "22/09/2026", time: "Check-out bổ sung: 17:45", detail: "Quên bấm máy chấm công khi ra ca", status: "Chờ duyệt" },
    { code: "EX-0909", type: "Giải trình đi muộn", submitDate: "09/09/2026 09:10", applyDate: "09/09/2026", time: "Check-in: 08:47 (Muộn 17 phút)", detail: "Sự cố giao thông kẹt xe cầu Sài Gòn", status: "Đã duyệt" },
    { code: "ADJ-0830", type: "Giải trình về sớm", submitDate: "30/08/2026 17:10", applyDate: "30/08/2026", time: "Check-out: 16:20 (Về sớm 70 phút)", detail: "Đưa con đi khám bệnh, đã thông báo TL", status: "Đã duyệt" },
    { code: "ADJ-0815", type: "Bổ sung giờ Check-in", submitDate: "16/08/2026 08:40", applyDate: "15/08/2026", time: "Check-in bổ sung: 08:28", detail: "Sự cố thiết bị chấm công tại cổng B", status: "Từ chối" },
  ]);

  const prevMonth = () => {
    if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelectedDay(null);
  };

  const calKey = \`\${currentYear}-\${currentMonth}\`;
  const weeks = CALENDAR_DATA[calKey] || [];

  let filteredRequests = [...requestsHistory];
  if (historySortConfig.key) {
    filteredRequests.sort((a: any, b: any) => {
      const aV = a[historySortConfig.key!]; const bV = b[historySortConfig.key!];
      if (aV < bV) return historySortConfig.direction === 'asc' ? -1 : 1;
      if (aV > bV) return historySortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleHistorySort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (historySortConfig.key === key && historySortConfig.direction === 'asc') direction = 'desc';
    setHistorySortConfig({ key, direction });
  };

  const HistoryTh = ({ children, columnKey }: { children: React.ReactNode, columnKey: string }) => (
    <Table.Th>
      <Group justify="space-between" align="center" style={{ cursor: 'pointer' }} onClick={() => handleHistorySort(columnKey)} wrap="nowrap">
        <Text fw={600} fz="sm">{children}</Text>
        <Group gap={0} style={{ flexDirection: 'column', gap: 0 }}>
          <IconChevronUp size={12} color={historySortConfig.key === columnKey && historySortConfig.direction === 'asc' ? 'var(--mantine-color-blue-6)' : 'gray'} style={{ marginBottom: -4 }} />
          <IconChevronDown size={12} color={historySortConfig.key === columnKey && historySortConfig.direction === 'desc' ? 'var(--mantine-color-blue-6)' : 'gray'} />
        </Group>
      </Group>
    </Table.Th>
  );

  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = \`ADJ-\${adjDate.slice(5,7)}\${adjDate.slice(8,10)}\`;
    setRequestsHistory((prev) => [
      {
        code: newCode,
        type: adjType,
        submitDate: new Date().toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }),
        applyDate: adjDate.split("-").reverse().join("/"),
        time: \`Check-in: \${adjCheckIn} - Check-out: \${adjCheckOut}\`,
        detail: adjReason + (adjDetail ? " - " + adjDetail : ""),
        status: "Chờ duyệt",
      },
      ...prev,
    ]);
    setAdjDetail("");
    setAdjModalOpened(false);
  };

  const renderStatusBadge = (status: string) => {
    let color = "gray"; let iconColor = "#6b7280";
    if (status === "Đã duyệt") { color = "green"; iconColor = "#10b981"; }
    if (status === "Từ chối") { color = "red"; iconColor = "#ef4444"; }
    if (status === "Chờ duyệt") { color = "indigo"; iconColor = "#6366f1"; }
    return (
      <Badge variant="outline" color={color} radius="sm" size="lg" style={{ fontWeight: 500 }}
        leftSection={<Box w={8} h={8} style={{ border: \`2px solid \${iconColor}\`, borderRadius: 2 }} />}
      >{status}</Badge>
    );
  };

  const typeColor: Record<string, string> = { office: "blue", wfh: "teal", leave: "yellow", late: "red", missing: "orange", ot: "violet" };

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={600} mb={4}>Chấm công</Title>
          <Breadcrumbs separator="/" fz="sm">
            <Anchor href="#" c="dimmed">Tổng quan</Anchor>
            <Text c="dimmed">Chấm công</Text>
          </Breadcrumbs>
        </Box>
        {activeTab === "giai-trinh" && (
          <Button color="blue" radius="xl" leftSection={<IconPlus size={16} />} onClick={() => setAdjModalOpened(true)}>
            Bổ sung / Giải trình
          </Button>
        )}
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab} variant="default" mb="xl">
        <Tabs.List mb="xl">
          <Tabs.Tab value="calendar">Lịch chấm công</Tabs.Tab>
          <Tabs.Tab value="giai-trinh">Giải trình / Bổ sung</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="calendar">
          <Grid mb="xl">
            {[
              { label: "Ngày công tháng 9", value: "16,5", sub: "/ 22 ngày", progress: 75, color: "blue" },
              { label: "Thời gian trung bình", value: "8h 12m", sub: "+18 phút so với tháng trước", subColor: "green" },
              { label: "Đi muộn / về sớm", value: "1 lần", sub: "Đã gửi giải trình", subColor: "dimmed" },
              { label: "Ngày WFH", value: "3 ngày", sub: "Trong hạn mức", subColor: "dimmed" }
            ].map((item, index) => (
              <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={index}>
                <Card withBorder radius="lg" padding="lg">
                  <Text fw={600} fz="sm" c="dimmed" mb={8}>{item.label}</Text>
                  <Group align="baseline" gap="xs">
                    <Text fw={700} fz={24}>{item.value}</Text>
                    {item.progress && <Text fz="xs" c="dimmed">{item.sub}</Text>}
                  </Group>
                  {item.progress ? (
                    <Box mt="sm" h={6} bg="gray.1" style={{ borderRadius: 8, overflow: 'hidden' }}>
                      <Box h="100%" w={\`\${item.progress}%\`} bg={item.color} />
                    </Box>
                  ) : (
                    <Text fz="xs" c={item.subColor} fw={item.subColor === 'green' ? 600 : 400} mt={4}>{item.sub}</Text>
                  )}
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          <Card withBorder radius="lg" p="lg" shadow="sm" mb={selectedDay ? "md" : "xl"}>
            <Group justify="space-between" mb="lg">
              <Box>
                <Text fz="xs" fw={700} c="dimmed" tt="uppercase">Lịch chấm công</Text>
                <Title order={4}>Lịch làm việc</Title>
              </Box>
              <Group gap="md">
                <Group gap={6}><Box w={8} h={8} style={{ borderRadius: '50%' }} bg="blue" /><Text fz="xs" fw={500}>Văn phòng</Text></Group>
                <Group gap={6}><Box w={8} h={8} style={{ borderRadius: '50%' }} bg="teal" /><Text fz="xs" fw={500}>WFH</Text></Group>
                <Group gap={6}><Box w={8} h={8} style={{ borderRadius: '50%' }} bg="yellow" /><Text fz="xs" fw={500}>Nghỉ phép</Text></Group>
                <Group gap={6}><Box w={8} h={8} style={{ borderRadius: '50%' }} bg="red" /><Text fz="xs" fw={500}>Đi muộn</Text></Group>
              </Group>
            </Group>

            <Group justify="space-between" mb="md">
              <Button variant="default" size="xs" leftSection={<IconChevronLeft size={14} />} onClick={prevMonth}>Trước</Button>
              <Text fw={700}>{MONTH_LABELS[currentMonth]}, {currentYear}</Text>
              <Button variant="default" size="xs" rightSection={<IconChevronRight size={14} />} onClick={nextMonth}>Sau</Button>
            </Group>

            <ScrollArea>
              <Table withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr bg="gray.0">
                    {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => (
                      <Table.Th key={d} ta="center" w={\`\${100/7}%\`}>{d}</Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {weeks.length === 0 ? (
                    <Table.Tr><Table.Td colSpan={7} ta="center" py="xl" c="dimmed">Chưa có dữ liệu tháng này</Table.Td></Table.Tr>
                  ) : weeks.map((week, idx) => (
                    <Table.Tr key={idx}>
                      {week.map((day, dIdx) => {
                        const bgMap: Record<string, string> = { wfh: "teal-0", leave: "yellow-0", late: "red-0", missing: "orange-0", ot: "violet-0" };
                        const bgColor = bgMap[day.type] ? \`var(--mantine-color-\${bgMap[day.type]})\` : undefined;
                        const isSelected = selectedDay && selectedDay.d === day.d && selectedDay._week === idx;
                        return (
                          <Table.Td
                            key={dIdx} p="xs" h={80}
                            style={{
                              verticalAlign: 'top',
                              backgroundColor: isSelected ? 'var(--mantine-color-blue-1)' : bgColor,
                              cursor: day.empty || day.gray ? 'default' : 'pointer',
                              outline: isSelected ? '2px solid var(--mantine-color-blue-5)' : undefined,
                            }}
                            onClick={() => {
                              if (day.empty || day.gray) return;
                              setSelectedDay(isSelected ? null : { ...day, _week: idx });
                            }}
                          >
                            <Text fz="sm" fw={600} c={day.gray ? "dimmed" : isSelected ? "blue.7" : "dark"} mb={4}>{day.d}</Text>
                            {!day.empty && !day.gray && (
                              <Stack gap={2}>
                                {day.type === 'leave' ? (
                                  <Badge color="yellow" variant="filled" size="sm" w="100%">Nghỉ phép</Badge>
                                ) : (
                                  <>
                                    <Group justify="space-between" wrap="nowrap">
                                      <Text fz={10} c="dimmed">In:</Text>
                                      <Text fz={11} fw={700} c={day.type === 'late' ? "red" : "dark"}>{day.ci}</Text>
                                    </Group>
                                    <Group justify="space-between" wrap="nowrap">
                                      <Text fz={10} c="dimmed">Out:</Text>
                                      <Text fz={11} fw={700} c={!day.co ? "red" : "dark"}>{day.co || "???"}</Text>
                                    </Group>
                                  </>
                                )}
                              </Stack>
                            )}
                          </Table.Td>
                        );
                      })}
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Card>

          {/* Day detail panel */}
          {selectedDay && (
            <Card withBorder radius="lg" p="lg" shadow="sm" mb="xl">
              {selectedDay.type === 'wfh' ? (
                <>
                  <Group justify="space-between" mb="md">
                    <Title order={5}>Phiếu WFH — ngày {selectedDay.d}/{String(currentMonth).padStart(2,'0')}/{currentYear}</Title>
                    <Badge color="teal" variant="filled" size="lg">Làm việc từ xa</Badge>
                  </Group>
                  <Card withBorder radius="md" p="md" bg="teal.0">
                    <Group justify="space-between" mb="xs">
                      <Text fw={700} c="teal.9">Mã phiếu: {selectedDay.wfhCode}</Text>
                      <Badge color="green" variant="light">Đã duyệt</Badge>
                    </Group>
                    <Text fz="sm" c="teal.8" mb={4}>Dự án / Công việc: {selectedDay.wfhProject}</Text>
                    <Text fz="sm" c="teal.8" mb={4}>Check-in: {selectedDay.ci} · Check-out: {selectedDay.co}</Text>
                    <Text fz="sm" c="teal.8">Thời gian làm việc: {calcWork(selectedDay.ci, selectedDay.co)}</Text>
                  </Card>
                </>
              ) : (
                <>
                  <Title order={5} mb="md">Chi tiết ngày {selectedDay.d}/{String(currentMonth).padStart(2,'0')}/{currentYear}</Title>
                  <Table withTableBorder withColumnBorders>
                    <Table.Thead>
                      <Table.Tr bg="gray.0">
                        <Table.Th fw={600} fz="sm">Ngày</Table.Th>
                        <Table.Th fw={600} fz="sm">Check-in</Table.Th>
                        <Table.Th fw={600} fz="sm">Check-out</Table.Th>
                        <Table.Th fw={600} fz="sm">Thời gian làm việc</Table.Th>
                        <Table.Th fw={600} fz="sm">Overtime</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td fw={500}>{selectedDay.d} Th{String(currentMonth).padStart(2,'0')} {currentYear}</Table.Td>
                        <Table.Td c={selectedDay.type === 'late' ? 'red' : undefined} fw={600}>{selectedDay.ci || '-'}</Table.Td>
                        <Table.Td c={!selectedDay.co ? 'red' : undefined} fw={600}>{selectedDay.co || 'Chưa có'}</Table.Td>
                        <Table.Td fw={600}>{calcWork(selectedDay.ci, selectedDay.co)}</Table.Td>
                        <Table.Td fw={600} c="violet">{selectedDay.ot || '-'}</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                  {selectedDay.type === 'late' && (
                    <Text fz="sm" c="red" mt="sm">⚠ Check-in muộn — cần giải trình nếu chưa nộp đơn.</Text>
                  )}
                  {selectedDay.type === 'missing' && (
                    <Text fz="sm" c="orange" mt="sm">⚠ Thiếu dữ liệu Check-out — cần bổ sung giờ công.</Text>
                  )}
                </>
              )}
            </Card>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="giai-trinh">
          <Card withBorder radius="lg" p={0} shadow="sm">
            <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
              <Group justify="space-between" align="center">
                <Title order={4}>Lịch sử đơn từ &amp; yêu cầu</Title>
                <Group gap="xs" align="center">
                  <Text fz="sm">Hiển thị</Text>
                  <Select data={["10", "25", "50"]} value="10" w={70} size="xs" allowDeselect={false} />
                  <Text fz="sm">kết quả</Text>
                </Group>
              </Group>
            </Box>

            <ScrollArea>
              <Table verticalSpacing="md" horizontalSpacing="md" striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr bg="gray.0">
                    <HistoryTh columnKey="code">Mã đơn</HistoryTh>
                    <HistoryTh columnKey="type">Loại đơn từ</HistoryTh>
                    <HistoryTh columnKey="submitDate">Ngày nộp đơn</HistoryTh>
                    <HistoryTh columnKey="applyDate">Ngày áp dụng</HistoryTh>
                    <HistoryTh columnKey="time">Thời gian</HistoryTh>
                    <HistoryTh columnKey="detail">Lý do chi tiết</HistoryTh>
                    <Table.Th fw={600} fz="sm">Trạng thái</Table.Th>
                    <Table.Th fw={600} fz="sm" ta="right"></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredRequests.map((req, idx) => (
                    <Table.Tr key={idx}>
                      <Table.Td fw={700} c="blue">{req.code}</Table.Td>
                      <Table.Td fw={600}>{req.type}</Table.Td>
                      <Table.Td fz="xs" c="dimmed">{req.submitDate}</Table.Td>
                      <Table.Td fw={500}>{req.applyDate}</Table.Td>
                      <Table.Td fw={600} c="blue">{req.time}</Table.Td>
                      <Table.Td>{req.detail}</Table.Td>
                      <Table.Td>{renderStatusBadge(req.status)}</Table.Td>
                      <Table.Td ta="right">
                        <Menu position="bottom-end" shadow="sm">
                          <Menu.Target>
                            <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={16} /></ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item leftSection={<IconEdit size={14} />}>Chỉnh sửa</Menu.Item>
                            <Menu.Item leftSection={<IconTrash size={14} />} color="red">Xóa đơn</Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>

            <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
              <Group justify="space-between">
                <Text fz="sm" c="dimmed">Hiển thị 1 đến {filteredRequests.length} của {filteredRequests.length} kết quả</Text>
                <Pagination total={1} value={1} size="sm" color="blue" />
              </Group>
            </Box>
          </Card>
        </Tabs.Panel>
      </Tabs>

      <Modal opened={adjModalOpened} onClose={() => setAdjModalOpened(false)} title={<Text fw={600} fz="lg">Bổ sung Giờ công &amp; Giải trình</Text>} size="lg" radius="md">
        <form onSubmit={handleSubmitAdjustment}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput type="date" label="Ngày áp dụng" withAsterisk value={adjDate} onChange={e => setAdjDate(e.currentTarget.value)} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select label="Loại yêu cầu" withAsterisk data={["Quên Check-in giờ vào ca", "Quên Check-out", "Giải trình đi muộn", "Giải trình về sớm"]} value={adjType} onChange={(v) => v && setAdjType(v)} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Giờ vào thực tế (Check-in)" value={adjCheckIn} onChange={e => setAdjCheckIn(e.currentTarget.value)} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Giờ ra thực tế (Check-out)" value={adjCheckOut} onChange={e => setAdjCheckOut(e.currentTarget.value)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select label="Lý do điều chỉnh" withAsterisk data={["Quên bấm máy chấm công", "Sự cố giao thông kẹt xe", "Gặp đối tác / công tác ngoài", "Sự cố thiết bị chấm công"]} value={adjReason} onChange={(v) => v && setAdjReason(v)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea label="Mô tả hoàn cảnh chi tiết" placeholder="Ghi rõ chi tiết lý do..." minRows={3} value={adjDetail} onChange={e => setAdjDetail(e.currentTarget.value)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text fw={500} fz="sm" mb={4}>Đính kèm bằng chứng (Vé xe, Hình ảnh, Xác nhận...)</Text>
              <Card withBorder style={{ borderStyle: 'dashed', cursor: 'pointer' }} p="xl" ta="center" bg="gray.0">
                <IconFileUpload size={32} color="gray" style={{ margin: '0 auto', marginBottom: 8 }} />
                <Text fz="sm" c="dimmed">Kéo thả file vào đây hoặc <Text span c="blue" fw={600}>Chọn tải ảnh lên</Text></Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={() => setAdjModalOpened(false)}>Hủy</Button>
                <Button type="submit" color="blue" leftSection={<IconCheck size={16} />}>Nộp đơn</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </Box>
  );
}
`;
fs.writeFileSync('src/pages/AttendancePage.tsx', code);
console.log('Done!');
