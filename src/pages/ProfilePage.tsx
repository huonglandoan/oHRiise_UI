import React, { useState } from "react";
import {
  Box, Group, Stack, Text, Title, Card, Grid, Avatar, Button,
  ActionIcon, Tabs, Table, Timeline, Breadcrumbs, Anchor, Modal,
  TextInput, Select, Divider, Menu, Badge
} from "@mantine/core";
import {
  IconEdit, IconDotsVertical, IconCheck, IconTrash, IconPlus,
  IconExternalLink, IconSend
} from "@tabler/icons-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string | null>("profile");

  // Profile Information State (Vietnamese localized)
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn An",
    department: "Phòng Thiết kế UI/UX",
    designation: "Chuyên viên Thiết kế Web",
    employeeId: "FT-0001",
    dateOfJoin: "01/01/2013",
    phone: "0987 654 321",
    email: "an.nguyen@example.com",
    birthday: "24/07/1992",
    address: "1861 Bayonne Ave, Manchester Township, TP. Hồ Chí Minh",
    gender: "Nam",
    reportsToName: "Trần Minh Quang",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    reportsToAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",

    // Personal Info
    passportNo: "079192008899",
    passportExp: "24/07/2032",
    tel: "0987 654 321",
    nationality: "Việt Nam",
    religion: "Không",
    maritalStatus: "Đã kết hôn",
    employmentOfSpouse: "Có việc làm",
    noOfChildren: "2",

    // Emergency Contact
    primaryEmergencyName: "Nguyễn Văn Hùng",
    primaryEmergencyRelation: "Bố",
    primaryEmergencyPhone: "0912 345 678, 0987 654 321",
    secondaryEmergencyName: "Lê Hoàng Nam",
    secondaryEmergencyRelation: "Anh trai",
    secondaryEmergencyPhone: "0909 888 777, 0987 654 321",

    // Bank Info
    bankName: "Techcombank (TMCP Kỹ Thương Việt Nam)",
    bankAccountNo: "1903 8888 999 018",
    ifscCode: "TCB-HCM01",
    panNo: "8039281920",
  });

  // Family members list
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: "fam-1",
      name: "Nguyễn Tuấn Kiệt",
      relationship: "Em trai",
      dob: "16/02/2019",
      phone: "0987 654 321",
    }
  ]);

  // Modals state
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editSection, setEditSection] = useState<string>("personal");
  const [editFormData, setEditFormData] = useState({ ...profile });

  const getSectionTitle = (sec: string) => {
    switch (sec) {
      case "contact": return "Thông tin liên hệ";
      case "personal": return "Thông tin cá nhân";
      case "emergency": return "Người liên hệ khẩn cấp";
      case "bank": return "Thông tin tài khoản ngân hàng";
      default: return "Thông tin";
    }
  };

  const handleOpenEdit = (section: string) => {
    setEditSection(section);
    setEditFormData({ ...profile });
    setEditModalOpened(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...editFormData });
    setEditModalOpened(false);
  };

  return (
    <Box>
      {/* Tiêu đề trang & Đường dẫn Breadcrumbs */}
      <Box mb="lg">
        <Title order={2} fw={600} mb={4}>Hồ sơ của tôi</Title>
        <Breadcrumbs separator="/" fz="sm">
          <Anchor href="#" c="dimmed">Tổng quan</Anchor>
          <Text c="dimmed">Hồ sơ cá nhân</Text>
        </Breadcrumbs>
      </Box>

      {/* Thẻ chính Hồ sơ cá nhân (Profile Header) */}
      <Card withBorder radius="lg" p="xl" mb="xl" shadow="sm">
        <Grid gutter="xl" align="center">
          {/* Cột trái: Ảnh đại diện + Tên + Chức danh + Nút hành động */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Group align="flex-start" gap="lg" wrap="nowrap">
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                size={110}
                radius="100%"
                style={{ border: "3px solid #f1f5f9" }}
              />
              <Stack gap={4}>
                <Title order={3} fw={700} c="dark.9">{profile.name}</Title>
                <Text fz="sm" c="dimmed">{profile.department}</Text>
                <Text fz="sm" fw={600} c="dark.7" mt={2}>{profile.designation}</Text>
                <Text fz="xs" c="dimmed">Mã nhân viên : {profile.employeeId}</Text>
                <Text fz="xs" c="dimmed">Ngày vào làm : {profile.dateOfJoin}</Text>
              </Stack>
            </Group>
          </Grid.Col>

          {/* Cột phải: Thông tin liên hệ & Người quản lý */}
          <Grid.Col
            span={{ base: 12, md: 7 }}
            style={{
              borderLeft: "1px dashed var(--mantine-color-gray-3)",
              paddingLeft: "24px"
            }}
          >
            <Group justify="flex-end" mb="xs">
              <ActionIcon
                radius="xl"
                variant="subtle"
                color="gray"
                size="md"
                onClick={() => handleOpenEdit("contact")}
                title="Chỉnh sửa liên hệ"
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Group>

            <Grid gutter={{ base: "xs", sm: "sm" }}>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group gap="xs" align="baseline">
                  <Text fz="sm" fw={500} c="dimmed" w={110}>Số điện thoại:</Text>
                  <Anchor href={`tel:${profile.phone}`} fz="sm" fw={500} c="blue">
                    {profile.phone}
                  </Anchor>
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group gap="xs" align="baseline">
                  <Text fz="sm" fw={500} c="dimmed" w={110}>Email:</Text>
                  <Anchor href={`mailto:${profile.email}`} fz="sm" fw={500} c="blue">
                    {profile.email}
                  </Anchor>
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group gap="xs" align="baseline">
                  <Text fz="sm" fw={500} c="dimmed" w={110}>Ngày sinh:</Text>
                  <Text fz="sm" c="dark.8">{profile.birthday}</Text>
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group gap="xs" align="baseline">
                  <Text fz="sm" fw={500} c="dimmed" w={110}>Địa chỉ:</Text>
                  <Text fz="sm" c="dark.8" style={{ wordBreak: "break-word" }}>{profile.address}</Text>
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group gap="xs" align="baseline">
                  <Text fz="sm" fw={500} c="dimmed" w={110}>Giới tính:</Text>
                  <Text fz="sm" c="dark.8">{profile.gender}</Text>
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group gap="xs" align="center">
                  <Text fz="sm" fw={500} c="dimmed" w={110}>Quản lý trực tiếp:</Text>
                  <Group gap={6} align="center">
                    <Avatar src={profile.reportsToAvatar} size="xs" radius="xl" />
                    <Anchor href="#" fz="sm" fw={500} c="blue">
                      {profile.reportsToName}
                    </Anchor>
                  </Group>
                </Group>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Điều hướng Subtabs */}
      <Tabs value={activeTab} onChange={setActiveTab} variant="default" mb="xl">
        <Tabs.List mb="xl">
          <Tabs.Tab value="profile">Hồ sơ</Tabs.Tab>
          <Tabs.Tab value="projects">Dự án</Tabs.Tab>
          <Tabs.Tab value="bank">Ngân hàng & Pháp lý</Tabs.Tab>
        </Tabs.List>

        {/* TAB 1: HỒ SƠ CHI TIẾT (6 THẺ THEO GIAO DIỆN) */}
        <Tabs.Panel value="profile">
          <Grid gutter="xl">
            {/* THẺ 1: Thông tin cá nhân */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group justify="space-between" align="center" mb="md">
                  <Title order={5} fw={700} c="dark.9">Thông tin cá nhân</Title>
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    size="sm"
                    color="gray"
                    onClick={() => handleOpenEdit("personal")}
                    title="Chỉnh sửa"
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                </Group>

                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Số CCCD / Hộ chiếu</Text>
                    <Text fz="sm" fw={500}>{profile.passportNo}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Ngày hết hạn</Text>
                    <Text fz="sm" fw={500}>{profile.passportExp}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Điện thoại liên hệ</Text>
                    <Anchor href={`tel:${profile.tel}`} fz="sm" fw={500} c="blue">
                      {profile.tel}
                    </Anchor>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Quốc tịch</Text>
                    <Text fz="sm" fw={500}>{profile.nationality}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Tôn giáo</Text>
                    <Text fz="sm" fw={500}>{profile.religion}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Tình trạng hôn nhân</Text>
                    <Text fz="sm" fw={500}>{profile.maritalStatus}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Tình trạng việc làm của vợ/chồng</Text>
                    <Text fz="sm" fw={500}>{profile.employmentOfSpouse}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Số con</Text>
                    <Text fz="sm" fw={500}>{profile.noOfChildren}</Text>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>

            {/* THẺ 2: Người liên hệ khẩn cấp */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group justify="space-between" align="center" mb="md">
                  <Title order={5} fw={700} c="dark.9">Liên hệ khẩn cấp</Title>
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    size="sm"
                    color="gray"
                    onClick={() => handleOpenEdit("emergency")}
                    title="Chỉnh sửa"
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                </Group>

                <Box mb="md">
                  <Text fz="sm" fw={700} c="dark.7" mb="xs">Người liên hệ chính</Text>
                  <Stack gap={6}>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Họ và tên</Text>
                      <Text fz="sm" fw={500}>{profile.primaryEmergencyName}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Mối quan hệ</Text>
                      <Text fz="sm" fw={500}>{profile.primaryEmergencyRelation}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Số điện thoại</Text>
                      <Text fz="sm" fw={500}>{profile.primaryEmergencyPhone}</Text>
                    </Group>
                  </Stack>
                </Box>

                <Divider my="sm" />

                <Box>
                  <Text fz="sm" fw={700} c="dark.7" mb="xs">Người liên hệ phụ</Text>
                  <Stack gap={6}>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Họ và tên</Text>
                      <Text fz="sm" fw={500}>{profile.secondaryEmergencyName}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Mối quan hệ</Text>
                      <Text fz="sm" fw={500}>{profile.secondaryEmergencyRelation}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Số điện thoại</Text>
                      <Text fz="sm" fw={500}>{profile.secondaryEmergencyPhone}</Text>
                    </Group>
                  </Stack>
                </Box>
              </Card>
            </Grid.Col>

            {/* THẺ 3: Thông tin tài khoản ngân hàng */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group justify="space-between" align="center" mb="md">
                  <Title order={5} fw={700} c="dark.9">Tài khoản ngân hàng</Title>
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    size="sm"
                    color="gray"
                    onClick={() => handleOpenEdit("bank")}
                    title="Chỉnh sửa"
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                </Group>

                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Tên ngân hàng</Text>
                    <Text fz="sm" fw={500}>{profile.bankName}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Số tài khoản</Text>
                    <Text fz="sm" fw={500}>{profile.bankAccountNo}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Mã chi nhánh / Swift Code</Text>
                    <Text fz="sm" fw={500}>{profile.ifscCode}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Mã số thuế cá nhân</Text>
                    <Text fz="sm" fw={500}>{profile.panNo}</Text>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>

            {/* THẺ 4: Thông tin gia đình & Người phụ thuộc */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group justify="space-between" align="center" mb="md">
                  <Title order={5} fw={700} c="dark.9">Thông tin người thân</Title>
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    size="sm"
                    color="gray"
                    onClick={() => handleOpenEdit("family")}
                    title="Chỉnh sửa"
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                </Group>

                <Table verticalSpacing="sm" horizontalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr bg="gray.0">
                      <Table.Th fw={600} fz="xs">Họ và tên</Table.Th>
                      <Table.Th fw={600} fz="xs">Mối quan hệ</Table.Th>
                      <Table.Th fw={600} fz="xs">Ngày sinh</Table.Th>
                      <Table.Th fw={600} fz="xs">Số điện thoại</Table.Th>
                      <Table.Th fw={600} fz="xs" ta="right"></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {familyMembers.map((fam) => (
                      <Table.Tr key={fam.id}>
                        <Table.Td fz="sm" fw={500}>{fam.name}</Table.Td>
                        <Table.Td fz="sm" c="dimmed">{fam.relationship}</Table.Td>
                        <Table.Td fz="sm" c="dimmed">{fam.dob}</Table.Td>
                        <Table.Td fz="sm">{fam.phone}</Table.Td>
                        <Table.Td ta="right">
                          <ActionIcon variant="subtle" color="gray" size="sm">
                            <IconDotsVertical size={16} />
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Card>
            </Grid.Col>

            {/* THẺ 5: Thông tin học vấn & Bằng cấp */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group justify="space-between" align="center" mb="md">
                  <Title order={5} fw={700} c="dark.9">Học vấn & Bằng cấp</Title>
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    size="sm"
                    color="gray"
                    onClick={() => handleOpenEdit("education")}
                    title="Chỉnh sửa"
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                </Group>

                <Timeline active={1} bulletSize={12} lineWidth={2} color="gray">
                  <Timeline.Item title={<Text fw={600} fz="sm">Đại học Khoa học Tự nhiên TP.HCM (Đại học)</Text>}>
                    <Text c="dimmed" fz="xs">Cử nhân Công nghệ Thông tin & Đồ họa số</Text>
                    <Text c="dimmed" fz="xs">Năm 2008 - 2012</Text>
                  </Timeline.Item>

                  <Timeline.Item title={<Text fw={600} fz="sm">Viện Công nghệ & Thiết kế Quốc tế (Sau Đại học)</Text>}>
                    <Text c="dimmed" fz="xs">Thạc sĩ Thiết kế Trải nghiệm Người dùng (UX Master)</Text>
                    <Text c="dimmed" fz="xs">Năm 2013 - 2015</Text>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Grid.Col>

            {/* THẺ 6: Kinh nghiệm làm việc */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group justify="space-between" align="center" mb="md">
                  <Title order={5} fw={700} c="dark.9">Kinh nghiệm làm việc</Title>
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    size="sm"
                    color="gray"
                    onClick={() => handleOpenEdit("experience")}
                    title="Chỉnh sửa"
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                </Group>

                <Timeline active={2} bulletSize={12} lineWidth={2} color="gray">
                  <Timeline.Item title={<Text fw={600} fz="sm">Chuyên viên Thiết kế UI/UX tại Zen Corporation</Text>}>
                    <Text c="dimmed" fz="xs">01/2013 - Hiện tại (5 năm 2 tháng)</Text>
                  </Timeline.Item>

                  <Timeline.Item title={<Text fw={600} fz="sm">Thiết kế Sản phẩm số tại Ron-tech</Text>}>
                    <Text c="dimmed" fz="xs">06/2011 - 12/2012 (1 năm 6 tháng)</Text>
                  </Timeline.Item>

                  <Timeline.Item title={<Text fw={600} fz="sm">Thiết kế Web tại Dalt Technology</Text>}>
                    <Text c="dimmed" fz="xs">01/2010 - 05/2011 (1 năm 4 tháng)</Text>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* TAB 2: DỰ ÁN THAM GIA */}
        <Tabs.Panel value="projects">
          <Card withBorder radius="lg" p="lg">
            <Group justify="space-between" align="center" mb="md">
              <Title order={4}>Dự án được phân công</Title>
              <Badge color="blue" size="md">3 Dự án đang hoạt động</Badge>
            </Group>
            <Table verticalSpacing="md" horizontalSpacing="md" striped highlightOnHover>
              <Table.Thead>
                <Table.Tr bg="gray.0">
                  <Table.Th fw={600} fz="sm">Tên dự án</Table.Th>
                  <Table.Th fw={600} fz="sm">Vai trò</Table.Th>
                  <Table.Th fw={600} fz="sm">Hạn chót</Table.Th>
                  <Table.Th fw={600} fz="sm">Trạng thái</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td fw={600} c="dark.9">HRMS Portal v2.0</Table.Td>
                  <Table.Td>Trưởng nhóm Thiết kế UI/UX</Table.Td>
                  <Table.Td>15/11/2026</Table.Td>
                  <Table.Td><Badge color="green" variant="light">Đang thực hiện</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={600} c="dark.9">Chuẩn hóa Design System Token</Table.Td>
                  <Table.Td>Chuyên gia Design System</Table.Td>
                  <Table.Td>30/10/2026</Table.Td>
                  <Table.Td><Badge color="indigo" variant="light">Đang review</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={600} c="dark.9">Ứng dụng di động Nhân viên (Mobile Hub)</Table.Td>
                  <Table.Td>Thiết kế Sản phẩm</Table.Td>
                  <Table.Td>20/12/2026</Table.Td>
                  <Table.Td><Badge color="blue" variant="light">Lên kế hoạch</Badge></Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
        </Tabs.Panel>

        {/* TAB 3: NGÂN HÀNG & PHÁP LÝ */}
        <Tabs.Panel value="bank">
          <Card withBorder radius="lg" p="lg">
            <Title order={4} mb="md">Thông tin Ngân hàng & Chế độ pháp lý</Title>
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p="md" radius="md">
                  <Text fw={600} fz="sm" mb="xs">Thông tin Thuế & Bảo hiểm xã hội</Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Mã số thuế cá nhân</Text>
                      <Text fz="sm" fw={500}>{profile.panNo}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Số sổ Bảo hiểm xã hội</Text>
                      <Text fz="sm" fw={500}>BHXH-79182910</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Loại hợp đồng lao động</Text>
                      <Text fz="sm" fw={500}>HĐLĐ-2013-001 (Không xác định thời hạn)</Text>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p="md" radius="md">
                  <Text fw={600} fz="sm" mb="xs">Tài khoản chi trả lương</Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Tên ngân hàng</Text>
                      <Text fz="sm" fw={500}>{profile.bankName}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Số tài khoản nhận lương</Text>
                      <Text fz="sm" fw={500}>{profile.bankAccountNo}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text fz="sm" c="dimmed">Chi nhánh ngân hàng</Text>
                      <Text fz="sm" fw={500}>{profile.ifscCode}</Text>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* MODAL CẬP NHẬT THÔNG TIN */}
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title={<Text fw={600} fz="lg">Cập nhật {getSectionTitle(editSection)}</Text>}
        size="md"
        radius="md"
      >
        <form onSubmit={handleSaveEdit}>
          <Stack gap="md">
            {editSection === "contact" && (
              <>
                <TextInput
                  label="Số điện thoại"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.currentTarget.value })}
                />
                <TextInput
                  label="Email liên hệ"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.currentTarget.value })}
                />
                <TextInput
                  label="Địa chỉ cư trú"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.currentTarget.value })}
                />
              </>
            )}

            {editSection === "personal" && (
              <>
                <TextInput
                  label="Số CCCD / Hộ chiếu"
                  value={editFormData.passportNo}
                  onChange={(e) => setEditFormData({ ...editFormData, passportNo: e.currentTarget.value })}
                />
                <TextInput
                  label="Điện thoại liên hệ"
                  value={editFormData.tel}
                  onChange={(e) => setEditFormData({ ...editFormData, tel: e.currentTarget.value })}
                />
                <TextInput
                  label="Quốc tịch"
                  value={editFormData.nationality}
                  onChange={(e) => setEditFormData({ ...editFormData, nationality: e.currentTarget.value })}
                />
                <TextInput
                  label="Tình trạng hôn nhân"
                  value={editFormData.maritalStatus}
                  onChange={(e) => setEditFormData({ ...editFormData, maritalStatus: e.currentTarget.value })}
                />
                <TextInput
                  label="Số con"
                  value={editFormData.noOfChildren}
                  onChange={(e) => setEditFormData({ ...editFormData, noOfChildren: e.currentTarget.value })}
                />
              </>
            )}

            {editSection === "emergency" && (
              <>
                <TextInput
                  label="Tên người liên hệ chính"
                  value={editFormData.primaryEmergencyName}
                  onChange={(e) => setEditFormData({ ...editFormData, primaryEmergencyName: e.currentTarget.value })}
                />
                <TextInput
                  label="Mối quan hệ"
                  value={editFormData.primaryEmergencyRelation}
                  onChange={(e) => setEditFormData({ ...editFormData, primaryEmergencyRelation: e.currentTarget.value })}
                />
                <TextInput
                  label="Số điện thoại"
                  value={editFormData.primaryEmergencyPhone}
                  onChange={(e) => setEditFormData({ ...editFormData, primaryEmergencyPhone: e.currentTarget.value })}
                />
              </>
            )}

            {editSection === "bank" && (
              <>
                <TextInput
                  label="Tên ngân hàng"
                  value={editFormData.bankName}
                  onChange={(e) => setEditFormData({ ...editFormData, bankName: e.currentTarget.value })}
                />
                <TextInput
                  label="Số tài khoản"
                  value={editFormData.bankAccountNo}
                  onChange={(e) => setEditFormData({ ...editFormData, bankAccountNo: e.currentTarget.value })}
                />
                <TextInput
                  label="Mã chi nhánh / Swift Code"
                  value={editFormData.ifscCode}
                  onChange={(e) => setEditFormData({ ...editFormData, ifscCode: e.currentTarget.value })}
                />
                <TextInput
                  label="Mã số thuế cá nhân"
                  value={editFormData.panNo}
                  onChange={(e) => setEditFormData({ ...editFormData, panNo: e.currentTarget.value })}
                />
              </>
            )}

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={() => setEditModalOpened(false)}>Hủy</Button>
              <Button type="submit" color="blue" leftSection={<IconCheck size={16} />}>Lưu thay đổi</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
