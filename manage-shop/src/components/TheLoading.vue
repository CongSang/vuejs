<template>
  <div v-if="isLoading" class="loading"></div>
</template>

<script setup>
defineProps({
  isLoading: Boolean
})
</script>

<style scoped>
.loading {
  border: 3px solid hsla(218, 100%, 52%, 0.2);
  border-top-color: #0963f3;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
