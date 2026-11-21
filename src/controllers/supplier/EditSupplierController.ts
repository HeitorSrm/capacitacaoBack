import { Request, Response } from "express";
import { EditSupplierService } from "../../services/supplier/EditSupplierService";

class EditSupplierController {
    async handle(request: Request, response: Response) {
        const supplier_id = request.params.id as string;
        const { name, email, phone } = request.body;

        const editSupplierService = new EditSupplierService();

        const supplier = await editSupplierService.execute({ supplier_id, name, email, phone });

        return response.json(supplier);
    }
}

export { EditSupplierController };
