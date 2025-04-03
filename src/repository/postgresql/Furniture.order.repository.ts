import { IdentifiableClothing } from "models/Clothing.model";
import { ItemCategory } from "../../models/IItem";
import {
    DbException,
    InitializationException,
    ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { id, Initializable, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";
import { PostgreSqlClothing, PostgreSqlClothingMapper } from "mappers/ClothingMapper";
import { PostgreSqlFurniture, PostgreSqlFurnitureMapper } from "mappers/FurnitureMapper";
import { IdentifiableFurniture } from "models/Furniture.model";
const tableName = ItemCategory.CLOTHING;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    material TEXT NOT NULL,
    color TEXT NOT NULL,
    size TEXT NOT NULL,
    style TEXT NOT NULL,
    assemblyRequired TEXT NOT NULL,
    warranty TEXT NOT NULL,)`;
const INSERT_FURNITURE = `INSERT INTO ${tableName} (
      id, type ,
    material ,
    color ,
    size ,
    style ,
    assemblyRequired ,
    warranty 
  ) 
  VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8);`;
const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;
const SELECT_ALL = `SELECT * FROM ${tableName}`;
const UPDATE_ID = `UPDATE ${tableName} SET type = $1 , material = $2, color = $3, size = $4, style = $5, assemblyRequired = $6, warranty = $7`;
const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;
export class FurnitureRepository
    implements IRepository<IdentifiableFurniture>, Initializable {
    async init(): Promise<void> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            client.query(CREATE_TABLE);
        } catch (error) {
            throw new InitializationException(
                "Failed to initialize Order table",
                error as Error
            );
        }
    }
    async create(item: IdentifiableFurniture): Promise<id> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            client.query(INSERT_FURNITURE, [
                item.getId(),
                item.getType(),
                item.getMaterial(),
                item.getColor(),
                item.getSize(),
                item.getStyle(),
                item.getAssemblyRequired(),
                item.getWarranty(),
            ]);
            return item.getId();
        } catch (error) {
            throw new DbException("Failed to create order", error as Error);
        }
    }
    async get(id: id): Promise<IdentifiableFurniture> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlFurniture>(SELECT_BY_ID, [id]);
            if (result.rows.length == 0) {
                throw new ItemNotFoundException("Furniture of id" + id + "not found");
            }
            const res = result.rows[0];
            return new PostgreSqlFurnitureMapper().map(res);
        } catch (error) {
            if (error instanceof ItemNotFoundException) {
                throw error;  // Let it propagate as expected
            }
            throw new DbException("Failed to get Furniture of id" + id, error as Error);
        }
    }
    async getAll(): Promise<IdentifiableFurniture[]> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlFurniture>(SELECT_ALL);
            const res = result.rows;
            const mapper = new PostgreSqlFurnitureMapper();
            return res.map((furniture) => mapper.map(furniture));
        } catch (error) {
            throw new DbException("Failed to get all furniture", error as Error);
        }
    }
    async update(item: IdentifiableFurniture): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(UPDATE_ID, [
                item.getType(),
                item.getMaterial(),
                item.getColor(),
                item.getSize(),
                item.getStyle(),
                item.getAssemblyRequired(),
                item.getWarranty(),
                item.getId(),
            ]);
        } catch (error) {
            throw new DbException(
                "Failed to update IdentifiableFurniture of id" + item.getId(),
                error as Error
            );
        }
    }
    async delete(id: id): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(DELETE_ID, [id]);
        } catch (error) {
            throw new DbException("Failed to delete IdentifiableFurniture of id" + id, error as Error);
        }
    }
}
