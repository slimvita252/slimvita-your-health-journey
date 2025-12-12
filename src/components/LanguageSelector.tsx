import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  variant?: "light" | "dark";
}

const LanguageSelector = ({ variant = "dark" }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en" as const, label: "EN" },
    { code: "es" as const, label: "ES" },
    { code: "pt" as const, label: "PT" },
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <div key={lang.code} className="flex items-center">
          <button
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "text-xs font-medium px-2 py-1 rounded transition-all duration-200",
              language === lang.code
                ? variant === "light"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-primary/10 text-primary"
                : variant === "light"
                  ? "text-primary-foreground/70 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
            )}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className={cn(
              "text-xs mx-0.5",
              variant === "light" ? "text-primary-foreground/40" : "text-muted-foreground/40"
            )}>
              |
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
