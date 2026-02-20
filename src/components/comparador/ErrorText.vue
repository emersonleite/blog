<template>
  <span
    v-if="message"
    :class="['text-xs text-red-300 dark:text-red-400', attrs.class]"
  >
    {{ message }}
  </span>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const props = defineProps<{
  message?: string | null;
}>();

const attrs = useAttrs();
</script>
