<template>
  <form
    @submit.prevent="$emit('saveProduct', product)"
    @change="$emit('formChanged')"
    class="flex flex-wrap justify-between w-full mb-4 text-gray-800 bg-white rounded-lg shadow-lg md:w-80"
  >
    <div class="p-4">
      <div class="">
        <!-- <div class="w-1/6 p-2 text-2xl h-1/4">Price</div>
        <div class="flex items-center mb-4">
          <div class="w-1/6 p-2 text-2xl">₹</div>
          <input
            class="w-full px-4 py-2 ml-1 text-3xl text-right bg-gray-100 border-2 border-gray-400 rounded hover:bg-white hover:border-blue-600 focus:outline-none focus:border-blue-600"
          />
        </div> -->
        <div>
          <label for="price" class="block text-xl font-bold text-gray-700"
            >Pricing</label
          >
          <div class="relative mt-3 rounded-md shadow-sm">
            <div class="absolute inset-y-0 flex items-center pl-3">
              <span class="pl-1 pr-4 text-2xl shw fieldset__field-prefix">
                ₹
              </span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              class="block w-full px-4 py-2 pl-12 text-2xl bg-gray-100 border border-gray-400 rounded hover:bg-white hover:border-indigo-600 focus:outline-none focus:border-indigo-600"
              v-model.number="product.price"
            />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" class="sr-only">Currency</label>
            </div>
          </div>
        </div>
        <div>
          <div
            class="flex mt-5 mb-2 -ml-1 font-semibold text-blue-500 cursor-pointer max-w-max group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mr-1 text-yellow-500 group-hover:text-yellow-800"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="flex-1 group-hover:text-blue-800">
              Set "Compare to" price</span
            >
          </div>
          <div class="text-sm text-gray-600">
            Show that you offer better prices than your competitors or display
            discounts off your regular prices. For example,
            <span class="text-gray-400 line-through">₹35.90</span> ₹29.90.
          </div>
        </div>
        <div>
          <div
            class="flex mt-5 mb-2 -ml-1 font-semibold text-blue-500 cursor-pointer max-w-max group"
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
            ><span class="flex-1 group-hover:text-blue-800"
              >Bulk discount pricing</span
            >
          </div>
          <div class="text-sm text-gray-600">
            Encourage higher purchase quantities with volume discounts.
          </div>
        </div>
        <div>
          <div
            class="flex w-64 mt-5 mb-2 -ml-1 font-semibold text-blue-500 cursor-pointer group"
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
            ><span class="flex-1 group-hover:text-blue-800"
              >Enable "Pay What You Want" Pricing</span
            >
          </div>
          <div class="text-sm text-gray-600">
            Let customers define their own price for the product or donation
            amount.
          </div>
        </div>

        <div
          class="flex items-center justify-between mt-5 text-sm text-blue-500 cursor-pointer hover:text-blue-800 group"
        >
          Hide pricing options
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
    </div>
  </form>
</template>

<script>
export default {
  props: { product: { type: Object } },
}
</script>

<style>
.shw {
  color: black;
  text-shadow: 0.5px 0.5px 1px gray;
}
.fieldset__field-prefix::before {
  content: '';
  display: block;
  position: absolute;
  top: 8px;
  right: 1px;
  bottom: 8px;
  border-width: 0 0 0 1px;
  border-style: solid;
  border-color: #abb5c0;
  transition: border-color 0.1s linear;
}
</style>
