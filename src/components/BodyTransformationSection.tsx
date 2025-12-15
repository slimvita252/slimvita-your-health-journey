import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, User, Target, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  gender?: string;
  currentWeight?: number;
  goalWeight?: number;
  height?: number;
  ageRange?: string;
}

interface BodyTransformationSectionProps {
  userData: UserData;
}

const BodyTransformationSection = ({ userData }: BodyTransformationSectionProps) => {
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [goalAvatar, setGoalAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  const generateAvatar = async (type: 'current' | 'goal') => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-body-avatar', {
        body: {
          gender: userData.gender || 'male',
          currentWeight: userData.currentWeight || 85,
          goalWeight: userData.goalWeight || 75,
          height: userData.height,
          ageRange: userData.ageRange,
          type,
        },
      });

      if (error) throw error;
      return data.imageUrl;
    } catch (err: any) {
      console.error(`Error generating ${type} avatar:`, err);
      throw err;
    }
  };

  useEffect(() => {
    // Show fallback after 2 seconds if still loading
    const fallbackTimer = setTimeout(() => {
      if (loading) {
        setShowFallback(true);
      }
    }, 2000);

    const loadAvatars = async () => {
      try {
        const [currentImg, goalImg] = await Promise.all([
          generateAvatar('current'),
          generateAvatar('goal'),
        ]);
        setCurrentAvatar(currentImg);
        setGoalAvatar(goalImg);
        setShowFallback(false);
      } catch (err) {
        setShowFallback(true);
      } finally {
        setLoading(false);
      }
    };

    if (userData.currentWeight && userData.goalWeight) {
      loadAvatars();
    }

    return () => clearTimeout(fallbackTimer);
  }, [userData.currentWeight, userData.goalWeight, userData.gender]);

  const weightDiff = (userData.currentWeight || 85) - (userData.goalWeight || 75);

  // If still loading after timeout, show simplified version
  if (loading && !showFallback) {
    return (
      <div className="bg-card/50 rounded-2xl p-6 border border-border/30">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <p className="text-sm">Generating your visual preview...</p>
        </div>
        <p className="text-center text-xs text-muted-foreground/70 mt-2">
          Your plan is already created. The visual preview may vary slightly.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-2xl p-4 border border-border/50"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Your Transformation Preview</h3>
      </div>

      {/* Compact Avatar Display */}
      <div className="flex items-center justify-center gap-4">
        {/* Current */}
        <div className="text-center flex-1">
          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
            <User className="w-3 h-3" /> Current
          </div>
          <div className="bg-muted/30 rounded-xl p-2 aspect-[3/4] flex items-center justify-center">
            {currentAvatar && !showFallback ? (
              <img src={currentAvatar} alt="Current" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-muted/50 to-muted/20 rounded-lg flex items-center justify-center">
                <User className="w-10 h-10 text-muted-foreground/40" />
              </div>
            )}
          </div>
          <p className="text-sm font-bold text-foreground mt-2">{userData.currentWeight || 85}kg</p>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1">
          <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            -{weightDiff}kg
          </div>
          <ArrowRight className="w-5 h-5 text-primary" />
        </div>

        {/* Goal */}
        <div className="text-center flex-1">
          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
            <Target className="w-3 h-3" /> Goal
          </div>
          <div className="bg-primary/10 rounded-xl p-2 aspect-[3/4] flex items-center justify-center ring-2 ring-primary/20">
            {goalAvatar && !showFallback ? (
              <img src={goalAvatar} alt="Goal" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <Target className="w-10 h-10 text-primary/40" />
              </div>
            )}
          </div>
          <p className="text-sm font-bold text-primary mt-2">{userData.goalWeight || 75}kg</p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[10px] text-muted-foreground/70 mt-3">
        {showFallback 
          ? "This is a visual representation based on your profile."
          : "AI-generated preview based on your data. Results may vary."}
      </p>
    </motion.div>
  );
};

export default BodyTransformationSection;
