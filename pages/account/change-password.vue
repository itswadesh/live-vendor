<<<<<<< HEAD
<template>
  <section
    class="
      flex flex-col
      items-center
      justify-center
      h-screen
      p-2
      text-center text-gray-600
      bg-gradient-to-br
      from-secondary-100
      to-primary-100
    "
  >
    <div class="w-full max-w-sm mx-auto">
      <div class="p-2.5 md:p-0 frosted rounded-md shadow-md">
        <!-- Login side start  -->

        <div class="py-10 mx-auto text-center md:w-10/12">
          <nuxt-link to="/" class="">
            <span
              class="
                text-4xl
                font-extrabold
                text-transparent
                bg-clip-text bg-gradient-to-br
                from-secondary-500
                to-primary-500
              "
              >Litekart</span
            >
          </nuxt-link>
          <div>
            <div class="my-5 font-semibold">CHANGE PASSWORD</div>

            <form
              ref="form"
              novalidate
              autocomplete="off"
              :lazy-validation="true"
              class="flex flex-col my-5 space-y-5"
              @submit.stop.prevent="submit"
            >
              <Textbox
                v-model="oldPassword"
                v-validate="'required'"
                class="w-full"
                :type="showOldPassword ? 'text' : 'password'"
                prepend-icon="lock"
                :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
                name="oldPassword"
                placeholder="Current Password"
                autofocus
                @click:append="showOldPassword = !showOldPassword"
              />
              <Textbox
                v-model="password"
                v-validate="'required'"
                class="w-full"
                :type="showNewPassword ? 'text' : 'password'"
                prepend-icon="lock"
                :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                placeholder="New Password"
                name="newPassword"
                @click:append="showNewPassword = !showNewPassword"
              />
            </form>
            <GrnIndGradiantButton
              class="w-full mt-10"
              type="submit"
              :disabled="loading"
            >
              Update Password
            </GrnIndGradiantButton>
          </div>
        </div>

        <!-- Login side end -->
      </div>
    </div>
  </section>
</template>

<script>
import { Textbox } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
// const Submit = () => import('~/shared/components/ui/Submit')

export default {
  components: { Textbox, GrnIndGradiantButton },
  middleware: ['isAuth'],
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      valid: true,
      loading: false,
      password: '',
      oldPassword: '',
      passwordConfirmation: '',
    }
  },
  head() {
    return {
      title: 'Change Password',
    }
  },
  methods: {
    hide(e) {
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hide', true)
    },
    submit() {
      if (!this.password || this.password.oldPassword === '') {
        this.$store.commit('setErr', 'Current Password can not be blank')
        return
      } else if (!this.password || this.password.newPassword === '') {
        this.$store.commit('setErr', 'New Password can not be blank')
        return
      }
      try {
        this.$store.dispatch('auth/changePassword', {
          oldPassword: this.oldPassword,
          password: this.password,
          passwordConfirmation: this.password,
        })
        this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>
=======
<template>
  <section
    class="
      flex flex-col
      items-center
      justify-center
      h-screen
      p-2
      text-center text-gray-600
      bg-gradient-to-br
      from-secondary-100
      to-primary-100
    "
  >
    <div class="w-full max-w-sm mx-auto">
      <div class="p-2.5 md:p-0 frosted rounded-md shadow-md">
        <!-- Login side start  -->

        <div class="py-10 mx-auto text-center md:w-10/12">
          <nuxt-link to="/" class="">
            <span
              class="
                text-4xl
                font-extrabold
                text-transparent
                bg-clip-text bg-gradient-to-br
                from-secondary-500
                to-primary-500
              "
              >Litekart</span
            >
          </nuxt-link>
          <div>
            <div class="my-5 font-semibold">CHANGE PASSWORD</div>

            <form
              ref="form"
              novalidate
              autocomplete="off"
              :lazy-validation="true"
              class="flex flex-col my-5 space-y-5"
              @submit.stop.prevent="submit"
            >
              <Textbox
                v-model="oldPassword"
                v-validate="'required'"
                class="w-full"
                :type="showOldPassword ? 'text' : 'password'"
                prepend-icon="lock"
                :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
                name="oldPassword"
                placeholder="Current Password"
                autofocus
                @click:append="showOldPassword = !showOldPassword"
              />
              <Textbox
                v-model="password"
                v-validate="'required'"
                class="w-full"
                :type="showNewPassword ? 'text' : 'password'"
                prepend-icon="lock"
                :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                placeholder="New Password"
                name="newPassword"
                @click:append="showNewPassword = !showNewPassword"
              />
            </form>
            <GrnIndGradiantButton
              class="w-full mt-10"
              type="submit"
              :disabled="loading"
            >
              Update Password
            </GrnIndGradiantButton>
          </div>
        </div>

        <!-- Login side end -->
      </div>
    </div>
  </section>
</template>

<script>
import { Textbox } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
// const Submit = () => import('~/shared/components/ui/Submit')

export default {
  components: { Textbox, GrnIndGradiantButton },
  middleware: ['isAuth'],
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      valid: true,
      loading: false,
      password: '',
      oldPassword: '',
      passwordConfirmation: '',
    }
  },
  head() {
    return {
      title: 'Change Password',
    }
  },
  methods: {
    hide(e) {
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hide', true)
    },
    submit() {
      if (!this.password || this.password.oldPassword === '') {
        this.$store.commit('setErr', 'Current Password can not be blank')
        return
      } else if (!this.password || this.password.newPassword === '') {
        this.$store.commit('setErr', 'New Password can not be blank')
        return
      }
      try {
        this.$store.dispatch('auth/changePassword', {
          oldPassword: this.oldPassword,
          password: this.password,
          passwordConfirmation: this.password,
        })
        this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>
>>>>>>> badec6a7c7866410bc7a03a2550fdb8b105fa36a
