<template>
  <section class="px-2 py-6 bg-gray-200 md:px-8">
    <Heading />
    <Box />
    <Account2 />
  </section>
</template>

<script>
import Heading from "~/components/Help/Heading";
import Box from "~/components/Help/Box";
import Account2 from "~/components/Help/Account2";
export default {
  components: {
    Heading,
    Box,
    Account2,
  },
};
</script>

<style></style>
