<template>
  <div class="wrapper">
    <div class="content">
      <!--画面div-->
      <div class="main-window" ref="large"></div>
      <!--小画面div-->
      <div class="sub-window" ref="small">
        <span class="loading-text" v-show="isDesc">{{ desc }}</span>
      </div>
    </div>
    <!--底层栏-->
    <ul class="tab-bar">
      <li
        :class="{ silence: true, isSilence }"
        @click="setOrRelieveSilence"
      ></li>
      <li class="over" @click="handleOver"></li>
      <li :class="{ stop: true, isStop }" @click="stopOrOpenVideo"></li>
    </ul>
  </div>
</template>
<script>
import * as WebRTC2 from '~/assets/js/netease/NIM_Web_WebRTC2_v4.0.1.js'
// import * as WebRTC2 from './sdk/NIM_Web_WebRTC2_v4.0.1.js'
// import config from './config'
// import { getToken } from './common'
import NETEASE_TOKEN from '~/gql/liveStream/neteaseToken.gql'

export default {
  name: 'single',
  data() {
    return {
      isSilence: false,
      isDesc: true,
      isStop: false,
      desc: 'Waiting for the other party to enter...',
      client: null,
      // localUid: Math.ceil(Math.random() * 1e5),
      localStream: null,
      remoteStream: null,
    }
  },
  async mounted() {
    // 初始化音视频实例
    console.warn('Initialize audio and video')
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
      if (this.remoteStream.getId() === evt.uid) {
        this.remoteStream = null
        this.isDesc = true
        this.desc = 'The other party left the room'
        console.log(this.desc)
      }
    })

    this.client.on('stream-added', (evt) => {
      var remoteStream = evt.stream
      console.warn(
        'Receive a subscription message published by the other party: ',
        remoteStream.getId()
      )

      if (
        this.remoteStream &&
        this.remoteStream.getId() !== remoteStream.getId()
      ) {
        console.warn('The third person in the room joins, ignore')
        return
      } else {
        this.remoteStream = remoteStream
      }
      this.subscribe(remoteStream)
    })

    this.client.on('stream-removed', (evt) => {
      var remoteStream = evt.stream
      console.warn('The other party stops subscribing: ', remoteStream.getId())
      remoteStream.stop()
    })

    this.client.on('stream-subscribed', (evt) => {
      console.warn('Received the opposite stream, ready to play')
      const remoteStream = evt.stream
      //用于播放对方视频画面的div节点
      this.isDesc = false
      const div = this.$refs.small
      remoteStream
        .play(div)
        .then(() => {
          console.warn('Play video')
          remoteStream.setRemoteRenderMode({
            // 设置视频窗口大小
            width: 160,
            height: 90,
            cut: false, // 是否裁剪
          })
        })
        .catch((err) => {
          console.warn("Failed to play the other party's video:", err)
        })
    })

    // this.getToken()
    //   .then((token) => {
    //     this.joinChannel(token)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //     console.error(e)
    //   })
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
    // getToken() {
    //   return getToken({
    //     uid: this.localUid,
    //     appkey: config.appkey,
    //     appSecret: config.appSecret,
    //     channelName: this.$route.query.channelName,
    //   }).then(
    //     (token) => {
    //       return token
    //     },
    //     (e) => {
    //       throw e
    //     }
    //   )
    // },
    returnJoin(time = 2000) {
      console.log('returnJoin.........')
      // setTimeout(() => {
      //   this.$router.push({
      //     path: '/',
      //   })
      // }, time)
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
          this.initLocalStream(uid)
        })
        .catch((error) => {
          console.error('Failed to join the room：', error)
          console.log(
            `${error}: Please check if the appkey or token is correct`
          )
          this.returnJoin()
        })
    },
    initLocalStream(uid) {
      //初始化本地的Stream实例，用于管理本端的音视频流
      this.localStream = WebRTC2.createStream({
        uid,
        audio: true, //是否启动mic
        video: true, //是否启动camera
        screen: false, //是否启动屏幕共享
      })

      //设置本地视频质量
      this.localStream.setVideoProfile({
        resolution: WebRTC2.VIDEO_QUALITY_720p, //设置视频分辨率
        frameRate: WebRTC2.CHAT_VIDEO_FRAME_RATE_15, //设置视频帧率
      })
      //设置本地音频质量
      this.localStream.setAudioProfile('speech_low_quality')
      //启动媒体，打开实例对象中设置的媒体设备
      this.localStream
        .init()
        .then(() => {
          console.warn(
            'The audio and video have been turned on and can be played'
          )
          const div = self.$refs.large
          this.localStream.play(div)
          this.localStream.setLocalRenderMode({
            // 设置视频窗口大小
            width: div.clientWidth,
            height: div.clientHeight,
            cut: true, // 是否裁剪
          })
          // 发布
          this.publish()
        })
        .catch((err) => {
          console.warn('Audio and video initialization failed: ', err)
          console.log('Audio and video initialization failed')
          this.localStream = null
        })
    },
    publish() {
      console.warn('Start publishing video stream')
      //发布本地媒体给房间对端
      this.client
        .publish(this.localStream)
        .then(() => {
          console.warn('Local publish successfully')
        })
        .catch((err) => {
          console.error('Local publish failed: ', err)
          console.log('Local publish failed')
        })
    },
    subscribe() {
      this.remoteStream.setSubscribeConfig({
        audio: true,
        video: true,
      })
      this.client
        .subscribe(this.remoteStream)
        .then(() => {
          console.warn('Local subscribe succeeded')
        })
        .catch((err) => {
          console.warn('Local subscribe failed: ', err)
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
            console.warn('Turn off the camera sucess')
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
            console.warn('Turn on the camera sucess')
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

<style scoped lang="less">
.wrapper {
  height: 100vh;
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
  position: absolute;
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
