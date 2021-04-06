<template>
<div class="full">
      <!-- <div class="top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen" @click="onUnfocused()"></div> -->
    <div @click="onUnfocused" class="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen"></div>
 
  <div class="z-50 flex flex-col justify-center">
    <div class="relative flex flex-wrap w-1/4">
    <form @submit.prevent="onSubmit">
      <input
        @focus="onFocused()"
        @input="getData()"
        placeholder="enter text"
        @keyup="onSelectValue($event)"
        v-model="selectedVal"
        class="w-full border border-gray-600 rounded"
      />
    </form>
      <div
        v-if="isFocused"
        style="z-index:9999"
        class="w-full overflow-auto border-gray-400 rounded shadow"
      >
        <div
          :class="{ 'bg-gray-300': selectedIndex == i }"
          v-for="(v, i) in products"
          :key="i"
          @click="onselect(v)"
          class="flex items-center w-full text-black border-b border-gray-600 cursor-pointer hover:bg-gray-300"
        >
          {{ v._source.name }}
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
      product:null,
      selectedIndex: -1,
    };
  },
  methods: {
      onSubmit(){
        this.$router.push(`${this.product._source.slug}?id=${this.product._id}`)  
      },
     async onselect(val){
          // console.log(val)
          await this.onUnfocused()
          this.product=val
          this.selectedVal=this.product._source.name
          this.$router.push(`/${this.product._source.slug}?id=${this.product._id}`)
          // console.log(this.selectedVal)
      },
    async onSelectValue(e) {
      // console.log(e);
      if (this.isFocused) {
        if (e.key == "ArrowDown") {
          if (this.selectedIndex < this.products.length) {
            this.selectedIndex++;
            this.onselect(this.products[this.selectedIndex])
          } else {
            this.selectedIndex = 0;
          }
        } else if (e.key == "ArrowUp") {
          if (this.selectedIndex >= 0) {
            this.selectedIndex--;
            this.onselect(this.products[this.selectedIndex])

          }
        } else if (e.key == "Escape") {
          this.isFocused = false;
          this.selectedIndex = -1;
        } else {
       
        }
      }
    },
    async getData(){
           try {
            const result = await this.$axios.$get(
              "/api/products/autocomplete",
              {
                params: { q: this.selectedVal }
              }
            );
            this.products = result.data;
          } catch (e) {
          } finally {
          }
    },
    onFocused() {
      this.isFocused = true;
      this.getData()
    },
    onUnfocused() {
      this.isFocused = false;
      this.selectedIndex = -1;
      console.log(this.isFocused,this.selectedIndex)
      return
    }
  }
};
</script>
