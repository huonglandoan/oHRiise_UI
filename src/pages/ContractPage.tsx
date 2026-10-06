import React, { useState } from "react";
import {
  Box, Group, Text, Card, Grid, Table, Modal, ScrollArea,
  Menu, ActionIcon, Pagination, Button, Badge, Anchor, Tooltip,
  TextInput, Select, Title
} from "@mantine/core";
import { IconEye, IconFileText, IconDownload, IconDotsVertical, IconChevronUp, IconChevronDown, IconSelector, IconSearch } from "@tabler/icons-react";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge, Icon, StatCard } from "../components/UI";

export interface SimpleContract {
  id: string;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  remainingText: string;
  status: "active" | "expired" | "completed";
  statusText: string;
  pdfFileName: string;
  salary: string;
  signer: string;
}

const CONTRACT_DATA: SimpleContract[] = [
  {
    id: "c1",
    name: "HĐLĐ 24 tháng",
    code: "HDLD-018",
    startDate: "15/06/2025",
    endDate: "14/06/2027",
    remainingText: "Còn lại 627 ngày",
    status: "active",
    statusText: "Đang hiệu lực",
    pdfFileName: "Hop_Dong_Lao_Dong_2025_018.pdf",
    salary: "28.000.000 ₫ / tháng",
    signer: "Trần Hoàng Nam (Giám đốc Khối)",
  },
  {
    id: "c2",
    name: "HĐLĐ 12 tháng",
    code: "HDLD-018",
    startDate: "15/06/2024",
    endDate: "14/06/2025",
    remainingText: "Đã hết hạn",
    status: "expired",
    statusText: "Đã hết hạn",
    pdfFileName: "Hop_Dong_Lao_Dong_2024_018.pdf",
    salary: "22.000.000 ₫ / tháng",
    signer: "Trần Hoàng Nam (Giám đốc Khối)",
  },
  {
    id: "c3",
    name: "HĐ Thử việc",
    code: "HDTV-002",
    startDate: "15/04/2024",
    endDate: "14/06/2024",
    remainingText: "Đã hoàn tất",
    status: "completed",
    statusText: "Đã hoàn tất",
    pdfFileName: "Hop_Dong_Thu_Viec_2024_002.pdf",
    salary: "18.700.000 ₫ / tháng (85% Lương)",
    signer: "Nguyễn Hoàng Hải (Trưởng phòng HR)",
  },
];

