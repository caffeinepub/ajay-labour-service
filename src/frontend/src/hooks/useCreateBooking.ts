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
      if (!actor) throw new Error('Actor not available');
      
      await actor.createBooking(
        data.bookingId,
        data.name,
        data.phoneNumber,
        data.location,
        data.typeOfWork,
        data.dateRequired,
        data.description
      );
      
      return data.bookingId;
    },
  });
}
