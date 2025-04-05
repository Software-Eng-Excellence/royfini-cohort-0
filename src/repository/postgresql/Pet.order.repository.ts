import { ItemCategory } from "../../models/IItem";
import {
    DbException,
    InitializationException,
    ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { id, Initializable, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";
import { IdentifiablePet } from "models/Pet.model";
import { PostgreSqlPet, PostgreSqlPetMapper } from "../../mappers/PetMapper";
const tableName = ItemCategory.PET;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id TEXT PRIMARY KEY,
    productType TEXT NOT NULL,
    petType TEXT NOT NULL,
    brand TEXT NOT NULL,
    size TEXT NOT NULL,
    flavor TEXT NOT NULL,
    ecoFriendly TEXT NOT NULL)`;
const INSERT_PET = `INSERT INTO ${tableName} (
      id, productType ,
    petType ,
    brand ,
    size ,
    flavor ,
    ecoFriendly 
  ) 
  VALUES 
      ($1, $2, $3, $4, $5, $6, $7);`;
const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;
const SELECT_ALL = `SELECT * FROM ${tableName}`;
const UPDATE_ID = `UPDATE ${tableName} SET productType = $1 , petType = $2, brand = $3, size = $4, flavor = $5, ecoFriendly = $6 WHERE id = $7`;
const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;
export class PetRepository
    implements IRepository<IdentifiablePet>, Initializable {
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
    async create(item: IdentifiablePet): Promise<id> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            await client.query(INSERT_PET, [
                item.getId(),
                item.getProductType(),
                item.getPetType(),
                item.getBrand(),
                item.getSize(),
                item.getFlavor(),
                item.getEcoFriendly()
            ]);
            return item.getId();
        } catch (error) {
            throw new DbException("Failed to create pet", error as Error);
        }
    }
    async get(id: id): Promise<IdentifiablePet> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlPet>(SELECT_BY_ID, [id]);
            if (result.rows.length == 0) {
                throw new ItemNotFoundException(" of id" + id + "not found");
            }
            const res = result.rows[0];
            return new PostgreSqlPetMapper().map(res);
        } catch (error) {
            if (error instanceof ItemNotFoundException) {
                throw error;  // Let it propagate as expected
            }
            throw new DbException("Failed to get pet of id" + id, error as Error);
        }
    }
    async getAll(): Promise<IdentifiablePet[]> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlPet>(SELECT_ALL);
            const res = result.rows;
            const mapper = new PostgreSqlPetMapper();
            return res.map((pet) => mapper.map(pet));
        } catch (error) {
            throw new DbException("Failed to get all pet", error as Error);
        }
    }
    async update(item: IdentifiablePet): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(UPDATE_ID, [
                item.getProductType(),
                item.getPetType(),
                item.getBrand(),
                item.getSize(),
                item.getFlavor(),
                item.getEcoFriendly(),
                item.getId(),
            ]);
        } catch (error) {
            throw new DbException(
                "Failed to update pet of id" + item.getId(),
                error as Error
            );
        }
    }
    async delete(id: id): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(DELETE_ID, [id]);
        } catch (error) {
            throw new DbException("Failed to delete pet of id" + id, error as Error);
        }
    }
}
