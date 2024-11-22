import type { Product } from '@/types'

export class ProductService {
  async *getAll() {
    let skip = 0
    while (true) {
      const request = await fetch(`https://dummyjson.com/products?limit=30&skip=${skip}`)
      const result = await request.json()
      if (!result?.products || result.products?.length == 0) return []
      yield result.products as Product[]
      skip += 30
    }
  }
}
