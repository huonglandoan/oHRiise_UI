import React, { useState } from "react";
import { StatusBadge } from "../components/UI";
import {
  Box, Group, Text, Title, Card, Grid, Select, TextInput, Textarea,
  Button, Table, Badge, ScrollArea, Breadcrumbs, Anchor, Pagination,
  Menu, ActionIcon, Modal, Stack, Tabs, Progress, Divider, SimpleGrid,
  ThemeIcon, Tooltip
} from "@mantine/core";
import {
  IconPlus, IconCheck, IconFileUpload, IconChevronUp, IconChevronDown,
  IconDotsVertical, IconEdit, IconTrash, IconX, IconEye, IconFileText,
  IconSearch, IconSparkles, IconExternalLink, IconPaperclip, IconFilter, IconSelector
} from "@tabler/icons-react";

export interface WfhRecord {
  id: string;
  date: string;
  timeSlot: string;
  project: string;
  reason: string;
  status: string;
  hasReport: boolean;
  reportData?: DailyReportItem;
}

export interface DailyReportItem {
  reportId: string;
  wfhId: string;
  date: string;
  timeSlot: string;
  project: string;
  submittedAt: string;
  summary: string;
  completedTasks: string[];
  completionRate: number;
  blockers?: string;
  nextDayPlan?: string;
  ticketLink?: string;
  attachments: string[];
  aiScore: string;
  aiNote: string;
}

const INITIAL_REPORTS: DailyReportItem[] = [
  {
    reportId: "RPT-0918",
    wfhId: "WFH-0918",
    date: "18/09/2026",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    project: "HRMS Portal",
    submittedAt: "18/09/2026 17:40",
    summary: "Hoàn tất 5 screen UI dashboard, nộp file Figma trên Jira #UI-102 và bàn giao token.",
    completedTasks: [
      "Thiết kế Responsive Mobile cho Employee Profile",
      "Xây dựng Component Tabs và Filter cho Attendance & WFH",
      "Bàn giao Tokens và Mantine Theme specs cho Developer"
    ],
    completionRate: 100,
    blockers: "Không có, team phối hợp nhanh chóng.",
    nextDayPlan: "Họp Demo Design Review với Product Owner.",
    ticketLink: "https://jira.company.vn/browse/UI-102",
    attachments: ["screenshot_figma_screens.png", "figma_handoff.pdf"],
    aiScore: "20/20 ảnh (99%)",
    aiNote: "Báo cáo đầy đủ, tiến độ đạt 100%, có bằng chứng bàn giao Jira & Figma chuẩn xác.",
  },
  {
    reportId: "RPT-0911",
    wfhId: "WFH-0911",
    date: "11/09/2026",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    project: "UX Research",
    submittedAt: "11/09/2026 17:30",
    summary: "Tổng hợp 12 cuộc phỏng vấn người dùng và vẽ sơ đồ Customer Journey.",
    completedTasks: [
      "Phỏng vấn 4 Quản lý bộ phận về tính năng duyệt đơn",
      "Tổng hợp Insights từ phỏng vấn nhân viên",
      "Vẽ sơ đồ luồng người dùng (User Flow) v1.2"
    ],
    completionRate: 95,
    blockers: "Một số user phản hồi chậm buổi sáng, đã dời qua đầu giờ chiều.",
    nextDayPlan: "Hoàn thiện Slide báo cáo UX Research.",
    ticketLink: "https://jira.company.vn/browse/UX-88",
    attachments: ["user_journey_map.pdf", "interview_notes.docx"],
    aiScore: "18/18 ảnh (96%)",
    aiNote: "Nội dung chi tiết, các đầu việc phỏng vấn có biên bản đính kèm minh bạch.",
  },
];

const INITIAL_WFH: WfhRecord[] = [
  {
    id: "WFH-0930",
    date: "30/09/2026",
    timeSlot: "Buổi sáng (08:30 - 12:00)",
    project: "Design System v2",
    reason: "Design system documentation",
    status: "Chờ duyệt",
    hasReport: false,
  },
  {
    id: "WFH-0925",
    date: "25/09/2026",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    project: "HRMS Portal",
    reason: "Product Design & Layout Review",
    status: "Đã duyệt",
    hasReport: false,
  },
  {
    id: "WFH-0918",
    date: "18/09/2026",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    project: "HRMS Portal",
    reason: "Product Design & Mockup UI",
    status: "Hoàn thành",
    hasReport: true,
    reportData: INITIAL_REPORTS[0],
  },
  {
    id: "WFH-0911",
    date: "11/09/2026",
    timeSlot: "Cả ngày (08:30 - 17:35)",
    project: "UX Research",
    reason: "Research synthesis & User journey mapping",
    status: "Hoàn thành",
    hasReport: true,
    reportData: INITIAL_REPORTS[1],
  },
  {
    id: "WFH-0904",
    date: "04/09/2026",
    timeSlot: "Buổi chiều (13:00 - 17:35)",
    project: "Release v1.4",
    reason: "Design review & Release notes",
    status: "Đã hủy",
    hasReport: false,
  },
];

