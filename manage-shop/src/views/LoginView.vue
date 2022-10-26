<template>
  <div
    class="fixed top-0 surface-50 left-0 w-full h-full flex justify-content-center align-items-center"
  >
    <div
      class="relative w-30rem max-w-full mx-2 bg-white border-round-lg shadow-md px-4 py-7 shadow-2 login"
    >
      <div class="flex flex-column justify-content-center align-items-center">
        <div class="p-4 surface-200 border-circle">
          <i class="pi pi-user" style="font-size: 2rem"></i>
        </div>
        <h5 class="text-2xl font-medium">Welcome</h5>
        <p class="text-sm text-500">Sign in to continue</p>
      </div>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid mt-5">
        <div class="field mb-4">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope z-1"></i>
            <InputText
              :disabled="loading"
              id="email"
              v-model="v$.email.$model"
              :class="{ 'p-invalid': v$.email.$invalid && submitted }"
            />
            <label
              for="email"
              :class="{ 'p-error': v$.email.$invalid && submitted }"
            >
              Email*
            </label>
          </div>
          <span v-if="v$.email.$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.email.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.email.$invalid && submitted) || v$.email.$pending.$response
            "
            class="p-error"
          >
            {{ v$.email.required.$message.replace('Value', 'Email') }}
          </small>
        </div>
        <div class="field mb-4">
          <div class="p-float-label">
            <Password
              :disabled="loading"
              id="password"
              v-model="v$.password.$model"
              :class="{ 'p-invalid': v$.password.$invalid && submitted }"
              toggleMask
            >
              <template #footer="sp">
                {{ sp.level }}
                <Divider />
              </template>
            </Password>
            <label
              for="password"
              :class="{ 'p-error': v$.password.$invalid && submitted }"
            >
              Password*
            </label>
          </div>
          <span v-if="v$.password.$error && submitted">
            <span
              id="password-error"
              v-for="(error, index) of v$.password.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.password.$invalid && submitted) ||
              v$.password.$pending.$response
            "
            class="p-error"
          >
            {{ v$.password.required.$message.replace('Value', 'Password') }}
          </small>
        </div>
        <Button
          :disabled="loading"
          type="submit"
          label="Sign in"
          class="p-2 text-lg"
        ></Button>
      </form>

      <div
        v-if="loading"
        class="absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center bg-black-alpha-10"
      >
        <TheLoading :isLoading="loading" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { email, required, maxLength, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { computed, reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'
import TheLoading from '../components/TheLoading.vue'

const store = useStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const redirect = route.query.redirect
const submitted = ref(false)
const requiredEmailLength = ref(30)
const requiredPasswordLength = ref(20)

const state = reactive({
  email: '',
  password: ''
})

const rules = {
  email: {
    required,
    email,
    maxLength: maxLength(requiredEmailLength.value)
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(requiredPasswordLength.value)
  }
}

const v$ = useVuelidate(rules, state)

const error = computed(() => store.getters['error/error'])
const loading = computed(() => store.getters['error/loading'])

const handleSubmit = async isValid => {
  submitted.value = true
  if (!isValid) {
    return
  } else {
    submitted.value = false
    await store.dispatch('auth/login', {
      email: state.email,
      password: state.password
    })
    if (error.value) {
      toast.add({
        severity: 'error',
        summary: 'Login failed',
        detail: error.value.data,
        life: 3000
      })
    } else {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Login successful',
        life: 3000
      })
      router.push({ path: redirect })
    }
  }
}
</script>

<style>
.login .p-inputtext {
  padding: 12px 32px 12px 14px !important;
}
label {
  font-size: 1rem;
}

@font-face {
  font-family: 'fontello';
  src: url('../assets/font/fontello.eot?99736387');
  src: url('../assets/font/fontello.eot?99736387#iefix')
      format('embedded-opentype'),
    url('../assets/font/fontello.woff?99736387') format('woff'),
    url('../assets/font/fontello.woff2?99736387') format('woff2'),
    url('../assets/font/fontello.ttf?99736387') format('truetype'),
    url('../assets/font/fontello.svg?99736387#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}

input[type='password'] {
  font-family: 'fontello';
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -4px;
}
</style>
