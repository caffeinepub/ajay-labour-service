import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ShoppingItem } from '../backend';

export type CheckoutSession = {
  id: string;
  url: string;
};

export type CheckoutError = {
  type: 'upi' | 'stripe' | 'network' | 'validation' | 'unknown';
  message: string;
  originalError?: any;
};

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      console.log('[useCreateCheckoutSession] Starting checkout session creation...');
      console.log('[useCreateCheckoutSession] Actor available:', !!actor);
      console.log('[useCreateCheckoutSession] Shopping items:', items);

      if (!actor) {
        console.error('[useCreateCheckoutSession] Actor not available');
        const error: CheckoutError = {
          type: 'network',
          message: 'Actor not available',
        };
        throw error;
      }

      try {
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        const successUrl = `${baseUrl}/payment-success`;
        const cancelUrl = `${baseUrl}/payment-failure`;

        console.log('[useCreateCheckoutSession] URLs:', { successUrl, cancelUrl });
        console.log('[useCreateCheckoutSession] Calling backend createCheckoutSession...');
        const startTime = Date.now();

        const result = await actor.createCheckoutSession(items, successUrl, cancelUrl);

        const duration = Date.now() - startTime;
        console.log(`[useCreateCheckoutSession] Backend call completed in ${duration}ms`);
        console.log('[useCreateCheckoutSession] Raw result:', result);

        // JSON parsing is important!
        let session: CheckoutSession;
        try {
          session = JSON.parse(result) as CheckoutSession;
          console.log('[useCreateCheckoutSession] Parsed session:', session);
        } catch (parseError: any) {
          console.error('[useCreateCheckoutSession] JSON parse error:', {
            parseError,
            rawResult: result,
          });
          const error: CheckoutError = {
            type: 'stripe',
            message: 'Failed to parse payment session response',
            originalError: parseError,
          };
          throw error;
        }

        if (!session?.url) {
          console.error('[useCreateCheckoutSession] Session missing URL:', session);
          const error: CheckoutError = {
            type: 'stripe',
            message: 'Stripe session missing url',
          };
          throw error;
        }

        console.log('[useCreateCheckoutSession] Checkout session created successfully');
        console.log('[useCreateCheckoutSession] Session ID:', session.id);
        console.log('[useCreateCheckoutSession] Redirect URL:', session.url);

        return session;
      } catch (error: any) {
        console.error('[useCreateCheckoutSession] Error creating checkout session:', {
          error,
          message: error?.message,
          name: error?.name,
          stack: error?.stack,
          items,
        });

        // Detect error type and create structured error
        if (error.type) {
          // Already a CheckoutError
          throw error;
        }

        const errorMsg = error?.message?.toLowerCase() || '';
        let errorType: CheckoutError['type'] = 'unknown';

        if (errorMsg.includes('upi')) {
          errorType = 'upi';
        } else if (errorMsg.includes('stripe') || errorMsg.includes('configured')) {
          errorType = 'stripe';
        } else if (errorMsg.includes('network') || errorMsg.includes('fetch') || errorMsg.includes('actor')) {
          errorType = 'network';
        } else if (errorMsg.includes('validation') || errorMsg.includes('invalid')) {
          errorType = 'validation';
        }

        const structuredError: CheckoutError = {
          type: errorType,
          message: error?.message || 'Failed to create payment session. Please try again.',
          originalError: error,
        };

        throw structuredError;
      }
    },
  });
}
