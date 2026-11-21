import prismaClient from "../../prisma";

class ListSupplierService {
    async execute() {
        const suppliers = await prismaClient.supplier.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true
            },
            orderBy: {
                id: "asc"
            }
        });

        return suppliers;
    }
}

export { ListSupplierService };
