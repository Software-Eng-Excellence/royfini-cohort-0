import { Database } from "sqlite";
import { open } from "sqlite";
import { IIdentifiableOrderItem, IOrder } from "../../models/IOrder";
import { id, Initializable, IRepository } from "../IRepository";
import {
  DbException,
  InitializationException,
} from "../../util/exceptions/repositoryExceptions";
import { ConnectionManger } from "./ConnectionManager";
import { IIdentifiableItem } from "../../models/IItem";
import { SQLiteCake } from "../../mappers/CakeMapper";
import { SQLiteOrder, SQLiteOrderMapper } from "../../mappers/Order.mapper";
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS "order" (
  id TEXT PRIMARY KEY,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  item_category TEXT NOT NULL,
  item_id TEXT NOT NULL)`;

const INSERT_ORDER = `INSERT INTO "order" (id,quantity, price,item_category, item_id) VALUES (?,?,?,?,?)`;

const SELECT_BY_ID = `SELECT * FROM "order" WHERE id = ?`;

const SELECT_ALL = `SELECT * FROM "order" WHERE item_category = ?`;

const DELETE_ID = `DELETE FROM "order" WHERE id = ?`;

const UPDATE_ID = `UPDATE "order" SET quantity = ?, price =?, item_category = ?, item_id=? WHERE id =?`;

export class OrderRepository implements IRepository<IIdentifiableOrderItem> {
  constructor(
    private readonly itemRepository: IRepository<IIdentifiableItem> &
      Initializable
  ) { }
  async init() {
    try {
      const conn = await ConnectionManger.getConnection();
      await conn.exec(CREATE_TABLE);
      await this.itemRepository.init();
    } catch (error: unknown) {
      throw new InitializationException(
        "Failed to initialize Order table",
        error as Error
      );
    }
  }
  async create(order: IIdentifiableOrderItem): Promise<id> {
    let conn;
    try {
      conn = await ConnectionManger.getConnection();
      conn.exec("BEGIN TRANSACTION");
      const item_id = await this.itemRepository.create(order.getItems());
      conn.run(INSERT_ORDER, [
        order.getId(),
        order.getQuantity(),
        order.getPrice(),
        order.getItems().getCategory(),
        item_id,
      ]);
      conn.exec("COMMIT");
      console.log("Order table initialized");
      return order.getId();
    } catch (error: unknown) {
      conn && conn.exec("ROLLBACK");
      throw new DbException("Failed to create order", error as Error);
    }
  }
  async get(id: id): Promise<IIdentifiableOrderItem> {
    try {
      const conn = await ConnectionManger.getConnection();
      const result = await conn.get<SQLiteOrder>(SELECT_BY_ID, id);
      if (!result) {
        throw new Error("Order of id" + id + "not found");
      }
      const item = await this.itemRepository.get(result.item_id);
      return new SQLiteOrderMapper().map({ data: result, item: item });
    } catch (error) {
      throw new DbException("Failed to get order of id" + id, error as Error);
    }
  }
  async getAll(): Promise<IIdentifiableOrderItem[]> {
    try {
      const conn = await ConnectionManger.getConnection();
      const items = await this.itemRepository.getAll();
      if (items.length === 0) {
        return [];
      }
      const orders = await conn.all<SQLiteOrder[]>(
        SELECT_ALL,
        items[0].getCategory()
      );
      //bind orders to items
      const bindedOrders = orders.map((order) => {
        const item = items.find((item) => item.getId() === order.item_id);
        if (!item) {
          throw new Error("Item of id" + order.item_id + "not found");
        }
        return { order, item };
      });

      //for each binded order and item, map it into an identifiable order
      const mapper = new SQLiteOrderMapper();
      const identifiableOrders = bindedOrders.map(({ order, item }) => {
        return mapper.map({ data: order, item });
      });
      //return list of identifiable orders
      return identifiableOrders;
    } catch (error) {
      throw new DbException("Failed to get all orders", error as Error);
    }
  }
  async update(order: IIdentifiableOrderItem): Promise<void> {
    let conn;
    try {
      conn = await ConnectionManger.getConnection();
      conn.exec("BEGIN TRANSACTION");
      await this.itemRepository.update(order.getItems());
      await conn.run(UPDATE_ID, [
        order.getQuantity(),
        order.getPrice(),
        order.getItems().getCategory(),
        order.getItems().getId(),
        order.getId(),
      ]);
      conn.exec("COMMIT");
    } catch (error: unknown) {
      conn && conn.exec("ROLLBACK");
      throw new DbException(
        "Failed to update order of id" + order.getId(),
        error as Error
      );
    }
  }
  async delete(id: id): Promise<void> {
    let conn;
    try {
      conn = await ConnectionManger.getConnection();
      conn.exec("BEGIN TRANSACTION");
      await this.itemRepository.delete(id);
      await conn.run(DELETE_ID, id);
      conn.exec("COMMIT");
    } catch (error: unknown) {
      conn && conn.exec("ROLLBACK");
      throw new DbException("Failed to delete order", error as Error);
    }
  }
}
