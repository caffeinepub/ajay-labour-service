export function ProjectGallery() {
  const projects = [
    {
      image: '/assets/generated/gallery-mason.dim_400x300.png',
      category: 'Mason Work',
      description: 'Residential construction project',
    },
    {
      image: '/assets/generated/gallery-electrical.dim_400x300.png',
      category: 'Electrical Work',
      description: 'Complete home wiring installation',
    },
    {
      image: '/assets/generated/gallery-plumbing.dim_400x300.png',
      category: 'Plumbing Work',
      description: 'Bathroom and kitchen plumbing',
    },
    {
      image: '/assets/generated/gallery-painting.dim_400x300.png',
      category: 'Painting Work',
      description: 'Interior and exterior painting',
    },
    {
      image: '/assets/generated/gallery-construction.dim_400x300.png',
      category: 'Construction',
      description: 'Commercial building project',
    },
    {
      image: '/assets/generated/gallery-completed.dim_400x300.png',
      category: 'Completed Project',
      description: 'Finished residential property',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Our Work</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Quality projects completed across Tinsukia & Doomdooma
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all border border-border/40"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.category}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg mb-1">
                  {project.category}
                </h3>
                <p className="text-white/90 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
