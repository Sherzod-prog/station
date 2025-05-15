import UserSection from "@/components/UserSection";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-[#F6F9FC] dark:bg-[#1f1f1f]">
      <UserSection />
      {children}
    </section>
  );
}
