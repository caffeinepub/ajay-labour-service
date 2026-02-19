import { CheckCircle, Clock, DollarSign, Headphones } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: CheckCircle,
      title: 'Verified Workers',
      description: 'All workers are background verified and skilled',
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Fast response within 2 hours of booking',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden charges, clear pricing upfront',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: '24/7 support for all your queries',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border/40 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4 rounded-full bg-labour-blue/10 p-3">
              <Icon className="h-8 w-8 text-labour-blue" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{badge.title}</h3>
            <p className="text-sm text-muted-foreground">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}
