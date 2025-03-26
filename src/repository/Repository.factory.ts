import { ItemCategory } from "../models/IItem";
import { IOrder } from "../models/IOrder";
import { CakeOrderRepository } from "./file/Cake.order.repository";
import { OrderRepository } from "./sqlite/Order.repository";
import { Initializable, IRepository } from "./IRepository";
import { CakeRepository } from "./sqlite/Cake.order.repository";

export enum DBMode {
  SQLITE,
  FILE,
}

export class RepositoryFactory {
  public static async create(
    mode: DBMode,
    category: ItemCategory
  ): Promise<IRepository<IOrder>> {
    switch (mode) {
      case DBMode.SQLITE:
        let repository: IRepository<IOrder> & Initializable;
        switch (category) {
          case ItemCategory.CAKE:
            repository = new OrderRepository(new CakeRepository());
            break;
          default:
            throw new Error("Unsupported category");
        }
        await repository.init();
        return repository;
      case DBMode.FILE:
        switch (category) {
          case ItemCategory.CAKE:
            return new CakeOrderRepository("src/data/cake orders.csv");
          default:
            throw new Error("Unsupported category");
        }
      default:
        throw new Error("Unsupported DB mode");
    }
  }
}
