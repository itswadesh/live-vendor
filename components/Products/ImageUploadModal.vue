<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div
      class="fixed z-50 min-h-screen text-center"
      :class="{ 'inset-0': showModal }"
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
          class="absolute bg-gray-800 opacity-75"
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
          'ease-in duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95': !showModal,
        }"
        class="inline-block overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="relative m-6 bg-white">
          <svg
            @click="$emit('closeModal')"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute top-0 right-0 w-6 h-6 text-gray-600 transform cursor-pointer hover:scale-95"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <div class="">
            <div class="flex flex-col justify-center w-full">
              <img :src="image" class="mb-4 w-36 h-36" alt="" />
              <Textbox
                label="Name"
                palceholder="Image Url"
                v-model="image"
                class="mb-4"
              />
              <span
                @click="$emit('saveImage', image)"
                class="py-2 text-center text-white rounded-md cursor-pointer bg-accent-400 hover:bg-accent-600"
                >Save Image</span
              >
            </div>
            <!-- <div
                class="flex justify-center w-full h-16 pt-4 font-medium bg-gray-400"
              >
            
              </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Textbox from '~/components/ui/Textbox'

export default {
  components: {
    Textbox,
  },
  data() {
    return {
      image: null,
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped></style>
