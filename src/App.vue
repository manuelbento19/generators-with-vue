<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import Card from './components/Card.vue'
import type { Product } from './types'

const products = ref<Product[]>([])
const selected = ref<Product | null>(null)

async function* getProducts() {
  let skip = 0
  while (true) {
    const request = await fetch(`https://dummyjson.com/products?limit=30&skip=${skip}`)
    const result = await request.json()
    if (!result?.products || result.products?.length == 0) return []
    yield result.products as Product[]
    skip += 30
  }
}

const paginateProducts = getProducts()

onBeforeMount(async () => {
  const result = await paginateProducts.next()
  products.value = [...products.value, ...result.value]
})

onMounted(() => {
  const productSection = document.querySelector('#product-section')! as HTMLDivElement
  productSection.addEventListener('scroll', async () => {
    if (productSection.scrollHeight - productSection.scrollTop == productSection.offsetHeight) {
      const result = await paginateProducts.next()
      products.value = [...products.value, ...result.value]
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
        <Card v-for="item in products" :product="item" @click="selected = item" />
      </div>
    </section>
    <section v-if="selected" class="fixed z-10 inset-0 bg-black/15 backdrop-blur-sm flex">
      <button class="text-2xl text-white absolute z-20 p-2 top-3 right-3" @click="selected = null">
        X
      </button>
      <img :src="selected.images[0]" v-bind:alt="selected.title" class="m-auto max-w-lg w-full" />
    </section>
  </main>
</template>
