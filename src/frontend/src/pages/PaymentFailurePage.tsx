import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { XCircle, AlertTriangle, Smartphone, CreditCard, Wifi } from 'lucide-react';
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

                {/* Common Issues */}
                <div className="mb-8 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sm mb-2 text-yellow-900 dark:text-yellow-100">
                        Common Payment Issues
                      </h3>
                      <ul className="space-y-1 text-xs text-yellow-800 dark:text-yellow-200">
                        <li className="flex items-center space-x-2">
                          <Smartphone className="h-3 w-3" />
                          <span>UPI app not responding or timeout</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CreditCard className="h-3 w-3" />
                          <span>Insufficient balance or card limit exceeded</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Wifi className="h-3 w-3" />
                          <span>Poor internet connection during payment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-left mb-8">
                  <h3 className="font-semibold text-lg">What you can do:</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        <strong>Try again with UPI:</strong> Use your UPI ID (e.g., 8136009930@kotak811) or scan QR code in the payment page
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        <strong>Use a different payment method:</strong> Try Credit/Debit Card or Net Banking
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        <strong>Check your internet:</strong> Ensure stable connection and try again
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        <strong>Contact your bank:</strong> If you believe the payment should have succeeded
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-labour-orange flex-shrink-0"></span>
                      <span>
                        <strong>Call us for help:</strong> Reach us at +91 8136009930 for booking assistance
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
                    href="tel:+918136009930"
                    className="text-labour-blue hover:underline"
                  >
                    +91 8136009930
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
