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

    // Use Hugging Face's free inference API with Mistral model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
            return_full_text: false
          }
        }),
      }
    );

    if (!response.ok) {
      console.error('Hugging Face API error:', response.status, response.statusText);
      
      // Fallback response if API fails
      const fallbackResponse = {
        response: `Thank you for your question about "${message}" regarding ${category || 'Ethiopian law'}. 
        
I'm currently experiencing connectivity issues with the AI service. However, I can provide some general guidance:

For ${category || 'legal matters'} in Ethiopia, I recommend:

1. **Consult with a qualified Ethiopian lawyer** who specializes in this area of law
2. **Check the relevant Ethiopian legal codes** and regulations
3. **Contact the appropriate government ministry** or legal authority
4. **Seek guidance from the Ethiopian Bar Association**

**Disclaimer:** This is general information only and does not constitute legal advice. Please consult with a qualified legal professional for specific legal matters.

Would you like me to help you with any other general legal questions?`
      };
      
      return new Response(JSON.stringify(fallbackResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Hugging Face response:', data);
    
    let aiResponse = '';
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      aiResponse = data[0].generated_text;
    } else if (data.generated_text) {
      aiResponse = data.generated_text;
    } else {
      // Fallback if response format is unexpected
      aiResponse = `Thank you for your question about "${message}". I'm here to help with Ethiopian legal matters. For specific advice regarding ${category || 'this legal matter'}, I recommend consulting with a qualified Ethiopian lawyer who can provide personalized guidance based on current Ethiopian law and your specific circumstances.`;
    }

    // Add disclaimer if not already present
    if (!aiResponse.toLowerCase().includes('disclaimer') && !aiResponse.toLowerCase().includes('legal advice')) {
      aiResponse += '\n\n**Disclaimer:** This information is for general guidance only and does not constitute legal advice. Please consult with a qualified Ethiopian lawyer for specific legal matters.';
    }

    return new Response(JSON.stringify({ 
      response: aiResponse.trim()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
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