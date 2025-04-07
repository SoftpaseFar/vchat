<template>
  <div class="h-full flex-1 flex items-center">
    <div class="w-[80%] mx-auto h-full">
      <div class="flex items-center h-[85%]">
        <ProviderSelect :items="providers" v-model="currentProvider" />
      </div>
      <div class="flex items-center h-[15%]">
        <MessageInput
          @create="createConversation"
          :disabled="isModelSelected"
          :iconShown="isIconShown"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ProviderProps } from "../types";
import ProviderSelect from "../components/ProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
import { db } from "../db";
import { onMounted } from "vue";
import { useConversationStore } from "../stores/conversation";

const conversationStore = useConversationStore();
const router = useRouter();
const providers = ref<ProviderProps[]>([]);
const currentProvider = ref("");
const isModelSelected = computed(() => {
  const [_, selectedModel] = currentProvider.value.split("/");
  return !selectedModel;
});

const isIconShown = computed(() => {
  const [_, selectedModel] = currentProvider.value.split("/");
  return ["qwen-vl-plus"].includes(selectedModel);
});

const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split("/");
  return {
    providerId: parseInt(providerId),
    selectedModel,
  };
});

onMounted(async () => {
  providers.value = await db.providers.toArray();
});

const createConversation = async (question: string, imagePath?: string) => {
  const { providerId, selectedModel } = modelInfo.value;
  const currentDate = new Date().toISOString();
  let copiedImagePath: string | undefined;
  if (imagePath) {
    try {
      copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath);
    } catch (error) {
      console.error("Error copying image:", error);
    }
  }
  const conversationId = await conversationStore.createConversation({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate,
  });

  const newMessage = await db.messages.add({
    content: question,
    conversationId,
    createdAt: currentDate,
    updatedAt: currentDate,
    type: "question",
    ...(copiedImagePath && { imagePath: copiedImagePath }),
  });

  router.push(`/conversation/${conversationId}?init=${newMessage}`);
  conversationStore.selectedId = conversationId;
};
</script>
