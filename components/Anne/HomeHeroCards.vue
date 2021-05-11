<template>
  <div v-if="product" class="w-full p-3 overflow-hidden md:w-1/3">
    <nuxt-link
      :to="product.link"
      rel="prefetch"
      class="block bg-white rounded-md shadow avatar zoom hover:shadow-md"
    >
      <button
        class="w-full py-3 text-center text-white shadow rounded-t-md bg-primary-500 hover:shadow"
      >
        {{ product.title }}
      </button>
      <img
        v-lazy="product.img"
        class="object-cover object-top w-full h-40 mb-4 md:h-60"
      />
      <div class="px-6 py-4">
        <div class="mb-2 text-lg font-bold">{{ product.name }}</div>
        <div
          class="flex justify-between mb-2 text-base prose text-gray-600"
          v-html="product.description"
        ></div>
        <div
          class="flex items-center justify-between text-base text-primary-500"
        >
          <div class="text-2xl font-bold">{{ product.footer }}</div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object },
  },
}
</script>

<style scoped></style>
