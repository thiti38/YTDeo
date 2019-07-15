import Vue from 'vue';
import DoubleClick from 'vue-doubleclick';

let mappings = {
  rectangle: [
    { window: [0, 0], sizes: [[336, 280], [300, 250], [300, 100]] },
    { window: [1050, 350], sizes: [[336, 280], [300, 250], [300, 100]] },
  ],
  banner: [
    { window: [0, 0], sizes: [[336, 280], [300, 250], [300, 100]] },
    { window: [750, 200], sizes: [[336, 280], [300, 250], [300, 100], [728, 90]] },
    { window: [1050, 350], sizes: [[728, 90], [970, 250], [336, 280], [300, 250], [300, 100]] },
    { window: [1500, 350], sizes: [[970, 90], [728, 90], [970, 250], [336, 280], [300, 250], [300, 100]] },
  ]
};

Vue.use(DoubleClick, {
  id: '21634219865',
  mappings
});
