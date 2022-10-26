<template>
  <div class="grid">
    <div class="col-12 relative">
      <button
        v-tippy="{ content: 'Back', placement: 'left' }"
        class="p-link topbar-button absolute z-5 surface-100"
        style="top: 1rem; right: 1rem"
        @click="onPrevPage"
      >
        <i class="pi pi-angle-left text-3xl text-purple-500 cursor-pointer"></i>
      </button>
      <div class="card">
        <div v-if="error" class="p-4 text-red-500 text-center">
          An error occur
        </div>
        <div v-if="loading" class="grid">
          <div class="col-12 md:col-6 p-3 flex justify-content-center">
            <Skeleton width="100%" height="400px"></Skeleton>
          </div>
          <div class="col-12 md:col-6 p-3">
            <Skeleton width="180px" height="32px" class="mb-1"></Skeleton>
            <Skeleton width="110px" height="18px" class="mb-2"></Skeleton>
            <Skeleton width="140px" height="44px" class="mb-2"></Skeleton>
            <Skeleton width="100%" class="mb-1"></Skeleton>
            <Skeleton width="100%" class="mb-1"></Skeleton>
            <Skeleton width="100%" class="mb-2"></Skeleton>
            <Skeleton width="180px" class="mb-2"></Skeleton>
            <Skeleton width="120px" class="mb-3"></Skeleton>
            <Skeleton width="130px" class="mb-2"></Skeleton>
          </div>
        </div>
        <div v-if="product && !loading" class="grid">
          <div class="col-12 md:col-6 p-2 flex justify-content-center">
            <img
              style="'width': 100%, 'max-height': '600px', 'object-fit': contain"
              :src="product.productImage"
              :alt="product.productName"
            />
          </div>
          <div class="col-12 md:col-6 px-3 py-5">
            <div class="mb-2">
              <h3 class="font-semibold text-2xl md:mr-5">
                {{ product.productName }}
              </h3>
              <p>
                (<span class="text-900 font-medium">Code: </span>
                {{ product.productCode }})
              </p>
            </div>

            <p class="text-red-500 text-3xl font-bold mb-3">
              {{ formatCurrency(Number(product.balance)) }}
            </p>

            <p class="text-700 text-base mb-3">
              <span class="text-900 font-medium">Description: </span>
              {{ product.description }}
            </p>
            <p class="text-700 text-base mb-3">
              <span class="text-900 font-medium">Create date: </span>
              {{ formatDate(new Date(product.createDate)) }}
            </p>
            <p class="text-700 text-base mb-3">
              <span class="text-900 font-medium">Quantity: </span>
              {{ product.quantity }}
            </p>
            <p class="text-700 text-base mb-4">
              <span class="text-900 font-medium">Status: </span>
              <span
                :class="[
                  'status ml-1',
                  product.status === 'INSTOCK'
                    ? 'status-instock'
                    : product.status === 'INPROCESSING'
                    ? 'status-inprocessing'
                    : 'status-outofstock'
                ]"
              >
                {{ product.status }}
              </span>
            </p>

            <div class="flex align-items-center">
              <Rating
                :modelValue="Number(product.rating)"
                readonly
                :stars="5"
                :cancel="false"
              />
              <span class="ml-2">({{ product.rating }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductByIdApi } from '../api/productApi'
import Rating from 'primevue/rating'
import { onFormatCurrency, onFormatDate } from '../utils/constant'
import Skeleton from 'primevue/skeleton'

const product = ref({})
const error = ref('')
const route = useRoute()
const router = useRouter()
const id = route.params.id
const loading = ref(false)

const getProductDetail = async id => {
  loading.value = true
  await getProductByIdApi(id)
    .then(res => {
      product.value = res.data
    })
    .catch(err => {
      error.value = err.message
    })
  loading.value = false
}
onMounted(() => getProductDetail(id))

const formatCurrency = value => {
  return onFormatCurrency(value)
}

const formatDate = value => {
  return onFormatDate(value)
}

const onPrevPage = () => {
  router.go(-1)
}
</script>

<style></style>
