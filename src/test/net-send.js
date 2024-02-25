const net = require('net')

function send(socket, packet){
    return new Promise((resolve, reject) => {
        if( !socket ){
            reject("No Socket available")
        }

        socket.write(packet)

        socket.on('data', (data) => {
            resolve(data.toString())
        })

        socket.on('error', (error) => {
            reject(error)
        })
    })

}

const socket = new net.Socket()

let connectTo = { host: '127.0.0.1', port: 9090}

socket.connect(connectTo, async () => {
    // console.log("Connected")
    // console.log("Send test JSON")

    let packet = {
        url: "http://127.0.0.1/random"
    }
    
    let data = await send(socket, JSON.stringify(packet))

    console.log({ data })

    // socket.end()
})

socket.on('error', (err) => {
    console.log(err)
})