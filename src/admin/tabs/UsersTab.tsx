import React, { useState } from "react";
import { UserAcc, DeptData, BranchData, PermissionTemplate } from "../types";

interface UsersTabProps {
  users: UserAcc[];
  setUsers: React.Dispatch<React.SetStateAction<UserAcc[]>>;
  depts: DeptData[];
  branches: BranchData[];
  templates: PermissionTemplate[];
  offboardingQueue: [string, string, string][];
  setOffboardingQueue: React.Dispatch<React.SetStateAction<[string, string, string][]>>;
  openModal: (content: React.ReactNode, wide?: boolean) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
}

export function UsersTab({
  users,
  setUsers,
  depts,
  branches,
  templates,
  offboardingQueue,
  setOffboardingQueue,
  openModal,
  closeModal,
  showToast,
}: UsersTabProps) {
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("");
  const [userDeptFilter, setUserDeptFilter] = useState("");
  const [userPage, setUserPage] = useState(0);

  const getTemplate = (id: string) =>
    templates.find((t) => t.id === id) || { n: "Mặc định" };

  const filteredUsers = users
    .map((u, i) => ({ u, i }))
    .filter(({ u }) => {
      if (userSearchQuery.trim()) {
        const q = userSearchQuery.toLowerCase();
        if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (userRoleFilter && u.role !== userRoleFilter) return false;
      if (userDeptFilter && u.deptCode !== userDeptFilter) return false;
      return true;
    });

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE) || 1;
  const currentPageUsers = filteredUsers.slice(userPage * PAGE_SIZE, (userPage + 1) * PAGE_SIZE);

  const openUserDetailModal = (index: number) => {
    const user = users[index];
    if (!user) return;

    openModal(
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 text-white font-bold flex items-center justify-center text-lg shadow-md">
            {user.name.split(" ").pop()?.[0]}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 block">Phòng ban</span>
            <b className="text-slate-800">{depts.find((d) => d.code === user.deptCode)?.name || user.deptCode}</b>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 block">Chi nhánh</span>
            <b className="text-slate-800">{user.branch}</b>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 block">Vai trò</span>
            <b className="text-blue-600">{user.role}</b>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 block">Trạng thái</span>
            <b className={user.active ? "text-emerald-600" : "text-rose-600"}>
              {user.active ? "Đang hoạt động" : "Vô hiệu hóa"}
            </b>
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-2">
          <button
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
              user.active ? "bg-rose-50 text-rose-600 hover:bg-rose-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            }`}
            onClick={() => {
              setUsers((prev) =>
                prev.map((item, idx) => (idx === index ? { ...item, active: item.active ? 0 : 1 } : item))
              );
              closeModal();
              showToast(`Đã ${user.active ? "khóa" : "kích hoạt lại"} tài khoản ${user.name}`);
            }}
          >
            {user.active ? "Khóa tài khoản" : "Kích hoạt lại"}
          </button>
          <button
            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700"
            onClick={() => {
              closeModal();
              showToast(`Đã gửi mail hướng dẫn đặt lại mật khẩu tới ${user.email}`);
            }}
          >
            Đặt lại mật khẩu
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Offboarding Queue Warning Banner */}
      {offboardingQueue.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-amber-900">
            Cần khóa tài khoản sau khi hoàn tất Offboarding ({offboardingQueue.length})
          </h3>
          <div className="space-y-2">
            {offboardingQueue.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-white border border-amber-100 rounded-xl text-xs shadow-xs"
              >
                <div>
                  <b className="text-slate-800">{item[0]}</b> · {item[1]}
                  <span className="text-slate-400 block">{item[2]}</span>
                </div>
                <button
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition"
                  onClick={() => {
                    setOffboardingQueue((prev) => prev.filter((_, i) => i !== idx));
                    showToast(`Đã thu hồi quyền & khóa tài khoản ${item[0]}`);
                  }}
                >
                  Khóa tài khoản ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Management Toolbar & Table */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:bg-white focus:border-blue-500 outline-none max-w-xs transition"
            placeholder="Tìm theo tên hoặc email..."
            value={userSearchQuery}
            onChange={(e) => {
              setUserSearchQuery(e.target.value);
              setUserPage(0);
            }}
          />
          <select
            className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:bg-white outline-none transition"
            value={userRoleFilter}
            onChange={(e) => {
              setUserRoleFilter(e.target.value);
              setUserPage(0);
            }}
          >
            <option value="">Tất cả Vai trò</option>
            <option value="HR">HR</option>
            <option value="Employee">Employee</option>
          </select>
          <select
            className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-900 focus:bg-white outline-none transition"
            value={userDeptFilter}
            onChange={(e) => {
              setUserDeptFilter(e.target.value);
              setUserPage(0);
            }}
          >
            <option value="">Tất cả Phòng ban</option>
            {depts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
          <div className="flex-1" />
          <button
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition shadow-xs"
            onClick={() => showToast("Đã xuất danh sách tài khoản dạng file CSV")}
          >
            Xuất CSV
          </button>
          <button
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition shadow-xs"
            onClick={() => {
              let csvText =
                "Trần Thu Trang,KT,HCM-Q1,Employee\nLê Văn Cường,IT,HN-CG,Employee\nPhạm Mai,XX,HCM-Q1,Employee\nNguyễn Thu Hà,NS,HCM-Q1,HR";
              openModal(
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Import tài khoản từ danh sách CSV</h3>
                  <p className="text-xs text-slate-500">Cú pháp: Họ tên, Mã phòng ban, Chi nhánh, Role</p>
                  <textarea
                    className="w-full h-32 px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono bg-slate-50 text-slate-900 focus:bg-white outline-none"
                    defaultValue={csvText}
                    onChange={(e) => (csvText = e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg"
                      onClick={closeModal}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
                      onClick={() => {
                        showToast("Đã kiểm tra và import thành công danh sách tài khoản hợp lệ");
                        closeModal();
                      }}
                    >
                      Tiến hành Import
                    </button>
                  </div>
                </div>,
                true
              );
            }}
          >
            Import hàng loạt
          </button>
          <button
            className="px-3.5 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-xl transition shadow-xs"
            onClick={() => {
              let uName = "";
              let uDept = depts[0].code;
              let uRole: "HR" | "Employee" = "Employee";
              let uBranch = branches[0].code;
              let uTemp = templates[0].id;
              openModal(
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Tạo tài khoản người dùng mới</h3>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Họ và tên</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white outline-none"
                      placeholder="Nhập họ tên đầy đủ..."
                      onChange={(e) => (uName = e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Phòng ban</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 focus:bg-white outline-none"
                        onChange={(e) => (uDept = e.target.value)}
                      >
                        {depts.map((d) => (
                          <option key={d.code} value={d.code}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Chi nhánh</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 focus:bg-white outline-none"
                        onChange={(e) => (uBranch = e.target.value)}
                      >
                        {branches.map((b) => (
                          <option key={b.code} value={b.code}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Vai trò (Role)</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 focus:bg-white outline-none"
                        onChange={(e) => (uRole = e.target.value as "HR" | "Employee")}
                      >
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Template quyền HR</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-900 focus:bg-white outline-none"
                        onChange={(e) => (uTemp = e.target.value)}
                      >
                        {templates.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg"
                      onClick={closeModal}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-xs font-semibold rounded-lg transition shadow-xs"
                      onClick={() => {
                        if (!uName.trim()) {
                          showToast("Vui lòng nhập họ tên người dùng");
                          return;
                        }
                        const email = `${uName
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/đ/g, "d")
                          .replace(/\s+/g, ".")}@ohriise.vn`;

                        setUsers((prev) => [
                          {
                            name: uName,
                            email,
                            role: uRole,
                            branch: uBranch,
                            active: 1,
                            lastLogin: "Vừa khởi tạo",
                            deptCode: uDept,
                            jobTitle: "Chuyên viên",
                            templateId: uRole === "HR" ? uTemp : "",
                          },
                          ...prev,
                        ]);
                        closeModal();
                        showToast(`Đã tạo tài khoản ${uName} (${email}) thành công`);
                      }}
                    >
                      Tạo tài khoản
                    </button>
                  </div>
                </div>
              );
            }}
          >
            + Tạo tài khoản
          </button>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Người dùng</th>
                <th className="py-3 px-4">Phòng ban - Chức danh</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Đăng nhập cuối</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {currentPageUsers.map(({ u, i }) => {
                const deptObj = depts.find((d) => d.code === u.deptCode);
                const tempObj = getTemplate(u.templateId);

                return (
                  <tr key={i} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                          {u.name.split(" ").pop()?.[0]}
                        </div>
                        <div>
                          <b className="text-slate-900 block font-bold text-xs">{u.name}</b>
                          <span className="text-[11px] text-slate-400 block">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <b className="text-slate-800 block text-xs">{deptObj?.name || u.deptCode}</b>
                      <span className="text-[11px] text-slate-400 block">{u.jobTitle || "Chuyên viên"}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.role === "HR" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {u.role}
                      </span>
                      {u.role === "HR" && tempObj && (
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {tempObj.n}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{u.lastLogin}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {u.active ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold rounded-lg transition shadow-xs"
                        onClick={() => openUserDetailModal(i)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <span>
            Hiển thị {currentPageUsers.length} trên tổng số {filteredUsers.length} tài khoản
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={userPage === 0}
              className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 disabled:opacity-40 text-slate-700 font-semibold rounded-lg transition shadow-xs"
              onClick={() => setUserPage((p) => Math.max(0, p - 1))}
            >
              Trang trước
            </button>
            <span className="font-semibold text-slate-700">
              {userPage + 1} / {totalPages}
            </span>
            <button
              disabled={userPage >= totalPages - 1}
              className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 disabled:opacity-40 text-slate-700 font-semibold rounded-lg transition shadow-xs"
              onClick={() => setUserPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
