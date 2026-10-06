import React, { useState } from "react";
import {
  Box,
  Title,
  Grid,
  TextInput,
  FileInput,
  Button,
  Flex,
  Text,
  Switch,
  Paper,
  Table,
  Badge,
  ActionIcon,
  Group,
  Select,
  Radio,
  Checkbox,
} from "@mantine/core";
import { IconTrash, IconPlus, IconDotsVertical, IconMinus, IconEdit } from "@tabler/icons-react";

export function InvoiceSettingsTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình hoá đơn</Title>
      <Grid gutter="xl" align="flex-start">
        <Grid.Col span={3}>
          <Text fw={500}>Tiền tố hoá đơn</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <TextInput defaultValue="INV" />
        </Grid.Col>
        
        <Grid.Col span={3}>
          <Text fw={500}>Logo hoá đơn</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Flex gap="md" align="center">
            <FileInput placeholder="Không có tệp nào được chọn" w={400} />
            <Box w={100} h={40} style={{ border: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }} />
          </Flex>
          <Text size="xs" c="dimmed" mt={4}>Kích thước ảnh đề xuất là 200px x 40px</Text>
        </Grid.Col>
      </Grid>
      <Flex justify="center" mt={40}>
        <Button size="md" color="red" radius="xl" w={150}>Lưu</Button>
      </Flex>
    </Box>
  );
}

export function SalarySettingsTab() {
  const [daHra, setDaHra] = useState(true);
  const [provident, setProvident] = useState(true);
  const [esi, setEsi] = useState(false);
  const [tds, setTds] = useState(false);

  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình lương</Title>
      
      {/* DA and HRA */}
      <Box mb="xl">
        <Flex justify="space-between" align="center" mb="md">
          <Text fw={500}>DA và HRA</Text>
          <Switch checked={daHra} onChange={(e) => setDaHra(e.currentTarget.checked)} color="green" size="md" />
        </Flex>
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="DA (%)" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="HRA (%)" />
          </Grid.Col>
        </Grid>
      </Box>

      {/* Provident Fund */}
      <Box mb="xl">
        <Flex justify="space-between" align="center" mb="md">
          <Text fw={500}>Cấu hình Quỹ hưu trí</Text>
          <Switch checked={provident} onChange={(e) => setProvident(e.currentTarget.checked)} color="green" size="md" />
        </Flex>
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="Cổ phần nhân viên (%)" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Cổ phần công ty (%)" />
          </Grid.Col>
        </Grid>
      </Box>

      {/* ESI Settings */}
      <Box mb="xl">
        <Flex justify="space-between" align="center" mb="md">
          <Text fw={500}>Cấu hình ESI</Text>
          <Switch checked={esi} onChange={(e) => setEsi(e.currentTarget.checked)} color="gray" size="md" />
        </Flex>
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="Cổ phần nhân viên (%)" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Cổ phần công ty (%)" />
          </Grid.Col>
        </Grid>
      </Box>

      {/* TDS Settings */}
      <Box mb="xl">
        <Flex justify="space-between" align="center" mb="md">
          <Group gap="xs">
            <Text fw={500}>TDS</Text>
            <Text size="xs" c="dimmed">Lương hằng năm</Text>
          </Group>
          <Switch checked={tds} onChange={(e) => setTds(e.currentTarget.checked)} color="gray" size="md" />
        </Flex>
        <Grid align="flex-end">
          <Grid.Col span={4}>
            <TextInput label="Mức lương từ" />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput label="Mức lương đến" />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput label="%" />
          </Grid.Col>
          <Grid.Col span={1}>
            <Button color="red" px={0} w="100%"><IconPlus size={16} /></Button>
          </Grid.Col>
        </Grid>
        <Grid align="flex-end" mt="sm">
          <Grid.Col span={4}>
            <TextInput label="Mức lương từ" />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput label="Mức lương đến" />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput label="%" />
          </Grid.Col>
          <Grid.Col span={1}>
            <Box>
              <Button color="red" px={0} w="100%" mb={4}><IconPlus size={16} /></Button>
              <Button color="red" px={0} w="100%"><IconTrash size={16} /></Button>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>

      <Flex justify="center" mt={40}>
        <Button size="md" color="red" radius="xl" w={150}>Lưu</Button>
      </Flex>
    </Box>
  );
}

