import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface MembershipRequest {
  id: string;
  status: string;
  created_at: string;
}

interface MembershipChartProps {
  requests: MembershipRequest[];
}

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--primary))",
  },
  approved: {
    label: "Approuvées",
    color: "hsl(142 76% 36%)",
  },
  pending: {
    label: "En attente",
    color: "hsl(38 92% 50%)",
  },
};

const MembershipChart = ({ requests }: MembershipChartProps) => {
  const chartData = useMemo(() => {
    const monthsData: Record<string, { total: number; approved: number; pending: number }> = {};
    
    // Get last 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthsData[key] = { total: 0, approved: 0, pending: 0 };
    }

    // Count requests per month
    requests.forEach((request) => {
      const date = new Date(request.created_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      
      if (monthsData[key]) {
        monthsData[key].total++;
        if (request.status === "approved") {
          monthsData[key].approved++;
        } else if (request.status === "pending") {
          monthsData[key].pending++;
        }
      }
    });

    // Convert to array with French month names
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    
    return Object.entries(monthsData).map(([key, data]) => {
      const [year, month] = key.split("-");
      return {
        month: `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`,
        ...data,
      };
    });
  }, [requests]);

  const totalThisMonth = chartData[chartData.length - 1]?.total || 0;
  const lastMonth = chartData[chartData.length - 2]?.total || 0;
  const growth = lastMonth > 0 ? Math.round(((totalThisMonth - lastMonth) / lastMonth) * 100) : 0;

  return (
    <Card className="shadow-sm w-full min-w-0 overflow-hidden">
      <CardHeader className="pb-2 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary shrink-0" />
              Évolution des demandes
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Demandes d'adhésion des 6 derniers mois
            </CardDescription>
          </div>
          {growth !== 0 && (
            <div className={`text-xs sm:text-sm font-medium px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full w-fit ${
              growth > 0 
                ? "bg-emerald-100 text-emerald-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {growth > 0 ? "+" : ""}{growth}% ce mois
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 overflow-hidden">
        <ChartContainer config={chartConfig} className="h-[220px] sm:h-[280px] w-full min-w-0 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                className="text-muted-foreground"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTotal)"
                name="Total"
              />
              <Area
                type="monotone"
                dataKey="approved"
                stroke="hsl(142 76% 36%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApproved)"
                name="Approuvées"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MembershipChart;
