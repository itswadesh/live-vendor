<template>
  <section class="flex flex-wrap px-2 py-6 bg-gray-200 md:px-8">
    <nuxt-link
      class="px-4 py-2 m-4 text-white bg-green-500 rounded"
      to="/go-live/"
      >Go Live</nuxt-link
    >
    <nuxt-link class="px-4 py-2 m-4 text-white bg-green-500 rounded" to="/live/"
      >Live Vendors</nuxt-link
    >
    <nuxt-link
      class="px-4 py-2 m-4 text-white bg-green-500 rounded"
      to="/live/prime"
      >Prime Streams</nuxt-link>
    <nuxt-link
      class="px-4 py-2 m-4 text-white bg-green-500 rounded"
      to="/whiteboard/"
      >Whiteboard</nuxt-link
    >
  </section>
</template>

<script>
import Heading from '~/components/Help/Heading'
import Box from '~/components/Help/Box'
import Account3 from '~/components/Help/Account3'
export default {
  components: {
    Heading,
    Account3,
    Box,
  },
}
</script>

<style></style>
