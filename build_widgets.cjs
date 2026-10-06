const fs = require('fs');
const path = require('path');

const WIDGETS_DIR = path.join(__dirname, 'src/features/dashboard/widgets');
fs.mkdirSync(WIDGETS_DIR, { recursive: true });

const files = {
  'PersonalStatsWidget.tsx': `import React from "react";
import { Card, Text, Group, Stack, RingProgress, ThemeIcon, Box } from "@mantine/core";
import { Icon } from "../../../components/UI";

export function PersonalStatsWidget() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={600}>Cá nhân & Chấm công</Text>
          <ThemeIcon variant="light" color="blue" size="sm">
            <Icon name="user" size={14} />
          </ThemeIcon>
        </Group>
      </Card.Section>
      <Group mt="md" grow>
        <Box ta="center">
          <RingProgress
            size={80}
            thickness={8}
            roundCaps
            sections={[{ value: 85, color: 'blue' }]}
            label={<Text ta="center" fw={700}>85%</Text>}
          />
          <Text size="xs" c="dimmed" mt={4}>Tỷ lệ đi làm</Text>
        </Box>
        <Stack gap={4}>
          <Text size="sm" fw={500}>Phép năm: 12 ngày</Text>
          <Text size="sm" fw={500} c="green">Đã dùng: 2 ngày</Text>
          <Text size="sm" fw={500} c="blue">Còn lại: 10 ngày</Text>
        </Stack>
      </Group>
    </Card>
  );
}
`,

  'QuickActionsWidget.tsx': `import React from "react";
import { Card, Text, Group, Button, Stack } from "@mantine/core";
import { Icon } from "../../../components/UI";

export function QuickActionsWidget() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={600}>Thao tác nhanh</Text>
          <Icon name="sparkles" size={16} />
        </Group>
      </Card.Section>
      <Stack mt="md" gap="sm">
        <Button variant="light" color="blue" fullWidth leftSection={<Icon name="calendar" size={16} />}>
          Xin nghỉ phép
        </Button>
        <Button variant="light" color="teal" fullWidth leftSection={<Icon name="laptop" size={16} />}>
          Đăng ký WFH
        </Button>
        <Button variant="light" color="orange" fullWidth leftSection={<Icon name="receipt" size={16} />}>
          Yêu cầu chi phí
        </Button>
      </Stack>
    </Card>
  );
}
`,

  'ApprovalQueueWidget.tsx': `import React from "react";
import { Card, Text, Group, Badge, Stack, Button, ThemeIcon } from "@mantine/core";
import { Icon } from "../../../components/UI";

export function ApprovalQueueWidget() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={600}>Hàng đợi Phê duyệt</Text>
          <Badge color="red" variant="filled">8 Yêu cầu mới</Badge>
        </Group>
      </Card.Section>
      <Stack mt="md" gap="md">
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <ThemeIcon color="orange" variant="light" radius="xl" size="lg">
              <Icon name="calendar" size={18} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={600}>Nguyễn Văn A (Phép năm)</Text>
              <Text size="xs" c="dimmed">Từ 10/10 đến 12/10</Text>
            </div>
          </Group>
          <Group gap="xs">
            <Button size="xs" variant="outline" color="red">Từ chối</Button>
            <Button size="xs" color="green">Duyệt</Button>
          </Group>
        </Group>

        <Group justify="space-between" align="center">
          <Group gap="sm">
            <ThemeIcon color="blue" variant="light" radius="xl" size="lg">
              <Icon name="laptop" size={18} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={600}>Trần Thị B (WFH)</Text>
              <Text size="xs" c="dimmed">Ngày 11/10</Text>
            </div>
          </Group>
          <Group gap="xs">
            <Button size="xs" variant="outline" color="red">Từ chối</Button>
            <Button size="xs" color="green">Duyệt</Button>
          </Group>
        </Group>
      </Stack>
      <Button variant="subtle" fullWidth mt="md" size="sm">Xem tất cả phê duyệt</Button>
    </Card>
  );
}
`,

  'HrAnalyticsWidget.tsx': `import React from "react";
import { Card, Text, Group, Stack, Progress, ThemeIcon } from "@mantine/core";
import { Icon } from "../../../components/UI";

export function HrAnalyticsWidget() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={600}>Tổng quan Nhân sự</Text>
          <ThemeIcon variant="light" color="grape" size="sm">
            <Icon name="users" size={14} />
          </ThemeIcon>
        </Group>
      </Card.Section>
      <Stack mt="md" gap="sm">
        <div>
          <Group justify="space-between" mb={4}>
            <Text size="xs" fw={500}>Hiện diện hôm nay (142/150)</Text>
            <Text size="xs" fw={700}>95%</Text>
          </Group>
          <Progress value={95} color="green" />
        </div>
        <div>
          <Group justify="space-between" mb={4}>
            <Text size="xs" fw={500}>Nghỉ phép (5 người)</Text>
            <Text size="xs" fw={700}>3%</Text>
          </Group>
          <Progress value={3} color="orange" />
        </div>
        <div>
          <Group justify="space-between" mb={4}>
            <Text size="xs" fw={500}>WFH (3 người)</Text>
            <Text size="xs" fw={700}>2%</Text>
          </Group>
          <Progress value={2} color="blue" />
        </div>
      </Stack>
    </Card>
  );
}
`,
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(WIDGETS_DIR, filename), content);
}
console.log("Widgets created.");
