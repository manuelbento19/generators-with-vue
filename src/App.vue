<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import Card from './components/card.vue'
import Header from './components/header.vue'
import Modal from './components/modal.vue'
import type { Product } from './types'
import { ProductService } from './services'

const products = ref<Product[]>([])
const productsGallery = ref<HTMLDivElement>()
const selected = ref<Product | null>(null)
const service = new ProductService()

const getProducts = service.getAll()

onBeforeMount(async () => {
  const result = await getProducts.next()
  products.value = [...products.value, ...result.value]
})

onMounted(() => {
  const container = productsGallery.value!
  container.addEventListener('scroll', async () => {
    if (container.scrollHeight - container.scrollTop == container.offsetHeight) {
      const result = await getProducts.next()
      products.value = [...products.value, ...result.value]
    }
  })
})
</script>

<template>
  <main class="flex flex-col h-screen">
    <Header />
    <section
      ref="productsGallery"
      class="flex-1 overflow-auto h-[90vh] py-4 px-4 bg-gray-100"
      id="product-section"
    >
      <div
        v-if="products.length > 0"
        class="max-w-screen-xl w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <Card v-for="item in products" :product="item" @click="selected = item" />
      </div>
    </section>
    <Modal v-if="selected" :product="selected" @close="() => (selected = null)" />
  </main>
</template>
