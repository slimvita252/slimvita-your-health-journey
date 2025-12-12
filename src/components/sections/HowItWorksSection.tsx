import { ClipboardList, Sparkles, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardList,
    title: "Responda o Questionário",
    description:
      "Conte-nos sobre seus objetivos, preferências e rotina. Leva menos de 3 minutos.",
    color: "from-primary to-primary-dark",
  },
  {
    icon: Sparkles,
    title: "Receba Seu Plano Personalizado",
    description:
      "Nossa IA cria um programa único baseado nas suas respostas e necessidades.",
    color: "from-secondary to-secondary/80",
  },
  {
    icon: TrendingUp,
    title: "Comece Sua Evolução",
    description:
      "Acompanhe seu progresso, receba motivação diária e veja resultados reais.",
    color: "from-primary to-secondary",
  },
];

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="como-funciona" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn("text-center mb-16", isVisible && "animate-fade-in-up")}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Simples e Eficiente
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Como Funciona?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Em apenas 3 passos simples, você terá acesso a um programa completo 
            de transformação personalizado para suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                "relative group",
                isVisible && "animate-fade-in-up",
                isVisible && `delay-${(index + 1) * 100}`
              )}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 group-hover:border-primary/30">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
                    step.color
                  )}
                >
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
