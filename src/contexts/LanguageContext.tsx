import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.plans": "Plans",
    "nav.howItWorks": "How It Works",
    "nav.benefits": "Benefits",
    "nav.startAssessment": "Start Assessment",
    
    // Hero
    "hero.badge": "+10,000 lives transformed",
    "hero.title1": "Transform Your",
    "hero.title2": "Health",
    "hero.title3": "with SlimVita",
    "hero.subtitle": "Personalized plans to help you achieve your goals with practicality, professional guidance, and daily motivation.",
    "hero.cta1": "Start Assessment",
    "hero.cta2": "View Plans",
    "hero.activeUsers": "+10k active users",
    "hero.rating": "4.9 Rating",
    
    // How It Works
    "howItWorks.badge": "Simple & Effective",
    "howItWorks.title": "How Does It Work?",
    "howItWorks.subtitle": "In just 3 simple steps, you'll have access to a complete transformation program tailored to your needs.",
    "howItWorks.step1.title": "Complete the Assessment",
    "howItWorks.step1.desc": "Tell us about your goals, preferences, and routine. Takes less than 3 minutes.",
    "howItWorks.step2.title": "Get Your Personalized Plan",
    "howItWorks.step2.desc": "Our AI creates a unique program based on your answers and needs.",
    "howItWorks.step3.title": "Start Your Journey",
    "howItWorks.step3.desc": "Track your progress, receive daily motivation, and see real results.",
    
    // Benefits
    "benefits.badge": "Why Choose SlimVita?",
    "benefits.title": "Benefits That Transform",
    "benefits.subtitle": "Everything you need to achieve your health and wellness goals in one platform.",
    "benefits.1.title": "Personalized Workouts",
    "benefits.1.desc": "Exercises adapted to your level, goals, and available equipment.",
    "benefits.2.title": "Professional Guidance",
    "benefits.2.desc": "Fitness and nutrition specialists monitor your progress.",
    "benefits.3.title": "Exclusive Dashboard",
    "benefits.3.desc": "Complete dashboard to track your progress and metrics.",
    "benefits.4.title": "24/7 Support",
    "benefits.4.desc": "Dedicated team to answer your questions anytime.",
    "benefits.5.title": "Integrated Nutrition",
    "benefits.5.desc": "Meal plans that complement your workouts.",
    "benefits.6.title": "Clear Goals",
    "benefits.6.desc": "Defined objectives and checkpoints to keep you motivated.",
    
    // Testimonials
    "testimonials.badge": "Success Stories",
    "testimonials.title": "What Our Users Say",
    "testimonials.subtitle": "Thousands of people have already transformed their lives with SlimVita. Check out some real testimonials.",
    
    // CTA
    "cta.badge": "Start your transformation today",
    "cta.title": "Ready to Start Your Transformation?",
    "cta.subtitle": "Join thousands of people who have already changed their lives with SlimVita. Take your free assessment and discover the ideal plan for you.",
    "cta.button1": "Start Now",
    "cta.button2": "View Plans",
    "cta.stat1": "Active Users",
    "cta.stat2": "Satisfaction",
    "cta.stat3": "Rating",
    
    // Footer
    "footer.description": "Transforming lives through personalized health and wellness plans. Your journey to a healthier life starts here.",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.blog": "Blog",
    "footer.careers": "Careers",
    "footer.partners": "Partners",
    "footer.support": "Support",
    "footer.helpCenter": "Help Center",
    "footer.contact": "Contact",
    "footer.faq": "FAQ",
    "footer.legal": "Legal",
    "footer.terms": "Terms of Use",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookies",
    "footer.rights": "All rights reserved.",
    
    // Questionnaire
    "quiz.step1.title": "What is your primary goal?",
    "quiz.step1.subtitle": "Select the option that best describes your health goals.",
    "quiz.step1.opt1": "Lose Weight",
    "quiz.step1.opt1Desc": "Lose weight in a healthy way",
    "quiz.step1.opt2": "Improve Fitness",
    "quiz.step1.opt2Desc": "Increase endurance and energy",
    "quiz.step1.opt3": "Boost Energy",
    "quiz.step1.opt3Desc": "More energy throughout the day",
    "quiz.step1.opt4": "Maintain Health",
    "quiz.step1.opt4Desc": "Overall quality of life",
    
    "quiz.step2.title": "How many times per week do you want to train?",
    "quiz.step2.subtitle": "Choose from 1 to 7 days per week.",
    "quiz.step2.freq1": "Perfect for starting slow",
    "quiz.step2.freq2": "Ideal for beginners",
    "quiz.step2.freq3": "Great for consistent results",
    "quiz.step2.freq4": "Intensive training for athletes",
    
    "quiz.step3.title": "Where do you prefer to train?",
    "quiz.step3.subtitle": "Your plan will be adapted to your chosen environment.",
    "quiz.step3.opt1": "At Home",
    "quiz.step3.opt1Desc": "Equipment-free workouts",
    "quiz.step3.opt2": "Gym",
    "quiz.step3.opt2Desc": "Workouts with equipment",
    "quiz.step3.opt3": "Outdoors",
    "quiz.step3.opt3Desc": "Parks and open areas",
    "quiz.step3.opt4": "Running / Walking",
    "quiz.step3.opt4Desc": "Cardio focused",
    
    "quiz.step4.title": "What is your current fitness level?",
    "quiz.step4.subtitle": "This helps us define the ideal intensity for you.",
    "quiz.step4.opt1": "Beginner",
    "quiz.step4.opt1Desc": "Little to no experience",
    "quiz.step4.opt2": "Intermediate",
    "quiz.step4.opt2Desc": "I train regularly",
    "quiz.step4.opt3": "Advanced",
    "quiz.step4.opt3Desc": "I've been training for a long time",
    
    "quiz.step5.title": "Almost there! What should we call you?",
    "quiz.step5.subtitle": "Enter your details to create your personalized plan.",
    "quiz.step5.name": "Your name",
    "quiz.step5.namePlaceholder": "Enter your name",
    "quiz.step5.email": "Your email",
    "quiz.step5.emailPlaceholder": "your@email.com",
    
    "quiz.back": "Back",
    "quiz.next": "Next",
    "quiz.finish": "Finish",
    "quiz.step": "Step",
    "quiz.of": "of",
    "quiz.required": "Required fields",
    "quiz.requiredDesc": "Please fill in your name and email.",
    "quiz.success": "Assessment complete!",
    "quiz.successDesc": "Redirecting to plans...",
    
    // Plans
    "plans.badge": "Plans & Pricing",
    "plans.title": "Choose the Perfect Plan for You",
    "plans.subtitle": "All plans include access to our complete platform. Cancel anytime, no fees or hassle.",
    "plans.basic": "Basic",
    "plans.basicDesc": "Perfect for starting your transformation journey.",
    "plans.basicFeature1": "Weekly personalized workout",
    "plans.basicFeature2": "Simple progress reports",
    "plans.basicFeature3": "SlimVita app access",
    "plans.basicFeature4": "Exercise library",
    "plans.basicFeature5": "Support community",
    "plans.basicCta": "Subscribe Basic",
    
    "plans.pro": "Pro",
    "plans.proDesc": "The most popular plan for consistent results.",
    "plans.proBadge": "Most Popular",
    "plans.proFeature1": "Daily personalized workout",
    "plans.proFeature2": "Personalized nutrition",
    "plans.proFeature3": "Expert monitoring",
    "plans.proFeature4": "Complete dashboard",
    "plans.proFeature5": "Advanced reports",
    "plans.proFeature6": "Weekly challenges",
    "plans.proFeature7": "Priority support",
    "plans.proCta": "Subscribe Pro",
    
    "plans.premium": "Premium",
    "plans.premiumDesc": "Complete experience with exclusive service.",
    "plans.premiumFeature1": "Everything in Pro plan",
    "plans.premiumFeature2": "Exclusive 1:1 consulting",
    "plans.premiumFeature3": "Monthly live sessions",
    "plans.premiumFeature4": "Detailed nutrition plan",
    "plans.premiumFeature5": "Weekly workout adjustments",
    "plans.premiumFeature6": "Early access to new features",
    "plans.premiumFeature7": "Dedicated 24/7 support",
    "plans.premiumCta": "Subscribe Premium",
    
    "plans.guarantee": "7-day guarantee",
    "plans.guaranteeDesc": "Try risk-free. Not satisfied? We'll refund your money.",
    "plans.month": "month",
    
    // Confirmation
    "confirm.title": "Thank You! Your SlimVita Plan is Active!",
    "confirm.subtitle": "We've sent an email with all the details of your plan and your exclusive dashboard access.",
    "confirm.email": "Check your email",
    "confirm.emailDesc": "We sent your access credentials",
    "confirm.dashboard": "Access dashboard",
    "confirm.dashboardDesc": "Your dashboard is ready",
    "confirm.start": "Start tomorrow",
    "confirm.startDesc": "Your first workout awaits",
    "confirm.accessBtn": "Access Dashboard",
    "confirm.homeBtn": "Back to Home",
    "confirm.support": "Need help? Contact us:",
  },
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.plans": "Planes",
    "nav.howItWorks": "Cómo Funciona",
    "nav.benefits": "Beneficios",
    "nav.startAssessment": "Iniciar Evaluación",
    
    // Hero
    "hero.badge": "+10,000 vidas transformadas",
    "hero.title1": "Transforma Tu",
    "hero.title2": "Salud",
    "hero.title3": "con SlimVita",
    "hero.subtitle": "Planes personalizados para ayudarte a alcanzar tus metas con practicidad, orientación profesional y motivación diaria.",
    "hero.cta1": "Iniciar Evaluación",
    "hero.cta2": "Ver Planes",
    "hero.activeUsers": "+10k usuarios activos",
    "hero.rating": "4.9 Calificación",
    
    // How It Works
    "howItWorks.badge": "Simple y Efectivo",
    "howItWorks.title": "¿Cómo Funciona?",
    "howItWorks.subtitle": "En solo 3 simples pasos, tendrás acceso a un programa de transformación completo adaptado a tus necesidades.",
    "howItWorks.step1.title": "Completa la Evaluación",
    "howItWorks.step1.desc": "Cuéntanos sobre tus metas, preferencias y rutina. Toma menos de 3 minutos.",
    "howItWorks.step2.title": "Recibe Tu Plan Personalizado",
    "howItWorks.step2.desc": "Nuestra IA crea un programa único basado en tus respuestas y necesidades.",
    "howItWorks.step3.title": "Comienza Tu Viaje",
    "howItWorks.step3.desc": "Sigue tu progreso, recibe motivación diaria y ve resultados reales.",
    
    // Benefits
    "benefits.badge": "¿Por Qué Elegir SlimVita?",
    "benefits.title": "Beneficios que Transforman",
    "benefits.subtitle": "Todo lo que necesitas para alcanzar tus metas de salud y bienestar en una plataforma.",
    "benefits.1.title": "Entrenamientos Personalizados",
    "benefits.1.desc": "Ejercicios adaptados a tu nivel, metas y equipo disponible.",
    "benefits.2.title": "Orientación Profesional",
    "benefits.2.desc": "Especialistas en fitness y nutrición monitorean tu progreso.",
    "benefits.3.title": "Panel Exclusivo",
    "benefits.3.desc": "Panel completo para seguir tu progreso y métricas.",
    "benefits.4.title": "Soporte 24/7",
    "benefits.4.desc": "Equipo dedicado para responder tus preguntas en cualquier momento.",
    "benefits.5.title": "Nutrición Integrada",
    "benefits.5.desc": "Planes de comidas que complementan tus entrenamientos.",
    "benefits.6.title": "Metas Claras",
    "benefits.6.desc": "Objetivos definidos y puntos de control para mantenerte motivado.",
    
    // Testimonials
    "testimonials.badge": "Historias de Éxito",
    "testimonials.title": "Lo Que Dicen Nuestros Usuarios",
    "testimonials.subtitle": "Miles de personas ya han transformado sus vidas con SlimVita. Mira algunos testimonios reales.",
    
    // CTA
    "cta.badge": "Comienza tu transformación hoy",
    "cta.title": "¿Listo para Comenzar Tu Transformación?",
    "cta.subtitle": "Únete a miles de personas que ya han cambiado sus vidas con SlimVita. Haz tu evaluación gratuita y descubre el plan ideal para ti.",
    "cta.button1": "Comenzar Ahora",
    "cta.button2": "Ver Planes",
    "cta.stat1": "Usuarios Activos",
    "cta.stat2": "Satisfacción",
    "cta.stat3": "Calificación",
    
    // Footer
    "footer.description": "Transformando vidas a través de planes personalizados de salud y bienestar. Tu viaje hacia una vida más saludable comienza aquí.",
    "footer.company": "Empresa",
    "footer.about": "Sobre Nosotros",
    "footer.blog": "Blog",
    "footer.careers": "Carreras",
    "footer.partners": "Socios",
    "footer.support": "Soporte",
    "footer.helpCenter": "Centro de Ayuda",
    "footer.contact": "Contacto",
    "footer.faq": "FAQ",
    "footer.legal": "Legal",
    "footer.terms": "Términos de Uso",
    "footer.privacy": "Política de Privacidad",
    "footer.cookies": "Cookies",
    "footer.rights": "Todos los derechos reservados.",
    
    // Questionnaire
    "quiz.step1.title": "¿Cuál es tu objetivo principal?",
    "quiz.step1.subtitle": "Selecciona la opción que mejor describe tus metas de salud.",
    "quiz.step1.opt1": "Perder Peso",
    "quiz.step1.opt1Desc": "Perder peso de forma saludable",
    "quiz.step1.opt2": "Mejorar Condición",
    "quiz.step1.opt2Desc": "Aumentar resistencia y energía",
    "quiz.step1.opt3": "Aumentar Energía",
    "quiz.step1.opt3Desc": "Más energía durante el día",
    "quiz.step1.opt4": "Mantener Salud",
    "quiz.step1.opt4Desc": "Calidad de vida general",
    
    "quiz.step2.title": "¿Cuántas veces por semana quieres entrenar?",
    "quiz.step2.subtitle": "Elige de 1 a 7 días por semana.",
    "quiz.step2.freq1": "Perfecto para empezar despacio",
    "quiz.step2.freq2": "Ideal para principiantes",
    "quiz.step2.freq3": "Excelente para resultados consistentes",
    "quiz.step2.freq4": "Entrenamiento intensivo para atletas",
    
    "quiz.step3.title": "¿Dónde prefieres entrenar?",
    "quiz.step3.subtitle": "Tu plan se adaptará al entorno elegido.",
    "quiz.step3.opt1": "En Casa",
    "quiz.step3.opt1Desc": "Entrenamientos sin equipo",
    "quiz.step3.opt2": "Gimnasio",
    "quiz.step3.opt2Desc": "Entrenamientos con equipo",
    "quiz.step3.opt3": "Al Aire Libre",
    "quiz.step3.opt3Desc": "Parques y áreas abiertas",
    "quiz.step3.opt4": "Correr / Caminar",
    "quiz.step3.opt4Desc": "Enfocado en cardio",
    
    "quiz.step4.title": "¿Cuál es tu nivel de condición física actual?",
    "quiz.step4.subtitle": "Esto nos ayuda a definir la intensidad ideal para ti.",
    "quiz.step4.opt1": "Principiante",
    "quiz.step4.opt1Desc": "Poca o ninguna experiencia",
    "quiz.step4.opt2": "Intermedio",
    "quiz.step4.opt2Desc": "Entreno regularmente",
    "quiz.step4.opt3": "Avanzado",
    "quiz.step4.opt3Desc": "He entrenado por mucho tiempo",
    
    "quiz.step5.title": "¡Casi listo! ¿Cómo te llamamos?",
    "quiz.step5.subtitle": "Ingresa tus datos para crear tu plan personalizado.",
    "quiz.step5.name": "Tu nombre",
    "quiz.step5.namePlaceholder": "Ingresa tu nombre",
    "quiz.step5.email": "Tu email",
    "quiz.step5.emailPlaceholder": "tu@email.com",
    
    "quiz.back": "Atrás",
    "quiz.next": "Siguiente",
    "quiz.finish": "Finalizar",
    "quiz.step": "Paso",
    "quiz.of": "de",
    "quiz.required": "Campos requeridos",
    "quiz.requiredDesc": "Por favor completa tu nombre y email.",
    "quiz.success": "¡Evaluación completa!",
    "quiz.successDesc": "Redirigiendo a planes...",
    
    // Plans
    "plans.badge": "Planes y Precios",
    "plans.title": "Elige el Plan Perfecto para Ti",
    "plans.subtitle": "Todos los planes incluyen acceso a nuestra plataforma completa. Cancela cuando quieras, sin cargos ni complicaciones.",
    "plans.basic": "Básico",
    "plans.basicDesc": "Perfecto para comenzar tu viaje de transformación.",
    "plans.basicFeature1": "Entrenamiento semanal personalizado",
    "plans.basicFeature2": "Informes de progreso simples",
    "plans.basicFeature3": "Acceso a app SlimVita",
    "plans.basicFeature4": "Biblioteca de ejercicios",
    "plans.basicFeature5": "Comunidad de apoyo",
    "plans.basicCta": "Suscribir Básico",
    
    "plans.pro": "Pro",
    "plans.proDesc": "El plan más popular para resultados consistentes.",
    "plans.proBadge": "Más Popular",
    "plans.proFeature1": "Entrenamiento diario personalizado",
    "plans.proFeature2": "Nutrición personalizada",
    "plans.proFeature3": "Monitoreo de expertos",
    "plans.proFeature4": "Panel completo",
    "plans.proFeature5": "Informes avanzados",
    "plans.proFeature6": "Desafíos semanales",
    "plans.proFeature7": "Soporte prioritario",
    "plans.proCta": "Suscribir Pro",
    
    "plans.premium": "Premium",
    "plans.premiumDesc": "Experiencia completa con servicio exclusivo.",
    "plans.premiumFeature1": "Todo en plan Pro",
    "plans.premiumFeature2": "Consultoría 1:1 exclusiva",
    "plans.premiumFeature3": "Sesiones en vivo mensuales",
    "plans.premiumFeature4": "Plan nutricional detallado",
    "plans.premiumFeature5": "Ajustes semanales de entrenamiento",
    "plans.premiumFeature6": "Acceso anticipado a novedades",
    "plans.premiumFeature7": "Soporte 24/7 dedicado",
    "plans.premiumCta": "Suscribir Premium",
    
    "plans.guarantee": "Garantía de 7 días",
    "plans.guaranteeDesc": "Prueba sin riesgo. ¿No estás satisfecho? Te devolvemos tu dinero.",
    "plans.month": "mes",
    
    // Confirmation
    "confirm.title": "¡Gracias! ¡Tu Plan SlimVita Está Activo!",
    "confirm.subtitle": "Hemos enviado un email con todos los detalles de tu plan y tu acceso exclusivo al panel.",
    "confirm.email": "Revisa tu email",
    "confirm.emailDesc": "Enviamos tus credenciales de acceso",
    "confirm.dashboard": "Accede al panel",
    "confirm.dashboardDesc": "Tu panel está listo",
    "confirm.start": "Comienza mañana",
    "confirm.startDesc": "Tu primer entrenamiento te espera",
    "confirm.accessBtn": "Acceder al Panel",
    "confirm.homeBtn": "Volver al Inicio",
    "confirm.support": "¿Necesitas ayuda? Contáctanos:",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "nav.plans": "Planos",
    "nav.howItWorks": "Como Funciona",
    "nav.benefits": "Benefícios",
    "nav.startAssessment": "Iniciar Avaliação",
    
    // Hero
    "hero.badge": "+10.000 vidas transformadas",
    "hero.title1": "Transforme sua",
    "hero.title2": "Saúde",
    "hero.title3": "com o SlimVita",
    "hero.subtitle": "Planos personalizados para você atingir seus objetivos com praticidade, acompanhamento profissional e motivação diária.",
    "hero.cta1": "Iniciar Avaliação",
    "hero.cta2": "Conhecer Planos",
    "hero.activeUsers": "+10k usuários ativos",
    "hero.rating": "4.9 Avaliação",
    
    // How It Works
    "howItWorks.badge": "Simples e Eficiente",
    "howItWorks.title": "Como Funciona?",
    "howItWorks.subtitle": "Em apenas 3 passos simples, você terá acesso a um programa completo de transformação personalizado para suas necessidades.",
    "howItWorks.step1.title": "Responda o Questionário",
    "howItWorks.step1.desc": "Conte-nos sobre seus objetivos, preferências e rotina. Leva menos de 3 minutos.",
    "howItWorks.step2.title": "Receba Seu Plano Personalizado",
    "howItWorks.step2.desc": "Nossa IA cria um programa único baseado nas suas respostas e necessidades.",
    "howItWorks.step3.title": "Comece Sua Evolução",
    "howItWorks.step3.desc": "Acompanhe seu progresso, receba motivação diária e veja resultados reais.",
    
    // Benefits
    "benefits.badge": "Por que escolher SlimVita?",
    "benefits.title": "Benefícios que Transformam",
    "benefits.subtitle": "Tudo o que você precisa para alcançar seus objetivos de saúde e bem-estar em uma única plataforma.",
    "benefits.1.title": "Treinos Personalizados",
    "benefits.1.desc": "Exercícios adaptados ao seu nível, objetivos e equipamentos disponíveis.",
    "benefits.2.title": "Orientação Profissional",
    "benefits.2.desc": "Especialistas em fitness e nutrição acompanham sua evolução.",
    "benefits.3.title": "Painel Exclusivo",
    "benefits.3.desc": "Dashboard completo para acompanhar seu progresso e métricas.",
    "benefits.4.title": "Suporte 24h",
    "benefits.4.desc": "Equipe dedicada para tirar suas dúvidas a qualquer momento.",
    "benefits.5.title": "Nutrição Integrada",
    "benefits.5.desc": "Planos alimentares que complementam seus treinos.",
    "benefits.6.title": "Metas Claras",
    "benefits.6.desc": "Objetivos definidos e checkpoints para manter sua motivação.",
    
    // Testimonials
    "testimonials.badge": "Histórias de Sucesso",
    "testimonials.title": "O que Nossos Usuários Dizem",
    "testimonials.subtitle": "Milhares de pessoas já transformaram suas vidas com o SlimVita. Confira alguns depoimentos reais.",
    
    // CTA
    "cta.badge": "Comece sua transformação hoje",
    "cta.title": "Pronto para começar sua transformação?",
    "cta.subtitle": "Junte-se a milhares de pessoas que já mudaram suas vidas com o SlimVita. Faça sua avaliação gratuita e descubra o plano ideal para você.",
    "cta.button1": "Iniciar Agora",
    "cta.button2": "Ver Planos",
    "cta.stat1": "Usuários Ativos",
    "cta.stat2": "Satisfação",
    "cta.stat3": "Avaliação",
    
    // Footer
    "footer.description": "Transformando vidas através de planos personalizados de saúde e bem-estar. Sua jornada para uma vida mais saudável começa aqui.",
    "footer.company": "Empresa",
    "footer.about": "Sobre Nós",
    "footer.blog": "Blog",
    "footer.careers": "Carreiras",
    "footer.partners": "Parceiros",
    "footer.support": "Suporte",
    "footer.helpCenter": "Central de Ajuda",
    "footer.contact": "Contato",
    "footer.faq": "FAQ",
    "footer.legal": "Legal",
    "footer.terms": "Termos de Uso",
    "footer.privacy": "Política de Privacidade",
    "footer.cookies": "Cookies",
    "footer.rights": "Todos os direitos reservados.",
    
    // Questionnaire
    "quiz.step1.title": "Qual é seu objetivo principal?",
    "quiz.step1.subtitle": "Selecione o que melhor descreve suas metas de saúde.",
    "quiz.step1.opt1": "Emagrecer",
    "quiz.step1.opt1Desc": "Perder peso de forma saudável",
    "quiz.step1.opt2": "Melhorar Condicionamento",
    "quiz.step1.opt2Desc": "Aumentar resistência e energia",
    "quiz.step1.opt3": "Ganhar Energia",
    "quiz.step1.opt3Desc": "Mais disposição no dia a dia",
    "quiz.step1.opt4": "Manter Saúde",
    "quiz.step1.opt4Desc": "Qualidade de vida geral",
    
    "quiz.step2.title": "Quantas vezes por semana deseja treinar?",
    "quiz.step2.subtitle": "Escolha de 1 a 7 dias por semana.",
    "quiz.step2.freq1": "Perfeito para começar devagar",
    "quiz.step2.freq2": "Ideal para iniciantes",
    "quiz.step2.freq3": "Ótimo para resultados consistentes",
    "quiz.step2.freq4": "Treino intensivo para atletas",
    
    "quiz.step3.title": "Onde você prefere treinar?",
    "quiz.step3.subtitle": "Seu plano será adaptado para o ambiente escolhido.",
    "quiz.step3.opt1": "Em Casa",
    "quiz.step3.opt1Desc": "Treinos sem equipamentos",
    "quiz.step3.opt2": "Academia",
    "quiz.step3.opt2Desc": "Treinos com equipamentos",
    "quiz.step3.opt3": "Ao Ar Livre",
    "quiz.step3.opt3Desc": "Parques e áreas abertas",
    "quiz.step3.opt4": "Correr / Caminhar",
    "quiz.step3.opt4Desc": "Foco em cardio",
    
    "quiz.step4.title": "Qual é seu nível atual?",
    "quiz.step4.subtitle": "Isso nos ajuda a definir a intensidade ideal para você.",
    "quiz.step4.opt1": "Iniciante",
    "quiz.step4.opt1Desc": "Pouca ou nenhuma experiência",
    "quiz.step4.opt2": "Intermediário",
    "quiz.step4.opt2Desc": "Treino regularmente",
    "quiz.step4.opt3": "Avançado",
    "quiz.step4.opt3Desc": "Treino há muito tempo",
    
    "quiz.step5.title": "Quase lá! Como podemos te chamar?",
    "quiz.step5.subtitle": "Informe seus dados para criarmos seu plano personalizado.",
    "quiz.step5.name": "Seu nome",
    "quiz.step5.namePlaceholder": "Digite seu nome",
    "quiz.step5.email": "Seu e-mail",
    "quiz.step5.emailPlaceholder": "seu@email.com",
    
    "quiz.back": "Voltar",
    "quiz.next": "Próximo",
    "quiz.finish": "Finalizar",
    "quiz.step": "Passo",
    "quiz.of": "de",
    "quiz.required": "Campos obrigatórios",
    "quiz.requiredDesc": "Por favor, preencha seu nome e email.",
    "quiz.success": "Avaliação concluída!",
    "quiz.successDesc": "Redirecionando para os planos...",
    
    // Plans
    "plans.badge": "Planos e Preços",
    "plans.title": "Escolha o Plano Ideal para Você",
    "plans.subtitle": "Todos os planos incluem acesso à nossa plataforma completa. Cancele quando quiser, sem multas ou burocracias.",
    "plans.basic": "Básico",
    "plans.basicDesc": "Perfeito para começar sua jornada de transformação.",
    "plans.basicFeature1": "Treino semanal personalizado",
    "plans.basicFeature2": "Relatórios simples de progresso",
    "plans.basicFeature3": "Acesso ao app SlimVita",
    "plans.basicFeature4": "Biblioteca de exercícios",
    "plans.basicFeature5": "Comunidade de apoio",
    "plans.basicCta": "Assinar Básico",
    
    "plans.pro": "Pro",
    "plans.proDesc": "O plano mais popular para resultados consistentes.",
    "plans.proBadge": "Mais Popular",
    "plans.proFeature1": "Treino diário personalizado",
    "plans.proFeature2": "Nutrição personalizada",
    "plans.proFeature3": "Acompanhamento por especialistas",
    "plans.proFeature4": "Dashboard completo",
    "plans.proFeature5": "Relatórios avançados",
    "plans.proFeature6": "Desafios semanais",
    "plans.proFeature7": "Suporte prioritário",
    "plans.proCta": "Assinar Pro",
    
    "plans.premium": "Premium",
    "plans.premiumDesc": "Experiência completa com atendimento exclusivo.",
    "plans.premiumFeature1": "Tudo do plano Pro",
    "plans.premiumFeature2": "Consultoria 1:1 exclusiva",
    "plans.premiumFeature3": "Acompanhamento ao vivo mensal",
    "plans.premiumFeature4": "Plano de nutrição detalhado",
    "plans.premiumFeature5": "Ajustes semanais do treino",
    "plans.premiumFeature6": "Acesso antecipado a novidades",
    "plans.premiumFeature7": "Suporte 24/7 dedicado",
    "plans.premiumCta": "Assinar Premium",
    
    "plans.guarantee": "Garantia de 7 dias",
    "plans.guaranteeDesc": "Teste sem riscos. Não gostou? Devolvemos seu dinheiro.",
    "plans.month": "mês",
    
    // Confirmation
    "confirm.title": "Obrigado! Seu plano SlimVita está ativo!",
    "confirm.subtitle": "Enviamos um e-mail com todos os detalhes do seu plano e seu acesso exclusivo ao painel de acompanhamento.",
    "confirm.email": "Verifique seu email",
    "confirm.emailDesc": "Enviamos as credenciais de acesso",
    "confirm.dashboard": "Acesse o painel",
    "confirm.dashboardDesc": "Seu dashboard está pronto",
    "confirm.start": "Comece amanhã",
    "confirm.startDesc": "Seu primeiro treino te espera",
    "confirm.accessBtn": "Acessar Painel",
    "confirm.homeBtn": "Voltar ao Início",
    "confirm.support": "Precisa de ajuda? Entre em contato:",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
