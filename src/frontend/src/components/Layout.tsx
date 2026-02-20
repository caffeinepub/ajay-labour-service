import { Outlet, Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Phone, Shield, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { useQueryClient } from '@tanstack/react-query';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { identity, login, clear, loginStatus, loginError } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const hasLoginError = loginStatus === 'loginError';

  const [showError, setShowError] = useState(false);

  // Log authentication state changes
  useEffect(() => {
    console.log('[Layout] Authentication state changed:', {
      isAuthenticated,
      principalId: identity?.getPrincipal().toString() || 'none',
      loginStatus,
      isAdmin
    });
  }, [isAuthenticated, identity, loginStatus, isAdmin]);

  useEffect(() => {
    if (hasLoginError && loginError) {
      console.error('[Layout] Login error occurred:', loginError);
      setShowError(true);
      // Auto-hide error after 5 seconds
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasLoginError, loginError]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleAuth = async () => {
    setShowError(false);
    
    if (isAuthenticated) {
      console.log('[Layout] Logging out user:', identity?.getPrincipal().toString());
      await clear();
      queryClient.clear();
      console.log('[Layout] Logout complete, cache cleared');
    } else {
      console.log('[Layout] Initiating login');
      try {
        await login();
        console.log('[Layout] Login successful');
      } catch (error: any) {
        console.error('[Layout] Login error:', {
          message: error.message,
          error
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-labour-blue">
              Assam Labour Service
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
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-labour-blue"
                activeProps={{ className: 'text-labour-blue' }}
              >
                <Shield className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <a
              href="tel:+918136009930"
              className="flex items-center space-x-1 rounded-full bg-labour-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-labour-orange/90"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              variant={isAuthenticated ? 'outline' : 'default'}
              size="sm"
              className={!isAuthenticated ? 'bg-labour-blue hover:bg-labour-blue/90' : ''}
            >
              {isLoggingIn ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
            </Button>
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

        {/* Login Error Alert */}
        {showError && loginError && (
          <div className="container mx-auto px-4 py-2">
            <Alert variant="destructive" className="relative">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{loginError.message}</span>
                <button
                  onClick={() => setShowError(false)}
                  className="ml-4 text-sm underline hover:no-underline"
                >
                  Dismiss
                </button>
              </AlertDescription>
            </Alert>
          </div>
        )}

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
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-labour-blue"
                  activeProps={{ className: 'text-labour-blue' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <a
                href="tel:+918136009930"
                className="flex items-center justify-center space-x-1 rounded-full bg-labour-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-labour-orange/90"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                className={!isAuthenticated ? 'bg-labour-blue hover:bg-labour-blue/90' : ''}
              >
                {isLoggingIn ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
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
