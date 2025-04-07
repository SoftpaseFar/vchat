<template>
  <div
    class="w-full border border-gray-300 rounded-md px-3 py-1.5 focus-within:border-green-700 transition-all"
  >
    <div v-if="imagePreview" class="mb-2 relative flex items-center">
      <img
        :src="imagePreview"
        alt="Preview"
        class="h-24 w-24 object-cover rounded"
      />
    </div>
    <div class="flex items-center">
      <input
        type="file"
        accept="image/*"
        class="hidden"
        ref="fileInput"
        @change="handleImageUpload"
      />
      <Icon
        v-if="iconShown"
        icon="radix-icons:image"
        width="24"
        height="24"
        :class="[
          'mr-2',
          disabled
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-400 cursor-pointer hover:text-gray-600',
        ]"
        @click="triggerFileInput"
      />
      <input
        v-model="model"
        type="text"
        placeholder="Type a message..."
        class="flex-1 outline-none text-gray-800 bg-transparent placeholder-gray-400 text-sm"
        :disabled="disabled"
        @keydown.enter="onCreate"
      />
      <Button
        iconName="icon-park-outline:send"
        @click="onCreate"
        :disabled="disabled"
      >
        发送
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "./Button.vue";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const fileInput = ref<HTMLInputElement | null>(null);

// defineProps<{
//   disabled?: boolean;
// }>()

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  iconShown: {
    type: Boolean,
    default: false,
  },
});

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInput.value?.click();
  }
};

const emit = defineEmits<{
  create: [value: string, imagePath?: string];
}>();

const model = defineModel<string>();

const imagePreview = ref("");
let selectedImage: File | null = null;
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedImage = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(selectedImage);
  }
};

const onCreate = () => {
  if (model.value && model.value.trim() !== "") {
    if (selectedImage) {
      const filePath = window.electronAPI.getFilePath(selectedImage);
      emit("create", model.value, filePath);
    } else {
      emit("create", model.value);
    }
    selectedImage = null;
    imagePreview.value = "";
  }
};
</script>
