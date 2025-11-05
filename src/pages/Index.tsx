import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MoodTracker from "@/components/MoodTracker";
import MeditationGuide from "@/components/MeditationGuide";
import Recommendations from "@/components/Recommendations";
import InteractiveChat from "@/components/InteractiveChat";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <MoodTracker />
      <MeditationGuide />
      <Recommendations />
      <InteractiveChat />
      <Footer />
    </div>
  );
};

export default Index;
