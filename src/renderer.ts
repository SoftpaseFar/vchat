import "./index.css";
import "highlight.js/styles/github-dark.min.css";
import App from "./App.vue";
import { createApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import Home from "./views/Home.vue";
import Conversation from "./views/Conversation.vue";
import Setting from "./views/Setting.vue";
import { createPinia } from "pinia";
import { useConversationStore } from "./stores/conversation";

const routes = [
  { path: "/", component: Home },
  { path: "/conversation/:id", component: Conversation },
  { path: "/setting", component: Setting },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useConversationStore();
  if (!to.path.startsWith("/conversation")) {
    store.selectedId = -1;
  }
});

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
