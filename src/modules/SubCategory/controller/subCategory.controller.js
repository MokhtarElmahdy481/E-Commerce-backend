import slugify from "slugify";
import asyncHandler from "../../../utils/asyncHandler.js";
import SubCategory from "../../../../DB/models/SubCategory.js";
import AppError from "../../../utils/AppError.js";

export const getSubCategories = asyncHandler(async (req, res, next) => {
  
  const subCategory = await SubCategory.find({category: req.params.id}).populate("category");
  return res.status(200).json({ message: "SubCategories", subCategory });
});
export const getSubCategoryById = asyncHandler(async (req, res, next) => {
  // try {
  const subCategory = await SubCategory.findById(req.params.id).populate("category");
  console.log(req.params.id);

  // } catch (error) {
  //     console.log(error);

  // }

  // console.log(subCategory);
  if(!subCategory){
      return next(new AppError("SubCategory not found",404))
  }
  return res.status(200).json({ message: "SubCategories" ,subCategory});
});
export const addSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const slug = slugify(name);
  const subCategory = await SubCategory.create({ name, category, slug });
  return res.status(200).json({ message: "SubCategories", subCategory });
});
export const updateSubSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  req.body.slug = slugify(req.body.name);
  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  return !subCategory
    ? next(new AppError("subCategory not found", 404))
    : res.status(200).json({ message: "updated", subCategory });
});
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findByIdAndDelete(id, { new: true });
  return !subCategory
    ? next(new AppError("SubCategory not found", 404))
    : res.status(200).json({ message: "deleted", subCategory });
});
