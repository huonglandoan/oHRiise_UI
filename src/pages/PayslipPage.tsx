import React, { useState } from "react";
import {
  Box, Group, Stack, Text, Title, Card, Grid, Table, Button,
  Breadcrumbs, Anchor, Select, Divider, Badge, Tabs, ScrollArea,
  Pagination, ActionIcon, Tooltip
} from "@mantine/core";
import {
  IconPrinter, IconFileTypePdf, IconFileTypeCsv, IconShieldCheck,
  IconCalendar, IconCheck, IconEye, IconFileText, IconSearch
} from "@tabler/icons-react";

interface PayslipData {
  month: string;
  year: string;
  payslipNo: string;
  paymentDate: string;
  status: "paid" | "pending";
  statusText: string;
  bankAccount: string;

  // Thu nhập (Earnings)
  basicSalary: number;
  hra: number; // Phụ cấp nhà ở
  conveyance: number; // Phụ cấp đi lại
  otherAllowance: number; // Phụ cấp khác

  // Khấu trừ (Deductions)
  taxDeduction: number; // Thuế TNCN
  providentFund: number; // BHXH, BHYT, BHTN
  esi: number; // BHYT bổ sung
  loan: number; // Khoản tạm ứng / vay
}

const PAYSLIP_RECORDS: Record<string, PayslipData> = {
  "09/2026": {
    month: "09/2026",
    year: "2026",
    payslipNo: "#PL-49029",
    paymentDate: "30/09/2026",
    status: "paid",
    statusText: "Đã thanh toán",
    bankAccount: "Techcombank · **** 9018",
    basicSalary: 25000000,
    hra: 2000000,
    conveyance: 1000000,
    otherAllowance: 1500000,
    taxDeduction: 1250000,
    providentFund: 2625000,
    esi: 0,
    loan: 0,
  },
  "08/2026": {
    month: "08/2026",
    year: "2026",
    payslipNo: "#PL-48190",
    paymentDate: "31/08/2026",
    status: "paid",
    statusText: "Đã thanh toán",
    bankAccount: "Techcombank · **** 9018",
    basicSalary: 25000000,
    hra: 2000000,
    conveyance: 1000000,
    otherAllowance: 1200000,
    taxDeduction: 1200000,
    providentFund: 2625000,
    esi: 0,
    loan: 500000,
  },
  "07/2026": {
    month: "07/2026",
    year: "2026",
    payslipNo: "#PL-47312",
    paymentDate: "31/07/2026",
    status: "paid",
    statusText: "Đã thanh toán",
    bankAccount: "Techcombank · **** 9018",
    basicSalary: 25000000,
    hra: 2000000,
    conveyance: 1000000,
    otherAllowance: 2500000,
    taxDeduction: 1400000,
    providentFund: 2625000,
    esi: 0,
    loan: 0,
  },
  "06/2026": {
    month: "06/2026",
    year: "2026",
    payslipNo: "#PL-46102",
    paymentDate: "30/06/2026",
    status: "paid",
    statusText: "Đã thanh toán",
    bankAccount: "Techcombank · **** 9018",
    basicSalary: 25000000,
    hra: 2000000,
    conveyance: 1000000,
    otherAllowance: 1000000,
    taxDeduction: 1100000,
    providentFund: 2625000,
    esi: 0,
    loan: 0,
  },
};

