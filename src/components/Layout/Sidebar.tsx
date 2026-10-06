import React from "react";
import logo from "../../imports/oHRiise_icon.png";
import { Icon } from "../UI";
import { Page, UserProfilePermissions } from "../../types";
import { coreNavigation, getDynamicNavigation, profileNavigation, aiNavigation } from "../../config/navigation";
import { NavLink, Box, Stack, Group, Avatar, Text, ScrollArea, Badge, Title, ThemeIcon, Divider, UnstyledButton } from "@mantine/core";

interface SidebarProps {
  page: Page;
  setPage: (p: Page) => void;
  currentProfile: UserProfilePermissions;
  adminTab?: any; // kept for compatibility if needed
  setAdminTab?: any;
}

export function Sidebar({ page, setPage, currentProfile }: SidebarProps) {
  const perms = currentProfile.permissions;

  // --- Dynamic standard user navigation based on roles/features ---
  const userCoreNav = [...coreNavigation];
  const dynamicNav = getDynamicNavigation(perms);

  return (
    <Box h="100%" bg="white" display="flex" style={{ flexDirection: 'column' }}>
      <Group p="md" align="center" gap="sm">
        <Box w={32} h={32} style={{ borderRadius: 8, overflow: 'hidden', background: '#0052FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="oHRiise" style={{ width: 24, height: 24 }} />
        </Box>
        <Box>
          <Text fw={700} fz="lg" lh={1.1}>oHRiise</Text>
          <Text fz="xs" c="dimmed">People rise together</Text>
        </Box>
      </Group>

      <ScrollArea flex={1} px="md" py="xs">
        <Stack gap="xs">
          <Text fz="xs" fw={600} c="dimmed" mt="xs">CÔNG VIỆC CỦA TÔI</Text>
          {userCoreNav.map((item) => (
            <NavLink
              key={item.page}
              active={page === item.page}
              onClick={() => setPage(item.page as Page)}
              label={<Text fw={500} size="sm">{item.label}</Text>}
              leftSection={<Icon name={item.icon} />}
              style={{ borderRadius: 8 }}
            />
          ))}

          {dynamicNav.length > 0 && (
            <>
              <Divider my="sm" />
              <Text fz="xs" fw={600} c="dimmed">QUẢN LÝ & ĐIỀU HÀNH</Text>
              {dynamicNav.map((item) => (
                <NavLink
                  key={item.page}
                  active={page === item.page}
                  onClick={() => setPage(item.page as Page)}
                  label={<Text fw={500} size="sm">{item.label}</Text>}
                  leftSection={<Icon name={item.icon} />}
                  rightSection={item.badge ? <Badge size="sm" circle color="red">{item.badge}</Badge> : null}
                  style={{ borderRadius: 8 }}
                />
              ))}
            </>
          )}

          <Divider my="sm" />
          <Text fz="xs" fw={600} c="dimmed">HỒ SƠ CÁ NHÂN</Text>
          {profileNavigation.map((item) => (
            <NavLink
              key={item.page}
              active={page === item.page}
              onClick={() => setPage(item.page as Page)}
              label={<Text fw={500} size="sm">{item.label}</Text>}
              leftSection={<Icon name={item.icon} />}
              style={{ borderRadius: 8 }}
            />
          ))}

          <Divider my="sm" />
          <Text fz="xs" fw={600} c="dimmed">AI THÔNG MINH</Text>
          {aiNavigation.map((item) => (
            <NavLink
              key={item.page}
              active={page === item.page}
              onClick={() => setPage(item.page as Page)}
              label={<Text fw={500} size="sm">{item.label}</Text>}
              leftSection={<Icon name={item.icon} />}
              style={{ borderRadius: 8 }}
              color="grape"
              variant="light"
            />
          ))}
        </Stack>
      </ScrollArea>

      <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
        <UnstyledButton w="100%" onClick={() => setPage("profile")} p="xs" style={{ borderRadius: 8, transition: 'background-color 0.2s', '&:hover': { backgroundColor: 'var(--mantine-color-gray-1)' } }}>
          <Group wrap="nowrap" gap="sm">
            <Avatar color={currentProfile.avatarColor || "blue"} radius="xl" size="md">
              {currentProfile.initials}
            </Avatar>
            <Box style={{ flex: 1 }}>
              <Text size="sm" fw={600}>{currentProfile.name}</Text>
              <Text size="xs" c="dimmed" truncate>{currentProfile.title}</Text>
            </Box>
            <Icon name="more" />
          </Group>
        </UnstyledButton>
      </Box>
    </Box>
  );
}
