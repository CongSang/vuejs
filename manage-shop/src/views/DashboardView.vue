<template>
  <div class="grid">
    <StatistItem v-for="item in data" :key="item.name" :item="item" />

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5 class="text-lg font-medium">Sale Overview</h5>
        <div class="p-chart">
          <Chart type="bar" :data="chart1" :options="option1" />
        </div>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5 class="text-lg font-medium">Sale Overview</h5>
        <div class="p-chart">
          <Chart type="line" :data="chart2" :options="option2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatistItem from '../components/StatistItem.vue'
import Chart from 'primevue/chart'
import {
  statistics,
  chartData1,
  chartOptions1,
  chartData2,
  chartOptions2
} from '../utils/fakeData'

const data = ref(statistics)
const chart1 = ref(chartData1)
const chart2 = ref(chartData2)
const option1 = ref(chartOptions1)
const option2 = ref(chartOptions2)
</script>

<style></style>
