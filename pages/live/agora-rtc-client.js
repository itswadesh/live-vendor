import AgoraRTC from "agora-rtc-sdk-ng";
import EventEmitter from "events";

export default class RTCClient {
  constructor() {
    // Options for joining a channel
    this.option = {
      appId: "",
      channel: "",
      uid: "",
      token: ""
    };
    this.client = null;
    this.localStream = null;
    this.remoteremoteUsers = [];
    this._eventBus = new EventEmitter();
  }

  // PUBLISH STREAM IS USED FOR ON LOCAL CAMERA AND ,MAKE IT PUBLISH
  async publishStream(client) {
    // const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    // const client = this.client;

    // Use the Web SDK 4.x
    const localAudio = await AgoraRTC.createMicrophoneAudioTrack();
    const localVideo = await AgoraRTC.createCameraVideoTrack();
    // console.log("create local audio/video track success..............");
    try {
      // Remove this line if the channel profile is not live broadcast.
      // await this.clientListener(client);
      await client.setClientRole("host");
      this.localStream = await client.publish([localAudio, localVideo]);
      // console.log(
      //   "publish success..zzzzzzzzzzzzzzzzzzzzz................",
      //   this.localStream
      // );
      return this.localStream;
    } catch (e) {
      console.log("publish failed", e);
    }
    // localVideo.play(document.body);
  }

  clientListener(client) {
    //  const client = this.client;
    // Use the Web SDK 4.x
    client.on("user-published", async (remoteUser, mediaType) => {
      console.error("publishedzzzzzzzzzzzzzzzzzzzzzzzzzzz");
      const uid = remoteUser.uid;
      this.remoteremoteUsers[uid] = remoteUser;
      await client.subscribe(remoteUser, mediaType);
      if (mediaType === "video") {
        console.log("subscribe video success");
        const player = $(`
      <div id="player-wrapper-${uid}">
        <p class="player-name">remoteUser(${uid})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
        $("#remote-playerlist").append(player);
      }
      if (mediaType === "audio") {
        console.log("subscribe audio success");
        remoteUser.audioTrack.play();
      }
    });
    client.on("user-unpublished", async user => {
      console.log("unnnnnpublishedzzzzzzzzzzzzzzzzzzzzzzzzzzz", user);
      // const id = user.uid;
      // delete this.remoteUsers[id];
      // $(`#player-wrapper-${id}`).remove();
    });
  }

  on(eventName, callback) {
    this._eventBus.on(eventName, callback);
  }

  async leaveChannel() {
    const client = this.client;
    await client.unpublish();
    await client.leave();
  }

  async joinChannel(client) {
    // const client = this.client;

    // Use the Web SDK 4.x
    // const client = (this.client = AgoraRTC.createClient({
    //   mode: "live",
    //   codec: "vp8"
    // }));

    try {
      const uid = await client.join(
        "9cdb1318777a4cc1886aa4c947901430",
        "misiki",
        "0069cdb1318777a4cc1886aa4c947901430IABwSzknS+aTKwyJjWHd7RZGhwKH+YmfZV4PwS/bUetzllY8YR0AAAAAEAALtir+KS6YYAEAAQApLphg",
        null
      );
      console.error("join success.............", uid);
      await this.publishStream(client);
    } catch (e) {
      console.log("join failed", e);
    }
  }
}
