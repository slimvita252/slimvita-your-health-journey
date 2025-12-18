import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import QuestionnaireStep from "@/components/questionnaire/QuestionnaireStep";
import AnalysisScreen from "@/components/AnalysisScreen";
import ResultsScreen from "@/components/ResultsScreen";
import { questions } from "@/data/questionnaireQuestions";
import { calculateHealthMetrics } from "@/lib/healthCalculations";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  [key: string]: string | string[] | number;
}

type ScreenState = "questionnaire" | "analysis" | "results";

const Questionario = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [screenState, setScreenState] = useState<ScreenState>("questionnaire");
  const [healthResults, setHealthResults] = useState<ReturnType<typeof calculateHealthMetrics> | null>(null);
  const [formData, setFormData] = useState<FormData>({
    height: 170,
    currentWeight: 75,
    targetWeight: 65,
    challenges: [],
  });

  // Get translated questions
  const translatedQuestions = useMemo(() => {
    return questions.map(q => {
      const titleKey = `quiz.${q.id}.title`;
      const subtitleKey = `quiz.${q.id}.subtitle`;
      
      const translatedOptions = q.options?.map(opt => ({
        ...opt,
        label: t(`quiz.${q.id}.${opt.value}`) || opt.label,
        description: t(`quiz.${q.id}.${opt.value}Desc`) || opt.description,
      }));

      return {
        ...q,
        title: t(titleKey) !== titleKey ? t(titleKey) : q.title,
        subtitle: t(subtitleKey) !== subtitleKey ? t(subtitleKey) : q.subtitle,
        options: translatedOptions,
        placeholder: q.type === "email" ? t("quiz.email.placeholder") : q.placeholder,
      };
    });
  }, [t]);

  const currentQuestion = translatedQuestions[currentStep];
  const totalSteps = translatedQuestions.length;

  const handleSelect = useCallback((value: string) => {
    const originalQuestion = questions[currentStep];
    if (originalQuestion.type === "multi") {
      const current = (formData[originalQuestion.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setFormData((prev) => ({ ...prev, [originalQuestion.id]: updated }));
    } else {
      setFormData((prev) => ({ ...prev, [originalQuestion.id]: value }));
      // Auto-advance for single select after a brief delay
      if (originalQuestion.type === "single" && currentStep < totalSteps - 1) {
        setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
      }
    }
  }, [currentStep, totalSteps, formData]);

  const handleSliderChange = useCallback((value: number) => {
    const originalQuestion = questions[currentStep];
    setFormData((prev) => ({ ...prev, [originalQuestion.id]: value }));
  }, [currentStep]);

  const handleInputChange = useCallback((value: string) => {
    const originalQuestion = questions[currentStep];
    setFormData((prev) => ({ ...prev, [originalQuestion.id]: value }));
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit form - validate email first
      const email = formData.email as string;
      if (!email || !email.includes("@")) {
        toast({
          title: t("quiz.required"),
          description: t("quiz.requiredDesc"),
          variant: "destructive",
        });
        return;
      }
      
      // Calculate health metrics
      const results = calculateHealthMetrics({
        gender: formData.gender as string || "female",
        age: formData.age as string || "25-34",
        height: formData.height as number || 170,
        currentWeight: formData.currentWeight as number || 75,
        targetWeight: formData.targetWeight as number || 65,
        activityLevel: formData.activityLevel as string || "sedentary",
        goal: formData.goal as string || "lose-weight",
      });
      
      setHealthResults(results);
      setScreenState("analysis");
    }
  };

  const handleAnalysisComplete = () => {
    // After analysis, show results
    setScreenState("results");
  };

  const handleResultsComplete = () => {
    // Store form data and results for plans page
    sessionStorage.setItem("slimvita-questionnaire-completed", "true");
    sessionStorage.setItem("slimvita-user-data", JSON.stringify({
      currentWeight: formData.currentWeight,
      targetWeight: formData.targetWeight,
      energyLevel: formData.energyLevel,
      goal: formData.goal,
      gender: formData.gender,
      healthResults: healthResults,
    }));
    navigate("/planos");
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    const originalQuestion = questions[currentStep];
    const value = formData[originalQuestion.id];
    switch (originalQuestion.type) {
      case "single":
        return value !== undefined && value !== "";
      case "multi":
        return Array.isArray(value) && value.length > 0;
      case "slider":
      case "number":
        return value !== undefined;
      case "email":
      case "input":
        return typeof value === "string" && value.trim() !== "";
      default:
        return true;
    }
  };

  const renderQuestionContent = () => {
    const originalQuestion = questions[currentStep];
    
    switch (originalQuestion.type) {
      case "single":
      case "multi":
        return (
          <QuestionnaireStep
            title={currentQuestion.title}
            subtitle={currentQuestion.subtitle}
            options={currentQuestion.options}
            selectedValue={formData[originalQuestion.id] as string | string[]}
            onSelect={handleSelect}
            multiSelect={originalQuestion.type === "multi"}
            backgroundImage={originalQuestion.backgroundImage}
            columns={originalQuestion.columns}
          />
        );

      case "slider":
        const sliderValue = (formData[originalQuestion.id] as number) || originalQuestion.min || 0;
        return (
          <QuestionnaireStep
            title={currentQuestion.title}
            subtitle={currentQuestion.subtitle}
            backgroundImage={originalQuestion.backgroundImage}
          >
            <div className="max-w-md mx-auto mt-8">
              <div className="text-center mb-8">
                <span className="text-6xl md:text-7xl font-heading font-bold text-primary">
                  {sliderValue}
                </span>
                <span className="text-2xl text-muted-foreground ml-2">
                  {originalQuestion.unit}
                </span>
              </div>
              <input
                type="range"
                min={originalQuestion.min}
                max={originalQuestion.max}
                value={sliderValue}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{originalQuestion.min} {originalQuestion.unit}</span>
                <span>{originalQuestion.max} {originalQuestion.unit}</span>
              </div>
            </div>
          </QuestionnaireStep>
        );

      case "email":
        return (
          <QuestionnaireStep
            title={currentQuestion.title}
            subtitle={currentQuestion.subtitle}
          >
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={currentQuestion.placeholder || "your@email.com"}
                  value={(formData[originalQuestion.id] as string) || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="pl-12 h-14 rounded-xl border-2 text-base focus:border-primary"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                🔒 Your privacy is protected.
              </p>
            </div>
          </QuestionnaireStep>
        );

      default:
        return null;
    }
  };

  // Show analysis screen when triggered
  if (screenState === "analysis") {
    return <AnalysisScreen onComplete={handleAnalysisComplete} />;
  }

  // Show results screen after analysis
  if (screenState === "results" && healthResults) {
    return <ResultsScreen results={healthResults} onComplete={handleResultsComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/30 flex flex-col safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Logo variant="dark" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {t("quiz.step")} {currentStep + 1} {t("quiz.of")} {totalSteps}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="sticky top-[57px] sm:top-[65px] z-30 bg-background/95 backdrop-blur-lg border-b border-border/30 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <ProgressBar current={currentStep + 1} total={totalSteps} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderQuestionContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="sticky bottom-0 bg-background/98 backdrop-blur-lg border-t border-border/50 py-3 sm:py-4 safe-area-bottom">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              size="lg"
              className={cn(
                "transition-all px-3 sm:px-4 py-5 sm:py-6 text-sm sm:text-base",
                currentStep === 0 && "opacity-0 pointer-events-none"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">{t("quiz.back")}</span>
            </Button>

            <div className="flex-1 text-center">
              <span className="text-xs sm:text-sm text-muted-foreground">
                {currentStep + 1} / {totalSteps}
              </span>
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              size="lg"
              className="min-w-[100px] sm:min-w-[140px] bg-primary hover:bg-primary-dark px-4 sm:px-6 py-5 sm:py-6 text-sm sm:text-base"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-1 sm:mr-2" />
                  <span>{t("quiz.finish")}</span>
                </>
              ) : (
                <>
                  <span>{t("quiz.next")}</span>
                  <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Questionario;
