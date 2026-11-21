import prismaClient from "../../prisma";
import { RemoveSupplierRequest } from "../../models/interfaces/supplier/RemoveSupplierRequest";

class RemoveSupplierService {
    async execute({ supplier_id }: RemoveSupplierRequest) {
        if (!supplier_id || !Number.isInteger(Number(supplier_id))) {
            throw new Error("Id do fornecedor inválido");
        }

        try {
            const supplier = await prismaClient.supplier.delete({
                where: {
                    id: Number(supplier_id)
                },
                select: {
                    id: true,
                    name: true
                }
            });

            return supplier;
        } catch (error) {
            // P2025 = registro não existe, P2003 = violação de chave estrangeira
            const code = (error as { code?: string }).code;

            if (code === "P2025") {
                throw new Error("Fornecedor não encontrado");
            }

            if (code === "P2003") {
                throw new Error("Não é possível remover: o fornecedor possui produtos vinculados");
            }

            throw error;
        }
    }
}

export { RemoveSupplierService };
