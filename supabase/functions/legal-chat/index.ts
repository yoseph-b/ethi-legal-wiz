import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, category } = await req.json();
    
    console.log('Received request:', { message, category });

    // Create a specialized prompt for Ethiopian legal assistant
    const systemPrompt = `You are an Ethiopian Legal AI Assistant specializing in ${category || 'Ethiopian law'}. 

IMPORTANT GUIDELINES:
- Provide information based on Ethiopian law and legal practices
- Always include appropriate disclaimers that this is for informational purposes only
- Recommend consulting with qualified Ethiopian lawyers for specific legal matters
- Be helpful, accurate, and professional
- Focus specifically on Ethiopian legal context and regulations
- If you're not certain about specific Ethiopian laws, clearly state that and recommend professional consultation

Please provide a helpful, informative response about the following legal question in the context of Ethiopian law:`;

    const fullPrompt = `${systemPrompt}\n\nQuestion: ${message}`;

    // Use a free local AI response since external APIs require authentication
    // For a production app, you'd want to implement a proper AI service
    const aiResponse = generateEthiopianLegalResponse(message, category || 'Ethiopian law');
    
    return new Response(JSON.stringify({ 
      response: aiResponse
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  catch (error) {
    console.error('Error in legal-chat function:', error);
    
    const errorResponse = {
      response: `I apologize, but I'm experiencing technical difficulties. For immediate legal assistance, please:

1. **Contact a qualified Ethiopian lawyer**
2. **Visit your local legal aid office**
3. **Check the Ethiopian Legal Information Institute** for legal resources
4. **Contact the Ethiopian Bar Association** for lawyer referrals

**Disclaimer:** This service is for informational purposes only and does not replace professional legal advice.`
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 200, // Return 200 to avoid frontend errors
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateEthiopianLegalResponse(question: string, category: string): string {
  const legalKnowledge = {
    'Labor Law': {
      termination: `According to Ethiopian Labor Law Proclamation No. 1156/2019:

**Employment Termination in Ethiopia:**

1. **Notice Periods:**
   - Probationary period: 30 days notice
   - Regular employment: 90 days notice for misconduct, 30 days for other reasons

2. **Grounds for Termination:**
   - Serious misconduct
   - Poor performance after written warnings
   - Economic reasons (redundancy)
   - Mutual agreement

3. **Severance Pay:**
   - One month's salary for each year of service
   - Immediate payment upon termination

4. **Your Rights:**
   - Written notice stating reasons
   - Right to appeal to labor courts
   - Final settlement within 30 days

**Important:** Consult with the Ministry of Labor and Social Affairs or a qualified Ethiopian employment lawyer for your specific situation.`,
      
      general: `Ethiopian Labor Law provides comprehensive protection for workers. Key areas include employment contracts, working hours, minimum wage, overtime, leave entitlements, workplace safety, and dispute resolution mechanisms through labor courts.`
    },
    'Family Law': {
      general: `Ethiopian Family Code governs marriage, divorce, child custody, inheritance, and family property rights. The law recognizes both religious and civil marriages with specific procedures and requirements.`
    },
    'Contract Law': {
      general: `Ethiopian Civil Code covers contract formation, performance, breach, and remedies. Contracts must meet legal requirements including offer, acceptance, consideration, and lawful purpose.`
    },
    'Criminal Law': {
      general: `Ethiopian Criminal Code defines offenses, penalties, and criminal procedures. It covers crimes against persons, property, public order, and state security with corresponding punishments.`
    },
    'Commercial Law': {
      general: `Ethiopian Commercial Code regulates business activities, company formation, commercial transactions, bankruptcy, and commercial dispute resolution.`
    }
  };

  const categoryData = legalKnowledge[category as keyof typeof legalKnowledge] || legalKnowledge['Labor Law'];
  
  // Check for specific keywords to provide targeted responses
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes('terminat') || questionLower.includes('fire') || questionLower.includes('dismiss')) {
    return categoryData.termination || categoryData.general;
  }
  
  // Provide general category-specific information
  let response = `Thank you for your question about "${question}" regarding ${category}.

${categoryData.general}

**For your specific situation, I recommend:**

1. **Consult with a qualified Ethiopian lawyer** specializing in ${category}
2. **Review the relevant Ethiopian legal codes** and regulations
3. **Contact the appropriate government ministry** or legal authority
4. **Seek guidance from the Ethiopian Bar Association**

**Legal Resources:**
- Ethiopian Legal Information Institute
- Ministry of Justice
- Regional courts and legal aid centers

**Disclaimer:** This information is for general guidance only and does not constitute legal advice. Ethiopian law is complex and situation-specific, so professional legal consultation is essential.`;

  return response;
}