import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Mail, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Confirmacao = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="relative inline-block mb-8 animate-scale-in">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                </div>
              </div>
              {/* Celebration particles */}
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-float" />
              <div className="absolute -top-2 -right-6 w-4 h-4 bg-primary rounded-full animate-float delay-200" />
              <div className="absolute -bottom-2 -left-6 w-5 h-5 bg-primary-light rounded-full animate-float delay-300" />
            </div>

            {/* Content */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 animate-fade-in-up delay-100">
              Obrigado! Seu plano SlimVita está ativo!
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto animate-fade-in-up delay-200">
              Enviamos um e-mail com todos os detalhes do seu plano e seu acesso exclusivo ao painel de acompanhamento.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 animate-fade-in-up delay-300">
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-1">Verifique seu email</h3>
                <p className="text-sm text-muted-foreground">Enviamos as credenciais de acesso</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <Home className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-1">Acesse o painel</h3>
                <p className="text-sm text-muted-foreground">Seu dashboard está pronto</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-1">Comece amanhã</h3>
                <p className="text-sm text-muted-foreground">Seu primeiro treino te espera</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
              <Button asChild size="xl">
                <Link to="#">
                  Acessar Painel
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  Voltar ao Início
                </Link>
              </Button>
            </div>

            {/* Support Message */}
            <p className="mt-12 text-sm text-muted-foreground animate-fade-in-up delay-500">
              Precisa de ajuda? Entre em contato:{" "}
              <a href="mailto:suporte@slimvita.com" className="text-primary hover:underline">
                suporte@slimvita.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmacao;
