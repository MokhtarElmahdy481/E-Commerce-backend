import slugify from "slugify";
import asyncHandler from "../../../utils/asyncHandler.js";
import Category from "../../../../DB/models/Category.js";
import AppError from "../../../utils/AppError.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  const category = await Category.find();
  return res.status(200).json({ message: "Categories", category });
});
export const getCategoryById = asyncHandler(async (req, res, next) => {
  // try {
  const category = await Category.findById(req.params.id);
  console.log(req.params.id);

  // } catch (error) {
  //     console.log(error);

  // }

  // console.log(category);
  // if(!category){
  //     return next(new AppError("Category not found",404))
  // }
  return res.status(200).json({ message: "Categories" });
});
export const addCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);
  const category = await Category.create({ name, slug, image :req.file?.filename});
  return res.status(200).json({ message: "Categories" , category});
});
export const updateCategoty = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  const slug = slugify(name);

  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug , image : req.file?.filename },
    { new: true }
  );
  return !category
    ? next(new AppError("category not found", 404))
    : res.status(200).json({ message: "updated", category });
});
export const deleteCategoty = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id, { new: true });
  return !category
    ? next(new AppError("category not found", 404))
    : res.status(200).json({ message: "deleted", category });
});
