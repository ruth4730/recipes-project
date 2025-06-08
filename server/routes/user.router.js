import { Router } from "express";
import { getAllUsers, signIn, signUp, newPassword, deleteUser } from "../controllers/users.controller.js";
import { auth, authAdmin } from "../middlewares/auth.middleware.js"
const router = Router();
router.get('/', auth, authAdmin, getAllUsers);
router.post('/sign-in', signIn);
router.post('/', signUp);
router.put('/:id', auth, newPassword);
router.delete('/:id', auth, authAdmin, deleteUser)
export default router; 