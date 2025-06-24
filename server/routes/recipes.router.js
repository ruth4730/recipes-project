import { Router } from "express";
import { getAllRecipes, getMyRecipes } from "../controllers/recipes.controller.js";
import { auth } from "../middlewares/auth.middleware.js"
const router = Router();
router.get('/', getAllRecipes);
router.get('/my-recipes', auth, getMyRecipes);
export default router; 