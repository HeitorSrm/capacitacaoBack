import prismaClient from "../../prisma";
import { CategoryRequest } from "../../models/interfaces/category/CategoryRequest";

class CreateCategoryService {
    async execute({ name, user_id }: CategoryRequest) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Nome da categoria inválido");
        }

        try {
            const category = await prismaClient.category.create({
                data: {
                    name: name.trim(),
                    userId: Number(user_id)
                },
                select: {
                    id: true,
                    name: true
                }
            });

            return category;
        } catch (error) {
            // P2003 = violação de chave estrangeira (o usuário do token não existe mais)
            const code = (error as { code?: string }).code;

            if (code === "P2003") {
                throw new Error("Usuário não encontrado");
            }

            throw error;
        }
    }
}

export { CreateCategoryService };