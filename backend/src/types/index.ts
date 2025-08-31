// This file contains TypeScript types and interfaces used throughout the backend application.

export interface ProductModel {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
}

export interface TransactionModel {
    id: number;
    productId: number;
    quantity: number;
    totalPrice: number;
    date: Date;
}