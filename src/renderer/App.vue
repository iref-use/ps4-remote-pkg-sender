<template>
  <router-view _key="$route.path" />
</template>

<script>
import './scss/app.scss';
// import "@fortawesome/fontawesome-free/js/all";
import { get } from 'vuex-pathify'
import { remote, ipcRenderer, shell } from 'electron'
import url from 'url'
import axios from 'axios'
import path from 'path'
// import uuid from 'uuid'
const uuid = require('uuid');
const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
  name: 'App',

  data(){ return {    
    versions: {
      app: require('./../../package.json').version,
      electron: process.versions.electron,
      electronWebpack: require('electron-webpack/package.json').version
    },
    serverTab: 'server',
    rpsv2: {
        api: null,
        id: null,
    }
  }},

  computed: {
      serial: get('app/serial'),
      style: get('app/getStyle'),
  },

  watch: {
      style(){
            this.checkColorStyle()
      },
      '$route'(n,o){
            let data = {
                os: process.platform,
                arch: process.arch,
                hostname: this.serial,
                title: n.name,                
                url: n.fullPath,
                referrer: o ? o.fullPath : '',
                language: window.navigator.language, // #todo swap to selected language
                // website: this.rpsv2.id,
            }

            this.track(data)
            
            // console.log(data)
      },
  },

  created(){      
      this.checkColorStyle()
      this.addDependencies()
  },

  mounted(){
      this.checkSerial()
      this.$store.dispatch('app/started')
      this.registerChannel()
  },

  errorCaptured(err, vm, info) {
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.
    console.log(err, vm, info)
    alert(err)

    // TODO: Perform any custom logic or log to server
    // return false to stop the propagation of errors further to parent or global error handler
  },

  methods:{
      registerChannel(){
          ipcRenderer.on('main', (event, data) => {
              console.log(event, data)
              this.$message({ type: 'info', message: data });
          })

          ipcRenderer.on('main-error', (event, data) => {
              this.$message({ type: 'error', message: data })
          })

          ipcRenderer.on('error', (event, data) => {
              console.log(event, data)
              alert(data)
          })
      },

      addDependencies(){
            let api = axios.create({
                headers: {
                    'RPSV2': "7146501c4b607ecc0ec0f238e24c2a61"
                }
            })

            api.get('https://rpsv2.gkiokan.net?c')
                .then( ({data}) => {
                    if( !data ) 
                        throw new Error("rpsv2 config data error")

                    this.rpsv2.id = data.id

                    const analytics = document.createElement('script')
                    analytics.defer = false 
                    analytics.src = data.src // "https://rpsv2.gkiokan.net?s"
                    analytics.setAttribute('data-website-id', data.id)
                    analytics.setAttribute('data-host-url', data['data-host-url'])
                    analytics.setAttribute('data-auto-track', false)
                    
                    return analytics
                })
                .then( (analytics) => {
                    document.head.appendChild(analytics);
                })
                .catch( (e) => {
                    console.log("Error in fetching rpsv2 configs", e)
                })
      },

      open(b){
          shell.openExternal(b)
      },

      openWithAutoclose(url){
          console.log("Open with Autoclose ", url)
          
          // straight open a new window with the url
        //   return window.open(url, 'Download', 'width=200,height=30,backgroundColor=black,frame=false,hide=true') // deprecated
          
          // proxy though application view
          if (isDevelopment) {
            window.open(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}` + '#window.loader?q=' + url, 'Download', 'width=200,height=30,backgroundColor=black,frame=false,hide=true')
          }
          else {
            window.open('file://' + path.join(__dirname, 'index.html') + '#window.loader?q=' + url, 'Download', 'width=200,height=30,backgroundColor=black,frame=false,hide=true')
          }
      },

      sendServer(msg){
          ipcRenderer.send('server', msg)
      },

      openServer(){
          ipcRenderer.send('server-show')
      },

      show(data){
          ipcRenderer.send('show', data)
      },

      sendMain(msg){
          console.log('sending to main', msg)
          ipcRenderer.send('main', msg)
      },

      sendPS4(msg){
          console.log('sending to ps', msg)
          ipcRenderer.send('ps4', msg)
      },

      notify(data){
          ipcRenderer.send('notify', data)
      },

      log(msg='', data={}, type='log'){
          this.$root.sendPS4({ time: Date.now(), msg, data, type })
      },

      getImage(img){
          const isDevelopment = process.env.NODE_ENV === 'development';
          // const staticPath = isDevelopment ? __static : __dirname.replace(/app\.asar$/, 'static');

          if(isDevelopment)
            return url.resolve(window.location.origin, img);

          return __dirname.replace(/app\.asar$/, 'static') + '/' + img
      },

      checkColorStyle(){
          document.getElementsByTagName('html')[0].classList.remove('dark')
          document.getElementsByTagName('html')[0].classList.remove('light')
          document.getElementsByTagName('html')[0].classList.remove('pureblack')
          document.getElementsByTagName('html')[0].classList.add(this.style)
      },

      checkSerial(){
            if( !this.serial ){
                let newHostSerial = uuid.v4()
                console.log("No Application Serial found. Creating one", newHostSerial)
                this.$store.dispatch('app/setSerial', newHostSerial)
            }        
            else {
                console.log("Application Serial " + this.serial)
            }
      },

      track(data={}){
            if( window.umami )
                window.umami.track( props => ({ ...props, ...data }) )
      },

      move(params){
         let from  = this.$route.fullPath
         let to    = this.$router.resolve(params).route.fullPath

         if(from === to) {
             return
         }

         this.$router.push(params)
      },      

  },
}
</script>