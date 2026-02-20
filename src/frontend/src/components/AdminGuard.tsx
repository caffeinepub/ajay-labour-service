import { ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Shield, LogIn, Loader2 } from 'lucide-react';

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading, isFetched } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const isInitializing = loginStatus === 'initializing';

  const principalId = identity?.getPrincipal().toString() || 'none';

  console.log('[AdminGuard] Current status:', {
    isAuthenticated,
    principalId,
    isAdmin,
    adminLoading,
    isFetched,
    loginStatus,
    timestamp: new Date().toISOString()
  });

  // Show loading while initializing or checking admin status
  if (isInitializing || (isAuthenticated && adminLoading)) {
    console.log('[AdminGuard] Showing loading state:', {
      isInitializing,
      adminLoading,
      principalId
    });
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-labour-blue" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    console.log('[AdminGuard] User not authenticated, showing login prompt');
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Shield className="mx-auto h-16 w-16 text-labour-blue mb-4" />
          <h2 className="text-2xl font-bold mb-2">Admin Access Required</h2>
          <p className="text-muted-foreground mb-6">
            Please login to access the admin dashboard.
          </p>
          <Button
            onClick={() => {
              console.log('[AdminGuard] Login button clicked');
              login();
            }}
            disabled={isLoggingIn}
            className="bg-labour-blue hover:bg-labour-blue/90"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login with Internet Identity
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Show access denied if authenticated but not admin
  if (isAuthenticated && isFetched && !isAdmin) {
    console.log('[AdminGuard] Access denied:', {
      principalId,
      isAdmin,
      isFetched
    });
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Shield className="mx-auto h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access the admin dashboard. This area is restricted to administrators only.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Principal ID: {principalId}
          </p>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Render admin content if authenticated and admin
  if (isAuthenticated && isAdmin) {
    console.log('[AdminGuard] Access granted to admin dashboard:', {
      principalId,
      isAdmin
    });
    return <>{children}</>;
  }

  // Fallback loading state
  console.log('[AdminGuard] Fallback loading state');
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-labour-blue" />
        <p className="mt-4 text-muted-foreground">Verifying access...</p>
      </div>
    </div>
  );
}
