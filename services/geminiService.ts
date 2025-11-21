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
  const model = "imagen-3.0-generate-001";
  const prompt = `A futuristic, high-tech pharmaceutical factory floor in a dark isometric 3D style. 
  
Visual Layout:
- Top-Left: Large stainless steel chemical mixing tanks and processing pipes with blue lighting
- Top-Right: Advanced IoT server racks and automated machinery with screens
- Center: Clean, white automated production lines with conveyor belts and robotic arms
- Bottom-Left: A digital quality control station with monitors and testing equipment
- Bottom-Right: An automated warehouse with orange/yellow shelving and small AGV robots
- Bottom-Center: A glowing, glass-walled command center (Watch Tower) with purple/blue lighting

Style:
- Dark blue and slate grey color palette with neon emerald and cyan accent lights
- Photorealistic 3D render, cinematic lighting, highly detailed
- Isometric perspective looking down at a 45 degree angle
- Industrial sci-fi aesthetic with glowing data lines connecting zones
- No text labels, just visual architecture
- Atmospheric fog or mist for depth`;

  try {
    console.log("Generating factory background with Imagen 3...");
    
    const response = await genAI.models.generateImages({
      model: model,
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "16:9"
      }
    });

    console.log("Imagen API response:", response);

    if (response.generatedImages && response.generatedImages.length > 0) {
      const imageData = response.generatedImages[0];
      if (imageData.image && imageData.image.imageBytes) {
        // imageBytes might be string (base64) or Uint8Array depending on SDK version
        let base64: string;
        const imageBytes = imageData.image.imageBytes;
        
        if (typeof imageBytes === 'string') {
          // Already base64 encoded
          base64 = imageBytes;
        } else {
          // Convert Uint8Array to base64
          const bytes = imageBytes as unknown as Uint8Array;
          let binary = '';
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          base64 = btoa(binary);
        }
        
        const mimeType = imageData.image.mimeType || 'image/png';
        console.log("Factory background generated successfully!");
        return `data:${mimeType};base64,${base64}`;
      }
    }
    
    console.warn("No image data returned from Imagen API");
    return null;
  } catch (error) {
    console.error("Background Generation Error:", error);
    console.error("Error details:", error);
    return null;
  }
};