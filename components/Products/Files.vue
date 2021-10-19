<template>
  <!-- white box flex div starts  -->

  <div class="mt-1">
    <div class="w-full px-8 py-4 mb-auto bg-white border rounded-md shadow-md">
      <h4 class="text-2xl font-bold text-center text-gray-800">
        Sell Digital Goods
      </h4>
      <!-- green button div starts  -->
      <button
        class="flex items-center px-4 py-2 mx-auto mt-6 space-x-1 border rounded-md shadow-md green_btn"
      >
        <div>
          <svg
            class="h-6 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
        <div class="text-sm font-bold text-gray-100">
          Upgrade to Sell Digital Goods
        </div>
      </button>
      <!-- green button div ends -->

      <div class="mt-2">
        <h4 class="text-sm text-center text-gray-600">
          Available with the
          <span class="font-semibold text-gray-800">Venture</span> plan or
          higher.
        </h4>
      </div>
      <div class="mt-14">
        <img class="h-20 mx-auto" src="/a/mid.jpg" alt="" />
      </div>
      <div>
        <p class="items-center mt-10 text-sm text-center text-gray-600 mb-14">
          Whether you want to sell e-books, videos, music, digital art and any
          other downloadable files or just want to complement a tangible product
          with a digital copy, Litekart will automate the process for you. Just
          upload your files and Litekart will instantly and securely deliver
          them to the buyer upon purchase.
        </p>
      </div>
    </div>
  </div>
  <!-- white box flex div ends -->
</template>

<script>
export default {
  props: { product: { type: Object } },
}
</script>

<style>
.green_btn {
  background-color: rgba(85, 196, 81, 0.5);
  background-image: linear-gradient(45deg, #42bf46, #60c759);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 10%) inset;
  transition: opacity 0.1s ease-out 0s;
}
.green_btn:hover {
  background-color: rgba(151, 196, 150, 0.5);
  background-image: linear-gradient(45deg, #5e815f, #60c759);
}
.star {
  fill: #f9a650;
}
.star:hover {
  fill: gray;
}

.toggle__dot {
  top: 2.35px;
  left: 2.35px;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
}
input:checked ~ .toggle__line {
  background-color: rgb(25, 170, 25);
}
.enabled {
  color: rgb(25, 170, 25);
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
input
