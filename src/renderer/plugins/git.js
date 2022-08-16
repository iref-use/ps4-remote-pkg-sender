import Vue from 'vue'
import axios from 'axios'

let git = {
    repo: "https://api.github.com/repos/gkiokan/ps4-remote-pkg-sender/releases/latest",


    async getLatestRelease(){
        const { data } = await axios.get(this.repo)
        return data
    },

    getVersion(item){
        if(!item) return null

        if(item.tag_name)
          return item.tag_name.replace('v', '')

        return null
    },

    compareVersion(v1, v2) {
        const v1Parts = v1.split('.')
        const v2Parts = v2.split('.')
        const length = Math.max(v1Parts.length, v2Parts.length)
        for (let i = 0; i < length; i++) {
          const value = (parseInt(v1Parts[i]) || 0) - (parseInt(v2Parts[i]) || 0)
          if (value < 0) return -1
          if (value > 0) return 1
        }
        return 0
    },

    
}

Vue.prototype.$git = git
