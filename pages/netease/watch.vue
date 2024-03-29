<template>
  <div class="wrapper">
    <div class="content">
      <div class="w-full" ref="large">
        <template v-if="remoteStreams.length">
          <div
            v-for="item in remoteStreams"
            :key="item.getId()"
            ref="small"
            :data-uid="item.getId()"
          ></div>
        </template>
        <div v-else class="sub-window" ref="small">
          <span class="loading-text">Waiting for the other party to join</span>
        </div>
      </div>
      <div class="sub-window-wrapper text-white" v-if="channel">
        <h2>{{ channel.title }}</h2>
      </div>
    </div>
    <ul class="tab-bar">
      <li
        :class="{ silence: true, isSilence }"
        @click="setOrRelieveSilence"
      ></li>
      <li class="over" @click="handleOver"></li>
      <li :class="{ stop: true, isStop }" @click="stopOrOpenVideo"></li>
    </ul>
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
          <nuxt-link to="/live">
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
        </a>
      </div>
    </div>
    <Chats
      :channel="$route.query.channelName"
      class="fixed bottom-0 left-0 mb-16 ml-2"
    />
  </div>
</template>
<script>
import * as WebRTC2 from '~/assets/js/netease/NIM_Web_WebRTC2_v4.0.1.js'
import NETEASE_TOKEN from '~/gql/channel/neteaseToken.gql'
import CHANNEL from '~/gql/channel/channel.gql'
import Chats from '~/components/Chats.vue'
import { REFERRER_URL } from '~/config'

