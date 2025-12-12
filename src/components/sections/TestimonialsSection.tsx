import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, BadgeCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Lost 28 lbs in 12 weeks",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      quote: "I never thought walking could transform my body like this. In just 12 weeks, I lost 28 pounds and feel more energetic than I did in my 20s. SlimVita's personalized plan made it so easy!",
      rating: 5,
      verified: true,
    },
    {
      name: "Michael Thompson",
      role: "Lost 35 lbs",
      location: "Denver, CO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      quote: "As a busy professional, I never had time for the gym. SlimVita showed me how to fit walking into my daily routine. Down 35 pounds and my doctor is amazed!",
      rating: 5,
      verified: true,
    },
    {
      name: "Jennifer Adams",
      role: "Lost 22 lbs",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      quote: "After trying every diet out there, I was skeptical. But SlimVita's walking-based approach actually worked! I've kept the weight off for 8 months now.",
      rating: 5,
      verified: true,
    },
    {
      name: "Robert Williams",
      role: "Lost 40 lbs",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      quote: "At 55, I thought my best years were behind me. SlimVita proved me wrong. I've lost 40 pounds, my knees don't hurt anymore, and I have energy to play with my grandkids.",
      rating: 5,
      verified: true,
    },
  ];

  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-accent/20">
      <div ref={ref} className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Real People, Real <span className="text-primary">Results</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join 150,000+ Americans who've transformed their health with SlimVita
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="relative bg-card rounded-3xl shadow-xl p-8 md:p-12 border border-border/50"
            >
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
                    {testimonials[activeIndex].verified && (
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                        <BadgeCheck className="w-5 h-5" />
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
                  <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                    "{testimonials[activeIndex].quote}"
                  </blockquote>
                  <div>
                    <p className="font-bold text-foreground text-lg">{testimonials[activeIndex].name}</p>
                    <p className="text-primary font-semibold">{testimonials[activeIndex].role}</p>
                    <p className="text-muted-foreground text-sm">{testimonials[activeIndex].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
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
                    index === activeIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: "2.5M+", label: "Pounds Lost" },
            { value: "150K+", label: "Active Members" },
            { value: "45K+", label: "5-Star Reviews" },
            { value: "94%", label: "Success Rate" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
