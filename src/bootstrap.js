import globalError from "./middleware/globalError.js";
import AppError from "./utils/AppError.js";
import categoryRoutes from "./modules/Category/category.routes.js";
import subCategoryRoutes from "./modules/SubCategory/subCategory.routes.js";
import brandRoutes from "./modules/Brand/brand.routes.js";
import productsRoutes from "./modules/Products/products.routes.js";
import connectDB from "../DB/connection.js";
const bootstrap = (app, express) => {
  process.on("uncaughtException", (error) => {
    console.log(error.message);
  });
  app.use(express.json());
  app.use('/uploads',express.static('uploads'));
  const baseUrl = "/api/v1"
  connectDB();
  app.use(`${baseUrl}/categories`, categoryRoutes);
  app.use(`${baseUrl}/subCategories`, subCategoryRoutes);
  app.use(`${baseUrl}/brands`, brandRoutes);
  app.use(`${baseUrl}/products`, productsRoutes);

  app.use("*", (req, res, next) => {
    next(new AppError("invalid route", 404));
  });
  process.on("unhandledRejection", (error) => {
    console.log(error.message);
  });
  app.use(globalError);
};
export default bootstrap;
