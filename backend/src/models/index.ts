// This file contains model definitions and database interaction logic for the Cashier System.

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// User Model untuk Authentication
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'cashier';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'cashier';
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'cashier'),
      allowNull: false,
      defaultValue: 'cashier',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

// Product Model
interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public stock!: number;
  public imageUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
  }
);

// Transaction Model
interface TransactionAttributes {
  id: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public totalAmount!: number;
  public status!: 'pending' | 'completed' | 'cancelled';
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'transactions',
  }
);

// TransactionItem Model (untuk items dalam transaction)
interface TransactionItemAttributes {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TransactionItemCreationAttributes extends Optional<TransactionItemAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class TransactionItem extends Model<TransactionItemAttributes, TransactionItemCreationAttributes> implements TransactionItemAttributes {
  public id!: number;
  public transactionId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TransactionItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Transaction,
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transaction_items',
  }
);

// Associations
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Transaction.hasMany(TransactionItem, { foreignKey: 'transactionId' });
TransactionItem.belongsTo(Transaction, { foreignKey: 'transactionId' });

Product.hasMany(TransactionItem, { foreignKey: 'productId' });
TransactionItem.belongsTo(Product, { foreignKey: 'productId' });

// User Functions
export const createUser = async (userData: UserCreationAttributes) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    return await User.findOne({ where: { username } });
  } catch (error) {
    throw new Error('Failed to find user');
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    throw new Error('Failed to find user');
  }
};

export const findUserById = async (id: number) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw new Error('Failed to find user');
  }
};

// Product Functions
export const getAllProducts = async () => {
  try {
    return await Product.findAll();
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (id: number) => {
  try {
    return await Product.findByPk(id);
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};

export const createProduct = async (productData: ProductCreationAttributes) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw new Error('Failed to create product');
  }
};

export const updateProduct = async (id: number, productData: Partial<ProductAttributes>) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await product.update(productData);
  } catch (error) {
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return true;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

// Transaction Functions
export const createTransaction = async (transactionData: {
  totalAmount: number;
  items: Array<{ productId: number; quantity: number; price: number }>;
  userId: number;
}) => {
  try {
    const transaction = await sequelize.transaction();
    
    try {
      const newTransaction = await Transaction.create(
        {
          totalAmount: transactionData.totalAmount,
          status: 'completed',
          userId: transactionData.userId,
        },
        { transaction }
      );

      // Create transaction items
      for (const item of transactionData.items) {
        await TransactionItem.create(
          {
            transactionId: newTransaction.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
          { transaction }
        );

        // Update product stock
        const product = await Product.findByPk(item.productId, { transaction });
        if (product) {
          await product.update(
            { stock: product.stock - item.quantity },
            { transaction }
          );
        }
      }

      await transaction.commit();
      return newTransaction;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw new Error('Failed to create transaction');
  }
};

export const getAllTransactions = async () => {
  try {
    return await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'],
        },
        {
          model: TransactionItem,
          include: [Product],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  } catch (error) {
    throw new Error('Failed to fetch transactions');
  }
};

export const getTransactionById = async (id: number) => {
  try {
    return await Transaction.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'],
        },
        {
          model: TransactionItem,
          include: [Product],
        },
      ],
    });
  } catch (error) {
    throw new Error('Failed to fetch transaction');
  }
};

// Database sync function
export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
    
    // Create default admin user if not exists
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@cashier.com',
        password: 'admin123', // In production, this should be hashed
        role: 'admin',
        isActive: true,
      });
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Database sync failed:', error);
    throw error;
  }
};

export { sequelize, User, Product, Transaction, TransactionItem };