export default {
  middleware: ['isAuth'],
  components: { Chats },
  data() {
    return {
      isSilence: false,
      isStop: false,
      client: null,
      //   localUid: Math.ceil(Math.random() * 1e5),
      localStream: null,
      remoteStreams: [],
      max: 20,
      channel: null,
      REFERRER_URL,
    }
  },
  async created() {
    try {
      this.channel = (
        await this.$apollo.query({
          query: CHANNEL,
          variables: { id: this.$route.query.channelName },
          fetchPolicy: 'no-cache',
        })
      ).data.channel
    } catch (e) {
      console.log('channel ERR::: ', e.toString())
    }
  },
  async mounted() {
    // 初始化音视频实例
    console.warn('Initialize audio and video sdk')
    const { appkey, uid, token } = (
      await this.$apollo.query({
        query: NETEASE_TOKEN,
        variables: { channel: this.$route.query.channelName },
        fetchPolicy: 'no-cache',
      })
    ).data.neteaseToken
    window.self = this
    this.client = WebRTC2.createClient({
      appkey,
      debug: true,
    })
    this.joinChannel(token, uid)
    //监听事件
    this.client.on('peer-online', (evt) => {
      console.warn(`${evt.uid} Join room`)
    })

    this.client.on('peer-leave', (evt) => {
      console.warn(`${evt.uid} Leave the room`)
      this.remoteStreams = this.remoteStreams.filter(
        (item) => !!item.getId() && item.getId() !== evt.uid
      )
    })

    this.client.on('stream-added', async (evt) => {
      const stream = evt.stream
      const userId = stream.getId()
      if (this.remoteStreams.some((item) => item.getId() === userId)) {
        console.warn(
          'Received a subscribed remote publication and needs to be updated',
          stream
        )
        this.remoteStreams = this.remoteStreams.map((item) =>
          item.getId() === userId ? stream : item
        )
        await this.subscribe(stream)
      } else if (this.remoteStreams.length < this.max - 1) {
        console.warn('Receive new remote publish message', stream)
        this.remoteStreams = this.remoteStreams.concat(stream)
        await this.subscribe(stream)
      } else {
        console.warn('The room is full')
      }
    })

    this.client.on('stream-removed', (evt) => {
      const stream = evt.stream
      const userId = stream.getId()
      stream.stop()
      this.remoteStreams = this.remoteStreams.map((item) =>
        item.getId() === userId ? stream : item
      )
      console.warn(
        'The remote stream stops subscribing and needs to be updated',
        userId,
        stream
      )
    })

    this.client.on('stream-subscribed', (evt) => {
      console.warn('Received the opposite stream, ready to play')
      const remoteStream = evt.stream
      //用于播放对方视频画面的div节点
      const div = this.$refs.large

      // const div = [...this.$refs.large].find(
      //   (item) => Number(item.dataset.uid) === Number(remoteStream.getId())
      // )
      remoteStream
        .play(div)
        .then(() => {
          console.warn('Play video')
          remoteStream.setRemoteRenderMode({
            // 设置视频窗口大小
            width: div.clientWidth,
            height: div.clientHeight,
            cut: false, // 是否裁剪
          })
        })
        .catch((err) => {
          console.warn("Failed to play the other party's video: ", err)
        })
    })
  },
  destroyed() {
    try {
      this.localStream.destroy()
      WebRTC2.destroy()
    } catch (e) {
      // 为了兼容低版本，用try catch包裹一下
    }
  },
  methods: {
    returnJoin(time = 2000) {
      console.log('returnJoin.........')
    },
    joinChannel(token, uid) {
      if (!this.client) {
        console.log('Internal error, please rejoin the room')
        return
      }
      console.info('Start joining the room: ', this.$route.query.channelName)
      this.client
        .join({
          channelName: this.$route.query.channelName,
          uid,
          token,
        })
        .then((data) => {
          console.info(
            'Join the room successfully, start to initialize the local audio and video stream'
          )
          // this.initLocalStream(uid)
        })
        .catch((error) => {
          console.error('Failed to join the room', error)
          console.log(
            `${error}: Please check if the appkey or token is correct`
          )
          this.returnJoin()
        })
    },
    // initLocalStream(uid) {
    //   //初始化本地的Stream实例，用于管理本端的音视频流
    //   this.localStream = WebRTC2.createStream({
    //     uid,
    //     audio: true, //是否启动mic
    //     video: true, //是否启动camera
    //     screen: false, //是否启动屏幕共享
    //   })

    //   //设置本地视频质量
    //   this.localStream.setVideoProfile({
    //     resolution: WebRTC2.VIDEO_QUALITY_720p, //设置视频分辨率
    //     frameRate: WebRTC2.CHAT_VIDEO_FRAME_RATE_15, //设置视频帧率
    //   })
    //   //设置本地音频质量
    //   this.localStream.setAudioProfile('speech_low_quality')
    //   //启动媒体，打开实例对象中设置的媒体设备
    //   this.localStream
    //     .init()
    //     .then(() => {
    //       console.warn('音视频开启完成，可以播放了')
    //       const div = self.$refs.large
    //       this.localStream.play(div)
    //       this.localStream.setLocalRenderMode({
    //         // 设置视频窗口大小
    //         width: div.clientWidth,
    //         height: div.clientHeight,
    //         cut: true, // 是否裁剪
    //       })
    //       // 发布
    //       this.publish()
    //     })
    //     .catch((err) => {
    //       console.warn('音视频初始化失败: ', err)
    //       console.log('音视频初始化失败')
    //       this.localStream = null
    //     })
    // },
    // publish() {
    //   console.warn('开始发布视频流')
    //   //发布本地媒体给房间对端
    //   this.client
    //     .publish(this.localStream)
    //     .then(() => {
    //       console.warn('本地 publish 成功')
    //     })
    //     .catch((err) => {
    //       console.error('本地 publish 失败: ', err)
    //       console.log('本地 publish 失败')
    //     })
    // },
    subscribe(remoteStream) {
      remoteStream.setSubscribeConfig({
        audio: true,
        video: true,
      })
      this.client
        .subscribe(remoteStream)
        .then(() => {
          console.warn('Local subscribe succeeded')
        })
        .catch((err) => {
          console.warn('Local subscribe fails: ', err)
          console.log("Failed to subscribe to the other party's stream")
        })
    },
    setOrRelieveSilence() {
      const { isSilence } = this
      this.isSilence = !isSilence
      if (this.isSilence) {
        console.warn('Close mic')
        this.localStream
          .close({
            type: 'audio',
          })
          .then(() => {
            console.warn('Close mic success')
          })
          .catch((err) => {
            console.warn('Failed to close mic: ', err)
            console.log('Failed to close mic')
          })
      } else {
        console.warn('Open mic')
        if (!this.localStream) {
          console.log("Can't open mic currently")
          return
        }
        this.localStream
          .open({
            type: 'audio',
          })
          .then(() => {
            console.warn('Open mic success')
          })
          .catch((err) => {
            console.warn('Failed to open mic: ', err)
            console.log('Failed to open mic')
          })
      }
    },
    stopOrOpenVideo() {
      const { isStop } = this
      this.isStop = !isStop
      if (this.isStop) {
        console.warn('Turn off the camera')
        this.localStream
          .close({
            type: 'video',
          })
          .then(() => {
            console.warn('Close camera success')
          })
          .catch((err) => {
            console.warn('Failed to turn off the camera: ', err)
            console.log('Failed to turn off the camera')
          })
      } else {
        console.warn('Turn on the camera')
        if (!this.localStream) {
          console.log("Can't open camera currently")
          return
        }
        this.localStream
          .open({
            type: 'video',
          })
          .then(() => {
            console.warn('Open camera success')
            const div = self.$refs.large
            this.localStream.play(div)
            this.localStream.setLocalRenderMode({
              // 设置视频窗口大小
              width: div.clientWidth,
              height: div.clientHeight,
              cut: true, // 是否裁剪
            })
          })
          .catch((err) => {
            console.warn('Failed to open camera: ', err)
            console.log('Failed to open camera')
          })
      }
    },
    handleOver() {
      console.warn('Leave the room')
      this.client.leave()
      this.returnJoin(1)
    },
  },
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(179deg, #141417 0%, #181824 100%);
  display: flex;
  flex-direction: column;
}
.wrapper .content {
  flex: 1;
  display: flex;
  position: relative;
}
.wrapper .content .main-window {
  height: 100%;
  width: 67vh;
  margin: 0 auto;
  background: #25252d;
}
.wrapper .content .sub-window-wrapper {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 9;
  width: 165px;
}
.wrapper .content .sub-window {
  background: #25252d;
  border: 1px solid #ffffff;
  margin-bottom: 20px;
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
