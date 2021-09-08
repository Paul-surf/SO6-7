var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "arduinotemp"
});

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM measurements", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO measurements (Temperatur) VALUES (15)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})