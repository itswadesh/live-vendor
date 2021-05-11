<template>
  <section class="p-4 text-gray-800 w-72">
    <!-- Recommended channels section start  -->
    <div class="flex items-center justify-between">
      <h4 class="font-semibold uppercase">Recommemded Channels</h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <!-- Recommended channels section end -->
    <!-- Channels section start  -->
    <div class="py-2">
      <div v-for="(i, ix) in items" :key="ix" class="flex justify-between pt-2">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full">
            <img
              :src="i.img"
              alt=""
              class="object-cover object-top w-10 h-10 rounded-full"
            />
          </div>
          <div class="ml-2">
            <h5 class="font-semibold uppercase">{{ i.name1 }}</h5>
            <h5 class="text-sm uppercase">{{ i.name2 }}</h5>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 mr-1 bg-red-500 rounded-full"></div>
          <span>{{ i.live }}</span>
        </div>
      </div>
    </div>
    <!-- Channels section end -->
    <!-- Sign up section start  -->
    <div class="p-4 my-5 bg-white rounded-md shadow-md">
      <h1 class="text-xl font-bold tracking-wide uppercase">
        join the
        <span class="text-indigo-500 cursor-pointer">twitch</span> community!!!
      </h1>
      <h5 class="mt-1 text-gray-600">
        Discover the best live streams anywhere
      </h5>
      <button
        class="px-4 py-2 mt-2 font-bold tracking-wide text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-400 focus:outline-none"
      >
        Sign up
      </button>
    </div>
    <!-- Sign up section end -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name1: 'valorant',
          name2: 'valorant',
          live: '19.7k',
          img: '/img/workout.jpg',
        },
        {
          name1: 'valorant',
          name2: 'valorant',
          live: '19.7k',
          img: '/img/workout.jpg',
        },
        {
          name1: 'valorant',
          name2: 'valorant',
          live: '19.7k',
          img: '/img/workout.jpg',
        },
        {
          name1: 'valorant',
          name2: 'valorant',
          live: '19.7k',
          img: '/img/workout.jpg',
        },
        {
          name1: 'valorant',
          name2: 'valorant',
          live: '19.7k',
          img: '/img/workout.jpg',
        },
        {
          name1: 'valorant',
          name2: 'valorant',
          live: '19.7k',
          img: '/img/workout.jpg',
        },
      ],
    }
  },
}
</script>

<style></style>
