import prismaClient from "../../prisma";
import { EditCategoryRequest } from "../../models/interfaces/category/EditCategoryRequest";

class EditCategoryService {
    async execute({ name, category_id }: EditCategoryRequest) {
        if (typeof name !== "string" || name.trim() === "" || !category_id || Number.isNaN(Number(category_id))) {
            throw new Error("Dados inválidos para editar a categoria");
        }

        try {
            const category = await prismaClient.category.update({
                where: {
                    id: Number(category_id)
                },
                data: {
                    name: name.trim(),
                    update_at: new Date()
                },
                select: {
                    id: true,
                    name: true
                }
            });

            return category;
        } catch (error) {
            // P2025 = registro não existe
            const code = (error as { code?: string }).code;

            if (code === "P2025") {
                throw new Error("Categoria não encontrada");
            }

            throw error;
        }
    }
}

export { EditCategoryService };