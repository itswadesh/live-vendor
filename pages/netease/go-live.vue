<template>
  <div class="wrapper">
    <div class="content">
      <div class="main-window" ref="large"></div>
      <div class="absolute top-1 right-1">
        <template v-if="remoteStreams.length">
          <div
            v-for="item in remoteStreams"
            :key="item.getId()"
            class="sub-window"
            ref="small"
            :data-uid="item.getId()"
          ></div>
        </template>
        <!-- <div v-else class="sub-window" ref="small">
          <span class="loading-text">Waiting for others to join</span>
        </div> -->
      </div>
    </div>

    <!-- <div title="Configure push">
      <button @click="togglePushStats" class="text-white">
        {{ isPushing ? 'Stop streaming' : 'Start streaming' }}
      </button>
    </div> -->
    <div class="" v-if="channel">
      <h2>{{ channel.title }}</h2>
      <div
        class="
          flex flex-wrap
          items-center
          justify-center
          bg-white
          my-7
          products
        "
      >
        <a
          :href="`${REFERRER_URL}/${p.slug}?id=${p.id}`"
          target="_blank"
          v-for="p in channel.products"
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
          <img v-lazy="p.img" alt="" class="h-full w-full object-cover" />
          <div class="absolute bottom-0 w-full">
            <p
              class="
                text-xs text-black
                h-10
                m-1
                flex
                frosted
                text-center
                justify-center
                items-center
                px-1
              "
            >
              {{ p.name }}
            </p>
          </div>
        </a>
      </div>
    </div>
    <ul class="tab-bar">
      <li class="over" @click="handleOver"></li>
      <!-- <li class="stop" @click="handleOver"></li> -->
      <!-- <li class="silence" @click="handleOver"></li> -->
    </ul>
    <!-- <Chats
      :channel="$route.query.channelName"
      class="fixed bottom-0 left-0 mb-16 ml-2"
    /> -->
  </div>
</template>
<script>
import NETEASE_TOKEN from '~/gql/channel/neteaseToken.gql'
import CHANNEL from '~/gql/channel/channel.gql'
import PUSH_TO_NETEASE_CDN from '~/gql/channel/pushToNeteaseCDN.gql'
import Chats from '~/components/Chats.vue'
import { REFERRER_URL } from '~/config'
import netease from '~/mixins/netease'
const task = {
  taskId: Math.random().toString(36).slice(-8),
  streamUrl: '',
  record: true,
  layout: {
    canvas: {
      width: 1280,
      height: 720,
      color: 16777215,
    },
    users: [],
  },
}
export default {
  middleware: ['isAuth'],
  mixins: [netease],
  data() {
    return {
      REFERRER_URL,
      rtmpTasks: [],
    }
  },
  components: {
    Chats,
  },
  // async created() {
  //   try {
  //     this.channel = (
  //       await this.$apollo.query({
  //         query: CHANNEL,
  //         variables: { id: this.$route.query.channelName },
  //         fetchPolicy: 'no-cache',
  //       })
  //     ).data.channel
  //   } catch (e) {
  //     console.log('channel ERR::: ', e.toString())
  //   }
  // },
  async mounted() {
    try {
      // console.warn('Initialize audio and video')
      const { appkey, uid, token } = (
        await this.$apollo.query({
          query: NETEASE_TOKEN,
          variables: { channel: this.$route.query.channelName },
          fetchPolicy: 'no-cache',
        })
      ).data.neteaseToken
      window.self = this

      this.channel = (
        await this.$apollo.query({
          query: CHANNEL,
          variables: { id: this.$route.query.channelName },
          fetchPolicy: 'no-cache',
        })
      ).data.channel
      if (!this.channel) return
      const { pushUrl } = this.channel
      task.streamUrl = pushUrl
      this.rtmpTasks = [task]
      // Step-1 is getting the token
      await this.createClient(appkey) // Step-2
      this.setLiveMode() // Step-4  Extra step for CDN
      await this.joinChannel(token, uid, this.$route.query.channelName, true) // Step-5
      await this.initLocalStream(uid) // Step-3A
      await this.publish() // Step-3(B)
      await this.subscribeToStreams()
      // this.addTasks(this.rtmpTasks)
      await this.addRtmpTask(uid) // Extra step for CDN
      await this.togglePushStats()
      // const pushToNeteaseCDN = (
      //   await this.$apollo.query({
      //     query: PUSH_TO_NETEASE_CDN,
      //     variables: { id: this.$route.query.channelName },
      //     fetchPolicy: 'no-cache',
      //   })
      // ).data.pushToNeteaseCDN
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', pushToNeteaseCDN)

      // this.addTasks(this.rtmpTasks) // Also called when togglePushState Clicked
      // console.log('11111111111111111111111')
      // this.client.on('rtmp-state', (data) => {
      //   console.warn('===== Interactive live broadcast status：', data)
      //   console.warn(
      //     `Interactive live streaming task：${data.task_id}，status：${data.state}`
      //   )
      //   if (data.state === 505) {
      //     console.warn(
      //       'The push task is in the process of pushing, and the status is normal'
      //     )
      //   } else if (data.state === 506) {
      //     console.warn('The push task failed to push the stream')
      //   } else if (data.state === 511) {
      //     console.warn('The push flow task is over')
      //   }
      // })
      // console.log('22222222222222222')
    } catch (e) {
      console.error('Mounting error::', e.toString())
    }
  },
}
</script>

<style scoped lang="less">
.wrapper {
  height: 92vh;
  background-image: linear-gradient(179deg, #141417 0%, #181824 100%);
  display: flex;
  flex-direction: column;
}
.wrapper .content {
  flex: 1;
  position: relative;
}
.wrapper .content .main-window {
  height: 100%;
  width: 67vh;
  margin: 0 auto;
  background: #25252d;
}
.wrapper .content .sub-window {
  width: 165px;
  height: 95px;
  background: #25252d;
  z-index: 9;
  right: 16px;
  top: 16px;
  border: 1px solid #ffffff;
}
.wrapper .content .sub-window .loading-text {
  display: block;
  width: 100%;
  text-align: center;
  line-height: 90px;
  font-size: 12px;
  color: #fff;
  font-weight: 400;
}
.wrapper .tab-bar {
  height: 54px;
  background-image: linear-gradient(180deg, #292933 7%, #212129 100%);
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.wrapper .tab-bar li {
  height: 54px;
  width: 125px;
  cursor: pointer;
}
.wrapper .tab-bar li.silence {
  background: url('/live-icons/silence.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence:hover {
  background: url('/live-icons/silence-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence:active {
  background: url('/live-icons/silence-click.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence.isSilence {
  background: url('/live-icons/relieve-silence.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence.isSilence:hover {
  background: url('/live-icons/relieve-silence-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence.isSilence:active {
  background: url('/live-icons/relieve-silence-click.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.over {
  background: url('/live-icons/over.png') no-repeat center;
  background-size: 68px 36px;
}
.wrapper .tab-bar li.over:hover {
  background: url('/live-icons/over-hover.png') no-repeat center;
  background-size: 68px 36px;
}
.wrapper .tab-bar li.over:active {
  background: url('/live-icons/over-click.png') no-repeat center;
  background-size: 68px 36px;
}
.wrapper .tab-bar li.stop {
  background: url('/live-icons/stop.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop:hover {
  background: url('/live-icons/stop-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop:active {
  background: url('/live-icons/stop-click.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop.isStop {
  background: url('/live-icons/open.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop.isStop:hover {
  background: url('/live-icons/open-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop.isStop:active {
  background: url('/live-icons/open-click.png') no-repeat center;
  background-size: 60px 54px;
}
</style>
