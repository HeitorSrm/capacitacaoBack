import prismaClient from "../../prisma";

class ListProductService {
    async execute() {
        const products = await prismaClient.product.findMany({
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

export { ListProductService };