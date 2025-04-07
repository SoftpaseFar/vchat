import { defineStore } from "pinia";
import { ProviderProps } from "src/types";
import { db } from "../db";

export interface ProviderState {
  items: ProviderProps[];
}

export const useProviderStore = defineStore("provider", {
  state: (): ProviderState => {
    return {
      items: [],
    };
  },

  actions: {},

  getters: {},
});
