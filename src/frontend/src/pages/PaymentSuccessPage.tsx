import { useEffect, useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle, Loader2, CreditCard, Smartphone } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useUpdateBookingPaymentStatus } from '../hooks/useUpdateBookingPaymentStatus';

export default function PaymentSuccessPage() {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const updatePaymentStatus = useUpdateBookingPaymentStatus();

  useEffect(() => {
    const storedBookingId = sessionStorage.getItem('bookingId');
    if (storedBookingId) {
      setBookingId(storedBookingId);
      
      // Update payment status in backend
      updatePaymentStatus.mutate(storedBookingId, {
        onSuccess: () => {
          console.log('[PaymentSuccess] Payment status updated successfully for UPI/Card payment');
          setIsProcessing(false);
          // Clear the stored booking ID
          sessionStorage.removeItem('bookingId');
        },
        onError: (error) => {
          console.error('[PaymentSuccess] Failed to update payment status:', error);
          setIsProcessing(false);
        },
      });
    } else {
      setIsProcessing(false);
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Payment Successful - Booking Confirmed"
        description="Your booking has been confirmed. Thank you for choosing Ajay Labour Service."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            {isProcessing ? (
              <div className="space-y-6">
                <Loader2 className="h-16 w-16 animate-spin text-labour-blue mx-auto" />
                <h1 className="text-3xl font-bold">Processing Your Payment...</h1>
                <p className="text-muted-foreground">
                  Please wait while we confirm your booking.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>

                <h1 className="text-4xl font-bold text-green-600">
                  Payment Successful!
                </h1>

                <div className="rounded-xl bg-card p-8 shadow-lg border border-border/40">
                  <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for choosing Ajay Labour Service. Your booking has been
                    confirmed and we have received your advance payment of ₹300.
                  </p>

                  {/* Payment Method Info */}
                  <div className="mb-6 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <CreditCard className="h-4 w-4 text-labour-blue" />
                      <Smartphone className="h-4 w-4 text-labour-orange" />
                      <span>Payment processed securely via Stripe</span>
                    </div>
                  </div>

                  {bookingId && (
                    <div className="mb-6 rounded-lg bg-muted/50 p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Booking Reference ID:
                      </p>
                      <p className="font-mono text-sm font-semibold break-all">
                        {bookingId}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4 text-left">
                    <h3 className="font-semibold text-lg">What's Next?</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                        <span>
                          Our team will contact you within 2 hours to confirm the
                          details and schedule.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                        <span>
                          We will assign verified workers based on your requirements.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                        <span>
                          You will receive a confirmation call with worker details and
                          arrival time.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                        <span>
                          For any queries, feel free to contact us at +91 8136009930.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link
                    to="/"
                    className="rounded-full bg-labour-blue px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-blue/90 hover:shadow-xl"
                  >
                    Back to Home
                  </Link>
                  <Link
                    to="/booking"
                    className="rounded-full bg-labour-orange px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-orange/90 hover:shadow-xl"
                  >
                    Book Another Service
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
