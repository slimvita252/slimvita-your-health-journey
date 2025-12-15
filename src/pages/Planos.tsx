import { useState, useEffect, useRef } from "react";
import { Check, Star, Clock, Shield, ChevronRight, Zap, TrendingDown, Users, Award, Sparkles, Activity, Scale, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import CheckoutLoadingScreen from "@/components/CheckoutLoadingScreen";
import BodyTransformationSection from "@/components/BodyTransformationSection";

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

const plans = [
  {
    id: "daily",
    name: "Daily Plan",
    price: 4.99,
    dailyCost: 4.99,
    period: "day",
    highlighted: false,
    checkoutUrl: "https://slimvita.mycartpanda.com/checkout/204621682:1",
  },
  {
    id: "monthly",
    name: "1-Month Plan",
    price: 17.99,
    dailyCost: 0.59,
    period: "month",
    highlighted: false,
    checkoutUrl: "https://slimvita.mycartpanda.com/checkout/204737670:1",
  },
  {
    id: "quarterly",
    name: "3-Month Plan",
    price: 34.99,
    dailyCost: 0.38,
    period: "3 months",
    highlighted: true,
    badge: "MOST POPULAR",
    checkoutUrl: "https://slimvita.mycartpanda.com/checkout/204737671:1",
  },
];

// Dynamic testimonials based on weight loss goals
const getTestimonials = (weightToLose: number, gender: string) => {
  const baseTestimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: `Lost ${Math.min(23, Math.round(weightToLose * 1.5))} lbs in 8 weeks! The personalized walking plan fit perfectly into my busy schedule.`,
      achievement: "Reached goal weight",
    },
    {
      id: 2,
      name: "Jennifer Adams",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: `Finally found something that works! Down ${Math.min(18, Math.round(weightToLose * 1.2))} lbs and feeling more energetic than ever.`,
      achievement: "Energy boost",
    },
    {
      id: 3,
      name: "Michelle Roberts",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: `The daily calorie targets were spot on. Lost ${Math.min(15, Math.round(weightToLose))} lbs without feeling hungry or deprived.`,
      achievement: "Sustainable results",
    },
  ];

  if (gender === "male") {
    return [
      {
        id: 1,
        name: "Michael Johnson",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        text: `Lost ${Math.min(28, Math.round(weightToLose * 1.8))} lbs in 10 weeks! The walking routine was easy to follow and effective.`,
        achievement: "Reached goal weight",
      },
      {
        id: 2,
        name: "David Williams",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        text: `Amazing results! Down ${Math.min(22, Math.round(weightToLose * 1.4))} lbs and my energy levels have never been better.`,
        achievement: "Energy boost",
      },
      {
        id: 3,
        name: "James Anderson",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        text: `The personalized plan made all the difference. Lost ${Math.min(20, Math.round(weightToLose * 1.3))} lbs sustainably.`,
        achievement: "Sustainable results",
      },
    ];
  }

  return baseTestimonials;
};

