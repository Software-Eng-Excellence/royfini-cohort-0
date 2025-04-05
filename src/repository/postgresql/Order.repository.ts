import {
  PostgreSqlOrder,
  PostgreSqlOrderMapper,
} from "../../mappers/Order.mapper";
import { IIdentifiableItem } from "../../models/IItem";
import { IIdentifiableOrderItem } from "../../models/IOrder";
import {
  DbException,
  InitializationException,
} from "../../util/exceptions/repositoryExceptions";
import { id, Initializable, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS "order" (
  id TEXT PRIMARY KEY,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  item_category TEXT NOT NULL,
  item_id TEXT NOT NULL)`;
const INSERT_ORDER = `INSERT INTO "order" (id,quantity, price,item_category, item_id) VALUES ($1,$2,$3,$4,$5)`;
const SELECT_BY_ID = `SELECT * FROM "order" WHERE id = $1`;
const SELECT_ALL = `SELECT * FROM "order" WHERE item_category = $1`;
const UPDATE_ID = `UPDATE "order" SET quantity = $1, price = $2, item_category = $3, item_id=$4 WHERE id =$5`;
const DELETE_ID = `DELETE FROM "order" WHERE id = $1`;
export class OrderRepository implements IRepository<IIdentifiableOrderItem> {
  constructor(
    private readonly itemRepository: IRepository<IIdentifiableItem> &
      Initializable
  ) {}
  async init() {
    let client;
    try {
      client = await ConnectionManager.getConnection();
      await client.query(CREATE_TABLE);
      await this.itemRepository.init();
    } catch (error: unknown) {
      throw new InitializationException(
        "Failed to initialize Order table",
        error as Error
      );
    } finally {
      client?.release(); // Always release the client back to the pool after use
    }
  }
  async create(order: IIdentifiableOrderItem): Promise<id> {
    let client;
    try {
      client = await ConnectionManager.getConnection();
      await client.query("BEGIN TRANSACTION");
      const item_id = await this.itemRepository.create(order.getItems());
      client.query(INSERT_ORDER, [
        order.getId(),
        order.getQuantity(),
        order.getPrice(),
        order.getItems().getCategory(),
        item_id,
      ]);
      client.query("COMMIT");
      return order.getId();
    } catch (error) {
      client && client.query("ROLLBACK");
      throw new DbException("Failed to create order", error as Error);
    }
  }
  async get(id: id): Promise<IIdentifiableOrderItem> {
    try {
      const client = await ConnectionManager.getConnection();
      const result = await client.query<PostgreSqlOrder>(SELECT_BY_ID, [id]); //returned result is an array of PostgreSqlOrder objects
      const res = result.rows[0];
      if (result.rows.length == 0) {
        throw new Error("Order of id" + id + "not found");
      }
      const item = await this.itemRepository.get(res.item_id);
      return new PostgreSqlOrderMapper().map({ data: res, item });
    } catch (error) {
      throw new DbException("Failed to get order of id" + id, error as Error);
    }
  }
  async getAll(): Promise<IIdentifiableOrderItem[]> {
    try {
      const client = await ConnectionManager.getConnection();
      const items = await this.itemRepository.getAll();
      if (items.length === 0) {
        return [];
      }
      const orders = await client.query<PostgreSqlOrder>(SELECT_ALL, [
        items[0].getCategory(),
      ]); //returned result is an array of PostgreSqlOrder objects
      //bind orders to items
      const bindedOrders = orders.rows.map((order) => {
        const item = items.find((item) => item.getId() === order.item_id);
        if (!item) {
          throw new Error("Item of id" + order.item_id + "not found");
        }
        return { order, item };
      });
      //for each binded order and item, map it into an identifiable order
      const mapper = new PostgreSqlOrderMapper();
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
    let client;
    try {
      client = await ConnectionManager.getConnection();
      client.query("BEGIN TRANSACTION");
      await this.itemRepository.update(order.getItems());
      await client.query(UPDATE_ID, [
        order.getQuantity(),
        order.getPrice(),
        order.getItems().getCategory(),
        order.getItems().getId(),
        order.getId(),
      ]);
      client.query("COMMIT");
    } catch (error: unknown) {
      client && client.query("ROLLBACK");
      throw new DbException(
        "Failed to update order of id" + order.getId(),
        error as Error
      );
    }
  }
  async delete(id: id): Promise<void> {
    let client;
    try {
      client = await ConnectionManager.getConnection();
      client.query("BEGIN TRANSACTION");
      await this.itemRepository.delete(id);
      await client.query(DELETE_ID, [id]);
      client.query("COMMIT");
    } catch (error: unknown) {
      client && client.query("ROLLBACK");
      throw new DbException("Failed to delete order", error as Error);
    }
  }
}
