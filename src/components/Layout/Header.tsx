import React from "react";
import { Group, TextInput, ActionIcon, Select, Avatar, Text, Indicator, Kbd, Box } from "@mantine/core";
import { IconSearch, IconBell, IconLogout, IconMenu2 } from "@tabler/icons-react";
import { UserProfilePermissions } from "../../types";

interface HeaderProps {
  profileKey: string;
  setProfileKey: (pk: string) => void;
  profiles: Record<string, UserProfilePermissions>;
  onMenu: () => void;
  onNotifications: () => void;
  onLogout: () => void;
}

export function Header({
  profileKey,
  setProfileKey,
  profiles,
  onMenu,
  onNotifications,
  onLogout,
}: HeaderProps) {
  const activeProfile = profiles[profileKey] || profiles.emp_standard;

  return (
    <Group h="100%" px="md" justify="space-between" bg="white" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
      <Group gap="sm">
        <ActionIcon variant="subtle" color="gray" onClick={onMenu} hiddenFrom="sm">
          <IconMenu2 size={20} />
        </ActionIcon>
        
        <TextInput
          placeholder="Tìm nhân viên, yêu cầu, tài liệu..."
          leftSection={<IconSearch size={16} />}
          rightSectionWidth={60}
          rightSection={<Kbd size="xs">⌘ K</Kbd>}
          w={{ base: 200, sm: 300, md: 400 }}
          radius="md"
        />
      </Group>

      <Group gap="md" align="center">
        <Group gap="xs" visibleFrom="sm">
          <Text size="sm" fw={500} c="dimmed">Tập quyền Động:</Text>
          <Select
            value={profileKey}
            onChange={(val) => val && setProfileKey(val)}
            data={Object.values(profiles).map(p => ({ value: p.id, label: `${p.name} (${p.customRoleName})` }))}
            w={250}
            radius="md"
            size="sm"
          />
        </Group>

        <Indicator inline label={3} size={16} offset={4} color="red">
          <ActionIcon variant="light" radius="xl" size="lg" onClick={onNotifications}>
            <IconBell size={20} />
          </ActionIcon>
        </Indicator>

        <Avatar color={activeProfile.avatarColor || "blue"} radius="xl" size="md">
          {activeProfile.initials}
        </Avatar>

        <ActionIcon variant="subtle" color="red" radius="xl" size="lg" onClick={onLogout} visibleFrom="sm">
          <IconLogout size={20} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
