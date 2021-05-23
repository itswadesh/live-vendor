<template>
  <section
    class="h-screen bg-gradient-to-br from-red-600 via-yellow-600 to-purple-600"
  >
    <div class="container mx-auto xl:max-w-4xl py-14">
      <div class="flex frosted rounded-xl">
        <!-- Image side start  -->
        <div class="w-1/2">
          <img
            src="/working-team.jpg"
            alt=""
            class="object-cover h-150 rounded-l-xl"
          />
        </div>
        <!-- Image side end -->
        <!-- Login side start  -->
        <div class="w-1/2">
          <div class="m-4 ml-auto max-w-max">
            <button
              type="button"
              @click="hide(null)"
              class="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-400 transform hover:scale-105 w-9 h-9"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-col mt-5">
            <nuxt-link to="/" class="text-center">
              <span
                class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-yellow-600"
                >Litekart</span
              >
            </nuxt-link>
            <div v-if="!isRequestSent" class="mt-5">
              <EnterMobileNumber :phone="phone" @sendOtp="onSendOtp" />
            </div>
            <!--enter otp -->
            <div v-else class="mt-5">
              <EnterOtp
                :country_code="country_code"
                :phone="phone"
                @reRequest="isRequestSent = false"
              />
            </div>
          </div>
          <!-- bottom text -->
          <div class="mx-5 mt-5 text-sm text-center text-gray-600">
            <span class="text-center">
              When you click on an
              <b class="text-gray-500 spanx-1">
                "I agree to the terms and conditions"
              </b>
              checkbox, it is seen by the legal authorities as the user's assen
            </span>
          </div>
        </div>
        <!-- Login side end -->
      </div>
    </div>
  </section>
</template>

<script>
import EnterOtp from "./EnterOtp";
import EnterMobileNumber from "./EnterMobileNumber";

export default {
  components: { EnterMobileNumber, EnterOtp },
  data() {
    return {
      isRequestSent: false,
      phone: null,
      country_code: null,
    };
  },
  computed: {
    settings() {
      return this.$store.state.settings || {};
    },
  },
  methods: {
    hide(e) {
      if (e) this.$router.push(`/c/${e}`);
      this.$emit("hide", true);
    },
    onSendOtp(val) {
      this.phone = val.phone;
      this.country_code = val.country_code;
      this.isRequestSent = true;
    },
  },
};
</script>
<style scoped>
.frosted {
  /* background-color:rgb(150, 139, 224); */
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
