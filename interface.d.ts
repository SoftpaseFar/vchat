import { CreateChatProps, OnUpdatedCallback } from "./src/types";

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => void;
  copyImageToUserDir: (sourcePath: string) => Promise<string>;
  getFilePath: (file: File) => string;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

declare interface Window {
  electronAPI: {
    startChat: (params: {
      messageId: number;
      providerName: string;
      selectModel: string;
      content: string;
    }) => Promise<void>;
  };
}
