<template>
  <section class="w-full p-4 bg-gray-50">
    <!-- All abord the Hype Train! section start -->
    <div class="">
      <h4 class="pb-2 font-semibold tracking-wide">All Live Broadcasts</h4>
      <div class="flex flex-wrap justify-start w-full my-5">
        <nuxt-link
          :to="`/live/${i.id}`"
          v-for="(i, ix) in items"
          :key="ix"
          :product="i"
          class=""
        >
          {{ ix + 1 }}
          {{ i.title }}
          <div>{{ i.products.length }} products</div>
          <div>
            {{ i.user.firstName }}
            {{ i.user.lastName }}
          </div>
        </nuxt-link>
      </div>
      <!-- <div class="flex items-center my-5">
        <hr class="w-full border-t border-gray-500" />
        <div
          class="flex cursor-pointer -mt-0.5 items-center px-4 text-indigo-500 max-w-max whitespace-nowrap hover:text-indigo-700"
        >
          <h5 class="font-semibold">Show more</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <hr class="w-full border-t border-gray-500" />
      </div> -->
    </div>
    <!-- All abord the Hype Train! section end -->

    <!-- Recommended Minecraft Channels section start -->
    <!-- <div class="">
      <h4 class="pb-2 font-semibold tracking-wide">
        Recommended
        <span class="text-indigo-500 uppercase"> Minecraft</span> Channels
      </h4>
      <div class="flex flex-wrap justify-start w-full">
        <FreeProduct v-for="(i, ix) in items" :key="ix" :product="i" class="" />
      </div>
      <div class="flex items-center my-5">
        <hr class="w-full border-t border-gray-500" />
        <div
          class="flex cursor-pointer -mt-0.5 items-center px-4 text-indigo-500 max-w-max whitespace-nowrap hover:text-indigo-700"
        >
          <h5 class="font-semibold">Show more</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <hr class="w-full border-t border-gray-500" />
      </div>
    </div> -->
    <!-- Recommended Minecraft Channels section end -->

    <!-- Recommended Valorant Channels section start -->
    <!-- <div class="">
      <h4 class="pb-2 font-semibold tracking-wide">
        Recommended
        <span class="text-indigo-500 uppercase"> Valorant</span> Channels
      </h4>
      <div class="flex flex-wrap justify-start w-full my-5">
        <FreeProduct v-for="(i, ix) in items" :key="ix" :product="i" class="" />
      </div>
      <div class="flex items-center my-5">
        <hr class="w-full border-t border-gray-500" />
        <div
          class="flex cursor-pointer -mt-0.5 items-center px-4 text-indigo-500 max-w-max whitespace-nowrap hover:text-indigo-700"
        >
          <h5 class="font-semibold">Show more</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <hr class="w-full border-t border-gray-500" />
      </div>
    </div> -->
    <!-- Recommended Valorant Channels section end -->
  </section>
</template>

<script>
import FreeProduct from '~/components/Anne/FreeProduct'
import LIVE_STREAMS from '~/gql/liveStream/liveStreams.gql'
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
          query: LIVE_STREAMS,
          fetchPolicy: 'no-cache',
        })
      ).data.liveStreams.data || []
  },
}
</script>

<style></style>
