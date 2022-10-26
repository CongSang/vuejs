<template>
  <div
    class="fixed justify-content-between lg:justify-content-start top-0 left-0 w-full h-5rem bg-white shadow-1 header flex align-items-center px-4 transition-all transition-duration-200"
  >
    <RouterLink
      class="flex align-items-center text-900 font-medium text-xl flex-order-2 lg:flex-order-1 lg:w-19rem"
      to="/"
    >
      <img
        style="height: 2.2rem; margin-right: 8px"
        src="https://www.primefaces.org/sakai-vue/images/logo-dark.svg"
        alt="logo"
      />
      <span>BOOK STORE</span>
    </RouterLink>
    <button
      class="p-link topbar-button flex-order-1 lg:flex-order-2 lg:ml-3"
      @click="handleOpen"
    >
      <i class="pi pi-bars text-xl"></i>
    </button>

    <TheMenu />
  </div>
</template>

<script setup>
import TheMenu from './TheMenu.vue'

const emit = defineEmits(['openSidebar'])

const handleOpen = () => {
  emit('openSidebar')
}
</script>

<style>
.header {
  z-index: 1002;
}
</style>
