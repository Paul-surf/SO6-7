// Her laver vi en local server til vores projekt
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

//Her connecter vi til vores arduino
//Med hjælp af parsers.
//SeiralPort kommer fra package.json hvor den er deffineret
var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

//Her ændre vi porten til vores rigtige board/port
var port = new SerialPort('COM10',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

//Opprettelse af hjemmeside
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

//Her tjekker vi om vores socket io lib er connect og aktiv
var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

//Her aktivere vi vores data og sender det ind i vores terminal/console
parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', "Temperature " + data + " C");
    store(data);
});

function store (data) {
    console.log('store ' + data);
}

app.listen(3000);