// frontend/src/types/index.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    product: Product;
    quantity: number;
}

export interface Transaction {
    id: number;
    items: CartItem[];
    totalAmount: number;
    date: string;
}