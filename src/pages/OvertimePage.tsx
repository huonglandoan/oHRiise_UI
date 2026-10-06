import React, { useState } from "react";
import { StatusBadge } from "../components/UI";
import {
  Box, Group, Text, Title, Card, Grid,
  Select, TextInput, Textarea, Button, Table, Badge, Modal, ScrollArea,
  Menu, ActionIcon, Pagination
} from "@mantine/core";
import { IconPlus, IconDotsVertical, IconTrash, IconEdit, IconChevronUp, IconChevronDown, IconSelector, IconSearch } from "@tabler/icons-react";

export interface OTRecord {
  id: string;
  name: string;
  avatar?: string;
  otDate: string;
  otHours: number;
  otType: string;
  description: string;
  status: "new" | "approved" | "declined";
  statusText: string;
}

const INITIAL_OT_RECORDS: OTRecord[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    otDate: "08/03/2026",
    otHours: 2,
    otType: "OT Ngày thường 1.5x",
    description: "Xử lý lỗi gấp hệ thống",
    status: "new",
    statusText: "Chờ duyệt",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    otDate: "10/03/2026",
    otHours: 4,
    otType: "OT Cuối tuần 2.0x",
    description: "Hỗ trợ release dự án",
    status: "approved",
    statusText: "Đã duyệt",
  }
];

export default function OvertimePage() {
  const [records, setRecords] = useState<OTRecord[]>(INITIAL_OT_RECORDS);
  const [addModalOpened, setAddModalOpened] = useState(false);

  // Form states
  const [otDate, setOtDate] = useState("");
  const [otType, setOtType] = useState("OT Ngày thường (Hệ số 150%)");
  const [otStart, setOtStart] = useState("");
  const [otEnd, setOtEnd] = useState("");
  const [otProject, setOtProject] = useState("");
  const [otDetail, setOtDetail] = useState("");

  // Filter & Sort States
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>("all");
  const [filterStatus, setFilterStatus] = useState<string | null>("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof OTRecord | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: OTRecord = {
      id: `${records.length + 1}`,
      name: "Nguyễn Văn A", // current user
      otDate: otDate || "Hôm nay",
      otHours: 2.5, // Mocked for simplicity
      otType,
      description: otProject || otDetail || "Tăng ca dự án",
      status: "new",
      statusText: "Chờ duyệt",
    };
    setRecords([newRecord, ...records]);
    setAddModalOpened(false);
  };

  const handleSort = (key: keyof OTRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  let processedRecords = records.filter(r => {
    const matchSearch = !search ||
      r.otType.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.otDate.includes(search);
    const matchType = filterType === "all" || r.otType === filterType;
    const matchStatus = filterStatus === "all" || r.statusText === filterStatus;
    return matchSearch && matchType && matchStatus;
  });
  if (sortConfig.key) {
    processedRecords.sort((a, b) => {
      let aValue = a[sortConfig.key!];
      let bValue = b[sortConfig.key!];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }


  const Th = ({ children, columnKey }: { children: React.ReactNode, columnKey: keyof OTRecord }) => {
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
    );
  };

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={2} fw={600}>Tăng ca</Title>
        <Button color="blue" radius="xl" leftSection={<IconPlus size={16} />} onClick={() => setAddModalOpened(true)}>
          Đăng ký OT
        </Button>
      </Group>

      <Grid mb="xl">
        {[
          { label: "Tổng giờ OT", value: "12", sub: "tháng này" },
          { label: "Đơn đã duyệt", value: "3", sub: "tháng này" },
          { label: "Đơn chờ duyệt", value: "1", sub: "" },
          { label: "Đơn bị từ chối", value: "0", sub: "" }
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={index}>
            <Card withBorder radius="lg" padding="lg" ta="center">
              <Text fw={700} fz="sm" c="dimmed" tt="uppercase" style={{ letterSpacing: "0.5px" }}>{item.label}</Text>
              <Group align="baseline" justify="center" gap="xs" mt="xs">
                <Text fw={500} fz={24} c="dark.9">{item.value}</Text>
                {item.sub && <Text fz="xs" c="dimmed">{item.sub}</Text>}
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Card withBorder radius="lg" p={0} shadow="sm">
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <Group gap="xs" wrap="wrap">
            <TextInput
              placeholder="Tìm kiếm đơn OT..."
              leftSection={<IconSearch size={15} />}
              size="xs"
              w={200}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
              size="xs" w={200}
              data={[{ value: "all", label: "Tất cả loại OT" }, "OT Ngày thường 1.5x", "OT Cuối tuần 2.0x", "OT Ngày lễ 3.0x"]}
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
          <Table verticalSpacing="md" horizontalSpacing="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr bg="gray.0">
                <Th columnKey="otDate">Ngày OT</Th>
                <Th columnKey="otHours">Số giờ</Th>
                <Th columnKey="otType">Loại OT</Th>
                <Th columnKey="description">Chi tiết</Th>
                <Th columnKey="statusText">Trạng thái</Th>
                <Table.Th fw={600} fz="sm" ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {processedRecords.map((r) => (
                <Table.Tr key={r.id}>
                  <Table.Td>{r.otDate}</Table.Td>
                  <Table.Td>{r.otHours}</Table.Td>
                  <Table.Td>{r.otType}</Table.Td>
                  <Table.Td>{r.description}</Table.Td>
                  <Table.Td>{<StatusBadge status={r.status} statusText={r.statusText} />}</Table.Td>
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
            <Text fz="sm" c="dimmed">Hiển thị 1 đến {processedRecords.length} của {processedRecords.length} kết quả</Text>
            <Pagination total={1} value={1} size="sm" color="blue" />
          </Group>
        </Box>
      </Card>

      <Modal opened={addModalOpened} onClose={() => setAddModalOpened(false)} title={<Text fw={700}>Đăng ký Tăng ca (OT)</Text>} size="lg">
        <form onSubmit={handleAddSubmit}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}><TextInput type="date" label="Ngày đăng ký tăng ca" withAsterisk value={otDate} onChange={e => setOtDate(e.currentTarget.value)} /></Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}><Select label="Loại hình tăng ca" withAsterisk data={["OT Ngày thường (Hệ số 150%)", "OT Cuối tuần (Hệ số 200%)", "OT Ngày lễ (Hệ số 300%)"]} value={otType} onChange={(v) => v && setOtType(v)} allowDeselect={false} /></Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}><TextInput label="Giờ bắt đầu OT" withAsterisk value={otStart} onChange={e => setOtStart(e.currentTarget.value)} /></Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}><TextInput label="Giờ kết thúc OT" withAsterisk value={otEnd} onChange={e => setOtEnd(e.currentTarget.value)} /></Grid.Col>
            <Grid.Col span={12}><TextInput label="Tên dự án / Công việc OT" withAsterisk value={otProject} onChange={e => setOtProject(e.currentTarget.value)} /></Grid.Col>
            <Grid.Col span={12}><Textarea label="Nội dung công việc chi tiết trong ca OT" minRows={3} value={otDetail} onChange={e => setOtDetail(e.currentTarget.value)} /></Grid.Col>
            <Grid.Col span={12}>
              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={() => setAddModalOpened(false)}>Hủy</Button>
                <Button type="submit" color="blue">Nộp đơn</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </Box>
  );
}
