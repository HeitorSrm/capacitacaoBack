import prismaClient from "../../prisma";
import { EditSupplierRequest } from "../../models/interfaces/supplier/EditSupplierRequest";

class EditSupplierService {
    async execute({ supplier_id, name, email, phone }: EditSupplierRequest) {
        if (!supplier_id || !Number.isInteger(Number(supplier_id))) {
            throw new Error("Id do fornecedor inválido");
        }

        if (name === undefined && email === undefined && phone === undefined) {
            throw new Error("Informe ao menos um campo para editar");
        }

        if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
            throw new Error("Nome do fornecedor inválido");
        }

        if (email !== undefined && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) {
            throw new Error("E-mail do fornecedor inválido");
        }

        if (phone !== undefined && (typeof phone !== "string" || phone.trim() === "")) {
            throw new Error("Telefone do fornecedor inválido");
        }

        try {
            const supplier = await prismaClient.supplier.update({
                where: {
                    id: Number(supplier_id)
                },
                data: {
                    ...(name !== undefined ? { name: name.trim() } : {}),
                    ...(email !== undefined ? { email: email.trim() } : {}),
                    ...(phone !== undefined ? { phone: phone.trim() } : {}),
                    update_at: new Date()
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
            // P2025 = registro não existe
            const code = (error as { code?: string }).code;

            if (code === "P2025") {
                throw new Error("Fornecedor não encontrado");
            }

            throw error;
        }
    }
}

export { EditSupplierService };
