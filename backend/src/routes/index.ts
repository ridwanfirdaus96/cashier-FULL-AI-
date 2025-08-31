import { Router } from 'express';
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  getTransactions,
  getTransaction,
  addTransaction,
  syncDb
} from '../controllers';
import { register, login, getProfile } from '../controllers/auth';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// Auth routes (public)
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected routes
router.get('/auth/profile', authenticateToken, getProfile);

// Product routes (admin only for create/update/delete)
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', authenticateToken, requireRole(['admin']), addProduct);
router.put('/products/:id', authenticateToken, requireRole(['admin']), editProduct);
router.delete('/products/:id', authenticateToken, requireRole(['admin']), removeProduct);

// Transaction routes (authenticated users)
router.get('/transactions', authenticateToken, getTransactions);
router.get('/transactions/:id', authenticateToken, getTransaction);
router.post('/transactions', authenticateToken, addTransaction);

// Database sync route (admin only)
router.post('/sync', authenticateToken, requireRole(['admin']), syncDb);

export default router;