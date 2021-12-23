import Vue from 'vue'

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

    getServerStatusType(i){
        if(i == 'error')
          return 'danger'

        if(i == 'running')
          return 'success'

        return ''
    },

    getFileStatus(type){
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

    getFileSizeType(size){
        if(size.includes('Bytes'))
          return 'info'

        if(size.includes('MB'))
          return 'success'

        if(size.includes('GB'))
          return 'primary'

        return ''
    },

}

Vue.prototype.$helper = helper
