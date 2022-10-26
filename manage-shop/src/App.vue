<template>
  <div id="app">
    <RouterView />
  </div>

  <Toast
    position="top-right"
    :breakpoints="{
      '920px': { width: '100%', right: '0', left: '0', top: '0' }
    }"
  />
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import { getToken } from './utils/constant'
import { setAuthToken } from './api/axiosClient'

export default {
  components: { Toast },
  setup() {
    const router = useRouter()
    const store = useStore()
    const data = ref(getToken())

    const error = computed(() => store.getters['error/error'])

    const handleInfoUser = async (to, next) => {
      if (data.value) {
        setAuthToken(data.value.token)
        await store.dispatch('auth/loginByToken', data.value.id)
        if (error.value) {
          next({
            name: 'login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next({
          name: 'login',
          query: { redirect: to.fullPath }
        })
      }
    }

    router.beforeEach((to, from, next) => {
      const auth = computed(() => store.getters['auth/isAuthenticated'])
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth.value) {
          handleInfoUser(to, next)
        } else {
          next()
        }
      } else {
        next()
      }
    })
  }
}
</script>

<style scoped></style>
