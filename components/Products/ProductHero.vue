<template>
  <section class="mx-2 my-16">
    <div class="md:flex" v-for="(i, ix) in content" :key="ix">
      <div class="flex mb-6 mr-10 md:w-1/2">
        <img class="w-20 h-16" :src="i.img" alt="" />

        <div class="ml-4 lg:ml-10">
          <h2 class="font-semibold text-gray-800">{{ i.heading }}</h2>
          <p class="mt-2 text-sm text-gray-600">
            {{ i.para }}
            <span class="text-blue-500 hover:text-blue-700">{{ i.span }}</span>
          </p>
          <div>
            <white-button
              class="px-4 py-2 my-5 text-sm font-semibold text-gray-800 border border-gray-500 rounded-md shadow whitespace-nowrap hover:bg-gray-200 focus:outline-none"
            >
              Import Products
            </white-button>
          </div>
        </div>
      </div>
      <div class="flex mb-6 mr-10 md:w-1/2">
        <img class="w-20 h-16" :src="i.img" alt="" />

        <div class="ml-4 lg:ml-10">
          <h2 class="font-semibold text-gray-800">{{ i.heading }}</h2>
          <p class="mt-2 text-sm text-gray-600">
            {{ i.para }}
            <span class="text-blue-500 hover:text-blue-700">{{ i.span }}</span>
          </p>
          <div>
            <white-button
              class="px-4 py-2 my-5 text-sm font-semibold text-gray-800 border border-gray-500 rounded-md shadow whitespace-nowrap hover:bg-gray-200 focus:outline-none"
            >
              Import Products
            </white-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WhiteButton from '~/components/ui/WhiteButton.vue'
export default {
  components: {
    WhiteButton,
  },
  data() {
    return {
      // props: ['content'],
      content: [
        {
          heading: 'Export products 1',
          para: `porting products produces a CSV file with complete information of
            all selected products. You can edit the CSV file in any spreadsheet
            program and import it back into your store to update your product
            catalog en masse. Learn more about data export in`,
          img: '/image/up-down-arrow.PNG',
          span: 'Knowledge Base.',
        },
        {
          heading: 'Export productsz 2',
          para: `porting products produces a CSV file with complete information of
            all selected products. You can edit the CSV file in any spreadsheet
            program and import it back into your store to update your product
            catalog en masse. Learn more about data export in`,
          img: '/image/up-down-arrow.PNG',
          span: 'Knowledge Base.',
        },
        {
          heading: 'Export products 3',
          para: `porting products produces a CSV file with complete information of
            all selected products. You can edit the CSV file in any spreadsheet
            program and import it back into your store to update your product
            catalog en masse. Learn more about data export in`,
          img: '/image/up-down-arrow.PNG',
          span: 'Knowledge Base.',
        },
      ],
    }
  },
}
</script>

<style></style>
