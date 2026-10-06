import React, { useState } from "react";
import { StatusBadge } from "../components/UI";
import {
  Box, Stack, Group, Text, Title, Card, Grid,
  Select, TextInput, Textarea, Button, Table, Badge, Modal, SegmentedControl, ScrollArea,
  Menu, ActionIcon, Avatar, Pagination
} from "@mantine/core";
import { IconPlus, IconDotsVertical, IconTrash, IconCheck, IconEdit, IconChevronUp, IconChevronDown, IconSelector, IconSearch } from "@tabler/icons-react";

export interface LeaveRecord {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  timeSlot: string;
  reason: string;
  handover: string;
  status: "new" | "approved" | "declined";
  statusText: string;
  approvedBy?: {
    name: string;
    avatar?: string;
  };
}

const INITIAL_LEAVE_RECORDS: LeaveRecord[] = [
  {
    id: "#NP-2026-0928",
    leaveType: "Phép năm",
    startDate: "08/03/2026",
    endDate: "09/03/2026",
    totalDays: 2,
    timeSlot: "Cả ngày",
    reason: "Đi khám bệnh",
    handover: "Trần Thảo My",
    status: "new",
    statusText: "Chờ duyệt",
    approvedBy: { name: "Nguyễn Văn A" }
  },
  {
    id: "#NP-2026-0915",
    leaveType: "Phép năm",
    startDate: "30/01/2026",
    endDate: "30/01/2026",
    totalDays: 0.5,
    timeSlot: "Buổi chiều",
    reason: "Việc cá nhân",
    handover: "Lê Hoàng Nam",
    status: "new",
    statusText: "Chờ duyệt",
    approvedBy: { name: "Nguyễn Văn A" }
  },
  {
    id: "#NP-2026-0810",
    leaveType: "Phép năm",
    startDate: "13/01/2026",
    endDate: "14/01/2026",
    totalDays: 2,
    timeSlot: "Cả ngày",
    reason: "Du lịch gia đình",
    handover: "Phạm Minh Đức",
    status: "approved",
    statusText: "Đã duyệt",
    approvedBy: { name: "Nguyễn Văn A" }
  },
  {
    id: "#NP-2026-0704",
    leaveType: "Phép năm",
    startDate: "10/01/2026",
    endDate: "10/01/2026",
    totalDays: 0.5,
    timeSlot: "Buổi sáng",
    reason: "Chăm con ốm",
    handover: "Trần Thảo My",
    status: "declined",
    statusText: "Từ chối",
    approvedBy: { name: "Nguyễn Văn A" }
  },
  {
    id: "#NP-2026-0601",
    leaveType: "Nghỉ ốm",
    startDate: "15/01/2026",
    endDate: "25/01/2026",
    totalDays: 10,
    timeSlot: "Cả ngày",
    reason: "Sốt xuất huyết",
    handover: "Trần Thảo My",
    status: "approved",
    statusText: "Đã duyệt",
    approvedBy: { name: "Nguyễn Văn A" }
  }
];

