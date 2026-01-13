<script setup>
import { inject, computed } from 'vue'

const emblaApi = inject('emblaApi')

const canScrollPrev = computed(() => {
  if (!emblaApi.value) return false
  return emblaApi.value.canScrollPrev()
})

const scrollPrev = () => {
  if (emblaApi.value) {
    emblaApi.value.scrollPrev()
  }
}
</script>

<template>
  <button
    @click="scrollPrev"
    :disabled="!canScrollPrev"
    class="absolute left-0 top-1/2 -translate-y-1/2 z-40 h-8 w-8 rounded-full bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
  >
    <svg
      class="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
</template>

