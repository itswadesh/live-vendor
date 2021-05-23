<template>
  <!-- Related products section start -->

  <!-- Text section start  -->
  <div class="relative w-full">
    <div class="absolute" v-if="showRelatedProduct">
      <RelatedProductModal
        :products="products"
        @removeModal="showRelatedProduct = false"
        :showModal="showRelatedProduct"
                @saveProduct="saveProduct"
      />
    </div>
    <div class="w-full p-4 mb-auto bg-white rounded-md shadow-lg">
      <h3 class="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
        Related products
      </h3>
      <!-- Button section start  -->
      <div class="items-center justify-between md:flex">
        <div class="flex flex-wrap">
          <button
            type="button"
            @click="showRelatedProduct = true"
            class="flex items-center justify-center px-2 py-1 my-3 mr-3 text-xs font-semibold text-white bg-blue-500 border border-gray-500 rounded-md shadow focus:outline-none hover:shadow-lg hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span> Add new product</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center px-2 py-1 my-3 mr-3 text-xs font-semibold text-gray-800 bg-white border border-gray-500 rounded-md shadow focus:outline-none hover:shadow-lg hover:bg-gray-200"
          >
            Duplicate product
          </button>
        </div>
        <div class="text-xs text-gray-400">Drag and drop items to sort</div>
      </div>
      <!-- Button section end -->
      <!-- Table section start -->
      <table class="w-full mt-2 border-b-2">
        <thead class="font-semibold text-white bg-gray-600">
          <tr>
            <td class="flex items-center px-20 py-1">
              <span>SKU</span> <span class="ml-10 md:ml-32">Name</span>
            </td>
          </tr>
        </thead>
        <tbody class="divide-y-2">
          <tr>
            <div class="py-5 text-center bg-gray-300">
              There are no related products
            </div>
          </tr>
        </tbody>
      </table>
      <!-- Table section end -->
      <!-- Display random products section end -->

      <div class="flex items-center pt-2 text-sm text-gray-500">
        <span class="text-semibold">Display random products</span>
        <div class="ml-2">
          <label for="toogleC" class="flex mt-1 cursor-pointer">
            <!-- toggle -->
            <div class="relative">
              <!-- input -->
              <input id="toogleC" type="checkbox" class="hidden" checked />
              <!-- line -->
              <div
                class="h-4 bg-gray-400 rounded-full shadow-inner w-7 toggle__line"
              ></div>
              <!-- dot -->
              <div
                class="absolute inset-y-0 left-0 w-3 h-3 bg-white rounded-full shadow toggle__dot"
              ></div>
            </div>
            <!-- label -->
          </label>
        </div>
        <span class="ml-1 text-sm text-gray-400">Disable</span>
      </div>
      <!-- Box section start  -->
      <div class="p-4 my-2 text-sm text-gray-400 bg-white rounded-md shadow-md">
        <div class="flex items-center">
          <span class="mb-1">Qty</span>
          <div class="w-16 ml-1">
            <Textbox
              type="text"
              right
              placeholder="5"
              v-model.number="product.qty"
            />
          </div>
          <span class="mb-1 ml-2">Random product from </span>
          <select
            class="w-40 mb-1 pl-2 py-0.5 text-gray-600 bg-gray-100 border-gray-400 rounded-md"
            style="font-size: 1em"
            name="Any"
            id="Any"
          >
            <option value="Any">- Any -</option>
          </select>
          <span class="mb-1 ml-2">category</span>
        </div>
      </div>
      <!-- Box section end -->
      <!-- Display random products section end -->
    </div>
  </div>
  <!-- Text section end -->

  <!-- Related products section end -->
</template>

<script>
import RelatedProductModal from '~/components/RelatedProductsModal.vue'
import PRODUCTS from '~/gql/product/products'
import Textbox from '~/components/ui/Textbox'
export default {
  components: {
    Textbox,
    RelatedProductModal,
  },
  props: { product: { type: Object } },

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
  created() {
    this.getRelatedProducts()
  },
  data() {
    return {
      showRelatedProduct: false,
    }
  },
  methods: {
    saveProduct(product){
      console.log(product)
      // delete product.category
      this.$emit('saveProduct',product)
    },
    async getRelatedProducts() {
      try {
        //   this.$store.commit('clearErr')
        this.products =
          (
            await this.$apollo.query({
              query: PRODUCTS,
              fetchPolicy: 'no-cache',
            })
          ).data.products.data || {}
        console.log(this.products, 'product')
          if (this.product.categories)
            this.product.categories = this.product.categories.map((o) => o.id)
      } catch (e) {
                this.$store.commit('setErr', e)

        console.log('eeeeeeeeee', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
}
</script>

<style scoped>
.toggle__dot {
  top: 2.35px;
  left: 2.35px;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(95%);
}
input:checked ~ .toggle__line {
  background-color: rgb(25, 170, 25);
}
</style>
