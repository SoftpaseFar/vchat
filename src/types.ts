export interface ConversationProps {
  id: number;
  title: string;
  selectedModel: string;
  createdAt: string;
  updatedAt: string;
  providerId: Number;
}

export interface ProviderProps {
  id: number;
  name: string;
  title?: string;
  desc?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  models: string[];
}

export type MessageStatus = "loading" | "streaming" | "finished";

export interface MessageProps {
  id: number;
  content: string;
  type: "question" | "answer";
  conversationId: number;
  status?: MessageStatus;
  createdAt: string;
  updatedAt: string;
  imagePath?: string;
}

export interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  imagePath?: string;
}

export interface CreateChatProps {
  messages: ChatMessageProps[];
  providerName: string;
  selectedModel: string;
  messageId: number;
}

export interface UpdatedStreamData {
  messageId: number;
  data: {
    is_end: boolean;
    result: string;
  };
}

export type OnUpdatedCallback = (data: UpdatedStreamData) => void;

export interface MessageListInstance {
  ref: HTMLDivElement | null;
}

export interface AppConfig {
  language: "zh" | "en";
  fontSize: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  language: "zh",
  fontSize: 14,
};
