<template>
  <div class="relative flex-order-3 lg:ml-auto">
    <button
      class="p-link topbar-button inline-flex lg:hidden"
      @click="isOpened = !isOpened"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <Transition>
      <ul
        v-show="isOpened"
        class="absolute top-100 right-0 bg-white shadow-2 p-2 border-round-xs lg:flex lg:shadow-none lg:static lg:flex-row origin-top-right list-none"
      >
        <li>
          <button
            v-tippy="{ content: 'Log out', placement: 'bottom' }"
            class="p-link topbar-button mx-2 my-2 lg:my-0 lg:ml-3"
            @click="handleLogout"
          >
            <i class="pi pi-sign-out text-xl"></i>
          </button>
        </li>
        <li>
          <button
            v-tippy="{ content: 'Settings', placement: 'bottom' }"
            class="p-link topbar-button mx-2 my-2 lg:my-0 lg:ml-3"
          >
            <i class="pi pi-cog text-xl"></i>
          </button>
        </li>
        <li>
          <button
            v-tippy="{ content: 'Account', placement: 'bottom' }"
            class="p-link topbar-button mx-2 my-2 lg:my-0 lg:ml-3"
          >
            <i class="pi pi-user text-xl"></i>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const isOpened = ref(false)
const store = useStore()
const router = useRouter()

const handleLogout = () => {
  store.dispatch('auth/logout')
  router.push({ name: 'login', query: { redirect: '/' } })
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
