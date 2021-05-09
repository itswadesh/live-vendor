<template>
  <div class="bg-red-100">
    <button @click="publish" class="px-4 py-2 bg-green-500">Publish</button>
    {{ streamList }}
    <video
      autoplay
      muted
      v-for="vd in streamList"
      :src="vd.stream"
      width="500"
      height="500"
    />;
  </div>
</template>

<script>
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
const appID = 3268197896,
  server = "wss://webliveroom-hk-test.zegocloud.com/ws",
  roomID = "misiki",
  token = `eyJ2ZXIiOjEsImhhc2giOiI2YjNlNDBhNjgxMWM0N2E1N2MwYTQ0YmE4ZDkzOTlhMyIsIm5vbmNlIjoiOTJiZDE2MjM3MmE4OTUzMGE3MTFhNTljY2MyMGMzZDUiLCJleHBpcmVkIjoxNjIzMTM4NTYzfQ==`,
  userID = "2lessons@gmail.com",
  userName = "itswadesh";
export default {
  data() {
    return {
      streamList: [],
      zg: null
    };
  },
  methods: {
    async publish() {
      // create the stream
      const localStream = await this.zg.createStream();
      console.error("zzzzzzzzzzzzzzzzzzzzzzzzzzz", localStream);
      // stream is a MediaStream object. Start rendering local preview by assigning stream to the srcObject property of the localVideo object.
      // localVideo.srcObject = localStream;
      const streamID = "misiki";
      // localStream is the MediaStream object obtained in the previous step when the stream is created
      await this.zg.startPublishingStream(streamID, localStream);
      const playOption = {};
      playOption["resourceMode"] = 2;
      const stream = await this.zg.startPlayingStream(streamID, playOption);
      this.streamList.push(stream);
    }
  },
  async mounted() {
    const zg = (this.zg = new ZegoExpressEngine(appID, server));

    const result = await zg.loginRoom(roomID, token, { userID, userName });
    // start publishing streams

    zg.on("publisherStateUpdate", result => {
      console.error("publisherStateUpdate");
      //handle stream publishing status update
    });

    zg.on("publishQualityUpdate", (streamID, stats) => {
      //   console.error("publishQualityUpdate");
      //handle stream publishing quality update
    });
    zg.on("playerStateUpdate", result => {
      console.error("playerStateUpdate");
      //Handle stream playing status update
    });
  }
};
</script>

<style></style>
