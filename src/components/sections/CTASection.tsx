import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80"
          alt="Fitness motivation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/90 to-primary/80" />
      </div>

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-medium">Limited Time: 50% Off First Month</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to Start Your
            <span className="block text-primary-light">Transformation?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join 150,000+ Americans who've already transformed their health. 
            Your personalized walking plan is waiting.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {["Personalized walking plan", "Nutrition guidance", "Money-back guarantee"].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-primary-light" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <Button asChild size="lg" className="bg-white text-primary-dark hover:bg-white/90 font-bold px-10 py-7 text-lg rounded-full shadow-2xl">
            <Link to="/">
              Start Free Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm mt-8">
            <Shield className="w-4 h-4" />
            <span>30-day money-back guarantee · Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
