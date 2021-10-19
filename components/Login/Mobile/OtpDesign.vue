<template>
  <div class="flex justify-center">
    <div class="p-1">
      <form
        id="enter-pin"
        class="flex flex-row flex-wrap items-center justify-center h-full space-x-3 w-96"
      >
        <span v-for="(input, index) in 4" :key="index">
          <input
            @keyup="handleInput($event, index, 4)"
            @keyup.backspace="removeItem($event, index, 4)"
            @paste="handlePaste(index)"
            autocomplete="off"
            @input="onEnterOtp(index)"
            v-model="value[index]"
            :ref="'content' + index"
            class="w-12 p-3 text-center bg-white border-gray-200 border-none rounded shadow-md appearance-none ring-1 ring-gray-100 focus:ring-primary-500 md:w-12"
            type="text"
            maxlength="1"
          />
        </span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
    }
  },
  methods: {
    onEnterOtp(i) {
      var Otp = ''
      if (i == 3) {
        this.value.forEach((val) => {
          Otp = Otp + val
        })
        this.$emit('verifyOtp', Otp)
      }
    },
    handlePaste(i) {
      for (let j = i; j < 4; j++) {
        this.$nextTick(() => {
          this.value[j] = ''
        })
      }
      setTimeout(() => {
        let data = this.value[i]
        for (let pos = i; (index = 0); pos < 3, pos++) {
          this.value[pos]
        }
        let pos = i
        let index = 0
        this.value.splice(i - 1, 4 - i + 1)
        while (pos <= 4) {
          this.value.push(data[index])
          index++
          pos++
        }
      }, 100)
    },
    removeItem(e, i, length) {
      if (i > 0) {
        var a = i - 1
        if (this.value[length - 1] != undefined) this.value.splice(i, 1)
        else {
          this.$refs['content' + a][0].focus()
          this.value.splice(a, 1)
        }
      }
    },
    handleInput(e, i, length) {
      if (
        i < length - 1 &&
        e.key != 'Backspace' &&
        this.value[i] != undefined
      ) {
        var a = i + 1
        this.$refs['content' + a][0].focus()
        this.$refs['content' + a][0].value = ''
      }
    },
  },
}
</script>
