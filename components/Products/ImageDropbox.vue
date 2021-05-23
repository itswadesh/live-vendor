<template>
  <form
    enctype="multipart/form-data"
    novalidate
    class="border-2 border-gray-300 border-dashed group hover:border-blue-600 h-36 w-36"
  >
    <div class="relative">
      <input
        type="file"
        multiple
        :name="uploadFieldName"
        :disabled="isSaving"
        @change="uploadPhoto"
        accept="image/*"
        class="absolute z-10 opacity-0 h-36 w-36"
      />

      <div class="absolute top-5 left-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mx-auto text-gray-300 group-hover:text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <h5
          class="mt-5 text-xs text-center text-gray-400 group-hover:text-blue-600"
        >
          Upload Image
        </h5>
      </div>
      <!-- <PlusIcon class="absolute top-0 mt-6 text-teal-600" /> -->
      <!-- <div class="mt-8 font-semibold text-center text-teal-600">Upload Image</div> -->
      <!-- <p v-if="isInitial">
          {{ t('Drag your file(s) here to upload or click to browse') }}
        </p>
        <p v-if="isSaving">
          {{ t('Uploading') }} {{ fileCount }} {{ t('files...') }}
        </p>
        <div v-if="isSuccess">
          <h2>{{ t('Files uploaded successfully') }}.</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">{{
              t('Upload again')
            }}</a>
          </p>
        </div>
        <p v-if="isFailed">
          <i class="redd"
            >{{ t('Upload failed') }}:
            {{ uploadError && uploadError.data.message }}
            <a href="javascript:void(0)" @click="reset()">{{
              t('Try again')
            }}</a>
          </i>
        </p> -->
    </div>
  </form>
  <!-- <div row wrap>
      <image-gallery
        :banners="true"
        :images.sync="myImages"
        @deleteImage="removeImage"
        @save="save"
        @setPrimary="setPrimary"
        :primaryImage="primaryImage"
        :imageFromObject="true"
      />
    </div> -->
</template>

<script>
// import ImageGallery from '~/components/ImageGallery'
import { union } from 'lodash'
import { PlusIcon, SquareIcon, CheckSquareIcon } from 'vue-feather-icons'

import fileUpload from '~/gql/file/fileUpload.gql'
import DELETE_FILE from '~/gql/product/deleteFile.gql'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3
export default {
  components: { PlusIcon, SquareIcon, CheckSquareIcon },
  // name required for removing
  props: {
    images: { required: true },
    primaryImage: { type: String },
    name: { type: String, required: true },
    folder: { type: String, required: true },
    crunch: { type: Boolean, default: false },
    product: { type: Object, default: true },
  },
  data() {
    return {
      uploadCount: 0,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: 0,
      uploadFieldName: 'photos',
      showImageModal: false,
      showDeleteBtn: false,
    }
  },
  computed: {
    myImages: {
      get: function () {
        return this.images
      },
      set: function (value) {
        this.$emit('update:images', value)
      },
    },
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
  },
  methods: {
    setPrimary(i) {
      this.image = i
      this.$emit('setPrimaryImage', i)
    },
    save(images) {
      // this.images = images
      this.$emit('save', this.name, images)
    },
    async uploadPhoto({ target }) {
      console.log('on upload photo')
      try {
        this.$store.commit('clearErr')
        let images = (
          await this.$apollo.mutate({
            mutation: fileUpload,
            variables: { files: target.files, folder: this.folder },
            fetchPolicy: 'no-cache',
          })
        ).data.fileUpload
        console.log(images)
        const imgs = images.map((o) => o.filename)
        const imageUrls = images.map((o) => o.url)
        this.product.images.push(imageUrls[0])
        // this.product.img=imageUrls[0]
        this.$emit('saveImage', this.product)
        // this.$emit('save', this.name, imgs, imageUrls)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    async removeImage(image) {
      await this.$apollo.mutate({
        mutation: DELETE_FILE,
        variables: { path: image },
        fetchPolicy: 'no-cache',
      })
      this.$emit('remove', image)
    },
  },
}
</script>

<style scoped></style>
