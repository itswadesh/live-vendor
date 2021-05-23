<template>
  <button
    v-bind="$attrs"
    @click="$emit('click')"
    class="flex items-center justify-center px-4 py-2 space-x-1 font-semibold tracking-wider text-white transition duration-300 transform bg-blue-500 rounded-md shadow-md hover:shadow gradient button-active focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.gradient {
  position: relative;
  background-image: linear-gradient(to right, #10b981, #6366f1);
  z-index: 1;
}

.gradient::before {
  position: absolute;
  content: '';
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 0.375rem /* 6px */;
  background-image: linear-gradient(to left, #10b981, #6366f1);
  z-index: -1;
  transition: opacity 0.3s linear;
  opacity: 0;
}

.gradient:hover::before {
  opacity: 1;
}
</style>
