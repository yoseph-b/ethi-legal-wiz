import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Scale, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/legal-hero.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="relative h-[70vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Ethiopian Legal Consultation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <Scale className="h-3 w-3 mr-1" />
                {t('hero.badge')}
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-legal text-lg px-8 py-6"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t('hero.startConsultation')}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
                >
                  {t('hero.learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-legal transition-all duration-300 bg-gradient-card">
              <CardContent className="p-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.availability.title')}</h3>
                <p className="text-muted-foreground">
                  {t('features.availability.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-legal transition-all duration-300 bg-gradient-card">
              <CardContent className="p-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.ethiopianLaw.title')}</h3>
                <p className="text-muted-foreground">
                  {t('features.ethiopianLaw.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-legal transition-all duration-300 bg-gradient-card">
              <CardContent className="p-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.security.title')}</h3>
                <p className="text-muted-foreground">
                  {t('features.security.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;