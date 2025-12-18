import { Link } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - Walking/Fitness focused */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=80"
          alt="Woman walking on trail at sunrise for fitness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Weight Lost</p>
              <p className="text-2xl font-bold text-primary">2.5M+ lbs</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-1/3 right-20 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              ].map((img, i) => (
                <img key={i} src={img} alt="" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" />
              ))}
            </div>
            <div>
              <p className="text-white text-sm">{t("hero.activeUsers")}</p>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-8"
          >
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-white mb-6 leading-[1.05]"
          >
            {t("hero.title1")}
            <span className="block text-primary mt-2">{t("hero.title2")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/85 max-w-xl mb-8 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Benefits Quick List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {[
              t("benefits.1.title"),
              t("benefits.5.title"),
              t("benefits.3.title"),
              t("benefits.4.title")
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
              <Link to="/questionario">
                {t("hero.cta1")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-7 text-lg rounded-full backdrop-blur-sm">
              <Link to="/planos">
                {t("hero.cta2")}
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">150K+</p>
              <p className="text-white/70 text-sm mt-1">{t("cta.stat1")}</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="text-3xl md:text-4xl font-bold text-white">94%</p>
              <p className="text-white/70 text-sm mt-1">{t("cta.stat2")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">4.9</p>
              <p className="text-white/70 text-sm mt-1">{t("cta.stat3")}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
