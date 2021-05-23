<template>
  <button
    v-bind="$attrs"
    @click="$emit('click')"
    class="flex items-center justify-center px-4 py-2 space-x-1 font-semibold text-gray-700 transition duration-300 transform border border-gray-400 rounded-md shadow-md active:scale-95 hover:shadow hover:bg-indigo-50 focus:outline-none"
    :class="
      disabled
        ? 'text-gray-300 shadow-none active:scale-100 border-2 hover:shadow-none border-gray-200 hover:bg-transparent cursor-not-allowed'
        : ''
    "
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style scoped></style>
