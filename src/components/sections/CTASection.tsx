import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={cn(
            "relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-16 overflow-hidden",
            isVisible && "animate-scale-in"
          )}
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground text-sm font-medium">
                {t("cta.badge")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
              {t("cta.title")}
            </h2>

            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/questionario">
                  {t("cta.button1")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/planos">{t("cta.button2")}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                  10k+
                </div>
                <div className="text-primary-foreground/70 text-sm">{t("cta.stat1")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                  95%
                </div>
                <div className="text-primary-foreground/70 text-sm">{t("cta.stat2")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                  4.9
                </div>
                <div className="text-primary-foreground/70 text-sm">{t("cta.stat3")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
