import { Database as SqliteDatabase, open } from "sqlite";
import { Database, Statement } from "sqlite3";
import { DatabaseConnectionException } from "../../util/exceptions/DatabaseConnectionException";

export class ConnectionManger {
  private static db: SqliteDatabase<Database, Statement> | null = null;

  private constructor() { }

  public static async getConnection(): Promise<
    SqliteDatabase<Database, Statement>
  > {
    if (this.db === null) {
      try {
        this.db = await open({
          filename: "src/data/orders.db",
          driver: Database,
        });
      } catch (error) {
        throw new DatabaseConnectionException(
          "Failed to connect to databse",
          error as Error
        );
      }
    }
    return this.db;
  }
}
