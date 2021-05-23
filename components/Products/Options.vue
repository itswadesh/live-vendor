<template>
  <div class="flex">
    <div class="bg-white border rounded-md shadow-md">
      <div class="flex p-5 space-x-3">
        <div>
          <h6 class="text-sm font-semibold text-gray-800">Options({{product.options.length}})</h6>
        </div>
        <div>
          <h6 class="text-sm font-semibold text-gray-800">Variations</h6>
        </div>
      </div>

      <div class="flex flex-wrap px-5">
        <button
          type="button"
          @click="addNewOption"
          class="flex items-center justify-center px-3 mb-3 mr-2 space-x-1 text-xs font-semibold text-white bg-blue-500 border border-gray-500 rounded-md shadow focus:outline-none hover:shadow-lg hover:bg-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <div>Add New Option</div>
        </button>
        <button
          type="button"
          @click="deleteOption"
          class="flex items-center justify-center px-2 py-2 mb-3 mr-3 text-xs font-semibold text-gray-800 bg-white border border-gray-500 rounded-md shadow focus:outline-none hover:shadow-lg hover:bg-gray-200"
        >
          Delete Option
        </button>
      </div>

      <div class="px-5 py-2">
        <div class="mb-2 bg-gray-200">
          <div class="flex">
            <div class="w-1/5 mb-auto">
              <div
                :key="index"
                v-for="(option, index) in product.options"
                :class="{ 'bg-gray-300': selectedOptionIndex == index }"
                class="w-full py-2 pl-4 text-blue-500 border-l-4 border-blue-500 hover:bg-gray-300"
              >
                <h6
                  class="text-sm font-bold cursor-pointer"
                  @click="onSelectOption(option, index)"
                >
                  {{ option && option.name }}
                </h6>
              </div>
              <!-- <div class="bg-gray-300 h-96"></div> -->
            </div>
            <div class="w-4/5 bg-gray-100" v-if="selectedOption">
              <div class="flex items-center justify-between px-4 py-2">
                <div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Option name</h4>
                  </div>
                  <div class="mt-1">
                    <Textbox
                      placeholder="Size"
                      v-model="selectedOption.name"
                      @blur="save(selectedOption)"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Input type</h4>
                  </div>
                  <div class="mt-1">
                    <select
                      @change="$emit('saveProduct',product)"
                      v-model="selectedOption.type"
                      class="border-gray-500 rounded-md appearance-none"
                    >
                      <option :value="null">Select any option</option>
                      <option
                        :value="type.val"
                        :key="index"
                        v-for="(type, index) in types"
                      >
                        {{ type.name }}
                      </option>
                      <!-- <option>Radio button</option> -->
                    </select>
                  </div>
                </div>
              </div>
              <label class="inline-flex items-center pl-5">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-gray-600 form-checkbox"
                  checked
                  @change="save(selectedOption)"
                  v-model="selectedOption.preselect"
                /><span class="ml-2 text-sm text-gray-700"
                  >Do not preselect default value</span
                >
              </label>
              <div class="m-4">
                <button
                  @click="onCreateOptionValue()"
                  type="button"
                  class="flex items-center justify-center px-3 py-1 mb-3 mr-2 space-x-1 text-xs font-semibold bg-white border border-gray-500 rounded-md shadow-md focus:outline-none hover:shadow-lg hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <div>Add New Value</div>
                </button>
              </div>
              <!-- table starts  -->

              <div class="m-4">
                <table class="w-full text-xs border-b-2">
                  <thead class="font-semibold text-white bg-gray-600">
                    <tr>
                      <td class="py-2 pl-24">Option values</td>
                      <td class="py-2 pl-10">Price modifier</td>
                      <td class="py-2">Default Value</td>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y-2">
                    <tr
                      :key="index"
                      v-for="(value, index) in selectedOption.values"
                    >
                      <td>
                        <Textbox
                          type="text"
                          placeholder="S"
                          @blur="saveOptionValue(value)"
                          v-model="value.name"
                        />
                      </td>
                      <td>
                        <div class="flex items-center space-x-1">
                          <select class="w-12 appearance-none">
                            <option :value="null">Select Direction</option>
                            <option value="+">+</option>
                            <option value="-">-</option>
                          </select>
                          <select class="w-12 appearance-none">
                            <option>+</option>
                            <option>-</option>
                          </select>
                          <input
                            class="w-12 placeholder-gray-400 border-gray-400 rounded-md"
                            type="text"
                            placeholder="0.00"
                            @blur="saveOptionValue(value)"
                            v-model="value.amount"
                          />
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center mx-auto w-14">
                          <Textbox
                            @change="save(selectedOption)"
                            type="radio"
                            v-if="selectedOption.preselect"
                            v-model="selectedOption.default_option"
                            :value="value.id"
                            :id="selectedOption.default_option"
                          />
                          <svg
                            @click="deleteOptionValue(value.id)"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 ml-2 text-center text-blue-500 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-20">
                <img class="mx-auto w-96" src="/a/shirt.jpg" alt="shirt" />
              </div>
              <div class="mt-6">
                <h6 class="font-semibold text-center text-gray-700">
                  Try Product Variations
                </h6>
                <p class="px-10 my-3 text-sm text-center text-gray-600">
                  Looking to add stock control, images, SKUs and prices to
                  product options? Product variations let you specify these
                  details for each combination of product options individually.
                </p>
                <p class="mb-6 text-sm text-center text-blue-600">
                  Manage Product Variations
                </p>
              </div>
            </div>
            <div class="h-4 bg-white"></div>
          </div>
          <div class="h-4 bg-white"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SAVE_OPTION from '~/gql/option/saveOption.gql'
