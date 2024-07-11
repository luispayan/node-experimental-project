const { DataTypes } = require('sequelize');
import sequelize from '../db';

const UserSchema = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

class User {
  static async createUser(username: any, password: any) {
    try {
      const user = await UserSchema.create({ username, password });
      return user.id;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  static async getUserByUsername(username: any) {
    try {
      const user = await UserSchema.findOne({ where: { username } });
      return user;
    } catch (error) {
      throw new Error(`Error retrieving user: ${error}`);
    }
  }
}

export default User;
