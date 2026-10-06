import React, { useState } from "react";
import {
  Box, Group, Text, Card, Grid, Table, Modal, ScrollArea,
  Menu, ActionIcon, Pagination, Button, Badge, Avatar, Tooltip,
  TextInput, Select, Textarea, Title
} from "@mantine/core";
import {
  IconSearch, IconPlus, IconDotsVertical, IconEye,
  IconAlertCircle, IconChevronUp, IconChevronDown, IconSelector, IconCheck,
  IconClock, IconX, IconTool
} from "@tabler/icons-react";
import { StatusBadge } from "../components/UI";

export interface DeviceItem {
  id: string;
  code: string;
  name: string;
  fullName: string;
  category: string;
  issuedDate: string;
  serialNumber: string;
  status: "active" | "maintenance" | "replaced";
  statusText: string;
  condition: string;
  value: string;
  warrantyUntil: string;
  notes: string;
  managerName: string;
  managerAvatar: string;
}

const INITIAL_DEVICES: DeviceItem[] = [
  {
    id: "d1",
    code: "#EQ-2024-089",
    name: 'MacBook Pro 16"',
    fullName: 'MacBook Pro 16" M3 Max (36GB RAM / 1TB SSD) - Space Black',
    category: "Laptop",
    issuedDate: "15/04/2024",
    serialNumber: "C02GX088Q05N",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% nguyên seal bàn giao kèm Sạc Magsafe 140W",
    value: "68.500.000 đ",
    warrantyUntil: "14/04/2027 (AppleCare+)",
    notes: "Thiết bị chính dùng thiết kế UI/UX & render đồ họa.",
    managerName: "Nguyễn Văn A",
    managerAvatar: "NV"
  },
  {
    id: "d2",
    code: "#EQ-2024-090",
    name: 'Màn hình Dell 27" 4K',
    fullName: 'Màn hình hiển thị Dell UltraSharp 27" 4K USB-C (U2723QE)',
    category: "Màn hình",
    issuedDate: "20/04/2024",
    serialNumber: "CN-0TY789-74445",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% bàn giao kèm cáp Type-C & cáp nguồn",
    value: "11.200.000 đ",
    warrantyUntil: "19/04/2027 (Bảo hành 3 năm Dell)",
    notes: "Màn hình đồ họa chuẩn màu 98% DCI-P3 đặt tại bàn làm việc công ty.",
    managerName: "Nguyễn Văn A",
    managerAvatar: "NV"
  },
  {
    id: "d3",
    code: "#EQ-2024-112",
    name: "Tai nghe Sony WH-1000XM5",
    fullName: "Tai nghe không dây chống ồn Sony WH-1000XM5 Black",
    category: "Âm thanh",
    issuedDate: "05/05/2024",
    serialNumber: "SN-8823192003",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% kèm hộp đựng và cáp sạc USB-C",
    value: "6.800.000 đ",
    warrantyUntil: "04/05/2025 (Bảo hành 1 năm)",
    notes: "Trang bị tập trung công việc và họp trực tuyến từ xa WFH.",
    managerName: "Nguyễn Văn B",
    managerAvatar: "NV"
  },
  {
    id: "d4",
    code: "#EQ-2024-150",
    name: "Bàn phím Keychron & Chuột Master 3S",
    fullName: "Bộ bàn phím cơ Keychron K2 Pro & Chuột Logitech MX Master 3S",
    category: "Phụ kiện",
    issuedDate: "01/09/2024",
    serialNumber: "SN-998811234",
    status: "active",
    statusText: "Đang sử dụng",
    condition: "Mới 100% bàn giao kèm cáp sạc",
    value: "3.500.000 đ",
    warrantyUntil: "31/08/2025",
    notes: "Bộ chuột phím thái công học chuyên dùng thiết kế.",
    managerName: "Nguyễn Văn B",
    managerAvatar: "NV"
  },
];

