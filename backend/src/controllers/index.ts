import { Request, Response } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createTransaction,
  getAllTransactions,
  getTransactionById,
  syncDatabase
} from '../models';

// Product Controllers
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
      message: 'Products fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching products'
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductById(parseInt(id));
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching product'
    });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, stock, imageUrl } = req.body;

    // Validation
    if (!name || !price || !description || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, price, description, stock'
      });
    }

    const product = await createProduct({
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock),
      imageUrl
    });

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating product'
    });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await updateProduct(parseInt(id), updateData);

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error instanceof Error && error.message === 'Product not found') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error while updating product'
    });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProduct(parseInt(id));

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error instanceof Error && error.message === 'Product not found') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting product'
    });
  }
};

// Transaction Controllers
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await getAllTransactions();
    res.status(200).json({
      success: true,
      data: transactions,
      message: 'Transactions fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching transactions'
    });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await getTransactionById(parseInt(id));
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
      message: 'Transaction fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching transaction'
    });
  }
};

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { totalAmount, items } = req.body;
    const userId = (req as any).user.id; // Get user ID from auth middleware

    // Validation
    if (!totalAmount || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: totalAmount and items array'
      });
    }

    // Validate items structure
    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have productId, quantity, and price'
        });
      }
    }

    const transaction = await createTransaction({
      totalAmount: parseFloat(totalAmount),
      items: items.map(item => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price)
      })),
      userId
    });

    res.status(201).json({
      success: true,
      data: transaction,
      message: 'Transaction created successfully'
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating transaction'
    });
  }
};

// Database sync controller
export const syncDb = async (req: Request, res: Response) => {
  try {
    await syncDatabase();
    res.status(200).json({
      success: true,
      message: 'Database synced successfully'
    });
  } catch (error) {
    console.error('Error syncing database:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while syncing database'
    });
  }
};