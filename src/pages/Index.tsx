import IntroScreen from "@/components/IntroScreen";

const Index = () => {
  // Check if questionnaire was completed - if so, show the main site
  const hasCompleted = sessionStorage.getItem("slimvita-questionnaire-completed");

  if (!hasCompleted) {
    return <IntroScreen />;
  }

  // If user completed questionnaire, redirect them to plans
  window.location.href = "/planos";
  return null;
};

export default Index;
