<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import Card from './components/Card.vue'
import type { Product } from './types'

const products = ref<Product[]>([])

async function getProducts() {
  const request = await fetch('https://dummyjson.com/products')
  const result = await request.json()
  products.value = result.products
}

onBeforeMount(async () => {
  await getProducts()
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
    <section class="flex-1 overflow-auto h-[90vh] py-4 px-4 bg-gray-100">
      <div
        class="max-w-screen-xl w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <Card v-for="item in products" :product="item" />
      </div>
    </section>
  </main>
</template>
