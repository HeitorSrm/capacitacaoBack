import prismaClient from "../../prisma";
import { DetailProductRequest } from "../../models/interfaces/product/DetailProductRequest";

class DetailProductService {
    async execute({ product_id }: DetailProductRequest) {
        if (!product_id || !Number.isInteger(Number(product_id))) {
            throw new Error("Id do produto inválido");
        }

        const product = await prismaClient.product.findFirst({
            where: {
                id: Number(product_id)
            },
            include: {
                supplier: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                }
            }
        });

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        return product;
    }
}

export { DetailProductService };
