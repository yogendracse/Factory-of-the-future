import { GoogleGenAI, Type } from "@google/genai";
import { SimulationResponse } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateZoneSimulation = async (zoneTitle: string, zoneDescription: string, scenarioContext?: string): Promise<SimulationResponse> => {
  const model = "gemini-2.5-flash";
  
  let prompt = `
    You are the AI brain of a futuristic pharmaceutical factory ("Pharmavite Factory of the Future").
    Generate a realistic, real-time simulation status report for the "${zoneTitle}" zone.
    Context: ${zoneDescription}

    The data should reflect a highly advanced Industry 4.0 environment.
    Include realistic technical metrics appropriate for this specific zone (e.g., for Maintenance: vibration, temp; for Quality: defect rate, purity).
  `;

  if (scenarioContext) {
    prompt += `
      IMPORTANT: Simulate the following specific scenario: "${scenarioContext}".
      Ensure the metrics, status, and AI analysis directly reflect this scenario occurring right now.
    `;
  } else {
    prompt += `
      Create a scenario that is either "Optimal", "Degraded", or has a minor "Warning" to make it interesting, but mostly functional.
    `;
  }

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      systemStatus: {
        type: Type.STRING,
        enum: ["Optimal", "Degraded", "Critical", "Maintenance"],
        description: "The overall operational status of this zone."
      },
      efficiencyScore: {
        type: Type.NUMBER,
        description: "A percentage score (0-100) of current efficiency."
      },
      metrics: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            value: { type: Type.STRING },
            unit: { type: Type.STRING },
            status: { type: Type.STRING, enum: ["good", "warning", "critical"] },
            trend: { type: Type.STRING, enum: ["up", "down", "stable"] }
          }
        }
      },
      recentEvents: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            timestamp: { type: Type.STRING, description: "e.g. 10:42 AM" },
            message: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["info", "alert", "success"] }
          }
        }
      },
      aiAnalysis: {
        type: Type.STRING,
        description: "A brief analysis from the central AI about current performance."
      },
      recommendedAction: {
        type: Type.STRING,
        description: "A specific, actionable recommendation for the operator."
      }
    },
    required: ["systemStatus", "efficiencyScore", "metrics", "recentEvents", "aiAnalysis", "recommendedAction"]
  };

  try {
    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as SimulationResponse;
    } else {
      throw new Error("No content generated");
    }
  } catch (error) {
    console.error("Gemini Simulation Error:", error);
    // Fallback mock data in case of API failure or rate limit
    return {
      systemStatus: 'Degraded',
      efficiencyScore: 85,
      metrics: [
        { name: 'System Load', value: 'N/A', unit: '%', status: 'warning', trend: 'stable' }
      ],
      recentEvents: [
        { timestamp: 'Now', message: 'Simulation service unavailable. Check API Key.', type: 'alert' }
      ],
      aiAnalysis: 'Unable to connect to central AI core.',
      recommendedAction: 'Retry simulation.'
    };
  }
};

export const generateFactoryBackground = async (): Promise<string | null> => {
  // NOTE: Gemini API currently does not support text-to-image generation
  // This feature requires Google's Imagen API which is separate from Gemini
  // For now, we'll return null and the app will use the fallback grid pattern
  
  console.warn("Background image generation is not available. Gemini API does not support text-to-image generation.");
  console.info("To enable AI-generated backgrounds, you would need to integrate Google's Imagen API separately.");
  
  // Uncomment below if/when Imagen API integration is added
  /*
  const model = "imagen-3.0-generate-001"; // This would be the Imagen model
  const prompt = `
    A futuristic, high-tech pharmaceutical factory floor plan in a dark isometric style.
    
    Visual Layout:
    - Top-Left: Large stainless steel chemical mixing tanks and processing pipes.
    - Top-Right: Advanced IoT server racks and automated machinery.
    - Center: Clean, white automated production lines with conveyor belts and robotic arms.
    - Bottom-Left: A digital quality control station with screens.
    - Bottom-Right: An automated warehouse with orange shelving and small AGV robots.
    - Bottom-Center: A glowing, glass-walled command center (Watch Tower).

    Style:
    - Dark blue and slate grey color palette with neon emerald and cyan data lines.
    - Photorealistic, cinematic lighting, highly detailed 8k resolution.
    - Isometric perspective looking down at a 45 degree angle.
    - No text, just visual architecture.
  `;

  try {
    // Imagen API call would go here
    const response = await genAI.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Background Generation Error:", error);
    return null;
  }
  */
  
  return null;
};