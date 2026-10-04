import React from "react";

export type AdminTab =
  | "dash"
  | "br"
  | "org"
  | "us"
  | "pm"
  | "tp"
  | "dg"
  | "rv"
  | "nt"
  | "st"
  | "em"
  | "sy"
  | "lg"
  | "ai";

export interface NavItem {
  id: AdminTab;
  label: string;
  sub: string;
  icon: string;
  group: string;
  badgeKey?: "users" | "alerts" | "notif" | "dlp" | "duals";
}

export interface PermissionTemplate {
  id: string;
  n: string; // Name
  d: string; // Desc
  s: string; // Scope ('Toàn công ty' | 'Chi nhánh')
  p: number[][]; // 14x5 Matrix
  f: number[]; // 5-element sensitive visibility array
  sys: number; // 1 = system, 0 = custom
}

export interface BranchData {
  code: string;
  name: string;
  address: string;
  radius: number;
  empCount: number;
  active: number;
}

export interface DeptData {
  code: string;
  name: string;
  manager: string;
  count: number;
  titlesStr: string;
}

export interface UserAcc {
  name: string;
  email: string;
  role: "HR" | "Employee";
  branch: string;
  active: number;
  lastLogin: string;
  deptCode: string;
  jobTitle: string;
  templateId: string;
}

export interface AuditLogItem {
  time: string;
  user: string;
  action: string;
  type: "ok" | "w" | "e";
}

export interface AlertItem {
  type: "e" | "w" | "i";
  title: string;
  subtitle: string;
  time: string;
}

export interface DelegationItem {
  delegator: string;
  delegatee: string;
  feature: string;
  startDate: string;
  endDate: string;
}

export interface ApprovalRuleItem {
  feature: string;
  field: string;
  operator: string;
  val: number | string;
  approverRole: string;
  overflowRule: string;
  active: number;
}

export interface NotificationItem {
  cat: string;
  type: "e" | "w" | "i";
  title: string;
  time: string;
  processed: number;
}

export interface SessionItem {
  user: string;
  device: string;
  ip: string;
  time: string;
  status: string;
}
