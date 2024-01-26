import Vue from 'vue'
import vuescroll from 'vuescroll'


Vue.use(vuescroll, {
    ops: {
        vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            detectResize: true,
            /** Enable locking to the main axis if user moves only slightly on one of them at start */
            locking: true,
          }
      // The global config
    },
    name: 'myScroll' // customize component name, default -> vueScroll
  });

// const opts = { }

export default vuescroll
