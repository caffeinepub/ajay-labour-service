import { SEOHead } from '../components/SEOHead';
import { CheckCircle, Users, Award, TrendingUp, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us - Local Labour Service Provider in Assam"
        description="Learn about Ajay Labour Service - connecting verified workers with customers in Tinsukia and Doomdooma, Assam. Founded by a local entrepreneur committed to quality service."
        keywords="about Ajay Labour Service, labour provider Assam, verified workers Tinsukia"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-labour-blue/5 via-background to-labour-orange/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Your trusted partner for quality labour services in Assam
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold md:text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ajay Labour Service was founded with a simple yet powerful vision:
                  to bridge the gap between skilled workers and customers in Tinsukia
                  and Doomdooma, Assam. As a local entrepreneur deeply rooted in the
                  community, our founder recognized the challenges both workers and
                  customers face in finding reliable, verified labour services.
                </p>
                <p>
                  Growing up in Assam, we witnessed firsthand the struggles of
                  talented workers who lacked proper platforms to showcase their
                  skills, and customers who struggled to find trustworthy labour for
                  their projects. This inspired us to create a solution that benefits
                  both parties.
                </p>
                <p>
                  Today, Ajay Labour Service stands as a testament to our commitment
                  to quality, transparency, and community development. We carefully
                  verify every worker, ensuring they meet our high standards of skill
                  and professionalism. Our platform makes it easy for customers to
                  book reliable labour services with confidence.
                </p>
                <p>
                  We take pride in being a local business that understands the unique
                  needs of our community. Every booking supports local workers and
                  their families, contributing to the economic growth of Tinsukia and
                  Doomdooma.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src="/assets/generated/founder-image.dim_400x400.png"
                alt="Founder of Ajay Labour Service"
                className="rounded-2xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Business History Timeline */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Journey</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Key milestones in our growth story
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue text-white font-bold">
                  1
                </div>
                <div className="w-0.5 flex-1 bg-labour-blue/30 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold mb-2">2020 - Foundation</h3>
                <p className="text-muted-foreground">
                  Started with a vision to connect skilled workers with customers in Tinsukia. 
                  Began with just 10 verified workers across 3 service categories.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange text-white font-bold">
                  2
                </div>
                <div className="w-0.5 flex-1 bg-labour-orange/30 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold mb-2">2021 - Expansion</h3>
                <p className="text-muted-foreground">
                  Expanded services to Doomdooma region. Grew our network to 50+ verified 
                  workers and completed 200+ successful projects.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue text-white font-bold">
                  3
                </div>
                <div className="w-0.5 flex-1 bg-labour-blue/30 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold mb-2">2023 - Digital Platform</h3>
                <p className="text-muted-foreground">
                  Launched online booking platform with secure payment integration. 
                  Made booking labour services easier and more transparent for customers.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">2026 - Present</h3>
                <p className="text-muted-foreground">
                  Serving 500+ happy customers with 100+ verified workers. Completed 1000+ 
                  projects and continuing to grow while maintaining quality standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Skilled professionals committed to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-card p-8 shadow-md border border-border/40 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-labour-blue/10">
                  <Users className="h-8 w-8 text-labour-blue" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-labour-blue mb-2">100+</h3>
              <p className="text-muted-foreground">Verified Workers</p>
              <p className="text-sm text-muted-foreground mt-2">
                Across all service categories with proven expertise
              </p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-md border border-border/40 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-labour-orange/10">
                  <Award className="h-8 w-8 text-labour-orange" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-labour-orange mb-2">5-12</h3>
              <p className="text-muted-foreground">Years Experience</p>
              <p className="text-sm text-muted-foreground mt-2">
                Average experience level of our skilled workers
              </p>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-md border border-border/40 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-labour-blue/10">
                  <CheckCircle className="h-8 w-8 text-labour-blue" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-labour-blue mb-2">100%</h3>
              <p className="text-muted-foreground">Verified</p>
              <p className="text-sm text-muted-foreground mt-2">
                Every worker undergoes thorough verification process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Commitments */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Commitments</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Promises we make to every customer
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                <CheckCircle className="h-6 w-6 text-labour-blue" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Verified Workers</h3>
              <p className="text-muted-foreground text-sm">
                Every worker is thoroughly verified for skills, experience, and background 
                before joining our platform.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                <TrendingUp className="h-6 w-6 text-labour-orange" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Transparent Pricing</h3>
              <p className="text-muted-foreground text-sm">
                Clear, upfront pricing with no hidden charges. You know exactly what you're 
                paying for before booking.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                <Users className="h-6 w-6 text-labour-blue" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Quick Response</h3>
              <p className="text-muted-foreground text-sm">
                Fast response times with booking confirmation within 2 hours. Same-day 
                service available for urgent needs.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                <Heart className="h-6 w-6 text-labour-orange" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Customer Satisfaction</h3>
              <p className="text-muted-foreground text-sm">
                Your satisfaction is our priority. We ensure quality work and provide 
                support throughout your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Community Impact</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Making a difference in Tinsukia & Doomdooma
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-br from-labour-blue/10 to-labour-blue/5 p-8 border border-labour-blue/20">
              <h3 className="text-2xl font-bold mb-4 text-labour-blue">
                Local Employment Generation
              </h3>
              <p className="text-muted-foreground mb-4">
                We've created sustainable employment opportunities for 100+ skilled workers 
                in the Tinsukia and Doomdooma regions. By connecting local workers with 
                customers, we help families earn a stable income while contributing to the 
                local economy.
              </p>
              <p className="text-muted-foreground">
                Every booking you make supports a local worker and their family, creating 
                a positive ripple effect in our community.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-labour-orange/10 to-labour-orange/5 p-8 border border-labour-orange/20">
              <h3 className="text-2xl font-bold mb-4 text-labour-orange">
                Service Coverage & Accessibility
              </h3>
              <p className="text-muted-foreground mb-4">
                We proudly serve both Tinsukia and Doomdooma districts, ensuring that 
                quality labour services are accessible to everyone in the region. Our 
                extensive network covers urban areas and surrounding villages.
              </p>
              <p className="text-muted-foreground">
                By making professional labour services easily accessible, we're helping 
                improve infrastructure and living standards across our service areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Mission & Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What drives us every day
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                <CheckCircle className="h-6 w-6 text-labour-blue" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Quality First</h3>
              <p className="text-muted-foreground">
                We verify every worker to ensure they meet our high standards of
                skill and professionalism. Quality workmanship is our guarantee.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                <CheckCircle className="h-6 w-6 text-labour-orange" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Transparency</h3>
              <p className="text-muted-foreground">
                Clear pricing, honest communication, and no hidden charges. We
                believe in building trust through transparency.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                <CheckCircle className="h-6 w-6 text-labour-blue" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Community Focus</h3>
              <p className="text-muted-foreground">
                Supporting local workers and contributing to the economic growth of
                Tinsukia and Doomdooma is at the heart of what we do.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                <CheckCircle className="h-6 w-6 text-labour-orange" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Reliability</h3>
              <p className="text-muted-foreground">
                Quick response times, dependable workers, and consistent service
                delivery. You can count on us.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-blue/10">
                <CheckCircle className="h-6 w-6 text-labour-blue" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Customer Satisfaction</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our success. We go the extra mile to ensure
                every customer is happy with our service.
              </p>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-labour-orange/10">
                <CheckCircle className="h-6 w-6 text-labour-orange" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Fair Practices</h3>
              <p className="text-muted-foreground">
                Fair wages for workers and fair prices for customers. We believe in
                ethical business practices that benefit everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-labour-blue md:text-5xl">500+</div>
              <div className="mt-2 text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-labour-orange md:text-5xl">100+</div>
              <div className="mt-2 text-sm text-muted-foreground">Verified Workers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-labour-blue md:text-5xl">1000+</div>
              <div className="mt-2 text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-labour-orange md:text-5xl">2</div>
              <div className="mt-2 text-sm text-muted-foreground">Service Areas</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
