const pool = require("../sql/connection");

//testing connection
const getInventory = (req, res) => {
  pool.query("SELECT * FROM inventory", (err, rows, fields) => {
    if (err) {
      console.error("Error fetching data from the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
};

const getItemById = (req, res) => {
  const { id } = req.params;
  pool.query(
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
};

// const getItemByProduct = (req, res) => {
//   const { product } = req.params;
//   pool.query(
//     "SELECT * FROM inventory WHERE product = ?",
//     [product],
//     (err, rows, fields) => {
//       if (rows.length === 0) {
//         res.status(404).json({ error: "Item not found" });
//       } else {
//         res.status(200).json(rows);
//       }
//     }
//   );
// };

const getItemByProduct = (req, res) => {
  const { product } = req.params;

  pool.query(
    "SELECT * FROM inventory WHERE product LIKE ?",
    [`${product}%`],
    (err, rows, fields) => {
      if (err) {
        console.error('Error searching for inventory:', err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (rows.length === 0) {
        res.status(404).json({ error: "Item not found" });
      } else {
        res.status(200).json(rows);
      }
    }
  );
};


const addInventory = (req, res) => {
  const { product, company, unit_cost, total_stock } = req.body;

  pool.query(
    "INSERT INTO inventory (product, company, unit_cost, total_stock) VALUES (?, ?, ?, ?)",
    [product, company, unit_cost, total_stock],
    (err, rows, fields) => {
      res.json({
        message: "Computer added!",
      });
    }
  );
};

const updateStock = (req, res) => {
  const {id} = req.params
  const {total_stock} = req.body

  pool.query('UPDATE inventory SET total_stock = ? WHERE id = ?', [total_stock, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Total stock updated successfully' });
  })
}

const updatePrice = (req, res) => {
  const {id} = req.params
  const {unit_cost} = req.body

  pool.query('UPDATE inventory SET unit_cost = ? WHERE id = ?', [unit_cost, id],(err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Unit cost updated successfully' });
  })
}

const deleteItem = (req, res) => {
 const {id} = req.params
  
  pool.query('DELETE FROM inventory WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  });
}

// const addComputer = async (req, res) => {
//   const {computer_num} = req.body

//   pool.query('INSERT INTO computers (computer_num) VALUES (?)', [computer_num], (err, rows, fields) => {
//     res.json({
//       message: 'Computer added!'
//     })
//   })
// }

module.exports = {
  getInventory,
  getItemById,
  getItemByProduct,
  addInventory,
  updateStock,
  updatePrice,
  deleteItem
};
