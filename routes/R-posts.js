const express = require('express');
const router = express.Router();
const cors = require('cors');
const postController = require('../controllers/C-posts');

const corsOptions = {
  origin: ['http://localhost:5174', 'https://main--papaya-paprenjak-1f5aa6.netlify.app'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'X-Requested-With,content-type',
  credentials: true,
};

// router.get('/posts/:user_id', cors(corsOptions), postController.list);
router.get('/posts/:user_id', postController.list);

router.post('/posts/:user_id', cors(corsOptions), postController.create);
router.put('/posts/:user_id/:id', cors(corsOptions), postController.update);
router.delete('/posts/:user_id/:id', cors(corsOptions), postController.deletePost);

module.exports = router;