export default function ContractPage() {
  const [previewPdfContract, setPreviewPdfContract] = useState<SimpleContract | null>(null);

  const [sortConfig, setSortConfig] = useState<{ key: keyof SimpleContract | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof SimpleContract) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  let processedRecords = [...CONTRACT_DATA].filter(c => {
    const matchSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
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

  const handleDownload = (c: SimpleContract) => {
    alert(`Đã tải xuống văn bản PDF "${c.pdfFileName}" thành công!`);
  };

  const total = CONTRACT_DATA.length;
  const active = CONTRACT_DATA.filter(c => c.status === "active").length;
  const expired = CONTRACT_DATA.filter(c => c.status === "expired").length;
  const completed = CONTRACT_DATA.filter(c => c.status === "completed").length;

  const Th = ({ children, columnKey }: { children: React.ReactNode, columnKey: keyof SimpleContract }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = isSorted && sortConfig.direction === 'asc';
    const isDesc = isSorted && sortConfig.direction === 'desc';

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
    )
  }

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={600} mb={4}>Hợp đồng</Title>
        </Box>
      </Group>

      {/* Summary Cards */}
      <Grid mb="xl">
        {[
          { label: "Tổng số hợp đồng", value: total },
          { label: "Đang hiệu lực", value: active },
          { label: "Đã hết hạn", value: expired },
          { label: "Đã hoàn tất", value: completed }
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card withBorder radius="lg" padding="lg" ta="center">
              <Text fw={700} fz="sm" c="dimmed" tt="uppercase" className="tracking-wide">{item.label}</Text>
              <Text fw={700} fz={24} mt="xs" c="dark.9">{item.value}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Table Section */}
      <Card withBorder radius="lg" p={0} shadow="sm">
        {/* Bộ lọc */}
        <Box p="md" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
          <Group justify="space-between" wrap="wrap" gap="sm">
            <Group gap="xs" wrap="wrap">
              <TextInput
                placeholder="Tìm theo mã hoặc tên HĐ..."
                leftSection={<IconSearch size={14} />}
                size="xs"
                w={{ base: "100%", sm: 250 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
              <Select
                placeholder="Trạng thái"
                size="xs"
                w={140}
                data={[
                  { value: "all", label: "Tất cả trạng thái" },
                  { value: "active", label: "Đang hiệu lực" },
                  { value: "expired", label: "Đã hết hạn" },
                  { value: "completed", label: "Đã hoàn tất" },
                ]}
                value={statusFilter}
                onChange={(v) => v && setStatusFilter(v)}
                allowDeselect={false}
              />
            </Group>
          </Group>
        </Box>

        <ScrollArea>
          <Table verticalSpacing="md" horizontalSpacing="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr bg="gray.0">
                <Th columnKey="code">Mã hợp đồng</Th>
                <Th columnKey="name">Tên hợp đồng</Th>
                <Th columnKey="startDate">Ngày hiệu lực</Th>
                <Th columnKey="remainingText">Hạn còn lại</Th>
                <Th columnKey="status">Trạng thái</Th>
                <Table.Th fw={600} fz="sm" ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {processedRecords.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={6} ta="center" py="xl">
                    <Text c="dimmed">Không tìm thấy hợp đồng nào</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                processedRecords.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Tooltip label="Nhấn để xem PDF" withArrow position="top-start">
                        <Anchor
                          component="button"
                          type="button"
                          fw={700}
                          c="dark"
                          fz="sm"
                          onClick={() => setPreviewPdfContract(item)}
                          style={{ textDecoration: "none" }}
                        >
                          {item.code}
                        </Anchor>
                      </Tooltip>
                    </Table.Td>
                    <Table.Td fw={600} fz="sm">{item.name}</Table.Td>
                    <Table.Td>{item.startDate} – {item.endDate}</Table.Td>
                    <Table.Td>
                      <Badge color={item.status === 'active' ? 'green' : 'gray'} variant="light" size="sm">
                        {item.remainingText}
                      </Badge>
                    </Table.Td>
                    <Table.Td><StatusBadge status={item.status} statusText={item.statusText} /></Table.Td>
                    <Table.Td ta="right">
                      <Menu position="bottom-end" withinPortal>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDotsVertical size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconEye size={14} />} onClick={() => setPreviewPdfContract(item)}>Xem PDF</Menu.Item>
                          <Menu.Item leftSection={<IconDownload size={14} />} onClick={() => handleDownload(item)}>Tải về</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                )))}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        <Box p="md" className="border-t border-gray-200">
          <Group justify="space-between" align="center">
            <Text fz="sm" c="dimmed">
              Hiển thị 1 đến {processedRecords.length} của {processedRecords.length} kết quả
            </Text>
            <Pagination total={1} value={1} size="sm" color="blue" />
          </Group>
        </Box>
      </Card>

      {/* PDF Modal */}
      <Modal
        opened={!!previewPdfContract}
        onClose={() => setPreviewPdfContract(null)}
        title={<Group gap="sm"><IconFileText size={20} color="var(--mantine-color-blue-6)" /><Text fw={700} fz="lg">BẢN XEM TRƯỚC HỢP ĐỒNG</Text></Group>}
        size="xl"
        radius="md"
      >
        {previewPdfContract && (
          <Box>
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-9 shadow-inner mb-6">
              <div className="text-center border-b-2 border-slate-300 pb-5 mb-6">
                <p className="text-sm font-extrabold text-slate-600 tracking-wide m-0">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </p>
                <small className="text-sm font-bold text-slate-500">
                  Độc lập - Tự do - Hạnh phúc
                </small>
                <h2 className="text-2xl font-black text-slate-900 mt-4 mb-1">
                  HỢP ĐỒNG LAO ĐỘNG
                </h2>
                <span className="text-sm text-blue-600 font-extrabold">
                  Số: {previewPdfContract.code}
                </span>
              </div>

              <div className="flex flex-col gap-3 text-base text-slate-800 mb-7">
                <div className="flex justify-between px-4 py-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">Tên hợp đồng:</span>
                  <b className="font-extrabold">{previewPdfContract.name}</b>
                </div>

                <div className="flex justify-between px-4 py-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">Bên A (Người sử dụng lao động):</span>
                  <b className="font-extrabold">Công ty Cổ phần oHRiise ({previewPdfContract.signer})</b>
                </div>

                <div className="flex justify-between px-4 py-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">Bên B (Người lao động):</span>
                  <b className="font-extrabold">Nguyễn Minh Anh (Mã NV: OH-2024-018)</b>
                </div>

                <div className="flex justify-between px-4 py-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">Thời gian hiệu lực:</span>
                  <b className="font-extrabold">{previewPdfContract.startDate} đến {previewPdfContract.endDate}</b>
                </div>

                <div className="flex justify-between px-4 py-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-800">
                  <span className="font-bold">Thời hạn còn lại:</span>
                  <b className="font-black text-lg">{previewPdfContract.remainingText}</b>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-green-50 border border-dashed border-green-500 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-800">
                  <Icon name="shield" size={22} />
                  <span className="text-sm font-extrabold">
                    XÁC NHẬN CHỮ KÝ ĐIỆN TỬ VÀ DẤU MỘC BẢO MẬT HỢP LỆ
                  </span>
                </div>
                <StatusBadge status={previewPdfContract.status} statusText={previewPdfContract.statusText} />
              </div>
            </div>

            <Group justify="flex-end">
              <Button variant="default" onClick={() => setPreviewPdfContract(null)}>Đóng</Button>
              <Button color="blue" leftSection={<IconDownload size={16} />} onClick={() => handleDownload(previewPdfContract)}>Tải xuống PDF</Button>
            </Group>
          </Box>
        )}
      </Modal>
    </Box>
  );
}
