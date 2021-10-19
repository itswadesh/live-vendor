<template>
  <!-- Embed this product on your site section start -->
  <div class="flex p-3 mb-auto bg-white rounded-md shadow-lg md:w-9/12 md:p-8">
    <!-- Text section start  -->
    <div class="">
      <h3 class="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
        Embed this product on your site
      </h3>
      <h6 class="py-4 pr-4 text-sm leading-7 text-gray-800">
        Insert this product anywhere on your site with the buy button. Customers
        will be able to order from all pages where you have this product
        embedded. <br />
        – Promote products on your blog, sidebar of your site, or any other
        place, literally. <br />
        – Create a complete showcase that details every advantage of your
        product and offers a way to buy it online.
      </h6>
      <div class="py-2">
        <button
          class="w-full px-4 py-2 text-sm font-semibold tracking-wider text-white bg-blue-500 rounded-md shadow-md button-active lg:py-3 md:w-52 bg-gradient-to-r from-green-500 to-indigo-500 hover:from-indigo-500 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Embed Product
        </button>
      </div>
    </div>
    <!-- Text section end -->
    <!-- Image section start  -->
    <div class="hidden md:flex">
      <img class="mx-auto mb-auto lg:my-auto" src="/image/leaf.PNG" alt="" />
    </div>
    <!-- Image section end -->
  </div>
  <!-- Embed this product on your site section end -->
</template>

<script>
export default {
  props: { product: { type: Object } },
}
</script>

<style scoped></style>
