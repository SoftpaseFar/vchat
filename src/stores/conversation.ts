import { defineStore } from "pinia";
import { ConversationProps } from "src/types";
import { db } from "../db";

export interface ConversationState {
  items: ConversationProps[];
  selectedId: number;
}

export const useConversationStore = defineStore("conversation", {
  state: (): ConversationState => {
    return {
      items: [],
      selectedId: -1,
    };
  },

  actions: {
    async fetchConversations() {
      const items = await db.conversations.toArray();
      this.items = items;
    },
    async createConversation(createdData: Omit<ConversationProps, "id">) {
      const newId = await db.conversations.add(createdData);
      this.items.push({
        id: newId,
        ...createdData,
      });
      return newId;
    },
  },

  getters: {
    getConversationById: (state) => {
      return (id: number) => {
        return state.items.find((item) => item.id === id);
      };
    },
  },
});
