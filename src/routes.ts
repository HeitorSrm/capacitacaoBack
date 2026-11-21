import multer from "multer";
import uploadConfig from "./config/multer";
import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { RemoveCategoryController } from "./controllers/category/RemoveCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { ListProductController } from "./controllers/product/ListProductController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";
import { CreateSupplierController } from "./controllers/supplier/CreateSupplierController";
import { ListSupplierController } from "./controllers/supplier/ListSupplierController";
import { DetailSupplierController } from "./controllers/supplier/DetailSupplierController";
import { EditSupplierController } from "./controllers/supplier/EditSupplierController";
import { RemoveSupplierController } from "./controllers/supplier/RemoveSupplierController";


const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.get('/test', (request: Request, response: Response) => {
    return response.json({ ok: true });
});

// Rotas de usuário
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', isAuthenticated, new RemoveUserController().handle);
// Rotas de categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.patch('/category/edit', isAuthenticated, new EditCategoryController().handle);
router.get('/category/all', isAuthenticated, new ListCategoryController().handle);
router.delete('/category/remove', isAuthenticated, new RemoveCategoryController().handle);
// Rotas de produto
router.post('/products', isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.patch('/products/:id', isAuthenticated, upload.single("file"), new EditProductController().handle);
router.get('/products/category', isAuthenticated, new ListProductByCategoryController().handle);
router.get("/products", isAuthenticated, new ListProductController().handle);
router.delete('/products/:id', isAuthenticated, new RemoveProductController().handle);

// Rotas de fornecedor
router.post('/suppliers', isAuthenticated, new CreateSupplierController().handle);
router.get('/suppliers', isAuthenticated, new ListSupplierController().handle);
router.get('/suppliers/:id', isAuthenticated, new DetailSupplierController().handle);
router.patch('/suppliers/:id', isAuthenticated, new EditSupplierController().handle);
router.delete('/suppliers/:id', isAuthenticated, new RemoveSupplierController().handle);
    
export { router };