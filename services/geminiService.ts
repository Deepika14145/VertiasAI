
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        trust_score: { type: Type.INTEGER, description: "Overall trust score from 0-100." },
        summary: { type: Type.STRING, description: "A neutral, one-sentence summary of the main claim." },
        claim_category: { type: Type.STRING, description: "Category of the claim (e.g., 'Health', 'Politics', 'Science')." },
        source_credibility: {
            type: Type.OBJECT,
            properties: {
                level: { type: Type.STRING, description: "Credibility level (e.g., 'Low', 'Medium', 'High')." },
                reason: { type: Type.STRING, description: "A brief reason for the credibility assessment." }
            },
            required: ["level", "reason"]
        },
        emotional_tone: {
            type: Type.OBJECT,
            properties: {
                level: { type: Type.STRING, description: "Emotional intensity (e.g., 'Neutral', 'High')." },
                score: { type: Type.INTEGER, description: "Emotional tone score (0-100)." }
            },
            required: ["level", "score"]
        },
        context_analysis: {
            type: Type.OBJECT,
            properties: {
                is_timely: { type: Type.BOOLEAN, description: "Is the content timely or old news being reshared?" },
                details: { type: Type.STRING, description: "Explanation of the content's timeliness or context." }
            },
            required: ["is_timely", "details"]
        },
        political_bias: {
            type: Type.OBJECT,
            properties: {
                leaning: { type: Type.STRING, description: "Political leaning (e.g., 'Left-leaning', 'Center', 'Right-leaning')." },
                score: { type: Type.INTEGER, description: "Bias score from -100 (Left) to 100 (Right)." }
            },
            required: ["leaning", "score"]
        },
        image_analysis_summary: {
            type: Type.STRING,
            description: "If an image is provided, a summary of forensic analysis (e.g., reverse image search results, signs of manipulation). Null if no image."
        },
        persuasion_techniques: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of propaganda or persuasion techniques found (e.g., 'Fear-mongering', 'Clickbait')."
        },
        educational_breakdown: { type: Type.STRING, description: "A concise, educational explanation for a non-expert." },
        xai_data: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    subject: { type: Type.STRING, description: "The factor being measured (e.g., 'Factual Accuracy')." },
                    value: { type: Type.INTEGER, description: "The score for that factor (0-100)." }
                },
                required: ["subject", "value"]
            },
            description: "Data for the XAI radar chart. Must include 4-6 items like 'Factual Accuracy', 'Source Credibility', 'Neutrality', 'Clarity', 'Contextual Relevance'."
        }
    },
    required: [
        'trust_score', 'summary', 'claim_category', 'source_credibility',
        'emotional_tone', 'context_analysis', 'political_bias',
        'image_analysis_summary', 'persuasion_techniques',
        'educational_breakdown', 'xai_data'
    ]
};

// Helper to convert File to a Gemini Part
const fileToGenerativePart = (file: File): Promise<{ inlineData: { data: string; mimeType: string; } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error("Failed to read file as data URL."));
      }
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

export const analyzeContent = async (text: string, file: File | null): Promise<AnalysisResult> => {
    const systemInstruction = `You are an expert misinformation analyst AI. Analyze the provided content (text, URL, or image) for signs of manipulation, bias, and falsehood. If a URL is provided, analyze the content of that URL. Provide a comprehensive, evidence-based assessment in a structured JSON format. Your analysis must be thorough and multi-faceted, covering all fields in the required JSON schema.`;

    const parts: any[] = [];
    if (text) {
        parts.push({ text: `Please analyze the following content. If it is a URL, analyze the content at that URL: "${text}"` });
    } else if (file) {
        parts.push({ text: "Please analyze the following attached media file for any signs of manipulation or out-of-context usage." });
    }

    if (file) {
        const filePart = await fileToGenerativePart(file);
        parts.push(filePart);
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: parts },
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        
        return result as AnalysisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI. The content may be blocked or the service may be unavailable.");
    }
};
