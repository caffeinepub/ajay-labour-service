import { useGetBookingMetrics } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, CheckCircle, Clock, IndianRupee } from 'lucide-react';

export function BookingMetrics() {
  const { data: metrics, isLoading } = useGetBookingMetrics();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Bookings',
      value: metrics?.totalBookings.toString() || '0',
      icon: Users,
      color: 'text-labour-blue',
    },
    {
      title: 'Paid Bookings',
      value: metrics?.paidBookings.toString() || '0',
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Pending Payments',
      value: metrics?.pendingPayments.toString() || '0',
      icon: Clock,
      color: 'text-labour-orange',
    },
    {
      title: 'Total Revenue',
      value: `₹${metrics?.totalRevenue.toString() || '0'}`,
      icon: IndianRupee,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
