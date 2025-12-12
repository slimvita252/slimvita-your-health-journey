import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Perdeu 15kg em 4 meses",
    content:
      "O SlimVita mudou minha vida! Os treinos personalizados se encaixaram perfeitamente na minha rotina corrida. Em 4 meses, perdi 15kg e ganhei uma disposição que não tinha há anos.",
    avatar: "MC",
    rating: 5,
  },
  {
    name: "Ricardo Santos",
    role: "Melhorou condicionamento",
    content:
      "Depois de anos sedentário, achei que seria impossível voltar a treinar. O SlimVita começou comigo do zero e hoje corro 5km sem parar. A equipe de suporte é incrível!",
    avatar: "RS",
    rating: 5,
  },
  {
    name: "Ana Paula Ferreira",
    role: "Mantém saúde em dia",
    content:
      "Uso o SlimVita há 8 meses e minha qualidade de vida melhorou muito. A nutrição integrada com os treinos faz toda diferença. Recomendo para todos!",
    avatar: "AF",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary-dark to-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn("text-center mb-16", isVisible && "animate-fade-in-up")}>
          <span className="inline-block text-primary-foreground/70 font-semibold text-sm uppercase tracking-wider mb-4">
            Histórias de Sucesso
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            O que Nossos Usuários Dizem
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Milhares de pessoas já transformaram suas vidas com o SlimVita. 
            Confira alguns depoimentos reais.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className={cn("bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-foreground/20", isVisible && "animate-scale-in")}>
            <Quote className="w-12 h-12 text-primary-foreground/30 mb-6" />
            
            <div className="min-h-[120px]">
              <p className="text-primary-foreground text-lg md:text-xl leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary-foreground text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary-foreground/70 text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-6 h-6 text-primary-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-primary-foreground w-8"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  )}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
