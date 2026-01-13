<script setup>
import { inject } from 'vue'

const orientation = inject('orientation', 'horizontal')

defineProps({
  class: String
})
</script>

<template>
  <div 
    class="min-w-0 shrink-0 grow-0"
    :class="[
      orientation === 'vertical' ? 'min-h-0' : '',
      $attrs.class
    ]"
    style="display: flex; align-items: center; justify-content: center; flex-basis: auto;"
  >
    <slot />
  </div>
</template>

