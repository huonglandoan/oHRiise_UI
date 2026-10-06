import React from "react";
import { Card, Text, Group, Badge, Stack, Button, ThemeIcon } from "@mantine/core";
import { Icon } from "../../../components/UI";

export function ApprovalQueueWidget() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={600}>Hàng đợi Phê duyệt</Text>
          <Badge color="red" variant="filled" style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>8 Yêu cầu mới</Badge>
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
