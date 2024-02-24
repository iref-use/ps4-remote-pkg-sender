/*
  etaHEN API

  Send install requests
    curl --data '{"url":"url"} 'http://<PS5 IP>:9090'

*/

import Vue from 'vue'
import store from '../store'
// import net from 'net'
const net = require('net')

let ps5 = {

    debug(){
        let ps4ip = store.getters['app/getPS4IP']
        console.log("Check PS IP " + ps4ip)
    },

    // #todo refactor to ps5
    getURL(of='ps'){      

        if(of == 'ps')
          return store.getters['app/getPS4IP']

        if(of == 'server')
          return store.getters['app/getServerIP']

        return ''
    },
    
    getTimeout(min=2000){
        let timeout = store.getters['app/getPS4Timeout']
        return timeout < min ? min : timeout
    },

    request( onSuccess=null, onResponse=null ){
        console.log("Build up TCP Connection")

        return new Promise( (resolve, reject) => {
            // get URI parts from url 
            let url = this.getURL('ps')                
            let parts = url.split(':')
            let connectTo = { host: parts[0], port: parts[1] }

            // Set up a timeout function
            const handleTimeout = () => {
                console.error("PS5 API connection timed out");
                reject("PS5 Connection timed out. PS5 not available on " + url);
                socket.destroy(); // Destroy the socket
            };

            // Start the timeout timer
            let connectionTimeout = setTimeout(handleTimeout, this.getTimeout());            

            console.log("PS5 Connection to ", connectTo)    
            const socket = new net.Socket()

            socket.connect(connectTo, () => {
                clearTimeout(connectionTimeout)
                console.log("PS5:api Connection available")

                if( typeof onSuccess == 'function' ){
                    onSuccess(socket)
                }
                else {
                    resolve(true)
                }
            })

            socket.on('data', (r) => {
                let response = r.toString()
                let json =  null

                // console.log(response)
                
                try {
                    json = JSON.parse(response)
                }
                catch(jsonError) {
                    reject(jsonError)
                }

                if( typeof onResponse == 'function'){
                    onResponse(json, response)
                    resolve(json, response)
                }
                else {
                    resolve(json, response)
                }
            })
    
            socket.on('error', (err) => {
                clearTimeout(connectionTimeout)
                console.log("PS5:api connection failed on " + url)
                reject(err)
            })
        })
    },

    getErrorCodeMessage(code=''){
        let message = code

        if(code==2157510681)
          message = code + " | task doesn't exist (?)"

        if(code==2157510663)
          message = code + " | already installed (?)"

        if(code==2157510677)
          message = code + " | It seems to be installed already"

        if(code==2157510789)
          message = code + " | Not enough storage"

        return message
    },

    checkPS5(){
        // #todo probably refactor it to the default request
        // lets stay here for reference 
        return new Promise( (resolve, reject) => {
            // get URI parts from url 
            let url = this.getURL('ps')                
            let parts = url.split(':')
            let connectTo = { host: parts[0], port: parts[1] }

            // Set up a timeout function
            const handleTimeout = () => {
                console.error("PS5 API connection timed out");
                reject("PS5 Connection timed out. PS5 not available on " + url);
                socket.destroy(); // Destroy the socket
            };

            // Start the timeout timer
            let connectionTimeout = setTimeout(handleTimeout, this.getTimeout());            

            console.log("PS5 Connection to ", connectTo)    
            const socket = new net.Socket()
            socket.connect(connectTo, () => {
                clearTimeout(connectionTimeout)
                console.log("PS5:api Connection available")
                resolve("PS5 Connection available")
            })
    
            socket.on('error', (err) => {
                clearTimeout(connectionTimeout)
                console.log("PS5:api connection failed on " + url)
                reject("PS5 Connetion failed on " + url)
            })
        })
    },

    install(file, cb=null){
        if(!file.url){
            return console.log("Cannot find path for file " + file.name )
        }

        return this.request( 
                (socket) => {
                    socket.write(JSON.stringify({ url: file.url }))
                    
                    if( typeof cb == 'function')
                        cb()
                },

                (json, response) => {
                    
                }
            )
    },

}

Vue.prototype.$ps5 = ps5
