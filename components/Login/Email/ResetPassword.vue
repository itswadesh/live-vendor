<template>
  <!-- component -->
  <div class="flex items-center min-h-screen p-4 bg-gray-200 lg:justify-center">
    <div
      class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
    >
      <div
        class="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
      >
        <div class="my-3 text-4xl font-bold tracking-wider text-center">
          <a href="#">Login</a>
        </div>
        <span class="mt-6 font-normal text-center text-gray-300 md:mt-0">
          Explore cart, wishlist, products, and more..
       </span>
        <span class="flex flex-col items-center justify-center mt-10 text-center">
          <span>Don't have an account?</span>
          <!-- go to register-page -->
          <nuxt-link :to="localePath('/register-page')">
            <a href="#" class="underline">Get Started!</a>
          </nuxt-link>
       </span>
        <span class="mt-6 text-sm text-center text-gray-300">
          Read our
          <a href="#" class="underline">terms</a> and
          <a href="#" class="underline">conditions</a>
       </span>
      </div>
      <div v-if="login" class="p-5 bg-white md:flex-1">
        <h3 class="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
        <form
          action="#"
          @submit.prevent="submit"
          class="flex flex-col space-y-5"
        >
          <div class="flex flex-col space-y-1">
            <label for="email" class="text-sm font-semibold text-gray-500"
              >Email address</label
            >
            <input
              type="email"
              id="email"
              v-model="login.email"
              autofocus
              required
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
            <!-- <div class="flex flex-col space-y-1">
              <span class="flex flex-row justify-between">
                <label for="otp" class="text-sm font-semibold text-gray-500">Enter OTP</label>
                <a
                  href="#"
                  class="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >Resend?</a>
              </span>
              <input
                type="number"
                id="otp"
                v-model="login.otp"
                autofocus
                required
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>-->
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="text-sm font-semibold text-gray-500"
                  >Password</label
                >
              </div>
              <input
                type="password"
                id="password"
                v-model="login.password"
                required
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="text-sm font-semibold text-gray-500"
                  >Confirm Password</label
                >
              </div>
              <input
                type="password"
                id="password"
                v-model="login.passwordConfirmation"
                required
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label for="remember" class="text-sm font-semibold text-gray-500"
                >Remember me</label
              >
            </div>
            <div>
              <button
                type="submit"
                class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-yellow-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import LOGIN from '~/gql/user/resetPassword.gql'
export default {
  data() {
    return {
      login: {
        password: '',
        passwordConfirmation: '',
        id: '',
        token: '',
        error: null,
      },
    }
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async submit() {
      let msg = 'Your New password created'
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: LOGIN,
            variables: this.login,
          })
        ).data.login
        this.success(msg)
      } catch (e) {
                this.$store.commit('setErr', e)

        this.setErr(e.toString())
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
