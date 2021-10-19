<template>
  <section class="w-full p-4 bg-gray-50">
    <!-- All abord the Hype Train! section start -->
    <div class="">
      <h4 class="pb-2 font-semibold tracking-wide">All Live Broadcasts</h4>
      <div class="w-full my-5">
        <nuxt-link
          :to="`/live/${i.id}`"
          v-for="(i, ix) in items"
          :key="ix"
          :product="i"
          class="flex flex-wrap justify-start px-4 py-2 my-4 bg-green-50"
        >
          {{ ix + 1 }}
          <div class="text-red-500">{{ i.title }}</div>
          <div>{{ i.products.length }} products</div>
          <div>
            {{ i.user.firstName }}
            {{ i.user.lastName }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import FreeProduct from '~/components/Anne/FreeProduct'
import CHANNELS from '~/gql/channel/channels.gql'
export default {
  components: {
    FreeProduct,
  },

  data() {
    return {
      items: null,
    }
  },
  async created() {
    this.items =
      (
        await this.$apollo.query({
          query: CHANNELS,
          fetchPolicy: 'no-cache',
        })
      ).data.channels.data || []
  },
}
</script>

<style></style>