const Planos = () => {
  const [timeLeft, setTimeLeft] = useState(9 * 60);
  const [isTimerFixed, setIsTimerFixed] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData>({
    currentWeight: 85,
    targetWeight: 70,
    energyLevel: "low",
    goal: "lose-weight",
    gender: "female",
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem("slimvita-user-data");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setUserData(parsed);
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (plansRef.current) {
        const rect = plansRef.current.getBoundingClientRect();
        setIsTimerFixed(rect.top <= 80);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const weightToLose = userData.currentWeight - userData.targetWeight;
  const bmi = userData.healthResults?.bmi || (userData.currentWeight / Math.pow(1.65, 2));
  const bmiCategory = userData.healthResults?.bmiCategory || (bmi >= 30 ? "obese" : bmi >= 25 ? "overweight" : "normal");
  const estimatedWeeks = Math.max(4, Math.round(weightToLose * 2));
  const bodyFatReduction = Math.round(weightToLose * 0.8);

  const energyLabels: Record<string, string> = {
    low: "Low",
    variable: "Variable",
    moderate: "Moderate",
    high: "High",
  };

  const testimonials = getTestimonials(weightToLose, userData.gender);

  const generateWeightProjection = () => {
    const weeks = 12;
    const weeklyLoss = weightToLose / weeks;
    const data = [];
    for (let i = 0; i <= weeks; i++) {
      data.push({
        week: i,
        weight: Math.round((userData.currentWeight - weeklyLoss * i) * 10) / 10,
      });
    }
    return data;
  };

  const projectionData = generateWeightProjection();

  // Show checkout loading screen
  if (showCheckout && selectedPlan) {
    return (
      <CheckoutLoadingScreen
        userData={userData}
        planName={selectedPlan.name}
        checkoutUrl={selectedPlan.checkoutUrl}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Fixed Timer - Urgency/Scarcity Design */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: isTimerFixed ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 z-50 py-3 text-center shadow-lg"
        style={{ background: 'linear-gradient(135deg, hsl(142 69% 45%) 0%, hsl(142 76% 26%) 100%)' }}
      >
        <div className="flex items-center justify-center gap-3 text-white">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Clock className="w-5 h-5" />
          </motion.div>
          <span className="font-semibold text-sm sm:text-base">
            ⚡ EXCLUSIVE OFFER EXPIRES IN:
          </span>
          <motion.span 
            className="font-heading font-bold text-lg sm:text-xl bg-white/20 px-3 py-1 rounded-lg"
            animate={{ scale: timeLeft <= 60 ? [1, 1.05, 1] : 1 }}
            transition={{ repeat: timeLeft <= 60 ? Infinity : 0, duration: 0.5 }}
          >
            {formatTime(timeLeft)}
          </motion.span>
        </div>
      </motion.div>

      <main className="flex-1 pt-20 sm:pt-24">
        {/* Personalized Analysis Section */}
        <section className="py-8 sm:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Your personalized plan is ready
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Your Transformation Journey
              </h1>
              <p className="text-muted-foreground">
                Based on your assessment, here's your personalized path to success
              </p>
            </motion.div>

            {/* Health Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm text-center"
              >
                <Scale className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Current BMI</p>
                <p className={`text-xl font-heading font-bold ${bmi >= 30 ? "text-red-500" : bmi >= 25 ? "text-orange-500" : "text-green-500"}`}>
                  {bmi.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{bmiCategory}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm text-center"
              >
                <Target className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Weight Goal</p>
                <p className="text-xl font-heading font-bold text-foreground">
                  -{weightToLose.toFixed(0)}kg
                </p>
                <p className="text-xs text-muted-foreground">to reach {userData.targetWeight}kg</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm text-center"
              >
                <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Estimated Time</p>
                <p className="text-xl font-heading font-bold text-foreground">
                  {estimatedWeeks}
                </p>
                <p className="text-xs text-muted-foreground">weeks to goal</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm text-center"
              >
                <Activity className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Body Fat</p>
                <p className="text-xl font-heading font-bold text-green-500">
                  -{bodyFatReduction}%
                </p>
                <p className="text-xs text-muted-foreground">projected</p>
              </motion.div>
            </div>

            {/* Before/After Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-sm text-center"
              >
                <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Current</span>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2">
                  {userData.currentWeight}
                  <span className="text-lg text-muted-foreground ml-1">kg</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Energy: {energyLabels[userData.energyLevel] || "Variable"}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary rounded-2xl p-4 sm:p-6 text-primary-foreground shadow-lg text-center"
              >
                <span className="text-xs sm:text-sm opacity-80 uppercase tracking-wider">Goal</span>
                <div className="text-3xl sm:text-4xl font-heading font-bold mt-2">
                  {userData.targetWeight}
                  <span className="text-lg opacity-80 ml-1">kg</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm opacity-80">
                  Energy: High
                </div>
              </motion.div>
            </div>

            {/* Personalized Analysis Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-5 max-w-2xl mx-auto mb-8"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Based on Your Answers
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your BMI of <span className="font-semibold text-foreground">{bmi.toFixed(1)}</span> is currently 
                    {bmi >= 25 ? " above the recommended range" : " within a healthy range"}. 
                    Your personalized SlimVita plan is designed to safely guide you from 
                    <span className="font-semibold text-foreground"> {userData.currentWeight}kg</span> to your goal weight of 
                    <span className="font-semibold text-foreground"> {userData.targetWeight}kg</span> in approximately 
                    <span className="font-semibold text-primary"> {estimatedWeeks} weeks</span>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* AI Body Transformation Preview */}
            <BodyTransformationSection 
              userData={{
                gender: userData.gender,
                currentWeight: userData.currentWeight,
                goalWeight: userData.targetWeight,
                ageRange: undefined,
              }}
            />

            {/* Weight Timeline Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-sm max-w-2xl mx-auto mb-8"
            >
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
                Expected Weight Loss Journey
              </h3>
              <div className="relative h-48 sm:h-56">
                <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-muted-foreground">
                  <span>{userData.currentWeight} kg</span>
                  <span>{Math.round((userData.currentWeight + userData.targetWeight) / 2)} kg</span>
                  <span>{userData.targetWeight} kg</span>
                </div>
                
                <div className="ml-14 h-40 sm:h-48 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="0" stroke="currentColor" strokeOpacity="0.1" />
                    <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" strokeOpacity="0.1" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeOpacity="0.1" />
                    
                    <defs>
                      <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0,5 ${projectionData.map((d, i) => {
                        const x = (i / (projectionData.length - 1)) * 400;
                        const y = 5 + ((d.weight - userData.targetWeight) / weightToLose) * 140;
                        return `L ${x},${y}`;
                      }).join(' ')} L 400,150 L 0,150 Z`}
                      fill="url(#weightGradient)"
                    />
                    <path
                      d={`M 0,5 ${projectionData.map((d, i) => {
                        const x = (i / (projectionData.length - 1)) * 400;
                        const y = 5 + ((d.weight - userData.targetWeight) / weightToLose) * 140;
                        return `L ${x},${y}`;
                      }).join(' ')}`}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    
                    <circle cx="0" cy="5" r="6" fill="hsl(var(--primary))" />
                    <circle cx="400" cy="145" r="6" fill="hsl(var(--primary))" />
                  </svg>
                </div>
                
                <div className="ml-14 flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Now</span>
                  <span>Week 4</span>
                  <span>Week 8</span>
                  <span>Week 12</span>
                </div>
              </div>
            </motion.div>

            {/* Timer Warning - Scarcity Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 max-w-md mx-auto"
            >
              <div 
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, hsl(142 69% 45%) 0%, hsl(142 76% 26%) 100%)' }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1, repeatDelay: 2 }}
                >
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-medium opacity-90">
                    Your personalized plan is reserved for:
                  </span>
                  <motion.span 
                    className="font-heading font-bold text-xl sm:text-2xl"
                    animate={{ scale: timeLeft <= 60 ? [1, 1.1, 1] : 1 }}
                    transition={{ repeat: timeLeft <= 60 ? Infinity : 0, duration: 0.5 }}
                  >
                    {formatTime(timeLeft)}
                  </motion.span>
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                ⚠️ After expiration, you'll need to retake the assessment
              </p>
            </motion.div>
          </div>
        </section>

        {/* Social Proof Banner */}
        <section className="py-4 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">150,000+</span> users transformed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Rated #1</span> wellness program 2025
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">100%</span> secure & private
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans Section */}
        <section ref={plansRef} className="py-8 sm:py-12 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                Choose Your Plan
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                All plans include a 30-day money-back guarantee
              </p>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={cn(
                    "relative rounded-2xl p-5 sm:p-6 transition-all duration-300",
                    plan.highlighted
                      ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02] sm:scale-105"
                      : "bg-card border-2 border-border hover:border-primary/30"
                  )}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      {plan.badge}
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className={cn(
                      "text-lg font-heading font-bold mb-3",
                      plan.highlighted ? "text-primary-foreground" : "text-foreground"
                    )}>
                      {plan.name}
                    </h3>

                    <div className="mb-4">
                      <span className={cn(
                        "text-3xl sm:text-4xl font-heading font-bold",
                        plan.highlighted ? "text-primary-foreground" : "text-foreground"
                      )}>
                        ${plan.price}
                      </span>
                      <span className={cn(
                        "text-sm ml-1",
                        plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        /{plan.period}
                      </span>
                    </div>

                    <div className={cn(
                      "text-sm mb-5 py-2 px-3 rounded-lg",
                      plan.highlighted 
                        ? "bg-primary-foreground/20 text-primary-foreground" 
                        : "bg-accent text-muted-foreground"
                    )}>
                      ${plan.dailyCost}/day
                    </div>

                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      className={cn(
                        "w-full py-5 text-sm font-semibold rounded-xl",
                        plan.highlighted
                          ? "bg-white text-primary-dark hover:bg-white/90"
                          : "bg-primary text-primary-foreground hover:bg-primary-dark"
                      )}
                    >
                      Get Plan
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium">30-Day Money-Back</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium">150,000+ Users</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Testimonials Section */}
        <section className="py-8 sm:py-12 bg-accent/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                People With Similar Goals
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Users with goals similar to yours achieved visible results in the first 21 days
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card rounded-2xl p-5 sm:p-6 border border-border shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-3 h-3",
                              i < Math.floor(testimonial.rating) 
                                ? "fill-secondary text-secondary" 
                                : "text-muted"
                            )} 
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {testimonial.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    "{testimonial.text}"
                  </p>
                  <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    <Check className="w-3 h-3" />
                    {testimonial.achievement}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 sm:py-12 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary-foreground mb-3">
                Start Your Transformation Today
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base mb-6 max-w-md mx-auto">
                Your personalized plan is reserved for a limited time. Don't miss this opportunity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                <Button
                  onClick={() => handleSelectPlan(plans[2])}
                  size="lg"
                  className="bg-white text-primary-dark hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-xl"
                >
                  Get Started Now
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <p className="text-primary-foreground/60 text-xs">
                ⚡ Expires in {formatTime(timeLeft)} — Your personalized plan awaits
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Planos;
