import { IOrder } from "../../models/IOrder";
import { Order } from "../../models/Order.model";
import {
  InvalidItemException,
  ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { id, ID, IRepository } from "../IRepository";

export abstract class OrderRepository implements IRepository<IOrder> {
  protected abstract load(): Promise<IOrder[]>;
  protected abstract save(orders: IOrder[]): Promise<void>;

  async create(item: IOrder): Promise<id> {
    // validate the order
    if (!item) {
      throw new InvalidItemException("Order cannot be null");
    }
    // load all orders
    const orders = await this.load();
    // add the new order
    const id = orders.push(item);
    // save all orders
    await this.save(orders);
    return String(id);
  }
  async get(id: id): Promise<IOrder> {
    const orders = await this.load();
    const foundOrder = orders.find((o) => o.getId() === id);
    if (!foundOrder) {
      throw new ItemNotFoundException("Failed to find the element");
    }
    return foundOrder;
  }
  async getAll(): Promise<IOrder[]> {
    const orders = await this.load();
    return orders;
  }
  async update(item: Order): Promise<void> {
    if (!item) {
      throw new InvalidItemException("Order cannot be null");
    }
    const orders = await this.load();
    const index = orders.findIndex((o) => o.getId() === item.getId());
    if (index === -1) {
      throw new ItemNotFoundException("Failed to find the element");
    }
    orders[index] = item;
    await this.save(orders);
  }
  async delete(id: id): Promise<void> {
    const orders = await this.load();
    const index = orders.findIndex((o) => o.getId() === id);
    if (index === -1) {
      throw new ItemNotFoundException("Failed to find the element");
    }
    orders.splice(index, 1);
    await this.save(orders);
  }
}
