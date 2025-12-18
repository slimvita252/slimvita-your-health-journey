import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/planos", label: t("nav.home") },
    { href: "/planos#how-it-works", label: t("nav.howItWorks") },
    { href: "/planos#testimonials", label: t("nav.successStories") },
    { href: "/planos", label: t("nav.plans") },
    { href: "/planos#support", label: t("nav.support") },
  ];

  const isHomePage = location.pathname === "/" || location.pathname === "/questionario";
  const isLight = !isScrolled && isHomePage;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHomePage
            ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50 py-3"
            : "bg-gradient-to-b from-black/40 via-black/20 to-transparent py-4 sm:py-5"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Logo variant={isLight ? "light" : "dark"} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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

          {/* Desktop Right Side */}
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
              <Link to="/">{t("nav.startAssessment")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-3 -mr-2 rounded-xl transition-all duration-300 active:scale-95",
              isLight ? "text-white active:bg-white/10" : "text-foreground active:bg-accent"
            )}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Side Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-background z-[1000] lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <Logo variant="dark" />
                  <motion.button
                    whileTap={{ scale: 0.9, rotate: 90 }}
                    className="p-2.5 rounded-xl bg-accent text-foreground transition-colors hover:bg-accent/80"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Drawer Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4">
                  <div className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          className="flex items-center justify-between text-foreground hover:text-primary font-medium text-lg py-4 px-4 rounded-xl hover:bg-accent transition-all duration-200 active:scale-[0.98]"
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Drawer Footer */}
                <div className="p-5 border-t border-border space-y-4">
                  <Button 
                    asChild 
                    className="w-full py-6 text-base font-semibold rounded-xl bg-primary hover:bg-primary-dark"
                  >
                    <Link to="/" onClick={closeMobileMenu}>
                      {t("nav.startAssessmentFull")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    {t("nav.joinUsers")}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;