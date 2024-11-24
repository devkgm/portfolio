// import type { Config } from "drizzle-kit";

const config: any = {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite3",
  dbCredentials: {
    url: "sqlite.db",
  },
};

export default config; 