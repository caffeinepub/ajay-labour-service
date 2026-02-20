import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Booking } from '../backend';

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      console.log('[useIsCallerAdmin] Starting admin check');
      
      if (!actor) {
        console.log('[useIsCallerAdmin] No actor available, returning false');
        return false;
      }

      try {
        console.log('[useIsCallerAdmin] Calling backend isCallerAdmin()');
        const result = await actor.isCallerAdmin();
        console.log('[useIsCallerAdmin] Backend response:', result);
        return result;
      } catch (error: any) {
        console.error('[useIsCallerAdmin] Error checking admin status:', {
          message: error.message,
          error
        });
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useGetBookingMetrics() {
  const { actor, isFetching } = useActor();

  return useQuery<{
    totalBookings: bigint;
    paidBookings: bigint;
    pendingPayments: bigint;
    totalRevenue: bigint;
  }>({
    queryKey: ['bookingMetrics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBookingMetrics();
    },
    enabled: !!actor && !isFetching,
  });
}
