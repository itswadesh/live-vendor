<template>
  <div>
    <button @click="publish" class="px-4 py-2 bg-green-500">Publish</button>
    <div id="ELEMENT_ID_IN_DOM" ref="vdi" class="w-64 h-64">Video Player</div>
    <div class="agora-title-box">
      <div class="agora-title">Broadcast Video</div>
    </div>
    <div class="agora-box">
      <button color="red" @click="leave" class="px-4 py-2 bg-green-500">
        leave
      </button>
    </div>
    <div v-if="localStream">
      {{ localStream.getId() }}
      <StreamPlayer
        class="w-64 h-64 bg-red-100"
        :stream="localStream"
        :domId="localStream.getId()"
        v-if="localStream"
      ></StreamPlayer>
    </div>
  </div>
</template>

<script>
import StreamPlayer from "~/components/stream-player";
import AgoraRTC from "agora-rtc-sdk-ng";
import RTCClient from "./agora-rtc-client";

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const appid = "9cdb1318777a4cc1886aa4c947901430";
const token = `0069cdb1318777a4cc1886aa4c947901430IABwSzknS+aTKwyJjWHd7RZGhwKH+YmfZV4PwS/bUetzllY8YR0AAAAAEAALtir+KS6YYAEAAQApLphg`; //rtcTokenObject.token
const channel = "misiki"; //rtcTokenObject.channel

export default {
  methods: {
    async publish() {
      this.localStream = await this.rtc.joinChannel(client);
      // await this.rtc.publishStream(client);
    },
    async subscribe() {},
    async join() {},
    async leave() {
      // for (let trackName in this.localTracks) {
      //   var track = this.localTracks[trackName];
      //   if (track) {
      //     track.stop();
      //     track.close();
      //     this.localTracks[trackName] = undefined;
      //   }
      // }
      // this.remoteUsers = {};
      await this.rtc.leaveChannel();
    }
  },
  async created() {
    this.rtc = new RTCClient({ mode: "live", codec: "vp8" });
    let rtc = this.rtc;
    client.on("user-published", async (remoteUser, mediaType) => {
      console.error("publishedzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    });
    // this.rtc.clientListener();
    // console.log(
    //   "zzzzzzzzzzzzzzzzzzzzzzzzzzz",
    //   this.$refs["vdi"],
    //   document.querySelector("#ELEMENT_ID_IN_DOM")
    // );
    // client.on("user-published", async user => {
    //   console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz");
    //   await client.subscribe(user);
    //   user.audioTrack.play();
    //   user.videoTrack.play(this.$refs["vdi"]);
    // });
  },
  components: {
    StreamPlayer
  },
  data() {
    return {
      localStream: null,
      disableJoin: false
    };
  }
};
</script>

<style></style>
