<template>
  <!-- Main containt section start  -->
  <div
    class="p-3 mb-auto text-gray-800 bg-white rounded-md shadow-lg md:w-9/12 md:py-4 md:px-5"
  >
    <!-- This Product Requires Shipping or Pickup section start  -->
    <div class="pb-8 border-b border-gray-300 md:flex md:justify-between">
      <div class="md:w-3/4">
        <h1 class="text-2xl font-bold tracking-wide text-gray-800">
          This Product Requires Shipping or Pickup
        </h1>
        <p class="mt-2 text-sm text-gray-800">
          Enable this option if the product needs to be physically delivered to
          customers either via shipping or by self-pickup. If this product is a
          service or a downloadable item that doesn't require delivery, keep
          this option disabled.
        </p>
      </div>
      <!-- Toggle Button sta rt -->
      <div class="md:w-1/4">
        <div class="w-12 mx-auto">
          <label for="toogleA" class="mt-5 cursor-pointer">
            <!-- toggle -->
            <div class="relative">
              <!-- input -->
              <input id="toogleA" type="checkbox" class="hidden" checked />
              <!-- line -->
              <div
                class="h-8 bg-gray-400 rounded-full shadow-inner w-14 toggle__line"
              ></div>
              <!-- dot -->
              <div
                class="absolute inset-y-0 left-0 bg-white rounded-full shadow w-7 h-7 toggle__dot"
              ></div>
            </div>
            <!-- label -->
            <div class="txt_col">Enable</div>
          </label>
        </div>
      </div>
      <!-- Toggle Button end -->
    </div>
    <!-- This Product Requires Shipping or Pickup section end -->
    <!-- Weight and Dimensions section start  -->
    <div class="">
      <div class="w-3/4 my-5">
        <!-- Text section start  -->
        <h1 class="text-2xl font-bold tracking-wide text-gray-800">
          Weight and Dimensions
        </h1>
        <p class="mt-2 text-sm text-gray-800">
          Specify product's weight and dimensions to obtain precise
          carrier-calculated shipping rates for your customers. To determine the
          right dimensions, measure your product as if it were in a regular
          rectangular box. To change unit system visit
          <span class="text-blue-500 cursor-pointer hover:text-blue-700"
            >Regional Settings.</span
          >
        </p>
      </div>
      <!-- Text section end -->
      <!-- Input section start -->
      <div class="pb-8 border-b border-gray-300 md:flex">
        <div class="mr-4 md:w-1/2">
          <div class="relative mt-5 rounded-md shadow-sm">
            <Textbox
              type="tel"
              name="price"
              id="price"
              placeholder="Weight"
              v-model.number="product.weight"
            />
            <div
              class="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none"
            >
              <span class="pl-1 pr-4 text-gray-500 fieldset__field-prefix">
                Kg
              </span>
            </div>
          </div>
        </div>

        <div class="mt-5 md:w-1/2">
          <div class="flex">
            <div class="mr-2">
              <Textbox
                :right="true"
                type="tel"
                name="price"
                id="price"
                placeholder="Length cm"
                v-model.number="product.length"
              />
            </div>
            <div class="mr-2">
              <Textbox
                right
                type="tel"
                name="price"
                id="price"
                placeholder="width cm"
                v-model.number="product.width"
              />
            </div>
            <div class="mr-2">
              <Textbox
                right
                type="tel"
                name="price"
                id="price"
                placeholder="Bredth cm"
                v-model.number="product.breadth"
              />
            </div>
          </div>
          <div>
            <p class="pr-5 my-2 text-xs text-gray-400">
              Dimensional weight calculation is available with subscription to
              <span
                class="font-semibold text-blue-500 cursor-pointer hover:text-blue-700"
                >BUSINESS</span
              >
              or higher
            </p>
          </div>
        </div>
      </div>
      <!-- Input section end -->
      <div></div>
    </div>
    <!-- Weight and Dimensions section end  -->
    <!-- Weight and Dimensions section start  -->
    <div class="pb-10 border-b border-gray-300">
      <div class="my-5">
        <!-- Text section start  -->
        <h1 class="text-2xl font-bold tracking-wide text-gray-800">Taxes</h1>
      </div>
      <!-- Text section end -->
      <!-- Input section start -->

      <div class="">
        <div class="flex mt-5">
          <div class="w-full mr-2">
            <Textbox
              right
              type="tel"
              name="price"
              id="price"
              @blur="$emit('saveProduct', product)"
              v-model.number="product.sgst"
              placeholder="SGST"
            />
          </div>
          <div class="w-full mr-2">
            <Textbox
              right
              type="tel"
              name="price"
              id="price"
              placeholder="CGST"
              @blur="$emit('saveProduct', product)"
              v-model.number="product.cgst"
            />
          </div>
          <div class="w-full mr-2">
            <Textbox
              right
              type="tel"
              name="price"
              id="price"
              v-model.number="product.igst"
              @blur="$emit('saveProduct', product)"
              placeholder="IGST"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Input section end -->
    <div></div>

    <!-- Weight and Dimensions section end  -->
    <!-- Shipping Rates section start  -->
    <div class="pb-8 my-5 border-b border-gray-300">
      <!-- Heading section start  -->
      <h1 class="text-2xl font-bold tracking-wide text-gray-800">
        Shipping Rates
      </h1>
      <!-- Heading section end -->
      <!-- 1st Paragraph section start  -->

      <div class="my-5 group">
        <label class="cursor-pointer">
          <div class="">
            <input
              type="radio"
              name="Shipping Rates"
              value="Use your store’s shipping methods"
              class="w-5 h-5 border-2 border-blue-500 cursor-pointer focus:ring-0 focus:ring-offset-0"
              checked
            />
            <span
              class="pl-3 font-semibold text-gray-700 group-hover:text-blue-500"
              >Use your store’s shipping methods</span
            >
          </div>
          <div class="mt-2 text-sm text-gray-700 ml-9">
            <p>
              Shipping for this product is set according to
              <span class="text-blue-500 hover:text-blue-700"
                >Shipping Settings.</span
              >
              Shipping cost is calculated accordingly. Use this option if there
              are no special fees and conditions associated with delivery of
              this item. You can charge a fixed fee per item quantity on top of
              the shipping cost.
              <span class="text-blue-500 hover:text-blue-700"
                >Add fixed fee per item</span
              >
            </p>
          </div>
        </label>
      </div>

      <!-- 1st Paragraph section end  -->
      <!-- 2nd Paragraph section start  -->

      <div class="my-5 group">
        <label class="cursor-pointer">
          <div>
            <input
              type="radio"
              name="Shipping Rates"
              value="Specify shipping methods for this product"
              class="w-5 h-5 border-2 border-blue-500 cursor-pointer focus:ring-0 focus:ring-offset-0"
            />
            <span
              class="pl-3 font-semibold text-gray-700 group-hover:text-blue-500"
            >
              Specify shipping methods for this product
            </span>
          </div>
          <div class="mt-2 text-sm text-gray-700 ml-9">
            <p>
              Customize the list of shipping methods available for this product.
              White-list methods by adding them to the enabled list. Exclude
              specific shipping methods by adding them to the disabled list.
            </p>
          </div>
        </label>
      </div>

      <!-- 2nd Paragraph section end  -->
      <!-- 3rd Paragraph section start  -->

      <div class="my-5 group">
        <label class="cursor-pointer">
          <div>
            <input
              type="radio"
              name="Shipping Rates"
              value="Fixed rate per item"
              class="w-5 h-5 border-2 border-blue-500 cursor-pointer focus:ring-0 focus:ring-offset-0"
            />
            <span
              class="pl-3 font-semibold text-gray-700 group-hover:text-blue-500"
              >Fixed rate per item</span
            >
          </div>
          <div class="mt-2 text-sm text-gray-700 ml-9">
            <p>
              Charge a fixed fee per item quantity. Use this option if this
              product requires individual shipping price.
            </p>
          </div>
        </label>
      </div>

      <!-- 3rd Paragraph section end  -->
      <!-- 4th Paragraph section start  -->

      <div class="my-5 cursor-pointer group">
        <label class="cursor-pointer">
          <div>
            <input
              type="radio"
              name="Shipping Rates"
              value="Free shipping"
              class="w-5 h-5 border-2 border-blue-500 cursor-pointer focus:ring-0 focus:ring-offset-0"
            />
            <span
              class="pl-3 font-semibold text-gray-700 group-hover:text-blue-500"
              >Free shipping</span
            >
          </div>
          <div class="mt-2 text-sm text-gray-700 ml-9">
            <p>
              Free shipping of the product in any quantity. Free of charge
              shipping is proven to encourage customers buy more and increase
              sales. Use this option if you're going to cover shipping expenses
              yourself.
            </p>
          </div>
        </label>
      </div>

      <!-- 4th Paragraph section end  -->
    </div>
    <!-- Shipping Rates section end  -->
    <!-- Taxes section start  -->
    <div class="mb-40">
      <h1 class="text-2xl font-bold tracking-wide text-gray-800">Taxes</h1>
      <p class="mt-2 text-sm text-gray-700">
        You do not have any taxes enabled.
        <span class="text-blue-500 cursor-pointer hover:text-blue-700"
          >Set up taxes</span
        >
      </p>
    </div>
    <!-- Taxes section end  -->
  </div>
  <!-- Main containt section end  -->
</template>

<script>
import Textbox from '~/components/ui/Textbox'

export default {
  components: {
    Textbox,
  },
  data() {
    return {}
  },
  mounted() {
    this._keyListener = function (e) {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault() // present "Save Page" from getting triggered.
        this.$emit('saveProduct', this.product)
      }
    }
    document.addEventListener('keydown', this._keyListener.bind(this))
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener)
  },
  props: { product: { type: Object } },
}
</script>
<style scoped>
.txt_col {
  color: rgb(25, 170, 25);
  cursor: pointer;
}
.green_btn {
  background-color: rgba(85, 196, 81, 0.5);
  background-image: linear-gradient(45deg, #42bf46, #60c759);
}
.toggle__dot {
  top: 2.35px;
  left: 2.35px;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(85%);
}
input:checked ~ .toggle__line {
  background-color: rgb(25, 170, 25);
}
.fieldset__field-prefix::before {
  content: '';
  display: block;
  position: absolute;
  top: 8px;
  left: 1px;
  bottom: 8px;
  border-width: 0 0 0 1px;
  border-style: solid;
  border-color: #abb5c0;
  transition: border-color 0.1s linear;
}
</style>
