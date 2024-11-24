import AdminHeader from "@/components/admin/AdminHeader";
import PortfolioEditor from "@/components/admin/PortfolioEditor";
import AdminPortfolioList from "@/components/admin/AdminPortfolioList";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />
      <PortfolioEditor />
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">포트폴리오 목록</h2>
        <AdminPortfolioList />
      </div>
    </div>
  );
} 