const pool = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async createUser(username, password) {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
    const values = [username, password];

    try {
      const result = await pool.query(query, values);
      // TODO: Add model validations
      return result.rows[0].id;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  static async getUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error retrieving user: ${error}`);
    }
  }
}

module.exports = User;
