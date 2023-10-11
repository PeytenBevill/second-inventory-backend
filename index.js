const express = require("express");
const authenticateJWT = require('./auth')
const computerRouter = require('./src/routes/R-computers')
const inventoryRouter = require('./src/routes/R-inventory')
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // !!THiS IS FOR DEV - We replace this once we have our production URL in place.
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   'https://main--papaya-paprenjak-1f5aa6.netlify.app'
  // );

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use('/', computerRouter)
app.use('/', inventoryRouter)


app.get("/", (req, res) => {
  res.json({
    message: "New attempt at building this API",
  });
});



// app.get('/inventory', (req, res) => {
//   connection.query('SELECT * FROM inventory', (err, results) => {
//       if(err) {
//         console.log(err)
//       } else {
//         res.json(results)
//       }
//   })
// })

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
