<template>
  <section class="px-2 py-6 bg-gray-200 md:px-8">
    <Heading />
    <Box />
    <Account1 />
  </section>
</template>

<script>
import Heading from "~/components/Help/Heading";
import Box from "~/components/Help/Box";
import Account1 from "~/components/Help/Account1";
export default {
  components: {
    Heading,
    Box,
    Account1,
  },
};
</script>

<style></style>
