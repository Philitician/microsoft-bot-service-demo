export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isOpen: boolean;
}

export interface BotResponse {
  type: string;
  text: string;
  suggestedActions?: {
    actions: Array<{
      type: string;
      title: string;
      value: string;
    }>;
  };
}