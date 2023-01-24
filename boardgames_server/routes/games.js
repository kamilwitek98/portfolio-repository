import express from 'express';
import { getGames, createGame, deleteGame, updateGame } from '../controllers/games.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/', getGames);
router.post('/', auth, createGame);
router.delete('/:id', auth, deleteGame);
router.patch('/:id', auth, updateGame);

export default router;