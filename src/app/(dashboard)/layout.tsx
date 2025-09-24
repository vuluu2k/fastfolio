import Sidebar from "@/components/layout/dashboard/Sidebar";

function DashboardLayout() {
  return (
    <div className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar">
      <Sidebar />
    </div>
  );
}

export default DashboardLayout;
