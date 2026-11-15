import prismaClient from "../../prisma";
import { RemoveUserRequest } from "../../models/interfaces/user/RemoveUserRequest";

class RemoveUserService {
    async execute({ user_id }: RemoveUserRequest) {
        try {
            const user = await prismaClient.user.delete({
                where: {
                    id: Number(user_id)
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });

            return user;
        } catch (error) {
            // Códigos de erro do Prisma: P2025 = registro não existe, P2003 = violação de chave estrangeira
            const code = (error as { code?: string }).code;

            if (code === "P2025") {
                throw new Error("Usuário não encontrado");
            }

            if (code === "P2003") {
                throw new Error("Não é possível remover: o usuário possui categorias, produtos ou fornecedores vinculados");
            }

            throw error;
        }
    }
}

export { RemoveUserService };