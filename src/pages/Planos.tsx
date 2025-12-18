import { useEffect, useState } from "react";
import { Check, ChevronRight, Clock, Shield, Star, Zap } from "lucide-react";

import BodyTransformationSection from "@/components/BodyTransformationSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

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

const Planos = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(9 * 60);
  const [userData, setUserData] = useState<UserData>({
    currentWeight: 85,
    targetWeight: 70,
    energyLevel: "low",
    goal: "lose-weight",
    gender: "female",
  });

  const plans = [
    {
      id: "daily",
      name: t("plans.daily"),
      desc: t("plans.dailyDesc"),
      price: 4.99,
      dailyCost: 4.99,
      period: t("plans.daily").toLowerCase(),
      highlighted: false,
      checkoutUrl: "https://slimvita.mycartpanda.com/checkout/204621682:1",
    },
    {
      id: "monthly",
      name: t("plans.monthly"),
      desc: t("plans.monthlyDesc"),
      price: 17.99,
      dailyCost: 0.59,
      period: "30 days",
      highlighted: false,
      checkoutUrl: "https://slimvita.mycartpanda.com/checkout/204737670:1",
    },
    {
      id: "quarterly",
      name: t("plans.quarterly"),
      desc: t("plans.quarterlyDesc"),
      price: 34.99,
      dailyCost: 0.38,
      period: "3 months",
      highlighted: true,
      badge: t("plans.mostPopular"),
      checkoutUrl: "https://slimvita.mycartpanda.com/checkout/204737671:1",
    },
  ];

  const getTestimonials = (weightToLose: number, gender: string) => {
    const isMale = (gender || "").toLowerCase().includes("male") || (gender || "").toLowerCase().includes("man");

    if (isMale) {
      return [
        {
          id: 1,
          name: "Michael Johnson",
          rating: 5.0,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          text: `Lost ${Math.min(28, Math.round(weightToLose * 1.8))} lbs in 10 weeks. Clear structure and easy to follow.`,
        },
        {
          id: 2,
          name: "David Williams",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          text: `Down ${Math.min(22, Math.round(weightToLose * 1.4))} lbs and my energy is noticeably better day to day.`,
        },
        {
          id: 3,
          name: "James Anderson",
          rating: 5.0,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          text: `The plan felt tailored to my routine. Steady progress without extreme dieting.`,
        },
      ];
    }

    return [
      {
        id: 1,
        name: "Sarah Mitchell",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        text: `Lost ${Math.min(23, Math.round(weightToLose * 1.5))} lbs in 8 weeks. Consistent, realistic, and sustainable.`,
      },
      {
        id: 2,
        name: "Jennifer Adams",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        text: `I felt supported and guided. Down ${Math.min(18, Math.round(weightToLose * 1.2))} lbs and more energized.`,
      },
      {
        id: 3,
        name: "Michelle Roberts",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        text: `Clear steps and no guesswork. Progress without feeling deprived.`,
      },
    ];
  };

  // Load CartPanda script only on this page
  useEffect(() => {
    const scriptId = "cartpanda-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/cpsales.js";
      script.type = "text/javascript";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const storedData = sessionStorage.getItem("slimvita-user-data");
    if (storedData) {
      try {
        setUserData(JSON.parse(storedData));
      } catch {
        // no-op
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

  // Direct redirect - no shared state
  const redirectToCheckout = (url: string) => {
    window.location.href = url;
  };

  const heightFallbackMeters = 1.65;
  const weightToLose = Math.max(0, userData.currentWeight - userData.targetWeight);
  const bmi = userData.healthResults?.bmi || userData.currentWeight / (heightFallbackMeters * heightFallbackMeters);
  const estimatedWeeks = Math.max(4, Math.round(weightToLose * 2));
  const testimonials = getTestimonials(weightToLose, userData.gender);


  const PlansCard = () => (
    <div className="space-y-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "relative rounded-2xl p-4 border transition-all duration-200",
            "hover:shadow-md hover:-translate-y-[1px]",
            plan.highlighted
              ? "bg-primary text-primary-foreground border-primary/30"
              : "bg-card text-foreground border-border"
          )}
        >
          {plan.badge && (
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              {plan.badge}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className={cn("font-bold", plan.highlighted ? "text-primary-foreground" : "text-foreground")}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className={cn("text-2xl font-bold", plan.highlighted ? "text-primary-foreground" : "text-foreground")}>
                  ${plan.price}
                </span>
                <span className={cn("text-sm", plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  /{plan.period}
                </span>
              </div>
              <span className={cn("text-xs", plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>
                ${plan.dailyCost}{t("plans.perDay")}
              </span>
            </div>

            <Button
              onClick={() => redirectToCheckout(plan.checkoutUrl)}
              size="sm"
              className={cn(
                "rounded-xl font-semibold",
                plan.highlighted ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-primary-foreground"
              )}
            >
              {t("plans.getPlan")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-primary" />
          <span>{t("plans.guarantee")}</span>
        </div>
        <div className="flex items-center gap-1">
          <Check className="w-3 h-3 text-primary" />
          <span>{t("plans.secure")}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-20 pb-24 lg:pb-0">
        <section className="py-6 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            {/* 1) Headline (personalized) */}
            <header className="text-center mb-5 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                <Zap className="w-3 h-3" />
                {t("plans.badge")}
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                {t("plans.title")}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {t("plans.subtitle")} BMI: <span className="font-semibold text-foreground">{bmi.toFixed(1)}</span>. 
                {t("plans.targetWeight")}: <span className="font-semibold text-foreground">{userData.targetWeight}kg</span> (~{estimatedWeeks} weeks)
              </p>
            </header>

            {/* 2) Plans (priority) */}
            <section aria-label="Plans" className="max-w-3xl mx-auto">
              <PlansCard />
            </section>

            {/* 3) Social proof (reviews) */}
            <section aria-label="Reviews" className="mt-8 max-w-4xl mx-auto">
              <div className="text-center mb-4">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-foreground">{t("testimonials.title")}</h2>
                <p className="text-sm text-muted-foreground">{t("testimonials.subtitle")}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {testimonials.map((testimonial) => (
                  <article key={testimonial.id} className="bg-card rounded-2xl p-5 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name} review photo`}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3",
                                i < Math.floor(testimonial.rating) ? "fill-secondary text-secondary" : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                  </article>
                ))}
              </div>
            </section>

            {/* 4) Countdown timer (discreet) */}
            <section aria-label="Countdown" className="mt-8 max-w-lg mx-auto">
              <div className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-xl bg-accent text-accent-foreground">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{t("plans.timer")}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground text-lg">{formatTime(timeLeft)}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* 5) Avatar (secondary) */}
            <section aria-label="Body Avatar" className="mt-8 max-w-3xl mx-auto">
              <BodyTransformationSection
                userData={{
                  gender: userData.gender,
                  currentWeight: userData.currentWeight,
                  goalWeight: userData.targetWeight,
                }}
              />
            </section>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile: Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-3 shadow-lg">
        <Button onClick={() => redirectToCheckout("https://slimvita.mycartpanda.com/checkout/204737671:1")} className="w-full py-5 font-bold rounded-xl">
          {t("plans.getPlan")} — ${plans[2].price}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Planos;
