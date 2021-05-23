<template>
  <div class="px-4 py-8 bg-white">
    <list
      :f="f"
      :api="api"
      :query="query"
      :mutation="mutation"
      :deleteMutation="deleteMutation"
      :heading="heading"
      :model="model"
    ></list>
  </div>
</template>

<script>
import List from '~/components/CRUD/List'
import { api, heading, fields } from './config'
import liveStreams from '~/gql/liveStream/liveStreams.gql'
import saveliveStream from '~/gql/liveStream/saveLiveStream.gql'
import deleteliveStream from '~/gql/liveStream/deleteliveStream.gql'
export default {
  middleware: ['isAuth'],
  data: () => {
    return {
      query: liveStreams,
      mutation: saveliveStream,
      deleteMutation: deleteliveStream,
      model: 'liveStreams',
      api,
      heading,
      f: fields,
    }
  },
  components: { List },
  mounted() {},
  head() {
    return {
      title: 'Manage ' + heading,
    }
  },
}
</script>

<style></style>
