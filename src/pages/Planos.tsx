import { Link } from "react-router-dom";
import { Check, Star, Zap, Shield, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyItWorksSection from "@/components/sections/WhyItWorksSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const plans = [
  {
    name: "Starter",
    price: 19,
    period: "month",
    description: "Perfect for beginning your walking journey.",
    features: [
      "Weekly personalized walking plan",
      "Basic progress tracking",
      "Access to SlimVita app",
      "Exercise library",
      "Community support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 39,
    period: "month",
    description: "Our most popular plan for consistent results.",
    features: [
      "Daily personalized walking plan",
      "Nutrition guidance included",
      "Expert coaching support",
      "Full analytics dashboard",
      "Advanced progress reports",
      "Weekly challenges",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start Pro Plan",
    badge: "Most Popular",
  },
  {
    name: "Premium",
    price: 59,
    period: "month",
    description: "Complete experience with exclusive support.",
    features: [
      "Everything in Pro",
      "1-on-1 coaching sessions",
      "Monthly live check-ins",
      "Detailed meal planning",
      "Weekly plan adjustments",
      "Early access to features",
      "24/7 dedicated support",
    ],
    highlighted: false,
    cta: "Go Premium",
  },
];

const Planos = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section for Plans */}
        <section className="pt-32 pb-24 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
                Your Personal Plan is Ready
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Choose Your
                <span className="text-primary"> Transformation</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                Based on your assessment, we've prepared personalized walking plans. 
                All plans include a 30-day money-back guarantee.
              </p>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "relative rounded-3xl p-8 transition-all duration-500",
                    plan.highlighted
                      ? "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-2xl shadow-primary/30 md:scale-105 z-10"
                      : "bg-card border-2 border-border hover:border-primary/30 hover:shadow-xl"
                  )}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className={cn(
                      "text-2xl font-heading font-bold mb-2",
                      plan.highlighted ? "text-primary-foreground" : "text-foreground"
                    )}>
                      {plan.name}
                    </h3>
                    <p className={cn(
                      "text-sm mb-6",
                      plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={cn(
                        "text-lg",
                        plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        $
                      </span>
                      <span className={cn(
                        "text-5xl font-heading font-bold",
                        plan.highlighted ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {plan.price}
                      </span>
                      <span className={cn(
                        "text-lg",
                        plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          plan.highlighted ? "bg-primary-foreground/20" : "bg-primary/10"
                        )}>
                          <Check className={cn(
                            "w-3 h-3",
                            plan.highlighted ? "text-primary-foreground" : "text-primary"
                          )} />
                        </div>
                        <span className={cn(
                          "text-sm",
                          plan.highlighted ? "text-primary-foreground/90" : "text-foreground"
                        )}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    className={cn(
                      "w-full py-6 text-base font-semibold rounded-xl",
                      plan.highlighted
                        ? "bg-white text-primary-dark hover:bg-white/90"
                        : "bg-primary text-primary-foreground hover:bg-primary-dark"
                    )}
                    size="lg"
                  >
                    <Link to="/confirmacao">
                      {plan.highlighted && <Zap className="w-4 h-4 mr-2" />}
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">150,000+ Happy Users</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Rest of the site content */}
        <HowItWorksSection />
        <WhyItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Planos;
