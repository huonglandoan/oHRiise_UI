import React from "react";
import { Grid, Container, Title, Text, Box } from "@mantine/core";
import { Page, UserProfilePermissions } from "../../types";

import { PersonalStatsWidget } from "./widgets/PersonalStatsWidget";
import { QuickActionsWidget } from "./widgets/QuickActionsWidget";
import { ApprovalQueueWidget } from "./widgets/ApprovalQueueWidget";
import { HrAnalyticsWidget } from "./widgets/HrAnalyticsWidget";

interface DashboardProps {
  personName: string;
  currentProfile?: UserProfilePermissions;
}

export default function DynamicDashboard({
  personName,
  currentProfile,
}: DashboardProps) {
  const profile = currentProfile || {
    id: "emp_standard",
    name: personName,
    initials: "U",
    title: "Employee",
    permissions: {
      canApproveRequests: false,
      canMonitorAttendanceLive: false,
      canManageEmployees: false,
      canManageRecruitment: false,
      canManagePayroll: false,
      canViewAnalytics: false,
      canManagePolicies: false,
      canManageAdmin: false,
    },
  };
  const perms = profile.permissions;

  return (
    <Container fluid p="xl" bg="#f8fafc" style={{ minHeight: "100vh" }}>
      <Box mb="xl">
        <Title order={2} c="dark.6">Xin chào, {profile.name}!</Title>
        <Text c="dimmed">Bảng điều khiển cá nhân hóa dựa trên quyền hạn của bạn.</Text>
      </Box>

      <Grid>
        {/* ROW 1: Common Widgets for everyone */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <PersonalStatsWidget />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <QuickActionsWidget />
        </Grid.Col>

        {/* ROW 2: Dynamic Widgets based on Permissions */}
        {perms.canApproveRequests && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ApprovalQueueWidget />
          </Grid.Col>
        )}
        
        {perms.canViewAnalytics && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <HrAnalyticsWidget />
          </Grid.Col>
        )}

        {/* More widgets can be added conditionally here... */}
        
        {perms.canManageAdmin && (
          <Grid.Col span={12}>
            <Box mt="md" p="xl" bg="dark.7" c="white" style={{ borderRadius: 12 }}>
              <Title order={3}>SYSTEM ADMIN & GOVERNANCE</Title>
              <Text mt="xs">Chào {profile.name}. Giám sát cụm máy chủ, phiên làm việc, phân quyền RBAC và chứng thư bảo mật.</Text>
            </Box>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
