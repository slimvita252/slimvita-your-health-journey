import { ClipboardCheck, Sparkles, Rocket, ArrowRight, Footprints, Heart, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const steps = [
    {
      number: "01",
      icon: ClipboardCheck,
      title: "Take the Free Assessment",
      description: "Answer a few simple questions about your goals, fitness level, and schedule. Our algorithm analyzes your unique profile to create the perfect starting point.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: Footprints,
      title: "Get Your Personal Walking Plan",
      description: "Receive a customized walking program designed for your body and lifestyle. Includes daily step goals, workout duration, intensity levels, and nutrition tips.",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80",
      color: "from-primary to-primary-dark",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Track Progress & See Results",
      description: "Follow your plan, track your walks, and watch the pounds melt away. Most users see visible results within 2-4 weeks of consistent effort.",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            How SlimVita Works
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Getting started is easy. In just 3 simple steps, you'll have a personalized walking plan designed to help you reach your goals.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              {/* Image */}
              <div className={cn("relative group", index % 2 === 1 && "lg:order-2")}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Number Badge */}
                <div className={cn(
                  "absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl",
                  step.color
                )}>
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
                {/* Decorative Ring */}
                <div className="absolute -top-4 -left-4 w-32 h-32 border-4 border-primary/20 rounded-full" />
              </div>

              {/* Content */}
              <div className={cn(index % 2 === 1 && "lg:order-1")}>
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg",
                  step.color
                )}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>
                {index === 2 && (
                  <Button asChild className="rounded-full px-8 py-6 text-base">
                    <Link to="/questionario">
                      Start Your Free Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
