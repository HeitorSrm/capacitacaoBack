import prismaClient from "../../prisma";

class ListCategoryService {
    async execute() {
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                id: "asc"
            }
        });

        return categories;
    }
}

export { ListCategoryService };