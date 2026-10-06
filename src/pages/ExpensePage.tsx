import React, { useState } from "react";
import { StatusBadge, Icon } from "../components/UI";
import {
  Box, Stack, Group, Text, Title, Card, Grid,
  Select, TextInput, Textarea, Button, Table, Badge, Modal, ScrollArea,
  Menu, ActionIcon, Pagination, Breadcrumbs, Anchor, Tooltip
} from "@mantine/core";
import {
  IconPlus, IconDotsVertical, IconTrash, IconCheck, IconEdit,
  IconChevronUp, IconChevronDown, IconPaperclip, IconSearch, IconX,
  IconFileUpload, IconEye, IconSelector
} from "@tabler/icons-react";

export interface ExpenseRecord {
  id: string;
  category: string;
  title: string;
  amount: number;
  date: string;
  department: string;
  description: string;
  status: "pending" | "hr_review" | "paid" | "cancelled";
  statusText: string;
  attachment?: string;
}

const INITIAL_EXPENSE_RECORDS: ExpenseRecord[] = [
  {
    id: "#CP-2026-0922",
    category: "Phần mềm & công cụ",
    title: "Figma Professional · Tháng 9/2026",
    amount: 1850000,
    date: "22/09/2026",
    department: "Product & Design Team",
    description: "Gói bản quyền hàng tháng cho 3 nhân sự UI/UX Designer.",
    status: "pending",
    statusText: "Chờ duyệt",
    attachment: "Invoice_Figma_Sep2026.pdf",
  },
  {
    id: "#CP-2026-0910",
    category: "Chứng chỉ chuyên môn",
    title: "Google UX Design Certificate",
    amount: 1420000,
    date: "10/09/2026",
    department: "Product & Design Team",
    description: "Chi phí đăng ký khóa học nâng cao kỹ năng thiết kế sản phẩm.",
    status: "paid",
    statusText: "Đã thanh toán",
    attachment: "Coursera_Receipt_GoogleUX.pdf",
  },
  {
    id: "#CP-2026-0904",
    category: "Team bonding",
    title: "Bữa trưa gắn kết Product Team",
    amount: 1200000,
    date: "04/09/2026",
    department: "Product & Design Team",
    description: "Tiệc gắn kết nội bộ hàng tháng theo ngân sách phòng ban.",
    status: "hr_review",
    statusText: "Đang xử lý",
    attachment: "HoaDon_Manwah_0409.jpg",
  },
  {
    id: "#CP-2026-0901",
    category: "Thiết bị làm việc",
    title: "Bàn phím không dây Bluetooth Keychron K2",
    amount: 350000,
    date: "01/09/2026",
    department: "Engineering",
    description: "Hỗ trợ 50% chi phí thiết bị ngoại vi cá nhân theo chính sách.",
    status: "paid",
    statusText: "Đã thanh toán",
    attachment: "Receipt_Keychron_Store.pdf",
  },
];

