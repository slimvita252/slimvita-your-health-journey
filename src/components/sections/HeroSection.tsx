import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="People exercising outdoors in a natural environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/85 via-primary-dark/75 to-primary/65" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-28 pb-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2.5 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              {t("hero.badge")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t("hero.title1")}{" "}
            <span className="relative inline-block">
              <span className="text-primary">{t("hero.title2")}</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 2 150 2 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
            </span>
            <br />
            {t("hero.title3")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button asChild variant="hero" size="xl">
              <Link to="/questionario">
                {t("hero.cta1")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/planos">
                <Play className="w-5 h-5" />
                {t("hero.cta2")}
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="flex -space-x-2">
                {["JM", "SK", "AL", "CR", "MT"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-foreground/30 to-primary-foreground/10 border-2 border-primary-dark/50 flex items-center justify-center text-xs font-semibold text-primary-foreground backdrop-blur-sm"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">{t("hero.activeUsers")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary-foreground/80">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm font-medium ml-1.5">{t("hero.rating")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
