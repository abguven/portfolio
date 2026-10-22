"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

// Decided from the static route config during render, not in an effect: the
// prerendered HTML then holds the page itself instead of a spinner, so crawlers
// and link previews that do not run JavaScript see the content.
function isRouteEnabled(pathname: string | null): boolean {
  if (!pathname) return false;

  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }

  const dynamicRoutes = ["/blog", "/work"] as const;
  for (const route of dynamicRoutes) {
    if (pathname.startsWith(route) && routes[route]) {
      return true;
    }
  }

  return false;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const routeEnabled = isRouteEnabled(pathname);
  const isPasswordRequired = Boolean(
    pathname && protectedRoutes[pathname as keyof typeof protectedRoutes],
  );
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // Only a password-protected page waits for the browser: the auth cookie is checked there.
  const [loading, setLoading] = useState(isPasswordRequired);

  useEffect(() => {
    if (!isPasswordRequired) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      setLoading(true);
      setIsAuthenticated(false);
      const response = await fetch("/api/check-auth");
      if (response.ok) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname, isPasswordRequired]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!routeEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
