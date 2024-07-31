import mongoose, { Types } from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: [true, "name is unique"],
      minLength: [2, "min length is 2 characters"],
      maxLength: [25, "max length is 25 characters"],
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      trim: true,
      lowerCase: true,
    },
    image: String,
    category: {
      type: Types.ObjectId,
      required: [true, "category by is required"],
      ref: "Category",
    },
    createdBy: {
      type: Types.ObjectId,
      // required: [true , "created by is required"],
      // ref: "User",
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
