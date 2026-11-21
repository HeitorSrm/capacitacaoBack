import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, description, category_id, amount } = request.body;
        // aceita supplierId (enunciado da Tarefa 04) ou supplier_id
        const supplier_id = request.body.supplierId ?? request.body.supplier_id;
        const user_id = request.user_id;

        if (!request.file) {
            throw new Error("Erro ao enviar a imagem");
        }

        const banner = request.file.filename;

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name,
            price,
            description,
            banner,
            category_id,
            supplier_id,
            amount,
            user_id
        });

        return response.status(201).json(product);
    }
}

export { CreateProductController };