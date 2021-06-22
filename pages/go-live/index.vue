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
import channels from '~/gql/channel/channels.gql'
import savechannel from '~/gql/channel/saveChannel.gql'
import deletechannel from '~/gql/channel/deletechannel.gql'
export default {
  middleware: ['isAuth'],
  data: () => {
    return {
      query: channels,
      mutation: savechannel,
      deleteMutation: deletechannel,
      model: 'channels',
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
