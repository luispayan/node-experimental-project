const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ProductSchema = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false
});

class Product {
  static async getProducts() {
    try {
      const response = await ProductSchema.findAll();
      return response;
    } catch (error) {
      throw new Error(`Error retrieving products: ${error}`);
    }
  }

  static async createProduct(data) {
    try {
      const response = await ProductSchema.create(data);
      return response;
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }

  static async updateProduct(productId, data) {
    try {
      const response = await ProductSchema.update(data, {where: {id: productId}});
      return response;
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  static async deleteProduct(productId) {
    try {
      const response = await ProductSchema.destroy({where: {id: productId}});
      return response;
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}

module.exports = Product;
