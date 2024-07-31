import { Router } from "express";
import * as subCategoryController from "./controller/subCategory.controller.js"
const router = Router({mergeParams: true})

router.get("/",subCategoryController.getSubCategories)
router.post("/",subCategoryController.addSubCategory)
router.get("/:id",subCategoryController.getSubCategoryById)
router.put("/:id",subCategoryController.updateSubSubCategory)
router.delete("/:id",subCategoryController.deleteSubCategory)


export default router