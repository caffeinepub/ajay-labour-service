import { CTAButtons } from '../components/CTAButtons';
import { TrustBadges } from '../components/TrustBadges';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ProjectGallery } from '../components/ProjectGallery';
import { FAQSection } from '../components/FAQSection';
import { FeedbackBanner } from '../components/FeedbackBanner';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Home - Verified Labour Service in Tinsukia & Doomdooma"
        description="Fast, reliable & affordable labour service in Tinsukia and Doomdooma, Assam. Book verified construction workers, electricians, plumbers, painters and more online."
        keywords="mason service Tinsukia, electrician Doomdooma, plumber Assam, construction labour"
      />

      <FeedbackBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-labour-blue/5 via-background to-labour-orange/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Verified Labour Service in{' '}
                <span className="text-labour-blue">Tinsukia</span> &{' '}
                <span className="text-labour-orange">Doomdooma</span> – Fast,
                Reliable & Affordable
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Connect with trusted, verified local workers for all your
                construction and home service needs. Quality workmanship
                guaranteed with transparent pricing.
              </p>
              <CTAButtons />
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <img
                    src="/assets/generated/verified-badge.dim_100x100.png"
                    alt="Verified"
                    className="h-6 w-6"
                  />
                  <span>100% Verified Workers</span>
                </div>
                <span>•</span>
                <span>500+ Happy Customers</span>
              </div>
            </div>

            <div className="relative">
              <img
                src="/assets/generated/hero-banner.dim_1200x600.png"
                alt="Construction workers in Assam"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your trusted partner for quality labour services in Assam
            </p>
          </div>
          <TrustBadges />
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional labour services for all your needs
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Mason', icon: 'mason-icon' },
              { name: 'Electrician', icon: 'electrician-icon' },
              { name: 'Plumber', icon: 'plumber-icon' },
              { name: 'Painter', icon: 'painter-icon' },
              { name: 'Construction Helper', icon: 'helper-icon' },
              { name: 'Daily Labour Service', icon: 'labour-icon' },
            ].map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center space-y-3 rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow border border-border/40"
              >
                <img
                  src={`/assets/generated/${service.icon}.dim_150x150.png`}
                  alt={service.name}
                  className="h-20 w-20"
                />
                <h3 className="text-center text-sm font-semibold">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 rounded-full bg-labour-blue px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-blue/90 hover:shadow-xl"
            >
              <span>View All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Project Gallery */}
      <ProjectGallery />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-labour-blue to-labour-blue/90 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            Ready to Book Your Labour Service?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get started with just ₹300 advance booking. Quick response, verified
            workers, and transparent pricing guaranteed.
          </p>
          <CTAButtons />
        </div>
      </section>
    </>
  );
}
