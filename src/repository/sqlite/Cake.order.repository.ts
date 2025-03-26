import { Database } from "sqlite";
import { open } from "sqlite";
import { Cake, IdentifiableCake } from "../../models/Cake.model";
import { id, Initializable, IRepository } from "../IRepository";
import {
  DbException,
  InitializationException,
  ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { ConnectionManger } from "./ConnectionManager";
import { ItemCategory } from "../../models/IItem";
import { SQLiteCake, SQLiteCakeMapper } from "../../mappers/CakeMapper";
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
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = ?`;

const SELECT_ALL = `SELECT * FROM ${tableName}`;

const DELETE_ID = `DELETE FROM ${tableName} WHERE id = ?`;

const UPDATE_ID = `UPDATE ${tableName} SET type = ? , flavor = ?, filling = ?, size = ?, layers = ?, frostingType = ?, frostingFlavor = ?, 
    decorationType = ? , decorationColor = ? , customMessage = ?, shape = ?, allergies = ?, 
    specialIngredients  = ?, packagingType = ? WHERE id = ?`;

export class CakeRepository
  implements IRepository<IdentifiableCake>, Initializable
{
  async init() {
    try {
      const conn = await ConnectionManger.getConnection();
      await conn.exec(CREATE_TABLE);
    } catch (error) {
      throw new InitializationException(
        "Failed to initialize Order table",
        error as Error
      );
    }
  }
  async create(item: IdentifiableCake): Promise<id> {
    // it is expected that a transaction has been initiated before this method is called
    try {
      const conn = await ConnectionManger.getConnection();
      conn.run(INSERT_CAKE, [
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
    } catch (error: unknown) {
      throw new DbException("Failed to create order", error as Error);
    }
  }
  async get(id: id): Promise<IdentifiableCake> {
    try {
      const conn = await ConnectionManger.getConnection();
      const result = await conn.get<SQLiteCake>(SELECT_BY_ID, id);
      if (!result) {
        throw new ItemNotFoundException("Cake of id" + id + "not found");
      }
      return new SQLiteCakeMapper().map(result);
    } catch (error) {
      throw new DbException("Failed to get cake of id" + id, error as Error);
    }
  }
  async getAll(): Promise<IdentifiableCake[]> {
    try {
      const conn = await ConnectionManger.getConnection();
      const result = await conn.all<SQLiteCake[]>(SELECT_ALL);
      const mapper = new SQLiteCakeMapper();
      return result?.map((cake) => mapper.map(cake));
    } catch (error) {
      throw new DbException("Failed to get all cake", error as Error);
    }
  }
  async update(item: IdentifiableCake): Promise<void> {
    try {
      const conn = await ConnectionManger.getConnection();
      await conn.run(UPDATE_ID, [
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
      const conn = await ConnectionManger.getConnection();
      await conn.run(DELETE_ID, id);
    } catch (error) {
      throw new DbException("Failed to delete ckae of id" + id, error as Error);
    }
  }
}
