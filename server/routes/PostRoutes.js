import express from 'express';
import {
  createPost,
  deletePost,
  getAllPost,
  getIdPost,
  updatePost,
} from '../controllers/PostControl.js';

const router = express.Router();

router.get('/', getAllPost);
router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getIdPost);

export default router;
