<template>
  <div>
    <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
  </div>
</template>
<script>
import googleOneTap from 'google-one-tap'
export default {
  data() {
    return {
      images: {
        normal_size: [
          { id: 'unique id', url: 'image url' },
          { id: 'unique id', url: 'image url' },
        ],
      },
      zoomerOptions: {
        zoomFactor: 3, // scale for zoomer
        pane: 'pane', // three type of pane ['pane', 'container-round', 'container']
        hoverDelay: 300, // how long after the zoomer take effect
        namespace: 'zoomer', // add a namespace for zoomer component, useful when on page have mutiple zoomer
        move_by_click: false, // move image by click thumb image or by mouseover
        scroll_items: 5, // thumbs for scroll
        choosed_thumb_border_color: '#bbdefb', // choosed thumb border color
        scroller_button_style: 'line',
        scroller_position: 'left',
        zoomer_pane_position: 'right',
      },
    }
  },
  mounted() {
    const options = {
      client_id:
        '414060469322-n4raqj2rdbjhegvrtdk6mhbdm4sd0oc7.apps.googleusercontent.com', // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: 'signin', // optional
    }
    googleOneTap(options, (response) => {
      // Send response to server
      this.$post('googleOnetap', response)
    })
  },
}
</script>
