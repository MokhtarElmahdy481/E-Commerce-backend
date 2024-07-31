import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs"
export const customValidation = {
  images: ["image/png", "image/jpg", "image/gif"],
};
const uploadFile = (validation,folderPath) => {
    const filePath = `./uploads/${folderPath}`
    if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath, { recursive: true });
    }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (validation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid format"));
    }
  };
  const upload = multer({ storage, fileFilter });
  return upload;
};
export default uploadFile;
