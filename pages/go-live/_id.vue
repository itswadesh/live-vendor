<template>
  <section class="text-gray-800">
    <header class="w-full py-2 pt-10">
      <div
        class="
          flex
          items-center
          justify-center
          py-4
          text-xl
          font-bold
          text-center text-red-500
          bg-white
          shadow-md
          md:text-3xl
        "
      >
        <div class="w-4 h-4 mr-2 bg-red-500 rounded-full md:w-5 md:h-5"></div>
        <span>GO LIVE</span>
      </div>
    </header>
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit"
      class="container flex flex-wrap min-h-screen px-2 py-12 mx-auto"
    >
      <div class="w-full lg:w-1/2 lg:pl-4 lg:pr-2">
        <TextboxFloating
          v-model="live.title"
          label="Live Show Title"
          class="mb-5 shadow-md"
        />
        <div class="mb-5">
          <!-- <VueCtkDateTimePicker
            v-model="live.scheduleDateTime"
            class="shadow-md"
          /> -->
        </div>
        <div class="p-4 mb-5 bg-white rounded-md shadow-md">
          <div class="flex flex-wrap justify-center lg:justify-start">
            <div
              v-for="(p, index) in live.products"
              :key="index"
              class="
                relative
                flex flex-wrap
                items-center
                justify-between
                mb-2
                mr-1
                bg-white
                border-2 border-gray-300
                h-36
                group
                w-36
                hover:border-blue-500
              "
            >
              <img v-lazy="p.img" alt="" class="w-32 h-32 mx-auto" />
              <div class="absolute bottom-0 w-full">
                <p class="m-1 text-xs text-center">
                  {{ p.name }}
                </p>
              </div>
              <div
                class="
                  absolute
                  inset-0
                  z-10
                  hidden
                  bg-gray-900
                  cursor-default
                  transitionstyle
                  margin
                  group-hover:block
                  bg-opacity-60
                "
              >
                <!-- v-if="showDeleteBtnIndex == null"
                  @click="deleteImage(i)" -->
                <div class="ml-auto max-w-max">
                  <button
                    @click="removeProductFromList(index)"
                    class="
                      m-1
                      transition
                      duration-100
                      transform
                      cursor-pointer
                      focus:outline-none
                      focus:scale-75
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <p
                  class="
                    mt-5
                    text-sm
                    font-semibold
                    text-center text-gray-100
                    transition
                    duration-100
                    transform
                    cursor-pointer
                    hover:scale-95
                    focus:outline-none
                    focus:scale-75
                  "
                >
                  Click to add
                </p>
                <nuxt-link to="/go-live">
                  <p
                    class="
                      mt-8
                      text-sm
                      font-semibold
                      text-center text-gray-100
                      transition
                      duration-100
                      transform
                      cursor-pointer
                      hover:scale-95
                      focus:outline-none
                      focus:scale-75
                    "
                  >
                    View
                  </p>
                </nuxt-link>
              </div>
            </div>
            <!-- :images.sync="product.images" -->
            <!-- <ImageDropbox
              folder="product"
              name="product"
              class="ml-4"
              @saveImage="saveImages"
              :product="product"
            /> -->

            <button
              @click="showModal = true"
              type="button"
              class="
                border-2 border-gray-300 border-dashed
                cursor-pointer
                focus:outline-none
                hover:text-blue-500
                group
                hover:border-blue-600
                h-36
                w-36
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="
                  w-16
                  h-16
                  mx-auto
                  text-gray-300
                  group-hover:text-blue-600
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h5
                class="
                  mt-5
                  text-xs text-center text-gray-400
                  group-hover:text-blue-600
                "
              >
                Select Products
              </h5>
            </button>
          </div>
        </div>
        <div class="mx-auto xl:mt-10 max-w-max">
          <GrnIndGradiantButton type="submit" class="px-24 xl:mt-5">
            SAVE
          </GrnIndGradiantButton>
        </div>
        <Modal
          :show="showModal"
          @submit="showModal = false"
          @cancel="showModal = false"
          title="Select Products"
          okText="OK"
          cancelText="Cancel"
          type="info"
        >
          <button
            @click="showModal = false"
            class="
              absolute
              p-1
              transition
              duration-300
              transform
              rounded-md
              hover:bg-opacity-50
              group
              hover:bg-gray-900
              hover:shadow-md
              top-3
              right-3
              focus:outline-none
              focus:scale-75
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 transition duration-100 group-hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search"
            v-model="q"
            @keyup="search(q)"
            class="w-full border-gray-300 rounded-md shadow-md"
          />

          <div
            v-if="showModal"
            class="
              flex flex-wrap
              items-center
              justify-center
              bg-white
              my-7
              products
            "
          >
            <div
              v-for="p in allProducts"
              :key="p.id"
              class="
                relative
                m-1
                bg-white
                border-2 border-gray-300
                h-36
                group
                w-36
                hover:border-blue-500
              "
              @click="
                live.products.push(p)
                showModal = false
              "
            >
              <img v-lazy="p.img" alt="" class="w-32 h-32 mx-auto" />
              <div class="absolute bottom-0 w-full">
                <p class="m-1 text-xs text-center">
                  {{ p.name }}
                </p>
              </div>
              <div
                class="
                  absolute
                  inset-0
                  z-10
                  hidden
                  bg-gray-900
                  cursor-default
                  transitionstyle
                  margin
                  group-hover:block
                  bg-opacity-60
                "
              >
                <!-- v-if="showDeleteBtnIndex == null"
                  @click="deleteImage(i)" -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="
                    w-6
                    h-6
                    m-1
                    ml-auto
                    text-gray-100
                    transform
                    cursor-pointer
                    hover:scale-95
                  "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p
                  class="
                    mt-8
                    text-sm
                    font-semibold
                    text-center text-gray-100
                    transform
                    cursor-pointer
                    hover:scale-95
                  "
                >
                  Click to add
                </p>
                <nuxt-link to="/go-live">
                  <p
                    class="
                      mt-8
                      text-sm
                      font-semibold
                      text-center text-gray-100
                      transform
                      cursor-pointer
                      hover:scale-95
                    "
                  >
                    View
                  </p>
                </nuxt-link>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div class="w-full mt-20 mb-auto lg:mt-0 lg:w-1/2 lg:pl-2 lg:pr-4">
        <div
          class="
            h-full
            p-2
            pb-10
            bg-gray-300
            rounded-lg
            md:pt-5
            xl:pt-10
            xl:pb-20
          "
        >
          <div
            class="flex items-center justify-center m-2 space-x-2 md:space-x-5"
          >
            <button
              type="button"
              @click="publish($route.params.id)"
              class="
                flex
                items-center
                justify-center
                w-32
                py-1
                font-semibold
                tracking-wide
                transition
                duration-300
                bg-white
                rounded-md
                shadow-md
                focus:ring-2
                hover:shadow
                focus:outline-none
                focus:ring-red-500
              "
            >
              <img src="/youtube-live.png" class="block md:hidden" />
              <img src="/youtube-live.png" class="hidden md:block" />
              <span class="ml-2 text-sm md:text-base">Publish</span>
            </button>
            <button
              @click="stop"
              class="
                flex
                items-center
                justify-center
                w-32
                py-1
                font-semibold
                tracking-wide
                transition
                duration-300
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
            >
              <img src="/stop-circled.png" class="block md:hidden" />
              <img src="/stop-circled.png" class="hidden md:block" />
              <span class="ml-2 text-sm md:text-base">Stop</span>
            </button>
            <button
              type="button"
              @click="leave"
              class="
                flex
                items-center
                justify-center
                w-32
                py-1
                font-semibold
                tracking-wide
                transition
                duration-300
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
            >
              <img src="/cross-mark-emoji.png" class="block md:hidden" />
              <img src="/cross-mark-emoji.png" class="hidden md:block" />
              <span class="ml-2 text-sm md:text-base">Destroy</span>
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
            class="flex items-center mx-auto my-2 space-x-2 text-xs max-w-max"
          >
            <div class="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span>00:00:00</span>
          </div>
        </div>
        <div class="bg-red-100">
          <video
            autoplay
            muted
            v-for="vd in useLocalStreamList"
            :srcObject.prop="vd.stream"
            width="500"
            height="500"
          />
        </div>
      </div>
    </form>
  </section>
