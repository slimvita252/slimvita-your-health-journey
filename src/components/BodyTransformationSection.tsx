import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, User, Target, Loader2, RefreshCw } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'current' | 'goal'>('current');

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

  const loadAvatars = async () => {
    setLoading(true);
    setError(null);

    try {
      // Generate both avatars in parallel
      const [currentImg, goalImg] = await Promise.all([
        generateAvatar('current'),
        generateAvatar('goal'),
      ]);

      setCurrentAvatar(currentImg);
      setGoalAvatar(goalImg);
    } catch (err: any) {
      setError(err.message || 'Failed to generate avatars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData.currentWeight && userData.goalWeight) {
      loadAvatars();
    }
  }, [userData.currentWeight, userData.goalWeight, userData.gender]);

  const weightDiff = (userData.currentWeight || 85) - (userData.goalWeight || 75);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Visualization</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Your Body Transformation Preview
          </h2>
          <p className="text-muted-foreground">
            See your potential transformation based on your personal data
          </p>
        </div>

        {/* Avatar Display */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-primary" />
              </motion.div>
              <p className="mt-4 text-muted-foreground">Generating your personalized avatars...</p>
              <p className="text-sm text-muted-foreground/70 mt-2">This may take a moment</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={loadAvatars}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:flex items-center justify-center gap-8">
                {/* Current Body */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 text-center"
                >
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
                      <User className="w-3 h-3 inline mr-1" />
                      Current Body
                    </div>
                    <div className="bg-gradient-to-b from-muted/30 to-muted/10 rounded-xl p-4 mt-4">
                      {currentAvatar ? (
                        <img
                          src={currentAvatar}
                          alt="Current body avatar"
                          className="w-full max-w-[280px] mx-auto rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-[400px] bg-muted/20 rounded-lg flex items-center justify-center">
                          <User className="w-16 h-16 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-lg font-semibold text-foreground">
                      {userData.currentWeight || 85} kg
                    </p>
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                    -{weightDiff} kg
                  </div>
                  <ArrowRight className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Goal Body */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      <Target className="w-3 h-3 inline mr-1" />
                      Expected Result
                    </div>
                    <div className="bg-gradient-to-b from-primary/20 to-primary/5 rounded-xl p-4 mt-4 ring-2 ring-primary/30">
                      {goalAvatar ? (
                        <img
                          src={goalAvatar}
                          alt="Goal body avatar"
                          className="w-full max-w-[280px] mx-auto rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-[400px] bg-primary/10 rounded-lg flex items-center justify-center">
                          <Target className="w-16 h-16 text-primary/50" />
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-lg font-semibold text-primary">
                      {userData.goalWeight || 75} kg
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Mobile View with Swipe */}
              <div className="md:hidden">
                {/* Toggle Buttons */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveView('current')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                      activeView === 'current'
                        ? 'bg-muted text-foreground'
                        : 'bg-transparent text-muted-foreground'
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-1" />
                    Current
                  </button>
                  <button
                    onClick={() => setActiveView('goal')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                      activeView === 'goal'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-transparent text-muted-foreground'
                    }`}
                  >
                    <Target className="w-4 h-4 inline mr-1" />
                    Goal
                  </button>
                </div>

                {/* Swipeable Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, x: activeView === 'current' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeView === 'current' ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div
                      className={`rounded-xl p-4 ${
                        activeView === 'current'
                          ? 'bg-gradient-to-b from-muted/30 to-muted/10'
                          : 'bg-gradient-to-b from-primary/20 to-primary/5 ring-2 ring-primary/30'
                      }`}
                    >
                      <img
                        src={activeView === 'current' ? currentAvatar! : goalAvatar!}
                        alt={`${activeView} body avatar`}
                        className="w-full max-w-[280px] mx-auto rounded-lg"
                      />
                    </div>
                    <p
                      className={`mt-3 text-xl font-bold ${
                        activeView === 'current' ? 'text-foreground' : 'text-primary'
                      }`}
                    >
                      {activeView === 'current'
                        ? `${userData.currentWeight || 85} kg`
                        : `${userData.goalWeight || 75} kg`}
                    </p>
                    {activeView === 'goal' && (
                      <p className="text-sm text-primary font-medium mt-1">
                        -{weightDiff} kg from your current weight
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Swipe Indicator */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Tap to switch between views
                </p>
              </div>
            </>
          )}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-4 px-4"
        >
          These images are AI-generated body avatars based on your data.
          <br />
          They represent a realistic projection of your transformation when following your personalized plan.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default BodyTransformationSection;
