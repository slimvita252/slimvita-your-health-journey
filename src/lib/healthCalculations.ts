// Health calculation utilities

interface UserData {
  gender: string;
  age: string;
  height: number;
  currentWeight: number;
  targetWeight: number;
  activityLevel: string;
  goal: string;
}

interface HealthResults {
  bmi: number;
  bmiCategory: string;
  bmiMessage: string;
  bmr: number;
  bmrMessage: string;
  tdee: number;
  tdeeMessage: string;
  calorieTarget: number;
  calorieMessage: string;
  weightToLose: number;
  estimatedWeeks: number;
  personalPlanMessage: string;
}

// Get middle age from age range
function getAgeFromRange(ageRange: string): number {
  switch (ageRange) {
    case "18-24": return 21;
    case "25-34": return 30;
    case "35-44": return 40;
    case "45-54": return 50;
    case "55-64": return 60;
    case "65+": return 70;
    default: return 30;
  }
}

// Activity level multipliers for TDEE
function getActivityMultiplier(activityLevel: string): number {
  switch (activityLevel) {
    case "sedentary": return 1.2;
    case "light": return 1.375;
    case "moderate": return 1.55;
    case "active": return 1.725;
    default: return 1.2;
  }
}

// Calculate BMI
function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
}

// Get BMI category
function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal weight";
  if (bmi < 30) return "overweight";
  return "obese";
}

// Get BMI message
function getBMIMessage(bmi: number, category: string): string {
  const roundedBMI = bmi.toFixed(1);
  
  switch (category) {
    case "underweight":
      return `Your BMI is ${roundedBMI}, which places you in the underweight category. Our plan will focus on healthy nutrition and building sustainable fitness habits.`;
    case "normal weight":
      return `Your BMI is ${roundedBMI}, which is within the healthy range. We'll help you optimize your fitness and maintain your great progress.`;
    case "overweight":
      return `Your BMI is ${roundedBMI}, which places you in the overweight category. This indicates that reducing body fat will significantly improve your overall health and energy levels.`;
    case "obese":
      return `Your BMI is ${roundedBMI}. The good news is that our walking program is specifically designed to help you achieve sustainable weight loss and dramatically improve your health markers.`;
    default:
      return `Your BMI is ${roundedBMI}.`;
  }
}

// Calculate BMR using Harris-Benedict equation (modern version)
function calculateBMR(weight: number, heightCm: number, age: number, gender: string): number {
  if (gender === "male") {
    return 88.36 + (13.4 * weight) + (4.8 * heightCm) - (5.7 * age);
  } else {
    return 447.6 + (9.2 * weight) + (3.1 * heightCm) - (4.3 * age);
  }
}

// Calculate TDEE
function calculateTDEE(bmr: number, activityLevel: string): number {
  return bmr * getActivityMultiplier(activityLevel);
}

// Calculate calorie target based on goal
function calculateCalorieTarget(tdee: number, goal: string): { target: number; message: string } {
  switch (goal) {
    case "lose-weight":
      const deficit = Math.round(tdee - 500);
      return {
        target: deficit,
        message: `To lose weight safely at 0.5-1 lb per week, your recommended daily calorie intake is ${deficit.toLocaleString()} kcal. This creates a healthy 500 kcal deficit.`
      };
    case "get-fit":
      return {
        target: Math.round(tdee),
        message: `For getting fit and toned, maintain your current calorie intake around ${Math.round(tdee).toLocaleString()} kcal while increasing protein for muscle definition.`
      };
    case "energy":
      return {
        target: Math.round(tdee),
        message: `To boost your energy levels, we recommend ${Math.round(tdee).toLocaleString()} kcal daily with focus on nutrient-dense foods and proper meal timing.`
      };
    case "health":
      return {
        target: Math.round(tdee),
        message: `For optimal health, maintain around ${Math.round(tdee).toLocaleString()} kcal daily with emphasis on whole foods, vegetables, and balanced macros.`
      };
    default:
      return {
        target: Math.round(tdee),
        message: `Your recommended daily intake is ${Math.round(tdee).toLocaleString()} kcal based on your activity level.`
      };
  }
}

// Main calculation function
export function calculateHealthMetrics(userData: UserData): HealthResults {
  const age = getAgeFromRange(userData.age);
  const gender = userData.gender === "male" ? "male" : "female";
  
  // BMI calculation
  const bmi = calculateBMI(userData.currentWeight, userData.height);
  const bmiCategory = getBMICategory(bmi);
  const bmiMessage = getBMIMessage(bmi, bmiCategory);
  
  // BMR calculation
  const bmr = calculateBMR(userData.currentWeight, userData.height, age, gender);
  const bmrMessage = `Your basal metabolic rate is ${Math.round(bmr).toLocaleString()} kcal/day. This represents the minimum energy your body needs to function at rest.`;
  
  // TDEE calculation
  const tdee = calculateTDEE(bmr, userData.activityLevel);
  const activityDescription = userData.activityLevel === "sedentary" ? "sedentary" :
    userData.activityLevel === "light" ? "lightly active" :
    userData.activityLevel === "moderate" ? "moderately active" : "very active";
  const tdeeMessage = `Given your ${activityDescription} lifestyle, your estimated daily caloric burn is ${Math.round(tdee).toLocaleString()} kcal.`;
  
  // Calorie target
  const { target: calorieTarget, message: calorieMessage } = calculateCalorieTarget(tdee, userData.goal);
  
  // Weight difference and timeline
  const weightToLose = userData.currentWeight - userData.targetWeight;
  const estimatedWeeks = Math.max(1, Math.round(Math.abs(weightToLose) * 2)); // ~0.5kg per week
  
  // Personal plan message
  const personalPlanMessage = `Based on your profile, we are building a treatment plan optimized specifically for your metabolism, activity level, and ${
    userData.goal === "lose-weight" ? "weight-loss potential" :
    userData.goal === "get-fit" ? "fitness goals" :
    userData.goal === "energy" ? "energy optimization" : "health improvement"
  }. With consistent effort, you can expect to see meaningful results within ${estimatedWeeks} weeks.`;
  
  return {
    bmi,
    bmiCategory,
    bmiMessage,
    bmr: Math.round(bmr),
    bmrMessage,
    tdee: Math.round(tdee),
    tdeeMessage,
    calorieTarget,
    calorieMessage,
    weightToLose,
    estimatedWeeks,
    personalPlanMessage
  };
}
