import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-labour-blue">
              Assam Labour Service
            </h3>
            <p className="text-sm text-muted-foreground">
              Verified labour service provider in Tinsukia and Doomdooma, Assam.
              Connecting trusted local workers with customers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-labour-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-labour-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-muted-foreground hover:text-labour-blue transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-labour-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-labour-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-labour-orange" />
                <a href="tel:+918136009930" className="text-muted-foreground hover:text-labour-blue transition-colors">
                  +91 8136009930
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-labour-orange" />
                <a href="mailto:ajayyadavddm@gmail.com" className="text-muted-foreground hover:text-labour-blue transition-colors">
                  ajayyadavddm@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-labour-orange" />
                <span className="text-muted-foreground">
                  Tinsukia & Doomdooma, Assam
                </span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Service Areas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Tinsukia</li>
              <li>Doomdooma</li>
              <li>Assam Region</li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-labour-blue transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-labour-blue transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-labour-blue transition-colors">
                <SiX className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Assam Labour Service. All rights reserved.
          </p>
          <p className="mt-2">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-labour-blue hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
