<template>
  <div>
    <OtpLogin v-if="settings.otpLogin" />
    <LoginEmailUserLogin v-else />
  </div>
</template>

<script>
import LoginEmailUserLogin from '~/components/Login/Email/UserLogin'
import OtpLogin from '~/components/Login/Mobile/OtpLogin'
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: 'Login',
    }
  },
  middleware: 'isGuest',
  components: {
    OtpLogin,
    LoginEmailUserLogin,
  },
  async asyncData({ params, app, store }) {
    const { title, keywords, description } = store.state.settings || {} // err = null
    return { title, keywords, description }
  },
  layout: 'none',
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
  head() {
    return {
      title: 'Login to ' + (this.settings || {}).shopName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to ' + (this.settings || {}).shopName,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: 'Login to ' + (this.settings || {}).shopName,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Login to ' + (this.settings || {}).shopName,
        },
        // Twitter
        {
          name: 'twitter:title',
          content: 'Login to ' + (this.settings || {}).shopName,
        },
        {
          name: 'twitter:description',
          content: 'Login to ' + (this.settings || {}).shopName,
        },
      ],
    }
  },
}
</script>
