import { Request, Response } from "express";
import { RemoveProductService } from "../../services/product/RemoveProductService";

class RemoveProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.params.id;

        const removeProductService = new RemoveProductService();

        await removeProductService.execute({ product_id });

        return response.json({ message: "Produto removido com sucesso!" });
    }
}

export { RemoveProductController };