export function NotificationsSettingsTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình thông báo</Title>
      <Paper withBorder p={0}>
        {[
          { label: "Nhân viên", defaultChecked: true, color: "red" },
          { label: "Ngày lễ", defaultChecked: true, color: "green" },
          { label: "Nghỉ phép", defaultChecked: true, color: "green" },
          { label: "Sự kiện", defaultChecked: true, color: "green" },
          { label: "Trò chuyện", defaultChecked: true, color: "green" },
          { label: "Việc làm", defaultChecked: true, color: "red" },
        ].map((item, idx) => (
          <Flex key={idx} justify="space-between" p="md" style={{ borderBottom: "1px solid #eee" }}>
            <Text size="sm">{item.label}</Text>
            <Switch defaultChecked={item.defaultChecked} color={item.color} size="md" />
          </Flex>
        ))}
      </Paper>
    </Box>
  );
}

export function ChangePasswordTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Đổi mật khẩu</Title>
      <Box maw={500} mx="auto">
        <TextInput label="Mật khẩu cũ" type="password" mb="md" />
        <TextInput label="Mật khẩu mới" type="password" mb="md" />
        <TextInput label="Xác nhận mật khẩu" type="password" mb="xl" />
        <Flex justify="center">
          <Button size="md" color="red" radius="xl" w={200}>Cập nhật mật khẩu</Button>
        </Flex>
      </Box>
    </Box>
  );
}

export function LeaveTypeTab() {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={2} fw={500} size="h3">Loại nghỉ phép</Title>
          <Text size="sm" c="dimmed">Bảng điều khiển / Loại nghỉ phép</Text>
        </Box>
        <Button color="red" radius="xl" leftSection={<IconPlus size={16} />}>Thêm loại nghỉ phép</Button>
      </Flex>
      
      <Flex align="center" gap="sm" mb="md">
        <Text size="sm">Hiển thị</Text>
        <Select data={["10", "25", "50"]} defaultValue="10" w={70} />
        <Text size="sm">mục</Text>
      </Flex>
      
      <Paper withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta="center" w={50}>STT</Table.Th>
              <Table.Th ta="center">Loại nghỉ phép</Table.Th>
              <Table.Th ta="center">Số ngày nghỉ</Table.Th>
              <Table.Th ta="center">Trạng thái</Table.Th>
              <Table.Th ta="center">Thao tác</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { id: 1, type: "Nghỉ phép thông thường", days: "12 Ngày", status: "Hoạt động" },
              { id: 2, type: "Nghỉ ốm", days: "12 Ngày", status: "Không hoạt động" },
              { id: 3, type: "Nghỉ không lương", days: "-", status: "Hoạt động" },
            ].map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td ta="center">{item.id}</Table.Td>
                <Table.Td ta="center">{item.type}</Table.Td>
                <Table.Td ta="center">{item.days}</Table.Td>
                <Table.Td ta="center">
                  <Badge 
                    variant="dot" 
                    color={item.status === "Hoạt động" ? "green" : "red"}
                  >
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td ta="center">
                  <Group gap={8} justify="center">
                    <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
      
      <Flex justify="space-between" align="center" mt="md">
        <Text size="sm">Hiển thị 1 đến 3 của 3 mục</Text>
        <Group gap={4}>
          <Button variant="subtle" color="gray" size="sm">Trước</Button>
          <Button color="red" size="sm" p={0} w={32}>1</Button>
          <Button variant="subtle" color="gray" size="sm">Tiếp</Button>
        </Group>
      </Flex>
    </Box>
  );
}

