import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';

interface ContactFormData {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
}

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(
        data.name,
        data.email,
        data.phoneNumber,
        data.message
      );
    },
  });
}
