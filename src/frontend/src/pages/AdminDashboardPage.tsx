import { useState, useMemo } from 'react';
import { AdminGuard } from '../components/AdminGuard';
import { BookingMetrics } from '../components/BookingMetrics';
import { BookingFilters, FilterState } from '../components/BookingFilters';
import { useGetAllBookings } from '../hooks/useQueries';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ArrowUpDown } from 'lucide-react';
import type { Booking } from '../backend';

type SortField = 'dateRequired' | 'bookingId';
type SortDirection = 'asc' | 'desc';

export default function AdminDashboardPage() {
  const { data: bookings, isLoading } = useGetAllBookings();
  const [filters, setFilters] = useState<FilterState>({
    paymentStatus: 'all',
    workType: 'All Types',
    startDate: '',
    endDate: '',
  });
  const [sortField, setSortField] = useState<SortField>('dateRequired');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedBookings = useMemo(() => {
    if (!bookings) return [];

    let filtered = [...bookings];

    // Filter by payment status
    if (filters.paymentStatus !== 'all') {
      filtered = filtered.filter((booking) =>
        filters.paymentStatus === 'paid' ? booking.isPaid : !booking.isPaid
      );
    }

    // Filter by work type
    if (filters.workType !== 'All Types') {
      filtered = filtered.filter((booking) => booking.typeOfWork === filters.workType);
    }

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter((booking) => booking.dateRequired >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter((booking) => booking.dateRequired <= filters.endDate);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'dateRequired') {
        comparison = a.dateRequired.localeCompare(b.dateRequired);
      } else if (sortField === 'bookingId') {
        comparison = a.bookingId.localeCompare(b.bookingId);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [bookings, filters, sortField, sortDirection]);

  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and track all customer bookings</p>
        </div>

        <div className="space-y-6">
          <BookingMetrics />

          <BookingFilters filters={filters} onFiltersChange={setFilters} />

          <div className="rounded-lg border bg-card">
            <div className="p-4">
              <h2 className="text-xl font-semibold">All Bookings</h2>
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedBookings.length} booking(s) found
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-labour-blue border-r-transparent"></div>
                  <p className="text-muted-foreground">Loading bookings...</p>
                </div>
              </div>
            ) : filteredAndSortedBookings.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No bookings found matching your filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <button
                          onClick={() => handleSort('bookingId')}
                          className="flex items-center space-x-1 font-semibold hover:text-labour-blue"
                        >
                          <span>Booking ID</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Work Type</TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('dateRequired')}
                          className="flex items-center space-x-1 font-semibold hover:text-labour-blue"
                        >
                          <span>Date Required</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedBookings.map((booking) => (
                      <TableRow key={booking.bookingId}>
                        <TableCell className="font-medium">{booking.bookingId}</TableCell>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.phoneNumber}</TableCell>
                        <TableCell>{booking.location}</TableCell>
                        <TableCell>{booking.typeOfWork}</TableCell>
                        <TableCell>{booking.dateRequired}</TableCell>
                        <TableCell>
                          {booking.isPaid ? (
                            <Badge className="bg-green-600 hover:bg-green-700">Paid</Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-labour-orange/20 text-labour-orange hover:bg-labour-orange/30">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{booking.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
