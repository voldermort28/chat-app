var express = require('express')
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use(express.static('public'))

app.get('/', (req, res)=>{
    // res.send('<h1>Hello</h1>')
    res.render('index.pug')
})

io.on('connection', (socket)=>{
    console.log('a user connected');
    socket.on('chat message', (msg)=>{
        console.log('message: '+ msg);
        io.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

http.listen(3000, ()=>{
    console.log('listening on *:3000');
})