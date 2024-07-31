import slugify from "slugify";
import asyncHandler from "../../../utils/asyncHandler.js";
import Brand from "../../../../DB/models/Brand.js";
import AppError from "../../../utils/AppError.js";

export const getBrands = asyncHandler(async (req, res, next) => {
  const brand = await Brand.find();
  return res.status(200).json({ message: "Brands", brand });
});
export const getBrandById = asyncHandler(async (req, res, next) => {
  // try {
  const brand = await Brand.findById(req.params.id);
  console.log(req.params.id);

  // } catch (error) {
  //     console.log(error);

  // }

  // console.log(brand);
  // if(!brand){
  //     return next(new AppError("Brand not found",404))
  // }
  return res.status(200).json({ message: "Brands" });
});
export const addBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);
  const brand = await Brand.create({ name, slug });
  return res.status(200).json({ message: "Brands" , brand});
});
export const updateBrand = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  const slug = slugify(name);
  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug },
    { new: true }
  );
  return !brand ? 
    next(new AppError("brand not found",404))
  : res.status(200).json({ message: "updated", brand });
});
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findByIdAndDelete(
    id,
    { new: true }
  );
  return !brand ? 
    next(new AppError("brand not found",404))
  : res.status(200).json({ message: "deleted", brand });
});
