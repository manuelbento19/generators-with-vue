<script setup lang="ts">
import type { Product } from '@/types'

type Props = {
  product: Product
}
const { product } = defineProps<Props>()
</script>

<template>
  <article class="group border rounded-md cursor-pointer relative">
    <img
      class="h-56 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
      :src="product.images[0]"
      :alt="product.title"
    />
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <span class="text-lg font-semibold text-white">{{ product.title }}</span>
      <p class="text-xs text-gray-200 font-light">{{ product.description }}</p>
    </div>
  </article>
</template>
