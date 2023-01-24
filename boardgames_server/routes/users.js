import express from 'express';
import { signin, signup, getUsers, updateUser } from '../controllers/users.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', auth, getUsers);
router.patch('/:id', auth, updateUser);

export default router;