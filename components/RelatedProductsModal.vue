<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="fixed z-10 overflow-y-auto"  :class="{ 'inset-0': showModal }">
      <div
        class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0"
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div
          class="fixed transition-opacity"
          :class="{
            'ease-out duration-300 opacity-100 inset-0': showModal,
            'ease-in duration-200 opacity-0 ': !showModal,
          }"
          aria-hidden="true"
        >
          <div
            class="absolute bg-gray-200 opacity-75"
            :class="{ 'inset-0': showModal }"
          ></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          :class="{
            'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100': showModal,
            'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95': !showModal,
          }"
          class="relative z-50 inline-block overflow-y-auto text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl md:max-h-72 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
        <XIcon class="absolute top-0 right-0 cursor-pointer" @click="$emit('removeModal')" />
          <!-- <div class="p-0 bg-white">
            <div class="">
              <div class="flex justify-center w-full h-12">
                <img src="/loading.svg" class="w-16 h-10" alt="" />
              </div>
              <div
                class="flex justify-center w-full h-16 pt-4 font-medium bg-gray-400"
              >
                Loading assessment. please wait...
              </div>
            </div>
          </div> -->
    <table class="w-full mx-2 my-1 table-fixed md:max-h-72 ">
  <thead>
    <tr>
      <th class="w-3/5">Name</th>
      <th class="w-1/5">Price</th>
      <th class="w-1/5">Mrp</th>
    </tr>
  </thead>
  <tbody>
    <!-- <tr>
      <td>Intro to CSS</td>
      <td>Adam</td>
      <td>858</td>
    </tr> -->
    <tr class="" :key="index" v-for="(product,index) in products">
      <td><label class="inline-flex items-center">
                <input
                  type="checkbox"
                  :id="product.id"
                  :value="product.id"
                  v-model="product.relatedProducts"
                  class="w-4 h-4 text-gray-600 form-checkbox"
                  @change="onSaveProduct(product)"
                /><span class="ml-2 text-sm text-gray-700"
                  >{{product.name}}</span
                >
              </label></td>
      <td>{{product.price}}</td>
      <td>{{product.mrp}}</td>
    </tr>
    <!-- <tr>
      <td>Intro to JavaScript</td>
      <td>Chris</td>
      <td>1,280</td>
    </tr> -->
  </tbody>
</table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'


export default {
    created(){
      // console.log(typeof this.products[0].relatedProducts)
      console.log(this.products)
    },
     components: {
    XIcon
  },
    data(){
        return{
            // products:null
        }
    },
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
      products: {
      type: Array,
      default: [],
    },
  },
  methods:{
    onSaveProduct(product){
      console.log(product,'product')
      this.$emit('saveProduct',product)
    }
  }
}
</script>

<style scoped></style>
