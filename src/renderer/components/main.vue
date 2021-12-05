<template>
<div>

    <label>LOCAL IP:</label>
    <select id="localIP">
        <template v-for="e in ifaces">
            <option :value="e.ip">{{ e.title }}</option>
        </template>
    </select>


    <label>PORT: </label>
    <input type="text" id="portNumber" value="9999">
    <input type="button" id="changePort" value="CHANGE PORT"/>
    <br><br>


    <label>PS4 IP:</label>
    <input type="text" placeholder="192.168.1.100" value="192.168.1.100" id="PS4IP" />
    <br><br>

    <label>PKG Files:</label>
    <div class="files"></div>
    <input type="file" id="filePicker" multiple accept=".pkg" />
    <br>
    <input type="button" value="SEND" id="send" disabled />
    <br><br>

    <label>Torrent magnet link</label>
    <input type="text" id="magnetLink" />
    <label> PORT: </label>
    <input type="text" id="torrentPortNumber" value="8888">
    <br>
    <input type="button" value="START TORRENT SERVER AND SEND" id="sendTorrent" />
    <br><br>

    <label>Tasks:</label>
    <div class="tasks"></div>
    <br><br>

    <label>Log:</label><br>
    <textarea id="log" rows="12" cols="100"></textarea>

</div>
</template>

<script>

export default {

    data(){ return {
        ifaces: [],
    }},

    mounted(){
        this.ifaces = this.getNetWorkInterfaces()
    },

    methods: {
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

    }
}
</script>
