<template>
  <!-- White box container start  -->
  <div class="w-full mb-auto">
    <!-- Upload image div start  -->
    <!-- <LoadingBar v-if="isLoading" /> -->
    <div class="w-full">
      <div class="relative flex flex-wrap p-4 bg-white rounded-md shadow-lg">
        <ImageUploadModal
          @closeModal="showImageModal = false"
          @saveImage="saveImage"
          :showModal="showImageModal"
        />
        <span
          @click="showImageModal = true"
          class="absolute top-0 right-0 m-4 text-blue-500 cursor-pointer hover:text-blue-800"
          >Add Image Link</span
        >
        <!-- Demo image section start  -->
        <div
          v-for="(i, ix) in product.images"
          :key="ix"
          class="relative z-10 mx-2 text-white w-36 h-36 group"
        >
          <CheckSquareIcon
            v-if="product.img == i"
            @click="setPrimaryImage(i)"
            class="absolute w-5 h-5 m-3 text-gray-300 cursor-pointer group-hover:text-blue-500"
          />
          <SquareIcon
            v-else
            @click="setPrimaryImage(i)"
            class="absolute w-5 h-5 m-3 text-gray-300 cursor-pointer group-hover:text-blue-500"
          />
          <XIcon
            v-if="showDeleteBtnIndex == null"
            @click="deleteImage(i)"
            class="absolute right-0 w-5 h-5 m-3 text-gray-300 cursor-pointer group-hover:text-blue-500"
          />
          <!-- @mouseover="showDeleteBtnIndex=ix" @mouseleave="showDeleteBtnIndex=null"
           :class="showDeleteBtnIndex==ix ? 'opacity-50':'opacity-100'"  -->
          <img
            class="z-0 w-full h-full mx-auto my-2 border-2 border-gray-300 lg:mx-2 hover:border-blue-500"
            v-lazy="i"
            alt=""
          />
        </div>
        <ImageDropbox
          :images.sync="product.images"
          folder="product"
          name="product"
          class="mx-4 my-2"
          @saveImage="saveImages"
          :product="product"
        />
        <!-- name="product"
      @remove="removeImage"
    
      @setPrimaryImage="setPrimaryImage"
      :primaryImage="product.img" -->
        <!-- Demo image section end -->
      </div>
      <!-- Upload image div end -->

      <div class="block my-10 md:hidden">
        <Pricing :product="product" />
        <ProductAvailability :product="product" />
        <StockControl :product="product" />
        <PreviewProduct :product="product" />
      </div>

      <form
        @submit.prevent="saveProduct"
        @change="$emit('formChanged')"
        class="p-4 my-5 font-semibold tracking-wide text-gray-800 bg-white rounded-md shadow-lg"
      >
        <div class="lg:flex">
          <div class="lg:mr-2 lg:w-1/2">
            <Textbox
              label="Name"
              palceholder="SAMPLE. Black Dress"
              v-model="product.name"
            />
          </div>
          <div class="lg:flex">
            <div class="lg:mr-2 lg:w-3/5">
              <Textbox
                label="SKU"
                placeholder="0008"
                v-model="product.sku"
                :v="$v.product.sku"
                :err="
                  $v.product.sku.$invalid && $v.product.sku.$dirty
                    ? 'SKU is required and must be unique'
                    : ''
                "
              />
            </div>
            <div class="mx-2">
              <label class="text-sm text-gray-700">Product Category</label>
              <select
                v-model="product.category"
                @change="$emit('formChanged')"
                class="text-sm border-gray-500 rounded-md appearance-none hover:border-blue-500 hover:bg-white bg-gray-50"
              >
                <option :value="null">Select any option</option>
                <option
                  :id="category.id"
                  :value="category.id"
                  :key="index"
                  v-for="(category, index) in allCategories"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="lg:w-2/5">
              <Textbox
                right
                label="Weight, kg"
                placeholder="0"
                type="tel"
                v-model.number="product.weight"
              />
              <div class="flex justify-between mx-1 mt-1 cursor-default">
                <div class="flex flex-1">
                  <input
                    type="checkbox"
                    class="w-3 h-3 mt-0.5 border-gray-400 rounded-sm focus:ring-0 focus:ring-offset-0"
                  />
                  <p class="ml-1 text-xs font-normal text-gray-400">
                    Requires shipping or pickup
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Description start  -->
        <h2 class="font-semibold">Description</h2>
        <quill-editor
          v-model="product.description"
          @blur="$emit('formChanged')"
          ref="myQuillEditor1"
          class="w-full mt-2"
          value=" Perfect for wearing with your favorite flat sandals or trendy
          sneakers, the Black Dress is a fun cami style mini dress. This
          lightweight warm weather sundress has unique strap detail across the
          back with strap adjusters and features self binding along the neck and
          at the straps. Length is 33 inches from shoulder to hem. This simple
          but playful camisole is flattering and fun. Available for purchase
          through SurfRide. Material: 100% Viscose Color: Black Print: Floral
          Fit: Relaxed"
          ><p></p
        ></quill-editor>
        <!-- Description end -->
      </form>

      <div class="p-4 my-5 bg-white rounded-md shadow-lg">
        <div class="flex items-center w-48 cursor-pointer group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-yellow-500 w-7 h-7 group-hover:text-yellow-800"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <h2
            class="ml-2 font-semibold text-blue-500 group-hover:text-blue-800"
          >
            Add or edit ribbon
          </h2>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          Place customizable text labels like “New” or “Free shipping” over the
          main product image to attract <br />
          customers and bring in more sales.
        </p>
      </div>

      <div class="p-4 my-5 bg-white rounded-md shadow-lg">
        <div class="flex items-center cursor-pointer w-52 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-yellow-500 w-7 h-7 group-hover:text-yellow-800"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <h2
            class="ml-2 font-semibold text-blue-500 group-hover:text-blue-800"
          >
            Add product subtitle
          </h2>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          Add a short text that gives an extra description to your product or
          serves as a tagline. The text will be displayed <br />
          on your product list and product details page.
        </p>
      </div>
    </div>
  </div>
  <!-- White box container end -->
