<template>
<div class="container mx-auto">
 <div v-if="!signin">
    <form 
          novalidate
          autocomplete="off"
          action="#"
          @submit.stop.prevent="submit"
          class="container mx-auto space-y-3"
        >
        <span class="flex justify-center px-12 text-base font-thin text-center text-gray-400">Enter your personal details and start journey with us</span>
          <div class="flex flex-col space-y-2">
            <!-- first name -->
            <Textbox 
              label="First Name" 
              class="w-4/5 mx-auto"
              v-model="firstName"
              required
              autofocus
            />
            <!-- email -->
            <Textbox 
                type="email"
                id="email"
                label="Email" 
                class="w-4/5 mx-auto"
                v-model="email"
                required
                autofocus
              />
              <!-- password -->
              <Textbox 
                type="password"
                id="password"
                label="Password" 
                class="w-4/5 mx-auto"
                v-model="password"
                required
                autofocus
              />
          </div>
          <div class="msg">{{ msg }}</div>
          
          <div class="w-4/5 mx-auto mt-4">
            <button
            type="submit"
            :disabled="loading"
             class="flex justify-center w-full px-4 py-2 text-lg font-semibold transition-colors border-2 rounded-md shadow border-primary-500 focus:outline-none focus:ring-primary-500 focus:ring-2"
             :class="
             loading ? 'text-white bg-gray-500' : 'bg-primary-500 text-white'
            ">
              <span v-if="!loading" class="text-base font-light uppercase text-normal">Sign Up</span>
              <span v-else>
                <svg
                    class="w-6 h-6 text-white -ms-1 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
               </span>
            </button>
          </div>
        </form>
        <div class="flex justify-center">
            <button @click="signin=!signin" class="px-12 my-1 focus:outline-none">
              <span class="p-1 my-1 mt-5 text-base font-medium cursor-pointer text-primary-200 hover:text-primary-500 lg:mt-3 hover:underline">Sign In</span>
            </button>
        </div>
    </div>
    <div v-else>
        <EnterEmail />
    </div>
 </div>
</template>
<script>
import { Textbox } from '~/shared/components/ui'

import EnterEmail  from '~/components/Login/Email/EnterEmail'
import { mapGetters } from 'vuex'
export default {
  components: { EnterEmail, Textbox },
  head() {
    return {
      signin:false,
      title: 'SingUp',
    }
  },
  middleware: ['isGuest'],
  data() {
    return {
      firstName: '',
      // lastName: '',
      email: '',
      password: '',
      // passwordConfirmation: '',
      role: 'vendor',
      loading: false,
      fadeIn: '',
      disable: 'disable',
      showOTP: false,
      msg: null,
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    async submit() {
      try {
        const data = await this.$store.dispatch('auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          role: this.role,
        })
        if (data) {
          this.$store.commit('success', 'Signup Successful')
          let referrer = this.$route.query.referrer || '/'
          if (referrer) this.$router.push(referrer)
        }
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
      }
    },
  },
  computed: {
    ...mapGetters({ settings: 'settings', error: 'error' }),
  },
  layout: 'none',
  head() {
    return {
      title: `SignUp for ${this.settings.websiteName}`,
    }
  },
}
</script>
