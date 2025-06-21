import { Router } from "express";
import { getAllRecipes } from "../controllers/recipes.controller.js"
const router = Router();
router.get('/', getAllRecipes);
export default router; 