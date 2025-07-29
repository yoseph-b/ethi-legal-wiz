import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LegalHeader from "@/components/LegalHeader";
import HeroSection from "@/components/HeroSection";
import LegalCategories from "@/components/LegalCategories";
import ChatInterface from "@/components/ChatInterface";
import FindLawyer from "@/components/FindLawyer";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'home' | 'categories' | 'chat' | 'findLawyer'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    setCurrentView('categories');
  };

  const handleFindLawyer = () => {
    setCurrentView('findLawyer');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('chat');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory('');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('');
  };

  if (!user) {
    return null;
  }

  if (currentView === 'chat') {
    return (
      <ChatInterface 
        selectedCategory={selectedCategory} 
        onBack={handleBackToCategories}
      />
    );
  }

  if (currentView === 'findLawyer') {
    return (
      <FindLawyer onBack={handleBackToHome} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LegalHeader />
      
      {currentView === 'home' && (
        <HeroSection onGetStarted={handleGetStarted} onFindLawyer={handleFindLawyer} />
      )}
      
      {currentView === 'categories' && (
        <LegalCategories onCategorySelect={handleCategorySelect} />
      )}
    </div>
  );
};

export default Index;
