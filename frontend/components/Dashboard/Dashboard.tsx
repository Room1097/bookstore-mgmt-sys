"use client";
import React, { useState, useEffect } from "react";
import { formatNumber, formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stock: null,
    sales: null,
    revenue: null,
    uniqueBooks: null,
  });

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3001/dash/revenue`).then((response) =>
        response.json()
      ),
      fetch(`http://localhost:3001/dash/stock`).then((response) =>
        response.json()
      ),
      fetch(`http://localhost:3001/book`).then((response) => response.json()),
      fetch(`http://localhost:3001/sales`).then((response) => response.json()),
    ])
      .then(([revenueData, stockData, bookData, salesData]) => {
        setData({
          revenue: revenueData.revenue,
          stock: stockData.stock,
          uniqueBooks: bookData.length,
          sales: salesData.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Sales"
            sub={`${data.sales ? formatNumber(data.sales) : 0} Unique Sales`}
            body={
              data.revenue ? formatCurrency(data.revenue) : formatCurrency(0)
            }
          />
          <DashboardCard
            title="Total Products"
            sub={`${
              data.uniqueBooks ? formatNumber(data.uniqueBooks) : 0
            } Unique Books`}
            body={data.stock ? formatNumber(data.stock) : "0"}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;

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