export default function DevicesPage() {
  const [devices] = useState<DeviceItem[]>(INITIAL_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null);
  const [reportModalDevice, setReportModalDevice] = useState<DeviceItem | null>(null);
  const [reportIssueText, setReportIssueText] = useState("");
  const [isRequestNewOpen, setIsRequestNewOpen] = useState(false);
  const [newRequestType, setNewRequestType] = useState("Thay thế thiết bị hỏng");
  const [newRequestNote, setNewRequestNote] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [sortConfig, setSortConfig] = useState<{ key: keyof DeviceItem | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof DeviceItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  let processedRecords = [...devices].filter(d => {
    const matchSearch = d.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    const matchCategory = categoryFilter === "all" || d.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
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

  const handleReportIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportIssueText.trim()) {
      alert("Vui lòng mô tả tình trạng hỏng hóc hoặc sự cố của thiết bị.");
      return;
    }
    alert(
      `Đã gửi yêu cầu hỗ trợ IT / Bảo hành cho thiết bị ${reportModalDevice?.code} (${reportModalDevice?.name}) thành công!\n\nBộ phận IT Helpdesk sẽ liên hệ xử lý trong vòng 24h.`
    );
    setReportModalDevice(null);
    setReportIssueText("");
  };

  const handleNewRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestNote.trim()) {
      alert("Vui lòng nhập lý do đề xuất cấp mới / đổi thiết bị.");
      return;
    }
    alert("Đã gửi đề xuất cấp bổ sung / đổi mới thiết bị tới Trưởng phòng HR & IT thành công!");
    setIsRequestNewOpen(false);
    setNewRequestNote("");
  };

  const total = devices.length;
  const active = devices.filter(d => d.status === "active").length;
  const maintenance = devices.filter(d => d.status === "maintenance").length;
  const replaced = devices.filter(d => d.status === "replaced").length;

  const Th = ({ children, columnKey }: { children: React.ReactNode, columnKey: keyof DeviceItem }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = isSorted && sortConfig.direction === 'asc';
    const isDesc = isSorted && sortConfig.direction === 'desc';

    return (
      <Table.Th style={{ padding: "12px 16px" }}>
        <Group justify="space-between" align="center" wrap="nowrap" style={{ cursor: "pointer" }} onClick={() => handleSort(columnKey)}>
          <Text fw={700} fz="sm" c="dark.9">{children}</Text>
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
    )
  }

  const renderStatusBadge = (status: string, statusText: string) => {
    return <StatusBadge status={status} statusText={statusText} />;
  }

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={700} c="dark.9">Thiết bị</Title>
        </Box>
        <Button color="blue" radius="xl" leftSection={<IconPlus size={16} />} onClick={() => setIsRequestNewOpen(true)}>
          Đề xuất thiết bị
        </Button>
      </Group>

      {/* Summary Cards */}
      <Grid mb="xl">
        {[
          { label: "TỔNG SỐ", value: total },
          { label: "ĐANG SỬ DỤNG", value: active },
          { label: "ĐANG BẢO HÀNH", value: maintenance },
          { label: "ĐÃ THU HỒI", value: replaced }
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card withBorder radius="lg" padding="lg" ta="center">
              <Text fw={700} fz="sm" c="dimmed" tt="uppercase" style={{ letterSpacing: "0.5px" }}>{item.label}</Text>
              <Group justify="center" align="baseline" gap={4} mt="xs">
                <Text fw={700} fz={24} c="dark.9">{item.value}</Text>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Table Section */}
      <Card withBorder radius="lg" p={0} shadow="sm">
        {/* Bộ lọc */}
        <Box p="md" className="filter-section">
          <Group justify="flex-start" wrap="wrap" gap="sm">
            <TextInput
              placeholder="Tìm kiếm thiết bị..."
              leftSection={<IconSearch size={14} />}
              size="sm"
              radius="md"
              w={{ base: "100%", sm: 260 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <Select
              placeholder="Tất cả loại"
              size="sm"
              radius="md"
              w={180}
              data={[
                { value: "all", label: "Tất cả loại" },
                { value: "Laptop", label: "Laptop" },
                { value: "Màn hình", label: "Màn hình" },
                { value: "Âm thanh", label: "Âm thanh" },
                { value: "Phụ kiện", label: "Phụ kiện" },
              ]}
              value={categoryFilter}
              onChange={(v) => v && setCategoryFilter(v)}
              allowDeselect={false}
            />
            <Select
              placeholder="Tất cả trạng thái"
              size="sm"
              radius="md"
              w={180}
              data={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "active", label: "Đang sử dụng" },
                { value: "maintenance", label: "Đang bảo hành" },
                { value: "replaced", label: "Đã thu hồi" },
              ]}
              value={statusFilter}
              onChange={(v) => v && setStatusFilter(v)}
              allowDeselect={false}
            />
          </Group>
        </Box>

        <ScrollArea>
          <Table className="ohriise-table" verticalSpacing="md" horizontalSpacing="md" highlightOnHover striped={false}>
            <Table.Thead>
              <Table.Tr bg="transparent">
                <Th columnKey="category">Loại thiết bị</Th>
                <Th columnKey="code">Mã thiết bị</Th>
                <Th columnKey="name">Tên thiết bị</Th>
                <Th columnKey="issuedDate">Ngày cấp</Th>
                <Th columnKey="statusText">Trạng thái</Th>
                <Th columnKey="managerName">Người quản lý</Th>
                <Table.Th style={{ textAlign: "right" }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {processedRecords.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={7} ta="center" py="xl">
                    <Text c="dimmed">Không tìm thấy kết quả nào</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                processedRecords.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td fw={700} fz="sm">{item.category}</Table.Td>
                    <Table.Td>
                      <Tooltip label="Nhấn để xem chi tiết" withArrow position="top-start">
                        <Text
                          component="button"
                          type="button"
                          fw={500}
                          c="dark.9"
                          fz="sm"
                          onClick={() => setSelectedDevice(item)}
                          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
                        >
                          {item.code}
                        </Text>
                      </Tooltip>
                    </Table.Td>
                    <Table.Td fz="sm">{item.name}</Table.Td>
                    <Table.Td fz="sm">{item.issuedDate}</Table.Td>
                    <Table.Td>
                      {renderStatusBadge(item.status, item.statusText)}
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Avatar size="sm" color="teal" radius="xl">{item.managerAvatar}</Avatar>
                        <Text fw={700} fz="sm" c="dark.9">{item.managerName}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Menu position="bottom-end" withinPortal shadow="sm" radius="md">
                        <Menu.Target>
                          <ActionIcon variant="transparent" color="gray">
                            <IconDotsVertical size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconEye size={14} />} onClick={() => setSelectedDevice(item)}>Chi tiết</Menu.Item>
                          <Menu.Item leftSection={<IconAlertCircle size={14} />} color="red" onClick={() => setReportModalDevice(item)}>Báo hỏng / IT</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                )))}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        <Box p="md">
          <Group justify="space-between" align="center">
            <Text fz="sm" c="dimmed">Hiển thị 1 tới {processedRecords.length} của {processedRecords.length} kết quả</Text>
            <Pagination total={1} value={1} size="sm" radius="sm" color="blue" />
          </Group>
        </Box>
      </Card>

      {/* DETAIL MODAL */}
      {selectedDevice && (
        <Modal
          opened={!!selectedDevice}
          onClose={() => setSelectedDevice(null)}
          title={<Text fw={700} fz="lg">Chi tiết thiết bị</Text>}
          size="lg"
          radius="md"
        >
          <Box mb="md">
            <Badge color="blue" variant="light" mb="xs">SỔ TÀI SẢN: {selectedDevice.code}</Badge>
            <Title order={3}>{selectedDevice.name}</Title>
          </Box>

          <Card withBorder bg="blue.0" mb="md" p="md" radius="md">
            <Text fz="xs" fw={700} c="blue.8" tt="uppercase">Tên đầy đủ & cấu hình thiết bị</Text>
            <Text fz="md" fw={700} c="blue.9">{selectedDevice.fullName}</Text>
          </Card>

          <Grid mb="md">
            <Grid.Col span={6}>
              <Card withBorder bg="gray.0" radius="md" p="sm">
                <Text fz="xs" fw={700} c="dimmed">Loại thiết bị</Text>
                <Text fz="sm" fw={700}>{selectedDevice.category}</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card withBorder bg="gray.0" radius="md" p="sm">
                <Text fz="xs" fw={700} c="dimmed">Giá trị tài sản</Text>
                <Text fz="sm" fw={700} c="green.7">{selectedDevice.value}</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card withBorder bg="gray.0" radius="md" p="sm">
                <Text fz="xs" fw={700} c="dimmed">Ngày cấp</Text>
                <Text fz="sm" fw={700} c="blue.7">{selectedDevice.issuedDate}</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card withBorder bg="gray.0" radius="md" p="sm">
                <Text fz="xs" fw={700} c="dimmed">Số Serial Number</Text>
                <Text fz="sm" fw={700} ff="monospace">{selectedDevice.serialNumber}</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={12}>
              <Card withBorder bg="gray.0" radius="md" p="sm">
                <Text fz="xs" fw={700} c="dimmed">Hạn bảo hành</Text>
                <Text fz="sm" fw={700} c="green.8">{selectedDevice.warrantyUntil}</Text>
              </Card>
            </Grid.Col>
          </Grid>

          <Card withBorder bg="gray.0" mb="xl" p="md" radius="md">
            <Text fz="xs" fw={700} c="dimmed" mb={4} tt="uppercase">TÌNH TRẠNG KHI BÀN GIAO</Text>
            <Text fz="sm" fw={600} mb="sm">{selectedDevice.condition}</Text>
            <Box style={{ borderTop: "1px dashed var(--mantine-color-gray-4)", paddingTop: "8px" }}>
              <Text fz="xs"><Text span fw={700}>Mục đích sử dụng & Ghi chú:</Text> {selectedDevice.notes}</Text>
            </Box>
          </Card>

          <Group justify="flex-end">
            <Button variant="default" onClick={() => setSelectedDevice(null)}>Đóng</Button>
            <Button color="red" leftSection={<IconAlertCircle size={16} />} onClick={() => {
              setReportModalDevice(selectedDevice);
              setSelectedDevice(null);
            }}>
              Báo hỏng / Cần IT hỗ trợ
            </Button>
          </Group>
        </Modal>
      )}

      {/* REPORT ISSUE MODAL */}
      <Modal
        opened={!!reportModalDevice}
        onClose={() => setReportModalDevice(null)}
        title={<Text fw={700} fz="lg" c="red.7">Báo hỏng {reportModalDevice?.code}</Text>}
        size="md"
        radius="md"
      >
        <form onSubmit={handleReportIssueSubmit}>
          <Card withBorder bg="red.0" mb="md" p="sm" radius="md" style={{ borderColor: "var(--mantine-color-red-2)" }}>
            <Text fw={700} c="red.9">{reportModalDevice?.name}</Text>
            <Text fz="xs" c="red.8">Số Serial: {reportModalDevice?.serialNumber}</Text>
          </Card>

          <Textarea
            label={<Text fw={700} fz="sm">Mô tả tình trạng sự cố / hỏng hóc <Text span c="red">*</Text></Text>}
            placeholder="Ví dụ: Màn hình bị giật sọc, pin chai..."
            value={reportIssueText}
            onChange={(e) => setReportIssueText(e.currentTarget.value)}
            minRows={4}
            mb="xl"
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={() => setReportModalDevice(null)}>Hủy</Button>
            <Button type="submit" color="red">Gửi báo hỏng cho IT Helpdesk</Button>
          </Group>
        </form>
      </Modal>

      {/* REQUEST NEW MODAL */}
      <Modal
        opened={isRequestNewOpen}
        onClose={() => setIsRequestNewOpen(false)}
        title={<Text fw={700} fz="lg">Đề xuất bổ sung / Đổi thiết bị</Text>}
        size="md"
        radius="md"
      >
        <form onSubmit={handleNewRequestSubmit}>
          <Select
            label={<Text fw={700} fz="sm" mb={4}>Hình thức đề xuất</Text>}
            data={[
              { value: "Thay thế thiết bị hỏng", label: "Thay thế thiết bị hỏng / Cũ" },
              { value: "Cấp mới phục vụ dự án", label: "Cấp bổ sung thiết bị phục vụ dự án mới" },
              { value: "Nâng cấp cấu hình", label: "Nâng cấp cấu hình (RAM / SSD)" }
            ]}
            value={newRequestType}
            onChange={(v) => v && setNewRequestType(v)}
            allowDeselect={false}
            mb="md"
          />

          <Textarea
            label={<Text fw={700} fz="sm" mb={4}>Lý do đề xuất & Tên thiết bị mong muốn <Text span c="red">*</Text></Text>}
            placeholder="Ghi rõ lý do nhu cầu công việc và thiết bị cần trang bị..."
            value={newRequestNote}
            onChange={(e) => setNewRequestNote(e.currentTarget.value)}
            minRows={4}
            mb="xl"
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={() => setIsRequestNewOpen(false)}>Hủy</Button>
            <Button type="submit" color="blue" leftSection={<IconCheck size={16} />}>Gửi đề xuất tới HR & IT</Button>
          </Group>
        </form>
      </Modal>
    </Box>
  );
}
