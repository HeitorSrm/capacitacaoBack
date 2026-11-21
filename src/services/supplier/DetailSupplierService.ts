import prismaClient from "../../prisma";
import { DetailSupplierRequest } from "../../models/interfaces/supplier/DetailSupplierRequest";

class DetailSupplierService {
    async execute({ supplier_id }: DetailSupplierRequest) {
        if (!supplier_id || !Number.isInteger(Number(supplier_id))) {
            throw new Error("Id do fornecedor inválido");
        }

        const supplier = await prismaClient.supplier.findFirst({
            where: {
                id: Number(supplier_id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true
            }
        });

        if (!supplier) {
            throw new Error("Fornecedor não encontrado");
        }

        return supplier;
    }
}

export { DetailSupplierService };
