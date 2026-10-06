import React from "react";
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