</template>
<script>
import { Modal } from '~/shared/components/ui'
import ImageDropbox from '~/components/Products/ImageDropbox.vue'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton'
import moment from 'moment'
import { mapMutations } from 'vuex'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import TextboxFloating from '~/components/ui/TextboxFloating'
// import Textbox from '~/components/ui/Textbox'
import { Button } from '~/shared/components/ui'
import CHANNEL from '~/gql/channel/channel.gql'
import SAVE_CHANNEL from '~/gql/channel/saveChannel.gql'
import PRODUCTS from '~/gql/product/products.gql'
import zego from '~/shared/mixins/zego'
import ZEGO from '~/gql/channel/zego.gql'
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
    ImageDropbox,
    GrnIndGradiantButton,
    VueCtkDateTimePicker,
    TextboxFloating,
    // Textbox,
    Button,
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      busy: 'busy',
    }),

    async login(roomId) {
      const zg = this.zg

      await zg.loginRoom(
        roomId,
        this.zego.token,
        { userID: this.zego.userID, userName: this.zego.userName },
        { userUpdate: true }
      )
    },

    async enterRoom(roomId, token) {
      const zg = this.zg
      if (!roomId) {
        alert('roomId is empty')
        return false
      }

      for (let i = 0; i < this.useLocalStreamList.length; i++) {
        this.useLocalStreamList[i].streamID &&
          zg.stopPlayingStream(this.useLocalStreamList[i].streamID)
      }

      this.listenForEvents()
      return (this.loginRoom = await this.login(roomId, token))
    },
    removeProductFromList(index) {
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', id)
      // console.log(this.live, 'live')
      // var val = this.live.products.find((p)=>{
      //   console.log(p.id)
      //  return p.id != id
      // })

      // console.log(val)
      // this.live.products.pull(p.id)
      this.live.products.splice(index, 1)
      this.submit()
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
            mutation: SAVE_CHANNEL,
            variables: {
              id,
              title: this.live.title,
              img: this.live.img,
              scheduleDateTime: this.live.scheduleDateTime,
              products,
            },
          })
        ).data.saveChannel
        if (id == 'new' || !id || id == undefined || id == 'undefined')
          this.$router.push(`/go-live/${live.id}`)
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
                query: CHANNEL,
                variables: { id },
                fetchPolicy: 'no-cache',
              })
            ).data.channel || {}
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
  async mounted() {
    const zego = (this.zego =
      (
        await this.$apollo.query({
          query: ZEGO,
        })
      ).data.zego || {})

    this.live =
      (
        await this.$apollo.query({
          query: CHANNEL,
          variables: { id: this.$route.params.id },
          fetchPolicy: 'no-cache',
        })
      ).data.channel || {}
    const ZegoExpressEngine =
      require('zego-express-engine-webrtc').ZegoExpressEngine
    const zg = (this.zg = new ZegoExpressEngine(zego.appID, zego.server))
    zg.setLogConfig({
      logLevel: 'error',
      remoteLogLevel: 'info',
      logURL: '',
    })

    zg.setDebugVerbose(false)
    zg.setSoundLevelDelegate(true, 3000)

    let loginSuc = false
    try {
      loginSuc = await this.enterRoom(this.$route.params.id, zego.token)
      // loginSuc && (await this.publish());
    } catch (error) {
      console.error('Enter Room...', error)
    }
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
