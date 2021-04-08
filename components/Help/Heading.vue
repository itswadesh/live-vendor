<template>
  <section class="">
    <h1
      class="text-2xl font-bold tracking-wide text-center md:text-4xl text-primary-500"
    >
      How can we Help You?
    </h1>

    <!-- Search bar section start  -->
    <div
      class="relative w-full my-5 text-gray-600 rounded-md shadow-md md:mx-auto md:w-128"
    >
      <input
        class="w-full h-10 px-10 text-sm bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200 focus:outline-none"
        type="search"
        name="search"
        placeholder="Product name, SKU"
      />
      <button type="submit" class="absolute top-0 left-0 mt-3 ml-3">
        <svg
          class="w-4 h-4 text-gray-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style="enable-background: new 0 0 56.966 56.966"
          xml:space="preserve"
          width="512px"
          height="512px"
        >
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
          />
        </svg>
      </button>
      <button
        type="submit"
        class="absolute right-0 text-white padding rounded-r-md bg-primary-500 hover:bg-opacity-75"
      >
        Search
      </button>
    </div>
    <!-- Search bar section end  -->

    <p class="text-sm text-center text-gray-600">
      or choose a card to pickup quickly whatever question you want.
    </p>

    <!-- Boxes start  -->
    <div class="my-2 md:m-5">
      <div class="flex flex-wrap justify-center">
        <div
          class="w-full px-4 py-6 my-2 text-gray-700 bg-white border rounded-sm shadow-md cursor-pointer md:m-2 md:w-40 h-28 hover:text-primary-500 hover:border-primary-500 boredr-black"
        >
          <img class="h-6 mx-auto" src="/a/shuttle.svg" alt="" />
          <p class="mt-3 text-xs text-center whitespace-no-wrap">
            Getting Started
          </p>
        </div>
        <div
          class="w-full px-4 py-6 my-2 text-gray-700 bg-white border rounded-sm shadow-md cursor-pointer md:m-2 md:w-40 h-28 hover:text-primary-500 hover:border-primary-500 boredr-black"
        >
          <img class="h-6 mx-auto" src="/a/refund.svg" alt="" />
          <p class="mt-3 text-xs text-center whitespace-no-wrap">
            Returns and Refunds
          </p>
        </div>
        <div
          class="w-full px-4 py-6 my-2 text-gray-700 bg-white border rounded-sm shadow-md cursor-pointer md:m-2 md:w-40 h-28 hover:text-primary-500 hover:border-primary-500 boredr-black"
        >
          <img class="h-6 mx-auto" src="/a/payment.svg" alt="" />
          <p class="mt-3 text-xs text-center whitespace-no-wrap">
            Payments and Delivery
          </p>
        </div>
        <div
          class="w-full px-4 py-6 my-2 text-gray-700 bg-white border rounded-sm shadow-md cursor-pointer md:m-2 md:w-40 h-28 hover:border-primary-500 hover:text-primary-500 boredr-black"
        >
          <img class="h-6 mx-auto" src="/a/account.svg" alt="" />
          <p class="mt-3 text-xs text-center whitespace-no-wrap">
            Account Management
          </p>
        </div>
        <div
          class="w-full px-4 py-6 my-2 text-gray-700 bg-white border rounded-sm shadow-md cursor-pointer md:m-2 md:w-40 h-28 hover:text-primary-500 hover:border-primary-500 boredr-black"
        >
          <img class="h-6 mx-auto" src="/a/query.svg" alt="" />
          <p class="mt-3 text-xs text-center whitespace-no-wrap">Top Queries</p>
        </div>
      </div>
    </div>
    <!-- Boxes end -->
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.padding {
  padding: 7.5px 21px;
}
</style>
