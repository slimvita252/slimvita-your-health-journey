import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const IntroScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [phase, setPhase] = useState<"loading" | "hero" | "transitioning">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already completed the questionnaire
    const hasCompleted = sessionStorage.getItem("slimvita-questionnaire-completed");
    if (hasCompleted) {
      navigate("/", { replace: true });
      return;
    }

    // Progress bar animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 4;
      });
    }, 25);

    // Phase transitions
    const heroTimer = setTimeout(() => setPhase("hero"), 1200);
    const transitionTimer = setTimeout(() => setPhase("transitioning"), 2800);
    const navigateTimer = setTimeout(() => {
      navigate("/questionario", { replace: true });
    }, 3300);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(heroTimer);
      clearTimeout(transitionTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "transitioning" ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=80"
          alt="Woman walking for fitness"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {phase === "loading" && (
            <motion.div
              key="loading"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Logo */}
              <div className="[&_a]:pointer-events-none">
                <div className="[&_span]:text-4xl md:[&_span]:text-6xl">
                  <Logo variant="light" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-10 w-64 md:w-80">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-white/60 text-sm text-center">
                  {t("intro.preparing")}
                </p>
              </div>
            </motion.div>
          )}

          {(phase === "hero" || phase === "transitioning") && (
            <motion.div
              key="hero"
              className="flex flex-col items-center text-center max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <motion.div
                className="[&_a]:pointer-events-none mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="[&_span]:text-3xl md:[&_span]:text-4xl">
                  <Logo variant="light" />
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t("intro.headline1")}
                <span className="block text-primary mt-2">{t("intro.headline2")}</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-lg md:text-2xl text-white/80 max-w-2xl mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t("intro.subheadline")}
              </motion.p>

              {/* Loading indicator for auto-redirect */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
                <span className="text-white/60 text-sm">{t("intro.starting")}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Stats */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 md:gap-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase !== "loading" ? 1 : 0, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {[
          { value: "150K+", label: t("intro.users") },
          { value: "94%", label: t("intro.success") },
          { value: "4.9★", label: t("intro.rating") },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-white/50 text-xs md:text-sm">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;