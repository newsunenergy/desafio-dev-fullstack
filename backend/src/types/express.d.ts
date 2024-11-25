import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File; // Define o tipo para `req.file`
    }
  }
}
