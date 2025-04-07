<template>
  <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2 no-scrollbar">
    <MessageList :messages="filteredMessages" ref="messageListRef" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput
      @create="sendNewMessage"
      v-model="inputValue"
      :disabled="messageStore.isMessageLoading"
      :iconShown="isIconShown"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { MessageProps, MessageListInstance, MessageStatus } from "../types";
import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import { db } from "../db";
import { useConversationStore } from "../stores/conversation";
import { useMessageStore } from "../stores/message";

const inputValue = ref<string>("");

const messageListRef = ref<MessageListInstance>();

const conversationStore = useConversationStore();
const messageStore = useMessageStore();
// 获取路由参数
const route = useRoute();

const filteredMessages = computed(() => messageStore.items);

let conversationId = ref(parseInt(route.params.id as string));
const initMessageId = parseInt(route.query.init as string);
const conversation = computed(() => {
  return conversationStore.getConversationById(conversationId.value);
});

const lastQuestion = computed(() =>
  messageStore.getLastQuestion(conversationId.value)
);

const sendedMessages = computed(() =>
  filteredMessages.value
    .filter((message) => message.status !== "loading")
    .map((message) => {
      return {
        role: message.type === "question" ? "user" : "assistant",
        content: message.content,
        ...(message.imagePath && {
          imagePath: message.imagePath,
        }),
      };
    })
);

const sendNewMessage = async (question: string, imagePath?: string) => {
  if (question) {
    let copiedImagePath: string | undefined;
    if (imagePath) {
      try {
        copiedImagePath = await window.electronAPI.copyImageToUserDir(
          imagePath
        );
      } catch (error) {
        console.error("Error copying image:", error);
      }
    }
    const date = new Date().toISOString();
    await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      createdAt: date,
      updatedAt: date,
      type: "question",
      ...(copiedImagePath && { imagePath: copiedImagePath }),
    });
    inputValue.value = "";
    createInitialMessage();
  }
};

const createInitialMessage = async () => {
  const createData: Omit<MessageProps, "id"> = {
    content: "",
    conversationId: conversationId.value,
    type: "answer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "loading",
  };

  const newMessageId = await messageStore.createMessage(createData);

  await scrollToBottom();

  if (conversation.value) {
    const provider = await db.providers
      .where({ id: conversation.value.providerId })
      .first();

    if (provider) {
      await (window as any)?.electronAPI?.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        messages: sendedMessages.value,
      });
    }
  }
};

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messageListRef.value) {
    messageListRef.value.ref?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }
};

onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value);

  if (initMessageId) {
    await createInitialMessage();
  }

  await scrollToBottom();
  let currentMessageListHeigh = 0;
  const checkAndScrollToBottom = async () => {
    if (messageListRef.value) {
      const newHeight = messageListRef.value.ref?.clientHeight || 0;
      if (newHeight > currentMessageListHeigh) {
        currentMessageListHeigh = newHeight;
        await scrollToBottom();
      }
    }
  };
  let streamContent = "";
  window.electronAPI.onUpdateMessage(async (streamData) => {
    const { messageId, data } = streamData;
    streamContent += data.result;
    const updatedData = {
      content: streamContent,
      status: (data.is_end ? "finished" : "streaming") as MessageStatus,
      updatedAt: new Date().toISOString(),
    };

    messageStore.updateMessage(messageId, updatedData);
    await nextTick();
    await checkAndScrollToBottom();
    if (data.is_end) {
      streamContent = "";
    }
  });
});

const isIconShown = computed(() => {
  return ["qwen-vl-plus"].includes(conversation.value?.selectedModel || "");
});

// 更新
watch(
  () => route.params.id as string,
  async (newId: string) => {
    conversationId.value = parseInt(newId);

    await messageStore.fetchMessagesByConversation(conversationId.value);

    await scrollToBottom();
  }
);
</script>
