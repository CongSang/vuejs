<template>
  <div class="col-12 md:col-6 xl:col-3">
    <div class="card mb-0">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">{{ item.name }}</span>
          <div class="text-900 font-medium text-xl">{{ item.number }}</div>
        </div>
        <div
          :class="[
            'flex align-items-center justify-content-center border-round',
            item.color
          ]"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i :class="['text-xl', item.icon]"></i>
        </div>
      </div>
      <span class="text-green-500 font-medium">24 new </span>
      <span class="text-500">since last visit</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
})
</script>

<style></style>
