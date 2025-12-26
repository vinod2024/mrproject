const express = require('express');

const router = express.Router();
const { postValidation } = require('../helpers/validation');
const postController = require('../controllers/postController');

const auth = require('../middleware/auth');

// Convert req.body to plain object
/* const parseBodyData = (req, res, next) => {
  req.body = { ...req.body };
  next();
} */

router.post('/', auth.isAuthorise, postValidation, postController.addPost);
router.get('/', postController.getPostList);
router.get('/:id', postController.getPost);
router.put('/:id', auth.isAuthorise, postValidation, postController.updatePost);
router.delete('/:id', auth.isAuthorise, postController.deletePost);

module.exports = router;