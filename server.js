const express = require('express')
const app = express()
const port = 3100

app.use(express.static(__dirname + "/public"));


// Her var testede vi med data ind i en graf
// Men blev ikke færdig
app.get('/api/temperature', (req, res) => {
    const arr = [
        {temp:22.6, time: 12.30},
        {temp:24.7, time: 12.40},
        {temp:25, time: 12.50}
    ]
    res.send(JSON.stringify(arr))
  })







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})