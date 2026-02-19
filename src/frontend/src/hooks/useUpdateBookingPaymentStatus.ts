import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useUpdateBookingPaymentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateBookingPaymentStatus(bookingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
