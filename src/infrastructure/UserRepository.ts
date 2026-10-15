import { pool } from "../config/database.js";
import type { User, CreateUserDTO } from "../domain/User.js";

export class UserRepository {
  async findAll(): Promise<User[]> {
    const result = await pool.query(
      'SELECT id, email, full_name as "name", created_at as "createdAt" FROM users',
    );
    return result.rows;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const query = `
            INSERT INTO users (email, full_name, password_hash) 
            VALUES ($1, $2, 'temp_hash') 
            RETURNING id, email, full_name as "name", created_at as "createdAt"
        `;
    const values = [dto.email, dto.name];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}
