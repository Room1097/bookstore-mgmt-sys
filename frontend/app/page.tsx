import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header/Header";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header>Dashboard</Header>

      <Dashboard />
    </div>
  );
}

