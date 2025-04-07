<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 border-t cursor-pointer p-2"
      :class="{
        'bg-gray-100 hover:bg-gray-300': store.selectedId === item.id,
        'bg-white hover:bg-gray-200': store.selectedId !== item.id,
      }"
      v-for="item in items"
      :key="item.id"
    >
      <div @click="goToConversation(item.id)">
        <div
          class="flex justify-between items-center text-sm leading-5 text-gray-500"
        >
          <span>{{ item.selectedModel }}</span>
          <span>{{ dayjs(item.updatedAt).format("YYYY-MM-DD") }}</span>
        </div>
        <h2 class="font-semibold leading-6 truncate text-gray-900">
          {{ item.title }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ConversationProps } from "../types";
import dayjs from "dayjs";
import { useConversationStore } from "../stores/conversation";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useConversationStore();
defineProps<{ items: ConversationProps[] }>();

const goToConversation = (id: number) => {
  router.push(`/conversation/${id}`);
  store.selectedId = id;
};
</script>
