<template>
  <div class="container mx-auto my-4 bg-white min-w-max">
    <div class="layout">
      <div class="text-xs-center">
        <Pagination
          v-if="noOfPages > 1"
          v-model="currentPage"
          @input="changePage(currentPage)"
          :length="noOfPages"
          :total-visible="10"
          circle
        />
      </div>
      <div class="spacer" />
      <div class="p-3 overflow-x-auto bg-white border rounded-lg">
        <div class="flex flex-wrap items-center mt-2 mb-10 card-title">
          <div class="w-1/2 text-3xl font-bold text-gray-800">
            <span class="ml-5">{{ heading | titlecase }}</span>
          </div>
          <div class="flex items-center w-1/2">
            <a nuxt :href="'/api/export/' + model" v-if="!no.export">
              <img class="" src="/ms-excel.png" alt="export" />
            </a>
            <div class="relative w-full">
              <Textbox
                prepend-inner-icon="search"
                append-icon="close"
                @click:append="hideFilterBox"
                v-model="filterInput"
                autofocus
                placeholder="Search here ... "
              />
              <div class="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- <table class="table-auto">
        <thead>
        <tr>
        <th> <span v-if="!no.action">Action</span></th>
        <th>Author</th>
        <th>Views</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>Intro to CSS</td>
        <td>Adam</td>
        <td>858</td>
        </tr>
        <tr class="bg-emerald-200">
        <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
        <td>Adam</td>
        <td>112</td>
        </tr>
        <tr>
        <td>Intro to JavaScript</td>
        <td>Chris</td>
        <td>1,280</td>
        </tr>
        </tbody>
        </table> -->
        <table class="min-w-full p-2 text-gray-500 divide-y divide-gray-200">
          <thead class="whitespace-nowrap">
            <tr>
              <th v-if="!no.action" class="py-4 text-sm">Action</th>
              <th
                @click="sort(header.value)"
                v-for="header in listFields"
                :key="header.text"
                class="p-3 text-sm text-left"
                :class="[
                  'sortable',
                  descending ? 'desc' : 'asc',
                  header.value === sortBy ? 'active' : '',
                ]"
              >
                <div class="flex items-center cursor-pointer">
                  <span class="mr-2">{{ header.text | titlecase }}</span>
                  <!-- arrow down  -->

                  <svg
                    v-if="sortBy == header.value && !descending"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 transition duration-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <svg
                    v-else-if="sortBy == header.value && descending"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 transition duration-500 transform -rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="(item, ix) in data"
              :key="ix"
              :class="ix % 2 == 1 ? 'bg-gray-100' : ''"
            >
              <td class="p-3" v-if="!no.action">
                <div class="flex items-center justify-center text-sm">
                  <!-- edit icon  -->
                  <svg
                    v-if="!no.edit"
                    @click="go(item.id)"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 transform cursor-pointer hover:scale-110"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                  <!-- copy icon  -->
                  <svg
                    v-if="!no.clone"
                    @click="clone1(item)"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 transform cursor-pointer hover:scale-110"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
                    />
                    <path
                      d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <!-- delete icon  -->
                  <svg
                    v-if="!no.delete"
                    @click="remove(item.id)"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 transform cursor-pointer hover:scale-110"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </td>
              <td
                v-for="(f, ix) in listFields"
                class="p-3 text-sm text-left"
                :key="ix"
              >
                <div class="w-full" v-if="f.type === 'boolean'">
                  <ToggleSwitch
                    v-model="item[f.value]"
                    color="pink"
                    @input="submit(item, f.value)"
                    size="sm"
                  ></ToggleSwitch>
                </div>
                <input
                  type="checkbox"
                  v-else-if="f.type === 'boolean-checkbox'"
                  v-model="item[f.value]"
                  disabled
                  color="success"
                />
                <label
                  v-else-if="f.type === 'boolean-label'"
                  :color="parse(item, f.value) ? 'green' : 'red'"
                  text-color="white"
                  >{{ parse(item, f.value) ? 'Active' : 'Inactive' }}</label
                >
                <label
                  v-else-if="f.type === 'payment'"
                  :color="parse(item, f.value) === 'Paid' ? 'green' : 'red'"
                  text-color="white"
                  >{{ parse(item, f.value) }}</label
                >
                <router-link
                  v-else-if="f.type === 'detail'"
                  :to="api + '/' + item['id']"
                  >{{ parse(item, f.value) }}</router-link
                >
                <router-link v-else-if="f.type === 'url'" :to="url">{{
                  parse(item, f.value)
                }}</router-link>
                <span v-else-if="f.type === 'product'">
                  <span>
                    <a
                      :href="`${WWW_URL}/${item.slug}`"
                      target="blank"
                      :tooltip="item.name"
                    >
                      <img :src="item.img" alt="" style="width: 2rem" />
                      {{ item.name }}
                    </a>
                  </span>
                </span>
                <span v-else-if="f.type === 'products'">
                  <div v-for="(i, ix) in parse(item, f.value)" :key="ix + 'ps'">
                    <span>
                      <a
                        :href="`${WWW_URL}/${i.slug}`"
                        target="blank"
                        :tooltip="i.name"
                      >
                        <img :src="i.img" alt="" style="width: 2rem" />
                        {{ i.name }}
                      </a>
                    </span>
                  </div>
                </span>
                <span v-else-if="f.type === 'array'">
                  <div v-for="(i, ix) in parse(item, f.value)" :key="ix + 'a'">
                    <v-chip>{{ i }}</v-chip>
                  </div>
                </span>
                <span v-else-if="f.type === 'deeparray'">
                  <div v-for="(i, ix) in parse(item, f.value)" :key="ix + 'd'">
                    <v-chip v-for="(v, k, ixx) in i" :key="ixx + 'x'">{{
                      v
                    }}</v-chip>
                  </div>
                </span>
                <span v-else-if="f.type === 'date'">{{
                  parse(item, f.value) | date
                }}</span>
                <span v-else-if="f.type === 'currency'">
                  {{
                    parse(item, f.value) | currency(settings.currency_symbol)
                  }}
                </span>
                <span v-else-if="f.type === 'phonemask' && settings.demo">{{
                  parse(item, f.value) | mask(3)
                }}</span>
                <span v-else-if="f.type === 'phonemask' && !settings.demo">{{
                  parse(item, f.value)
                }}</span>
                <span v-else-if="f.type === 'emailmask' && settings.demo">{{
                  parse(item, f.value) | mask(6)
                }}</span>
                <span v-else-if="f.type === 'emailmask' && !settings.demo">{{
                  parse(item, f.value)
                }}</span>
                <span v-else-if="f.type === 'image'">
                  <img
                    :src="settings.CDN_URL + parse(item, f.value)"
                    class="object-cover w-16 h-8 rounded"
                    v-if="parse(item, f.value) && parse(item, f.value) != ''"
                    @error="setListImage(parse(item, f.value))"
                    alt
                  />
                  <list-image :text="item.name" size="small" v-else />
                </span>
                <span v-else-if="f.type === 'nested'">
                  <span>{{ parseNested(item, f.value) }}</span>
                </span>
                <span v-else>{{ parse(item, f.value) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nuxt-link
      class="fixed bottom-0 right-0 flex items-center justify-center w-16 h-16 m-6 text-white bg-pink-500 rounded-full button"
      color="pink"
      :to="'/' + route + '/new'"
      v-if="!no.add"
    >
      <PlusIcon />
    </nuxt-link>
  </div>
</template>
<script>
import { basic } from '~/shared/mixins'
import { WWW_URL } from '~/shared/config'
import {
  Edit2Icon,
  CopyIcon,
  Trash2Icon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
} from 'vue-feather-icons'

import { ListImage, Pagination } from '~/shared/components/ui'
import { mapGetters } from 'vuex'
import ToggleSwitch from '~/shared/components/ui/ToggleSwitch.vue'
import Textbox from '~/components/ui/Textbox.vue'
export default {
  data() {
    return {
      WWW_URL,
    }
  },
  mixins: [basic],
  components: {
    ListImage,
    PlusIcon,
    Pagination,
    ToggleSwitch,
    Textbox,
    Edit2Icon,
    CopyIcon,
    Trash2Icon,
    ArrowUpIcon,
    ArrowDownIcon,
  },
  computed: {
    ...mapGetters({ settings: 'settings' }),
    route() {
      return this.path || this.api
    },
  },
  mounted() {
    console.log(this.f, 'fffffffffffff')
  },
  props: {
    page: 1,
    f: {},
    no: {
      type: Object,
      default() {
        return {}
      },
    },
    path: null,
    api: '',
    query: '',
    model: '',
    mutation: '',
    deleteMutation: '',
    heading: '',
  },
  methods: {
    async submit(item, value) {
      console.log(item)
      try {
        this.loading = true
        let itemCopy = {}
        itemCopy.id = item.id
        itemCopy[value] = item[value]
        await this.$apollo.mutate({
          mutation: this.mutation,
          variables: itemCopy,
        })
        this.$emit('saved')
      } catch (e) {
        console.log(e)
        this.$store.commit('setErr', e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
