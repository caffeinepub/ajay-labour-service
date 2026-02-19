import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { XCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function PaymentFailurePage() {
  useEffect(() => {
    // Clear any stored booking data
    sessionStorage.removeItem('bookingId');
  }, []);

  return (
    <>
      <SEOHead
        title="Payment Failed - Please Try Again"
        description="Your payment was not successful. Please try booking again."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>

              <h1 className="text-4xl font-bold text-red-600">Payment Failed</h1>

              <div className="rounded-xl bg-card p-8 shadow-lg border border-border/40">
                <h2 className="text-2xl font-bold mb-4">
                  We couldn't process your payment
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your payment was not successful. This could be due to various
                  reasons such as insufficient funds, network issues, or payment
                  cancellation.
                </p>

                <div className="space-y-4 text-left mb-8">
                  <h3 className="font-semibold text-lg">What you can do:</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        Try booking again with a different payment method
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>Check your internet connection and try again</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        Contact your bank if you believe the payment should have
                        succeeded
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        Call us at +91 98765 43210 for assistance with booking
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-labour-blue/10 p-4 border border-labour-blue/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> No amount has been deducted from your
                    account. If you see any deduction, it will be automatically
                    refunded within 5-7 business days.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  to="/booking"
                  className="rounded-full bg-labour-orange px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-orange/90 hover:shadow-xl"
                >
                  Try Booking Again
                </Link>
                <Link
                  to="/"
                  className="rounded-full bg-labour-blue px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-blue/90 hover:shadow-xl"
                >
                  Back to Home
                </Link>
              </div>

              <div className="mt-8">
                <p className="text-sm text-muted-foreground">
                  Need help?{' '}
                  <Link to="/contact" className="text-labour-blue hover:underline">
                    Contact us
                  </Link>{' '}
                  or call{' '}
                  <a
                    href="tel:+919876543210"
                    className="text-labour-blue hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
