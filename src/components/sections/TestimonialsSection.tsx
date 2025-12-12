import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Lost 32 lbs in 4 months",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      quote: "I've tried countless programs before, but SlimVita is the first one that actually fits my busy lifestyle. The personalized workouts and meal plans made it easy to stay consistent. I've lost 32 pounds and feel stronger than ever!",
      rating: 5,
      beforeAfter: true,
    },
    {
      name: "Michael Thompson",
      role: "Transformed in 90 days",
      location: "Denver, CO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      quote: "At 45, I thought getting in shape was behind me. SlimVita proved me wrong. The expert guidance and adaptive workouts helped me build muscle and lose fat. My energy levels are through the roof!",
      rating: 5,
      beforeAfter: true,
    },
    {
      name: "Jennifer Rodriguez",
      role: "Size 14 to Size 6",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      quote: "SlimVita understood that I needed flexibility with two kids at home. The quick workouts and simple meal prep ideas changed everything. I went from a size 14 to a size 6, and my confidence is back!",
      rating: 5,
      beforeAfter: true,
    },
    {
      name: "David Chen",
      role: "Marathon ready at 50",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      quote: "I joined SlimVita to improve my running. Six months later, I completed my first marathon. The progressive training plan and nutrition support made it possible. Best investment in my health ever.",
      rating: 5,
      beforeAfter: false,
    },
    {
      name: "Amanda Foster",
      role: "Postpartum transformation",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      quote: "After my second baby, I felt so disconnected from my body. SlimVita's postpartum-friendly program helped me rebuild my strength safely. The community support from other moms was incredible.",
      rating: 5,
      beforeAfter: true,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div ref={ref} className="container mx-auto px-6">
        {/* Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {t("testimonials.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Real People, Real Results
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands who have transformed their lives with SlimVita
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className={cn(
          "max-w-4xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/20"
                  />
                  {testimonials[activeIndex].beforeAfter && (
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Verified
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{testimonials[activeIndex].name}</p>
                  <p className="text-primary font-medium">{testimonials[activeIndex].role}</p>
                  <p className="text-gray-500 text-sm">{testimonials[activeIndex].location}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === activeIndex ? "bg-primary w-8" : "bg-gray-300 hover:bg-gray-400"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="flex justify-center gap-4 mt-8">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-14 h-14 rounded-full overflow-hidden transition-all duration-300 ring-2",
                index === activeIndex 
                  ? "ring-primary scale-110" 
                  : "ring-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