export default function PayslipPage() {
  const [activeTab, setActiveTab] = useState<string | null>("sheet");

  // Bộ lọc chung
  const [selectedYear, setSelectedYear] = useState<string | null>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("09/2026");
  const [filterStatus, setFilterStatus] = useState<string | null>("all");

  const currentData = PAYSLIP_RECORDS[selectedMonth] || PAYSLIP_RECORDS["09/2026"];

  const formatVnd = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
  };

  const totalEarnings = currentData.basicSalary + currentData.hra + currentData.conveyance + currentData.otherAllowance;
  const totalDeductions = currentData.taxDeduction + currentData.providentFund + currentData.esi + currentData.loan;
  const netSalary = totalEarnings - totalDeductions;

  const getNetWords = (amount: number) => {
    if (amount === 25625000) return "Hai mươi lăm triệu sáu trăm hai mươi lăm nghìn đồng chẵn.";
    if (amount === 24875000) return "Hai mươi bốn triệu tám trăm bảy mươi lăm nghìn đồng chẵn.";
    if (amount === 26475000) return "Hai mươi sáu triệu bốn trăm bảy mươi lăm nghìn đồng chẵn.";
    if (amount === 25275000) return "Hai mươi lăm triệu hai trăm bảy mươi lăm nghìn đồng chẵn.";
    return "Đã chi trả đầy đủ qua tài khoản ngân hàng liên kết.";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    alert(`Đã xuất dữ liệu bảng lương kỳ ${currentData.month} sang tập tin CSV thành công.`);
  };

  const handleDownloadPdf = () => {
    alert(`Đang tải phiếu lương PDF ${currentData.payslipNo} (${currentData.month}). Mật khẩu mở file là 6 số cuối CCCD.`);
  };

  const historyList = Object.values(PAYSLIP_RECORDS).filter((item) => {
    const matchYear = selectedYear === "all" || !selectedYear || item.year === selectedYear;
    const matchStatus = filterStatus === "all" || !filterStatus || item.status === filterStatus;
    return matchYear && matchStatus;
  });

  return (
    <Box>
      {/* Tiêu đề trang & Breadcrumbs & Cụm nút hành động */}
      <Group justify="space-between" align="flex-start" mb="xl" wrap="wrap" gap="md">
        <Box>
          <Title order={2} fw={600} mb={4}>Phiếu lương</Title>
          <Breadcrumbs separator="/" fz="sm">
            <Anchor href="#" c="dimmed">Tổng quan</Anchor>
            <Text c="dimmed">Bảng lương nhân viên</Text>
          </Breadcrumbs>
        </Box>

        <Group gap="xs" wrap="wrap">
          <Button
            variant="default"
            size="xs"
            leftSection={<IconFileTypeCsv size={15} />}
            onClick={handleExportCsv}
          >
            Xuất CSV
          </Button>
          <Button
            variant="default"
            size="xs"
            leftSection={<IconFileTypePdf size={15} />}
            onClick={handleDownloadPdf}
          >
            Tải PDF
          </Button>
          <Button
            variant="default"
            size="xs"
            leftSection={<IconPrinter size={15} />}
            onClick={handlePrint}
          >
            In phiếu
          </Button>
        </Group>
      </Group>

      {/* 4 Thẻ tóm tắt chỉ số lương (Summary Cards theo format chung) */}
      <Grid mb="xl">
        {[
          { label: "Lương thực nhận (Net)", value: formatVnd(netSalary), color: "blue.7" },
          { label: "Tổng thu nhập (Gross)", value: formatVnd(totalEarnings), color: "dark.9" },
          { label: "Tổng các khoản khấu trừ", value: formatVnd(totalDeductions), color: "red.6" },
          { label: "Kỳ chi trả gần nhất", value: currentData.paymentDate, color: "teal.7" },
        ].map((item, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card withBorder radius="lg" padding="lg" ta="center">
              <Text fw={700} fz="sm" c="dimmed" mb={6} tt="uppercase" style={{ letterSpacing: "0.5px" }}>{item.label}</Text>
              <Text fw={700} fz={20} c={item.color}>{item.value}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Điều hướng 2 Subtabs */}
      <Tabs value={activeTab} onChange={setActiveTab} variant="default" mb="xl">
        <Tabs.List mb="lg">
          <Tabs.Tab value="sheet">Phiếu lương chi tiết</Tabs.Tab>
          <Tabs.Tab value="history">Lịch sử các kỳ lương</Tabs.Tab>
        </Tabs.List>

        {/* SUBTAB 1: PHIẾU LƯƠNG CHI TIẾT (CHUẨN FORM MẪU) */}
        <Tabs.Panel value="sheet">
          {/* TỜ PHIẾU LƯƠNG CHÍNH (THEO MẪU HÌNH ẢNH) */}
          <Card withBorder radius="lg" p={{ base: "lg", md: "xl" }} shadow="sm" bg="white">
            {/* Tiêu đề chính giữa gạch chân */}
            <Box ta="center" mb="xl" pb="xs">
              <Text
                fw={700}
                fz="md"
                style={{
                  textDecoration: "underline",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}
              >
                BẢNG LƯƠNG CHI TIẾT THÁNG {currentData.month}
              </Text>
            </Box>

            {/* Thông tin công ty & Thông tin nhân viên */}
            <Grid gutter="xl" mb="xl">
              {/* Cột trái: Đơn vị chi trả & Nhân viên */}
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack gap={2} mb="md">
                  <Text fw={700} fz="sm" c="dark.9">Công ty Cổ phần Công nghệ oHRiise</Text>
                  <Text fz="xs" c="dimmed">3864 Quiet Valley Lane, Tòa nhà Innovation</Text>
                  <Text fz="xs" c="dimmed">Quận 1, TP. Hồ Chí Minh, Việt Nam</Text>
                </Stack>

                <Stack gap={2}>
                  <Text fw={700} fz="sm" c="dark.9">Nguyễn Văn An</Text>
                  <Text fz="xs" c="dimmed">Chuyên viên Thiết kế Web</Text>
                  <Text fz="xs" c="dimmed">Mã nhân viên: FT-0009</Text>
                  <Text fz="xs" c="dimmed">Ngày vào làm: 01/01/2013</Text>
                </Stack>
              </Grid.Col>

              {/* Cột phải: Mã phiếu lương & Kỳ lương */}
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Box ta={{ base: "left", md: "right" }}>
                  <Title order={3} fw={800} c="dark.9" mb={2}>
                    PHIẾU LƯƠNG {currentData.payslipNo}
                  </Title>
                  <Text fz="sm" c="dimmed">Kỳ lương: Tháng {currentData.month}</Text>
                  <Badge color="green" variant="light" size="sm" mt="xs" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }} leftSection={<IconCheck size={12} />}>
                    {currentData.statusText}
                  </Badge>
                </Box>
              </Grid.Col>
            </Grid>

            {/* Hai bảng song song: Thu nhập & Khấu trừ */}
            <Grid gutter="xl" mb="xl">
              {/* BẢNG THU NHẬP */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Title order={5} fw={700} mb="xs" c="dark.9">
                  Thu nhập
                </Title>
                <Table withTableBorder withColumnBorders verticalSpacing="sm" horizontalSpacing="md">
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">Lương cơ bản</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.basicSalary)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">Phụ cấp nhà ở</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.hra)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">Phụ cấp đi lại</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.conveyance)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">Phụ cấp khác / Chuyên cần</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.otherAllowance)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr bg="gray.0">
                      <Table.Td fw={700} fz="sm">Tổng thu nhập</Table.Td>
                      <Table.Td ta="right" fw={700} fz="sm">{formatVnd(totalEarnings)}</Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Grid.Col>

              {/* BẢNG KHẤU TRỪ */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Title order={5} fw={700} mb="xs" c="dark.9">
                  Khấu trừ
                </Title>
                <Table withTableBorder withColumnBorders verticalSpacing="sm" horizontalSpacing="md">
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">Thuế thu nhập cá nhân (TNCN)</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.taxDeduction)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">BHXH, BHYT, BHTN (10.5%)</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.providentFund)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">Bảo hiểm y tế bổ sung</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.esi)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td fw={600} fz="sm">Khoản tạm ứng / Vay</Table.Td>
                      <Table.Td ta="right" fz="sm">{formatVnd(currentData.loan)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr bg="gray.0">
                      <Table.Td fw={700} fz="sm">Tổng khấu trừ</Table.Td>
                      <Table.Td ta="right" fw={700} fz="sm">{formatVnd(totalDeductions)}</Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Grid.Col>
            </Grid>

            {/* TỔNG KẾT LƯƠNG THỰC NHẬN */}
            <Box p="md" bg="gray.0" style={{ borderRadius: "8px", border: "1px solid var(--mantine-color-gray-3)" }}>
              <Group justify="space-between" align="baseline" wrap="wrap" gap="xs">
                <Text fw={700} fz="md" c="dark.9">
                  Lương thực nhận:{" "}
                  <Text span c="blue" fw={800} fz="lg">
                    {formatVnd(netSalary)}
                  </Text>
                </Text>
                <Text fz="xs" c="dimmed" fs="italic">
                  (Bằng chữ: {getNetWords(netSalary)})
                </Text>
              </Group>
            </Box>

            {/* Lưu ý bảo mật */}
            <Group gap="xs" mt="lg" c="dimmed" fz="xs">
              <IconShieldCheck size={16} color="var(--mantine-color-blue-6)" />
              <Text fz="xs" c="dimmed">
                Phiếu lương điện tử được mã hóa và tạo tự động bởi Hệ thống Quản trị Nhân sự oHRiise. Mọi thắc mắc vui lòng liên hệ phòng Kế toán / C&B.
              </Text>
            </Group>
          </Card>
        </Tabs.Panel>

        {/* SUBTAB 2: LỊCH SỬ CÁC KỲ LƯƠNG (BẢNG BỘ LỌC CHUNG) */}
        <Tabs.Panel value="history">
          <Card withBorder radius="lg" p={0} shadow="sm">
            {/* Bộ lọc trên bảng */}
            <Box p="md" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
              <Group justify="space-between" wrap="wrap" gap="sm">
                <Group gap="xs" wrap="wrap">
                  <Select
                    placeholder="Chọn năm"
                    size="xs"
                    w={130}
                    data={[
                      { value: "all", label: "Tất cả năm" },
                      { value: "2026", label: "Năm 2026" },
                      { value: "2025", label: "Năm 2025" },
                    ]}
                    value={selectedYear}
                    onChange={setSelectedYear}
                    allowDeselect={false}
                  />
                  <Select
                    placeholder="Trạng thái"
                    size="xs"
                    w={150}
                    data={[
                      { value: "all", label: "Tất cả trạng thái" },
                      { value: "paid", label: "Đã thanh toán" },
                      { value: "pending", label: "Chờ thanh toán" },
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
                    <Table.Th fw={600} fz="sm">Kỳ lương</Table.Th>
                    <Table.Th fw={600} fz="sm">Mã phiếu</Table.Th>
                    <Table.Th fw={600} fz="sm">Tổng thu nhập</Table.Th>
                    <Table.Th fw={600} fz="sm">Tổng khấu trừ</Table.Th>
                    <Table.Th fw={600} fz="sm">Thực nhận (Net)</Table.Th>
                    <Table.Th fw={600} fz="sm">Ngày chi trả</Table.Th>
                    <Table.Th fw={600} fz="sm">Trạng thái</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {historyList.map((item) => {
                    const gross = item.basicSalary + item.hra + item.conveyance + item.otherAllowance;
                    const deduct = item.taxDeduction + item.providentFund + item.esi + item.loan;
                    const net = gross - deduct;

                    return (
                      <Table.Tr key={item.month}>
                        <Table.Td fw={600}>Tháng {item.month}</Table.Td>
                        <Table.Td>
                          <Tooltip label="Nhấn để xem chi tiết phiếu lương" withArrow position="top-start">
                            <Anchor
                              component="button"
                              type="button"
                              fw={700}
                              c="dark"
                              fz="sm"
                              onClick={() => {
                                setSelectedMonth(item.month);
                                setActiveTab("sheet");
                              }}
                              style={{ textDecoration: "none", cursor: "pointer" }}
                            >
                              {item.payslipNo}
                            </Anchor>
                          </Tooltip>
                        </Table.Td>
                        <Table.Td>{formatVnd(gross)}</Table.Td>
                        <Table.Td c="red.6">{formatVnd(deduct)}</Table.Td>
                        <Table.Td fw={700} c="dark.9">{formatVnd(net)}</Table.Td>
                        <Table.Td>{item.paymentDate}</Table.Td>
                        <Table.Td>
                          <Badge color="green" variant="light" size="sm" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            {item.statusText}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </ScrollArea>

            <Box p="md" style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}>
              <Group justify="space-between">
                <Text fz="sm" c="dimmed">
                  Hiển thị 1 đến {historyList.length} của {historyList.length} kết quả
                </Text>
                <Pagination total={1} value={1} size="sm" color="blue" />
              </Group>
            </Box>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
