<template>
  <div>
    <video
      id="videoElement"
      controls
      autoplay
      muted
      width="1100px"
      height="600px"
    ></video>
    <!-- <button @click="play">Play</button> -->
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  data() {
    return {
      flvPlayer: null,
    }
  },
  props: {
    src: { type: String, default: '' },
  },
  mounted() {
    if (flvjs.isSupported() && process.client) {
      const videoElement = document.getElementById('videoElement')
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        url: this.src,
      })
      this.flvPlayer.attachMediaElement(videoElement)
      this.flvPlayer.load()
      this.flvPlayer.play()
    }
  },
  methods: {
    play() {
      this.flvPlayer.play()
    },
  },
}
</script>
