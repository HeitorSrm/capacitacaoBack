import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: Number(user_id)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }
}

export { DetailUserService };