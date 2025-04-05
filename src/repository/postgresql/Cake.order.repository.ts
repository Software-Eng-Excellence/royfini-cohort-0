import { PostgreSqlCake, PostgreSqlCakeMapper } from "../../mappers/CakeMapper";
import { IdentifiableCake } from "../../models/Cake.model";
import { ItemCategory } from "../../models/IItem";
import {
  DbException,
  InitializationException,
  ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { id, Initializable, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";
const tableName = ItemCategory.CAKE;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    flavor TEXT NOT NULL,
    filling TEXT NOT NULL,
    size INTEGER NOT NULL,
    layers INTEGER NOT NULL,
    frostingType TEXT NOT NULL,
    frostingFlavor TEXT NOT NULL,
    decorationType TEXT NOT NULL,
    decorationColor TEXT NOT NULL,
    customMessage TEXT NOT NULL,
    shape TEXT NOT NULL,
    allergies TEXT NOT NULL,
    specialIngredients TEXT NOT NULL,
    packagingType TEXT NOT NULL)`;
const INSERT_CAKE = `INSERT INTO ${tableName} (
      id, type, flavor, filling, size, layers, frostingType, frostingFlavor, 
      decorationType, decorationColor, customMessage, shape, allergies, 
      specialIngredients, packagingType
  ) 
  VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;
const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;
const SELECT_ALL = `SELECT * FROM ${tableName}`;
const UPDATE_ID = `UPDATE ${tableName} SET type = $1 , flavor = $2, filling = $3, size = $4, layers = $5, frostingType = $6, frostingFlavor = $7, 
    decorationType = $8 , decorationColor = $9 , customMessage = $10, shape = $11, allergies = $12, 
    specialIngredients  = $13, packagingType = $14 WHERE id = $14`;
const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;
export class CakeRepository
  implements IRepository<IdentifiableCake>, Initializable {
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
  async create(item: IdentifiableCake): Promise<id> {
    let client;
    try {
      client = await ConnectionManager.getConnection();
      await client.query(INSERT_CAKE, [
        item.getId(),
        item.getType(),
        item.getFlavor(),
        item.getFilling(),
        item.getSize(),
        item.getLayers(),
        item.getFrostingType(),
        item.getFrostingFlavor(),
        item.getDecorationType(),
        item.getDecorationColor(),
        item.getCustomMessage(),
        item.getShape(),
        item.getAllergies(),
        item.getSpecialIngredients(),
        item.getPackagingType(),
      ]);
      return item.getId();
    } catch (error) {
      throw new DbException("Failed to create order", error as Error);
    }
  }
  async get(id: id): Promise<IdentifiableCake> {
    let client;
    try {
      client = await ConnectionManager.getConnection();
      const result = await client.query<PostgreSqlCake>(SELECT_BY_ID, [id]);
      if (result.rows.length == 0) {
        throw new ItemNotFoundException("Cake of id" + id + "not found");
      }
      const res = result.rows[0];
      return new PostgreSqlCakeMapper().map(res);
    } catch (error) {
      if (error instanceof ItemNotFoundException) {
        throw error;  // Let it propagate as expected
      }
      throw new DbException("Failed to get cake of id" + id, error as Error);
    }
  }
  async getAll(): Promise<IdentifiableCake[]> {
    let client;
    try {
      client = await ConnectionManager.getConnection();
      const result = await client.query<PostgreSqlCake>(SELECT_ALL);
      const res = result.rows;
      const mapper = new PostgreSqlCakeMapper();
      return res.map((cake) => mapper.map(cake));
    } catch (error) {
      throw new DbException("Failed to get all cake", error as Error);
    }
  }
  async update(item: IdentifiableCake): Promise<void> {
    try {
      const client = await ConnectionManager.getConnection();
      await client.query(UPDATE_ID, [
        item.getType(),
        item.getFlavor(),
        item.getFilling(),
        item.getSize(),
        item.getLayers(),
        item.getFrostingType(),
        item.getFrostingFlavor(),
        item.getDecorationType(),
        item.getCustomMessage(),
        item.getShape(),
        item.getAllergies(),
        item.getSpecialIngredients(),
        item.getPackagingType(),
        item.getId(),
      ]);
    } catch (error) {
      throw new DbException(
        "Failed to update ckae of id" + item.getId(),
        error as Error
      );
    }
  }
  async delete(id: id): Promise<void> {
    try {
      const client = await ConnectionManager.getConnection();
      await client.query(DELETE_ID, [id]);
    } catch (error) {
      throw new DbException("Failed to delete cake of id" + id, error as Error);
    }
  }
}
