<template>
  <div class="grid">
    <div class="col-12">
      <div class="card p-3">
        <h5 class="text-lg font-medium mb-2">Manage Books</h5>
        <DataTable
          class="p-datatable-sm"
          ref="dt"
          dataKey="id"
          :value="products"
          :loading="loading"
          v-model:filters="filters"
          filterDisplay="menu"
          responsiveLayout="scroll"
          :rows="10"
          paginator
          stripedRows
          rowHover
          removableSort
          :editMode="'row'"
          v-model:editingRows="editingRows"
          @rowEditSave="onRowEditSave"
          :globalFilterFields="['productName', 'productCode', 'balance']"
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
                @click="clearFilters()"
              ></Button>
              <div>
                <span class="p-input-icon-left">
                  <i class="pi pi-search"></i>
                  <InputText
                    placeholder="Keyword Search"
                    class="text-sm input-search"
                    v-model="filters['global'].value"
                  />
                </span>
                <Button
                  v-tippy="{ content: 'Add Book', placement: 'top' }"
                  icon="pi pi-plus"
                  class="text-sm p-all md:ml-2"
                  @click="onAddNewProduct"
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

          <Column field="productCode" header="Code" style="min-width: 6rem">
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search product code"
              />
            </template>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template v-if="addNewRow" #footer>
              <InputText
                v-model="newProduct.productCode"
                placeholder="Code"
                readonly
              />
            </template>
          </Column>
          <Column
            field="productName"
            header="Book name"
            style="min-width: 14rem"
          >
            <template #body="{ data }">
              <span class="line-clamp-2 font-medium">
                {{ data.productName }}
              </span>
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search product name"
              />
            </template>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template v-if="addNewRow" #footer>
              <InputText v-model="newProduct.productName" placeholder="Name" />
            </template>
          </Column>
          <Column
            field="productImage"
            bodyClass="p-2"
            header="Image"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              <Image
                :src="data.productImage"
                :alt="data.productName"
                width="60"
                class="shadow-2"
                preview
              />
            </template>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template v-if="addNewRow" #footer>
              <InputText
                v-model="newProduct.productImage"
                placeholder="Image Url"
              />
            </template>
          </Column>
          <Column
            field="quantity"
            sortable
            header="Quantity"
            style="min-width: 10rem"
          >
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search quantity"
              />
            </template>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template v-if="addNewRow" #footer>
              <InputText v-model="newProduct.quantity" placeholder="Quantity" />
            </template>
          </Column>
          <Column
            field="createDate"
            header="Create date"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              {{ formatDate(new Date(data.createDate)) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search create date"
              />
            </template>
            <template #editor="{ data, field }">
              <Calendar
                inputId="dateformat"
                date-format="mm-dd-yy"
                v-model="data[field]"
              />
            </template>
            <template v-if="addNewRow" #footer>
              <Calendar
                inputId="dateformat"
                date-format="mm-dd-yy"
                v-model="newProduct.createDate"
              />
            </template>
          </Column>
          <Column
            field="balance"
            sortable
            header="Balance"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatCurrency(Number(data.balance)) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search price"
              />
            </template>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template v-if="addNewRow" #footer>
              <InputText v-model="newProduct.balance" placeholder="Balance" />
            </template>
          </Column>
          <Column
            field="status"
            header="Status"
            :filterMenuStyle="{ width: '16rem' }"
            style="min-width: 14rem"
          >
            <template #body="{ data }">
              <span
                :class="[
                  'status',
                  data.status === 'INSTOCK'
                    ? 'status-instock'
                    : data.status === 'INPROCESSING'
                    ? 'status-inprocessing'
                    : 'status-outofstock'
                ]"
              >
                {{ data.status }}
              </span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown
                v-model="filterModel.value"
                :options="statuses"
                placeholder="Any"
                class="p-column-filter"
                :showClear="true"
              >
                <template #value="slotProps">
                  <span
                    :class="'status status-' + slotProps.value"
                    v-if="slotProps.value"
                  >
                    {{ slotProps.value }}
                  </span>
                  <span v-else>{{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <span :class="'status status-' + slotProps.option">
                    {{ slotProps.option }}
                  </span>
                </template>
              </Dropdown>
            </template>
            <template #editor="{ data, field }">
              <Dropdown
                v-model="data[field]"
                :options="optionStatuses"
                optionLabel="label"
                optionValue="value"
                placeholder="Select a Status"
              >
                <template #option="slotProps">
                  <span
                    :class="
                      'status status-' + slotProps.option.value.toLowerCase()
                    "
                  >
                    {{ slotProps.option.label }}
                  </span>
                </template>
              </Dropdown>
            </template>
            <template v-if="addNewRow" #footer>
              <InputText v-model="newProduct.status" readOnly />
            </template>
          </Column>
          <Column
            header="Detail"
            style="min-width: 6rem"
            bodyStyle="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <div class="flex align-items-center">
                <button
                  v-tippy="{ content: 'Detail', placement: 'top' }"
                  class="p-link topbar-button text-center"
                >
                  <RouterLink
                    :to="{
                      name: 'detail',
                      params: {
                        book: convertParam(data.productName),
                        id: data.id
                      }
                    }"
                    class="w-full"
                  >
                    <i
                      class="pi pi-search text-lg text-blue-500 cursor-pointer"
                    ></i>
                  </RouterLink>
                </button>
              </div>
            </template>
          </Column>
          <Column
            :row-editor="true"
            style="width: 6%; min-width: 6rem"
            bodyStyle="text-align: center"
          >
            <template v-if="addNewRow" #footer>
              <div class="flex align-items-center justify-content-center">
                <button
                  v-tippy="{ content: 'Save', placement: 'top' }"
                  class="p-link topbar-button ml-1 surface-0"
                  @click="handleAddNew"
                >
                  <i
                    class="pi pi-check text-teal-500 text-lg cursor-pointer"
                  ></i>
                </button>
              </div>
            </template>
          </Column>
          <Column
            style="min-width: 4rem; width: 6%"
            bodyStyle="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <div class="flex align-items-center">
                <button
                  v-tippy="{ content: 'Delete', placement: 'top' }"
                  class="p-link topbar-button ml-1"
                  @click="confirmDelete(data)"
                >
                  <i
                    class="pi pi-trash text-red-500 text-lg cursor-pointer"
                  ></i>
                </button>
              </div>
            </template>
            <template v-if="addNewRow" #footer>
              <div class="flex align-items-center justify-content-center">
                <button
                  v-tippy="{ content: 'Cancel', placement: 'top' }"
                  class="p-link topbar-button ml-1 surface-0"
                  @click="onCancelAddNew"
                >
                  <i
                    class="pi pi-times text-red-500 text-lg cursor-pointer"
                  ></i>
                </button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
  <CustomDialog
    :isOpened="deleteDialog"
    :product="product"
    message="Are you sure you want to delete ?"
    @onCancel="cancelDelete"
    @onAccept="handleDelete(product)"
  ></CustomDialog>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import TheLoading from '../../components/TheLoading.vue'
import Image from 'primevue/image'
import Dropdown from 'primevue/dropdown'
import CustomDialog from '../../components/CustomDialog.vue'
import { useStore } from 'vuex'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { onFormatCurrency, onFormatDate } from '../../utils/constant'
import { useToast } from 'primevue/usetoast'
import { onMounted, computed, ref, reactive } from 'vue'

const store = useStore()
const toast = useToast()
const dt = ref(null)
const product = ref([])
const deleteDialog = ref(false)
const statuses = ref(['instock', 'outofstock', 'inprocessing'])
const optionStatuses = ref([
  { label: 'In Stock', value: 'INSTOCK' },
  { label: 'In Processing', value: 'INPROCESSING' },
  { label: 'Out of Stock', value: 'OUTOFSTOCK' }
])
const editingRows = ref([])
const addNewRow = ref(false)
const code = ref('')
const newProduct = reactive({
  productCode: code,
  productName: '',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  productImage: '',
  quantity: 0,
  createDate: '',
  balance: '',
  status: 'INSTOCK',
  rating: 0
})

const initFilters = {
  global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  productName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
  },
  productCode: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
  },
  quantity: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
  },
  createDate: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
  },
  balance: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
  },
  status: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
  }
}
const filters = ref(initFilters)

