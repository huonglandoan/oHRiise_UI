import React, { useState } from "react";
import {
  Box, Group, Text, Table, ScrollArea, Avatar, TextInput, Select, Title, Card, Modal, Button, ActionIcon, Tooltip
} from "@mantine/core";
import { IconSearch, IconCheck, IconX, IconHome } from "@tabler/icons-react";

interface Employee {
  id: string;
  name: string;
  avatar: string;
  attendance: string[]; // array of strings like "present", "absent", "half", "wfh" for days 1-31
}

const generateAttendance = () => {
  const arr: string[] = [];
  for (let i = 1; i <= 31; i++) {
    if (i % 7 === 6 || i % 7 === 0) {
      arr.push("absent");
    } else {
      const rand = Math.random();
      if (rand > 0.90) arr.push("half");
      else if (rand > 0.80) arr.push("absent");
      else if (rand > 0.70) arr.push("wfh");
      else arr.push("present");
    }
  }
  return arr;
};

const EMPLOYEES: Employee[] = [
  { id: "1", name: "Nguyễn Văn An", avatar: "NA", attendance: generateAttendance() },
  { id: "2", name: "Trần Thị Bích", avatar: "TB", attendance: generateAttendance() },
  { id: "3", name: "Lê Hoàng Cường", avatar: "LC", attendance: generateAttendance() },
  { id: "4", name: "Phạm Thu Dung", avatar: "PD", attendance: generateAttendance() },
  { id: "5", name: "Hoàng Đức Duy", avatar: "HD", attendance: generateAttendance() },
  { id: "6", name: "Đỗ Mai Phương", avatar: "DP", attendance: generateAttendance() },
  { id: "7", name: "Vũ Minh Quân", avatar: "VQ", attendance: generateAttendance() },
  { id: "8", name: "Đặng Ngọc Hoa", avatar: "DH", attendance: generateAttendance() },
  { id: "9", name: "Bùi Tiến Đạt", avatar: "BD", attendance: generateAttendance() },
  { id: "10", name: "Ngô Thanh Kiều", avatar: "NK", attendance: generateAttendance() },
];

