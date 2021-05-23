<template>
  <!-- General section start -->
  <div
    class="p-3 mb-auto bg-white rounded-md shadow-lg md:w-9/12 md:py-4 md:px-5"
  >
    <!-- Heading with button section start  -->
    <div v-if="user.plan == 'free'">
      <div class="flex justify-center w-full">
        <div class="lg:mr-2 lg:w-1/2">
          <div class="w-full">
            <h2 class="font-semibold">Product Meta Title</h2>

            <div class="my-2">
              <Textbox
                type="text"
                placeholder="SAMPLE. Black Dress"
                v-model="product.title"
                @blur="$emit('saveProduct', product)"
              />
            </div>
          </div>

          <div>
            <h2 class="mb-1 font-semibold">Product Meta Description</h2>

            <Textarea
              type="text"
              placeholder="SAMPLE. Black Dress"
              v-model="product.metaDescription"
              @blur="$emit('saveProduct', product)"
              rows="3"
            />
          </div>

          <div>
            <h2 class="mb-1 font-semibold">Product Meta Keywords</h2>

            <Textarea
              type="text"
              placeholder="SAMPLE. Black Dress"
              v-model="product.keywords"
              rows="3"
              @blur="$emit('saveProduct', product)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-full">
        <div class="text-center">
          <h3 class="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
            Improve your SEO rankings
          </h3>
          <p class="mt-2 text-sm text-gray-800">
            Customize meta data of the page title and description.
          </p>
          <div class="my-6">
            <button
              class="flex items-center px-4 py-2 mx-auto space-x-1 transition duration-300 rounded-md shadow-md opacity-100 hover:shadow-lg green_btn hover:opacity-90"
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
                Upgrade to Inhance SEO
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Heading with button section end -->

      <!-- 1st Image with text section start  -->
      <div class="my-10 lg:w-5/6 lg:flex">
        <div class="lg:w-2/5">
          <img src="/image/sample.PNG" class="cursor-grab" />
        </div>
        <div class="ml-8 text-gray-800 lg:w-3/5 opacity-70">
          <h4 class="font-semibold">
            Customize your appearance in search results
          </h4>
          <p class="mt-4 text-sm">
            The way product pages appear in search results determines how many
            site visitors you get. Enhanced product SEO lets you preview and
            alter what your customers see in search engines.
          </p>
        </div>
      </div>
      <!-- 1st Image with text section end -->
      <!-- 2nd Image with text section start  -->
      <div class="my-10 lg:w-5/6 lg:flex">
        <div class="lg:w-2/5">
          <img src="/image/sample.PNG" class="cursor-grab" />
        </div>
        <div class="ml-8 text-gray-800 lg:w-3/5 opacity-70">
          <h4 class="font-semibold">
            Customize your appearance in search results
          </h4>
          <p class="mt-4 text-sm">
            The way product pages appear in search results determines how many
            site visitors you get. Enhanced product SEO lets you preview and
            alter what your customers see in search engines.
          </p>
        </div>
      </div>
      <!-- 2nd Image with text section end -->
      <!-- 3rd Image with text section start  -->
      <div class="my-10 lg:w-5/6 lg:flex">
        <div class="lg:w-2/5">
          <img src="/image/sample.PNG" class="cursor-grab" />
        </div>
        <div class="ml-8 text-gray-800 lg:w-3/5 opacity-70">
          <h4 class="font-semibold">
            Customize your appearance in search results
          </h4>
          <p class="mt-4 text-sm">
            The way product pages appear in search results determines how many
            site visitors you get. Enhanced product SEO lets you preview and
            alter what your customers see in search engines.
          </p>
        </div>
      </div>
      <!-- 3rd Image with text section end -->
    </div>
  </div>

  <!-- General section end -->
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons'
import Textbox from '~/components/ui/Textbox'
export default {
  components: {
    ChevronLeftIcon,
    Textbox,
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user
    },
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
  created() {
    console.log(this.user, 'user')
  },
  data() {
    return {
      // images: ['/image/sample.PNG', '/image/sample.PNG', '/image/sample.PNG'],
      // message: [
      //   'Customize your appearance in search results',
      //   'Page titles',
      //   'Meta description',
      // ],
      // para: [
      //   'The way product pages appear in search results determines how many site visitors you get. Enhanced product SEO lets you preview and alter what your customers see in search engines.',
      //   "Page title shows up as a clickable link in search results and describes what the page is about. Customize your page titles to target your clients' interests more accurately",
      //   "Page title shows up as a clickable link in search results and describes what the page is about. Customize your page titles to target your clients' interests more accurately",
      // ],
      // values: [
      //   {
      //     image: ['/image/sample.PNG'],
      //     message: ['Customize your appearance in search results'],
      //     para: [
      //       'The way product pages appear in search results determines how many site visitors you get. Enhanced product SEO lets you preview and alter what your customers see in search engines.',
      //     ],
      //   },
      // ],
    }
  },

  props: { product: { type: Object } },
}
</script>
<style scoped>
</style>