export function CompanySettingsTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình công ty</Title>
      <Paper radius="md" p="xl" withBorder>
        <Grid gutter="xl">
          <Grid.Col span={6}>
            <TextInput label="Tên công ty" placeholder="Dreamguy's Technologies" withAsterisk />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Người liên hệ" placeholder="Daniel Porter" />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput label="Địa chỉ" placeholder="3864 Quiet Valley Lane, Sherman Oaks, CA, 91403" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Select label="Quốc gia" placeholder="Mỹ" data={["Mỹ", "Việt Nam", "Anh"]} defaultValue="Mỹ" />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput label="Thành phố" placeholder="Sherman Oaks" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Select label="Bang/Tỉnh" placeholder="California" data={["California", "New York", "Hà Nội"]} defaultValue="California" />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput label="Mã bưu điện" placeholder="91403" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Email" placeholder="danielporter@example.com" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Số điện thoại" placeholder="818-978-7102" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Số di động" placeholder="818-635-5579" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Fax" placeholder="818-978-7102" />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput label="Địa chỉ Website" placeholder="https://www.example.com" />
          </Grid.Col>
        </Grid>
        <Flex justify="center" mt={40}>
          <Button size="md" color="red" radius="xl" w={200}>Lưu</Button>
        </Flex>
      </Paper>
    </Box>
  );
}

