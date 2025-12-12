import { Link } from "react-router-dom";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Básico",
    price: 29,
    period: "mês",
    description: "Perfeito para começar sua jornada de transformação.",
    features: [
      "Treino semanal personalizado",
      "Relatórios simples de progresso",
      "Acesso ao app SlimVita",
      "Biblioteca de exercícios",
      "Comunidade de apoio",
    ],
    highlighted: false,
    cta: "Assinar Básico",
  },
  {
    name: "Pro",
    price: 59,
    period: "mês",
    description: "O plano mais popular para resultados consistentes.",
    features: [
      "Treino diário personalizado",
      "Nutrição personalizada",
      "Acompanhamento por especialistas",
      "Dashboard completo",
      "Relatórios avançados",
      "Desafios semanais",
      "Suporte prioritário",
    ],
    highlighted: true,
    cta: "Assinar Pro",
    badge: "Mais Popular",
  },
  {
    name: "Premium",
    price: 89,
    period: "mês",
    description: "Experiência completa com atendimento exclusivo.",
    features: [
      "Tudo do plano Pro",
      "Consultoria 1:1 exclusiva",
      "Acompanhamento ao vivo mensal",
      "Plano de nutrição detalhado",
      "Ajustes semanais do treino",
      "Acesso antecipado a novidades",
      "Suporte 24/7 dedicado",
    ],
    highlighted: false,
    cta: "Assinar Premium",
  },
];

const Planos = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
            ref={ref}
            className={cn("text-center mb-16", isVisible && "animate-fade-in-up")}
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Planos e Preços
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Escolha o Plano Ideal para Você
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Todos os planos incluem acesso à nossa plataforma completa. 
              Cancele quando quiser, sem multas ou burocracias.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-3xl p-8 transition-all duration-500",
                  plan.highlighted
                    ? "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-2xl shadow-primary/30 scale-105 z-10"
                    : "bg-card border-2 border-border hover:border-primary/30 hover:shadow-lg",
                  isVisible && "animate-fade-in-up"
                )}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                    <Star className="w-4 h-4" />
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3
                    className={cn(
                      "text-xl font-heading font-bold mb-2",
                      plan.highlighted ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm mb-6",
                      plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      R$
                    </span>
                    <span
                      className={cn(
                        "text-5xl font-heading font-bold",
                        plan.highlighted ? "text-primary-foreground" : "text-foreground"
                      )}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          plan.highlighted
                            ? "bg-primary-foreground/20"
                            : "bg-primary/10"
                        )}
                      >
                        <Check
                          className={cn(
                            "w-3 h-3",
                            plan.highlighted ? "text-primary-foreground" : "text-primary"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-sm",
                          plan.highlighted ? "text-primary-foreground/90" : "text-foreground"
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className={cn(
                    "w-full",
                    plan.highlighted
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : ""
                  )}
                  variant={plan.highlighted ? "hero" : "plan"}
                  size="lg"
                >
                  <Link to="/confirmacao">
                    {plan.highlighted && <Zap className="w-4 h-4" />}
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ or Guarantee */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 bg-accent rounded-2xl px-8 py-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-foreground">
                  Garantia de 7 dias
                </div>
                <div className="text-sm text-muted-foreground">
                  Teste sem riscos. Não gostou? Devolvemos seu dinheiro.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Planos;
