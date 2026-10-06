import React from "react";
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
