<template>
  <section class="px-2 py-12 bg-white lg:px-8">
    <!-- Header div start  -->
    <div>
      <h1 class="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
        Profile
      </h1>
    </div>
    <!-- Header div end -->

    <!-- Profile name and credentials start  -->
    <div class="mt-8 text-gray-800 bg-gray-200 rounded-sm">
      <h2
        class="p-4 text-lg font-semibold tracking-wider border-b border-gray-50"
      >
        Profile name and credentials
      </h2>

      <div class="py-4">
        <div class="items-center p-2 md:flex">
          <div class="w-full text-sm md:px-4 md:w-3/12">First Name</div>
          <div class="w-full md:w-9/12">
            <div class="max-w-sm mt-2 md:mt-0">
              <Textbox v-model="profile.firstName" @change="save(profile)" />
            </div>
          </div>
        </div>
        <div class="items-center p-2 md:flex">
          <div class="w-full text-sm md:px-4 md:w-3/12">Last Name</div>
          <div class="w-full md:w-9/12">
            <div class="max-w-sm mt-2 md:mt-0">
              <Textbox v-model="profile.lastName" @change="save(profile)" />
            </div>
          </div>
        </div>
        <div class="p-2 md:flex lg:items-center">
          <div class="w-full text-sm md:px-4 md:w-3/12">Community username</div>
          <div class="items-center w-full lg:flex md:w-9/12">
            <div class="max-w-sm mt-2 md:w-96 md:mt-0">
              <Textbox v-model="profile.username" @change="save(profile)" />
            </div>
            <h6 class="my-2 text-xs text-gray-600 lg:ml-5">
              Username for community forums
            </h6>
          </div>
        </div>
        <div class="items-center p-2 md:flex">
          <div class="w-full text-sm md:px-4 md:w-3/12">Your email</div>
          <div class="w-full md:w-9/12">
            <div class="max-w-sm mt-2 md:mt-0">
              <Textbox v-model="profile.email" @change="save(profile)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Profile name and credentials end  -->

    <!-- Your password start  -->
    <!-- <div class="mt-4 text-gray-800 bg-gray-200 rounded-sm">
      <h2
        class="p-4 text-lg font-semibold tracking-wider border-b border-gray-50"
      >
        Your password
      </h2>

      <div class="py-4">
        <div class="flex items-center p-2">
          <div class="w-2/12 pl-4 text-sm">Old password</div>
          <div class="w-10/12">
            <div class="w-96">
              <Textbox v-model="oldPassword" />
            </div>
          </div>
        </div>
        <div class="flex items-center p-2">
          <div class="w-2/12 pl-4 text-sm">New password</div>
          <div class="flex items-center w-10/12">
            <div class="w-96">
              <Textbox v-model="newPassword" />
            </div>
            <span class="ml-5 text-xs text-gray-600">
              The password must be at least 6 characters long</span
            >
          </div>
        </div>
        <div class="flex items-center p-2">
          <div class="w-2/12 pl-4 text-sm">Retype password</div>
          <div class="w-10/12">
            <div class="w-96">
              <Textbox v-model="retypePassword" />
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- Your password end -->

    <!-- Close account start  -->
    <div class="mt-4 mb-40 text-gray-800 bg-gray-200 rounded-sm">
      <h2
        class="p-4 text-lg font-semibold tracking-wider border-b border-gray-50"
      >
        Close account
      </h2>

      <div class="py-4 pl-6">
        <h6 class="text-xs text-gray-600">
          Your account will be closed permanently. Your Litekart store will be
          shut down.
        </h6>
        <button
          class="
            px-4
            py-2
            my-5
            text-sm
            font-semibold
            transition
            duration-300
            bg-white
            border-2 border-gray-400
            rounded-md
            shadow-md
            hover:border-brand-700
            focus:outline-none
            hover:text-white hover:bg-brand-700
          "
        >
          Close my acount
        </button>
      </div>
    </div>
    <!-- Close account end -->
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Textbox from '~/components/ui/Textbox'

export default {
  components: { Textbox },
  middleware: ['isAuth'],
  data() {
    return {
      errors: {},
      valid: true,
      profile: {},
      user: null,
      showImageModal: false,
    }
  },
  head() {
    return {
      title: 'Update profile',
    }
  },
  computed: {
    ...mapGetters({ loading: 'loading' }),
  },
  async created() {
    const userDetails = await this.$store.dispatch('auth/fetch')
    this.profile = Object.assign({}, userDetails)
  },
  methods: {
    ...mapActions({ updateProfile: 'auth/updateProfile' }),
    save(profile) {
      try {
        delete profile.address
        delete profile.info.__typename
        // console.log('M', profile)

        this.$store.commit('clearErr')
        this.updateProfile(profile)
        this.$router.push('/')
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
.width {
  min-width: max-content;
}
</style>
