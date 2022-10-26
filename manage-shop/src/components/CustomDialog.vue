<template>
  <Dialog
    :visible="isOpened"
    :style="{ width: '450px' }"
    header="Confirm"
    modal
    :closable="false"
  >
    <div class="flex">
      <div class="flex mr-4 justify-content-center align-items-center">
        <i class="pi pi-info-circle" style="font-size: 2rem"></i>
      </div>
      <span v-if="product">
        {{ message }}
        <p class="font-medium text-lg">Book name: {{ product.productName }}</p>
        <p class="font-medium text-lg">Code: {{ product.productCode }}</p>
      </span>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        class="p-button-text p-button-secondary"
        @click="handleCancel"
      ></Button>
      <Button
        label="Delete"
        class="p-button-danger"
        @click="handleAccept"
      ></Button>
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

defineProps({
  isOpened: Boolean,
  product: Object,
  message: String
})

const emit = defineEmits(['onAccept', 'onCancel'])

const handleAccept = () => {
  emit('onAccept')
}

const handleCancel = () => {
  emit('onCancel')
}
</script>

<style></style>
