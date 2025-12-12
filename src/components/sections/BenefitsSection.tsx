import { Dumbbell, Users, LayoutDashboard, HeadphonesIcon, Salad, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Dumbbell,
    title: "Treinos Personalizados",
    description: "Exercícios adaptados ao seu nível, objetivos e equipamentos disponíveis.",
  },
  {
    icon: Users,
    title: "Orientação Profissional",
    description: "Especialistas em fitness e nutrição acompanham sua evolução.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel Exclusivo",
    description: "Dashboard completo para acompanhar seu progresso e métricas.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte 24h",
    description: "Equipe dedicada para tirar suas dúvidas a qualquer momento.",
  },
  {
    icon: Salad,
    title: "Nutrição Integrada",
    description: "Planos alimentares que complementam seus treinos.",
  },
  {
    icon: Target,
    title: "Metas Claras",
    description: "Objetivos definidos e checkpoints para manter sua motivação.",
  },
];

const BenefitsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="beneficios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn("text-center mb-16", isVisible && "animate-fade-in-up")}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Por que escolher SlimVita?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Benefícios que Transformam
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tudo o que você precisa para alcançar seus objetivos de saúde e bem-estar 
            em uma única plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={cn(
                "group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
