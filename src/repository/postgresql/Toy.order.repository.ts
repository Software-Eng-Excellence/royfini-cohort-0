import { ItemCategory } from "../../models/IItem";
import {
    DbException,
    InitializationException,
    ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { id, Initializable, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";
import { PostgreSqlToy, PostgreSqlToyMapper } from "../../mappers/ToyMapper";
import { IdentifiableToy } from "models/Toy.model";
const tableName = ItemCategory.TOY;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    ageGroup TEXT NOT NULL,
    brand TEXT NOT NULL,
    material TEXT NOT NULL,
    batteryRequired TEXT NOT NULL,
    educational TEXT NOT NULL)`;
const INSERT_TOY = `INSERT INTO ${tableName} (
      id, type ,
    ageGroup ,
    brand ,
    material ,
    batteryRequired ,
    educational 
  ) 
  VALUES 
      ($1, $2, $3, $4, $5, $6, $7);`;
const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;
const SELECT_ALL = `SELECT * FROM ${tableName}`;
const UPDATE_ID = `UPDATE ${tableName} SET type = $1 , ageGroup= $2, brand = $3, material = $4, batteryRequired = $5, educational = $6 WHERE id = $7`;
const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;
export class ToyRepository
    implements IRepository<IdentifiableToy>, Initializable {
    async init(): Promise<void> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            await client.query(CREATE_TABLE);
        } catch (error) {
            throw new InitializationException(
                "Failed to initialize Order table",
                error as Error
            );
        }
    }
    async create(item: IdentifiableToy): Promise<id> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            await client.query(INSERT_TOY, [
                item.getId(),
                item.getType(),
                item.getAgeGroup(),
                item.getBrand(),
                item.getMaterial(),
                item.getBatteryRequired(),
                item.getEducational(),
            ]);
            return item.getId();
        } catch (error) {
            throw new DbException("Failed to create order", error as Error);
        }
    }
    async get(id: id): Promise<IdentifiableToy> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlToy>(SELECT_BY_ID, [id]);
            if (result.rows.length == 0) {
                throw new ItemNotFoundException("Toy of id" + id + "not found");
            }
            const res = result.rows[0];
            return new PostgreSqlToyMapper().map(res);
        } catch (error) {
            if (error instanceof ItemNotFoundException) {
                throw error;  // Let it propagate as expected
            }
            throw new DbException("Failed to get Toy of id" + id, error as Error);
        }
    }
    async getAll(): Promise<IdentifiableToy[]> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlToy>(SELECT_ALL);
            const res = result.rows;
            const mapper = new PostgreSqlToyMapper();
            return res.map((toy) => mapper.map(toy));
        } catch (error) {
            throw new DbException("Failed to get all toy", error as Error);
        }
    }
    async update(item: IdentifiableToy): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(UPDATE_ID, [
                item.getType(),
                item.getAgeGroup(),
                item.getBrand(),
                item.getMaterial(),
                item.getBatteryRequired(),
                item.getEducational(),
                item.getId(),
            ]);
        } catch (error) {
            throw new DbException(
                "Failed to update toy of id" + item.getId(),
                error as Error
            );
        }
    }
    async delete(id: id): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(DELETE_ID, [id]);
        } catch (error) {
            throw new DbException("Failed to delete toy of id" + id, error as Error);
        }
    }
}