export default function ExpensePage({ open }: { open?: () => void }) {
  const [records, setRecords] = useState<ExpenseRecord[]>(INITIAL_EXPENSE_RECORDS);

  // Modals
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [viewDetailRecord, setViewDetailRecord] = useState<ExpenseRecord | null>(null);
  const [cancelModalRecord, setCancelModalRecord] = useState<ExpenseRecord | null>(null);

  // Add Form States
  const [category, setCategory] = useState("Phần mềm & công cụ");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("Product & Design Team");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  // Filters & Sort States
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>("all");
  const [filterStatus, setFilterStatus] = useState<string | null>("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof ExpenseRecord | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Vui lòng nhập tên khoản chi.");
      return;
    }
    const num = Number(amount.replace(/[^0-9]/g, ""));
    if (!num || num <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ.");
      return;
    }

    const formattedDate = date ? date.split("-").reverse().join("/") : "Hôm nay";
    const newRecord: ExpenseRecord = {
      id: `#CP-2026-10${Math.floor(Math.random() * 90 + 10)}`,
      category,
      title,
      amount: num,
      date: formattedDate,
      department,
      description: description || title,
      status: "pending",
      statusText: "Chờ duyệt",
      attachment: attachmentName || "ChungTu_DinhKem.pdf",
    };

    setRecords([newRecord, ...records]);
    setAddModalOpened(false);
    setTitle("");
    setAmount("");
    setDescription("");
    setDate("");
    setAttachmentName("");
  };

  const handleConfirmCancel = () => {
    if (!cancelModalRecord) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === cancelModalRecord.id
          ? { ...r, status: "cancelled", statusText: "Đã hủy" }
          : r
      )
    );
    setCancelModalRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSort = (key: keyof ExpenseRecord) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const Th = ({ children, columnKey }: { children: React.ReactNode; columnKey: keyof ExpenseRecord }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = isSorted && sortConfig.direction === "asc";
    const isDesc = isSorted && sortConfig.direction === "desc";
    return (
      <Table.Th>
        <Group justify="space-between" align="center" style={{ cursor: "pointer" }} onClick={() => handleSort(columnKey)} wrap="nowrap">
          <Text fw={600} fz="sm">{children}</Text>
          <Group gap={0}>
            {isAsc ? <IconChevronUp size={14} color="var(--mantine-color-blue-6)" /> : isDesc ? <IconChevronDown size={14} color="var(--mantine-color-blue-6)" /> : <IconSelector size={14} color="gray" opacity={0.5} />}
          </Group>
        </Group>
      </Table.Th>
    );
  };


  // Filtered records
  let processedRecords = records.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search);
    const matchCategory = filterCategory === "all" || !filterCategory || r.category === filterCategory;
    const matchStatus = filterStatus === "all" || !filterStatus || r.status === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  if (sortConfig.key) {
    processedRecords.sort((a, b) => {
      const aV = a[sortConfig.key!] ?? "";
      const bV = b[sortConfig.key!] ?? "";
      if (aV < bV) return sortConfig.direction === "asc" ? -1 : 1;
      if (aV > bV) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Summary Metrics
  const totalAmount = records.filter(r => r.status !== "cancelled").reduce((acc, c) => acc + c.amount, 0);
  const paidAmount = records.filter(r => r.status === "paid").reduce((acc, c) => acc + c.amount, 0);
  const pendingAmount = records.filter(r => r.status === "pending" || r.status === "hr_review").reduce((acc, c) => acc + c.amount, 0);
  const remainingBudget = 20000000 - totalAmount;

  const categories = Array.from(new Set(records.map(r => r.category)));

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={600} mb={4}>Chi phí</Title>
          <Breadcrumbs separator="/" fz="sm">
            <Anchor href="#" c="dimmed">Tổng quan</Anchor>
            <Text c="dimmed">Bồi hoàn chi phí</Text>
          </Breadcrumbs>
        </Box>
        <Button
          color="blue"
          radius="xl"
          leftSection={<IconPlus size={16} />}
          onClick={() => setAddModalOpened(true)}
        >
          Tạo yêu cầu chi phí
        </Button>
      </Group>

      {/* Summary Cards */}
      <Grid mb="xl">
        {[
          { label: "Tổng chi phí tháng 9", value: formatCurrency(totalAmount) },
          { label: "Đã thanh toán", value: formatCurrency(paidAmount) },
          { label: "Chờ duyệt & Xử lý", value: formatCurrency(pendingAmount) },
          { label: "Hạn mức còn lại", value: formatCurrency(remainingBudget > 0 ? remainingBudget : 0) },
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card withBorder radius="lg" padding="lg" ta="center">
              <Text fw={700} fz="sm" c="dimmed" tt="uppercase" style={{ letterSpacing: "0.5px" }}>{item.label}</Text>
              <Text fw={700} fz={22} mt="xs" c="dark.9">{item.value}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Table Section */}
      <Card withBorder radius="lg" p={0} shadow="sm">
        {/* Bộ lọc trên bảng */}
        <Box p="md" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
          <Group justify="space-between" wrap="wrap" gap="sm">
            <Group gap="xs" wrap="wrap">
              <TextInput
                placeholder="Tìm theo nội dung, mã yêu cầu..."
                leftSection={<IconSearch size={15} />}
                size="xs"
                w={220}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <Select
                placeholder="Danh mục"
                size="xs"
                w={160}
                data={[
                  { value: "all", label: "Tất cả danh mục" },
                  ...categories.map(c => ({ value: c, label: c }))
                ]}
                value={filterCategory}
                onChange={setFilterCategory}
                allowDeselect={false}
              />
              <Select
                placeholder="Trạng thái"
                size="xs"
                w={140}
                data={[
                  { value: "all", label: "Tất cả trạng thái" },
                  { value: "pending", label: "Chờ duyệt" },
                  { value: "hr_review", label: "Đang xử lý" },
                  { value: "paid", label: "Đã thanh toán" },
                  { value: "cancelled", label: "Đã hủy" },
                ]}
                value={filterStatus}
                onChange={setFilterStatus}
                allowDeselect={false}
              />
            </Group>
          </Group>
        </Box>

        <ScrollArea>
          <Table verticalSpacing="md" horizontalSpacing="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr bg="gray.0">
                <Th columnKey="id">Mã yêu cầu</Th>
                <Th columnKey="category">Danh mục</Th>
                <Th columnKey="title">Nội dung chi phí</Th>
                <Th columnKey="amount">Số tiền</Th>
                <Th columnKey="date">Ngày chi</Th>
                <Th columnKey="attachment">Chứng từ</Th>
                <Th columnKey="statusText">Trạng thái</Th>
                {/* Cột cuối không có tiêu đề, đúng format chuẩn */}
                <Table.Th fw={600} fz="sm" ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {processedRecords.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={8} ta="center" py="xl">
                    <Text c="dimmed">Không tìm thấy yêu cầu chi phí nào phù hợp</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                processedRecords.map((r) => (
                  <Table.Tr key={r.id}>
                    <Table.Td>
                      <Tooltip label="Nhấn để xem chi tiết" withArrow position="top-start">
                        <Anchor
                          component="button"
                          type="button"
                          fw={700}
                          c="dark"
                          fz="sm"
                          onClick={() => setViewDetailRecord(r)}
                          style={{ textDecoration: "none", cursor: "pointer" }}
                        >
                          {r.id}
                        </Anchor>
                      </Tooltip>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="gray" variant="light" size="sm">
                        {r.category}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={600} fz="sm">{r.title}</Text>
                      <Text fz="xs" c="dimmed" lineClamp={1}>{r.description}</Text>
                    </Table.Td>
                    <Table.Td fw={700} c="dark.9">
                      {formatCurrency(r.amount)}
                    </Table.Td>
                    <Table.Td>{r.date}</Table.Td>
                    <Table.Td>
                      {r.attachment ? (
                        <Badge
                          color="blue"
                          variant="light"
                          size="sm"
                          leftSection={<IconPaperclip size={11} />}
                          style={{ cursor: "pointer" }}
                          onClick={() => setViewDetailRecord(r)}
                        >
                          {r.attachment}
                        </Badge>
                      ) : (
                        <Text fz="xs" c="dimmed">—</Text>
                      )}
                    </Table.Td>
                    <Table.Td>{<StatusBadge status={r.status} statusText={r.statusText} />}</Table.Td>
                    <Table.Td ta="right">
                      <Menu position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDotsVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconEye size={14} />}
                            onClick={() => setViewDetailRecord(r)}
                          >
                            Xem chi tiết
                          </Menu.Item>
                          {r.status === "pending" && (
                            <Menu.Item
                              leftSection={<IconX size={14} />}
                              color="orange"
                              onClick={() => setCancelModalRecord(r)}
                            >
                              Hủy yêu cầu
                            </Menu.Item>
                          )}
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
                            onClick={() => handleDeleteRecord(r.id)}
                          >
                            Xóa
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        <Box p="md" style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}>
          <Group justify="space-between">
            <Text fz="sm" c="dimmed">
              Hiển thị 1 đến {processedRecords.length} của {records.length} kết quả
            </Text>
            <Pagination total={1} value={1} size="sm" color="blue" />
          </Group>
        </Box>
      </Card>

      {/* Modal Tạo Yêu Cầu Chi Phí */}
      <Modal
        opened={addModalOpened}
        onClose={() => setAddModalOpened(false)}
        title={<Text fw={600} fz="lg">Tạo yêu cầu chi phí</Text>}
        size="lg"
        radius="md"
      >
        <form onSubmit={handleAddSubmit}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Danh mục chi phí"
                withAsterisk
                data={[
                  "Phần mềm & công cụ",
                  "Chứng chỉ chuyên môn",
                  "Team bonding",
                  "Thiết bị làm việc",
                  "Công tác phí",
                  "Chi phí khác"
                ]}
                value={category}
                onChange={(v) => v && setCategory(v)}
                allowDeselect={false}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Phòng ban / Dự án"
                value={department}
                onChange={(e) => setDepartment(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Nội dung khoản chi"
                withAsterisk
                placeholder="VD: Bản quyền phần mềm Figma tháng 9/2026..."
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Số tiền (VND)"
                withAsterisk
                placeholder="VD: 1,850,000"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                type="date"
                label="Ngày chi"
                withAsterisk
                value={date}
                onChange={(e) => setDate(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Mục đích & Lý do chi tiết"
                minRows={3}
                placeholder="Mô tả cụ thể mục đích sử dụng khoản chi cho công việc..."
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text fw={500} fz="sm" mb={4}>Hóa đơn / Chứng từ bồi hoàn</Text>
              <Card
                withBorder
                style={{ borderStyle: "dashed", cursor: "pointer" }}
                p="md"
                ta="center"
                bg="gray.0"
                onClick={() => setAttachmentName("HoaDon_DienTu_ChungTu.pdf")}
              >
                <IconFileUpload size={24} color="gray" style={{ margin: "0 auto", marginBottom: 4 }} />
                <Text fz="sm" c="dimmed">
                  Bấm vào đây để tải hóa đơn VAT hoặc ảnh chụp biên lai thanh toán{" "}
                  <Text span c="blue" fw={600}>(Thêm chứng từ)</Text>
                </Text>
              </Card>
              {attachmentName && (
                <Badge mt="xs" color="blue" variant="light" size="md" leftSection={<IconPaperclip size={12} />}>
                  {attachmentName}
                </Badge>
              )}
            </Grid.Col>
            <Grid.Col span={12}>
              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={() => setAddModalOpened(false)}>Hủy</Button>
                <Button type="submit" color="blue" leftSection={<IconCheck size={16} />}>Gửi yêu cầu</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      {/* Modal Xem Chi Tiết Khoản Chi */}
      <Modal
        opened={!!viewDetailRecord}
        onClose={() => setViewDetailRecord(null)}
        title={<Text fw={600} fz="lg">Chi tiết yêu cầu chi phí — {viewDetailRecord?.id}</Text>}
        size="md"
        radius="md"
      >
        {viewDetailRecord && (
          <Stack gap="md">
            <Card withBorder bg="gray.0" p="sm" radius="md">
              <Grid>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Danh mục</Text>
                  <Text fw={600} fz="sm">{viewDetailRecord.category}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Ngày chi</Text>
                  <Text fw={600} fz="sm">{viewDetailRecord.date}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Số tiền</Text>
                  <Text fw={700} fz="md" c="blue">{formatCurrency(viewDetailRecord.amount)}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="xs" c="dimmed">Trạng thái</Text>
                  <Box mt={2}>{<StatusBadge status={viewDetailRecord.status} statusText={viewDetailRecord.statusText} />}</Box>
                </Grid.Col>
              </Grid>
            </Card>

            <Box>
              <Text fw={600} fz="sm" mb={4}>Nội dung khoản chi:</Text>
              <Text fz="sm">{viewDetailRecord.title}</Text>
            </Box>

            <Box>
              <Text fw={600} fz="sm" mb={4}>Mục đích & Lý do:</Text>
              <Card withBorder p="sm" radius="md">
                <Text fz="sm">{viewDetailRecord.description}</Text>
              </Card>
            </Box>

            <Box>
              <Text fz="xs" c="dimmed">Phòng ban đề xuất</Text>
              <Text fz="sm" fw={500}>{viewDetailRecord.department}</Text>
            </Box>

            {viewDetailRecord.attachment && (
              <Box>
                <Text fw={600} fz="sm" mb={4}>Chứng từ đính kèm:</Text>
                <Badge color="blue" variant="outline" size="md" leftSection={<IconPaperclip size={12} />}>
                  {viewDetailRecord.attachment}
                </Badge>
              </Box>
            )}

            <Group justify="flex-end" mt="xs">
              <Button variant="default" onClick={() => setViewDetailRecord(null)}>Đóng</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Modal Hủy Yêu Cầu */}
      <Modal
        opened={!!cancelModalRecord}
        onClose={() => setCancelModalRecord(null)}
        title={<Text fw={600} fz="lg">Hủy yêu cầu chi phí</Text>}
        size="sm"
        radius="md"
      >
        <Stack gap="md">
          <Text fz="sm">
            Bạn có chắc chắn muốn hủy yêu cầu chi phí{" "}
            <Text span fw={700} c="blue">{cancelModalRecord?.id}</Text> (
            {cancelModalRecord?.title}) không?
          </Text>
          <Group justify="flex-end" mt="xs">
            <Button variant="default" onClick={() => setCancelModalRecord(null)}>Không</Button>
            <Button color="red" onClick={handleConfirmCancel}>Xác nhận hủy</Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
