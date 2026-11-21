import prismaClient from "../../prisma";
import { ProductRequest } from "../../models/interfaces/product/ProductRequest";

class CreateProductService {
    async execute({ name, price, description, banner, category_id, supplier_id, amount, user_id }: ProductRequest) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Nome do produto inválido");
        }

        // aceita "10.50" ou "10,50"
        const parsedPrice = Number(String(price).replace(",", "."));

        if (price === undefined || price === "" || Number.isNaN(parsedPrice) || parsedPrice < 0) {
            throw new Error("Preço inválido");
        }

        if (typeof description !== "string" || description.trim() === "") {
            throw new Error("Descrição do produto inválida");
        }

        const parsedAmount = Number(amount);

        if (amount === undefined || amount === "" || !Number.isInteger(parsedAmount) || parsedAmount < 0) {
            throw new Error("Quantidade inválida");
        }

        const categoryId = Number(category_id);

        if (!Number.isInteger(categoryId)) {
            throw new Error("Categoria inválida");
        }

        const supplierId = Number(supplier_id);

        if (!Number.isInteger(supplierId)) {
            throw new Error("Fornecedor inválido");
        }

        try {
            const product = await prismaClient.product.create({
                data: {
                    name: name.trim(),
                    price: parsedPrice,
                    description: description.trim(),
                    banner: banner,
                    amount: parsedAmount,
                    categoryId: categoryId,
                    supplierId: supplierId,
                    userId: Number(user_id)
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    amount: true,
                    categoryId: true,
                    supplierId: true
                }
            });

            return product;
        } catch (error) {
            // P2003 = violação de chave estrangeira (categoria, fornecedor ou usuário não existem)
            const code = (error as { code?: string }).code;

            if (code === "P2003") {
                throw new Error("Categoria, fornecedor ou usuário não encontrado");
            }

            throw error;
        }
    }
}

export { CreateProductService };