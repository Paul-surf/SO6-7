//SeiralPort kommer fra package.json hvor den er deffineret
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
// Her laver vi en const til mysql
const mysql = require('mysql');
// Her laver vi variabler til en localhost server
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

// Her opretter vi vores localhost
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

//Her tjekker vi om vores socket io lib er connect og aktiv
var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
});

// Her laver vi en connection til vores Database
const dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "arduinotemp"
});

// Her siger vi at den skal sende ny data ind hver gang der er linje skift
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

//Her laver vi en port til vores Arduino
const port = new SerialPort('COM10', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

// Her laver vi en .pipe mellem Port og parser for og få data'en
port.pipe(parser);

// Her skaber vi en connection til databasen
dbCon.connect(function (err){
    if (err) throw err;
    console.log('Connected to db');
});

// Her siger vi "Når der kommer data så aktiver function store"
parser.on('data', store);

// Her gemmer vi og sender temperaturen til db
function store(Temperatur) {
    // Her tjekker vi om temperaturen kommer igennem
    console.log('store ' + Temperatur);
    // Her sender vi vores temperatur ind på vores hjemmeside
    io.emit('data', "Temperature " + Temperatur + " C");    
    //Her definere vi vores sql insert - for og sende data til db
    const sql = "INSERT INTO measurements (Temperatur) VALUES (?)";
    // Her sender vi vores temperatur ind i vores db table
    dbCon.query(sql, Temperatur, function (err, result) {
        // Hvis den ikke kan sende temperaturen ind i db så kaster den en fejl
        if (err) throw err;
        // Her fortæller terminalen os at temperaturen blev sendt ind i Db
        console.log("Temperature inserted " + Temperatur);
//         dbCon.query("SELECT * FROM measurements", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
    });
}
function graf() {
var ctx = document.getElementById("myChart").getContext("2d");



const id = dbcon.query('SELECT * FROM measurements order by ID');

const xValues = id;

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: xValues,
    datasets: [
      {
        label: "Fixed dataset",
        borderColor: "rgb(132, 99, 255)"
      }
    ]
  },
});
}
// Her sender vi vores temperatur ind på hjemmesiden
app.listen(3000);