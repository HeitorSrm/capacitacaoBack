import prismaClient from "../../prisma";
import { SupplierRequest } from "../../models/interfaces/supplier/SupplierRequest";

class CreateSupplierService {
    async execute({ name, email, phone, user_id }: SupplierRequest) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Nome do fornecedor inválido");
        }

        if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            throw new Error("E-mail do fornecedor inválido");
        }

        if (typeof phone !== "string" || phone.trim() === "") {
            throw new Error("Telefone do fornecedor inválido");
        }

        try {
            const supplier = await prismaClient.supplier.create({
                data: {
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    userId: Number(user_id)
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            });

            return supplier;
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

export { CreateSupplierService };
