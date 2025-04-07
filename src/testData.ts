import { MessageProps, ConversationProps, ProviderProps } from "./types";

export const messages: MessageProps[] = [
  {
    id: 1,
    content: "什么事光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "question",
    conversationId: 1,
  },
  {
    id: 2,
    content:
      "光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "answer",
    conversationId: 1,
  },
  {
    id: 3,
    content: "什么事光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "question",
    conversationId: 1,
  },
  {
    id: 4,
    content:
      "光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "answer",
    status: "loading",
    conversationId: 1,
  },
  {
    id: 5,
    content: "什么事光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "question",
    conversationId: 2,
  },
  {
    id: 6,
    content:
      "光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "answer",
    conversationId: 2,
  },
  {
    id: 7,
    content:
      "光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "question",
    conversationId: 3,
  },
  {
    id: 8,
    content:
      "光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用光合作用",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    type: "answer",
    conversationId: 3,
  },
];

export const conversation: ConversationProps[] = [
  {
    id: 1,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么大家撒肯定撒大家萨拉丁撒娇",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 2,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 3,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 4,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 5,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 6,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 7,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 8,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 9,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
  {
    id: 10,
    selectedModel: "GPT-3.5-Turbo",
    title: "Deepseek干什么",
    createdAt: "2025.03.15",
    updatedAt: "2025.03.15",
    providerId: 1,
  },
];

export const providers: ProviderProps[] = [
  {
    id: 1,
    name: "qianfan",
    title: "文心一言",
    desc: "文心一言 百度出品的大模型",
    models: ["ERNIE-4.0-8K", "ERNIE-3.5-8K", "ERNIE-Speed-128K"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
  },
  {
    id: 2,
    name: "tongyi",
    title: "通义千问",
    desc: "通义千问 阿里出品的大模型",
    models: ["qwen-plus", "qwen-turbo", "qwen-vl-plus", "qwen-vl-max"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
  },
  {
    id: 3,
    name: "deepseek",
    title: "Deepseek",
    desc: "Deepseek 开源大模型",
    models: ["ERNIIDSA-1.0-88K", "DSADDDSA-6.3-9K", "SADAASA-5.6-72K"],
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
  },
];
