<template></template>
<script>
import AgoraRTC from 'agora-rtc-sdk-ng'
export default {
  mounted() {
    var client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' })

    client.init(
      `<APPID>`,
      function () {
        console.log('AgoraRTC client initialized')
      },
      function (err) {
        console.log('AgoraRTC client init failed', err)
      }
    )
    localStream.init(
      function () {
        console.log('getUserMedia successfully')
        localStream.play('agora_local')
      },
      function (err) {
        console.log('getUserMedia failed', err)
      }
    )

    client.join(
      `<TOKEN_OR_KEY>`,
      ` <CHANNEL_NAME>`,
      `<UID>`,
      function (uid) {
        console.log('User ' + uid + ' join channel successfully')
      },
      function (err) {
        console.log('Join channel failed', err)
      }
    )

    //publish local stream
    client.publish(localStream, function (err) {
      console.log('Publish local stream error: ' + err)
    })

    client.on('stream-published', function (evt) {
      console.log('Publish local stream successfully')
    })

    //subscribe remote stream
    client.on('stream-added', function (evt) {
      var stream = evt.stream
      console.log('New stream added: ' + stream.getId())
      client.subscribe(stream, function (err) {
        console.log('Subscribe stream failed', err)
      })
    })

    client.on('stream-subscribed', function (evt) {
      var remoteStream = evt.stream
      console.log(
        'Subscribe remote stream successfully: ' + remoteStream.getId()
      )
      remoteStream.play('agora_remote' + remoteStream.getId())
    })

    client.leave(
      function () {
        console.log('Leave channel successfully')
      },
      function (err) {
        console.log('Leave channel failed')
      }
    )
  },
}
</script>
