import express from 'express';
import { getAllUser, login, register } from '../controllers/UserControl.js';

const router = express.Router();

router.get('/', getAllUser);
router.post('/register', register);
router.post('/login', login);

export default router;
