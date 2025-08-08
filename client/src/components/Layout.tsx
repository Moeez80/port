import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home", id: "home" },
    { href: "/portfolio", label: "Portfolio", id: "portfolio" },
    { href: "/about", label: "About", id: "about" },
    { href: "/contact", label: "Contact", id: "contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-40 border-b border-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-3xl font-bold text-accent cursor-pointer" style={{fontFamily: 'Dancing Script, cursive'}}>Moeez Imran</h1>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`transition-colors ${
                      isActive(link.href)
                        ? "text-white"
                        : "text-muted-foreground hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-white"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-secondary/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`block px-3 py-2 transition-colors ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-accent mb-4" style={{fontFamily: 'Dancing Script, cursive'}}>Moeez Imran</h3>
            <p className="text-muted-foreground mb-6">Professional Thumbnail Designer</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <i className="fab fa-behance text-xl"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-muted pt-8">
            <p className="text-muted-foreground">&copy; 2024 Moeez Imran. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