import SAVE_OPTION_VALUE from '~/gql/optionValue/saveOptionValue.gql'
import REMOVE_OPTION_VALUE from '~/gql/optionValue/removeOptionValue.gql'
import REMOVE_OPTION from '~/gql/option/removeOption.gql'
import Textbox from '~/components/ui/Textbox'
export default {
  components: {
    Textbox,
  },
  mounted() {
    this._keyListener = function (e) {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault() // present "Save Page" from getting triggered.
        this.$emit('saveProduct', this.product)
      }
    }
    document.addEventListener('keydown', this._keyListener.bind(this))
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener)
  },
  watch: {
    product: function () {
      console.log(this.product.options.length, this.selectedOptionIndex)
      if (this.selectedOptionIndex >= 0) {
        this.selectedOption = this.product.options[this.selectedOptionIndex]
        console.log(this.selectedOption, 'selected option')
      } else {
        this.selectedOption = null
      }
    },
  },
  async created() {
    console.log(this.product)
    if (this.product.options.length <= 0) {
      await this.addNewOption()
      this.selectedOption = this.product.options[0]
    } else {
      this.selectedOption = this.product.options[0]
    }
  },
  props: { product: { type: Object } },
  data() {
    return {
      selectedOption: null,
      selectedOptionIndex: 0,
      types: [
        { name: 'Radio Buttons', val: 'radio' },
        { name: 'Dropdown List', val: 'select' },
        { name: 'Colors', val: 'colors' },
        { name: 'Size', val: 'size' },
        { name: 'Checkboxes', val: 'checkbox' },
        { name: 'Text Field', val: 'textbox' },
        { name: 'Text Area', val: 'textarea' },
        { name: 'Date Picker', val: 'date' },
        { name: 'Boolean', val: 'boolean' },
      ],
    }
  },
  methods: {
    async deleteOption() {
      try {
        let result = await this.$apollo.mutate({
          mutation: REMOVE_OPTION,
          variables: { id: this.selectedOption.id },
          fetchPolicy: 'no-cache',
        })
        console.log(result)
        this.selectedOptionIndex--
        this.$toast.success('delete successfully').goAway(5000)
        this.$emit('save')

        // await this.getData()
        // this.$router.go(-1)
      } catch (e) {
        this.$toast.error(e.toString()).goAway(5000)
        console.log(e)
        this.$store.commit('setErr', e)
      } finally {
        this.loading = false
        this.$store.commit('busy', false)
      }
    },
    onCreateOptionValue() {
      this.saveOptionValue({
        id: 'new',
        name: `value ${this.selectedOption.values.length}`,
      })
    },
    async deleteOptionValue(id) {
      try {
        let result = await this.$apollo.mutate({
          mutation: REMOVE_OPTION_VALUE,
          variables: { id },
          fetchPolicy: 'no-cache',
        })
        console.log(result)
        this.$emit('save')

        // await this.getData()
        // this.$router.go(-1)
      } catch (e) {
        console.log(e)
        this.$store.commit('setErr', e)
      } finally {
        this.loading = false
        this.$store.commit('busy', false)
      }
    },
    async saveOptionValue(item) {
      try {
        item.option_id = this.selectedOption.id
        this.$store.commit('clearErr', true)
        this.loading = true
        item.amount = parseInt(item.amount)
        // if (!item.values) item.values = []
        // else
        //   item.values = item.values.map((map) => {
        //     if (map) delete map.__typename
        //     return map
        //   })
        // item.pid = this.product.id
        // item.position = parseInt(item.position)
        console.log('item is:', item)
        let result = await this.$apollo.mutate({
          mutation: SAVE_OPTION_VALUE,
          variables: item,
          fetchPolicy: 'no-cache',
        })
        console.log(result)
        this.$emit('save')

        // await this.getData()
        // this.$router.go(-1)
      } catch (e) {
        console.log(e)
        this.$store.commit('setErr', e)
      } finally {
        this.loading = false
        this.$store.commit('busy', false)
      }
    },

    onSelectOption(option, index) {
      this.selectedOption = option
      this.selectedOptionIndex = index
    },
    addNewOption() {
      this.save({})
    },
    async save(item) {
      if (!item.id) item.id = 'new'
      // if (item.name) item.name = item.name.trim()

      if (item.id == 'new') {
        item.name = 'Option ' + this.product.options.length
      }
      // if(!item.direction)
      // item.direction='+'
      try {
        this.$store.commit('clearErr', true)
        this.loading = true
        if (!item.values) item.values = []
        else
          item.values = item.values.map((map) => {
            if (map) delete map.__typename
            return map
          })
        item.pid = this.product.id
        item.position = parseInt(item.position)
        console.log('item is:', item)
        let result = await this.$apollo.mutate({
          mutation: SAVE_OPTION,
          variables: item,
          fetchPolicy: 'no-cache',
        })
        // console.log(result)
        if (this.selectedOptionIndex < 0) this.selectedOptionIndex = 0
        // this.$emit('saveProduct',this.product)
        this.$emit('formChanged')
        // await this.getData()
        // this.$router.go(-1)
      } catch (e) {
        console.log(e)
        this.$store.commit('setErr', e)
      } finally {
        this.loading = false
        this.$store.commit('busy', false)
      }
    },
  },
}
</script>

<style scoped>
.min_wid {
  min-width: 688px;
}
</style>
