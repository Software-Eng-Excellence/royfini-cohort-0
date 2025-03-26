import { IIdentifiableItem, IItem } from "../IItem";
import { IdentifiableOrderItem, Order } from "../Order.model";

export class OrderBuilder {
  private item!: IItem;
  private price!: number;
  private quantity!: number;
  private id!: string;

  public static newBuilder(): OrderBuilder {
    return new OrderBuilder();
  }

  setItem(item: IItem): OrderBuilder {
    this.item = item;
    return this;
  }

  setPrice(price: number): OrderBuilder {
    this.price = price;
    return this;
  }

  setQuantity(quantity: number): OrderBuilder {
    this.quantity = quantity;
    return this;
  }

  setId(id: string): OrderBuilder {
    this.id = id;
    return this;
  }

  build(): Order {
    if (!this.item || !this.price || !this.quantity || !this.id) {
      throw new Error("Missing required properties to build an Order");
    }
    return new Order(this.item, this.price, this.quantity, this.id);
  }
}
export class IdentifiableOrderItemBuider {
  private item!: IIdentifiableItem;
  private order!: Order;

  static newBuilder(): IdentifiableOrderItemBuider {
    return new IdentifiableOrderItemBuider();
  }
  setItem(item: IIdentifiableItem): IdentifiableOrderItemBuider {
    this.item = item;
    return this;
  }

  setOrder(order: Order): IdentifiableOrderItemBuider {
    this.order = order;
    return this;
  }

  build(): IdentifiableOrderItem {
    if (!this.item || !this.order) {
      throw new Error(
        "Missing required properties to build an Identifiable Order"
      );
    }
    return new IdentifiableOrderItem(
      this.item,
      this.order.getPrice(),
      this.order.getQuantity(),
      this.order.getId()
    );
  }
}
