import Vue from 'vue'
import App from './App.vue'

import './scripts'

const styles=document.createElement('style');
styles.innerText=`@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);
  .empty{display:flex;
    flex-direction:column;
    justify-content:center;
    height:100vh;
    position:relative}.footer{bottom:0;
      font-size:13px;
      left:50%;
      opacity:.9;
      position:absolute;
      transform:translateX(-50%);
      width:100%}`;

// document.head.appendChild(styles);


Vue.config.devtools= process.env.NODE_ENV !== 'production',
Vue.config.productionTip = false,

new Vue({
  mixins: [App],

  data:{
    versions:{
      electron:process.versions.electron,
      electronWebpack:require('electron-webpack/package.json').version
    }
  },

  methods:{
      open(b){
          require('electron').shell.openExternal(b)
      }
  },
  // render: h => h(App)
}).$mount('#app')
