<template>
  <div class="flex flex-col justify-center">
    <div class="w-1/4 flex flex-wrap  relative">
      <input
        @blur="onUnfocused()"
        @focus="onFocused()"
        placeholder="enter text"
        @keyup="onSelectValue($event)"
        v-model="selectedVal"
        class="border border-gray-600 rounded w-full"
      />
      <div
        v-if="isFocused"
        class="w-full  rounded shadow border-gray-400  overflow-auto"
      >
        <div
          :class="{ 'bg-gray-300': selectedIndex == i }"
          v-for="(v, i) in products"
          :key="i"
          class="w-full  hover:bg-gray-300 border-b border-gray-600 text-black flex items-center "
        >
          {{ v._source.name }}
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
      selectedIndex: -1,
      values: [
        "val-1",
        "val-2",
        "val-3",
        "val-4",
        "val-5",
        "val-6",
        "val-7"
        // 'val-8',
        // 'val-9',
        // 'val-10',
        // 'val-11',
        // 'val-12',
        // 'val-13',
        // 'val-14',
        // 'val-15',
        // 'val-16',
        // 'val-17',
        // 'val-18',
        // 'val-19',
      ]
    };
  },
  methods: {
    async onSelectValue(e) {
      console.log(e);
      if (this.isFocused) {
        if (e.key == "ArrowDown") {
          if (this.selectedIndex < this.values.length) {
            this.selectedIndex++;
            this.selectedVal = this.values[this.selectedIndex];
          } else {
            this.selectedIndex = 0;
          }
        } else if (e.key == "ArrowUp") {
          if (this.selectedIndex >= 0) {
            this.selectedIndex--;
            this.selectedVal = this.values[this.selectedIndex];
          }
        } else if (e.key == "Escape") {
          this.isFocused = false;
          this.selectedIndex = -1;
          //             if(this.selectedIndex>=0){
          //     this.selectedIndex--
          //     this.selectedVal=this.values[this.selectedIndex]
          // }
        } else {
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
        }
      }
    },
    onFocused() {
      this.isFocused = true;
    },
    onUnfocused() {
      this.isFocused = false;
      this.selectedIndex = -1;
    }
  }
};
</script>
