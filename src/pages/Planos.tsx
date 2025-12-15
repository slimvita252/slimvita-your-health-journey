import { useState, useEffect, useRef } from "react";
import { Check, Star, Clock, Shield, ChevronRight, Zap, Users, Award, Scale, Target, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
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

const getTestimonials = (weightToLose: number, gender: string) => {
  if (gender === "male") {
    return [
      {
        id: 1,
        name: "Michael Johnson",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        text: `Lost ${Math.min(28, Math.round(weightToLose * 1.8))} lbs in 10 weeks! The walking routine was easy to follow.`,
        achievement: "Reached goal",
      },
      {
        id: 2,
        name: "David Williams",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        text: `Down ${Math.min(22, Math.round(weightToLose * 1.4))} lbs and my energy levels have never been better.`,
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
  return [
    {
      id: 1,
      name: "Sarah Mitchell",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: `Lost ${Math.min(23, Math.round(weightToLose * 1.5))} lbs in 8 weeks! Perfect for my busy schedule.`,
      achievement: "Reached goal",
    },
    {
      id: 2,
      name: "Jennifer Adams",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: `Finally found something that works! Down ${Math.min(18, Math.round(weightToLose * 1.2))} lbs and feeling great.`,
      achievement: "Energy boost",
    },
    {
      id: 3,
      name: "Michelle Roberts",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: `Lost ${Math.min(15, Math.round(weightToLose))} lbs without feeling hungry or deprived.`,
      achievement: "Sustainable results",
    },
  ];
};

const Planos = () => {
  const [timeLeft, setTimeLeft] = useState(9 * 60);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
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
        setUserData(JSON.parse(storedData));
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
  const testimonials = getTestimonials(weightToLose, userData.gender);

  if (showCheckout && selectedPlan) {
    return (
      <CheckoutLoadingScreen
        userData={userData}
        planName={selectedPlan.name}
        checkoutUrl={selectedPlan.checkoutUrl}
      />
    );
  }

  // Plans Component (reusable for mobile sticky)
  const PlansCard = ({ compact = false }: { compact?: boolean }) => (
    <div className={cn("space-y-3", compact && "pb-4")}>
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 * index, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className={cn(
            "relative rounded-2xl p-4 transition-shadow duration-300",
            plan.highlighted
              ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
              : "bg-card border border-border hover:shadow-md"
          )}
        >
          {plan.badge && (
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              {plan.badge}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h3 className={cn(
                "font-bold",
                plan.highlighted ? "text-primary-foreground" : "text-foreground"
              )}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-2xl font-bold",
                  plan.highlighted ? "text-primary-foreground" : "text-foreground"
                )}>
                  ${plan.price}
                </span>
                <span className={cn(
                  "text-sm",
                  plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  /{plan.period}
                </span>
              </div>
              <span className={cn(
                "text-xs",
                plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                ${plan.dailyCost}/day
              </span>
            </div>

            <Button
              onClick={() => handleSelectPlan(plan)}
              size="sm"
              className={cn(
                "rounded-xl font-semibold",
                plan.highlighted
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-primary text-primary-foreground"
              )}
            >
              Get Plan
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Fixed Timer Banner */}
      <div 
        className="fixed top-16 left-0 right-0 z-40 py-2 text-center shadow-md"
        style={{ background: 'linear-gradient(135deg, hsl(142 69% 45%) 0%, hsl(142 76% 26%) 100%)' }}
      >
        <div className="flex items-center justify-center gap-2 text-white">
          <Clock className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-medium">OFFER EXPIRES:</span>
          <span className="font-bold text-lg bg-white/20 px-2 py-0.5 rounded">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <main className="flex-1 pt-28">
        {/* Hero Section - Quick Summary */}
        <section className="py-6 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                <Zap className="w-3 h-3" />
                Your personalized plan is ready
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                Your Personalized Plan Is Ready
              </h1>
            </motion.div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto mb-6">
              <div className="bg-card rounded-xl p-2 text-center border border-border">
                <Scale className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className={cn(
                  "text-lg font-bold",
                  bmi >= 30 ? "text-red-500" : bmi >= 25 ? "text-orange-500" : "text-green-500"
                )}>
                  {bmi.toFixed(1)}
                </p>
                <p className="text-[10px] text-muted-foreground">BMI</p>
              </div>
              <div className="bg-card rounded-xl p-2 text-center border border-border">
                <Target className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">-{weightToLose.toFixed(0)}</p>
                <p className="text-[10px] text-muted-foreground">kg goal</p>
              </div>
              <div className="bg-card rounded-xl p-2 text-center border border-border">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{estimatedWeeks}</p>
                <p className="text-[10px] text-muted-foreground">weeks</p>
              </div>
              <div className="bg-card rounded-xl p-2 text-center border border-border">
                <Activity className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-green-500">-{Math.round(weightToLose * 0.8)}%</p>
                <p className="text-[10px] text-muted-foreground">body fat</p>
              </div>
            </div>

            {/* MOBILE: Plans immediately after stats */}
            <div className="lg:hidden mb-6">
              <h2 className="text-lg font-heading font-bold text-center mb-3">Choose Your Plan</h2>
              <PlansCard />
              
              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-primary" />
                  <span>30-Day Money-Back</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-primary" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>

            {/* DESKTOP: Two Column Layout */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Left Column - Analysis & Avatar */}
              <div className="lg:col-span-3 space-y-6">
                {/* Personalized Message */}
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4">
                  <p className="text-sm text-muted-foreground">
                    Your BMI of <span className="font-semibold text-foreground">{bmi.toFixed(1)}</span> is 
                    {bmi >= 25 ? " above recommended" : " healthy"}. 
                    Your SlimVita plan will guide you from 
                    <span className="font-semibold text-foreground"> {userData.currentWeight}kg</span> to 
                    <span className="font-semibold text-foreground"> {userData.targetWeight}kg</span> in ~
                    <span className="font-semibold text-primary">{estimatedWeeks} weeks</span>.
                  </p>
                </div>

                {/* Avatar Section - Non-blocking */}
                <BodyTransformationSection 
                  userData={{
                    gender: userData.gender,
                    currentWeight: userData.currentWeight,
                    goalWeight: userData.targetWeight,
                  }}
                />

                {/* Testimonials */}
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-foreground">People With Similar Goals</h3>
                  {testimonials.slice(0, 2).map((t) => (
                    <div key={t.id} className="bg-card rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">{t.name}</p>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("w-3 h-3", i < Math.floor(t.rating) ? "fill-secondary text-secondary" : "text-muted")} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">"{t.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Sticky Plans */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <div className="bg-card rounded-2xl p-5 border border-border shadow-lg">
                    <h2 className="text-xl font-heading font-bold text-center mb-4">Choose Your Plan</h2>
                    <PlansCard />
                    
                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-primary" />
                        <span>30-Day Money-Back</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-primary" />
                        <span>Cancel Anytime</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-primary" />
                        <span>150,000+ Users</span>
                      </div>
                    </div>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                      ⚠️ Plan reserved for <span className="font-bold text-primary">{formatTime(timeLeft)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE ONLY: Avatar & Extra Content Below Plans */}
        <section className="lg:hidden py-6 bg-background">
          <div className="container mx-auto px-4 space-y-6">
            {/* Avatar Section */}
            <BodyTransformationSection 
              userData={{
                gender: userData.gender,
                currentWeight: userData.currentWeight,
                goalWeight: userData.targetWeight,
              }}
            />

            {/* Social Proof */}
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  <span><strong>150,000+</strong> users</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-primary" />
                  <span><strong>#1</strong> wellness 2025</span>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground text-center">Success Stories</h3>
              {testimonials.map((t) => (
                <div key={t.id} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3 h-3", i < Math.floor(t.rating) ? "fill-secondary text-secondary" : "text-muted")} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-8 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-heading font-bold text-primary-foreground mb-2">
              Start Your Transformation Today
            </h2>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Your personalized plan is reserved for a limited time.
            </p>
            <Button
              onClick={() => handleSelectPlan(plans[2])}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-5 font-semibold rounded-xl"
            >
              Get Started Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-primary-foreground/60 text-xs mt-3">
              ⚡ Expires in {formatTime(timeLeft)}
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* MOBILE: Sticky CTA Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-3 shadow-lg">
        <Button
          onClick={() => handleSelectPlan(plans[2])}
          className="w-full py-5 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Get Your Plan — ${plans[2].price}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Planos;
