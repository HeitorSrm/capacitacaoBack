import { Request, Response } from "express";
import { CreateSupplierService } from "../../services/supplier/CreateSupplierService";

class CreateSupplierController {
    async handle(request: Request, response: Response) {
        const { name, email, phone } = request.body;
        const user_id = request.user_id;

        const createSupplierService = new CreateSupplierService();

        const supplier = await createSupplierService.execute({ name, email, phone, user_id });

        return response.status(201).json(supplier);
    }
}

export { CreateSupplierController };
