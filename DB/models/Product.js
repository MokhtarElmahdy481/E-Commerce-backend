import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      unique: [true, "title is unique"],
      minLength: [2, "min length is 2 characters"],
      maxLength: [255, "max length is 25 characters"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      minLength: [3, "min length is 3 characters"],
      maxLength: [1500, "max length is 25 characters"],
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      trim: true,
      lowerCase: true,
    },
    mainImage: String,
    coverImage: [String],
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "min price is 0"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "discount price is 0"],
    },
    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: [0, "min stock is 0"],
    },
    sold: {
      type: Number,
      min: [0, "min sold is 0"],
      default: 0,
    },
    rateCount: {
      type: Number,
      min: [0, "min sold is 0"],
    },
    rateAverage: {
      type: Number,
      min: [0, "min sold is 0"],
    },
    brand: {
      type: Types.ObjectId,
      required: [true, "brand by is required"],
      ref: "Brand",
    },
    category: {
      type: Types.ObjectId,
      required: [true, "category by is required"],
      ref: "Category",
    },
    subCategory: {
      type: Types.ObjectId,
      required: [true, "sub category by is required"],
      ref: "SubCategory",
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


productSchema.pre('save', function(next) {
  if (this.mainImage && !this.mainImage.startsWith('http://localhost:5000/uploads/product/')) {
    this.mainImage = `http://localhost:5000/uploads/product/${this.mainImage}`;
  }

  if(this.coverImage && this.coverImage.length){
    this.coverImage = this.coverImage.map(element => {
      if (!element.startsWith('http://localhost:5000/uploads/product/')) {
        return `http://localhost:5000/uploads/product/${element}`
      }
    })
  }
  next();
});


// productSchema.post("init", (doc) => {
//   if (doc.mainImage) {
//     doc.mainImage = "http://localhost:5000/uploads/product" + doc.mainImage;
//   }
//   if (doc.coverImage) {
//     doc.coverImage = "http://localhost:5000/uploads/product" + doc.coverImage;
//   }
// });

const Product = mongoose.model("Product", productSchema);

export default Product;
