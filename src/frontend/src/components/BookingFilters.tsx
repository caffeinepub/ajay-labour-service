import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X } from 'lucide-react';

export interface FilterState {
  paymentStatus: 'all' | 'paid' | 'pending';
  workType: string;
  startDate: string;
  endDate: string;
}

interface BookingFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const workTypes = [
  'All Types',
  'Mason Work',
  'Electrical Work',
  'Plumbing Work',
  'Painting Work',
  'Construction Helper',
  'Daily Wage Labour',
];

export function BookingFilters({ filters, onFiltersChange }: BookingFiltersProps) {
  const handleClearFilters = () => {
    onFiltersChange({
      paymentStatus: 'all',
      workType: 'All Types',
      startDate: '',
      endDate: '',
    });
  };

  const hasActiveFilters =
    filters.paymentStatus !== 'all' ||
    filters.workType !== 'All Types' ||
    filters.startDate !== '' ||
    filters.endDate !== '';

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="payment-status">Payment Status</Label>
          <Select
            value={filters.paymentStatus}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, paymentStatus: value as FilterState['paymentStatus'] })
            }
          >
            <SelectTrigger id="payment-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="work-type">Work Type</Label>
          <Select
            value={filters.workType}
            onValueChange={(value) => onFiltersChange({ ...filters, workType: value })}
          >
            <SelectTrigger id="work-type">
              <SelectValue placeholder="Select work type" />
            </SelectTrigger>
            <SelectContent>
              {workTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={filters.startDate}
            onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Input
            id="end-date"
            type="date"
            value={filters.endDate}
            onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
