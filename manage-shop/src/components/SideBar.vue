<template>
  <div class="mask" @click="handleOpen"></div>
  <div class="sidebar shadow-1">
    <div>
      <ul class="list-none p-0 m-0">
        <li class="mt-0">
          <div class="text-xs font-semibold text-900 uppercase mb-2">Home</div>
          <ul class="list-none p-0 m-0">
            <li v-for="item in home" :key="item.name">
              <RouterLink
                :to="{ name: item.path }"
                class="flex align-items-center text-700 py-2 px-3 border-round-md text-sm transition-colors transition-duration-400 p-link"
                active-class="text-blue-500 font-medium"
                style="margin-bottom: 4px"
                @click="handleCloseMobile"
              >
                <i :class="['pi-fw text-sm', item.icon]"></i>
                <span class="ml-2">{{ item.name }}</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li class="mt-2">
          <div class="text-xs font-semibold text-900 uppercase mb-2">
            Manage
          </div>
          <ul class="list-none p-0 m-0">
            <li v-for="item in manage" :key="item.name">
              <RouterLink
                :to="{ name: item.path }"
                class="flex align-items-center text-700 py-2 px-3 border-round-md text-sm transition-colors transition-duration-400 p-link"
                style="margin-bottom: 4px"
                active-class="text-blue-500 font-medium"
                @click="handleCloseMobile"
              >
                <i :class="['pi-fw text-sm', item.icon]"></i>
                <span class="ml-2">{{ item.name }}</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { homeMenu, manageMenu } from '../utils/constant'
import { ref } from 'vue'

const emit = defineEmits(['openSidebar', 'closeOnMobile'])

const home = ref(homeMenu)
const manage = ref(manageMenu)

const handleOpen = () => {
  emit('openSidebar')
}

const handleCloseMobile = () => {
  emit('closeOnMobile')
}
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1003;
  transition: all 0.2s;
  display: none;
}

.sidebar-close .sidebar {
  transform: translateX(-100%);
  left: 0;
}

.sidebar {
  position: fixed;
  width: 300px;
  height: calc(100vh - 8rem);
  z-index: 1004;
  overflow-y: auto;
  user-select: none;
  top: 6.5rem;
  left: 1.8rem;
  transition: transform 0.2s, left 0.2s;
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
}

@media (max-width: 991px) {
  .sidebar {
    transform: translateX(-100%);
    left: 0;
    top: 0;
    height: 100vh;
    border-radius: 0;
  }

  .mobile-active .sidebar {
    transform: translateX(0);
  }

  .mobile-active .mask {
    display: block;
  }
}
a:hover {
  background-color: #f1f7fd;
}
</style>
