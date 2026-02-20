import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useCreateBooking } from '../hooks/useCreateBooking';
import { useCreateCheckoutSession } from '../hooks/useCreateCheckoutSession';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { AlertCircle, CheckCircle, CreditCard, Smartphone } from 'lucide-react';
import type { ShoppingItem } from '../backend';

export default function BookingPage() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const createBooking = useCreateBooking();
  const createCheckoutSession = useCreateCheckoutSession();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    location: '',
    typeOfWork: '',
    dateRequired: '',
    description: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, typeOfWork: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setShowSuccess(false);

    if (!isAuthenticated) {
      setErrorMessage('Please login to create a booking');
      return;
    }

    // Validate form
    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.location ||
      !formData.typeOfWork ||
      !formData.dateRequired
    ) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const bookingId = `BK${Date.now()}`;

      // Create booking
      await createBooking.mutateAsync({
        bookingId,
        ...formData,
      });

      // Create checkout session
      const items: ShoppingItem[] = [
        {
          productName: `Labour Service - ${formData.typeOfWork}`,
          productDescription: `Booking for ${formData.name} on ${formData.dateRequired}`,
          priceInCents: BigInt(30000), // ₹300 in paise
          quantity: BigInt(1),
          currency: 'INR',
        },
      ];

      console.log('[BookingPage] Creating checkout session with items:', items);

      const session = await createCheckoutSession.mutateAsync(items);

      console.log('[BookingPage] Checkout session created:', session);

      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }

      console.log('[BookingPage] Redirecting to Stripe:', session.url);
      window.location.href = session.url;
    } catch (error: any) {
      console.error('[BookingPage] Booking error:', error);
      
      // Enhanced error handling for UPI and payment issues
      if (error.message?.includes('UPI')) {
        setErrorMessage(
          'UPI payment error: Please ensure you have a valid UPI ID and try again. Contact support at +91 8136009930 if the issue persists.'
        );
      } else if (error.message?.includes('Stripe')) {
        setErrorMessage(
          'Payment gateway error: Unable to process payment. Please try again or contact support at +91 8136009930.'
        );
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        setErrorMessage(
          'Network error: Please check your internet connection and try again.'
        );
      } else {
        setErrorMessage(
          error.message || 'Failed to create booking. Please try again or contact support.'
        );
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Book Labour Service - Online Booking"
        description="Book verified labour services online in Tinsukia and Doomdooma. Easy booking with just ₹300 advance payment. Choose from masons, electricians, plumbers, painters and more."
        keywords="book labour service, online booking, Tinsukia labour, Doomdooma workers"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-labour-blue/5 via-background to-labour-orange/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Book Labour Service</h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Quick and easy online booking with just ₹300 advance
          </p>
        </div>
      </section>

      {/* UPI Payment Information Banner */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-labour-blue/10 to-labour-orange/10 p-6 border border-labour-blue/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/20">
                  <Smartphone className="h-6 w-6 text-labour-blue" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Multiple Payment Options Available</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  We accept UPI payments and all major credit/debit cards for your convenience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-labour-orange" />
                    <span className="font-semibold">UPI ID:</span>
                    <span className="text-muted-foreground">8136009930@kotak811</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-labour-orange" />
                    <span className="font-semibold">Cards:</span>
                    <span className="text-muted-foreground">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {!isAuthenticated && (
              <Alert className="mb-8 border-labour-blue/50 bg-labour-blue/5">
                <AlertCircle className="h-4 w-4 text-labour-blue" />
                <AlertDescription className="flex items-center justify-between">
                  <span>Please login to create a booking</span>
                  <Button
                    onClick={login}
                    disabled={isLoggingIn}
                    size="sm"
                    className="ml-4 bg-labour-blue hover:bg-labour-blue/90"
                  >
                    {isLoggingIn ? 'Loading...' : 'Login'}
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {showSuccess && (
              <Alert className="mb-8 border-green-500/50 bg-green-500/5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription>
                  Booking created successfully! Redirecting to payment...
                </AlertDescription>
              </Alert>
            )}

            {errorMessage && (
              <Alert variant="destructive" className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="rounded-2xl bg-card p-8 shadow-lg border border-border/40">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    disabled={!isAuthenticated}
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    disabled={!isAuthenticated}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter your location (e.g., Tinsukia, Doomdooma)"
                    required
                    disabled={!isAuthenticated}
                  />
                </div>

                <div>
                  <Label htmlFor="typeOfWork">Type of Work *</Label>
                  <Select
                    value={formData.typeOfWork}
                    onValueChange={handleSelectChange}
                    disabled={!isAuthenticated}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of work" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mason">Mason</SelectItem>
                      <SelectItem value="Electrician">Electrician</SelectItem>
                      <SelectItem value="Plumber">Plumber</SelectItem>
                      <SelectItem value="Painter">Painter</SelectItem>
                      <SelectItem value="Construction Helper">
                        Construction Helper
                      </SelectItem>
                      <SelectItem value="Daily Wage Labour">
                        Daily Wage Labour
                      </SelectItem>
                      <SelectItem value="Daily Labour Service">
                        Daily Labour Service
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateRequired">Date Required *</Label>
                  <Input
                    id="dateRequired"
                    name="dateRequired"
                    type="date"
                    value={formData.dateRequired}
                    onChange={handleInputChange}
                    required
                    disabled={!isAuthenticated}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide any additional details about your requirements"
                    rows={4}
                    disabled={!isAuthenticated}
                  />
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-semibold mb-2">Booking Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span>Advance Booking Fee:</span>
                    <span className="font-semibold">₹300</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Final payment will be settled after work completion
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-labour-blue hover:bg-labour-blue/90"
                  disabled={
                    !isAuthenticated ||
                    createBooking.isPending ||
                    createCheckoutSession.isPending
                  }
                >
                  {createBooking.isPending || createCheckoutSession.isPending
                    ? 'Processing...'
                    : 'Proceed to Payment'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
