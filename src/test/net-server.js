const net = require('net')

console.log("Test net-server.js\\rn")

var server = net.createServer( function(socket){
    socket.write('NET Client Server\r\n')
    socket.pipe(socket)

    socket.on('data', (data) => {
        data = data.toString()            
        data = JSON.parse(data)
        
        console.log( data )
    })
})

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('Port is already in use. Abording')
    } else {
        console.error('Error occurred:', err)
    }
})

server.listen(9090, '127.0.0.1')