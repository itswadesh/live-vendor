<template>
  <section class="flex bg-gray-100 border-2 border-gray-800">
    <div class="w-full">
      <div class="">
        <h4 class="pb-2 font-semibold tracking-wide">All Prime Video Calls</h4>
        <div class="flex flex-wrap justify-start w-full my-5">
          <nuxt-link
            :to="`/live/prime/${i.id}`"
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
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from '~/components/Livenow/Sidebar.vue'
import Livenow from '~/components/Livenow/Livenow.vue'
import LIVE_STREAMS from '~/gql/liveStream/liveStreams.gql'
export default {
  components: {
    Sidebar,
    Livenow,
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
