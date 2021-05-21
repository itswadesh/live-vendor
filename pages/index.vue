<template>
  <section class="px-2 py-6 bg-gray-200 md:px-8">
    <nuxt-link to="/live/">Live Vendors</nuxt-link>
    <nuxt-link to="/live/prime">Prime Streams</nuxt-link>
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
