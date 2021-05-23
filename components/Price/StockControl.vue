<template>
  <div
    class="p-4 mb-4 text-gray-800 bg-white rounded-lg shadow-lg border-5 md:w-80"
  >
    <div class="mb-2 text-sm font-bold">Stock Control</div>

    <div class="mb-4 font-bold text-green-500">In Stock (∞)</div>
    <div
      class="flex mb-2 -ml-1 font-semibold text-blue-500 cursor-pointer max-w-max group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 mr-1 text-yellow-500 group-hover:text-yellow-800"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        /></svg
      ><span class="flex-1 text-blue-500 group-hover:text-blue-800"
        >Stock Control</span
      >
    </div>

    <div
      class="flex items-center justify-between mt-5 text-sm text-blue-500 cursor-pointer hover:text-blue-800 group"
    >
      Hide stock Control
      <div
        class="text-gray-400 rounded-full group-hover:shadow-lg group-hover:text-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10 p-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
}
</script>

<style>
</style>