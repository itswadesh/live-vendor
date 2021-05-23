<template>
  <!-- General section start -->
  <div
    class="flex p-3 mb-auto bg-white rounded-md shadow-lg  md:w-9/12 md:px-8 md:py-4"
  >
    <!-- Text section start  -->
    <div class="w-full">
      <h3 class="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
        General
      </h3>
      <!-- Table section start -->
      <table class="w-full mt-4 border-b-2">
        <thead class="font-semibold text-white bg-gray-600">
          <tr>
            <td class="py-1 text-center">Attributes</td>
            <td class="py-1 text-center">value</td>
          </tr>
        </thead>
        <tbody class="divide-y-2">
          <tr>
            <td>BARCODE</td>
            <td class="py-3">
              <Textbox
                v-model.number="product.barcode"
                @input="$emit('formChanged')"
                type="number"
              />
            </td>
          </tr>
          <tr>
            <td>Brand</td>
            <td class="py-3">
              <!-- <input
                class="w-full py-3 text-gray-600 placeholder-gray-600 border-gray-400 rounded-md bg-gray-50 h-7"
                type="text"
                v-model="product.brand"
              /> -->
              <select
                v-model="product.brand"
                @change="$emit('formChanged')"
                class="border-gray-500 rounded-md appearance-none"
              >
                <option :value="null">Select any option</option>
                <option
                  :id="brand.id"
                  :value="brand.id"
                  :key="index"
                  v-for="(brand, index) in allBrands"
                >
                  {{ brand.name }}
                </option>
                <!-- <option>Radio button</option> -->
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pt-2 text-sm text-gray-500">
        Attributes with empty values are not displayed in the storefront.
      </div>
      <!-- Table section end -->
    </div>
    <!-- Text section end -->
    <!-- Image section start  -->

    <!-- Image section end -->
  </div>
  <!-- General section end -->
</template>

<script>
import brands from '~/gql/brand/brands.gql'
import Textbox from '~/components/ui/Textbox'
export default {
  components: {
    Textbox,
  },
  props: { product: { type: Object } },
  data() {
    return {
      allBrands: null,
    }
  },
  created() {
    this.getAllBrands()
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
  methods: {
    async getAllBrands() {
      try {
        this.allBrands = (
          await this.$apollo.query({
            query: brands,
            variables: {
              params: { limit: 300 },
            },
          })
        ).data.brands.data
        console.log(this.allBrands)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
      }
    },
  },
}
</script>

<style scoped></style>