export function ApprovalSettingsTab() {
  const [approvalTab, setApprovalTab] = useState("Duyệt chi phí");
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình phê duyệt</Title>
      
      <Flex gap="xl" mb="xl" style={{ borderBottom: "1px solid #eee" }}>
        {["Duyệt chi phí", "Duyệt nghỉ phép", "Duyệt thư mời làm việc", "Duyệt đơn từ chức"].map(tab => (
          <Text 
            key={tab} 
            fw={approvalTab === tab ? 600 : 400}
            c={approvalTab === tab ? "black" : "dimmed"}
            style={{ 
              cursor: "pointer", 
              borderBottom: approvalTab === tab ? "2px solid red" : "none",
              paddingBottom: 8 
            }}
            onClick={() => setApprovalTab(tab)}
          >
            {tab}
          </Text>
        ))}
      </Flex>

      {approvalTab === "Duyệt chi phí" && (
        <Box>
          <Text fw={600} mb="sm">Cấu hình duyệt chi phí</Text>
          <Text size="sm" mb="xs">Duyệt chi phí mặc định</Text>
          <Radio.Group defaultValue="sequence" mb="xl">
            <Group>
              <Radio value="sequence" label="Duyệt theo tuần tự (Chuỗi)" color="blue" />
              <Radio value="simultaneous" label="Duyệt đồng thời" color="blue" />
            </Group>
          </Radio.Group>

          <Text size="sm" mb="md" fw={500}>Người duyệt chi phí</Text>
          <Box maw={400} mb="md">
            <Text size="sm" mb={4}>Người duyệt 1</Text>
            <Select placeholder="Chọn người duyệt" data={[]} mb="sm" />
            
            <Text size="sm" mb={4}>Người duyệt 2</Text>
            <Flex gap="sm" mb="sm">
              <Select placeholder="Chọn người duyệt" data={[]} style={{ flex: 1 }} />
              <ActionIcon color="red" variant="outline" size={36}><IconMinus size={16} /></ActionIcon>
            </Flex>

            <Text size="sm" mb={4}>Người duyệt 3</Text>
            <Flex gap="sm" mb="sm">
              <Select placeholder="Chọn người duyệt" data={[]} style={{ flex: 1 }} />
              <ActionIcon color="red" variant="outline" size={36}><IconMinus size={16} /></ActionIcon>
            </Flex>
          </Box>
          
          <Text c="blue" size="sm" fw={500} style={{ cursor: "pointer" }}>+ Thêm người duyệt</Text>

          <Flex justify="center" mt={40}>
            <Button size="md" color="red" radius="xl" w={200}>Lưu thay đổi</Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export function EmailSettingsTab() {
  return (
    <Box pt="md">
      <Radio.Group defaultValue="php" mb="xl">
        <Group>
          <Radio value="php" label="PHP Mail" color="blue" />
          <Radio value="smtp" label="SMTP" color="blue" />
        </Group>
      </Radio.Group>

      <Title order={3} fw={500} mb="md" size="h4">Cấu hình Email PHP</Title>
      <Grid gutter="xl" mb="xl">
        <Grid.Col span={6}>
          <TextInput label="Địa chỉ Email gửi" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Tên người gửi" />
        </Grid.Col>
      </Grid>

      <Title order={3} fw={500} mb="md" size="h4">Cấu hình SMTP Email</Title>
      <Grid gutter="xl">
        <Grid.Col span={6}>
          <TextInput label="MÁY CHỦ SMTP" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="NGƯỜI DÙNG SMTP" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="MẬT KHẨU SMTP" type="password" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="CỔNG SMTP" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select label="Bảo mật SMTP" placeholder="Không" data={["Không", "TLS", "SSL"]} defaultValue="Không" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Miền xác thực SMTP" />
        </Grid.Col>
      </Grid>

      <Flex justify="center" mt={40}>
        <Button size="md" color="red" radius="xl" w={200}>Lưu & Cập nhật</Button>
      </Flex>
    </Box>
  );
}

export function RolesPermissionsTab() {
  const [activeRole, setActiveRole] = useState("Quản trị viên");
  const roles = ["Quản trị viên", "Giám đốc điều hành", "Quản lý", "Trưởng nhóm", "Kế toán", "Lập trình web", "Thiết kế web", "Nhân sự", "Lập trình UI/UX", "Chuyên viên SEO"];
  
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Vai trò & Quyền hạn</Title>
      <Grid gutter="xl">
        <Grid.Col span={3}>
          <Button color="red" fullWidth mb="md" radius="sm">Thêm vai trò</Button>
          <Paper withBorder>
            {roles.map((role) => (
              <Box 
                key={role} 
                p="md" 
                style={{ 
                  cursor: "pointer", 
                  color: activeRole === role ? "red" : "inherit",
                  fontWeight: activeRole === role ? 500 : 400,
                  borderBottom: "1px solid #eee"
                }}
                onClick={() => setActiveRole(role)}
              >
                {role}
              </Box>
            ))}
          </Paper>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text fw={600} mb="md">Quyền truy cập Module</Text>
          <Paper withBorder p={0} mb="xl">
            {[
              { label: "Nhân viên", defaultChecked: true, color: "red" },
              { label: "Ngày lễ", defaultChecked: true, color: "green" },
              { label: "Nghỉ phép", defaultChecked: true, color: "green" },
              { label: "Sự kiện", defaultChecked: true, color: "green" },
              { label: "Trò chuyện", defaultChecked: true, color: "green" },
              { label: "Việc làm", defaultChecked: true, color: "red" },
            ].map((item, idx) => (
              <Flex key={idx} justify="space-between" p="md" style={{ borderBottom: "1px solid #eee" }}>
                <Text size="sm">{item.label}</Text>
                <Switch defaultChecked={item.defaultChecked} color={item.color} size="md" />
              </Flex>
            ))}
          </Paper>

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th ta="center">Quyền Module</Table.Th>
                <Table.Th ta="center">Đọc</Table.Th>
                <Table.Th ta="center">Ghi</Table.Th>
                <Table.Th ta="center">Tạo mới</Table.Th>
                <Table.Th ta="center">Xóa</Table.Th>
                <Table.Th ta="center">Nhập</Table.Th>
                <Table.Th ta="center">Xuất</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {["Nhân viên", "Ngày lễ", "Nghỉ phép", "Sự kiện"].map(mod => (
                <Table.Tr key={mod}>
                  <Table.Td ta="center">{mod}</Table.Td>
                  {["Read", "Write", "Create", "Delete", "Import", "Export"].map(act => (
                    <Table.Td key={act} ta="center">
                      <Checkbox defaultChecked color="blue" style={{ display: 'inline-block' }} />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export function ThemeSettingsTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình giao diện</Title>
      
      <Grid gutter="xl" align="flex-start" maw={800}>
        <Grid.Col span={3}>
          <Text fw={500} size="sm">Tên Website</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <TextInput defaultValue="Dreamguy's Technologies" />
        </Grid.Col>
        
        <Grid.Col span={3}>
          <Text fw={500} size="sm">Logo sáng</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Flex gap="md" align="center">
            <FileInput placeholder="Không có tệp nào được chọn" style={{ flex: 1 }} />
            <Box w={40} h={40} style={{ border: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }} />
          </Flex>
          <Text size="xs" c="dimmed" mt={4}>Kích thước ảnh đề xuất là 40px x 40px</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text fw={500} size="sm">Favicon</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Flex gap="md" align="center">
            <FileInput placeholder="Không có tệp nào được chọn" style={{ flex: 1 }} />
            <Box w={40} h={40} style={{ border: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }} />
          </Flex>
          <Text size="xs" c="dimmed" mt={4}>Kích thước ảnh đề xuất là 16px x 16px</Text>
        </Grid.Col>
      </Grid>
      
      <Flex justify="center" mt={40}>
        <Button size="md" color="red" radius="xl" w={150}>Lưu</Button>
      </Flex>
    </Box>
  );
}

export function LocalizationTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình cơ bản</Title>
      <Grid gutter="xl" maw={1000}>
        <Grid.Col span={6}>
          <Select label="Quốc gia mặc định" placeholder="Mỹ" data={["Mỹ", "Việt Nam", "Anh"]} defaultValue="Mỹ" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select label="Định dạng ngày" placeholder="15/05/2016" data={["15 May 2016", "15/05/2016", "05/15/2016"]} defaultValue="15/05/2016" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select label="Múi giờ" placeholder="(UTC +7:00) Bangkok, Hanoi, Jakarta" data={["(UTC +5:30) Antarctica/Palmer", "(UTC +7:00) Bangkok, Hanoi, Jakarta"]} defaultValue="(UTC +7:00) Bangkok, Hanoi, Jakarta" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select label="Ngôn ngữ mặc định" placeholder="Tiếng Việt" data={["Tiếng Anh", "Tiếng Việt", "Tiếng Pháp"]} defaultValue="Tiếng Việt" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select label="Mã tiền tệ" placeholder="VND" data={["USD", "VND", "EUR"]} defaultValue="VND" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Ký hiệu tiền tệ" defaultValue="₫" />
        </Grid.Col>
      </Grid>
      
      <Flex justify="center" mt={40}>
        <Button size="md" color="red" radius="xl" w={150}>Lưu</Button>
      </Flex>
    </Box>
  );
}

export function CronSettingsTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình Cron</Title>
      <Grid gutter="xl">
        <Grid.Col span={6}>
          <TextInput label="Khoá Cron" defaultValue="f9a8d7c6b5e4f3a2d1" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Tự động sao lưu" defaultValue="Hàng ngày" />
        </Grid.Col>
      </Grid>
      <Flex justify="center" mt={40}>
        <Button size="md" color="red" radius="xl" w={150}>Lưu</Button>
      </Flex>
    </Box>
  );
}

export function ToxBoxSettingsTab() {
  return (
    <Box>
      <Title order={2} fw={500} mb="xl" size="h3">Cấu hình ToxBox</Title>
      <Grid gutter="xl">
        <Grid.Col span={6}>
          <TextInput label="Khóa API ToxBox" defaultValue="api-key-12345" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Bí mật API ToxBox" type="password" defaultValue="secret-67890" />
        </Grid.Col>
      </Grid>
      <Flex justify="center" mt={40}>
        <Button size="md" color="red" radius="xl" w={150}>Lưu</Button>
      </Flex>
    </Box>
  );
}
