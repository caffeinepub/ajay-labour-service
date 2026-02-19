import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { useCreateBooking } from '../hooks/useCreateBooking';
import { useCreateCheckoutSession } from '../hooks/useCreateCheckoutSession';
import { AlertCircle, Loader2, MessageCircle } from 'lucide-react';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    location: '',
    typeOfWork: '',
    dateRequired: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState<string | null>(null);

  const createBooking = useCreateBooking();
  const createCheckoutSession = useCreateCheckoutSession();

  const serviceTypes = [
    'Mason',
    'Electrician',
    'Plumber',
    'Painter',
    'Construction Helper',
    'Daily Wage Labour',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.typeOfWork) newErrors.typeOfWork = 'Please select type of work';
    if (!formData.dateRequired) newErrors.dateRequired = 'Date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const newBookingId = crypto.randomUUID();
      setBookingId(newBookingId);

      await createBooking.mutateAsync({
        bookingId: newBookingId,
        ...formData,
      });

      // Store bookingId for payment success page
      sessionStorage.setItem('bookingId', newBookingId);

      // Create checkout session
      const session = await createCheckoutSession.mutateAsync([
        {
          productName: 'Advance Booking Fee',
          productDescription: `Booking for ${formData.typeOfWork} - ${formData.name}`,
          currency: 'inr',
          priceInCents: BigInt(30000), // ₹300
          quantity: BigInt(1),
        },
      ]);

      if (!session?.url) {
        throw new Error('Payment session URL not available');
      }

      // Redirect to Stripe checkout
      window.location.href = session.url;
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi, I want to book ${formData.typeOfWork || 'labour service'}${
      formData.location ? ` in ${formData.location}` : ''
    }. Please contact me.`;
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const isLoading = createBooking.isPending || createCheckoutSession.isPending;

  return (
    <>
      <SEOHead
        title="Book Labour Service - Online Booking"
        description="Book verified labour services in Tinsukia and Doomdooma online. Pay ₹300 advance booking fee securely. Quick and easy booking process."
        keywords="book labour online, labour booking Tinsukia, construction worker booking"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold md:text-5xl">Book Your Labour</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Fill in the details below to book verified labour service
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-lg border border-border/40 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-labour-blue"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-labour-blue"
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-destructive flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Location <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-labour-blue"
                    placeholder="e.g., Tinsukia, Doomdooma"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-destructive flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Type of Work */}
                <div>
                  <label htmlFor="typeOfWork" className="block text-sm font-medium mb-2">
                    Type of Work <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="typeOfWork"
                    name="typeOfWork"
                    value={formData.typeOfWork}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-labour-blue"
                  >
                    <option value="">Select type of work</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.typeOfWork && (
                    <p className="mt-1 text-sm text-destructive flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {errors.typeOfWork}
                    </p>
                  )}
                </div>

                {/* Date Required */}
                <div>
                  <label htmlFor="dateRequired" className="block text-sm font-medium mb-2">
                    Date Required <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateRequired"
                    name="dateRequired"
                    value={formData.dateRequired}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-labour-blue"
                  />
                  {errors.dateRequired && (
                    <p className="mt-1 text-sm text-destructive flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {errors.dateRequired}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Work Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-labour-blue resize-none"
                    placeholder="Describe the work you need done..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-destructive flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-labour-blue px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-blue/90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Proceed to Payment (₹300)'
                  )}
                </button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure payment powered by Stripe</p>
                </div>
              </form>

              {/* WhatsApp Alternative */}
              <div className="mt-8 pt-8 border-t border-border/40">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Prefer WhatsApp? Book instantly via WhatsApp
                  </p>
                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="inline-flex items-center space-x-2 rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Book via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 rounded-lg bg-labour-blue/5 p-6 border border-labour-blue/20">
              <h3 className="font-semibold mb-3 text-labour-blue">
                What happens after booking?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                  <span>Pay ₹300 advance booking fee securely</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                  <span>We'll confirm your booking within 2 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                  <span>Verified worker will be assigned to your project</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                  <span>Worker will contact you to discuss details</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-labour-blue flex-shrink-0"></span>
                  <span>Remaining payment made directly to worker after completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
