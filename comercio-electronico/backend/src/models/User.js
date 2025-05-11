// backend/src/models/User.js
import bcrypt from 'bcryptjs';

export default class User {
  constructor({ id, username, password, role }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role; // 'admin' o 'user'
  }

  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  static async comparePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
