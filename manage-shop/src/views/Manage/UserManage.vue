<template>
  <div class="grid">
    <div class="col-12">
      <div class="card p-3">
        <DataTable
          class="p-datatable-sm"
          ref="dt"
          dataKey="id"
          :value="users"
          :loading="loading"
          responsiveLayout="scroll"
          :rows="10"
          paginator
          stripedRows
          editMode="row"
          rowHover
          removableSort
        >
          <template #header>
            <div
              class="flex justify-content-between flex-column md:flex-row align-items-center"
            >
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                class="p-button-outlined text-sm p-all mr-2 mb-2 md:mb-0"
              ></Button>
              <div>
                <span class="p-input-icon-left">
                  <i class="pi pi-search"></i>
                  <InputText
                    placeholder="Keyword Search"
                    class="text-sm input-search"
                  />
                </span>
                <Button
                  v-tippy="{ content: 'Add User', placement: 'top' }"
                  icon="pi pi-plus"
                  class="text-sm p-all md:ml-2"
                ></Button>
              </div>
            </div>
          </template>
          <template #empty>
            <div class="text-red-500">No products found.</div>
          </template>
          <template #loading>
            <div
              v-if="true"
              class="absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center bg-black-alpha-10"
            >
              <TheLoading :isLoading="true" />
            </div>
          </template>
          <Column field="id" header="Id" style="min-width: 4rem"></Column>
          <Column
            field="firstname"
            header="First name"
            style="min-width: 10rem"
          ></Column>
          <Column
            field="lastname"
            header="Last name"
            style="min-width: 10rem"
          ></Column>
          <Column
            field="email"
            header="Email"
            style="min-width: 10rem"
          ></Column>
          <Column field="authorize" header="Create" style="width: 6rem">
            <template #body="{ data }">
              <div class="flex align-items-center">
                <Checkbox
                  v-model="data.ability.actions"
                  value="create"
                  :checked="data.ability.actions.includes('create')"
                />
              </div>
            </template>
          </Column>
          <Column field="authorize" header="Read" style="width: 6rem">
            <template #body="{ data }">
              <div class="flex align-items-center">
                <Checkbox
                  v-model="data.ability.actions"
                  value="read"
                  :checked="data.ability.actions.includes('read')"
                />
              </div>
            </template>
          </Column>
          <Column field="authorize" header="Update" style="width: 6rem">
            <template #body="{ data }">
              <div class="flex align-items-center">
                <Checkbox
                  v-model="data.ability.actions"
                  value="update"
                  :checked="data.ability.actions.includes('update')"
                />
              </div>
            </template>
          </Column>
          <Column field="authorize" header="Delete" style="width: 6rem">
            <template #body="{ data }">
              <div class="flex align-items-center">
                <Checkbox
                  v-model="data.ability.actions"
                  value="delete"
                  :checked="data.ability.actions.includes('delete')"
                />
              </div>
            </template>
          </Column>
          <Column
            :row-editor="true"
            style="width: 6%; min-width: 6rem"
            bodyStyle="text-align: center"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import TheLoading from '../../components/TheLoading.vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()

const users = computed(() => store.getters['user/users'])
const loading = computed(() => store.getters['error/loading'])
// const error = computed(() => store.getters['error/error'])

const getAllUsers = () => {
  store.dispatch('user/getUsers')
}

onMounted(() => {
  getAllUsers()
})
</script>

<style></style>
