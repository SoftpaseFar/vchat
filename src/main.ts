import { app, BrowserWindow, ipcMain, protocol, net } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { CreateChatProps } from "./types";
import { ChatCompletion } from "@baiducloud/qianfan";
import fs from "fs/promises";
import { convertMessages } from "./tool";
import "dotenv/config";
import OpenAI from "openai";
import url from "url";
import { configManager } from "./config";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  await configManager.load();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 756,
    title: "取个名字吧",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle(
    "copy-image-to-user-dir",
    async (event, sourcePath: string) => {
      const userDataPath = app.getPath("userData");
      const imageDir = path.join(userDataPath, "images");
      await fs.mkdir(imageDir, { recursive: true });
      const fileName = path.basename(sourcePath);
      const destPath = path.join(imageDir, fileName);
      await fs.copyFile(sourcePath, destPath);
      return destPath;
    }
  );

  ipcMain.on("start-chat", async (event, data: CreateChatProps) => {
    const { providerName, messages, messageId, selectedModel } = data;

    // const convertedMessages = await convertMessages(messages);

    if (providerName === "qianfan") {
      const client = new ChatCompletion();
      const stream = await client.chat(
        {
          messages: messages,
          stream: true,
        },
        selectedModel
      );

      for await (const chunk of stream as any) {
        const { is_end, result } = chunk;
        const content = {
          messageId: messageId,
          data: {
            is_end,
            result,
          },
        };
        mainWindow.webContents.send("update-message", content);
      }
    }

    if (providerName === "tongyi") {
      const convertedMessages = await convertMessages(messages);
      const client = new OpenAI({
        apiKey: process.env["ALI_API_KEY"],
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
      });

      const stream = await client.chat.completions.create({
        messages: convertedMessages as any,
        model: selectedModel,
        stream: true,
      });

      for await (const chunk of stream as any) {
        const choices = chunk.choices[0];
        const content = {
          messageId: messageId,
          data: {
            is_end: choices.finish_reason === "stop",
            result: choices.delta.content,
          },
        };
        mainWindow.webContents.send("update-message", content);
      }
    }
  });

  protocol.handle("safe-file", async (request) => {
    const filePath = decodeURIComponent(
      request.url.slice("safe-file://".length)
    );
    const newFilePath = url.pathToFileURL(filePath).toString();
    return net.fetch(newFilePath);
  });

  ipcMain.handle("get-config", async () => {
    return configManager.get();
  });

  ipcMain.handle("update-config", async (event, newConfig) => {
    return await configManager.update(newConfig);
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: "bottom" });
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
