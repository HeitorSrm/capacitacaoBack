import prismaClient from "../../prisma";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductService {
    async execute({ product_id, name, price, description, amount, category_id, supplier_id, banner }: EditProductRequest) {
        const id = Number(product_id);

        if (!Number.isInteger(id)) {
            throw new Error("Id do produto inválido");
        }

        // só entra em "data" o que foi enviado
        const data: {
            name?: string;
            price?: number;
            description?: string;
            amount?: number;
            categoryId?: number;
            supplierId?: number;
            banner?: string;
        } = {};

        if (name !== undefined) {
            if (typeof name !== "string" || name.trim() === "") {
                throw new Error("Nome do produto inválido");
            }

            data.name = name.trim();
        }

        if (price !== undefined) {
            // aceita "10.50" ou "10,50"
            const parsedPrice = Number(String(price).replace(",", "."));

            if (price === "" || Number.isNaN(parsedPrice) || parsedPrice < 0) {
                throw new Error("Preço inválido");
            }

            data.price = parsedPrice;
        }

        if (description !== undefined) {
            if (typeof description !== "string" || description.trim() === "") {
                throw new Error("Descrição do produto inválida");
            }

            data.description = description.trim();
        }

        if (amount !== undefined) {
            const parsedAmount = Number(amount);

            if (amount === "" || !Number.isInteger(parsedAmount) || parsedAmount < 0) {
                throw new Error("Quantidade inválida");
            }

            data.amount = parsedAmount;
        }

        if (category_id !== undefined) {
            const categoryId = Number(category_id);

            if (!Number.isInteger(categoryId)) {
                throw new Error("Categoria inválida");
            }

            data.categoryId = categoryId;
        }

        if (supplier_id !== undefined) {
            const supplierId = Number(supplier_id);

            if (!Number.isInteger(supplierId)) {
                throw new Error("Fornecedor inválido");
            }

            data.supplierId = supplierId;
        }

        if (banner !== undefined) {
            data.banner = banner;
        }

        if (Object.keys(data).length === 0) {
            throw new Error("Informe ao menos um campo para editar");
        }

        try {
            const product = await prismaClient.product.update({
                where: {
                    id: id
                },
                data: {
                    ...data,
                    update_at: new Date()
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
            // P2025 = registro não encontrado | P2003 = categoria ou fornecedor não existem
            const code = (error as { code?: string }).code;

            if (code === "P2025") {
                throw new Error("Produto não encontrado");
            }

            if (code === "P2003") {
                throw new Error("Categoria ou fornecedor não encontrado");
            }

            throw error;
        }
    }
}

export { EditProductService };