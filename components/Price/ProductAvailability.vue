<template>
  <div
    v-if="product"
    class="mb-4 text-gray-800 bg-white rounded-lg shadow-lg border-5 md:w-80"
  >
    <div class="p-4">
      <div class="mb-2 text-sm font-bold">Product Availability</div>
      <ToggleSwitch v-model="product.active" size="xs" />
    </div>
  </div>
</template>

<script>
import { ToggleSwitch } from '~/shared/components/ui'

export default {
  props: {
    product: { type: Object },
  },
  components: { ToggleSwitch },
}
</script>

<style scopeds>
</style>
