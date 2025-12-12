import { Footprints, Salad, BarChart3, Users, Clock, Target, Flame, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const BenefitsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const benefits = [
    {
      icon: Footprints,
      title: "Personalized Walking Plans",
      description: "Custom step goals and walking routines designed for your fitness level and schedule.",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80",
    },
    {
      icon: Salad,
      title: "Nutrition Guidance",
      description: "Simple, healthy eating tips that complement your walking routine for faster results.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    },
    {
      icon: BarChart3,
      title: "Progress Dashboard",
      description: "Track your walks, calories, and progress with an intuitive visual dashboard.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join thousands of members who motivate and inspire each other daily.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    },
    {
      icon: Clock,
      title: "Fits Your Schedule",
      description: "15-60 minute plans that adapt to your busy lifestyle. No gym required.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80",
    },
    {
      icon: Flame,
      title: "Burn More Calories",
      description: "Optimized walking techniques that maximize calorie burn and fat loss.",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-white to-accent/30">
      <div ref={ref} className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
            What You Get
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Everything You Need to
            <span className="text-primary"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            SlimVita gives you all the tools, guidance, and support you need to transform your health through walking.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
