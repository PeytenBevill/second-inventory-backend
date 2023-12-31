const express = require("express");
const usb = require("usb");
const connection = require("./sql/connection");
const cors = require("cors");

const app = express();

const PORT = 8080;

app.use(express.json());
// app.use(cors())
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://main--elegant-donut-fc6e45.netlify.app",
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

app.put("/computers/:id", (req, res) => {
  const { id } = req.params;
  const { comp_status } = req.body;
  connection.query(
    "UPDATE computers SET comp_status = ? WHERE computer_num = ?",
    [comp_status, id],
    (err, rows, fields) => {
      if (err) {
        console.log("Error updating computer status:", err);
      } else {
        res.json({ message: "Computer status updated" });
      }
    }
  );
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

app.get("/saleHistory/cost/:cost", (req, res) => {
  const { cost } = req.params;
  connection.query(
    "SELECT * FROM sale_history WHERE total = ?",
    [cost],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/saleHistory/date/:date", (req, res) => {
  const { date } = req.params;
  connection.query(
    "SELECT * FROM sale_history WHERE date = ?",
    [date],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/saleHistory", (req, res) => {
  const { items, total, computer_num, date } = req.body;

  const itemsJSON = JSON.stringify(items);

  connection.query(
    "INSERT INTO sale_history (receipt_data, total, computer_num, date) VALUES (?, ?, ?, ?)",
    [itemsJSON, total, computer_num, date],
    (err, rows, fields) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        res.json({ message: "Sale added!" });
      }
    }
  );
});

app.get("/holds/:phone_num", (req, res) => {
  const { phone_num } = req.params;
  connection.query(
    "SELECT * FROM holds WHERE phone_num = ?",
    [phone_num],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/holds", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_num,
    receipt_data,
    total,
    remaining_balance,
    computer_num,
    date,
  } = req.body;
  console.log("backend log", remaining_balance);
  const itemsJSON = JSON.stringify(receipt_data);

  connection.query(
    "INSERT INTO holds (first_name, last_name, email, phone_num, receipt_data, total, remaining_balance, computer_num, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      first_name,
      last_name,
      email,
      phone_num,
      itemsJSON,
      total,
      remaining_balance,
      computer_num,
      date,
    ],
    (err, rows, fields) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        res.json({ message: "Hold added!" });
      }
    }
  );
});

app.put("/holds/remaining_balance/:id", (req, res) => {
  const { remaining_balance } = req.body;
  const { id } = req.params;

  connection.query(
    "UPDATE holds SET remaining_balance = ? WHERE id = ?",
    [remaining_balance, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Account not found" });
      }

      res.json({ message: "Balance updated" });
    }
  );
});



//USB SCAN

app.get('/check-scanner', (req, res) => {
  const device = usb.findByIds(0x05E0, 0x1200); // Vendor ID and Product ID for CipherLab 8000

  if (device) {
    res.json({ isScannerConnected: true });
  } else {
    res.json({ isScannerConnected: false });
  }
});


app.post('/start-scan', (req, res) => {
  const device = usb.findByIds(0x05E0, 0x1200); // Vendor ID and Product ID for CipherLab 8000

  if (device) {
    // Open the USB device
    device.open();

    // Claim the scanner interface
    const scannerInterface = device.interface(0);
    scannerInterface.claim();

    // Listen for data on the USB interface
    scannerInterface.on('data', (data) => {
      const scannedData = data.toString('utf8');
      console.log('Scanned Data:', scannedData);

      // Process the scanned data and save it to the database using the item code
      connection.query(
        'SELECT * FROM items WHERE item_code = ?',
        [scannedData],
        (error, results) => {
          if (error) {
            console.error('Error querying the database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }

          if (results.length > 0) {
            // If the item code exists, increment the quantity
            connection.query(
              'UPDATE items SET quantity = quantity + 1 WHERE item_code = ?',
              [scannedData],
              (updateError) => {
                if (updateError) {
                  console.error('Error updating quantity:', updateError);
                  res.status(500).json({ error: 'Internal Server Error' });
                  return;
                }
                console.log('Quantity updated successfully');
                res.json({ message: 'Data received successfully' });
              }
            );
          } else {
            // If the item code doesn't exist, insert a new record with quantity 1
            connection.query(
              'INSERT INTO items (item_code, quantity) VALUES (?, 1)',
              [scannedData],
              (insertError) => {
                if (insertError) {
                  console.error('Error inserting new record:', insertError);
                  res.status(500).json({ error: 'Internal Server Error' });
                  return;
                }
                console.log('New record inserted successfully');
                res.json({ message: 'Data received successfully' });
              }
            );
          }
        }
      );
    });
  } else {
    console.error('CipherLab scanner not found.');
    res.status(500).json({ error: 'CipherLab scanner not found' });
  }
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
