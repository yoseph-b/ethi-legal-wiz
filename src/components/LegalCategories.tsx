import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  Building2, 
  Users, 
  Home, 
  Briefcase, 
  Car,
  Heart,
  FileText,
  Calculator
} from "lucide-react";

const legalCategories = [
  {
    icon: Scale,
    title: "Criminal Law",
    description: "Questions about criminal offenses, procedures, and rights",
    topics: ["Criminal Procedure", "Penalties", "Rights"],
    color: "bg-red-50 border-red-200"
  },
  {
    icon: Building2,
    title: "Commercial Law",
    description: "Business, contracts, and commercial disputes",
    topics: ["Contracts", "Business Formation", "Trade"],
    color: "bg-blue-50 border-blue-200"
  },
  {
    icon: Users,
    title: "Labor Law",
    description: "Employment rights, workplace issues, and labor disputes",
    topics: ["Employment", "Workplace Rights", "Disputes"],
    color: "bg-green-50 border-green-200"
  },
  {
    icon: Home,
    title: "Civil Law",
    description: "Property, family, and personal legal matters",
    topics: ["Property", "Family", "Personal Rights"],
    color: "bg-purple-50 border-purple-200"
  },
  {
    icon: Briefcase,
    title: "Administrative Law",
    description: "Government procedures and administrative matters",
    topics: ["Government", "Procedures", "Appeals"],
    color: "bg-orange-50 border-orange-200"
  },
  {
    icon: Car,
    title: "Traffic Law",
    description: "Traffic violations, vehicle registration, and transport",
    topics: ["Traffic Rules", "Violations", "Vehicle Law"],
    color: "bg-yellow-50 border-yellow-200"
  },
  {
    icon: Calculator,
    title: "Tax Law",
    description: "Tax obligations, procedures, and compliance matters",
    topics: ["Income Tax", "VAT", "Tax Procedures"],
    color: "bg-indigo-50 border-indigo-200"
  }
];

interface LegalCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const LegalCategories = ({ onCategorySelect }: LegalCategoriesProps) => {
  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ethiopian Legal Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a legal category to get specific guidance on Ethiopian law. 
            Our AI assistant is trained on Ethiopian legal frameworks and procedures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index} 
                className={`${category.color} hover:shadow-legal transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
                onClick={() => onCategorySelect(category.title)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-sm">
                    {category.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic, topicIndex) => (
                      <Badge 
                        key={topicIndex} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-primary hover:bg-primary/90" 
                    size="sm"
                  >
                    Ask Questions
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalCategories;