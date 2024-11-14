<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import Card from './components/Card.vue'
import type { Product } from './types'

const products = ref<Product[]>([])

async function* getProducts() {
  let skip = 0
  const request = await fetch(`https://dummyjson.com/products?limit=30&skip=${skip}`)
  const result = await request.json()
  if (!result?.products || result.products?.length == 0) return []

  yield result.products
  skip += 30
}

const paginateProducts = getProducts()

onBeforeMount(async () => {
  const result = await paginateProducts.next()
  products.value = [...products.value, ...(result.value as Product[])]
})
onMounted(() => {
  const productSection = document.querySelector('#product-section')! as HTMLDivElement
  productSection.addEventListener('scroll', async () => {
    if (productSection.scrollHeight - productSection.scrollTop == productSection.offsetHeight) {
      const result = await paginateProducts.next()
      products.value = [...products.value, ...(result.value as Product[])]
    }
  })
})
</script>

<template>
  <main class="flex flex-col h-screen">
    <header class="border-0 border-b border-gray-100 shadow-md py-4 px-4">
      <div class="max-w-screen-xl w-full mx-auto">
        <h1 class="text-xl font-medium text-gray-400">
          <b class="text-green-600 font-bold">Vue</b> - Generators
        </h1>
      </div>
    </header>
    <section class="flex-1 overflow-auto h-[90vh] py-4 px-4 bg-gray-100" id="product-section">
      <div
        v-if="products.length > 0"
        class="max-w-screen-xl w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <Card v-for="item in products" :product="item" />
      </div>
    </section>
  </main>
</template>
