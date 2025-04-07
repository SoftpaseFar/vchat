import { ipcRenderer, contextBridge, webUtils } from "electron";
import { CreateChatProps, OnUpdatedCallback, AppConfig } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
  startChat: (data: CreateChatProps) => {
    ipcRenderer.send("start-chat", data);
  },
  onUpdateMessage: (callback: OnUpdatedCallback) =>
    ipcRenderer.on("update-message", (_event, data) => callback(data)),
  copyImageToUserDir: (sourcePath: string) =>
    ipcRenderer.invoke("copy-image-to-user-dir", sourcePath),
  getFilePath: (file: File) => webUtils.getPathForFile(file),
  getConfig: () => ipcRenderer.invoke("get-config"),
  updateConfig: (config: Partial<AppConfig>) =>
    ipcRenderer.invoke("update-config", config),
});
