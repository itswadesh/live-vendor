<template>
  <div class="w-full pr-4 rounded lg:pr-0 lg:w-2/3 lg:ml-44">
    <div v-if="isFocused" @click="onUnfocused" class="fixed inset-0 w-screen h-screen bg-gray-500"></div>
    <div class="z-50 flex flex-col justify-center w-full">
      <div class="relative flex flex-wrap rounded">
        <form @submit.prevent="onSubmit" class="w-full">
          <input
            @focus="onFocused()"
            @input="getData()"
            placeholder="Search For Toys"
            @keyup="onSelectValue($event)"
            v-model="selectedVal"
            class="w-full p-2 pl-4 font-light border-0 rounded text-normal placeholder focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-yellow-600"
          />
        </form>
        <div
          v-if="isFocused"
          style="z-index: 9999"
          class="w-full mt-1 overflow-auto bg-white border-gray-400 rounded shadow"
        >
          <div
            :class="{ 'bg-gray-300': selectedIndex == i }"
            v-for="(v, i) in products"
            :key="i"
            @click="onselect(v)"
            class="flex items-center w-full text-sm font-thin text-gray-400 border-b cursor-pointer hover:bg-gray-100"
          >
           <img v-lazy="v._source.img" :key="v._id" alt="" class="object-contain w-12 h-10 mx-2" />
            <p class="p-3 "> {{ v._source.name }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
      selectedVal: null,
      isFocused: false,
      product: null,
      selectedIndex: -1,
    }
  },
  methods: {
    onSubmit() {
      this.onUnfocused()
      if(this.product)
      this.$router.push(`/${this.product._source.slug}?id=${this.product._id}`)
      else
      this.$router.push(this.selectedVal)
    },
    async onselect(val) {
      // console.log(val)
      this.fillValue(val)
      this.onUnfocused()
    
      this.$router.push(`/${this.product._source.slug}?id=${this.product._id}`)
      // console.log(this.selectedVal)
    },
    async fillValue(val){
  this.product = val
      this.selectedVal = this.product._source.name
    },
    async onSelectValue(e) {
      // console.log(e);
      if (this.isFocused) {
        if (e.key == 'ArrowDown') {
          if (this.selectedIndex < this.products.length) {
            this.selectedIndex++
            this.fillValue(this.products[this.selectedIndex])
          } else {
            this.selectedIndex = 0
          }
        } else if (e.key == 'ArrowUp') {
          if (this.selectedIndex >= 0) {
            this.selectedIndex--
            this.fillValue(this.products[this.selectedIndex])
          }
        } else if (e.key == 'Escape') {
          this.isFocused = false
          this.selectedIndex = -1
        } else {
          this.selectedIndex=-1
          // this.selectedVal=null
          this.product=null
        }
      }
    },
    async getData() {
      if(this.selectedVal == null || this.selectedVal == ''  ) return
      try {
        const result = await this.$axios.$get('/api/products/autocomplete', {
          params: { q: this.selectedVal },
        })
        console.log(result)
        this.products = result.data
      } catch (e) {
        console.log(e)
      } finally {
      }
    },
    onFocused() {
      this.isFocused = true
      this.getData()
    },
    onUnfocused() {
      this.isFocused = false
      this.selectedIndex = -1
      console.log(this.isFocused, this.selectedIndex)
      return
    },
  },
}
</script>
