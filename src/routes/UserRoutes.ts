import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticateJWT from '../middleware/auth';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users', authenticateJWT, UserController.getAllUsers);
router.get('/users/:id', authenticateJWT, UserController.getUserById);
router.put('/users/:id', authenticateJWT, UserController.updateUser);
router.delete('/users/:id', authenticateJWT, UserController.deleteUser);
router.get('/users/filter/:id', UserController.filterUsersByUserId);
export default router;
