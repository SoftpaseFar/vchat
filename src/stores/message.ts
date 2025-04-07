import { defineStore } from "pinia";
import { db } from "../db";
import { MessageProps, MessageStatus, UpdatedStreamData } from "src/types";

export interface MessageState {
  items: MessageProps[];
}

export const useMessageStore = defineStore("message", {
  state: (): MessageState => ({
    items: [],
  }),

  actions: {
    async fetchMessagesByConversation(conversationId: number) {
      const items = await db.messages.where({ conversationId }).toArray();
      this.items = items;
    },
    async createMessage(createdData: Omit<MessageProps, "id">) {
      const newMessageId = await db.messages.add(createdData);
      this.items.push({
        id: newMessageId,
        ...createdData,
      });
      return newMessageId;
    },

    async updateMessage(messageId: number, updatedData: Partial<MessageProps>) {
      await db.messages.update(messageId, updatedData);
      const index = this.items.findIndex((message) => message.id === messageId);
      if (index !== -1) {
        this.items[index] = {
          ...this.items[index],
          ...updatedData,
        } as MessageProps;
      }
    },
  },

  getters: {
    getLastQuestion: (state) => (conversationId: number) => {
      return state.items.findLast(
        (item) =>
          item.conversationId === conversationId && item.type === "question"
      );
    },
    isMessageLoading: (state) => {
      return state.items.some(
        (item) => item.status === "loading" || item.status === "streaming"
      );
    },
  },
});
