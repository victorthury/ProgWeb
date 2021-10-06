import express from 'express';
import mainController from '../controllers/main';

const router = express.Router();

router.post('/logout', mainController.logout);
router.post('/login', mainController.login);
router.post('/signup', mainController.signup);

export default router;
