import { Scale, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const LegalHeader = () => {
  return (
    <header className="bg-gradient-legal text-primary-foreground py-4 px-6 shadow-legal">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Scale className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold">EthioLegal AI</h1>
            <p className="text-sm opacity-90">Ethiopian Legal Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm" className="text-primary">
            <Users className="h-4 w-4 mr-2" />
            Find Lawyer
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LegalHeader;