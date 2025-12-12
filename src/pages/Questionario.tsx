import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import QuestionnaireStep from "@/components/questionnaire/QuestionnaireStep";
import { questions } from "@/data/questionnaireQuestions";

interface FormData {
  [key: string]: string | string[] | number;
}

const Questionario = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    height: 170,
    currentWeight: 75,
    targetWeight: 65,
    challenges: [],
  });

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;

  const handleSelect = useCallback((value: string) => {
    if (currentQuestion.type === "multi") {
      const current = (formData[currentQuestion.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setFormData((prev) => ({ ...prev, [currentQuestion.id]: updated }));
    } else {
      setFormData((prev) => ({ ...prev, [currentQuestion.id]: value }));
      // Auto-advance for single select after a brief delay
      if (currentQuestion.type === "single" && currentStep < totalSteps - 1) {
        setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
      }
    }
  }, [currentQuestion, currentStep, totalSteps, formData]);

  const handleSliderChange = useCallback((value: number) => {
    setFormData((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }, [currentQuestion]);

  const handleInputChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }, [currentQuestion]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit form
      const email = formData.email as string;
      if (!email || !email.includes("@")) {
        toast({
          title: "Valid email required",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      // Mark questionnaire as completed
      sessionStorage.setItem("slimvita-questionnaire-completed", "true");
      toast({
        title: "Assessment Complete! 🎉",
        description: "Redirecting to your personalized plans...",
      });
      setTimeout(() => navigate("/planos"), 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    const value = formData[currentQuestion.id];
    switch (currentQuestion.type) {
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
    switch (currentQuestion.type) {
      case "single":
      case "multi":
        return (
          <QuestionnaireStep
            title={currentQuestion.title}
            subtitle={currentQuestion.subtitle}
            options={currentQuestion.options}
            selectedValue={formData[currentQuestion.id] as string | string[]}
            onSelect={handleSelect}
            multiSelect={currentQuestion.type === "multi"}
            backgroundImage={currentQuestion.backgroundImage}
            columns={currentQuestion.columns}
          />
        );

      case "slider":
        const sliderValue = (formData[currentQuestion.id] as number) || currentQuestion.min || 0;
        return (
          <QuestionnaireStep
            title={currentQuestion.title}
            subtitle={currentQuestion.subtitle}
            backgroundImage={currentQuestion.backgroundImage}
          >
            <div className="max-w-md mx-auto mt-8">
              <div className="text-center mb-8">
                <span className="text-6xl md:text-7xl font-heading font-bold text-primary">
                  {sliderValue}
                </span>
                <span className="text-2xl text-muted-foreground ml-2">
                  {currentQuestion.unit}
                </span>
              </div>
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={sliderValue}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{currentQuestion.min} {currentQuestion.unit}</span>
                <span>{currentQuestion.max} {currentQuestion.unit}</span>
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
                  value={(formData[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="pl-12 h-14 rounded-xl border-2 text-base focus:border-primary"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                🔒 Your privacy is protected. We never share your data.
              </p>
            </div>
          </QuestionnaireStep>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/30 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo variant="dark" />
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-muted-foreground">
                Your Personal Assessment
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="sticky top-[73px] z-30 bg-background/80 backdrop-blur-lg border-b border-border/30 py-4">
        <div className="container mx-auto px-4">
          <ProgressBar current={currentStep + 1} total={totalSteps} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12">
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
      <footer className="sticky bottom-0 bg-background/95 backdrop-blur-lg border-t border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={cn(
                "transition-all",
                currentStep === 0 && "opacity-0 pointer-events-none"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex-1 text-center">
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} of {totalSteps}
              </span>
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="min-w-[120px] bg-primary hover:bg-primary-dark"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get My Plan
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
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
