import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatNumber } from "@/lib/formatters";
import { formatCurrency } from "@/lib/formatters";

export default function AdminPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        sub={formatNumber(10)}
        body={formatCurrency(40000)}
      />
      <DashboardCard
        title="Customer"
        sub={`${formatCurrency(1000)} Average Value`}
        body={formatNumber(4000)}
      />
      <DashboardCard
        title="Active Products"
        sub={`${formatNumber(10)} Inactive Products`}
        body={formatNumber(90)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  sub: string;
  body: string;
};

const DashboardCard = ({ title, sub, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{sub}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};
