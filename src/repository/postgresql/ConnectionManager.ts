import { Pool, PoolClient } from "pg";
import { DatabaseConnectionException } from "../../util/exceptions/DatabaseConnectionException";
import config from "../../config/index";

export class ConnectionManager {
  private static db: Pool | null = null;

  private constructor() { }

  public static async getConnection(): Promise<PoolClient> {
    if (this.db === null) {
      try {
        this.db = new Pool({
          connectionString: config.storagePath.postgreSql,
          ssl: {
            rejectUnauthorized: false,
          },
        });
      } catch (error) {
        throw new DatabaseConnectionException(
          "Failed to connect to the PostgreSQL database",
          error as Error
        );
      }
    }

    try {
      const client = await this.db.connect();
      return client;
    } catch (error) {
      throw new DatabaseConnectionException(
        "Failed to acquire a database connection",
        error as Error
      );
    }
  }
}
