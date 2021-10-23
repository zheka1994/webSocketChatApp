import Router from 'koa-router';
import * as authController from '../controllers/authController.js';

const router = new Router();

router.get('/auth', authController.auth);

router.get('/users', authController.getUsers);

router.post('/register', authController.register);

export default router;
