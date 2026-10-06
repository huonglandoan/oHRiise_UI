import React, { useState } from "react";
import {
  Box, Group, Text, Card, Grid, Table, ScrollArea, Avatar, TextInput, Select, Title, Pagination, ActionIcon, Menu
} from "@mantine/core";
import { IconSearch, IconCheck, IconX, IconChevronUp, IconChevronDown, IconSelector, IconDotsVertical, IconEye } from "@tabler/icons-react";
import { StatusBadge } from "../components/UI";

interface WfhRequest {
  id: string;
  wfhId: string;
  name: string;
  role: string;
  avatar: string;
  date: string;
  timeSlot: string;
  project: string;
  reason: string;
  status: "Approved" | "Declined" | "New";
}

const INITIAL_REQUESTS: WfhRequest[] = [
  { id: "1", wfhId: "WFH-0930", name: "Nguyễn Văn An", role: "Nhân viên Thiết kế", avatar: "NA", date: "30/09/2026", timeSlot: "Buổi sáng (08:30 - 12:00)", project: "Design System v2", reason: "Làm tài liệu system", status: "New" },
  { id: "2", wfhId: "WFH-0929", name: "Trần Thị Bích", role: "Lập trình viên", avatar: "TB", date: "29/09/2026", timeSlot: "Cả ngày (08:30 - 17:35)", project: "HRMS Portal", reason: "Tập trung code API", status: "New" },
  { id: "3", wfhId: "WFH-0925", name: "Lê Hoàng Cường", role: "Lập trình viên", avatar: "LC", date: "25/09/2026", timeSlot: "Cả ngày (08:30 - 17:35)", project: "App Mobile", reason: "Test feature mới", status: "Approved" },
  { id: "4", wfhId: "WFH-0920", name: "Phạm Thu Dung", role: "Lập trình viên Mobile", avatar: "PD", date: "20/09/2026", timeSlot: "Buổi chiều (13:00 - 17:35)", project: "UX Research", reason: "Phân tích dữ liệu", status: "Declined" },
];

export default function WfhApprovalPage() {
  const [requests] = useState<WfhRequest[]>(INITIAL_REQUESTS);
  const [searchName, setSearchName] = useState("");
  const [wfhStatus, setWfhStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof WfhRequest | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof WfhRequest) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  let processedRequests = requests.filter(req => {
    const matchName = req.name.toLowerCase().includes(searchName.toLowerCase()) || req.wfhId.toLowerCase().includes(searchName.toLowerCase());
    const matchStatus = wfhStatus === "all" || req.status === wfhStatus;
    return matchName && matchStatus;
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

  const Th = ({ children, columnKey }: { children: React.ReactNode, columnKey: keyof WfhRequest }) => {
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
          <Title order={2} fw={700} c="dark.9">Phê duyệt Làm việc từ xa</Title>
        </Box>
      </Group>

      {/* Summary Cards */}
      <Grid mb="xl">
        {[
          { label: "ĐANG WFH HÔM NAY", value: "5", sub: "Nhân sự" },
          { label: "ĐĂNG KÝ WFH MỚI", value: "2", sub: "Hôm nay" },
          { label: "ĐƠN WFH CHỜ DUYỆT", value: "12", sub: "" }
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
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
              placeholder="Tên nhân viên, mã đơn..."
              leftSection={<IconSearch size={14} />}
              size="sm"
              radius="md"
              w={{ base: "100%", sm: 200 }}
              value={searchName}
              onChange={(e) => setSearchName(e.currentTarget.value)}
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
              value={wfhStatus}
              onChange={(v) => v && setWfhStatus(v)}
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
                <Th columnKey="wfhId">Mã đơn</Th>
                <Th columnKey="date">Ngày WFH</Th>
                <Th columnKey="timeSlot">Khung giờ</Th>
                <Th columnKey="project">Dự án</Th>
                <Th columnKey="reason">Lý do</Th>
                <Th columnKey="status">Trạng thái</Th>
                <Table.Th style={{ textAlign: "right" }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {processedRequests.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={8} ta="center" py="xl">
                    <Text c="dimmed">Không tìm thấy kết quả nào</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                processedRequests.map(req => (
                  <Table.Tr key={req.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="md" radius="xl" color="teal">{req.avatar}</Avatar>
                        <Box>
                          <Text fw={600} fz="sm" c="dark.9">{req.name}</Text>
                          <Text fz="xs" c="dimmed">{req.role}</Text>
                        </Box>
                      </Group>
                    </Table.Td>
                    <Table.Td><Text fw={700} c="dark.9">{req.wfhId}</Text></Table.Td>
                    <Table.Td><Text fz="sm" fw={500}>{req.date}</Text></Table.Td>
                    <Table.Td><Text fz="sm">{req.timeSlot}</Text></Table.Td>
                    <Table.Td><Text fz="sm" fw={600}>{req.project}</Text></Table.Td>
                    <Table.Td><Text fz="sm" c="dimmed">{req.reason}</Text></Table.Td>
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
