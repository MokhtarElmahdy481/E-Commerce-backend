import mongoose, { Types } from "mongoose";

const brandSchema = new mongoose.Schema(
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

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
