<script setup>
import { inject } from 'vue'

const orientation = inject('orientation', 'horizontal')
</script>

<template>
  <div 
    class="flex flex-row"
    style="width: 100%; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center;"
  >
    <slot />
  </div>
</template>

<style scoped>
div {
  flex-wrap: nowrap;
}
</style>
