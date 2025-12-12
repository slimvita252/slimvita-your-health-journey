import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/planos", label: "Home" },
    { href: "/planos#how-it-works", label: "How It Works" },
    { href: "/planos#testimonials", label: "Success Stories" },
    { href: "/planos", label: "Plans" },
    { href: "/planos#support", label: "Support" },
  ];

  const isHomePage = location.pathname === "/" || location.pathname === "/questionario";
  const isLight = !isScrolled && isHomePage;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50 py-3"
          : "bg-gradient-to-b from-black/40 via-black/20 to-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo variant={isLight ? "light" : "dark"} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                "text-[15px] font-medium tracking-wide transition-all duration-300 relative group py-2",
                isLight
                  ? "text-white/90 hover:text-white"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full",
                isLight ? "bg-white" : "bg-primary"
              )} />
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-5">
          <Button 
            asChild 
            className={cn(
              "font-semibold px-6 py-2.5 rounded-full transition-all duration-300",
              isLight 
                ? "bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl" 
                : "bg-primary text-primary-foreground hover:bg-primary-dark shadow-md hover:shadow-lg"
            )}
          >
            <Link to="/">Start Assessment</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -mr-2 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isLight ? "text-white" : "text-foreground")} />
          ) : (
            <Menu className={cn("w-6 h-6", isLight ? "text-white" : "text-foreground")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-x-0 top-full bg-background/98 backdrop-blur-xl border-b border-border shadow-xl transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-foreground hover:text-primary font-medium py-3.5 px-4 rounded-xl hover:bg-accent transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-4 mx-4 rounded-full">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Start Assessment
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
