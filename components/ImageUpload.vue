<template>
  <div class="mx-auto">
    <div v-if="$apollo.loading">Loading...</div>
    <div
      v-if="img"
      class="relative h-64 bg-no-repeat bg-contain preview-img-item"
    >
      <img :src="img" class="w-full h-full" />
      <!-- @click="$photoswipe.open(0, [{ src: img, w: 1024, h: 768 }])" -->
      <!-- <v-btn
        v-if="!multi"
        type="button"
        @click="removeImage(img)"
        dark
        top
        right
        class="absolute top-0 right-0 w-8 h-8 bg-gray-300 rounded-full cursor-pointer fab hover:bg-gray-200"
      >
        <v-icon>close</v-icon>
      </v-btn> -->
      <span
        @click="removeImage(img)"
        class="absolute flex items-center justify-center p-1 text-white transition duration-300 transform bg-black rounded-full cursor-pointer w-7 h-7 hover:scale-110 top-2 right-2"
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
            stroke-width="2.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </div>
    <form enctype="multipart/form-data" novalidate v-else>
      <div class="dropbox">
        <input
          :multiple="multi"
          type="file"
          name="photos"
          :disabled="isSaving"
          @change="uploadPhoto"
          accept="image/*"
          class="input-file"
        />
        <div class="mx-4">
          <p v-if="isInitial">
            Drag {{ name }} here to upload <br />or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">{{ fileCount }} files uploaded successfully...</p>
          <p v-if="isFailed">
            Upload failed. Please
            <a @click="currentStatus = 0">try again</a>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'

import fileUpload from '~/gql/file/fileUpload.gql'
import deleteFile from '~/gql/product/deleteFile.gql'
// import { XIcon } from 'vue-feather-icons'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3
export default {
  // name required for removing
  props: {
    placeholder: { required: false, default: 'img' },
    image: { required: false, default: '' },
    name: { type: String, required: false, default: 'banner' },
    folder: { type: String, required: false, default: 'img' },
    crunch: { type: Boolean, required: false, default: false },
    multi: { type: Boolean, required: false, default: false },
  },
  watch: {
    image() {
      this.img = this.image
    },
  },
  components: { XIcon },
  data() {
    return {
      img: null,
      currentStatus: 0,
      data: null,
      error: null,
    }
  },
  mounted() {
    this.img = this.image
  },
  computed: {
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
    async uploadPhoto({ target }) {
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
        images = images.map((o) => o.url)
        console.log(images[0])
        if (!this.multi) {
          this.img = images[0]
          this.$emit('save', this.name, this.img)
        } else {
          this.$emit('save', this.name, images)
        }
      } catch (e) {
        console.log('err... ', e)
        this.$store.commit('setErr', e)
      }
    },
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    save(imagePath) {
      this.img = imagePath
      this.$emit('save', this.name, imagePath)
    },
    removeImage(image) {
      let vm = this
      //   this.$swal({
      //     title: 'Delete image?',
      //     text: "You won't be able to revert this!",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes, delete it!',
      //   }).then((result) => {
      //     if (result.value) {
      //       vm.deleteConfirmed(image)
      //     }
      //   })
      vm.deleteConfirmed(image)
    },
    async deleteConfirmed(image) {
      try {
        this.$store.commit('clearErr')
        this.img = ''
        await this.$apollo.mutate({
          mutation: deleteFile,
          variables: { url: image },
          fetchPolicy: 'no-cache',
        })
        this.$emit('remove', this.name, this.img)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
}
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  opacity: 0.8; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.mt-4 {
  margin-top: 1rem;
}
.bg-gray-100 {
  background-color: gray;
}
.h-64 {
  height: 16rem;
}
.bg-contain {
  background-size: contain;
}
</style>
