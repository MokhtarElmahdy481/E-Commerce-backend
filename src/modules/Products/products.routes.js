import { Router } from "express";
import * as productController from "./controller/product.controller.js";
import uploadFile, { customValidation } from "../../middleware/uploadFile.js";
const router = Router();

router.get("/", productController.getProducts);
router.post(
  "/",
  uploadFile(customValidation.images, "product").fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 5,
    },
  ]),
  productController.addProduct
);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
export default router;