</template>

<script>
import Textbox from '~/components/ui/Textbox'
import Pricing from '~/components/Price/Pricing'
import LoadingBar from '~/shared/components/ui/LoadingBar'
import ImageDropbox from './ImageDropbox.vue'
import ImageUploadModal from './ImageUploadModal.vue'
import ProductAvailability from '~/components/Price/ProductAvailability'
import StockControl from '~/components/Price/StockControl'
import PreviewProduct from '~/components/Price/PreviewProduct'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { XIcon, SquareIcon, CheckSquareIcon } from 'vue-feather-icons'
import DELETE_FILE from '~/gql/product/deleteFile.gql'
import CATEGORIES from '~/gql/category/categories.gql'

export default {
  data() {
    return {
      showDeleteBtnIndex: null,
      showImageModal: false,
      isImageLoading: false,
      allCategories: null,
      isLoading: false,
    }
  },
  created() {
    this.getAllCategories()
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
    async getAllCategories() {
      this.isLoading = true
      try {
        this.allCategories = (
          await this.$apollo.query({
            query: CATEGORIES,
            variables: {
              params: { limit: 300 },
            },
          })
        ).data.categories.data
        this.isLoading = false
      } catch (e) {
        this.$store.commit('setErr', e)

        this.$toast.error(e.toString()).goAway(5000)
        this.isLoading = false
      } finally {
      }
    },
    async setPrimaryImage(img) {
      //  console.log(img)
      this.product.img = img
      console.log(this.product)
      this.$emit('saveProduct', this.product)
    },
    async deleteImage(image) {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_FILE,
          variables: { path: image },
          fetchPolicy: 'no-cache',
        })
        this.removeImage(image)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
      }
    },
    removeImage(name) {
      this.product.images = this.product.images.filter(function (
        value,
        index,
        arr
      ) {
        return value !== name
      })
      console.log(this.product, 'product..')
      this.saveProduct(this.product) // Save the product
    },
    saveProduct() {
      this.$emit('saveProduct', this.product)
    },
    async saveImage(img) {
      this.showImageModal = false
      this.product.images.push(img)

      await this.saveProduct()
      this.isImageLoading = true
    },
    saveImages(product) {
      this.product = product
      console.log(this.product)
      this.saveProduct()
      //   console.log(this.product,'product')

      //   console.log(imageUrls,img)
      // try {
      //   this.product.img = imageUrls
      //   this.product.images = union(this.product.images, imageUrls)
      //   console.log(this.product,'product')
      //   this.saveProduct() // This will create duplicate record
      // } catch (e) {
      //   if (e.response) this.$store.commit('setErr', e)
      // }
    },
  },
  mixins: [validationMixin],
  validations: {
    product: { sku: { required } },
  },
  props: { product: { type: Object } },
  components: {
    LoadingBar,
    SquareIcon,
    ImageUploadModal,
    CheckSquareIcon,
    ImageDropbox,
    XIcon,
    Textbox,
    Pricing,
    ProductAvailability,
    StockControl,
    PreviewProduct,
  },
}
</script>
<style scoped>
.width {
  width: 50px;
}
</style>
