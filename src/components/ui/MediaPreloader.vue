<template>
  <div v-if="isLoading" class="media-preloader">
    <div class="preloader-spinner"></div>
    <p class="preloader-text">{{ progress }}%</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMediaCache } from '../../composables/useMediaCache'

const props = defineProps({
  mediaUrls: {
    type: Array,
    default: () => []
  },
  onComplete: {
    type: Function,
    default: () => {}
  }
})

const { preloadMediaArray } = useMediaCache()
const isLoading = ref(true)
const loaded = ref(0)
const total = ref(props.mediaUrls.length)

const progress = computed(() => {
  if (total.value === 0) return 100
  return Math.round((loaded.value / total.value) * 100)
})

onMounted(async () => {
  if (props.mediaUrls.length === 0) {
    isLoading.value = false
    props.onComplete()
    return
  }

  for (const url of props.mediaUrls) {
    try {
      await preloadMediaArray([url])
      loaded.value++
    } catch (err) {
      loaded.value++ // Contar como cargado aunque falle
    }
  }

  isLoading.value = false
  props.onComplete()
})
</script>

<style scoped>
.media-preloader {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  gap: 2rem;
}

.preloader-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #51C1E1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.preloader-text {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #51C1E1;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.05em;
}
</style>
