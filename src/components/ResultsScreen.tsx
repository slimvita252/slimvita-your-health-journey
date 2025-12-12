import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Flame, Heart, Scale, Target, TrendingDown, Zap } from "lucide-react";
import Logo from "./Logo";

interface HealthResults {
  bmi: number;
  bmiCategory: string;
  bmiMessage: string;
  bmr: number;
  bmrMessage: string;
  tdee: number;
  tdeeMessage: string;
  calorieTarget: number;
  calorieMessage: string;
  weightToLose: number;
  estimatedWeeks: number;
  personalPlanMessage: string;
}

interface ResultsScreenProps {
  results: HealthResults;
  onComplete: () => void;
}

const ResultsScreen = ({ results, onComplete }: ResultsScreenProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Reveal sections one by one
    const timers = [
      setTimeout(() => setCurrentSection(1), 500),
      setTimeout(() => setCurrentSection(2), 1200),
      setTimeout(() => setCurrentSection(3), 1900),
      setTimeout(() => setCurrentSection(4), 2600),
      setTimeout(() => setShowAll(true), 3300),
      setTimeout(() => onComplete(), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case "underweight": return "text-yellow-500";
      case "normal weight": return "text-green-500";
      case "overweight": return "text-orange-500";
      case "obese": return "text-red-500";
      default: return "text-primary";
    }
  };

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    unit, 
    message, 
    delay,
    accentColor = "text-primary"
  }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    unit: string;
    message: string;
    delay: number;
    accentColor?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:p-6"
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className={`p-2 md:p-3 rounded-xl bg-primary/10 ${accentColor}`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-1 mb-2">
            <span className={`text-2xl md:text-3xl font-heading font-bold ${accentColor}`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            <span className="text-sm md:text-base text-muted-foreground">{unit}</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-accent/20 overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <Logo variant="dark" className="w-28 md:w-36 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            Your Personalized Results
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Based on your assessment, here's what we found
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="flex-1 max-w-2xl mx-auto w-full space-y-4 md:space-y-5">
          {/* BMI Card */}
          {currentSection >= 1 && (
            <MetricCard
              icon={Scale}
              title="Body Mass Index (BMI)"
              value={results.bmi.toFixed(1)}
              unit={`• ${results.bmiCategory}`}
              message={results.bmiMessage}
              delay={0}
              accentColor={getBMICategoryColor(results.bmiCategory)}
            />
          )}

          {/* BMR Card */}
          {currentSection >= 2 && (
            <MetricCard
              icon={Flame}
              title="Basal Metabolic Rate (BMR)"
              value={results.bmr}
              unit="kcal/day"
              message={results.bmrMessage}
              delay={0}
              accentColor="text-orange-500"
            />
          )}

          {/* TDEE Card */}
          {currentSection >= 3 && (
            <MetricCard
              icon={Activity}
              title="Total Daily Energy Expenditure"
              value={results.tdee}
              unit="kcal/day"
              message={results.tdeeMessage}
              delay={0}
              accentColor="text-blue-500"
            />
          )}

          {/* Calorie Target Card */}
          {currentSection >= 4 && (
            <MetricCard
              icon={Target}
              title="Recommended Daily Intake"
              value={results.calorieTarget}
              unit="kcal/day"
              message={results.calorieMessage}
              delay={0}
              accentColor="text-primary"
            />
          )}

          {/* Personal Plan Message */}
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-5 md:p-6"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-xl bg-primary text-primary-foreground">
                    <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-medium text-foreground mb-2">
                      Your Personalized Plan
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {results.personalPlanMessage}
                    </p>
                    
                    {results.weightToLose > 0 && (
                      <div className="mt-4 flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                        <TrendingDown className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Target weight loss</p>
                          <p className="text-lg font-bold text-foreground">
                            {results.weightToLose.toFixed(1)} kg
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                              in ~{results.estimatedWeeks} weeks
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading to next step */}
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center py-6"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  Preparing your personalized plans...
                </p>
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full"
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;
