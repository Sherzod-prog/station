import { ChartComponent } from "@/components/chart-area";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { ClipboardIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="ml-4 w-[1268px]">
      <h1 className="my-4">Dashboard</h1>
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
      <div className="my-4">
        <ChartComponent />
      </div>
    </div>
  );
}
