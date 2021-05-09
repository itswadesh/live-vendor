<template>
  <div class="bg-red-100">
    <button @click="play" class="px-4 py-2 bg-green-500">Play</button>

    <video
      autoplay
      muted
      v-for="vd in streamList"
      :srcObject.prop="vd.stream"
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
const streamID = "misiki";
export default {
  data() {
    return {
      streamList: [],
      zg: null,
      loginRoom: false
    };
  },
  methods: {
    async stop() {
      try {
        await this.zg.stopPublishingStream(streamID);
      } catch (e) {}
    },
    async destroy() {
      try {
        for (let s of this.streamList) {
          await this.zg.destroyStream(s.stream);
        }
      } catch (e) {
        console.log("destroy...........", e);
      }
    },
    async play() {
      const zg = this.zg;
      try {
        const streamID = "misiki";
        const playOption = {};
        // playOption["resourceMode"] = 2;
        const stream = await this.zg.startPlayingStream(streamID, playOption);
      } catch (e) {
        console.error("ERR::: ", e);
      }
    },

    async login(roomId) {
      return await this.zg.loginRoom(
        roomId,
        token,
        { userID, userName },
        { userUpdate: true }
      );
    },

    async enterRoom(roomId) {
      const zg = this.zg;
      if (!roomId) {
        alert("roomId is empty");
        return false;
      }
      for (let i = 0; i < this.streamList.length; i++) {
        console.log("111111111111111111111111", this.streamList[i].streamID);
        this.streamList[i].streamID &&
          zg.stopPlayingStream(this.streamList[i].streamID);
      }

      this.listenForEvents();
      return (this.loginRoom = await this.login(roomId));
    },

    listenForEvents() {
      const zg = this.zg;
      zg.on("roomStateUpdate", (roomID, state, errorCode, extendedData) => {
        console.log(
          "roomStateUpdate: ",
          roomID,
          state,
          errorCode,
          extendedData
        );
      });
      zg.on("roomUserUpdate", (roomID, updateType, userList) => {
        console.warn(
          `roomUserUpdate: room ${roomID}, user ${
            updateType === "ADD" ? "added" : "left"
          } `,
          JSON.stringify(userList)
        );
      });
      zg.on("publisherStateUpdate", result => {
        console.log("publisherStateUpdate: ", result.streamID, result.state);
        if (result.state == "PUBLISHING") {
          console.info(" publish  success " + result.streamID);
        } else if (result.state == "PUBLISH_REQUESTING") {
          console.info(" publish  retry");
        } else {
          if (result.errorCode == 0) {
            console.warn("publish stop " + result.errorCode);
          } else {
            console.error("publish error " + result.errorCode);
          }
          // const _msg = stateInfo.error.msg;
          // if (stateInfo.error.msg.indexOf ('server session closed, reason: ') > -1) {
          //         const code = stateInfo.error.msg.replace ('server session closed, reason: ', '');
          //         if (code === '21') {
          //                 _msg = '音频编解码不支持(opus)';
          //         } else if (code === '22') {
          //                 _msg = '视频编解码不支持(H264)'
          //         } else if (code === '20') {
          //                 _msg = 'sdp 解释错误';
          //         }
          // }
          // alert('推流失败,reason = ' + _msg);
        }
      });
      zg.on("playerStateUpdate", result => {
        console.log("playerStateUpdate", result.streamID, result.state);
        if (result.state == "PLAYING") {
          console.info(" play  success " + result.streamID);
          const browser = getBrowser();
          console.warn("browser", browser);
          if (browser === "Safari") {
            // const videos = $(".remoteVideo video");
            for (let i = 0; i < videos.length; i++) {
              videos[i].srcObject = videos[i].srcObject;
            }
          }
        } else if (result.state == "PLAY_REQUESTING") {
          console.info(" play  retry");
        } else {
          if (result.errorCode == 0) {
            console.warn("play stop " + result.errorCode);
          } else {
            console.error("play error " + result.errorCode);
          }

          // const _msg = stateInfo.error.msg;
          // if (stateInfo.error.msg.indexOf ('server session closed, reason: ') > -1) {
          //         const code = stateInfo.error.msg.replace ('server session closed, reason: ', '');
          //         if (code === '21') {
          //                 _msg = '音频编解码不支持(opus)';
          //         } else if (code === '22') {
          //                 _msg = '视频编解码不支持(H264)'
          //         } else if (code === '20') {
          //                 _msg = 'sdp 解释错误';
          //         }
          // }
          // alert('拉流失败,reason = ' + _msg);
        }
      });
      zg.on("streamExtraInfoUpdate", (roomID, streamList) => {
        console.warn(
          `streamExtraInfoUpdate: room ${roomID},  `,
          JSON.stringify(streamList)
        );
      });
      zg.on(
        "roomStreamUpdate",
        async (roomID, updateType, streamList, extendedData) => {
          console.error(
            "roomStreamUpdate 1 roomID ",
            roomID,
            streamList,
            extendedData
          );
          // let queue = []
          if (updateType == "ADD") {
            for (let i = 0; i < streamList.length; i++) {
              console.info(streamList[i].streamID + " was added");
              let remoteStream;
              let playOption;

              // if ($("#videoCodec").val())
              //   playOption.videoCodec = $("#videoCodec").val();
              if (l3 == true) playOption.resourceMode = 2;

              zg.startPlayingStream(streamList[i].streamID, playOption)
                .then(stream => {
                  remoteStream = stream;
                  useLocalStreamList.push(streamList[i]);
                  // let videoTemp = $(
                  //   `<video id=${streamList[i].streamID} autoplay muted playsinline controls></video>`
                  // );
                  //queue.push(videoTemp)
                  // $(".remoteVideo").append(videoTemp);
                  // const video = $(".remoteVideo video:last")[0];
                  console.warn("video", video, remoteStream);
                  video.srcObject = remoteStream;
                  video.muted = false;
                  // videoTemp = null;
                })
                .catch(err => {
                  console.error("err", err);
                });
            }
            // const inIphone = browser.versions.mobile && browser.versions.ios
            // const inSafari = browser.versions.webApp
            // const inWx = browser.versions.weixin
            // if(streamList.length > 1 && (inIphone || inSafari || inWx)) {
            //     const ac = zc.zegoWebRTC.ac;
            //     ac.resume();
            //     const gain = ac.createGain();

            //     while(queue.length) {
            //         let temp = queue.shift()
            //         if(temp.srcObject) {
            //             queue.push(ac.createMediaStreamSource(temp.srcObject))
            //         } else {
            //             temp.connect(gain)
            //         }
            //     }
            //     gain.connect(ac.destination);
            // }
          } else if (updateType == "DELETE") {
            for (let k = 0; k < useLocalStreamList.length; k++) {
              for (let j = 0; j < streamList.length; j++) {
                if (useLocalStreamList[k].streamID === streamList[j].streamID) {
                  try {
                    zg.stopPlayingStream(useLocalStreamList[k].streamID);
                  } catch (error) {
                    console.error(error);
                  }

                  console.info(useLocalStreamList[k].streamID + "was devared");

                  // $(".remoteVideo video:eq(" + k + ")").remove();
                  useLocalStreamList.splice(k--, 1);
                  break;
                }
              }
            }
          }
        }
      );

      zg.on("playQualityUpdate", async (streamID, streamQuality) => {
        console.log(
          `play#${streamID} videoFPS: ${streamQuality.video.videoFPS} videoBitrate: ${streamQuality.video.videoBitrate} audioBitrate: ${streamQuality.audio.audioBitrate} audioFPS: ${streamQuality.audio.audioFPS}`
        );
        console.log(`play#${streamID}`, streamQuality);
      });

      zg.on("publishQualityUpdate", async (streamID, streamQuality) => {
        console.log(
          `publish#${streamID} videoFPS: ${streamQuality.video.videoFPS} videoBitrate: ${streamQuality.video.videoBitrate} audioBitrate: ${streamQuality.audio.audioBitrate} audioFPS: ${streamQuality.audio.audioFPS}`
        );
        console.log(`publish#${streamID}`, streamQuality);
      });

      zg.on("remoteCameraStatusUpdate", (streamID, status) => {
        console.warn(
          `remoteCameraStatusUpdate ${streamID} camera status ${
            status == "OPEN" ? "open" : "close"
          }`
        );
      });

      zg.on("remoteMicStatusUpdate", (streamID, status) => {
        console.warn(
          `remoteMicStatusUpdate ${streamID} micro status ${
            status == "OPEN" ? "open" : "close"
          }`
        );
      });

      zg.on("soundLevelUpdate", streamList => {
        streamList.forEach(stream => {
          stream.type == "push" &&
            // $("#soundLevel").html(Math.round(stream.soundLevel) + "");
            console.warn(
              `${stream.type} ${stream.streamID}, soundLevel: ${stream.soundLevel}`
            );
        });
      });
      zg.on("deviceError", (errorCode, deviceName) => {
        console.warn(`deviceError`, errorCode, deviceName);
      });
      zg.on("videoDeviceStateChanged", (updateType, device) => {
        console.warn(`videoDeviceStateChanged`, device, updateType);
      });
      zg.on("audioDeviceStateChanged", (updateType, deviceType, device) => {
        console.warn(`audioDeviceStateChanged`, device, updateType, deviceType);
      });
      zg.on("roomOnlineUserCountUpdate", (roomID, count) => {
        console.warn(`roomOnlineUserCountUpdate ${roomID} ${count}`);
      });
    }
  },
  async mounted() {
    const zg = (this.zg = new ZegoExpressEngine(appID, server));

    zg.setLogConfig({
      logLevel: "debug",
      remoteLogLevel: "info",
      logURL: ""
    });

    zg.setDebugVerbose(false);
    zg.setSoundLevelDelegate(true, 3000);

    let loginSuc = false;
    try {
      console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz", roomID);
      loginSuc = await this.enterRoom(roomID);
      // loginSuc && (await this.publish());
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style></style>
