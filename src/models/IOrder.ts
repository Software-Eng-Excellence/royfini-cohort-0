import { ID, id } from "../repository/IRepository";
import { IIdentifiableItem, IItem } from "./IItem";

export interface IOrder {
  getItems(): IItem;
  getPrice(): number;
  getQuantity(): number;
  getId(): id;
}

export interface IIdentifiableOrderItem extends IOrder, ID {
  getItems(): IIdentifiableItem;
}