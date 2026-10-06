import React, { useState } from "react";
import {
  Box, Group, Text, Card, Grid, Table, ScrollArea, Avatar, TextInput, Select, Title, Badge, Pagination, ActionIcon, Menu
} from "@mantine/core";
import { IconSearch, IconCheck, IconX, IconClock, IconChevronUp, IconChevronDown, IconSelector, IconDotsVertical, IconEye } from "@tabler/icons-react";
import { StatusBadge } from "../components/UI";

interface LeaveRequest {
  id: string;
  name: string;
  role: string;
  avatar: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: string;
  reason: string;
  status: "Approved" | "Declined" | "New";
}

const INITIAL_REQUESTS: LeaveRequest[] = [
  { id: "1", name: "Nguyễn Văn An", role: "Nhân viên Thiết kế", avatar: "NA", type: "Nghỉ ốm", fromDate: "27/02/2026", toDate: "27/02/2026", days: "1 ngày", reason: "Đi khám bệnh", status: "Approved" },
  { id: "2", name: "Trần Thị Bích", role: "Lập trình viên", avatar: "TB", type: "Nghỉ ốm dài ngày", fromDate: "15/01/2026", toDate: "25/01/2026", days: "10 ngày", reason: "Nằm viện", status: "Approved" },
  { id: "3", name: "Lê Hoàng Cường", role: "Lập trình viên", avatar: "LC", type: "Thai sản", fromDate: "05/01/2026", toDate: "15/01/2026", days: "10 ngày", reason: "Nghỉ thai sản", status: "Approved" },
  { id: "4", name: "Phạm Thu Dung", role: "Lập trình viên", avatar: "PD", type: "Việc riêng", fromDate: "10/01/2026", toDate: "11/01/2026", days: "2 ngày", reason: "Việc gia đình", status: "Approved" },
  { id: "5", name: "Hoàng Đức Duy", role: "Nhân viên Thiết kế", avatar: "HD", type: "Việc riêng", fromDate: "09/01/2026", toDate: "10/01/2026", days: "2 ngày", reason: "Việc gia đình", status: "Approved" },
  { id: "6", name: "Đỗ Mai Phương", role: "Lập trình viên Mobile", avatar: "DP", type: "Nghỉ không lương", fromDate: "24/02/2026", toDate: "25/02/2026", days: "2 ngày", reason: "Việc cá nhân", status: "Approved" },
  { id: "7", name: "Vũ Minh Quân", role: "Lập trình viên", avatar: "VQ", type: "Việc riêng", fromDate: "13/01/2026", toDate: "14/01/2026", days: "2 ngày", reason: "Đi khám bệnh", status: "Declined" },
  { id: "8", name: "Đặng Ngọc Hoa", role: "Lập trình viên iOS", avatar: "DH", type: "Nghỉ chăm vợ đẻ", fromDate: "13/02/2026", toDate: "17/02/2026", days: "5 ngày", reason: "Chăm vợ sinh", status: "Declined" },
  { id: "9", name: "Bùi Tiến Đạt", role: "Lập trình viên", avatar: "BD", type: "Việc riêng", fromDate: "08/03/2026", toDate: "09/03/2026", days: "2 ngày", reason: "Việc gia đình", status: "New" },
  { id: "10", name: "Ngô Thanh Kiều", role: "Lập trình viên", avatar: "NK", type: "Việc riêng", fromDate: "30/01/2026", toDate: "31/01/2026", days: "2 ngày", reason: "Khám sức khỏe", status: "New" },
];

