<template>
  <section class="flex bg-gray-100 border-2 border-gray-800">
    <!-- <div>
      <Sidebar />
    </div> -->
    <div class="w-full">
      <Livenow />
    </div>
  </section>
</template>

<script>
import Sidebar from '~/components/Livenow/Sidebar.vue'
import Livenow from '~/components/Livenow/Livenow.vue'
export default {
  middleware: ['isAuth'],
  components: {
    Sidebar,
    Livenow,
  },
}
</script>

<style></style>
