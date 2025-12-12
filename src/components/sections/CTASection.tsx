import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CTASection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    "Personalized workout & nutrition plan",
    "Expert coaching support included",
    "Cancel anytime, no contracts",
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80"
          alt="Fitness motivation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/90 to-primary/85" />
      </div>

      <div ref={ref} className="relative container mx-auto px-6">
        <div className={cn(
          "max-w-4xl mx-auto text-center transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              Limited Offer: Start Your 7-Day Free Trial
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <span className="block text-white/90">Your Health & Body?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join 150,000+ members who've already started their transformation journey. 
            Your personalized plan is just one assessment away.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg rounded-full shadow-2xl">
              <Link to="/questionario">
                Start Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg rounded-full">
              <Link to="/planos">
                View All Plans
              </Link>
            </Button>
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <Shield className="w-4 h-4" />
            <span>7-day money-back guarantee · No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
