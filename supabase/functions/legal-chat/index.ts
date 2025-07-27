import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

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
    const { message, category, language = 'en' } = await req.json();
    console.log('Received request:', { message, category, language });

    // System prompt for Ethiopian Legal AI Assistant
    const languageInstruction = language === 'am' 
      ? 'Please respond in Amharic (አማርኛ). Use proper Amharic script and culturally appropriate expressions.'
      : 'Please respond in English.';
    
    const systemPrompt = `You are an Ethiopian Legal AI Assistant specializing in Ethiopian law. You provide accurate, helpful information about Ethiopian legal matters while emphasizing the importance of consulting with qualified legal professionals.

${languageInstruction}

Your responses should be:
- Accurate and based on Ethiopian law
- Professional and helpful
- Clear about limitations and the need for professional legal advice
- Culturally sensitive to Ethiopian context
- Focused on the category: ${category}

Always include a disclaimer that your advice is general information and recommend consulting with a qualified Ethiopian lawyer for specific legal matters.

Please provide information about: ${message}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'Ethiopian Legal Assistant',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${data.error?.message || 'Unknown error'}`);
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in legal-chat function:', error);
    const errorMessage = language === 'am' 
      ? "በአሁኑ ጊዜ ቴክኒካዊ ችግሮች እያጋጠሙኝ ነው። ለፈጣን ህጋዊ እርዳታ፣ እባክዎ:\n\n1. **በዚህ የህግ ዘርፍ የተካነ ባለሙያ ኢትዮጵያዊ ጠበቃን ያማክሩ**\n2. **ተዛማጅ የኢትዮጵያ ህግ ኮዶችና ደንቦችን ያጣሩ**\n3. **ተዛማጅ የመንግስት ሚኒስቴር ወይም ህጋዊ ባለስልጣንን ያገናኙ**\n4. **የኢትዮጵያ የጠበቃዎች ማህበርን ይማክሩ**\n\n**ማስታወሻ:** ይህ አጠቃላይ መረጃ ብቻ ነው እናም የህግ ምክር አይወክልም።"
      : "I'm currently experiencing technical difficulties. For immediate legal assistance, please:\n\n1. **Consult with a qualified Ethiopian lawyer** who specializes in this area of law\n2. **Check the relevant Ethiopian legal codes** and regulations\n3. **Contact the appropriate government ministry** or legal authority\n4. **Seek guidance from the Ethiopian Bar Association**\n\n**Disclaimer:** This is general information only and does not constitute legal advice.";
    
    return new Response(JSON.stringify({ 
      response: errorMessage 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});