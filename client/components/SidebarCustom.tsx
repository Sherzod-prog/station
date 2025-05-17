"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  ClipboardPlusIcon,
  FolderClosedIcon,
  LayoutDashboard,
  LogOutIcon,
  ShoppingCart,
  Store,
  UsersRoundIcon,
} from "lucide-react";
import Item from "./SidebarItem";
import axios from "axios";
import { Button } from "./ui/button";

const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tijorat",
    url: "store",
    icon: Store,
  },
  {
    title: "Tovar",
    url: "product",
    icon: ClipboardCheck,
  },
  {
    title: "Sotuv",
    url: "sale",
    icon: ShoppingCart,
  },
  {
    title: "Xarajatlar",
    url: "expense",
    icon: FolderClosedIcon,
  },
  {
    title: "Xodimlar",
    url: "employees",
    icon: UsersRoundIcon,
  },
  {
    title: "Hisobot",
    url: "reports",
    icon: ClipboardPlusIcon,
  },
];

const Sidebar = () => {
  const logOut = () => {
    const res = axios
      .post("http://localhost:5000/auth/logout")
      .then((res) => alert(res.data.message))
      .finally(() => localStorage.removeItem("token"));
    return res;
  };
  return (
    <div className="w-fit px-2 left-0 bg-[#eeeeee] dark:bg-[#1f1f1f] rounded-2xl">
      <div className="flex flex-col p-2 gap-96">
        <div className="flex flex-col space-y-8 mt-2">
          {items.map((link) => (
            <Link href={link.url} key={link.url}>
              <Item icon={link.icon} label={link.title} path={link.title} />
            </Link>
          ))}
        </div>
        <div className="mt-14 border-t-2 py-2">
          <Link onClick={() => logOut()} href="auth/register">
            <Item icon={LogOutIcon} label="Exit" path="auth" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
