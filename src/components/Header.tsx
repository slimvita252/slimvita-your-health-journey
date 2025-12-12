import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/planos", label: t("nav.plans") },
    { href: "/#como-funciona", label: t("nav.howItWorks") },
    { href: "/#beneficios", label: t("nav.benefits") },
  ];

  const isHomePage = location.pathname === "/";
  const isLight = !isScrolled && isHomePage;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-background/98 backdrop-blur-xl shadow-sm border-b border-border/50 py-3"
          : "bg-gradient-to-b from-primary-dark/95 via-primary-dark/80 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo variant={isLight ? "light" : "dark"} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 relative group",
                isLight
                  ? "text-primary-foreground/90 hover:text-primary-foreground"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                isLight ? "bg-primary-foreground" : "bg-primary"
              )} />
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-6">
          <LanguageSelector variant={isLight ? "light" : "dark"} />
          <Button 
            asChild 
            variant={isLight ? "heroOutline" : "default"} 
            size="default"
            className={cn(
              "font-medium",
              !isLight && "shadow-sm"
            )}
          >
            <Link to="/questionario">{t("nav.startAssessment")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isLight ? "text-primary-foreground" : "text-foreground")} />
          ) : (
            <Menu className={cn("w-6 h-6", isLight ? "text-primary-foreground" : "text-foreground")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-x-0 top-full bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-lg transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-foreground/80 hover:text-foreground font-medium py-3 px-4 rounded-lg hover:bg-muted transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-4 py-3">
            <LanguageSelector variant="dark" />
          </div>
          <Button asChild className="mt-2 mx-4">
            <Link to="/questionario" onClick={() => setIsMobileMenuOpen(false)}>
              {t("nav.startAssessment")}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
