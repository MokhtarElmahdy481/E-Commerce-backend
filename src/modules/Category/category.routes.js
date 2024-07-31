import { Router } from "express";
import * as categoryController from "./controller/category.controller.js"
import uploadFile, { customValidation } from "../../middleware/uploadFile.js";
import subCategoryRoutes from "../SubCategory/subCategory.routes.js"
const router = Router()

router.get("/",categoryController.getCategories)
router.post("/",uploadFile(customValidation.images,"category").single("image"),categoryController.addCategory)
router.get("/:id",categoryController.getCategoryById)
router.put("/:id",uploadFile(customValidation.images,"category").single("image"),categoryController.updateCategoty)
router.delete("/:id",categoryController.deleteCategoty)
router.use("/:id/subCategories",subCategoryRoutes)
export default router