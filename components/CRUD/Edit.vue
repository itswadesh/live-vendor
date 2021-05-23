<template>
  <div class="flex justify-center min-h-screen">
    <div class="flex mx-8 my-10 text-xs">
      <div class="w-96">
        <div
          class="flex items-center justify-between px-4 py-2 mb-5 text-black bg-blue-500"
        >
          <div v-if="id === 'new'" class="text-white">
            Add &nbsp;{{ heading | titlecase }}
          </div>
          <div v-else class="text-white">
            {{ 'Edit' }} &nbsp;{{ heading | titlecase }} -
            <span style="font-size: 12px">{{ id }}</span>
          </div>
          <!-- <v-spacer></v-spacer> -->
          <button
            class="pl-4 text-white focus:outline-none"
            @click="$router.go(-1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- <v-icon>keyboard_backspace</v-icon> -->
          </button>
        </div>
        <form
          @submit.stop.prevent="save(newRecord)"
          ref="form"
          :lazy-validation="true"
        >
          <!-- <Textbox class="w-full" label="Name"></Textbox> -->

          <div>
            <div v-for="(f, ix) in f" :key="ix">
              <div v-if="!f.noEdit">
                <ToggleSwitch
                  color="pink"
                  v-model="newRecord[f.value]"
                  v-if="f.type === 'boolean'"
                  :label="f.text"
                  :disabled="f.disabled"
                  size="sm"
                  class="my-2"
                >
                  <span class="ml-2 uppercase">{{ f.text }}</span>
                </ToggleSwitch>
                <!-- {{ f.text | titlecase }} -->

                <ImageUpload
                  v-else-if="f.type === 'image'"
                  :image="newRecord[f.value]"
                  :name="f.value"
                  :folder="model"
                  @remove="saveImage(f.value, '')"
                  @save="saveImage"
                  class="my-2"
                />
                <div v-else-if="f.type === 'boolean-checkbox'" class="my-2">
                  <input
                    type="checkbox"
                    inset
                    color="pink"
                    v-model="newRecord[f.value]"
                    :label="f.text"
                    :disabled="f.disabled"
                  />{{ f.text | titlecase }}
                </div>

                <div
                  v-else-if="f.type === 'date'"
                  ref="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <!-- <template v-slot:activator="{ on }"> -->
                  <!-- <input
                    v-on="on"
                    slot="activator"
                    :value="newRecord[f.value] | date"
                    :label="f.text"
                    prepend-icon="event"
                    readonly
                  /> -->
                  <div class="w-full my-4" v-if="newRecord[f.value]">
                    <VueCtkDateTimePicker
                      v-model="newRecord[f.value]"
                      class="shadow-md"
                    />
                    <!-- <VueCtkDateTimePicker
                    :value="newRecord[f.value] | date"
            v-model="newRecord[f.value]"
            class="shadow-md"
          /> -->
                    <!-- <input
                      type="date"
                      :value="
                        new Date(+newRecord[f.value])
                          .toISOString()
                          .substr(0, 10)
                      "
                      @change="dateChanged(f.value, $event)"
                    />
                    <input
                      type="time"
                      :value="
                        new Date(newRecord[f.value]).toString().substr(16, 5)
                      "
                      @input="timeChanged(f.value, $event)"
                    /> -->
                  </div>
                  <div v-else class="my-4">
                    <VueCtkDateTimePicker
                      v-model="newRecord[f.value]"
                      class="shadow-md"
                    />
                    <!-- <input
                      type="date"
                      :value="new Date().toISOString().substr(0, 10)"
                      @change="dateChanged(f.value, $event)"
                    />
                    <input
                      type="time"
                      :value="new Date().toString().substr(16, 5)"
                      @input="timeChanged(f.value, $event)"
                    /> -->
                  </div>
                </div>
                <div v-else>
                  <!-- <v-select
                  v-bind:items="f.options"
                  
                  :label="f.text"
                  single-line
                  menu-props="bottom"
                  
                ></v-select> -->
                  <select
                    class="my-2 text-sm bg-gray-100 rounded-md shadow-md"
                    :disabled="f.disabled"
                    v-model="newRecord[f.value]"
                    v-if="f.type == 'select'"
                  >
                    <option>Select-Any-One</option>
                    <option
                      :value="option"
                      :id="option"
                      v-for="(option, i) in options"
                      :key="i"
                    >
                      {{ option.name }}
                    </option>
                    <!-- <option value="saab">Saab</option> -->
                    <!-- <option value="mercedes">Mercedes</option> -->
                    <!-- <option value="audi">Audi</option> -->
                  </select>
                  <!-- <v-combobox
                  v-else-if="f.type == 'array'"
                  v-model="newRecord[f.value]"
                  :label="f.text"
                  multiple
                  persistent-hint
                  small-chips
                ></v-combobox> -->
                  <select
                    v-else-if="f.type == 'array'"
                    v-model="newRecord[f.value]"
                    class="my-2 text-sm bg-gray-100 rounded-md shadow-md"
                  >
                    <option>Select-Any-One</option>
                    <option
                      :value="option"
                      :id="option"
                      v-for="(option, i) in options"
                      :key="i"
                    >
                      {{ option.name }}
                    </option>
                  </select>
                  <!-- <div>
                  <input : type="checkbox" />
                </div> -->
                  <div v-else-if="f.type == 'deeparray'" class="my-4">
                    <h3>{{ f.text }}</h3>
                    <div
                      v-for="(i, ix) in newRecord[f.value]"
                      :key="ix + 'deep'"
                    >
                      <span v-for="(v, k, ixx) in i" :key="ixx">
                        <!-- <input type="text" :label="k" v-model="i[k]" /> -->
                        <Textbox
                          class="w-full"
                          type="text"
                          :label="k"
                          v-model="i[k]"
                        ></Textbox>
                      </span>
                    </div>
                  </div>
                  <!-- <textarea
                  :label="f.text"
                  :name="f.value"
                  v-model="newRecord[f.value]"
                  v-else-if="f.type === 'textarea'"
                  :rows="3"
                  :rowsMax="6"
                  :disabled="f.disabled"
                ></textarea> -->
                  <Textarea
                    :label="f.text"
                    :name="f.value"
                    v-model="newRecord[f.value]"
                    v-else-if="f.type === 'textarea'"
                    :rows="3"
                    :rowsMax="6"
                    :disabled="f.disabled"
                    class="my-4"
                  />
                  <!-- <input
                  :label="f.text"
                  v-model="newRecord[f.value]"
                  v-else-if="f.type === 'hidden'"
                  v-show="false"
                  :autofocus="ix === 0"
                /> -->
                  <Textbox
                    class="w-full my-4"
                    :label="f.text"
                    v-model="newRecord[f.value]"
                    v-else-if="f.type === 'hidden'"
                    v-show="false"
                    :autofocus="ix === 0"
                  ></Textbox>

                  <!-- <input
                  :label="f.text"
                  :name="f.value"
                  v-validate="'required|numeric'"
                  v-model.number="newRecord[f.value]"
                  v-else-if="f.type === 'number'"
                  :autofocus="ix === 0"
                  :disabled="f.disabled"
                /> -->

                  <Textbox
                    class="w-full my-4"
                    :label="f.text"
                    :name="f.value"
                    v-validate="'required|numeric'"
                    v-model.number="newRecord[f.value]"
                    v-else-if="f.type === 'number'"
                    :autofocus="ix === 0"
                    :disabled="f.disabled"
                  ></Textbox>

                  <!-- <input
                  :label="f.text"
                  :name="f.value"
                  v-validate="'required|decimal'"
                  v-model.number="newRecord[f.value]"
                  v-else-if="f.type === 'decimal'"
                  :autofocus="ix === 0"
                  :disabled="f.disabled"
                /> -->
                  <Textbox
                    class="w-full my-4"
                    :label="f.text"
                    :name="f.value"
                    v-validate="'required|decimal'"
                    v-model.number="newRecord[f.value]"
                    v-else-if="f.type === 'decimal'"
                    :autofocus="ix === 0"
                    :disabled="f.disabled"
                  ></Textbox>
                  <div v-else-if="f.type == 'editor'" class="my-4">
                    <quill-editor
                      v-model="newRecord[f.value]"
                      ref="myQuillEditor1"
                    ></quill-editor>
                  </div>
                  <!-- <input
                  :label="f.text"
                  :name="f.value"
                  v-validate="'required'"
                  v-model="newRecord[f.value]"
                  v-else-if="f.required === true"
                  :autofocus="ix === 0"
                  :disabled="f.disabled"
                /> -->
                  <Textbox
                    class="w-full my-4"
                    :label="f.text"
                    :name="f.value"
                    v-validate="'required'"
                    v-model="newRecord[f.value]"
                    v-else-if="f.required === true"
                    :autofocus="ix === 0"
                    :disabled="f.disabled"
                  ></Textbox>
                  <div
                    v-else-if="f.type == 'emailmask' || f.type == 'phonemask'"
                    class="my-4"
                  ></div>
                  <!-- <input
                  :label="f.text"
                  :name="f.value"
                  v-model="newRecord[f.value]"
                  v-else
                  :autofocus="ix === 0"
                  :disabled="f.disabled"
                /> -->
                  <Textbox
                    class="w-full my-4"
                    :label="f.text"
                    :name="f.value"
                    v-model="newRecord[f.value]"
                    v-else
                    :autofocus="ix === 0"
                    :disabled="f.disabled"
                  ></Textbox>
                </div>
              </div>
            </div>
          </div>
          <!-- <v-card-actions> -->
          <div>
            <button
              type="submit"
              class="w-full py-2 my-5 font-semibold tracking-wide text-white uppercase rounded-md shadow-md bg-accent-500 hover:bg-accent-700 focus:outline-none"
              :disabled="!valid"
            >
              <span>save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Submit from '~/shared/components/ui/Submit'