export default function TeamCalendarPage() {
  const [employees] = useState<Employee[]>(EMPLOYEES);
  const [searchName, setSearchName] = useState("");
  const [month, setMonth] = useState("Feb");
  const [year, setYear] = useState("2024");
  const [detailModal, setDetailModal] = useState<{ emp: Employee, day: number, status: string } | null>(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const renderStatusIcon = (status: string, size = 18) => {
    switch (status) {
      case "present":
        return <IconCheck size={size} color="var(--mantine-color-green-6)" stroke={3} />;
      case "absent":
        return <IconX size={size} color="var(--mantine-color-red-6)" stroke={3} />;
      case "wfh":
        return <IconHome size={size} color="var(--mantine-color-yellow-6)" stroke={2.5} />;
      case "half":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <IconCheck size={12} color="var(--mantine-color-green-6)" stroke={3} />
            <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "present": return "Đi làm (Lên văn phòng)";
      case "absent": return "Nghỉ phép";
      case "wfh": return "Làm việc tại nhà (WFH)";
      case "half": return "Làm nửa ngày / Nghỉ nửa ngày";
      default: return "Chưa cập nhật";
    }
  };

  return (
    <Box>
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={700} c="dark.9">Lịch team</Title>
        </Box>
      </Group>

      <Card withBorder radius="md" p={0} shadow="sm">
        {/* Bộ lọc */}
        <Box p="md" className="filter-section">
          <Group justify="flex-start" wrap="wrap" gap="sm">
            <TextInput
              placeholder="Tìm kiếm nhân viên..."
              leftSection={<IconSearch size={14} />}
              size="sm"
              radius="md"
              w={{ base: "100%", sm: 260 }}
              value={searchName}
              onChange={(e) => setSearchName(e.currentTarget.value)}
            />
            <Select
              placeholder="Chọn tháng"
              size="sm"
              radius="md"
              w={180}
              data={[
                { value: "Jan", label: "Tháng 1" }, { value: "Feb", label: "Tháng 2" },
                { value: "Mar", label: "Tháng 3" }, { value: "Apr", label: "Tháng 4" },
                { value: "May", label: "Tháng 5" }, { value: "Jun", label: "Tháng 6" },
                { value: "Jul", label: "Tháng 7" }, { value: "Aug", label: "Tháng 8" },
                { value: "Sep", label: "Tháng 9" }, { value: "Oct", label: "Tháng 10" },
                { value: "Nov", label: "Tháng 11" }, { value: "Dec", label: "Tháng 12" }
              ]}
              value={month}
              onChange={(v) => v && setMonth(v)}
              allowDeselect={false}
            />
            <Select
              placeholder="Chọn năm"
              size="sm"
              radius="md"
              w={120}
              data={["2023", "2024", "2025"]}
              value={year}
              onChange={(v) => v && setYear(v)}
              allowDeselect={false}
            />
          </Group>
        </Box>

        <ScrollArea>
          <Table className="ohriise-table" verticalSpacing="md" horizontalSpacing="sm" highlightOnHover striped={false}>
            <Table.Thead>
              <Table.Tr bg="transparent">
                <Table.Th w={220} style={{ paddingLeft: 20 }}>
                  <Text fw={700} fz="sm" c="dark.9">Nhân viên</Text>
                </Table.Th>
                {days.map(d => (
                  <Table.Th key={d} ta="center">
                    <Text fw={700} fz="sm" c="dark.9">{d}</Text>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredEmployees.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={32} ta="center" py="xl">
                    <Text c="dimmed">Không tìm thấy kết quả nào</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                filteredEmployees.map(emp => (
                  <Table.Tr key={emp.id}>
                    <Table.Td style={{ paddingLeft: 20 }}>
                      <Group gap="sm">
                        <Avatar size="sm" radius="xl" color="blue">{emp.avatar}</Avatar>
                        <Text fw={600} fz="sm" c="dark.9">{emp.name}</Text>
                      </Group>
                    </Table.Td>
                    {days.map(d => {
                      const status = emp.attendance[d - 1];
                      return (
                        <Table.Td key={d} ta="center" style={{ padding: "4px" }}>
                          <Tooltip label="Xem chi tiết" withArrow position="top">
                            <ActionIcon
                              variant="transparent"
                              onClick={() => setDetailModal({ emp, day: d, status })}
                              style={{ width: "100%", height: "30px" }}
                            >
                              {renderStatusIcon(status)}
                            </ActionIcon>
                          </Tooltip>
                        </Table.Td>
                      );
                    })}
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>

      {/* DETAIL MODAL */}
      {detailModal && (
        <Modal
          opened={!!detailModal}
          onClose={() => setDetailModal(null)}
          size="lg"
          radius="md"
          withCloseButton={false}
          centered
          padding="xl"
        >
          <Group justify="space-between" mb="md">
            <Text fw={700} fz="lg" c="dark.9">
              Chi tiết ngày {String(detailModal.day).padStart(2, "0")}/{
                month === "Jan" ? "01" : month === "Feb" ? "02" : month === "Mar" ? "03" :
                month === "Apr" ? "04" : month === "May" ? "05" : month === "Jun" ? "06" :
                month === "Jul" ? "07" : month === "Aug" ? "08" : month === "Sep" ? "09" :
                month === "Oct" ? "10" : month === "Nov" ? "11" : "12"
              }/{year}
            </Text>
            <ActionIcon variant="transparent" color="gray" onClick={() => setDetailModal(null)}>
              <IconX size={20} />
            </ActionIcon>
          </Group>

          <Group mb="lg">
            <Avatar size="md" radius="xl" color="blue">{detailModal.emp.avatar}</Avatar>
            <Box>
              <Text fw={600} fz="sm">{detailModal.emp.name}</Text>
              <Group gap={4}>
                <Text fz="xs" c="dimmed">Trạng thái:</Text>
                <Text fw={700} fz="xs" c={detailModal.status === "present" ? "green.7" : detailModal.status === "absent" ? "red.7" : detailModal.status === "wfh" ? "yellow.7" : "dark"}>
                  {getStatusText(detailModal.status)}
                </Text>
              </Group>
            </Box>
          </Group>

          <Card withBorder radius="md" p={0} shadow="none" style={{ borderColor: "var(--mantine-color-gray-3)" }}>
            <Table verticalSpacing="sm" horizontalSpacing="md" withTableBorder={false} withColumnBorders>
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th><Text fw={700} fz="sm" c="dark.9">Ngày</Text></Table.Th>
                  <Table.Th><Text fw={700} fz="sm" c="dark.9">Check-in</Text></Table.Th>
                  <Table.Th><Text fw={700} fz="sm" c="dark.9">Check-out</Text></Table.Th>
                  <Table.Th><Text fw={700} fz="sm" c="dark.9">Thời gian làm việc</Text></Table.Th>
                  <Table.Th><Text fw={700} fz="sm" c="dark.9">Overtime</Text></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>
                    <Text fw={600} fz="sm" c="dark.9">
                      {String(detailModal.day).padStart(2, "0")} Th{
                        month === "Jan" ? "01" : month === "Feb" ? "02" : month === "Mar" ? "03" :
                        month === "Apr" ? "04" : month === "May" ? "05" : month === "Jun" ? "06" :
                        month === "Jul" ? "07" : month === "Aug" ? "08" : month === "Sep" ? "09" :
                        month === "Oct" ? "10" : month === "Nov" ? "11" : "12"
                      } {year}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={600} fz="sm" c="dark.9">
                      {detailModal.status === "absent" ? "-" : detailModal.status === "half" ? "08:30" : "08:25"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={600} fz="sm" c="dark.9">
                      {detailModal.status === "absent" ? "-" : detailModal.status === "half" ? "12:00" : "17:30"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={600} fz="sm" c="dark.9">
                      {detailModal.status === "absent" ? "-" : detailModal.status === "half" ? "3 giờ 30 phút" : "8 giờ 5 phút"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={600} fz="sm" c="blue.7">-</Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
        </Modal>
      )}
    </Box>
  );
}
