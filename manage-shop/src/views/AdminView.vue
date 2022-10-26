<template>
  <div
    :class="[
      'surface-50 w-full',
      { 'sidebar-close': !isOpenedSidebar, 'mobile-active': isOpenedSidebar }
    ]"
  >
    <TheHeader @openSidebar="onOpenSidebar" />
    <SideBar @openSidebar="onOpenSidebar" @closeOnMobile="closeOnMobile" />
    <div class="main">
      <div style="flex: 1 1 auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/Header/TheHeader.vue'
import SideBar from '../components/SideBar.vue'
import { ref } from 'vue'

const isOpenedSidebar = ref(false)

const onOpenSidebar = () => {
  isOpenedSidebar.value = !isOpenedSidebar.value
}

const closeOnMobile = () => {
  isOpenedSidebar.value = false
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh + 0.5px);
  justify-content: space-between;
  padding: 6.5rem 1.8rem 1.8rem 3.5rem;
  transition: margin-left 0.2s;
  margin-left: 300px;
}

.sidebar-close .main {
  margin-left: 0;
  padding-left: 1.8rem;
}

@media (max-width: 991px) {
  .main {
    margin-left: 0;
    padding-left: 0 !important;
    padding-right: 0;
  }
}
</style>
