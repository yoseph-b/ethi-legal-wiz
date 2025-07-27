import { Scale, MessageCircle, Users, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LegalHeader = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate('/auth');
    }
  };

  return (
    <header className="bg-gradient-legal text-primary-foreground py-4 px-6 shadow-legal">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Scale className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
            <p className="text-sm opacity-90">{t('header.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSelector />
          {user ? (
            <>
              <Button variant="secondary" size="sm" className="text-primary">
                <Users className="h-4 w-4 mr-2" />
                {t('header.findLawyer')}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm" className="text-primary gap-2">
                    <User className="h-4 w-4" />
                    {user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    {t('header.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="secondary" size="sm" className="text-primary">
                {t('header.signIn')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default LegalHeader;