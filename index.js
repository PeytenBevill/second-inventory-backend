const express = require("express");
const connection = require("./sql/connection");
const cors = require("cors");

const app = express();

const PORT = 8080;

app.use(express.json());
// app.use(cors())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "New attempt at building this API",
  });
});

app.get("/inventory", (req, res) => {
  connection.query("SELECT * FROM inventory", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/inventory/id/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM inventory WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (rows.length === 0) {
        res.status(404).json({ error: "Item not found" });
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

app.get("/inventory/product/:product", (req, res) => {
  const { product } = req.params;

  connection.query(
    "SELECT * FROM inventory WHERE product LIKE ?",
    [`${product}%`],
    (err, rows, fields) => {
      if (err) {
        console.error("Error searching for inventory:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (rows.length === 0) {
        res.status(404).json({ error: "Item not found" });
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

app.post("/inventory", (req, res) => {
  const { product, company, unit_cost, total_stock } = req.body;

  connection.query(
    "INSERT INTO inventory (product, company, unit_cost, total_stock) VALUES (?, ?, ?, ?)",
    [product, company, unit_cost, total_stock],
    (err, rows, fields) => {
      res.json({
        message: "Item added!",
      });
    }
  );
});

app.put("/inventory/stock/:id", (req, res) => {
  const { id } = req.params;
  const { total_stock } = req.body;

  connection.query(
    "UPDATE inventory SET total_stock = ? WHERE id = ?",
    [total_stock, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Total stock updated successfully" });
    }
  );
});

app.put("/inventory/price/:id", (req, res) => {
  const { id } = req.params;
  const { unit_cost } = req.body;

  connection.query(
    "UPDATE inventory SET unit_cost = ? WHERE id = ?",
    [unit_cost, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Unit cost updated successfully" });
    }
  );
});

app.delete("/inventory/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM inventory WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json({ message: "Item deleted successfully" });
    }
  );
});

app.get("/computers", (req, res) => {
  connection.query("SELECT * FROM computers", (err, rows, fields) => {
    if (err) {
      console.error("Error fetching data from the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.get("/saleHistory", (req, res) => {
  connection.query("SELECT * FROM sale_history", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
});

app.post("/saleHistory", (req, res) => {
  const {product, company, unit_cost, total, computer_num, date} = req.body
  connection.query("INSERT INTO sale_history (product, company, unit_cost, total, computer_num, date) VALUES (?, ?, ?, ?, ?, ?)", [product, company, unit_cost, total, computer_num, date], (err, rows, fields) => {
    res.json({
      message: "Sale added!",
    });
  })
})

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
