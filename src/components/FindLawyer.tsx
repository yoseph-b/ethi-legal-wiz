import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Clock, Star } from "lucide-react";

interface FindLawyerProps {
  onBack: () => void;
}

const FindLawyer = ({ onBack }: FindLawyerProps) => {
  console.log('FindLawyer component rendering');
  const lawyers = [
    {
      id: 1,
      name: "Kirubel Fekede",
      image: "/lovable-uploads/ea78d8d1-02bd-4efc-b3d4-cfc7b1ef52e3.png",
      specialization: "Criminal Law & Succession",
      rating: 4.8,
      experience: "5 years",
      languages: "Amharic, Afaan Oromo"
    },
    {
      id: 2,
      name: "Dr. Alemayehu Tekle",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      specialization: "Constitutional Law",
      rating: 4.9,
      experience: "15 years",
      languages: "Amharic, English"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Find a Lawyer</h1>
              <p className="text-muted-foreground">Connect with qualified Ethiopian lawyers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lawyers.map((lawyer) => (
            <Card key={lawyer.id} className="hover:shadow-legal transition-all duration-300 bg-gradient-card">
              <CardContent className="p-6 text-center">
                {/* Lawyer Image */}
                <div className="relative mb-4">
                  <img 
                    src={lawyer.image} 
                    alt={lawyer.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary/20"
                  />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                      Available
                    </Badge>
                  </div>
                </div>

                {/* Lawyer Info */}
                <h3 className="font-semibold text-lg mb-1">{lawyer.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{lawyer.specialization}</p>
                <p className="text-xs text-muted-foreground mb-3">Languages: {lawyer.languages}</p>
                
                {/* Rating and Experience */}
                <div className="flex justify-center items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{lawyer.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyer.experience}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                  <p className="font-semibold text-primary">500 Ethiopian Birr</p>
                  <p className="text-sm text-muted-foreground">for 30 minutes call</p>
                </div>

                {/* Call Button */}
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => window.open('tel:0717905446', '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call (0717905446
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindLawyer;