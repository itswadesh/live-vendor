<template>
  <section>
    <!-- Heading section start  -->
    <div>
      <h1 class="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
        Products
      </h1>
    </div>
    <!-- Heading section end -->
    <!-- Button section start -->

    <div class="flex my-5">
      <GrnIndGradiantButton
        @click="$router.push('/products/new')"
        class="text-sm"
      >
        <plus-icon size="1.5x" class="custom-class"></plus-icon>
        <span>Add New Product</span>
      </GrnIndGradiantButton>

      <WhiteButton class="ml-2 text-sm"> Import Products </WhiteButton>
    </div>

    <!-- Button section end -->
  </section>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
import WhiteButton from '~/components/ui/WhiteButton.vue'

export default {
  components: {
    PlusIcon,
    GrnIndGradiantButton,
    WhiteButton,
  },
}
</script>

<style></style>
