import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
    { href: "/#como-funciona", label: t("nav.howItWorks") },
    { href: "/#testimonials", label: t("nav.successStories") },
    { href: "/planos", label: t("nav.plans") },
    { href: "/#support", label: t("nav.support") },
  ];

  const isHomePage = location.pathname === "/";
  const isLight = !isScrolled && isHomePage;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50 py-3"
          : "bg-gradient-to-b from-black/40 via-black/20 to-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo variant={isLight ? "light" : "dark"} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-[15px] font-medium tracking-wide transition-all duration-300 relative group py-2",
                isLight
                  ? "text-white/90 hover:text-white"
                  : "text-gray-700 hover:text-primary"
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
          <LanguageSelector variant={isLight ? "light" : "dark"} />
          <Button 
            asChild 
            className={cn(
              "font-semibold px-6 py-2.5 rounded-full transition-all duration-300",
              isLight 
                ? "bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl" 
                : "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg"
            )}
          >
            <Link to="/questionario">{t("nav.startAssessment")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -mr-2 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isLight ? "text-white" : "text-gray-800")} />
          ) : (
            <Menu className={cn("w-6 h-6", isLight ? "text-white" : "text-gray-800")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-gray-700 hover:text-primary font-medium py-3.5 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-4 py-4 border-t border-gray-100 mt-2">
            <LanguageSelector variant="dark" />
          </div>
          <Button asChild className="mt-2 mx-4 rounded-full">
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
