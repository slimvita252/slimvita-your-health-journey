import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Brain, CheckCircle2, Loader2, Sparkles, Target, TrendingDown, Zap } from "lucide-react";
import Logo from "./Logo";

interface UserData {
  currentWeight: number;
  targetWeight: number;
  energyLevel: string;
  goal: string;
  gender: string;
  healthResults?: {
    bmi: number;
    bmiCategory: string;
    bmr: number;
    tdee: number;
    targetCalories: number;
  };
}

interface CheckoutLoadingScreenProps {
  userData: UserData;
  planName: string;
  checkoutUrl: string;
}

const analysisSteps = [
  { text: "Analyzing your body profile...", icon: Activity },
  { text: "Evaluating your metabolic data...", icon: Brain },
  { text: "Calculating optimal treatment path...", icon: Target },
  { text: "Comparing with successful cases...", icon: TrendingDown },
  { text: "Finalizing your personalized plan...", icon: Sparkles },
];

const CheckoutLoadingScreen = ({ userData, planName, checkoutUrl }: CheckoutLoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);

  const weightToLose = userData.currentWeight - userData.targetWeight;
  const estimatedWeeks = Math.max(4, Math.round(weightToLose * 2));
  const bmi = userData.healthResults?.bmi || (userData.currentWeight / Math.pow(1.65, 2));
  const bmiCategory = userData.healthResults?.bmiCategory || (bmi >= 25 ? "overweight" : "normal");

  useEffect(() => {
    // Progress through steps
    const stepTimers = analysisSteps.map((_, index) => 
      setTimeout(() => setCurrentStep(index + 1), 600 * (index + 1))
    );

    // Show analysis after steps
    const analysisTimer = setTimeout(() => setShowAnalysis(true), 600 * analysisSteps.length + 500);
    
    // Show redirect message and redirect
    const redirectTimer = setTimeout(() => setShowRedirect(true), 600 * analysisSteps.length + 2500);
    const finalRedirect = setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 600 * analysisSteps.length + 4000);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(analysisTimer);
      clearTimeout(redirectTimer);
      clearTimeout(finalRedirect);
    };
  }, [checkoutUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4"
    >
      <div className="max-w-lg w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Logo variant="dark" className="w-32 mx-auto mb-4" />
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-2">
            We are finalizing your personalized plan
          </h1>
          <p className="text-sm text-muted-foreground">
            Based on your body profile, goals, and lifestyle
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="space-y-3 mb-8">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon;
            const isComplete = currentStep > index;
            const isCurrent = currentStep === index + 1;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: currentStep >= index ? 1 : 0.3, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isComplete 
                    ? "bg-primary/10 border border-primary/30" 
                    : isCurrent 
                      ? "bg-accent border border-border" 
                      : "bg-muted/50"
                }`}
              >
                <div className={`p-2 rounded-lg ${isComplete ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-sm ${isComplete ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {step.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Analysis Results */}
        <AnimatePresence>
          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-5 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground">Your Analysis Summary</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Current BMI</span>
                  <span className={`font-semibold ${bmi >= 30 ? "text-red-500" : bmi >= 25 ? "text-orange-500" : "text-green-500"}`}>
                    {bmi.toFixed(1)} ({bmiCategory})
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Weight Goal</span>
                  <span className="font-semibold text-foreground">
                    {userData.currentWeight}kg → {userData.targetWeight}kg
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Estimated Timeline</span>
                  <span className="font-semibold text-primary">{estimatedWeeks} weeks</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Energy Improvement</span>
                  <span className="font-semibold text-green-500">+65% expected</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-xl">
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary font-medium">Based on your answers:</span> Your BMI indicates you're in the {bmiCategory} range. 
                  Your personalized SlimVita plan is designed to safely guide you to your goal weight of {userData.targetWeight}kg 
                  with a sustainable approach.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Redirect Message */}
        <AnimatePresence>
          {showRedirect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">Redirecting to secure checkout...</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Your {planName} is reserved for the next 5 minutes
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CheckoutLoadingScreen;
