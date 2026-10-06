import { useState } from "react";
import logo from "../imports/oHRiise_icon.png";
import { Icon } from "../components/UI";
import { DYNAMIC_PROFILES } from "../types";
import { Box, Grid, Paper, Stack, Text, Title, TextInput, PasswordInput, Checkbox, Button, Divider, UnstyledButton, Group, Avatar, Anchor } from "@mantine/core";

export default function LoginPage({ onLogin }: { onLogin: (profileKey: string) => void }) {
  const [selected, setSelected] = useState<string>("emp_standard");

  return (
    <Box className="min-h-screen bg-gray-50 flex">
      <Grid gutter={0} className="w-full flex-1 m-0">
        <Grid.Col span={{ base: 12, md: 5 }} className="bg-blue-600 p-12 text-white flex flex-col justify-between hidden md:flex">
          <Box>
            <Group gap="sm" mb="xl">
              <img src={logo} alt="oHRiise" className="w-10 h-10 rounded-lg bg-white p-1" />
              <Box>
                <Text fw={700} size="xl">oHRiise</Text>
                <Text size="sm" opacity={0.8}>People rise together</Text>
              </Box>
            </Group>
            
            <Box mt={120}>
              <Text size="sm" fw={600} opacity={0.8} mb="sm">NỀN TẢNG NHÂN SỰ HỢP NHẤT</Text>
              <Title order={1} size="h1" fw={800} lh={1.2}>
                Mỗi ngày làm việc,
                <br />
                <Text component="span" fs="italic" opacity={0.9}>một bước tiến lên.</Text>
              </Title>
              <Text mt="lg" size="lg" opacity={0.9} maw={400}>
                Một trải nghiệm liền mạch cho nhân viên, quản lý và HR trong tổ chức hybrid hiện đại.
              </Text>
            </Box>
          </Box>
          
          <Group gap="sm" opacity={0.8}>
            <Icon name="shield" />
            <Text size="sm">Dữ liệu nhân sự được bảo vệ theo ủy quyền chức năng cá nhân.</Text>
          </Group>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }} className="flex items-center justify-center p-8 bg-white">
          <Box maw={460} w="100%">
            <Stack gap="xl">
              <Box>
                <Text c="dimmed" size="sm" fw={600}>CHÀO MỪNG TRỞ LẠI</Text>
                <Title order={2} size="h2" fw={700}>Đăng nhập vào oHRiise</Title>
                <Text c="dimmed" size="sm" mt="xs">Tiếp tục ngày làm việc của bạn.</Text>
              </Box>

              <form onSubmit={(e) => { e.preventDefault(); onLogin(selected); }}>
                <Stack gap="md">
                  <TextInput
                    label="Email / Tài khoản"
                    defaultValue="minhanh@ohriise.vn"
                    size="md"
                  />
                  <PasswordInput
                    label="Mật khẩu"
                    defaultValue="password"
                    size="md"
                  />
                  
                  <Group justify="space-between" mt="sm">
                    <Checkbox label="Ghi nhớ đăng nhập" defaultChecked />
                    <Anchor component="button" type="button" size="sm">Quên mật khẩu?</Anchor>
                  </Group>

                  <Button type="submit" size="md" mt="xl" fullWidth color="blue.6">
                    Đăng nhập
                  </Button>
                </Stack>

                <Divider my="xl" label="CHẾ ĐỘ THỬ TẬP QUYỀN ĐỘNG" labelPosition="center" />
                <Text size="sm" c="dimmed" ta="center" mb="md">
                  Chọn tài khoản nhân viên để trải nghiệm tập quyền đã được ủy quyền
                </Text>

                <Stack gap="xs">
                  {Object.values(DYNAMIC_PROFILES).map((p) => (
                    <UnstyledButton
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selected === p.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Group justify="space-between">
                        <Group gap="sm">
                          <Avatar color="blue" radius="xl">{p.initials}</Avatar>
                          <Box>
                            <Text size="sm" fw={600}>{p.name}</Text>
                            <Text size="xs" c="dimmed">{p.customRoleName}</Text>
                          </Box>
                        </Group>
                        {selected === p.id && <Icon name="check" />}
                      </Group>
                    </UnstyledButton>
                  ))}
                </Stack>
              </form>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
