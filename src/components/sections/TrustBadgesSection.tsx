import { Shield, Award, CheckCircle, Heart, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

const TrustBadgesSection = () => {
  const badges = [
    {
      icon: Award,
      title: "#1 Walking Program",
      subtitle: "Best of 2025",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: Users,
      title: "150,000+ Users",
      subtitle: "Across America",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Star,
      title: "4.9/5 Rating",
      subtitle: "45,000+ Reviews",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Shield,
      title: "100% Secure",
      subtitle: "Data Protected",
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <section className="py-12 bg-accent/50 border-y border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badge.bg}`}>
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{badge.title}</p>
                <p className="text-muted-foreground text-xs">{badge.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
