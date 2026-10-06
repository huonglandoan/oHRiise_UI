import React from "react";
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
