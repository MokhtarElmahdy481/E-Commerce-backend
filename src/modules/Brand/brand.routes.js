import { Router } from "express";
import * as brandController from "./controller/brand.controller.js"
const router = Router()


router.get("/",brandController.getBrands)
router.post("/",brandController.addBrand)
router.get("/:id",brandController.getBrandById)
router.put("/:id",brandController.updateBrand)
router.delete("/:id",brandController.deleteBrand)



export default router