import { SEOHead } from '../components/SEOHead';
import { CheckCircle, Users, Award, TrendingUp, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us - Local Labour Service Provider in Assam"
        description="Learn about Assam Labour Service - connecting verified workers with customers in Tinsukia and Doomdooma, Assam. Founded by a local entrepreneur committed to quality service."
        keywords="about Assam Labour Service, labour provider Assam, verified workers Tinsukia"
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
                  Assam Labour Service was founded with a simple yet powerful vision:
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
                  Today, Assam Labour Service stands as a testament to our commitment
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
                alt="Founder of Assam Labour Service"
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
                  Launched our online booking platform, making it easier for customers to 
                  connect with verified workers. Introduced transparent pricing and instant booking.
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
                  Now serving 100+ verified workers across 7 service categories. Completed 
                  1000+ projects with 500+ satisfied customers across Tinsukia and Doomdooma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Workers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Dedicated professionals committed to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-card p-8 shadow-md border border-border/40 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-labour-blue" />
              <h3 className="text-4xl font-bold text-labour-blue mb-2">100+</h3>
              <p className="text-lg font-semibold mb-2">Verified Workers</p>
              <p className="text-sm text-muted-foreground">
                Skilled professionals across all service categories
              </p>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-md border border-border/40 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-labour-orange" />
              <h3 className="text-4xl font-bold text-labour-orange mb-2">5+</h3>
              <p className="text-lg font-semibold mb-2">Years Experience</p>
              <p className="text-sm text-muted-foreground">
                Average experience of our skilled workers
              </p>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-md border border-border/40 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-labour-blue" />
              <h3 className="text-4xl font-bold text-labour-blue mb-2">1000+</h3>
              <p className="text-lg font-semibold mb-2">Projects Completed</p>
              <p className="text-sm text-muted-foreground">
                Successfully delivered projects across Assam
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
            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <CheckCircle className="h-10 w-10 mb-4 text-labour-blue" />
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                We ensure every worker meets our strict quality standards through 
                thorough verification and continuous monitoring.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <Heart className="h-10 w-10 mb-4 text-labour-orange" />
              <h3 className="text-xl font-bold mb-3">Community Focus</h3>
              <p className="text-muted-foreground">
                Supporting local workers and their families while serving our 
                community with reliable labour services.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <Award className="h-10 w-10 mb-4 text-labour-blue" />
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                Clear pricing, honest communication, and no hidden charges. 
                What you see is what you get.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <Users className="h-10 w-10 mb-4 text-labour-orange" />
              <h3 className="text-xl font-bold mb-3">Customer Satisfaction</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We go the extra mile to ensure 
                you're happy with our service.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <TrendingUp className="h-10 w-10 mb-4 text-labour-blue" />
              <h3 className="text-xl font-bold mb-3">Continuous Improvement</h3>
              <p className="text-muted-foreground">
                Always learning and improving our services based on customer 
                feedback and industry best practices.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <CheckCircle className="h-10 w-10 mb-4 text-labour-orange" />
              <h3 className="text-xl font-bold mb-3">Reliability</h3>
              <p className="text-muted-foreground">
                Dependable service you can count on. We show up on time and 
                deliver what we promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-labour-blue to-labour-blue/90 p-8 text-white shadow-2xl md:p-12">
            <h3 className="text-3xl font-bold mb-4 text-center">Our Community Impact</h3>
            <p className="mb-6 opacity-90 text-center text-lg">
              Every booking you make supports local workers and contributes to the 
              economic development of Tinsukia and Doomdooma.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-sm opacity-90">Families Supported</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">₹10L+</div>
                <div className="text-sm opacity-90">Paid to Workers</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
