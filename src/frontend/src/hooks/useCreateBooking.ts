import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';

interface BookingData {
  bookingId: string;
  name: string;
  phoneNumber: string;
  location: string;
  typeOfWork: string;
  dateRequired: string;
  description: string;
}

export function useCreateBooking() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: BookingData) => {
      console.log('[useCreateBooking] Starting booking creation...');
      console.log('[useCreateBooking] Actor available:', !!actor);
      console.log('[useCreateBooking] Booking data:', data);

      if (!actor) {
        console.error('[useCreateBooking] Actor not available');
        throw new Error('Actor not available');
      }

      try {
        console.log('[useCreateBooking] Calling backend createBooking...');
        const startTime = Date.now();

        await actor.createBooking(
          data.bookingId,
          data.name,
          data.phoneNumber,
          data.location,
          data.typeOfWork,
          data.dateRequired,
          data.description
        );

        const duration = Date.now() - startTime;
        console.log(`[useCreateBooking] Booking created successfully in ${duration}ms`);
        console.log('[useCreateBooking] Booking ID:', data.bookingId);

        return data.bookingId;
      } catch (error: any) {
        console.error('[useCreateBooking] Error creating booking:', {
          error,
          message: error?.message,
          name: error?.name,
          stack: error?.stack,
          bookingData: data,
        });

        // Re-throw with more context
        if (error?.message) {
          throw new Error(error.message);
        }
        throw new Error('Failed to create booking. Please try again.');
      }
    },
  });
}
