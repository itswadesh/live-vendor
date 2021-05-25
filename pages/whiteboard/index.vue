<template>
  <div class="px-4 py-8 bg-white">
    <div class="row" style="margin-top: 1%;">
        <div class="col-sm">
          <h6 class="pb-2 mb-0">
            Whiteboard containers (1000 x 600)
          </h6>
          <div id="mywhiteboard" style="width: 1000px; height: 600px; border: 1px dashed #ddd;position: relative;">
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  data: () => {
    return {
        isLogin : false,
        parentId : 'mywhiteboard',
        zgViewList : [],
        zgWbView:'',
        zgDocsViewClient:'',
        zgDocsView:'',
        excelWBMap : {},
        isRemote:''
    }
  },
  mounted() {},
  created() {

  },
  methods: {

   
  }
}
</script>

<style></style>
