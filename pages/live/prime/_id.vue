<template>
  <section class="text-gray-800">
    <div class="pt-10 text-3xl font-bold text-center text-green-500">
      Prime Video Call
    </div>
    <div v-if="live">
      <div
        v-for="p in live.products"
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
              hover:scale-105
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
          <p class="mt-8 text-sm font-semibold text-center text-gray-100">
            Click to add
          </p>
          <nuxt-link to="/live">
            <p
              class="
                mt-8
                text-sm
                font-semibold
                text-center text-gray-100
                transform
                cursor-pointer
                hover:scale-105
              "
            >
              View
            </p>
          </nuxt-link>
        </div>
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
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
            >
              <img src="/youtube-live.png" />
              <span class="ml-2">Publish</span>
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
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
            >
              <img src="/stop-circled.png" />
              <span class="ml-2">Stop</span>
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
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
            >
              <img src="/cross-mark-emoji.png" />
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
import { mapMutations } from 'vuex'
import { Button } from '~/shared/components/ui'
import zego from '~/shared/mixins/zego'
import ZEGO from '~/gql/channel/zego.gql'

export default {
  middleware: ['isAuth'],
  data() {
    return {
      q: '',
      allProducts: [],
      streamList: [],
      useLocalStreamList: [],
      zg: null,
      loginRoom: false,
      live: null,
    }
  },
  mixins: [zego],

  components: {
    Button,
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      busy: 'busy',
    }),

    async enterRoom(roomId, token) {
      const zg = this.zg
      if (!roomId) {
        alert('roomId is empty')
        return false
      }
      for (let i = 0; i < this.streamList.length; i++) {
        this.streamList[i].streamID &&
          zg.stopPlayingStream(this.streamList[i].streamID)
      }

      this.listenForEvents()
      return (this.loginRoom = await this.login(roomId, token))
    },
    async login(roomId, token) {
      const userID = this.zego.userID //'2lessons@gmail.com'
      const userName = this.zego.userName // 'itswadesh'
      return await this.zg.loginRoom(
        roomId,
        token,
        { userID, userName },
        { userUpdate: true }
      )
    },

    listenForEvents() {
      const zg = this.zg
      zg.on(
        'roomStreamUpdate',
        async (roomID, updateType, streamList, extendedData) => {
          console.error(
            'roomStreamUpdate 1 roomID ',
            roomID,
            streamList,
            extendedData
          )
          if (updateType == 'ADD') {
            for (let i = 0; i < streamList.length; i++) {
              console.info(streamList[i].streamID + ' was added')
              let remoteStream
              let playOption
              zg.startPlayingStream(streamList[i].streamID, playOption)
                .then((stream) => {
                  remoteStream = stream
                  this.useLocalStreamList.push({ stream: remoteStream })
                })
                .catch((err) => {
                  console.error('err', err)
                })
            }
          } else if (updateType == 'DELETE') {
            for (let k = 0; k < this.useLocalStreamList.length; k++) {
              for (let j = 0; j < streamList.length; j++) {
                if (
                  this.useLocalStreamList[k].streamID === streamList[j].streamID
                ) {
                  try {
                    zg.stopPlayingStream(this.useLocalStreamList[k].streamID)
                  } catch (error) {
                    console.error(error)
                  }

                  console.info(
                    this.useLocalStreamList[k].streamID + 'was devared'
                  )

                  // $(".remoteVideo video:eq(" + k + ")").remove();
                  this.useLocalStreamList.splice(k--, 1)
                  break
                }
              }
            }
          }
        }
      )
    },
  },
  async mounted() {
    const zego = (this.zego =
      (
        await this.$apollo.query({
          query: ZEGO,
        })
      ).data.zego || {})

    // this.live =
    //   (
    //     await this.$apollo.query({
    //       query: CHANNEL,
    //       variables: { id: this.$route.params.id },
    //       fetchPolicy: 'no-cache',
    //     })
    //   ).data.channel || {}
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
