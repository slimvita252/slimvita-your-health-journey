import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface QuestionnaireStepProps {
  title: string;
  subtitle?: string;
  options?: Option[];
  selectedValue?: string | string[];
  onSelect?: (value: string) => void;
  multiSelect?: boolean;
  backgroundImage?: string;
  children?: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

const QuestionnaireStep = ({
  title,
  subtitle,
  options,
  selectedValue,
  onSelect,
  multiSelect = false,
  backgroundImage,
  children,
  columns = 2,
}: QuestionnaireStepProps) => {
  const isSelected = (value: string) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    }
    return selectedValue === value;
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <motion.div
      className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl sm:rounded-3xl">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 px-2">
        <motion.h2
          className="text-xl sm:text-2xl md:text-4xl font-heading font-bold text-foreground leading-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Options Grid */}
      {options && (
        <div className={cn("grid gap-2 sm:gap-3 md:gap-4", gridCols[columns])}>
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              onClick={() => onSelect?.(option.value)}
              className={cn(
                "relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200",
                "hover:shadow-md hover:border-primary/50 active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                isSelected(option.value)
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                {option.icon && (
                  <div className="flex-shrink-0 text-primary">
                    {option.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg">
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 leading-relaxed">
                      {option.description}
                    </div>
                  )}
                </div>
                {isSelected(option.value) && (
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Custom Content */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionnaireStep;
