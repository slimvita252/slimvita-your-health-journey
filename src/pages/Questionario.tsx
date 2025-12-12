import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Target, Calendar, MapPin, Activity, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface FormData {
  objetivo: string;
  frequencia: number;
  local: string;
  nivel: string;
  nome: string;
  email: string;
}

const steps = [
  { id: 1, title: "Objetivo", icon: Target },
  { id: 2, title: "Frequência", icon: Calendar },
  { id: 3, title: "Local", icon: MapPin },
  { id: 4, title: "Nível", icon: Activity },
  { id: 5, title: "Contato", icon: User },
];

const objetivos = [
  { value: "emagrecer", label: "Emagrecer", description: "Perder peso de forma saudável" },
  { value: "condicionamento", label: "Melhorar Condicionamento", description: "Aumentar resistência e energia" },
  { value: "energia", label: "Ganhar Energia", description: "Mais disposição no dia a dia" },
  { value: "saude", label: "Manter Saúde", description: "Qualidade de vida geral" },
];

const locais = [
  { value: "casa", label: "Em Casa", description: "Treinos sem equipamentos" },
  { value: "academia", label: "Academia", description: "Treinos com equipamentos" },
  { value: "ar-livre", label: "Ao Ar Livre", description: "Parques e áreas abertas" },
  { value: "corrida", label: "Correr / Caminhar", description: "Foco em cardio" },
];

const niveis = [
  { value: "iniciante", label: "Iniciante", description: "Pouca ou nenhuma experiência" },
  { value: "intermediario", label: "Intermediário", description: "Treino regularmente" },
  { value: "avancado", label: "Avançado", description: "Treino há muito tempo" },
];

const Questionario = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    objetivo: "",
    frequencia: 3,
    local: "",
    nivel: "",
    nome: "",
    email: "",
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      if (!formData.nome || !formData.email) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha seu nome e email.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Avaliação concluída!",
        description: "Redirecionando para os planos...",
      });
      setTimeout(() => navigate("/planos"), 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.objetivo !== "";
      case 2:
        return formData.frequencia >= 1 && formData.frequencia <= 7;
      case 3:
        return formData.local !== "";
      case 4:
        return formData.nivel !== "";
      case 5:
        return formData.nome !== "" && formData.email !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Qual é seu objetivo principal?
            </h2>
            <p className="text-muted-foreground">
              Selecione o que melhor descreve suas metas de saúde.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {objetivos.map((obj) => (
                <button
                  key={obj.value}
                  onClick={() => setFormData({ ...formData, objetivo: obj.value })}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-md",
                    formData.objetivo === obj.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-heading font-bold text-foreground mb-1">{obj.label}</div>
                  <div className="text-sm text-muted-foreground">{obj.description}</div>
                  {formData.objetivo === obj.value && (
                    <Check className="w-5 h-5 text-primary mt-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Quantas vezes por semana deseja treinar?
            </h2>
            <p className="text-muted-foreground">
              Escolha de 1 a 7 dias por semana.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() =>
                    setFormData({ ...formData, frequencia: Math.max(1, formData.frequencia - 1) })
                  }
                  className="w-14 h-14 rounded-full border-2 border-border hover:border-primary flex items-center justify-center text-2xl font-bold transition-colors"
                >
                  -
                </button>
                <div className="text-6xl font-heading font-bold text-primary w-24 text-center">
                  {formData.frequencia}
                </div>
                <button
                  onClick={() =>
                    setFormData({ ...formData, frequencia: Math.min(7, formData.frequencia + 1) })
                  }
                  className="w-14 h-14 rounded-full border-2 border-border hover:border-primary flex items-center justify-center text-2xl font-bold transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-center text-muted-foreground">
                {formData.frequencia === 1 && "Perfeito para começar devagar"}
                {formData.frequencia >= 2 && formData.frequencia <= 3 && "Ideal para iniciantes"}
                {formData.frequencia >= 4 && formData.frequencia <= 5 && "Ótimo para resultados consistentes"}
                {formData.frequencia >= 6 && "Treino intensivo para atletas"}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Onde você prefere treinar?
            </h2>
            <p className="text-muted-foreground">
              Seu plano será adaptado para o ambiente escolhido.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {locais.map((loc) => (
                <button
                  key={loc.value}
                  onClick={() => setFormData({ ...formData, local: loc.value })}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-md",
                    formData.local === loc.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-heading font-bold text-foreground mb-1">{loc.label}</div>
                  <div className="text-sm text-muted-foreground">{loc.description}</div>
                  {formData.local === loc.value && (
                    <Check className="w-5 h-5 text-primary mt-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Qual é seu nível atual?
            </h2>
            <p className="text-muted-foreground">
              Isso nos ajuda a definir a intensidade ideal para você.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-8 max-w-lg mx-auto">
              {niveis.map((niv) => (
                <button
                  key={niv.value}
                  onClick={() => setFormData({ ...formData, nivel: niv.value })}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-md",
                    formData.nivel === niv.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-heading font-bold text-foreground mb-1">{niv.label}</div>
                  <div className="text-sm text-muted-foreground">{niv.description}</div>
                  {formData.nivel === niv.value && (
                    <Check className="w-5 h-5 text-primary mt-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Quase lá! Como podemos te chamar?
            </h2>
            <p className="text-muted-foreground">
              Informe seus dados para criarmos seu plano personalizado.
            </p>
            <div className="mt-8 max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-foreground font-medium">
                  Seu nome
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="pl-12 h-14 rounded-xl border-2 text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Seu e-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 h-14 rounded-xl border-2 text-base"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-12 md:w-24 h-1 mx-2",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border/50">
            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={cn(currentStep === 1 && "invisible")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>

              <span className="text-muted-foreground text-sm">
                Passo {currentStep} de {steps.length}
              </span>

              <Button onClick={handleNext} disabled={!canProceed()}>
                {currentStep === 5 ? "Finalizar" : "Próximo"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Questionario;
