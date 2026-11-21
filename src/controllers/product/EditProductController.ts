import { Request, Response } from "express";
import { EditProductService } from "../../services/product/EditProductService";

class EditProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.params.id;
        const { name, price, description, amount, category_id, supplier_id } = request.body;

        // a imagem é opcional: só troca o banner se uma nova for enviada
        const banner = request.file ? request.file.filename : undefined;

        const editProductService = new EditProductService();

        const product = await editProductService.execute({
            product_id,
            name,
            price,
            description,
            amount,
            category_id,
            supplier_id,
            banner
        });

        return response.json(product);
    }
}

export { EditProductController };