const express = require("express");
const connection = require("./sql/connection");

const app = express();

const PORT = 5555;

app.use(express.json());
// app.use(cors())

app.get("/", (req, res) => {
  res.json({
    message: "New attempt at building this API",
  });
});

app.get('/inventory', (req, res) => {
  connection.query('SELECT * FROM inventory', (err, results) => {
      if(err) {
        console.log(err)
      } else {
        res.json(results)
      }
  })
})

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
