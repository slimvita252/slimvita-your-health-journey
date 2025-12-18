import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnalysisScreenProps {
  onComplete: () => void;
}

const AnalysisScreen = ({ onComplete }: AnalysisScreenProps) => {
  const { t } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const dynamicMessages = [
    t("analysis.msg1"),
    t("analysis.msg2"),
    t("analysis.msg3"),
    t("analysis.msg4"),
  ];

  useEffect(() => {
    // Rotate messages every 800ms
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % 4);
    }, 800);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 60);

    // Complete after 3 seconds
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-primary/10 via-background to-accent/20 flex flex-col items-center justify-center px-6"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Scanning lines */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Pulsing circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
            initial={{ width: 100, height: 100, opacity: 0.5 }}
            animate={{
              width: [100 + i * 80, 300 + i * 80, 100 + i * 80],
              height: [100 + i * 80, 300 + i * 80, 100 + i * 80],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Logo variant="dark" className="w-32 md:w-40" />
      </motion.div>

      {/* AI Analysis Icon */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-2 md:inset-3 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Analysis bars */}
          <div className="flex gap-1 items-end h-8 md:h-10">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 md:w-2 bg-white rounded-full"
                animate={{
                  height: ["40%", "100%", "60%", "80%", "40%"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [
                Math.cos((i * 2 * Math.PI) / 3) * 60 - 6,
                Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 60 - 6,
                Math.cos((i * 2 * Math.PI) / 3) * 60 - 6,
              ],
              y: [
                Math.sin((i * 2 * Math.PI) / 3) * 60 - 6,
                Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 60 - 6,
                Math.sin((i * 2 * Math.PI) / 3) * 60 - 6,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground text-center mb-3"
      >
        {t("analysis.title")}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-base md:text-lg text-muted-foreground text-center max-w-md mb-8 px-4"
      >
        {t("analysis.subtitle")}
      </motion.p>

      {/* Dynamic messages */}
      <div className="h-8 mb-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base text-primary font-medium text-center"
          >
            {dynamicMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ delay: 0.6 }}
        className="max-w-xs w-full"
      >
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {progress}%
        </p>
      </motion.div>

      {/* Loading dots at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary/60 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AnalysisScreen;
