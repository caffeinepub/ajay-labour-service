import { SEOHead } from '../components/SEOHead';
import { TrustBadges } from '../components/TrustBadges';
import { Link } from '@tanstack/react-router';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      name: 'Mason',
      icon: 'mason-icon',
      description:
        'Skilled masons for construction, brickwork, plastering, and all masonry work. Our masons have 5-10 years of experience in residential and commercial projects.',
      features: [
        'Brickwork and block laying',
        'Plastering and rendering',
        'Tiling (floor and wall)',
        'Foundation and structural work',
        'Repair and restoration',
      ],
      experience: '5-10 years experienced professionals',
      timeline: 'Small projects: 2-5 days | Large projects: 2-4 weeks',
    },
    {
      name: 'Electrician',
      icon: 'electrician-icon',
      description:
        'Licensed electricians for wiring, installations, repairs, and electrical maintenance. Certified professionals ensuring safe and compliant electrical work.',
      features: [
        'Complete home and office wiring',
        'Electrical panel installation',
        'Lighting fixture installation',
        'Appliance repairs and maintenance',
        'Emergency electrical repairs',
      ],
      experience: '7-12 years certified electricians',
      timeline: 'Wiring: 3-7 days | Repairs: Same day to 2 days',
    },
    {
      name: 'Plumber',
      icon: 'plumber-icon',
      description:
        'Professional plumbers for pipe fitting, repairs, bathroom installations, and all plumbing needs. Expert in both residential and commercial plumbing systems.',
      features: [
        'Pipe fitting and installation',
        'Leak detection and repairs',
        'Bathroom and kitchen plumbing',
        'Drainage system work',
        'Water heater installation',
      ],
      experience: '6-10 years experienced plumbers',
      timeline: 'Repairs: Same day | Installations: 2-5 days',
    },
    {
      name: 'Painter',
      icon: 'painter-icon',
      description:
        'Expert painters for interior and exterior painting, wall finishing, and decorative work. Quality finish guaranteed with attention to detail and clean work.',
      features: [
        'Interior wall painting',
        'Exterior building painting',
        'Wall texture and finishing',
        'Decorative and artistic work',
        'Wood and metal painting',
      ],
      experience: '5-8 years professional painters',
      timeline: 'Small rooms: 1-2 days | Full house: 1-2 weeks',
    },
    {
      name: 'Construction Helper',
      icon: 'helper-icon',
      description:
        'Reliable construction helpers for general labour work, material handling, and site assistance. Hardworking individuals ready to support your construction projects.',
      features: [
        'Material loading and unloading',
        'Site cleaning and preparation',
        'Assisting skilled workers',
        'Demolition work',
        'General construction support',
      ],
      experience: '3-7 years construction experience',
      timeline: 'Available for daily, weekly, or project-based work',
    },
    {
      name: 'Daily Wage Labour',
      icon: 'labour-icon',
      description:
        'Flexible daily wage workers for various tasks including moving, cleaning, gardening, and general labour. Hire by the day for your specific needs.',
      features: [
        'Moving and shifting assistance',
        'Garden and yard work',
        'Cleaning and maintenance',
        'Loading and unloading',
        'Flexible daily hiring',
      ],
      experience: '2-5 years general labour experience',
      timeline: 'Available on daily basis with advance booking',
    },
    {
      name: 'Daily Labour Service',
      icon: 'labour-icon',
      description:
        'Flexible workforce solutions for your temporary staffing needs. Skilled workers available for short-term projects, events, and seasonal work with quick availability.',
      features: [
        'Event setup and cleanup',
        'Warehouse work and inventory',
        'Loading and unloading operations',
        'Seasonal agricultural work',
        'Temporary staffing solutions',
      ],
      experience: 'Reliable and physically fit workers',
      timeline: 'Same-day availability for urgent needs',
    },
  ];

  return (
    <>
      <SEOHead
        title="Our Services - Labour Categories"
        description="Explore our comprehensive labour services including masons, electricians, plumbers, painters, construction helpers, and daily labour services in Tinsukia and Doomdooma, Assam."
        keywords="mason service, electrician, plumber, painter, construction helper, daily labour service, Tinsukia, Doomdooma"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-labour-blue/5 via-background to-labour-orange/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Professional labour services for all your construction and maintenance needs
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Available Labour Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide range of skilled workers. All workers are verified,
              experienced, and ready to deliver quality work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="group rounded-2xl bg-card p-8 shadow-md border border-border/40 transition-all hover:shadow-xl hover:scale-105"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-labour-blue/10 to-labour-orange/10">
                  <img
                    src={`/assets/generated/${service.icon}.dim_150x150.png`}
                    alt={`${service.name} icon`}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-labour-blue">
                  {service.name}
                </h3>

                <p className="mb-4 text-muted-foreground">{service.description}</p>

                <div className="mb-4 space-y-2">
                  <h4 className="font-semibold text-sm">Key Services:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-labour-orange flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="font-semibold mr-2">Experience:</span>
                    <span className="text-muted-foreground">{service.experience}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold mr-2">Timeline:</span>
                    <span className="text-muted-foreground">{service.timeline}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center rounded-full bg-labour-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-labour-blue/90 hover:shadow-lg"
                  >
                    Book Now
                  </Link>
                  <a
                    href={`https://wa.me/918136009930?text=${encodeURIComponent(
                      `Hi, I want to book ${service.name} service. Please contact me.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Quick WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Services?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We connect you with the best local workers in Tinsukia and Doomdooma
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-labour-blue/10">
                <span className="text-3xl font-bold text-labour-blue">100%</span>
              </div>
              <h3 className="mb-2 font-semibold">Verified Workers</h3>
              <p className="text-sm text-muted-foreground">
                All workers are background checked and verified
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-labour-orange/10">
                <span className="text-3xl font-bold text-labour-orange">5+</span>
              </div>
              <h3 className="mb-2 font-semibold">Years Experience</h3>
              <p className="text-sm text-muted-foreground">
                Minimum 5 years of professional experience
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-labour-blue/10">
                <span className="text-3xl font-bold text-labour-blue">24/7</span>
              </div>
              <h3 className="mb-2 font-semibold">Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock support for all your queries
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-labour-orange/10">
                <span className="text-3xl font-bold text-labour-orange">₹300</span>
              </div>
              <h3 className="mb-2 font-semibold">Easy Booking</h3>
              <p className="text-sm text-muted-foreground">
                Simple online booking with just ₹300 advance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-labour-blue to-labour-blue/90 p-8 text-white shadow-2xl md:p-12">
            <h3 className="text-3xl font-bold mb-4 text-center">Ready to Get Started?</h3>
            <p className="mb-8 opacity-90 text-center text-lg">
              Book your required labour service now. Quick response, transparent pricing,
              and quality work guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="inline-block rounded-full bg-labour-orange px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:bg-labour-orange/90 hover:shadow-xl hover:scale-105"
              >
                Book Online Now
              </Link>
              <a
                href="tel:+918136009930"
                className="inline-block rounded-full bg-white px-8 py-4 text-center text-lg font-semibold text-labour-blue shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-105"
              >
                Call Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
