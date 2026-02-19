import { Outlet, Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { Footer } from './Footer';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Booking', path: '/booking' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-labour-blue">
              Ajay Labour Service
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium transition-colors hover:text-labour-blue"
                activeProps={{ className: 'text-labour-blue' }}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-1 rounded-full bg-labour-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-labour-orange/90"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium transition-colors hover:text-labour-blue"
                  activeProps={{ className: 'text-labour-blue' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center space-x-1 rounded-full bg-labour-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-labour-orange/90"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