export default function LeaveApprovalPage() {
  const [requests] = useState<LeaveRequest[]>(INITIAL_REQUESTS);
  const [searchName, setSearchName] = useState("");
  const [leaveType, setLeaveType] = useState("all");
  const [leaveStatus, setLeaveStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof LeaveRequest | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof LeaveRequest) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  let processedRequests = requests.filter(req => {
    const matchName = req.name.toLowerCase().includes(searchName.toLowerCase());
    const matchType = leaveType === "all" || req.type === leaveType;
    const matchStatus = leaveStatus === "all" || req.status === leaveStatus;
    return matchName && matchType && matchStatus;
  });

  if (sortConfig.key) {
    processedRequests.sort((a, b) => {
      let aValue = a[sortConfig.key!];
      let bValue = b[sortConfig.key!];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const Th = ({ children, columnKey }: { children: React.ReactNode, columnKey: keyof LeaveRequest }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = isSorted && sortConfig.direction === 'asc';
    const isDesc = isSorted && sortConfig.direction === 'desc';
    return (
      <Table.Th>
        <Group justify="space-between" align="center" style={{ cursor: 'pointer' }} onClick={() => handleSort(columnKey)} wrap="nowrap">
          <Text fw={700} fz="sm" c="dark.9">{children}</Text>
          <Group gap={0}>
            {isAsc ? <IconChevronUp size={14} color="var(--mantine-color-blue-6)" /> : isDesc ? <IconChevronDown size={14} color="var(--mantine-color-blue-6)" /> : <IconSelector size={14} color="gray" opacity={0.5} />}
          </Group>
        </Group>
      </Table.Th>
    )
  }

  const renderStatusBadge = (status: string) => {
    let statusText = status;
    if (status === "Approved") statusText = "Đã duyệt";
    if (status === "Declined") statusText = "Từ chối";
    if (status === "New") statusText = "Chờ duyệt";
    return <StatusBadge status={status} statusText={statusText} />;
  };

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={700} c="dark.9">Phê duyệt nghỉ phép</Title>
        </Box>
      </Group>

      {/* Summary Cards */}
      <Grid mb="xl">
        {[
          { label: "ĐI LÀM HÔM NAY", value: "12 / 60", sub: "" },
          { label: "NGHỈ CÓ KẾ HOẠCH", value: "8", sub: "Hôm nay" },
          { label: "NGHỈ ĐỘT XUẤT", value: "0", sub: "Hôm nay" },
          { label: "ĐƠN CHỜ DUYỆT", value: "12", sub: "" }
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
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

      {/* Table Section */}
      <Card withBorder radius="lg" p={0} shadow="sm">
        {/* Filters */}
        <Box p="md" className="filter-section">
          <Group justify="flex-start" wrap="wrap" gap="sm">
            <TextInput
              placeholder="Tên nhân viên..."
              leftSection={<IconSearch size={14} />}
              size="sm"
              radius="md"
              w={{ base: "100%", sm: 200 }}
              value={searchName}
              onChange={(e) => setSearchName(e.currentTarget.value)}
            />
            <Select
              placeholder="Tất cả loại nghỉ"
              size="sm"
              radius="md"
              w={180}
              data={[
                { value: "all", label: "Tất cả loại nghỉ" },
                { value: "Medical Leave", label: "Nghỉ ốm" },
                { value: "Casual Leave", label: "Việc riêng" },
                { value: "Maternity Leave", label: "Thai sản" },
                { value: "Paternity Leave", label: "Nghỉ chăm vợ đẻ" },
                { value: "LOP", label: "Nghỉ không lương" },
              ]}
              value={leaveType}
              onChange={(v) => v && setLeaveType(v)}
              allowDeselect={false}
            />
            <Select
              placeholder="Tất cả trạng thái"
              size="sm"
              radius="md"
              w={180}
              data={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "Approved", label: "Đã duyệt" },
                { value: "Declined", label: "Từ chối" },
                { value: "New", label: "Chờ duyệt" },
              ]}
              value={leaveStatus}
              onChange={(v) => v && setLeaveStatus(v)}
              allowDeselect={false}
            />
            <TextInput
              placeholder="Từ ngày"
              size="sm"
              radius="md"
              type="date"
              w={140}
            />
            <TextInput
              placeholder="Đến ngày"
              size="sm"
              radius="md"
              type="date"
              w={140}
            />
          </Group>
        </Box>

        <ScrollArea>
          <Table className="ohriise-table" verticalSpacing="md" horizontalSpacing="md" highlightOnHover striped={false}>
            <Table.Thead>
              <Table.Tr bg="transparent">
                <Th columnKey="name">Nhân viên</Th>
                <Th columnKey="type">Loại nghỉ phép</Th>
                <Th columnKey="fromDate">Từ ngày</Th>
                <Th columnKey="toDate">Đến ngày</Th>
                <Th columnKey="days">Số ngày</Th>
                <Th columnKey="reason">Lý do</Th>
                <Th columnKey="status">Trạng thái</Th>
                <Table.Th style={{ textAlign: "right" }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {processedRequests.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={7} ta="center" py="xl">
                    <Text c="dimmed">Không tìm thấy kết quả nào</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                processedRequests.map(req => (
                  <Table.Tr key={req.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="md" radius="xl" color="blue">{req.avatar}</Avatar>
                        <Box>
                          <Text fw={600} fz="sm" c="dark.9">{req.name}</Text>
                          <Text fz="xs" c="dimmed">{req.role}</Text>
                        </Box>
                      </Group>
                    </Table.Td>
                    <Table.Td><Text fz="sm" fw={500}>{req.type}</Text></Table.Td>
                    <Table.Td><Text fz="sm">{req.fromDate}</Text></Table.Td>
                    <Table.Td><Text fz="sm">{req.toDate}</Text></Table.Td>
                    <Table.Td><Text fz="sm">{req.days}</Text></Table.Td>
                    <Table.Td><Text fz="sm">{req.reason}</Text></Table.Td>
                    <Table.Td>
                      {renderStatusBadge(req.status)}
                    </Table.Td>
                    <Table.Td ta="right">
                      <Menu position="bottom-end" withinPortal shadow="sm" radius="md">
                        <Menu.Target>
                          <ActionIcon variant="transparent" color="gray">
                            <IconDotsVertical size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconCheck size={14} color="var(--mantine-color-green-6)" />}>Duyệt đơn</Menu.Item>
                          <Menu.Item leftSection={<IconX size={14} color="var(--mantine-color-red-6)" />}>Từ chối</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconEye size={14} />}>Xem chi tiết</Menu.Item>
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
          <Group justify="space-between" align="center">
            <Text fz="sm" c="dimmed">Hiển thị 1 tới {processedRequests.length} của {processedRequests.length} kết quả</Text>
            <Pagination total={1} value={1} size="sm" radius="sm" color="blue" />
          </Group>
        </Box>
      </Card>
    </Box>
  );
}
