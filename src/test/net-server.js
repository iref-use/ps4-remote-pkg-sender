const net = require('net')

// header
console.log("--------------------------------")
console.log(" Starting Test net-server.js")
console.log("--------------------------------")

// create server
var server = net.createServer( function(socket){
    // socket.write('NET Client Server\r\n')
    // socket.pipe(socket)

    socket.on('data', (data) => {
        // console.log(`[Request at ${(new Date).toISOString()}]`)
        console.log( data.toString() )

        // dynamic response
        let response = {
            res: "0", // (new Date).getTime()
        }

        // send response back
        socket.write( JSON.stringify(response) )

        // static response
        // socket.write( JSON.stringify({ res: 0 }) )
    })
})

// handle errors 
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('Port is already in use. Abording')
    } else {
        console.error('Error occurred:', err)
    }
})

// listen to port 
server.listen(9090, '127.0.0.1')