import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import LegalHeader from "@/components/LegalHeader";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LegalHeader />
      
      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy & Disclaimers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Information Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information provided by EthioLegal AI is for informational purposes only and does not constitute legal advice. 
                Our AI assistant is not a licensed legal professional and the responses generated may contain inaccuracies or 
                errors. For official legal advice, please consult with a qualified Ethiopian lawyer or legal professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">AI Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                Please be aware that our AI system can make mistakes and may not always provide accurate or complete information. 
                The AI responses should not be relied upon as a substitute for professional legal counsel. Always verify 
                information with qualified legal professionals before making any legal decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take the security of your personal information seriously. Your email address and password are stored securely 
                using industry-standard encryption methods. We do not share your personal information with third parties without 
                your explicit consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>We collect the following information:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Email address for account creation and authentication</li>
                  <li>Password (encrypted and securely stored)</li>
                  <li>Chat conversations with our AI assistant</li>
                  <li>Usage data to improve our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us through 
                our support channels.
              </p>
            </section>

            <section className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;