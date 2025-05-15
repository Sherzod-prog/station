import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { ClipboardIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="ml-4 w-full">
      <h1>Dashboard</h1>
      <div className="flex items-center justify-between gap-5">
        <DashboardCard
          text="Olingan yoqilg’i"
          desc="4200"
          icon={TruckIcon}
          from="from-[#6BAAFC]"
          to="to-[#305FEC]"
        />
        <DashboardCard
          text="Sotilgan yoqilg’i"
          desc="3800"
          icon={ShoppingCartIcon}
          from="from-[#EF5E7A]"
          to="to-[#D35385]"
        />
        <DashboardCard
          text="AYoQSh soni"
          desc="5"
          icon={ClipboardIcon}
          from="from-[#D623FE]"
          to="to-[#A530F2]"
        />
      </div>
      <Button className="m-4 p-2 cursor-pointer">Click</Button>
    </div>
  );
}
