import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AuthRequest } from "../../models/interfaces/user/auth/AuthRequest";

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        if (!email) {
            throw new Error("E-mail precisa ser enviado");
        }

        if (!password) {
            throw new Error("Senha precisa ser enviada");
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("E-mail ou senha incorretos");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("E-mail ou senha incorretos");
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET não configurado");
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            secret,
            {
                subject: String(user.id),
                expiresIn: "30d"
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { AuthUserService };