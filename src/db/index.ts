import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'portfolio.db');
const db = new Database(dbPath);

// 테이블 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    githubUrl TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    tags TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface Portfolio {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  thumbnail: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}

export const portfolioDb = {
  create: (data: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>) => {
    const stmt = db.prepare(`
      INSERT INTO portfolios (title, description, githubUrl, thumbnail, tags)
      VALUES (@title, @description, @githubUrl, @thumbnail, @tags)
    `);
    return stmt.run(data);
  },

  getAll: () => {
    const stmt = db.prepare('SELECT * FROM portfolios ORDER BY createdAt DESC');
    return stmt.all() as Portfolio[];
  },

  getById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM portfolios WHERE id = ?');
    return stmt.get(id) as Portfolio;
  },

  update: (id: number, data: Partial<Portfolio>) => {
    const sets = Object.keys(data)
      .map(key => `${key} = @${key}`)
      .join(', ');
    const stmt = db.prepare(`
      UPDATE portfolios 
      SET ${sets}, updatedAt = CURRENT_TIMESTAMP
      WHERE id = @id
    `);
    return stmt.run({ ...data, id });
  },

  delete: (id: number) => {
    const stmt = db.prepare('DELETE FROM portfolios WHERE id = ?');
    return stmt.run(id);
  }
}; 