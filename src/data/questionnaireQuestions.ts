export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: "single" | "multi" | "number" | "slider" | "input" | "email";
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  unit?: string;
  backgroundImage?: string;
  columns?: 1 | 2 | 3 | 4;
}

export const questions: Question[] = [
  {
    id: "gender",
    title: "What's your gender?",
    subtitle: "This helps us customize your walking plan",
    type: "single",
    options: [
      { value: "female", label: "Female", description: "Personalized plans for women" },
      { value: "male", label: "Male", description: "Personalized plans for men" },
      { value: "other", label: "Other", description: "Inclusive options for everyone" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    columns: 1,
  },
  {
    id: "age",
    title: "How old are you?",
    subtitle: "Age affects metabolism and optimal exercise intensity",
    type: "single",
    options: [
      { value: "18-24", label: "18-24 years" },
      { value: "25-34", label: "25-34 years" },
      { value: "35-44", label: "35-44 years" },
      { value: "45-54", label: "45-54 years" },
      { value: "55-64", label: "55-64 years" },
      { value: "65+", label: "65+ years" },
    ],
    columns: 2,
  },
  {
    id: "height",
    title: "What's your height?",
    subtitle: "Used to calculate your body metrics accurately",
    type: "slider",
    min: 140,
    max: 220,
    unit: "cm",
  },
  {
    id: "currentWeight",
    title: "What's your current weight?",
    subtitle: "Don't worry, your data is completely private",
    type: "slider",
    min: 40,
    max: 200,
    unit: "kg",
  },
  {
    id: "targetWeight",
    title: "What's your target weight?",
    subtitle: "Set a realistic and healthy goal",
    type: "slider",
    min: 40,
    max: 200,
    unit: "kg",
  },
  {
    id: "goal",
    title: "What's your main goal?",
    subtitle: "Choose what matters most to you right now",
    type: "single",
    options: [
      { value: "lose-weight", label: "Lose Weight", description: "Burn fat and get leaner" },
      { value: "get-fit", label: "Get Fit & Toned", description: "Build endurance and muscle tone" },
      { value: "energy", label: "Boost Energy", description: "Feel more energetic daily" },
      { value: "health", label: "Improve Health", description: "Better overall wellness" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80",
    columns: 2,
  },
  {
    id: "timeline",
    title: "When do you want to reach your goal?",
    subtitle: "A realistic timeline increases success rate by 80%",
    type: "single",
    options: [
      { value: "1-month", label: "Within 1 month", description: "Intensive approach" },
      { value: "3-months", label: "Within 3 months", description: "Recommended pace" },
      { value: "6-months", label: "Within 6 months", description: "Sustainable journey" },
      { value: "no-rush", label: "No rush", description: "Lifestyle change focus" },
    ],
    columns: 2,
  },
  {
    id: "activityLevel",
    title: "What's your current activity level?",
    subtitle: "Be honest — this helps us create the perfect starting point",
    type: "single",
    options: [
      { value: "sedentary", label: "Sedentary", description: "Little to no exercise, desk job" },
      { value: "light", label: "Lightly Active", description: "Light exercise 1-2 times/week" },
      { value: "moderate", label: "Moderately Active", description: "Exercise 3-4 times/week" },
      { value: "active", label: "Very Active", description: "Hard exercise 5-6 times/week" },
    ],
    columns: 2,
  },
  {
    id: "dailySteps",
    title: "How many steps do you average daily?",
    subtitle: "An estimate is perfectly fine",
    type: "single",
    options: [
      { value: "under-3000", label: "Under 3,000", description: "Just getting started" },
      { value: "3000-5000", label: "3,000 - 5,000", description: "Light walker" },
      { value: "5000-8000", label: "5,000 - 8,000", description: "Moderate walker" },
      { value: "8000-10000", label: "8,000 - 10,000", description: "Active walker" },
      { value: "over-10000", label: "Over 10,000", description: "Power walker" },
    ],
    columns: 1,
  },
  {
    id: "dailyRoutine",
    title: "How would you describe your daily routine?",
    subtitle: "Understanding your lifestyle helps us fit walking into your day",
    type: "single",
    options: [
      { value: "desk-job", label: "Mostly Sitting", description: "Office or desk job" },
      { value: "mixed", label: "Mixed", description: "Some sitting, some moving" },
      { value: "on-feet", label: "On My Feet", description: "Standing or walking job" },
      { value: "physical", label: "Very Physical", description: "Physically demanding work" },
    ],
    columns: 2,
  },
  {
    id: "energyLevel",
    title: "How's your energy level throughout the day?",
    subtitle: "This helps us optimize your walking schedule",
    type: "single",
    options: [
      { value: "low", label: "Low Energy", description: "Often feel tired or sluggish" },
      { value: "variable", label: "Up and Down", description: "Energy fluctuates throughout the day" },
      { value: "moderate", label: "Moderate", description: "Generally okay, could be better" },
      { value: "high", label: "High Energy", description: "Feel energetic most of the day" },
    ],
    columns: 2,
  },
  {
    id: "nightHunger",
    title: "Do you experience hunger at night?",
    subtitle: "Late-night eating affects weight management",
    type: "single",
    options: [
      { value: "always", label: "Yes, Always", description: "Regularly snack at night" },
      { value: "sometimes", label: "Sometimes", description: "Occasionally eat late" },
      { value: "rarely", label: "Rarely", description: "Seldom feel hungry at night" },
      { value: "never", label: "Never", description: "Don't eat after dinner" },
    ],
    columns: 2,
  },
  {
    id: "challenges",
    title: "What are your biggest challenges?",
    subtitle: "Select all that apply — we'll address each one",
    type: "multi",
    options: [
      { value: "motivation", label: "Staying Motivated" },
      { value: "time", label: "Finding Time" },
      { value: "cravings", label: "Food Cravings" },
      { value: "stress", label: "Stress Eating" },
      { value: "consistency", label: "Being Consistent" },
      { value: "energy", label: "Low Energy" },
      { value: "injuries", label: "Past Injuries" },
      { value: "knowledge", label: "Lack of Knowledge" },
    ],
    columns: 2,
  },
  {
    id: "dietQuality",
    title: "How would you rate your current diet?",
    subtitle: "Be honest — there's no judgment here",
    type: "single",
    options: [
      { value: "poor", label: "Could Be Better", description: "Lots of processed foods" },
      { value: "fair", label: "Fair", description: "Some healthy, some not" },
      { value: "good", label: "Pretty Good", description: "Mostly healthy choices" },
      { value: "excellent", label: "Excellent", description: "Clean, balanced eating" },
    ],
    columns: 2,
  },
  {
    id: "eatingOut",
    title: "How often do you eat out or order food?",
    subtitle: "Restaurant meals typically have more calories",
    type: "single",
    options: [
      { value: "daily", label: "Daily", description: "Most meals are takeout" },
      { value: "several", label: "Several Times/Week", description: "3-4 times weekly" },
      { value: "weekly", label: "Once a Week", description: "Occasional treat" },
      { value: "rarely", label: "Rarely", description: "Almost always home-cooked" },
    ],
    columns: 2,
  },
  {
    id: "currentDiet",
    title: "Do you follow any specific diet?",
    subtitle: "We'll customize your nutrition tips accordingly",
    type: "single",
    options: [
      { value: "none", label: "No Specific Diet", description: "Eat without restrictions" },
      { value: "keto", label: "Keto / Low Carb" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "mediterranean", label: "Mediterranean" },
      { value: "intermittent", label: "Intermittent Fasting" },
    ],
    columns: 2,
  },
  {
    id: "walkingDuration",
    title: "How long can you walk per session?",
    subtitle: "We'll build up from where you're comfortable",
    type: "single",
    options: [
      { value: "10-15", label: "10-15 minutes", description: "Quick walks" },
      { value: "20-30", label: "20-30 minutes", description: "Moderate sessions" },
      { value: "30-45", label: "30-45 minutes", description: "Full workouts" },
      { value: "45+", label: "45+ minutes", description: "Extended walks" },
    ],
    columns: 2,
  },
  {
    id: "fitnessLevel",
    title: "What's your current fitness level?",
    subtitle: "This determines your starting intensity",
    type: "single",
    options: [
      { value: "beginner", label: "Beginner", description: "New to exercise" },
      { value: "intermediate", label: "Intermediate", description: "Some experience" },
      { value: "advanced", label: "Advanced", description: "Regular exerciser" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    columns: 1,
  },
  {
    id: "intensity",
    title: "What walking intensity do you prefer?",
    subtitle: "We'll adjust based on your progress",
    type: "single",
    options: [
      { value: "light", label: "Light & Easy", description: "Comfortable pace, can chat easily" },
      { value: "moderate", label: "Moderate", description: "Slightly challenging, can still talk" },
      { value: "brisk", label: "Brisk", description: "Fast pace, harder to hold conversation" },
      { value: "power", label: "Power Walking", description: "Maximum effort, very challenging" },
    ],
    columns: 2,
  },
  {
    id: "availableTime",
    title: "How much time can you dedicate daily?",
    subtitle: "Even 15 minutes can make a difference",
    type: "single",
    options: [
      { value: "15-20", label: "15-20 minutes", description: "Quick but effective" },
      { value: "30", label: "About 30 minutes", description: "Optimal for results" },
      { value: "45", label: "About 45 minutes", description: "Comprehensive workout" },
      { value: "60+", label: "60+ minutes", description: "Maximum impact" },
    ],
    columns: 2,
  },
  {
    id: "preferredTime",
    title: "When do you prefer to walk?",
    subtitle: "Consistency is key — pick your best time",
    type: "single",
    options: [
      { value: "morning", label: "Morning", description: "Start the day right" },
      { value: "afternoon", label: "Afternoon", description: "Midday energy boost" },
      { value: "evening", label: "Evening", description: "Wind down after work" },
      { value: "flexible", label: "Flexible", description: "Whenever I can" },
    ],
    columns: 2,
  },
  {
    id: "permission",
    title: "Ready to transform your health?",
    subtitle: "Allow us to create your personalized walking plan",
    type: "single",
    options: [
      { value: "yes", label: "Yes, Create My Plan!", description: "I'm ready to start my transformation" },
      { value: "maybe", label: "Tell Me More First", description: "I want to understand the process" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    columns: 1,
  },
  {
    id: "email",
    title: "Where should we send your plan?",
    subtitle: "Enter your email to receive your personalized walking program",
    type: "email",
    placeholder: "your@email.com",
  },
];
