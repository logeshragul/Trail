export enum ViewState {
  HOME = 'HOME',
  CHAT = 'CHAT',
  VISION = 'VISION',
  SPEECH = 'SPEECH'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface VisionResult {
  text: string;
  relatedLinks?: Array<{ title: string; uri: string }>;
}

export interface SpeechVoice {
  name: string;
  label: string;
}

export const AVAILABLE_VOICES: SpeechVoice[] = [
  { name: 'Kore', label: 'Kore (Female)' },
  { name: 'Puck', label: 'Puck (Male)' },
  { name: 'Fenrir', label: 'Fenrir (Male)' },
  { name: 'Zephyr', label: 'Zephyr (Female)' },
];