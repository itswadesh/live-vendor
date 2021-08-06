<template></template>
<script>
import googleOneTap from 'google-one-tap'
export default {
  mounted() {
    const options = {
      client_id:
        '414060469322-n4raqj2rdbjhegvrtdk6mhbdm4sd0oc7.apps.googleusercontent.com', // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: 'signin', // optional
    }
    googleOneTap(options, (response) => {
      // Send response to server
      console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', response)
      this.$axios.$post('/api/auth/google/onetap')
    })
  },
}
</script>
