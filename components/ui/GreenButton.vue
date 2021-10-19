<template>
  <button
    v-bind="$attrs"
    @click="$emit('click')"
    class="flex items-center justify-center px-4 py-2 space-x-1 font-semibold tracking-wide text-white transition duration-300 transform rounded-md shadow-md opacity-100 focus:ring-2 focus:ring-accent-500 focus:outline-none focus:ring-offset-2 bg-accent-500 bg-gradient-to-br from-accent-400 to-accent-600 hover:shadow hover:opacity-80 active:scale-95"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style scoped></style>
