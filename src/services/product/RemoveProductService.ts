import prismaClient from "../../prisma";
import { RemoveProductRequest } from "../../models/interfaces/product/RemoveProductRequest";

class RemoveProductService {
    async execute({ product_id }: RemoveProductRequest) {
        if (!product_id || Number.isNaN(Number(product_id))) {
            throw new Error("Id do produto inválido");
        }

        try {
            const product = await prismaClient.product.delete({
                where: {
                    id: Number(product_id)
                },
                select: {
                    id: true,
                    name: true
                }
            });

            return product;
        } catch (error) {
            // P2025 = registro não existe, P2003 = violação de chave estrangeira
            const code = (error as { code?: string }).code;

            if (code === "P2025") {
                throw new Error("Produto não encontrado");
            }

            if (code === "P2003") {
                throw new Error("Não é possível remover: o produto possui itens vinculados");
            }

            throw error;
        }
    }
}

export { RemoveProductService };