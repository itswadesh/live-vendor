<template>
  <section class="text-gray-800">
    <div class="pt-10 text-3xl font-bold text-center text-green-500">
      Prime Video Call
    </div>
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit"
      class="container flex flex-wrap min-h-screen px-2 py-12 lg:mx-auto"
    >
      <div class="w-full mt-4 mb-auto lg:mt-0 lg:w-1/2 lg:pl-2 lg:pr-4">
        <div class="h-full pt-10 pb-20 bg-gray-300 rounded-lg shadow-lg">
          <div class="flex items-center justify-center space-x-5">
            <button
              @click="start"
              class="flex items-center justify-center w-32 py-1 font-semibold tracking-wide bg-white rounded-md shadow-md hover:shadow focus:outline-none"
            >
              <img
                src="https://img.icons8.com/color/30/000000/youtube-live.png"
              />
              <span class="ml-2">Publish</span>
            </button>
            <button
              @click="stop"
              class="flex items-center justify-center w-32 py-1 font-semibold tracking-wide bg-white rounded-md shadow-md hover:shadow focus:outline-none"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/stop-circled.png"
              />
              <span class="ml-2">Stop</span>
            </button>
            <button
              @click="leave"
              class="flex items-center justify-center w-32 py-1 font-semibold tracking-wide bg-white rounded-md shadow-md hover:shadow focus:outline-none"
            >
              <img
                src="https://img.icons8.com/emoji/30/000000/cross-mark-emoji.png"
              />
              <span class="ml-2">Destroy</span>
            </button>
          </div>

          <video
            autoplay
            muted
            :srcObject.prop="previewStream"
            width="500"
            height="500"
            class="p-0.5 mx-auto mt-5 bg-white border-2 border-gray-300 hw"
          />
          <div
            class="flex items-center mx-auto mt-2 space-x-2 text-xs max-w-max"
          >
            <div
              class="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"
            ></div>
            <span>00:00:00</span>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
import { Modal } from '~/shared/components/ui'
import moment from 'moment'
import { mapMutations } from 'vuex'
import { Button } from '~/shared/components/ui'
import LIVE_STREAM from '~/gql/liveStream/liveStream.gql'
import SAVE_LIVE_STREAM from '~/gql/liveStream/saveLiveStream.gql'
import PRODUCTS from '~/gql/product/products.gql'
import zego from '~/shared/mixins/zego'
export default {
  data() {
    return {
      showModal: false,
      q: '',
      allProducts: [],
      live: {
        title: '',
        scheduleDateTime: moment(),
        products: [],
      },
    }
  },
  mixins: [zego],
  created() {
    this.getData()
    this.search('')
  },
  components: {
    Modal,
    Button,
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      busy: 'busy',
    }),
    removeProductFromList(id) {
      console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', id)
      // this.live.products.pull(p.id)
    },
    async search(q) {
      try {
        this.clearErr()
        this.allProducts =
          (
            await this.$apollo.query({
              query: PRODUCTS,
              variables: { q },
              fetchPolicy: 'no-cache',
            })
          ).data.products.data || []
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
    async submit() {
      const id = this.$route.params.id
      try {
        let products
        if (this.live.products) {
          products = this.live.products.map((a) => a.id)
        }
        this.clearErr()
        const live = (
          await this.$apollo.mutate({
            mutation: SAVE_LIVE_STREAM,
            variables: {
              id,
              title: this.live.title,
              img: this.live.img,
              scheduleDateTime: this.live.scheduleDateTime,
              products,
            },
          })
        ).data.saveLiveStream
        if (id == 'new' || !id || id == undefined || id == 'undefined')
          this.$router.push(`/live/${live.id}`)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
    async getData() {
      this.loading = true
      const id = this.$route.params.id
      if (id == 'new' || !id || id == undefined || id == 'undefined') {
        this.live = { products: [] }
        return
      } else {
        try {
          this.clearErr()
          this.live =
            (
              await this.$apollo.query({
                query: LIVE_STREAM,
                variables: { id },
                fetchPolicy: 'no-cache',
              })
            ).data.liveStream || {}
          this.live.scheduleDateTime = moment(
            this.live.scheduleDateTime
          ).format('YYYY-MM-DD hh:mm:ss a')
          if (this.live.images)
            this.live.images = this.live.images.map((o) => o.id)
        } catch (e) {
          this.setErr(e)
        } finally {
          this.loading = false
          this.busy(false)
        }
      }
    },
  },
}
</script>

<style scoped>
.margin {
  margin-bottom: -1px;
  margin-left: -0.5px;
}
.transitionstyle {
  transition: all;
  transition-duration: 0.3s;
}
</style>
