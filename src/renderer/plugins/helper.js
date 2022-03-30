import Vue from 'vue'
import JSON5 from 'json5'

let helper = {
    getNetWorkInterfaces() {
        let os = require('os');
        let ifaces = [];
        Object.keys(os.networkInterfaces()).forEach(function (ifname) {
          var alias = 0;
          os.networkInterfaces()[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
              return;
            }

            if (alias >= 1) {
              ifaces.push({
                title: `${ifname}-${alias}:${iface.address}`,
                ip: iface.address
              });
            } else {
              ifaces.push({
                title: `${ifname}: ${iface.address}`,
                ip: iface.address
              });
            }
            ++alias;
          });
        });
        return ifaces;
    },

    getServerStatusType(i=''){
        if(i == 'error')
          return 'danger'

        if(i == 'running')
          return 'success'

        return ''
    },

    getAppStoreType(type=''){
        if(type == 'game' || type == 'hb game')
          return 'success'

        if(type == 'media')
          return 'primary'

        if(type == 'utility')
          return 'warning'

        if(type == 'emulator')
          return 'danger'

        return ''
    },

    getFileStatus(type=''){
        if(type == 'serving' || type == 'pause')
          return 'info'

        if(type == 'finish' || type == 'installed')
          return 'success'

        if(type == 'installing')
          return 'primary'

        if(type == 'in queue')
          return 'warning'

        return ''
    },

    getFileSizeType(size=''){
        if(size.includes('Bytes'))
          return 'info'

        if(size.includes('MB'))
          return 'success'

        if(size.includes('GB'))
          return 'primary'

        return ''
    },

    stringifyToHex(obj){
        return JSON.stringify(obj, (key, value) => {
            if( typeof value === 'number'){
              return '0x' + value.toString(16)
            }
            return value
        })
    },

    parse(o){
        return JSON5.parse(o)
    },

    secondsToString(seconds){
        if(!seconds) return ''

        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        // var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        var dDisplay = d > 0 ? d + "d " : "";
        var hDisplay = h > 0 ? h + "h " : "";
        var mDisplay = m > 0 ? m + "m " : "";
        var sDisplay = s > 0 ? s + "s " : "";

        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

}

Vue.prototype.$helper = helper
