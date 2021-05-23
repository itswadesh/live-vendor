<template>
  <div class="flex items-center text-sm text-gray-800">
    <div class="order-1">
      <div v-if="enable">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-accent-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div v-else class="w-2 h-2 mr-2 bg-gray-400 rounded-full"></div>
    </div>
    <button
      class="focus:outline-none"
      @click="$emit('changed', true)"
      :class="enable ? 'order-2 text-accent-500' : 'order-3 link'"
    >
      Enable
    </button>
    <button
      class="focus:outline-none"
      @click="$emit('changed', false)"
      :class="enable ? 'order-3 ml-2 link' : 'order-2 mr-2'"
    >
      Disabled
    </button>
  </div>
</template>

<script>
export default {
  props: {
    enable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style scoped></style>
