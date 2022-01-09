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
        if(type == 'HB Game' || type == 'Game')
          return 'success'

        if(type == 'Media')
          return 'primary'

        if(type == 'Utility')
          return 'warning'

        if(type == 'Dev Menu')
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

}

Vue.prototype.$helper = helper
