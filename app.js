var express = require('express')
var http = require('http')
var path = require('path')

var app = express()
app.use('/html', express.static('html'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/audio', express.static('audio'))

http.createServer(app).listen(8016, '172.31.10.167')

console.log('mirror2 front')

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function(err){
    console.log("Error: " + err);
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/html/exp.html'));
});

app.get('/record', (req, res) => {
    client.rpush("HCI4BLIND_EXP", req.query.data, redis.print)
    console.log(req.query.data)
    res.send("")
});

app.get('/show', (req, res) => {
    client.lrange("HCI4BLIND_EXP", 0, -1, (err, arr) => {
        res.send(arr.join("<br>"));
    });
});

console.log('mirror2 front webpage');
