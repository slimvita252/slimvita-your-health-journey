import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Lost 35 lbs in 4 months",
      content: "SlimVita completely changed my life! The personalized workouts fit perfectly into my busy schedule as a working mom. In just 4 months, I lost 35 pounds and gained energy I haven't had in years. The support team is incredible!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Michael Thompson",
      role: "Improved fitness level",
      content: "After years of being sedentary, I thought it would be impossible to get back in shape. SlimVita started with me from zero, and now I can run 5K without stopping. The expert guidance made all the difference in my journey.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Jennifer Anderson",
      role: "Maintaining healthy lifestyle",
      content: "I've been using SlimVita for 8 months and my quality of life has improved tremendously. The integrated nutrition with workouts makes a huge difference. I recommend it to everyone looking for a sustainable health transformation!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
            {t("testimonials.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            {t("testimonials.title")}
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className={cn("bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-foreground/20", isVisible && "animate-scale-in")}>
            <Quote className="w-12 h-12 text-primary-foreground/30 mb-6" />
            
            <div className="min-h-[140px]">
              <p className="text-primary-foreground text-lg md:text-xl leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-foreground/30"
                />
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
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-primary-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-primary-foreground w-8"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50 w-2"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
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
