export interface EditProductRequest {
    product_id: string;
    name?: string;
    price?: string;
    description?: string;
    amount?: string;
    category_id?: string;
    supplier_id?: string;
    banner?: string;
}