import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemProps {
  icon: LucideIcon;
  text: string;
  desc: string;
  from: string;
  to: string;
}
export default function DashboardCard({
  icon: Icon,
  text,
  desc,
  from,
  to,
}: ItemProps) {
  return (
    <div
      className={cn("border-2 p-4 rounded-xl w-72 bg-linear-to-r", from, to)}
    >
      <div className="text-2xl font-semibold text-white">{text}</div>
      <div className="flex items-center justify-between">
        <Icon
          color="grey"
          width={80}
          height={80}
          className="-mb-4 -ml-4 opacity-70 -rotate-30"
        />
        <span className="text-3xl font-semibold text-white">{desc}</span>
      </div>
    </div>
  );
}
