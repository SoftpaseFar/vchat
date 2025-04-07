<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-auto no-scrollbar">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <button
            class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon class="mr-2" icon="radix-icons:chat-bubble" />
            新建聊天
          </button>
        </RouterLink>
        <RouterLink to="/setting">
          <button
            class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700 hover:text-white border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon class="mr-2" icon="radix-icons:gear" />
            应用设置
          </button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ConversationList from "./components/ConversationList.vue";
import { Icon } from "@iconify/vue";
import { onMounted } from "vue";
import { db, initProviders } from "./db";
import { useConversationStore } from "./stores/conversation";
const conversationStore = useConversationStore();
const items = computed(() => conversationStore.items);

onMounted(async () => {
  await initProviders();
  conversationStore.fetchConversations();
});
</script>
