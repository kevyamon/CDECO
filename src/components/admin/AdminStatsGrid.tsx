import { FC } from "react";
import StatsCard from "@/components/admin/StatsCard";
import { Users, Clock, TrendingUp, Mail } from "lucide-react";

interface AdminStatsGridProps {
  totalRequests: number;
  pendingCount: number;
  approvalRate: number;
  approvedCount: number;
  totalMessages: number;
  unreadCount: number;
}

export const AdminStatsGrid: FC<AdminStatsGridProps> = ({
  totalRequests,
  pendingCount,
  approvalRate,
  approvedCount,
  totalMessages,
  unreadCount,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
      <StatsCard
        title="Total Adhésions"
        value={totalRequests}
        subtitle="Toutes catégories"
        icon={Users}
        iconClassName="bg-primary/10"
      />
      <StatsCard
        title="En attente"
        value={pendingCount}
        subtitle="À valider"
        icon={Clock}
        iconClassName="bg-amber-500/10"
      />
      <StatsCard
        title="Taux approbation"
        value={`${approvalRate}%`}
        subtitle={`${approvedCount} validées`}
        icon={TrendingUp}
        iconClassName="bg-emerald-500/10"
      />
      <StatsCard
        title="Messages"
        value={totalMessages}
        subtitle={`${unreadCount} non lu${unreadCount !== 1 ? "s" : ""}`}
        icon={Mail}
        iconClassName="bg-blue-500/10"
      />
    </div>
  );
};

export default AdminStatsGrid;

