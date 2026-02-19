import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      image: '/assets/generated/testimonial-1.dim_100x100.png',
      rating: 5,
      review:
        'Excellent service! The mason they sent was very skilled and completed my house construction work on time. Very professional and transparent pricing.',
    },
    {
      name: 'Priya Sharma',
      image: '/assets/generated/testimonial-2.dim_100x100.png',
      rating: 5,
      review:
        'I needed an electrician urgently and they arranged one within hours. The work quality was outstanding and the worker was very polite. Highly recommended!',
    },
    {
      name: 'Amit Borah',
      image: '/assets/generated/testimonial-3.dim_100x100.png',
      rating: 5,
      review:
        'Best labour service in Tinsukia! I have used their services multiple times for different projects. Always reliable and the workers are well-verified.',
    },
    {
      name: 'Sunita Devi',
      image: '/assets/generated/testimonial-4.dim_100x100.png',
      rating: 5,
      review:
        'Very happy with the painting work done at my home. The painter was experienced and finished the job beautifully. Fair pricing and no hidden charges.',
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real feedback from satisfied customers across Tinsukia & Doomdooma
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl bg-card p-6 shadow-md hover:shadow-lg transition-shadow border border-border/40"
            >
              <div className="mb-4 flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-labour-blue/20"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <div className="flex space-x-1 mt-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-labour-orange text-labour-orange"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
