import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

// Initialize the API client
// Note: process.env.API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const GeminiService = {
  /**
   * Send a chat message to Gemini
   */
  async chat(history: { role: 'user' | 'model'; parts: { text: string }[] }[], message: string) {
    try {
      const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'You are a helpful and knowledgeable AI assistant for MyAIWebApp.',
        },
        history: history,
      });

      const result: GenerateContentResponse = await chatSession.sendMessage({ message });
      return result.text || "I couldn't generate a response.";
    } catch (error) {
      console.error("Chat Error:", error);
      throw error;
    }
  },

  /**
   * Analyze an image with a prompt
   */
  async analyzeImage(base64Image: string, mimeType: string, prompt: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image
              }
            },
            { text: prompt || "Describe this image in detail." }
          ]
        }
      });
      return response.text || "No description generated.";
    } catch (error) {
      console.error("Vision Error:", error);
      throw error;
    }
  },

  /**
   * Convert text to speech
   */
  async textToSpeech(text: string, voiceName: string): Promise<AudioBuffer | null> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (!base64Audio) {
        throw new Error("No audio data received from API");
      }

      // Decode audio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      return await audioContext.decodeAudioData(bytes.buffer);
    } catch (error) {
      console.error("TTS Error:", error);
      throw error;
    }
  }
};