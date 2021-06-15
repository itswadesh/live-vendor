<template>
  <div class="w-full">
    <div v-if="chats" class="flex flex-col-reverse">
      <div v-for="c in chats.data" :key="c.id" :style="`color:#80c000`">
        {{ c.firstName }} - {{ c.message }}
      </div>
    </div>
    <form @submit.prevent="submit" class="">
      <input
        type="text"
        v-model="message"
        placeholder="Send Message"
        class="
          mt-2
          py-1
          text-white
          px-2
          border border-gray-500
          rounded
          bg-gray-500
        "
      />
    </form>
  </div>
</template>

<script>
import CHATS from '~/gql/im/chats.gql'
import CHANNEL_MESSAGES from '~/gql/im/channelMessages.gql'
import SAVE_IM from '~/gql/im/sendInstantMessage.gql'
export default {
  apollo: {
    $subscribe: {
      chats: {
        query: CHATS,
        variables() {
          return {
            channel: this.channel,
          }
        },
        result({ data }) {
          this.chats = data.chats
        },
      },
    },
  },
  props: {
    channel: { type: String, default: 'misiki' },
  },
  data() {
    return {
      chats: null,
      message: '',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getDarkColor() {
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10)
      }
      return color
    },
    async getData() {
      try {
        this.chats = (
          await this.$apollo.query({
            query: CHANNEL_MESSAGES,
            variables: { channel: this.channel },
          })
        ).data.channelMessages
      } catch (e) {}
    },
    async submit() {
      try {
        const chat = (
          await this.$apollo.mutate({
            mutation: SAVE_IM,
            variables: {
              id: 'new',
              channel: this.channel,
              message: this.message,
            },
          })
        ).data
        this.message = ''
      } catch (e) {}
    },
  },
}
</script>

<style></style>
