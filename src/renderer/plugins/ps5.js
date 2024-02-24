/*
  etaHEN API

  Send install requests
    curl --data '{"url":"url"} 'http://<PS5 IP>:9090'

*/

import Vue from 'vue'
import store from '../store'
import { connect } from 'http2'
// import net from 'net'
const net = require('net')

let ps5 = {

    debug(){
        let ps4ip = store.getters['app/getPS4IP']
        console.log("Check PS IP " + ps4ip)
    },

    // #todo refactor to ps5
    getURL(of='ps'){      
        if(of == 'url'){
            return store.getters['app/getPS4IP']
        }

        if(of == 'ps'){
            let url = store.getters['app/getPS4IP']
            let parts = url.split(':')
            return { host: parts[0], port: parts[1] }             
        }

        if(of == 'server')
          return store.getters['app/getServerIP']

        return ''
    },
    
    getTimeout(min=2000){
        let timeout = store.getters['app/getPS4Timeout']
        return timeout < min ? min : timeout
    },

    request( onSuccess=null, onResponse=null ){
        return new Promise( (resolve, reject) => {
            // Set up a timeout function
            const handleTimeout = () => {
                console.error("PS5 API connection timed out");
                reject("PS5 Connection timed out. PS5 not available on " + this.getURL('url') )
                socket.destroy()
            };

            // Start the timeout timer
            let connectionTimeout = setTimeout(handleTimeout, this.getTimeout());            

            // console.log("PS5 Connection to ", connectTo)    
            const socket = new net.Socket()

            // Connect to the Server
            socket.connect(this.getURL('ps'), () => {
                clearTimeout(connectionTimeout)

                if( typeof onSuccess == 'function' ){
                    onSuccess(socket)
                }
                else {
                    resolve(true)
                }
            })

            // Listen for data from the Server
            socket.on('data', (r) => {
                let response = r.toString()
                let json =  null
            
                try {
                    console.log(json)
                    json = JSON.parse(r)
                    resolve(json, response)
                }
                catch(jsonError) {
                    reject(jsonError)
                }
            })
    
            // Handle errors
            socket.on('error', (err) => {
                clearTimeout(connectionTimeout)
                reject(err)
            })
        })
    },

    send(requestObject={}){
        return new Promise((resolve, reject) => {        
            const client = new net.Socket();
    
            // Set up a timeout function
            const timeoutId = setTimeout(() => {
                client.destroy()
                reject( new Error('PS5 Connection timed out at ' + this.getURL('url') ) )
            }, this.getTimeout());
    
            // Connect to the server
            client.connect(this.getURL('ps'), () => {
                console.log('Connected to PS5');

                if( !requestObject ){
                    client.destroy()
                    resolve(true)
                    return
                }

                const jsonString = JSON.stringify(requestObject);
                client.write(jsonString);
            });
    
            // Listen for data from the server
            client.on('data', (data) => {
                clearTimeout(timeoutId);
                console.log('Received data from server:', data.toString());

                try {
                    const receivedObject = JSON.parse(data);
                    resolve(receivedObject);
                    client.end();
                }
                catch(e){
                    reject(e)
                }    
            });
    
            // Handle errors
            client.on('error', (error) => {
                clearTimeout(timeoutId);
                console.error('Socket error:', error);

                if( error.code == 'ECONNREFUSED' )
                    return reject(`PS5 Connection failed at ${this.getURL('url')}`)

                reject(error);
            });
    
            // Handle socket closure
            client.on('close', () => {
                console.log("Close Connection to PS5")
                clearTimeout(timeoutId);
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
        return this.send(null)
    },

    install(file, cb=null){
        if(!file.url){
            return new Promise( (resolve, reject) => reject("Can't find file URL for " + file.name) )
        }

        return this.send({ url: file.url })

        // #notstatisfying 
        // Previous work, but not statisfying for me
        // keep it for further improvements or flashbacks
        // return this.request( 
        //         (socket) => {
        //             socket.write(JSON.stringify({ url: file.url }))
                    
        //             if( typeof cb == 'function')
        //                 cb()
        //         }
        //     )
    },

}

Vue.prototype.$ps5 = ps5
