<script setup>
import { ref, provide, computed, onMounted } from 'vue'
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const props = defineProps({
  opts: {
    type: Object,
    default: () => ({})
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  plugins: {
    type: Array,
    default: () => []
  }
})

const emblaNode = ref(null)
const emblaApi = ref(null)

onMounted(() => {
  if (!emblaNode.value) return

  const defaultOptions = {
    align: 'center',
    loop: true,
    axis: props.orientation === 'vertical' ? 'y' : 'x',
    ...props.opts
  }

  // Remove breakpoints from options to avoid Embla errors
  delete defaultOptions.breakpoints

  emblaApi.value = EmblaCarousel(emblaNode.value, defaultOptions, props.plugins)
})

// Provide API to children
provide('emblaApi', emblaApi)
provide('orientation', props.orientation)
</script>

<template>
  <div class="relative w-full">
    <div ref="emblaNode" class="overflow-hidden">
      <slot />
    </div>
  </div>
</template>
