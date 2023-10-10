const pool = require('../sql/connection')

const list = (req, res) => {
  const {user_id} = req.params
  pool.query('SELECT post_title, post_body FROM posts WHERE user_id = ?',[user_id], (err, rows, fields) => {
    if(err){
      return res.status(500).json({message: err.message})
    } 
    res.json(rows)
  })
}

// const show = (req, res) => {
//   const {id} = req.params
//   pool.query(`SELECT * FROM pets WHERE id = ${id}`, (err, row, fields) => {
//     if(err){
//       return res.status(500).json({message: err.message})
//     } 
//     res.json(row)
//   })
// }
//create

// const addPet = (req, res) => {
//   const {petName1, petName2, petName3} = req.body
//    pool.query('INSERT INTO pets (pet1, pet2, pet3) VALUES (?, ?, ?)', [
//     petName1,
//     petName2,
//     petName3,
//   ], (err, row, fields) => {
//     if(err){
//       return res.status(500).json({ message: err.message });
//     }
//     res.json({ message: 'Pet names added successfully' });

//   });

// };



const create = (req, res) => {
  const { user_id } = req.params;
  const { post_title, post_body } = req.body;
  pool.query(
    'INSERT INTO posts (post_title, post_body, user_id) VALUES (?, ?, ?);',
    [post_title, post_body, user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Post created successfully' });
    }
  );
};



//update
const update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  pool.query(
    'UPDATE posts SET ? WHERE id = ?',
    [updatedData, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json({ message: 'Post updated successfully' });
    }
  );
};

//delete
const deletePost = (req, res) => {
  const id = req.params.id;
  
  pool.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  });
};



module.exports = {
  list,
  create,
  update,
  deletePost
}