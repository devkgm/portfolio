import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    url: "./sqlite.db",
    accountId: "devkgm",
    databaseId: "portfolio",
    token: "f03b06d0-0000-0000-0000-000000000000",
  },
} satisfies Config; 