import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AvatarRequest {
  gender: string;
  currentWeight: number;
  goalWeight: number;
  height?: number;
  ageRange?: string;
  type: "current" | "goal";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { gender, currentWeight, goalWeight, height, ageRange, type } = await req.json() as AvatarRequest;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Calculate body characteristics
    const heightCm = height || 170;
    const weight = type === "current" ? currentWeight : goalWeight;
    const bmi = weight / ((heightCm / 100) ** 2);
    
    // Determine body type description
    let bodyDescription = "";
    if (bmi < 18.5) {
      bodyDescription = "slim, underweight body type with visible bone structure";
    } else if (bmi < 25) {
      bodyDescription = "healthy, fit body type with good muscle definition and low body fat";
    } else if (bmi < 30) {
      bodyDescription = "slightly overweight body type with some excess fat around the midsection";
    } else if (bmi < 35) {
      bodyDescription = "overweight body type with noticeable fat accumulation on abdomen, arms, and thighs";
    } else {
      bodyDescription = "obese body type with significant fat accumulation throughout the body";
    }

    // Adjust for goal visualization
    const progressDescription = type === "goal" 
      ? "showing athletic transformation, toned muscles, reduced body fat, healthy glow"
      : "showing current state";

    // Gender-specific details
    const genderDesc = gender?.toLowerCase() === "female" || gender?.toLowerCase() === "woman" 
      ? "adult woman" 
      : "adult man";

    // Age description
    let ageDesc = "30-40 years old";
    if (ageRange) {
      if (ageRange.includes("18") || ageRange.includes("25")) ageDesc = "25-30 years old";
      else if (ageRange.includes("30") || ageRange.includes("35")) ageDesc = "30-40 years old";
      else if (ageRange.includes("40") || ageRange.includes("45")) ageDesc = "40-50 years old";
      else if (ageRange.includes("50") || ageRange.includes("55")) ageDesc = "50-60 years old";
      else if (ageRange.includes("60")) ageDesc = "60+ years old";
    }

    const prompt = `Generate a realistic full-body fitness avatar illustration of a ${genderDesc}, ${ageDesc}, with ${bodyDescription}, ${progressDescription}. 

Style requirements:
- Professional fitness app illustration style
- Standing pose, front view, confident posture
- Wearing athletic workout clothes (sports bra and leggings for women, tank top and shorts for men)
- Clean white/light gray gradient background
- No face details - use a generic silhouette or blurred facial features
- Realistic human body proportions
- Good lighting, soft shadows
- Health and wellness aesthetic
- Ultra high resolution

The body should accurately represent someone with BMI of ${bmi.toFixed(1)} who weighs ${weight}kg at ${heightCm}cm height.`;

    console.log(`Generating ${type} avatar for ${genderDesc} with BMI ${bmi.toFixed(1)}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image generated, response:", JSON.stringify(data));
      throw new Error("No image was generated");
    }

    return new Response(JSON.stringify({ imageUrl, type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating avatar:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
