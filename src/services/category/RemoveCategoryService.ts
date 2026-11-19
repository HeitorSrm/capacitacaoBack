import prismaClient from "../../prisma";
import { RemoveCategoryRequest } from "../../models/interfaces/category/RemoveCategoryRequest";

class RemoveCategoryService {
    async execute({ category_id }: RemoveCategoryRequest) {
        if (!category_id || Number.isNaN(Number(category_id))) {
            throw new Error("Id da categoria inválido");
        }

        try {
            const category = await prismaClient.category.delete({
                where: {
                    id: Number(category_id)
                },
                select: {
                    id: true,
                    name: true
                }
            });

            return category;
        } catch (error) {
            // P2025 = registro não existe, P2003 = violação de chave estrangeira
            const code = (error as { code?: string }).code;

            if (code === "P2025") {
                throw new Error("Categoria não encontrada");
            }

            if (code === "P2003") {
                throw new Error("Não é possível remover: a categoria possui produtos vinculados");
            }

            throw error;
        }
    }
}

export { RemoveCategoryService };