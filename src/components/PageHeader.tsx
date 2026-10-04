import React from "react";
import { Icon, IconName } from "./UI";

interface PageHeaderProps {
  group: string;
  title: string;
  description: string;
  icon: IconName;
  rightContent?: React.ReactNode;
}

export function PageHeader({ group, title, description, icon, rightContent }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white border border-[#e5eaf0] rounded-2xl shadow-xs">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#1267e8] font-semibold mb-1 tracking-wide">
          <span>{group}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-[#e8f1ff] text-[#1267e8] border border-[#1267e8]/15 flex items-center justify-center">
            <Icon name={icon} size={20} />
          </span>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#10213a] flex items-center gap-2 m-0">
              <span>{title}</span>
            </h1>
            <p className="text-xs text-[#64748b] mt-0.5 font-normal m-0">{description}</p>
          </div>
        </div>
      </div>

      {rightContent && (
        <div className="flex items-center gap-3">
          {rightContent}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
