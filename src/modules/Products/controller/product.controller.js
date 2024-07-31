import slugify from "slugify";
import asyncHandler from "../../../utils/asyncHandler.js";
import Product from "../../../../DB/models/Product.js";
import AppError from "../../../utils/AppError.js";

export const getProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find().populate([
    { path: "category" },
    { path: "subCategory" },
    { path: "brand" },
  ]);
  return res.status(200).json({ message: "Products", product });
});
export const getProductById = asyncHandler(async (req, res, next) => {
  // try {
  const Product = await Product.findById(req.params.id).populate([
    { path: "category" },
    { path: "subCategory" },
    { path: "brand" },
  ]);
  console.log(req.params.id);

  // } catch (error) {
  //     console.log(error);

  // }

  // console.log(product);
  // if(!product){
  //     return next(new AppError("Product not found",404))
  // }
  return res.status(200).json({ message: "Products" });
});
export const addProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  if (req.files && req.files.mainImage) {
    req.body.mainImage = req.files?.mainImage[0]?.filename;
  }
  if (req.files && req.files.coverImage) {
    req.body.coverImage = req.files?.coverImage?.map(
      (element) => element.filename
    );
  }
  // console.log("body",req.body);
  // console.log("file",req.file);
  // console.log("files",req.files);
  // return res.status(200).json({ message: "Products" });
  const product = await Product.create(req.body);
  return res.status(200).json({ message: "Products", product });
});
export const updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  req.body.slug = slugify(req.body.title);
  if (req.files && req.files.mainImage) {
    req.body.mainImage = req.files?.mainImage[0]?.filename;
  }
  if (req.files && req.files.coverImage) {
    req.body.coverImage = req.files?.coverImage?.map(
      (element) => element.filename
    );
  }
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  return !product
    ? next(new AppError("product not found", 404))
    : res.status(200).json({ message: "updated", product });
});
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  return !product
    ? next(new AppError("product not found", 404))
    : res.status(200).json({ message: "deleted", product });
});
