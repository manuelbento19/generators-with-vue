<script setup lang="ts">
import type { Product } from '@/types'
const { product } = defineProps<{
  product: Product
}>()

const emit = defineEmits(['close'])
const closeModal = () => emit('close')
</script>

<template>
  <section v-if="product" class="fixed z-10 inset-0 bg-black/15 backdrop-blur-sm flex">
    <button class="text-2xl text-white absolute z-20 p-2 top-3 right-3" @click="closeModal">
      X
    </button>
    <img :src="product.images[0]" v-bind:alt="product.title" class="m-auto max-w-lg w-full" />
  </section>
</template>
