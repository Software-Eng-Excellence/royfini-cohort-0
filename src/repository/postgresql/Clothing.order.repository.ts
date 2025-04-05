import { IdentifiableClothing } from "models/Clothing.model";
import { ItemCategory } from "../../models/IItem";
import {
    DbException,
    InitializationException,
    ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { id, Initializable, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";
import { PostgreSqlClothing, PostgreSqlClothingMapper } from "../../mappers/ClothingMapper";
const tableName = ItemCategory.CLOTHING;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id TEXT PRIMARY KEY,
    clothingType TEXT NOT NULL,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    material TEXT NOT NULL,
    pattern INTEGER NOT NULL,
    brand TEXT NOT NULL,
    gender TEXT NOT NULL,
    packaging TEXT NOT NULL,
    specialRequest TEXT NOT NULL)`;
const INSERT_CLOTHING = `INSERT INTO ${tableName} (
      id, clothingType, size, color, material, pattern, brand, gender, packaging, specialRequest
  ) 
  VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;
const SELECT_ALL = `SELECT * FROM ${tableName}`;
const UPDATE_ID = `UPDATE ${tableName} SET clothingType = $1 , size = $2, color = $3, material = $4, pattern = $5, brand = $6, gender = $7, 
    packaging = $8 ,  specialRequest = $9 WHERE id = $10`;
const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;
export class ClothingRepository
    implements IRepository<IdentifiableClothing>, Initializable {
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
    async create(item: IdentifiableClothing): Promise<id> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            await client.query(INSERT_CLOTHING, [
                item.getId(),
                item.getClothingType(),
                item.getSize(),
                item.getColor(),
                item.getMaterial(),
                item.getPattern(),
                item.getBrand(),
                item.getGender(),
                item.getPackaging(),
                item.getSpecialRequest(),
            ]);
            return item.getId();
        } catch (error) {
            throw new DbException("Failed to create order", error as Error);
        }
    }
    async get(id: id): Promise<IdentifiableClothing> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlClothing>(SELECT_BY_ID, [id]);
            if (result.rows.length == 0) {
                throw new ItemNotFoundException("Clothing of id" + id + "not found");
            }
            const res = result.rows[0];
            return new PostgreSqlClothingMapper().map(res);
        } catch (error) {
            if (error instanceof ItemNotFoundException) {
                throw error;  // Let it propagate as expected
            }
            throw new DbException("Failed to get clothing of id" + id, error as Error);
        }
    }
    async getAll(): Promise<IdentifiableClothing[]> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlClothing>(SELECT_ALL);
            const res = result.rows;
            const mapper = new PostgreSqlClothingMapper();
            return res.map((clothing) => mapper.map(clothing));
        } catch (error) {
            throw new DbException("Failed to get all clothing", error as Error);
        }
    }
    async update(item: IdentifiableClothing): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(UPDATE_ID, [
                item.getClothingType(),
                item.getSize(),
                item.getColor(),
                item.getMaterial(),
                item.getPattern(),
                item.getBrand(),
                item.getGender(),
                item.getPackaging(),
                item.getSpecialRequest(),
                item.getId(),
            ]);
        } catch (error) {
            throw new DbException(
                "Failed to update clothing of id" + item.getId(),
                error as Error
            );
        }
    }
    async delete(id: id): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(DELETE_ID, [id]);
        } catch (error) {
            throw new DbException("Failed to delete clothing of id" + id, error as Error);
        }
    }
}