const products = computed(() => store.getters['product/products'])
const loading = computed(() => store.getters['error/loading'])
const error = computed(() => store.getters['error/error'])

const clearFilters = () => {
  filters.value = initFilters
}

const getAllProducts = () => {
  store.dispatch('product/getProducts')
}

const formatCurrency = value => {
  return onFormatCurrency(value)
}

const formatDate = value => {
  return onFormatDate(value)
}

const convertParam = strings => {
  return strings.replace(/\s+/g, '-')
}

const confirmDelete = prod => {
  product.value = prod
  deleteDialog.value = true
}

const cancelDelete = () => {
  deleteDialog.value = false
}

const handleDelete = async prod => {
  await store.dispatch('product/deleteProduct', prod)

  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Delete failed',
      detail: 'An error occurred',
      life: 3000
    })
  } else {
    deleteDialog.value = false
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Delete successful',
      life: 3000
    })
  }
}

const onRowEditSave = async event => {
  let { newData } = event
  await store.dispatch('product/updateProduct', newData)
  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Update failed',
      detail: 'An error occurred',
      life: 3000
    })
  } else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Update successful',
      life: 3000
    })
  }
}

const createCode = () => {
  let code = ''
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

const onAddNewProduct = () => {
  addNewRow.value = true
}

const onCancelAddNew = () => {
  addNewRow.value = false
  newProduct.productCode = createCode()
  newProduct.productName = ''
  newProduct.productImage = ''
  newProduct.quantity = ''
  newProduct.createDate = ''
  newProduct.balance = ''
}

const handleAddNew = async () => {
  await store.dispatch('product/addProduct', newProduct)
  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Add new product failed',
      detail: 'An error occurred',
      life: 3000
    })
  } else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Add new product successful',
      life: 3000
    })
    onCancelAddNew()
  }
}

onMounted(() => {
  getAllProducts()
  code.value = createCode()
})
</script>

<style>
.input-search {
  padding: 10.5px 10.5px 10.5px 38px;
}

.p-all {
  padding: 10.5px;
}
.status {
  border-radius: 6px;
  padding: 3px 7px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
.p-dropdown-label {
  padding: 10px !important;
}
.status-instock {
  background: #c8e6c9;
  color: #256029;
}
.status-inprocessing {
  background: #feedaf;
  color: #8a5340;
}
.status-outofstock {
  background: #ffcdd2;
  color: #c63737;
}
.p-row-editor-init:enabled:hover {
  background-color: var(--surface-hover) !important;
}
</style>
