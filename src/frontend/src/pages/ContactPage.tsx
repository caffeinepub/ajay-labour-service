import { SEOHead } from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CTAButtons } from '../components/CTAButtons';

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact Us - Get in Touch"
        description="Contact Assam Labour Service for all your labour service needs in Tinsukia and Doomdooma, Assam. Call us at +91 8136009930 or email ajayyadavddm@gmail.com"
        keywords="contact labour service, Tinsukia contact, Doomdooma labour, book labour service"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-labour-blue/5 via-background to-labour-orange/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Get in touch with us for all your labour service needs
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions or need to book a service? We're here to help! 
                  Reach out to us through any of the following channels.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
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
                      Available 24/7 for urgent bookings
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
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
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                    <MapPin className="h-6 w-6 text-labour-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Service Areas</h3>
                    <p className="text-muted-foreground">
                      Tinsukia & Doomdooma, Assam
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Serving the entire region
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                    <Clock className="h-6 w-6 text-labour-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Sunday: 7:00 AM - 8:00 PM
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emergency services available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-card p-8 shadow-lg border border-border/40">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Service Area</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Proudly serving Tinsukia and Doomdooma regions
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <img
              src="/assets/generated/service-area-map.dim_600x400.png"
              alt="Service area map showing Tinsukia and Doomdooma"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Quick Booking CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-labour-blue to-labour-blue/90 p-8 text-white shadow-2xl md:p-12">
            <h3 className="text-3xl font-bold mb-4 text-center">Ready to Book?</h3>
            <p className="mb-8 opacity-90 text-center text-lg">
              Skip the form and book directly through WhatsApp or phone call
            </p>
            <div className="flex justify-center">
              <CTAButtons />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
