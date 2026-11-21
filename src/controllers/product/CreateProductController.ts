import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, description, category_id, supplier_id, amount } = request.body;
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