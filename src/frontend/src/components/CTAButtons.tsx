import { useNavigate } from '@tanstack/react-router';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

interface CTAButtonsProps {
  serviceType?: string;
  location?: string;
}

export function CTAButtons({ serviceType, location }: CTAButtonsProps = {}) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate({ to: '/booking' });
  };

  const getWhatsAppUrl = () => {
    const baseUrl = 'https://wa.me/918136009930';
    
    if (serviceType || location) {
      const message = `Hi, I want to book ${serviceType || 'labour service'}${
        location ? ` in ${location}` : ''
      }. Please contact me.`;
      return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    
    return baseUrl;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a
        href="tel:+918136009930"
        className="flex items-center space-x-2 rounded-full bg-labour-blue px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-blue/90 hover:shadow-xl hover:scale-105"
      >
        <Phone className="h-5 w-5" />
        <span>Call Now</span>
      </a>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={handleBookNow}
        className="flex items-center space-x-2 rounded-full bg-labour-orange px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-labour-orange/90 hover:shadow-xl hover:scale-105"
      >
        <Calendar className="h-5 w-5" />
        <span>Book Now</span>
      </button>
    </div>
  );
}
