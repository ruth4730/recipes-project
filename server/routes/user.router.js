import { Router } from "express";
import { getAllUsers, signIn, signUp, newPassword } from "../controllers/users.controller";
const router=Router();
router.get('/',getAllUsers);
router.post('/sign-in', signIn);
router.post('/', signUp);
router.put('/:id',newPassword);