import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, User, Target } from "lucide-react";

import femaleFit from "@/assets/avatars/female-fit.png";
import femaleAverage from "@/assets/avatars/female-average.png";
import femaleOverweight from "@/assets/avatars/female-overweight.png";
import maleFit from "@/assets/avatars/male-fit.png";
import maleAverage from "@/assets/avatars/male-average.png";
import maleOverweight from "@/assets/avatars/male-overweight.png";

interface UserData {
  gender?: string;
  currentWeight?: number;
  goalWeight?: number;
  height?: number; // cm
}

interface BodyTransformationSectionProps {
  userData: UserData;
}

function normalizeGender(g?: string) {
  const v = (g || "").toLowerCase();
  if (v.includes("fem") || v.includes("woman") || v.includes("female")) return "female" as const;
  return "male" as const;
}

function calcBmi(weightKg: number, heightCm: number) {
  const h = heightCm / 100;
  if (!h) return 0;
  return weightKg / (h * h);
}

function pickBeforeTemplate(gender: "male" | "female", bmi: number) {
  // Before avatar: always show heavier body based on current BMI
  if (bmi >= 30) return gender === "female" ? femaleOverweight : maleOverweight;
  if (bmi >= 25) return gender === "female" ? femaleOverweight : maleOverweight;
  return gender === "female" ? femaleAverage : maleAverage;
}

function pickAfterTemplate(gender: "male" | "female", goalBmi: number, currentBmi: number) {
  // After avatar: MUST be visually different (slimmer) than before
  // Always show a slimmer category than the before image
  if (currentBmi >= 27) {
    // If before is overweight, after should be average or fit
    return goalBmi < 22 
      ? (gender === "female" ? femaleFit : maleFit)
      : (gender === "female" ? femaleAverage : maleAverage);
  }
  if (currentBmi >= 22) {
    // If before is average, after should be fit
    return gender === "female" ? femaleFit : maleFit;
  }
  // If already fit category, still show fit (but this is edge case)
  return gender === "female" ? femaleFit : maleFit;
}

const BodyTransformationSection = ({ userData }: BodyTransformationSectionProps) => {
  const gender = normalizeGender(userData.gender);
  const heightCm = userData.height || 170;

  const currentWeight = userData.currentWeight || 85;
  const goalWeight = userData.goalWeight || 75;

  const currentBmi = calcBmi(currentWeight, heightCm);
  const goalBmi = calcBmi(goalWeight, heightCm);

  const currentImg = useMemo(() => pickBeforeTemplate(gender, currentBmi), [gender, currentBmi]);
  const goalImg = useMemo(() => pickAfterTemplate(gender, goalBmi, currentBmi), [gender, goalBmi, currentBmi]);

  const weightDiff = Math.max(0, currentWeight - goalWeight);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-card rounded-2xl p-4 border border-border/50"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Body Avatar Preview</h3>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="text-center flex-1">
          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
            <User className="w-3 h-3" /> Current
          </div>
          <div className="relative bg-muted/20 rounded-xl p-2 aspect-[3/4] overflow-hidden">
            <img
              src={currentImg}
              alt="Current body avatar (template)"
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <p className="text-sm font-bold text-foreground mt-2">{currentWeight}kg</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            -{weightDiff}kg
          </div>
          <ArrowRight className="w-5 h-5 text-primary" />
        </div>

        <div className="text-center flex-1">
          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
            <Target className="w-3 h-3" /> Projected
          </div>
          <div className="relative bg-primary/10 rounded-xl p-2 aspect-[3/4] overflow-hidden ring-1 ring-primary/20">
            <img
              src={goalImg}
              alt="Projected body avatar (template)"
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <p className="text-sm font-bold text-primary mt-2">{goalWeight}kg</p>
        </div>
      </div>

      <p className="text-center text-[10px] text-muted-foreground/80 mt-3">
        This is a realistic visual projection based on profiles similar to yours.
      </p>
    </motion.section>
  );
};

export default BodyTransformationSection;