export default function LeavePage() {
  const [records, setRecords] = useState<LeaveRecord[]>(INITIAL_LEAVE_RECORDS);

  // Modals
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [cancelModalRecord, setCancelModalRecord] = useState<LeaveRecord | null>(null);

  // Add Form States
  const [leaveType, setLeaveType] = useState("Phép năm");
  const [timeMode, setTimeMode] = useState<string>("full");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  // Filter & Sort States
  const [sortConfig, setSortConfig] = useState<{ key: keyof LeaveRecord | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const [columnFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>("all");
  const [filterStatus, setFilterStatus] = useState<string | null>("all");

  const calculateTotalDays = () => {
    if (timeMode !== "full") return 0.5;
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 1;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do nghỉ phép.");
      return;
    }
    const newRecord: LeaveRecord = {
      id: `#NP-2026-10${Math.floor(Math.random() * 90 + 10)}`,
      leaveType,
      startDate: startDate || "Hôm nay",
      endDate: timeMode === "full" ? (endDate || "Hôm nay") : (startDate || "Hôm nay"),
      totalDays: calculateTotalDays(),
      timeSlot: timeMode === "full" ? "Cả ngày" : timeMode === "morning" ? "Buổi sáng" : "Buổi chiều",
      reason,
      handover: "",
      status: "new",
      statusText: "Chờ duyệt",
      approvedBy: { name: "Team Lead" }
    };

    setRecords([newRecord, ...records]);
    setAddModalOpened(false);
    setReason("");
    setStartDate("");
    setEndDate("");
  };

  const handleSort = (key: keyof LeaveRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  let processedRecords = records.filter(r => {
    const matchSearch = !search ||
      r.leaveType.toLowerCase().includes(search.toLowerCase()) ||
      r.reason.toLowerCase().includes(search.toLowerCase()) ||
      r.startDate.includes(search);
    const matchType = filterType === "all" || r.leaveType === filterType;
    const matchStatus = filterStatus === "all" || r.statusText === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  if (sortConfig.key) {
    processedRecords.sort((a, b) => {
      let aValue = a[sortConfig.key!];
      let bValue = b[sortConfig.key!];
      
      if (sortConfig.key === "approvedBy") {
        aValue = a.approvedBy?.name || "";
        bValue = b.approvedBy?.name || "";
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }


  const Th = ({ children, columnKey }: { children: React.ReactNode, columnKey: keyof LeaveRecord }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = isSorted && sortConfig.direction === 'asc';
    const isDesc = isSorted && sortConfig.direction === 'desc';
    return (
      <Table.Th>
        <Group justify="space-between" align="center" style={{ cursor: 'pointer' }} onClick={() => handleSort(columnKey)} wrap="nowrap">
          <Text fw={600} fz="sm">{children}</Text>
          <Group gap={0}>
            {isAsc ? <IconChevronUp size={14} color="var(--mantine-color-blue-6)" /> : isDesc ? <IconChevronDown size={14} color="var(--mantine-color-blue-6)" /> : <IconSelector size={14} color="gray" opacity={0.5} />}
          </Group>
        </Group>
      </Table.Th>
    )
  }

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={2} fw={600}>Nghỉ phép</Title>
        <Button 
          color="blue" 
          radius="xl" 
          leftSection={<IconPlus size={16} />}
          onClick={() => setAddModalOpened(true)}
        >
          Tạo đơn nghỉ
        </Button>
      </Group>

      {/* Summary Cards */}
      <Grid mb="xl">
        {[
          { label: "Phép năm", value: "12" },
          { label: "Nghỉ ốm", value: "3" },
          { label: "Phép khác", value: "4" },
          { label: "Còn lại", value: "5" }
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card withBorder radius="lg" padding="lg" ta="center">
              <Text fw={700} fz="sm" c="dimmed" tt="uppercase" style={{ letterSpacing: "0.5px" }}>{item.label}</Text>
              <Text fw={700} fz={24} mt="xs" c="dark.9">{item.value}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Table Section */}
      <Card withBorder radius="lg" p={0} shadow="sm">
        <Box p="md" className="filter-section">
          <Group gap="xs" wrap="wrap">
            <TextInput
              placeholder="Tìm kiếm đơn nghỉ..."
              leftSection={<IconSearch size={15} />}
              size="xs"
              w={200}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
              size="xs" w={150}
              data={[{ value: "all", label: "Tất cả loại phép" }, "Phép năm", "Nghỉ ốm", "Nghỉ bù", "Thai sản", "Nghỉ không lương"]}
              value={filterType}
              onChange={setFilterType}
              allowDeselect={false}
            />
            <Select
              size="xs" w={150}
              data={[{ value: "all", label: "Tất cả trạng thái" }, "Chờ duyệt", "Đã duyệt", "Từ chối"]}
              value={filterStatus}
              onChange={setFilterStatus}
              allowDeselect={false}
            />
          </Group>
        </Box>

        <ScrollArea>
          <Table className="ohriise-table" verticalSpacing="md" horizontalSpacing="md" highlightOnHover striped={false}>
            <Table.Thead>
              <Table.Tr bg="transparent">
                <Th columnKey="leaveType">Loại phép</Th>
                <Th columnKey="startDate">Từ ngày</Th>
                <Th columnKey="endDate">Đến ngày</Th>
                <Th columnKey="totalDays">Số ngày</Th>
                <Th columnKey="reason">Lý do</Th>
                <Th columnKey="statusText">Trạng thái</Th>
                <Th columnKey="approvedBy">Người duyệt</Th>
                <Table.Th fw={600} fz="sm" ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {processedRecords.map((r) => (
                <Table.Tr key={r.id}>
                  <Table.Td fw={500}>{r.leaveType}</Table.Td>
                  <Table.Td>{r.startDate}</Table.Td>
                  <Table.Td>{r.endDate}</Table.Td>
                  <Table.Td>{r.totalDays} ngày{r.totalDays === 0.5 ? ' (' + r.timeSlot + ')' : ''}</Table.Td>
                  <Table.Td>{r.reason}</Table.Td>
                  <Table.Td>{<StatusBadge status={r.status} statusText={r.statusText} />}</Table.Td>
                  <Table.Td>
                    {r.approvedBy && (
                      <Group gap="xs">
                        <Avatar radius="xl" size="sm" color="initials" name={r.approvedBy.name} src={r.approvedBy.avatar} />
                        <Text fz="sm" fw={500}>{r.approvedBy.name}</Text>
                      </Group>
                    )}
                  </Table.Td>
                  <Table.Td ta="right">
                    <Menu position="bottom-end" withinPortal>
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <IconDotsVertical size={18} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item leftSection={<IconEdit size={14} />}>Chỉnh sửa</Menu.Item>
                        <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={() => setCancelModalRecord(r)}>Xóa</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
          <Group justify="space-between" align="center">
            <Text fz="sm" c="dimmed">Hiển thị 1 tới {processedRecords.length} của {records.length} kết quả</Text>
            <Pagination total={1} value={1} size="sm" radius="sm" color="blue" />
          </Group>
        </Box>
      </Card>

      {/* Add Leave Modal */}
      <Modal 
        opened={addModalOpened} 
        onClose={() => setAddModalOpened(false)} 
        title={<Text fw={600} fz="lg">Tạo đơn nghỉ phép</Text>}
        centered
      >
        <form onSubmit={handleAddSubmit}>
          <Stack gap="md">
            <Select
              label="Loại phép"
              withAsterisk
              value={leaveType}
              onChange={(v) => v && setLeaveType(v)}
              data={["Phép năm", "Nghỉ ốm", "Nghỉ bù", "Thai sản", "Nghỉ không lương"]}
            />

            <Group grow>
              <TextInput type="date" label="Từ ngày" withAsterisk value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)} />
              <TextInput type="date" label="Đến ngày" withAsterisk value={endDate} onChange={(e) => setEndDate(e.currentTarget.value)} />
            </Group>

            <SegmentedControl
              value={timeMode}
              onChange={setTimeMode}
              data={[
                { label: 'Cả ngày', value: 'full' },
                { label: 'Buổi sáng', value: 'morning' },
                { label: 'Buổi chiều', value: 'afternoon' },
              ]}
            />

            <TextInput label="Số ngày" value={calculateTotalDays().toString()} readOnly variant="filled" />

            <Textarea label="Lý do" withAsterisk minRows={3} value={reason} onChange={(e) => setReason(e.currentTarget.value)} />

            <Button type="submit" color="blue" fullWidth mt="md">Gửi yêu cầu</Button>
          </Stack>
        </form>
      </Modal>

      {/* Delete/Cancel Leave Modal */}
      <Modal 
        opened={!!cancelModalRecord} 
        onClose={() => setCancelModalRecord(null)} 
        title={<Text fw={600} fz="lg" c="red">Xóa đơn nghỉ phép</Text>}
        centered
      >
        <Text mb="xl">Bạn có chắc chắn muốn xóa đơn xin nghỉ phép này không?</Text>
        <Group grow>
          <Button variant="default" onClick={() => setCancelModalRecord(null)}>Hủy bỏ</Button>
          <Button color="red" onClick={() => {
             setRecords(records.filter(r => r.id !== cancelModalRecord?.id));
             setCancelModalRecord(null);
          }}>Xóa đơn</Button>
        </Group>
      </Modal>
    </Box>
  );
}