interface WfhPageProps {
  open?: () => void;
}

export default function WfhPage({ open }: WfhPageProps) {
  // Tabs: "requests" | "reports"
  const [activeTab, setActiveTab] = useState<string | null>("requests");

  const [records, setRecords] = useState<WfhRecord[]>(INITIAL_WFH);
  const [reports, setReports] = useState<DailyReportItem[]>(INITIAL_REPORTS);

  // Filter state for Subtab 1 (Đơn WFH)
  const [wfhSearch, setWfhSearch] = useState("");
  const [wfhFilterMonth, setWfhFilterMonth] = useState<string | null>("all");
  const [wfhFilterStatus, setWfhFilterStatus] = useState<string | null>("all");

  // Filter state for Subtab 2 (Lịch sử Daily Report)
  const [reportSearch, setReportSearch] = useState("");
  const [reportFilterMonth, setReportFilterMonth] = useState<string | null>("all");
  const [reportFilterProject, setReportFilterProject] = useState<string | null>("all");
  const [reportFilterScore, setReportFilterScore] = useState<string | null>("all");

  // Modal Đăng ký WFH
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [wfhDate, setWfhDate] = useState("");
  const [wfhSlot, setWfhSlot] = useState("Cả ngày (08:30 - 17:35)");
  const [wfhProject, setWfhProject] = useState("");
  const [wfhReason, setWfhReason] = useState("");

  // Modal Nộp Daily Report chi tiết
  const [reportModalRecord, setReportModalRecord] = useState<WfhRecord | null>(null);
  const [reportSummary, setReportSummary] = useState("");
  const [reportTasks, setReportTasks] = useState("");
  const [reportCompletion, setReportCompletion] = useState("100%");
  const [reportBlockers, setReportBlockers] = useState("");
  const [reportNextDay, setReportNextDay] = useState("");
  const [reportTicket, setReportTicket] = useState("");
  const [reportFiles, setReportFiles] = useState<string[]>(["screenshot_proof_work.png"]);

  // Modal Xem chi tiết Daily Report
  const [viewReportModal, setViewReportModal] = useState<DailyReportItem | null>(null);

  // Sort state for WFH requests
  const [sortConfig, setSortConfig] = useState<{ key: keyof WfhRecord | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });

  const handleSort = (key: keyof WfhRecord) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const Th = ({ children, columnKey }: { children: React.ReactNode; columnKey: keyof WfhRecord }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = isSorted && sortConfig.direction === "asc";
    const isDesc = isSorted && sortConfig.direction === "desc";

    return (
      <Table.Th>
        <Group justify="space-between" align="center" wrap="nowrap" style={{ cursor: "pointer" }} onClick={() => handleSort(columnKey)}>
          <Text fw={600} fz="sm">{children}</Text>
          <Group gap={0}>
            {isAsc ? (
              <IconChevronUp size={14} color="var(--mantine-color-blue-6)" />
            ) : isDesc ? (
              <IconChevronDown size={14} color="var(--mantine-color-blue-6)" />
            ) : (
              <IconSelector size={14} color="gray" opacity={0.5} />
            )}
          </Group>
        </Group>
      </Table.Th>
    );
  };

  const [reportSortConfig, setReportSortConfig] = useState<{ key: keyof DailyReportItem | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });

  const handleReportSort = (key: keyof DailyReportItem) => {
    let direction: "asc" | "desc" = "asc";
    if (reportSortConfig.key === key && reportSortConfig.direction === "asc") direction = "desc";
    setReportSortConfig({ key, direction });
  };

  const ThReport = ({ children, columnKey }: { children: React.ReactNode; columnKey: keyof DailyReportItem }) => {
    const isSorted = reportSortConfig.key === columnKey;
    const isAsc = isSorted && reportSortConfig.direction === "asc";
    const isDesc = isSorted && reportSortConfig.direction === "desc";

    return (
      <Table.Th>
        <Group justify="space-between" align="center" wrap="nowrap" style={{ cursor: "pointer" }} onClick={() => handleReportSort(columnKey)}>
          <Text fw={600} fz="sm">{children}</Text>
          <Group gap={0}>
            {isAsc ? (
              <IconChevronUp size={14} color="var(--mantine-color-blue-6)" />
            ) : isDesc ? (
              <IconChevronDown size={14} color="var(--mantine-color-blue-6)" />
            ) : (
              <IconSelector size={14} color="gray" opacity={0.5} />
            )}
          </Group>
        </Group>
      </Table.Th>
    );
  };

  // Filtered & Sorted WFH Records
  let filteredWfh = records.filter(r => {
    const matchSearch =
      r.id.toLowerCase().includes(wfhSearch.toLowerCase()) ||
      r.project.toLowerCase().includes(wfhSearch.toLowerCase()) ||
      r.reason.toLowerCase().includes(wfhSearch.toLowerCase()) ||
      r.date.includes(wfhSearch);
    const matchMonth =
      wfhFilterMonth === "all" || !wfhFilterMonth || r.date.includes(wfhFilterMonth);
    const matchStatus =
      wfhFilterStatus === "all" || !wfhFilterStatus || r.status === wfhFilterStatus;
    return matchSearch && matchMonth && matchStatus;
  });

  if (sortConfig.key) {
    filteredWfh.sort((a, b) => {
      const aV = a[sortConfig.key!] ?? ""; const bV = b[sortConfig.key!] ?? "";
      if (aV < bV) return sortConfig.direction === "asc" ? -1 : 1;
      if (aV > bV) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Filtered & Sorted Reports
  let processedReportsData = [...reports];
  if (reportSortConfig.key) {
    processedReportsData.sort((a, b) => {
      const aV = a[reportSortConfig.key!] ?? ""; const bV = b[reportSortConfig.key!] ?? "";
      if (aV < bV) return reportSortConfig.direction === "asc" ? -1 : 1;
      if (aV > bV) return reportSortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const filteredReports = processedReportsData.filter((rpt) => {
    const matchSearch =
      rpt.project.toLowerCase().includes(reportSearch.toLowerCase()) ||
      rpt.summary.toLowerCase().includes(reportSearch.toLowerCase()) ||
      rpt.wfhId.toLowerCase().includes(reportSearch.toLowerCase()) ||
      rpt.reportId.toLowerCase().includes(reportSearch.toLowerCase()) ||
      rpt.date.includes(reportSearch);
    const matchMonth =
      reportFilterMonth === "all" || !reportFilterMonth || rpt.date.includes(reportFilterMonth);
    const matchProject =
      reportFilterProject === "all" || !reportFilterProject || rpt.project === reportFilterProject;
    const matchScore =
      reportFilterScore === "all" || !reportFilterScore
        ? true
        : reportFilterScore === "high"
          ? rpt.aiScore.includes("98%") || rpt.aiScore.includes("99%") || rpt.aiScore.includes("100%")
          : true;
    return matchSearch && matchMonth && matchProject && matchScore;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mon = wfhDate ? wfhDate.slice(5, 7) : "00";
    const day = wfhDate ? wfhDate.slice(8, 10) : "00";
    const newRecord: WfhRecord = {
      id: `WFH-${mon}${day}`,
      date: wfhDate ? wfhDate.split("-").reverse().join("/") : "Hôm nay",
      timeSlot: wfhSlot,
      project: wfhProject || "Dự án chưa đặt tên",
      reason: wfhReason || "Làm việc từ xa",
      status: "Chờ duyệt",
      hasReport: false,
    };
    setRecords([newRecord, ...records]);
    setAddModalOpened(false);
    setWfhDate(""); setWfhProject(""); setWfhReason("");
  };

  const openSubmitReportModal = (record: WfhRecord) => {
    setReportModalRecord(record);
    setReportSummary("");
    setReportTasks("");
    setReportCompletion("100%");
    setReportBlockers("");
    setReportNextDay("");
    setReportTicket("");
    setReportFiles(["screenshot_proof_work.png"]);
  };

  const handleSubmitReport = () => {
    if (!reportModalRecord) return;

    const rateNum = parseInt(reportCompletion) || 100;
    const taskList = reportTasks
      ? reportTasks.split("\n").map(t => t.trim()).filter(Boolean)
      : ["Hoàn thành các mục tiêu công việc theo kế hoạch WFH."];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newReport: DailyReportItem = {
      reportId: `RPT-${reportModalRecord.id.replace("WFH-", "")}`,
      wfhId: reportModalRecord.id,
      date: reportModalRecord.date,
      timeSlot: reportModalRecord.timeSlot,
      project: reportModalRecord.project,
      submittedAt: `${reportModalRecord.date} ${timeStr}`,
      summary: reportSummary,
      completedTasks: taskList,
      completionRate: rateNum,
      blockers: reportBlockers || "Không có vướng mắc phát sinh.",
      nextDayPlan: reportNextDay || "Tiếp tục thực hiện các công việc theo kế hoạch sprint.",
      ticketLink: reportTicket || undefined,
      attachments: reportFiles.length > 0 ? reportFiles : ["screenshot_work.png"],
      aiScore: "20/20 ảnh (100%)",
      aiNote: "Báo cáo chi tiết, nộp đúng thời hạn, tài liệu chứng thực hợp lệ.",
    };

    setReports([newReport, ...reports]);

    // Cập nhật trạng thái record thành "Hoàn thành"
    setRecords(prev => prev.map(r =>
      r.id === reportModalRecord.id
        ? { ...r, hasReport: true, status: "Hoàn thành", reportData: newReport }
        : r
    ));

    setReportModalRecord(null);
  };

  const renderStatusBadge = (status: string) => <StatusBadge status={status} />;

  const summaryCards = [
    { label: "Hạn mức WFH", value: "4", sub: "ngày / tháng" },
    { label: "Đã sử dụng", value: "3", sub: "tháng 9/2026" },
    { label: "Còn lại", value: "1", sub: "ngày tháng này" },
    { label: "Tỉ lệ hoàn thành", value: "100%", sub: "Báo cáo đã nộp" },
  ];

  const uniqueProjects = Array.from(new Set(reports.map(r => r.project)));

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={600} mb={4}>Làm việc từ xa (WFH)</Title>
          <Breadcrumbs separator="/" fz="sm">
            <Anchor href="#" c="dimmed">Tổng quan</Anchor>
            <Text c="dimmed">Làm việc từ xa</Text>
          </Breadcrumbs>
        </Box>
        <Button color="blue" radius="xl" leftSection={<IconPlus size={16} />} onClick={() => setAddModalOpened(true)}>
          Đăng ký WFH
        </Button>
      </Group>

      {/* Summary Cards */}
      <Grid mb="xl">
        {summaryCards.map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={index}>
            <Card withBorder radius="lg" padding="lg" ta="center">
              <Text fw={700} fz="sm" c="dimmed" tt="uppercase" style={{ letterSpacing: "0.5px" }}>{item.label}</Text>
              <Group justify="center" align="baseline" gap={4} mt="xs">
                <Text fw={700} fz={24} c="dark.9">{item.value}</Text>
                {item.sub && <Text fz="xs" c="dimmed">{item.sub}</Text>}
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* 2 Subtabs */}
      <Tabs value={activeTab} onChange={setActiveTab} variant="default" mb="xl">
        <Tabs.List mb="lg">
          <Tabs.Tab value="requests">Danh sách đơn WFH</Tabs.Tab>
          <Tabs.Tab value="reports">Lịch sử Báo cáo hằng ngày</Tabs.Tab>
        </Tabs.List>

        {/* SUBTAB 1: DANH SÁCH ĐƠN WFH */}
        <Tabs.Panel value="requests">
          <Card withBorder radius="lg" p={0} shadow="sm">
            {/* Bộ lọc trên tiêu đề subtab */}
            <Box p="md" className="filter-section">
              <Group justify="space-between" wrap="wrap" gap="sm">
                <Group gap="xs" wrap="wrap">
                  <TextInput
                    placeholder="Tìm kiếm đơn..."
                    leftSection={<IconSearch size={15} />}
                    size="xs"
                    w={190}
                    value={wfhSearch}
                    onChange={(e) => setWfhSearch(e.currentTarget.value)}
                  />
                  <Select
                    placeholder="Thời gian"
                    size="xs"
                    w={125}
                    data={[
                      { value: "all", label: "Tất cả tháng" },
                      { value: "09/2026", label: "Tháng 09/2026" },
                      { value: "10/2026", label: "Tháng 10/2026" },
                    ]}
                    value={wfhFilterMonth}
                    onChange={setWfhFilterMonth}
                    allowDeselect={false}
                  />
                  <Select
                    placeholder="Trạng thái"
                    size="xs"
                    w={130}
                    data={[
                      { value: "all", label: "Tất cả trạng thái" },
                      { value: "Chờ duyệt", label: "Chờ duyệt" },
                      { value: "Đã duyệt", label: "Đã duyệt" },
                      { value: "Hoàn thành", label: "Hoàn thành" },
                      { value: "Đã hủy", label: "Đã hủy" },
                    ]}
                    value={wfhFilterStatus}
                    onChange={setWfhFilterStatus}
                    allowDeselect={false}
                  />
                </Group>
              </Group>
            </Box>

            <ScrollArea>
              <Table className="ohriise-table" verticalSpacing="md" horizontalSpacing="md" highlightOnHover striped={false}>
                <Table.Thead>
                  <Table.Tr bg="transparent">
                    <Th columnKey="id">Mã đơn</Th>
                    <Th columnKey="date">Ngày WFH</Th>
                    <Th columnKey="timeSlot">Khung giờ</Th>
                    <Th columnKey="project">Dự án</Th>
                    <Th columnKey="hasReport">Báo cáo</Th>
                    <Th columnKey="status">Trạng thái</Th>
                    <Table.Th style={{ textAlign: "right" }}></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredWfh.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={7} ta="center" py="xl">
                        <Text c="dimmed">Không tìm thấy đơn WFH nào phù hợp bộ lọc</Text>
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    filteredWfh.map((r) => (
                      <Table.Tr key={r.id}>
                        <Table.Td fw={700} c="dark.9">{r.id}</Table.Td>
                        <Table.Td fw={500}>{r.date}</Table.Td>
                        <Table.Td c="blue" fw={600}>{r.timeSlot}</Table.Td>
                        <Table.Td>
                          <Text fw={600} fz="sm">{r.project}</Text>
                          <Text fz="xs" c="dimmed">{r.reason}</Text>
                        </Table.Td>
                        <Table.Td>
                          {r.hasReport ? (
                            <Badge
                              color="teal"
                              variant="light"
                              size="sm"
                              leftSection={<IconCheck size={12} />}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const found = reports.find(rpt => rpt.wfhId === r.id);
                                if (found) setViewReportModal(found);
                              }}
                            >
                              Đã có report
                            </Badge>
                          ) : r.status === "Đã duyệt" ? (
                            <Button
                              size="xs"
                              variant="filled"
                              color="blue"
                              radius="sm"
                              leftSection={<IconFileText size={13} />}
                              onClick={() => openSubmitReportModal(r)}
                            >
                              Nộp Báo cáo
                            </Button>
                          ) : (
                            <Text fz="xs" c="dimmed">—</Text>
                          )}
                        </Table.Td>
                        <Table.Td>{renderStatusBadge(r.status)}</Table.Td>
                        <Table.Td ta="right">
                          <Menu position="bottom-end" shadow="sm">
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={16} /></ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item leftSection={<IconEdit size={14} />}>Chỉnh sửa</Menu.Item>
                              <Menu.Item leftSection={<IconX size={14} />} color="orange">Hủy đơn</Menu.Item>
                              <Menu.Item leftSection={<IconTrash size={14} />} color="red">Xóa</Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  )}
                </Table.Tbody>
              </Table>
            </ScrollArea>

            <Box p="md">
              <Group justify="space-between">
                <Text fz="sm" c="dimmed">Hiển thị {filteredWfh.length} của {records.length} kết quả</Text>
                <Pagination total={1} value={1} size="sm" radius="sm" color="blue" />
              </Group>
            </Box>
          </Card>
        </Tabs.Panel>

        {/* SUBTAB 2: LỊCH SỬ BÁO CÁO HẰNG NGÀY */}
        <Tabs.Panel value="reports">
          <Card withBorder radius="lg" p={0} shadow="sm">
            {/* Bộ lọc trên tiêu đề subtab: Gọn gàng, đầy đủ */}
            <Box p="md" className="filter-section">
              <Group justify="space-between" wrap="wrap" gap="sm">
                <Group gap="xs" wrap="wrap">
                  <TextInput
                    placeholder="Tìm theo nội dung, dự án, mã..."
                    leftSection={<IconSearch size={15} />}
                    size="xs"
                    w={210}
                    value={reportSearch}
                    onChange={(e) => setReportSearch(e.currentTarget.value)}
                  />
                  <Select
                    placeholder="Thời gian"
                    size="xs"
                    w={125}
                    data={[
                      { value: "all", label: "Tất cả tháng" },
                      { value: "09/2026", label: "Tháng 09/2026" },
                      { value: "10/2026", label: "Tháng 10/2026" },
                    ]}
                    value={reportFilterMonth}
                    onChange={setReportFilterMonth}
                    allowDeselect={false}
                  />
                  <Select
                    placeholder="Dự án"
                    size="xs"
                    w={140}
                    data={[
                      { value: "all", label: "Tất cả dự án" },
                      ...uniqueProjects.map(p => ({ value: p, label: p }))
                    ]}
                    value={reportFilterProject}
                    onChange={setReportFilterProject}
                    allowDeselect={false}
                  />
                  <Select
                    placeholder="AI Đánh giá"
                    size="xs"
                    w={135}
                    data={[
                      { value: "all", label: "Tất cả đánh giá" },
                      { value: "high", label: "Minh bạch ≥ 98%" },
                    ]}
                    value={reportFilterScore}
                    onChange={setReportFilterScore}
                    allowDeselect={false}
                  />
                </Group>

                <Badge color="teal" variant="light" size="md">
                  {filteredReports.length} Báo cáo
                </Badge>
              </Group>
            </Box>

            <ScrollArea>
              <Table className="ohriise-table" verticalSpacing="md" horizontalSpacing="md" highlightOnHover striped={false}>
                <Table.Thead>
                  {/* Tiêu đề ngắn gọn, bỏ cột chi tiết */}
                  <Table.Tr bg="transparent">
                    <ThReport columnKey="reportId">Mã báo cáo</ThReport>
                    <ThReport columnKey="date">Ngày WFH</ThReport>
                    <ThReport columnKey="project">Dự án</ThReport>
                    <Table.Th fw={600} fz="sm" style={{ minWidth: 260 }}>Nội dung</Table.Th>
                    <ThReport columnKey="completionRate">Tiến độ</ThReport>
                    <Table.Th fw={600} fz="sm">Minh chứng</Table.Th>
                    <ThReport columnKey="aiScore">AI Đánh giá</ThReport>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredReports.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={7} ta="center" py="xl">
                        <Text c="dimmed">Không tìm thấy báo cáo hằng ngày nào phù hợp</Text>
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    filteredReports.map((rpt) => {
                      // Tách chỉ lấy giờ nộp (ví dụ "17:40") để tránh lặp lại ngày "18/09/2026"
                      const timeOnly = rpt.submittedAt.includes(" ")
                        ? rpt.submittedAt.split(" ")[1]
                        : rpt.submittedAt;

                      return (
                        <Table.Tr key={rpt.reportId}>
                          {/* Nhấn vô mã report là xem được nội dung chi tiết */}
                          <Table.Td>
                            <Tooltip label="Nhấn để xem chi tiết báo cáo" withArrow position="top-start">
                              <Anchor
                                component="button"
                                type="button"
                                fw={700}
                                c="dark"
                                fz="sm"
                                onClick={() => setViewReportModal(rpt)}
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4
                                }}
                              >
                                {rpt.reportId}
                                <IconEye size={13} style={{ opacity: 0.7 }} />
                              </Anchor>
                            </Tooltip>
                            <Text fz="xs" c="dimmed">Đơn {rpt.wfhId}</Text>
                          </Table.Td>

                          {/* Cột Ngày WFH: Không bị lặp ngày giờ */}
                          <Table.Td>
                            <Text fw={600} fz="sm">{rpt.date}</Text>
                            <Text fz="xs" c="dimmed">Nộp lúc {timeOnly}</Text>
                          </Table.Td>

                          <Table.Td>
                            <Badge color="blue" variant="light" size="sm">{rpt.project}</Badge>
                          </Table.Td>

                          <Table.Td>
                            <Text fz="sm" lineClamp={2} fw={500}>{rpt.summary}</Text>
                            <Text fz="xs" c="dimmed" mt={2}>
                              {rpt.completedTasks.length} đầu việc hoàn tất
                            </Text>
                          </Table.Td>

                          <Table.Td>
                            <Group gap="xs" align="center">
                              <Progress value={rpt.completionRate} size="sm" color="teal" w={60} radius="xl" />
                              <Text fz="xs" fw={700} c="teal.7">{rpt.completionRate}%</Text>
                            </Group>
                          </Table.Td>

                          <Table.Td>
                            <Group gap={6}>
                              {rpt.ticketLink && (
                                <Badge
                                  component="a"
                                  href={rpt.ticketLink}
                                  target="_blank"
                                  size="xs"
                                  color="indigo"
                                  variant="light"
                                  rightSection={<IconExternalLink size={10} />}
                                  style={{ cursor: "pointer" }}
                                >
                                  Jira
                                </Badge>
                              )}
                              <Badge size="xs" color="gray" variant="light" leftSection={<IconPaperclip size={10} />}>
                                {rpt.attachments.length} file
                              </Badge>
                            </Group>
                          </Table.Td>

                          <Table.Td>
                            <Badge color="teal" variant="outline" size="sm" leftSection={<IconSparkles size={11} />}>
                              {rpt.aiScore}
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })
                  )}
                </Table.Tbody>
              </Table>
            </ScrollArea>

            <Box p="md">
              <Group justify="space-between" align="center">
                <Text fz="sm" c="dimmed">
                  Hiển thị {filteredReports.length} của {reports.length} kết quả
                </Text>
                <Pagination total={1} value={1} size="sm" radius="sm" color="teal" />
              </Group>
            </Box>
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* Modal Đăng ký WFH nhanh */}
      <Modal
        opened={addModalOpened}
        onClose={() => setAddModalOpened(false)}
        title={<Text fw={600} fz="lg">Đăng ký WFH</Text>}
        size="lg"
        radius="md"
      >
        <form onSubmit={handleAddSubmit}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput type="date" label="Ngày WFH" withAsterisk value={wfhDate} onChange={e => setWfhDate(e.currentTarget.value)} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select label="Khung giờ" withAsterisk data={["Cả ngày (08:30 - 17:35)", "Buổi sáng (08:30 - 12:00)", "Buổi chiều (13:00 - 17:35)"]} value={wfhSlot} onChange={v => v && setWfhSlot(v)} allowDeselect={false} />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Tên dự án / Công việc" withAsterisk placeholder="VD: HRMS Portal, Design System..." value={wfhProject} onChange={e => setWfhProject(e.currentTarget.value)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea label="Lý do & Kế hoạch công việc" withAsterisk minRows={3} placeholder="Mô tả cụ thể lý do làm việc từ xa và kế hoạch công việc dự kiến..." value={wfhReason} onChange={e => setWfhReason(e.currentTarget.value)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={() => setAddModalOpened(false)}>Hủy</Button>
                <Button type="submit" color="blue" leftSection={<IconCheck size={16} />}>Gửi đơn</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      {/* MODAL NỘP BÁO CÁO HẰNG NGÀY CHI TIẾT */}
      <Modal
        opened={!!reportModalRecord}
        onClose={() => setReportModalRecord(null)}
        title={
          <Group gap="xs">
            <ThemeIcon color="teal" variant="light" size="lg" radius="md">
              <IconFileText size={18} />
            </ThemeIcon>
            <Box>
              <Text fw={600} fz="lg">Nộp Báo cáo WFH</Text>
              <Text fz="xs" c="dimmed">Mã đơn: {reportModalRecord?.id} • Ngày: {reportModalRecord?.date}</Text>
            </Box>
          </Group>
        }
        size="xl"
        radius="md"
      >
        <Stack gap="md">
          {/* Info Card */}
          <Card withBorder bg="blue.0" p="sm" radius="md">
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xs">
              <Box>
                <Text fz="xs" c="dimmed">Dự án thực hiện</Text>
                <Text fw={600} fz="sm">{reportModalRecord?.project}</Text>
              </Box>
              <Box>
                <Text fz="xs" c="dimmed">Khung giờ làm việc</Text>
                <Text fw={600} fz="sm">{reportModalRecord?.timeSlot}</Text>
              </Box>
              <Box>
                <Text fz="xs" c="dimmed">Kế hoạch đăng ký ban đầu</Text>
                <Text fz="xs" lineClamp={1}>{reportModalRecord?.reason}</Text>
              </Box>
            </SimpleGrid>
          </Card>

          {/* Công việc thực hiện */}
          <Textarea
            label="1. Tóm tắt kết quả công việc đã thực hiện trong ngày"
            description="Mô tả tổng quan các tính năng, tài liệu hoặc sản phẩm đã hoàn thành"
            withAsterisk
            minRows={3}
            placeholder="VD: Đã hoàn tất 5 màn hình UI Dashboard, phối hợp cùng team BE thống nhất API endpoint, nộp mã nguồn lên branch..."
            value={reportSummary}
            onChange={e => setReportSummary(e.currentTarget.value)}
          />

          <Textarea
            label="2. Danh sách các đầu việc cụ thể (Tasks completed)"
            description="Mỗi đầu việc trên một dòng để AI tự động phân tích"
            minRows={3}
            placeholder={"- Thiết kế màn hình xem báo cáo WFH\n- Fix lỗi hiển thị responsive table\n- Họp daily sync lúc 14h00"}
            value={reportTasks}
            onChange={e => setReportTasks(e.currentTarget.value)}
          />

          {/* Tiến độ & Khó khăn */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="3. Mức độ hoàn thành mục tiêu ngày"
                data={["100%", "90%", "80%", "70%", "50%"]}
                value={reportCompletion}
                onChange={v => v && setReportCompletion(v)}
                allowDeselect={false}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="4. Link Jira / GitHub / Figma bàn giao"
                placeholder="https://jira.company.vn/browse/..."
                value={reportTicket}
                onChange={e => setReportTicket(e.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="5. Khó khăn / Vướng mắc phát sinh (nếu có)"
                placeholder="VD: Chờ phản hồi API từ bên đối tác..."
                value={reportBlockers}
                onChange={e => setReportBlockers(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="6. Kế hoạch ngày làm việc tiếp theo"
                placeholder="VD: Tiếp tục hoàn thiện module Analytics..."
                value={reportNextDay}
                onChange={e => setReportNextDay(e.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>

          {/* Đính kèm minh chứng */}
          <Box>
            <Text fw={500} fz="sm" mb={4}>7. Ảnh & Tài liệu minh chứng làm việc (Proof of Work)</Text>
            <Card
              withBorder
              style={{ borderStyle: "dashed", cursor: "pointer" }}
              p="md"
              ta="center"
              bg="gray.0"
              onClick={() => {
                const mockFiles = [
                  "screenshot_prototype_ui.png",
                  "git_commit_log.png",
                  "daily_meeting_zoom.png"
                ];
                setReportFiles(prev => Array.from(new Set([...prev, mockFiles[prev.length % mockFiles.length]])));
              }}
            >
              <IconFileUpload size={24} color="gray" style={{ margin: "0 auto", marginBottom: 4 }} />
              <Text fz="sm" c="dimmed">
                Bấm vào đây để tải ảnh screenshot màn hình làm việc hoặc tài liệu bàn giao <Text span c="blue" fw={600}>(Thêm tệp)</Text>
              </Text>
            </Card>

            {/* List attached files */}
            {reportFiles.length > 0 && (
              <Group gap="xs" mt="xs">
                {reportFiles.map((file, idx) => (
                  <Badge
                    key={idx}
                    color="teal"
                    variant="light"
                    size="md"
                    leftSection={<IconPaperclip size={12} />}
                    rightSection={
                      <ActionIcon size="xs" variant="transparent" color="teal" onClick={() => setReportFiles(reportFiles.filter((_, i) => i !== idx))}>
                        <IconX size={10} />
                      </ActionIcon>
                    }
                  >
                    {file}
                  </Badge>
                ))}
              </Group>
            )}
          </Box>

          {/* AI Validation Pre-Check banner */}
          <Card withBorder bg="teal.0" p="xs" radius="md">
            <Group gap="xs">
              <IconSparkles size={18} color="var(--mantine-color-teal-7)" />
              <Box>
                <Text fw={600} fz="xs" c="teal.9">Hệ thống AI đối soát & chấm điểm minh bạch</Text>
                <Text fz="xs" c="teal.8">
                  Báo cáo có đủ tóm tắt nội dung, tiến độ và minh chứng sẽ được AI tự động xếp hạng uy tín 95-100%.
                </Text>
              </Box>
            </Group>
          </Card>

          <Divider />

          <Group justify="flex-end">
            <Button variant="default" onClick={() => setReportModalRecord(null)}>Hủy</Button>
            <Button
              color="teal"
              leftSection={<IconCheck size={16} />}
              onClick={handleSubmitReport}
              disabled={!reportSummary.trim()}
            >
              Nộp Daily Report & Hoàn thành
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* MODAL XEM CHI TIẾT DAILY REPORT ĐÃ NỘP (KHI NHẤN VÀO MÃ REPORT) */}
      <Modal
        opened={!!viewReportModal}
        onClose={() => setViewReportModal(null)}
        title={
          <Group gap="xs">
            <ThemeIcon color="teal" variant="light" size="lg" radius="md">
              <IconSparkles size={18} />
            </ThemeIcon>
            <Box>
              <Text fw={600} fz="lg">Chi tiết Daily Report — {viewReportModal?.reportId}</Text>
              <Text fz="xs" c="dimmed">Mã đơn WFH: {viewReportModal?.wfhId} • Ngày nộp: {viewReportModal?.submittedAt}</Text>
            </Box>
          </Group>
        }
        size="lg"
        radius="md"
      >
        {viewReportModal && (
          <Stack gap="md">
            <Card withBorder bg="gray.0" p="sm" radius="md">
              <Grid>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Ngày WFH</Text>
                  <Text fw={600} fz="sm">{viewReportModal.date}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Dự án</Text>
                  <Text fw={600} fz="sm">{viewReportModal.project}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Khung giờ</Text>
                  <Text fz="sm">{viewReportModal.timeSlot}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Mức độ hoàn thành</Text>
                  <Group gap="xs">
                    <Progress value={viewReportModal.completionRate} size="sm" color="teal" w={60} radius="xl" />
                    <Text fw={700} fz="sm" c="teal.7">{viewReportModal.completionRate}%</Text>
                  </Group>
                </Grid.Col>
              </Grid>
            </Card>

            <Box>
              <Text fw={600} fz="sm" mb={4}>Tóm tắt công việc đã thực hiện:</Text>
              <Card withBorder p="sm" radius="md">
                <Text fz="sm">{viewReportModal.summary}</Text>
              </Card>
            </Box>

            <Box>
              <Text fw={600} fz="sm" mb={4}>Các đầu việc cụ thể:</Text>
              <Stack gap={6}>
                {viewReportModal.completedTasks.map((task, idx) => (
                  <Group key={idx} gap="xs" align="flex-start">
                    <ThemeIcon color="teal" size={18} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                    <Text fz="sm">{task}</Text>
                  </Group>
                ))}
              </Stack>
            </Box>

            {viewReportModal.blockers && (
              <Box>
                <Text fw={600} fz="sm" mb={2}>Khó khăn & Vướng mắc:</Text>
                <Text fz="sm" c="dimmed">{viewReportModal.blockers}</Text>
              </Box>
            )}

            {viewReportModal.nextDayPlan && (
              <Box>
                <Text fw={600} fz="sm" mb={2}>Kế hoạch ngày tiếp theo:</Text>
                <Text fz="sm" c="dimmed">{viewReportModal.nextDayPlan}</Text>
              </Box>
            )}

            <Box>
              <Text fw={600} fz="sm" mb={6}>Tệp đính kèm & Minh chứng ({viewReportModal.attachments.length}):</Text>
              <Group gap="xs">
                {viewReportModal.attachments.map((att, i) => (
                  <Badge key={i} color="gray" variant="outline" size="md" leftSection={<IconPaperclip size={12} />}>
                    {att}
                  </Badge>
                ))}
                {viewReportModal.ticketLink && (
                  <Badge
                    component="a"
                    href={viewReportModal.ticketLink}
                    target="_blank"
                    color="blue"
                    size="md"
                    rightSection={<IconExternalLink size={12} />}
                  >
                    Mở Jira Task
                  </Badge>
                )}
              </Group>
            </Box>

            {/* AI Review Banner */}
            <Card withBorder bg="teal.0" p="sm" radius="md">
              <Group gap="xs" align="flex-start">
                <IconSparkles size={20} color="var(--mantine-color-teal-7)" style={{ marginTop: 2 }} />
                <Box>
                  <Group gap="xs">
                    <Text fw={700} fz="sm" c="teal.9">AI Đánh giá:</Text>
                    <Badge color="teal" variant="filled" size="sm">{viewReportModal.aiScore}</Badge>
                  </Group>
                  <Text fz="xs" c="teal.8" mt={2}>{viewReportModal.aiNote}</Text>
                </Box>
              </Group>
            </Card>

            <Group justify="flex-end" mt="xs">
              <Button variant="default" onClick={() => setViewReportModal(null)}>Đóng</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
