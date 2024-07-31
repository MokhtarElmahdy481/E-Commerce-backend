import mongoose, { Types } from "mongoose";

const categorySchema = new mongoose.Schema(
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


// categorySchema.post("init", (doc) => {
//   console.log("image before",doc.image);
//   const baseUrl = "http://localhost:5000/uploads/category/";

//   doc.image = baseUrl + doc.image;
//   console.log("image after",doc.image);
// });


// categorySchema.pre("save", (doc) => {
//   const baseUrl = "http://localhost:5000/uploads/";
//   if (doc.image) {
//     doc.image = `http://localhost:5000/uploads/category/${doc.image}`;
//   }
// });

categorySchema.pre('save', function(next) {
  if (this.image && !this.image.startsWith('http://localhost:5000/uploads/category/')) {
    this.image = `http://localhost:5000/uploads/category/${this.image}`;
  }
  next();
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
