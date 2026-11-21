import prismaClient from "../../prisma";
import { ListProductByCategoryRequest } from "../../models/interfaces/product/ListProductByCategoryRequest";

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryRequest) {
        const categoryId = Number(category_id);

        if (!Number.isInteger(categoryId)) {
            throw new Error("Categoria inválida");
        }

        const products = await prismaClient.product.findMany({
            where: {
                categoryId: categoryId
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
            },
            orderBy: {
                id: "asc"
            }
        });

        return products;
    }
}

export { ListProductByCategoryService };