import ImageUpload from '~/components/ImageUpload'
import Filter from '~/plugins/filters'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import moment from 'moment'
import ToggleSwitch from '~/shared/components/ui/ToggleSwitch.vue'

export default {
  props: ['f', 'api', 'query', 'mutation', 'model', 'heading', 'id'],
  data() {
    return {
      valid: true,
      menu: {},
      date: new Date().toISOString().substr(0, 10),
      loading: false,
      newRecord: {},
    }
  },
  methods: {
    dateChanged(key, value) {
      let newDate = new Date(+this.newRecord[key])
      let day = value.substr(8, 2)
      let month = value.substr(5, 2) - 1
      let year = value.substr(0, 4)
      newDate.setDate(day)
      newDate.setMonth(month)
      newDate.setFullYear(year)
      this.newRecord[key] = newDate
    },
    timeChanged(key, value) {
      let newDate = new Date(+this.newRecord[key])
      let hours = value.substr(0, 2)
      let minutes = value.substr(3, 2)
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.newRecord[key] = newDate
    },
    saveImage(name, img) {
      try {
        this.newRecord[name] = img
        this.save(this.newRecord)
      } catch (e) {
        this.$store.commit('setErr', e)
      }
    },
    async save(item) {
      console.log(item)
      try {
        let itemCopy = { ...item }
        delete itemCopy['__typename']
        for (let t of this.f) {
          if (t.type == 'decimal' || t.type == 'numeric') {
            itemCopy[t.value] = +itemCopy[t.value]
          }
        }
        let result = (
          await this.$apollo.mutate({
            mutation: this.mutation,
            variables: { id: this.id, ...itemCopy },
          })
        ).data
        this.loading = false
        this.$router.go(-1)
        this.$emit('saved')
      } catch (e) {
        this.loading = false
        this.$store.commit('setErr', e)
      }
    },
  },
  async created() {
    console.log(this.f)
    if (this.id === 'new' || this.id === null) {
      this.newRecord = {}
      return
    } else {
      try {
        this.$store.commit('clearErr')
        console.log(this.id, 'id')
        let data = (
          await this.$apollo.query({
            query: this.query,
            variables: { id: this.id },
          })
        ).data[this.model]

        if (data) {
          this.newRecord = data
        }
        this.f.forEach((element) => {
          if (element.type == 'date') {
            console.log('date')
            this.newRecord[element.value] = moment(
              parseInt(this.newRecord[element.value])
            ).format('YYYY-MM-DD hh:mm:ss a')

            console.log(this.newRecord[element.value])
          }
        })
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    }
  },
  destroyed() {
    this.newRecord = {}
  },
  components: { Submit, ImageUpload, ToggleSwitch, VueCtkDateTimePicker },
}
</script>
