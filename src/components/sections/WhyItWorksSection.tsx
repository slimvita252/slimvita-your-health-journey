import { Brain, Target, Users, TrendingUp, CheckCircle, Footprints, Award, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const WhyItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const reasons = [
    {
      icon: Brain,
      title: "Science-Based Walking Programs",
      description: "Developed by certified fitness experts using peer-reviewed research on walking for weight loss.",
    },
    {
      icon: Target,
      title: "100% Personalized For You",
      description: "No generic plans. Every step goal and routine is tailored to your body, goals, and lifestyle.",
    },
    {
      icon: Users,
      title: "24/7 Expert Support Team",
      description: "Real coaches available around the clock to answer questions and keep you on track.",
    },
    {
      icon: TrendingUp,
      title: "Proven, Measurable Results",
      description: "94% of our users report visible improvements within the first 30 days of following their plan.",
    },
  ];

  const stats = [
    { value: "94%", label: "See results in 30 days" },
    { value: "15 lbs", label: "Avg weight loss (12 wks)" },
    { value: "89%", label: "More energy daily" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-accent/30 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                alt="Happy woman walking outdoors achieving fitness goals"
                className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute -bottom-8 -right-8 bg-card rounded-2xl shadow-xl p-6 max-w-xs border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Real Results</span>
                    <p className="text-xs text-muted-foreground">Verified by Users</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-xl font-bold text-primary">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold text-sm">#1 Walking App</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
              Why SlimVita Works
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              The Science Behind
              <span className="text-primary block">Your Transformation</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Unlike generic fitness apps, SlimVita combines behavioral science, personalized walking programs, and adaptive goals to create lasting change—not quick fixes.
            </p>

            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorksSection;
