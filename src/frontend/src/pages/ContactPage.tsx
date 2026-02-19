import { SEOHead } from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact Us - Get in Touch"
        description="Contact Ajay Labour Service in Tinsukia and Doomdooma, Assam. Call us, email us, or visit our service areas. We're here to help with all your labour service needs."
        keywords="contact labour service, Tinsukia contact, Doomdooma labour service"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-labour-blue/5 via-background to-labour-orange/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Get in touch with us for any queries or bookings
          </p>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions or need to book labour services? We're here to help!
                  Reach out to us through any of the following channels.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4 rounded-lg bg-card p-6 shadow-md border border-border/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                    <Phone className="h-6 w-6 text-labour-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+918136009930"
                      className="text-muted-foreground hover:text-labour-blue transition-colors"
                    >
                      +91 8136009930
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Call us for immediate assistance
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 rounded-lg bg-card p-6 shadow-md border border-border/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                    <Mail className="h-6 w-6 text-labour-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:ajayyadavddm@gmail.com"
                      className="text-muted-foreground hover:text-labour-blue transition-colors"
                    >
                      ajayyadavddm@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send us your queries via email
                    </p>
                  </div>
                </div>

                {/* Service Areas */}
                <div className="flex items-start space-x-4 rounded-lg bg-card p-6 shadow-md border border-border/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                    <MapPin className="h-6 w-6 text-labour-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Service Areas</h3>
                    <p className="text-muted-foreground">Tinsukia, Assam</p>
                    <p className="text-muted-foreground">Doomdooma, Assam</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We serve these areas and surrounding regions
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4 rounded-lg bg-card p-6 shadow-md border border-border/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                    <Clock className="h-6 w-6 text-labour-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Working Hours</h3>
                    <p className="text-muted-foreground">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                    <p className="text-muted-foreground">Sunday: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      24/7 customer support available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Service Areas</h2>
            <p className="text-muted-foreground">
              We proudly serve Tinsukia and Doomdooma regions in Assam
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <img
              src="/assets/generated/service-area-map.dim_600x400.png"
              alt="Service area map showing Tinsukia and Doomdooma"
              className="rounded-xl shadow-lg border border-border/40 max-w-full h-auto"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-card p-8 shadow-md border border-border/40 text-center">
              <MapPin className="h-12 w-12 text-labour-blue mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Tinsukia</h3>
              <p className="text-muted-foreground">
                Complete coverage across Tinsukia district with verified local workers
              </p>
            </div>
            <div className="rounded-xl bg-card p-8 shadow-md border border-border/40 text-center">
              <MapPin className="h-12 w-12 text-labour-orange mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Doomdooma</h3>
              <p className="text-muted-foreground">
                Serving Doomdooma and surrounding areas with quality labour services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-labour-blue to-labour-blue/90 p-8 text-white shadow-2xl md:p-12">
            <h3 className="text-3xl font-bold mb-4 text-center">Ready to Book?</h3>
            <p className="mb-8 opacity-90 text-center text-lg">
              Skip the wait and book your labour service online now. Quick, easy,
              and secure booking with just ₹300 advance payment.
            </p>
            <div className="flex justify-center">
              <Link
                to="/booking"
                className="inline-block rounded-full bg-labour-orange px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:bg-labour-orange/90 hover:shadow-xl hover:scale-105"
              >
                Book Now
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                <span>100% Verified Workers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                <span>Quick Response Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
