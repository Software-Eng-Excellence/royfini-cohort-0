import {
  IdentifiableOrderItemBuider,
  OrderBuilder,
} from "../models/builders/order.builder";
import { CakeOrder } from "../models/csv/cakeOrder";
import { ClothingOrder } from "../models/csv/clothingOrder";
import { IIdentifiableOrderItem, IOrder } from "../models/IOrder";
import { ToyOrder } from "../models/xml/toyOrder";
import { FurnitureOrder } from "../models/xml/furnitureOrder";
import { IMapper } from "./IMapper";
import { PetOrder } from "../models/json/petOrder";
import { BookOrder } from "../models/json/bookOrder";
import { IIdentifiableItem, IItem } from "../models/IItem";
import { IdentifiableOrderItem } from "../models/Order.model";

export class CSVCakeOrderMapper implements IMapper<CakeOrder, IOrder> {
  constructor(private itemMapper: IMapper<CakeOrder, IItem>) { }
  map(data: CakeOrder): IOrder {
    const item: IItem = this.itemMapper.map(data);
    return OrderBuilder.newBuilder()
      .setId(data.id!)
      .setPrice(parseInt(data.Price!))
      .setQuantity(parseInt(data.Quantity!))
      .setItem(item)
      .build();
  }
  reverseMap(data: IOrder): CakeOrder {
    const item = this.itemMapper.reverseMap(data.getItems());
    return {
      id: data.getId(),
      ...item,
      Price: data.getPrice().toString(),
      Quantity: data.getQuantity().toString(),
    };
  }
}
export class CSVClothingOrderMapper implements IMapper<ClothingOrder, IOrder> {
  constructor(private itemMapper: IMapper<ClothingOrder, IItem>) { }
  reverseMap(_: IOrder): ClothingOrder {
    throw new Error("Method not implemented.");
  }
  map(data: ClothingOrder): IOrder {
    const item: IItem = this.itemMapper.map(data);
    return OrderBuilder.newBuilder()
      .setId(data["Order ID"])
      .setPrice(parseInt(data.Price))
      .setQuantity(parseInt(data.Quantity))
      .setItem(item)
      .build();
  }
}
export class XMLToyOrderMapper implements IMapper<ToyOrder, IOrder> {
  constructor(private itemMapper: IMapper<ToyOrder, IItem>) { }
  reverseMap(_: IOrder): ToyOrder {
    throw new Error("Method not implemented.");
  }
  map(data: ToyOrder): IOrder {
    const item: IItem = this.itemMapper.map(data);
    return OrderBuilder.newBuilder()
      .setId(data.OrderID.toString())
      .setPrice(data.Price)
      .setQuantity(data.Quantity)
      .setItem(item)
      .build();
  }
}
export class XMLFurnitureOrderMapper
  implements IMapper<FurnitureOrder, IOrder> {
  constructor(private itemMapper: IMapper<FurnitureOrder, IItem>) { }
  reverseMap(_: IOrder): FurnitureOrder {
    throw new Error("Method not implemented.");
  }
  map(data: FurnitureOrder): IOrder {
    const item: IItem = this.itemMapper.map(data);
    return OrderBuilder.newBuilder()
      .setId(data.OrderID.toString())
      .setPrice(data.Price)
      .setQuantity(data.Quantity)
      .setItem(item)
      .build();
  }
}
export class JSONPetOrderMapper implements IMapper<PetOrder, IOrder> {
  constructor(private itemMapper: IMapper<PetOrder, IItem>) { }
  reverseMap(_: IOrder): PetOrder {
    throw new Error("Method not implemented.");
  }
  map(data: PetOrder): IOrder {
    const item: IItem = this.itemMapper.map(data);
    return OrderBuilder.newBuilder()
      .setId(data["Order ID"].toString())
      .setPrice(parseInt(data.Price))
      .setQuantity(parseInt(data.Quantity))
      .setItem(item)
      .build();
  }
}
export class JSONBookOrderMapper implements IMapper<BookOrder, IOrder> {
  constructor(private itemMapper: IMapper<BookOrder, IItem>) { }
  reverseMap(_: IOrder): BookOrder {
    throw new Error("Method not implemented.");
  }
  map(data: BookOrder): IOrder {
    const item: IItem = this.itemMapper.map(data);
    return OrderBuilder.newBuilder()
      .setId(data["Order ID"].toString())
      .setPrice(parseInt(data.Price))
      .setQuantity(parseInt(data.Quantity))
      .setItem(item)
      .build();
  }
}
export interface SQLiteOrder {
  id: string;
  quantity: number;
  price: number;
  item_category: string;
  item_id: string;
}
export class SQLiteOrderMapper
  implements
  IMapper<
    { data: SQLiteOrder; item: IIdentifiableItem },
    IdentifiableOrderItem
  > {
  map({
    data,
    item,
  }: {
    data: SQLiteOrder;
    item: IIdentifiableItem;
  }): IdentifiableOrderItem {
    const order = OrderBuilder.newBuilder()
      .setId(data.id)
      .setPrice(data.price)
      .setQuantity(data.quantity)
      .setItem(item)
      .build();
    return IdentifiableOrderItemBuider.newBuilder()
      .setOrder(order)
      .setItem(item)
      .build();
  }
  reverseMap(data: IdentifiableOrderItem): {
    data: SQLiteOrder;
    item: IIdentifiableItem;
  } {
    return {
      data: {
        id: data.getId(),
        price: data.getPrice(),
        quantity: data.getQuantity(),
        item_category: data.getItems().getCategory(),
        item_id: data.getItems().getId(),
      },
      item: data.getItems(),
    };
  }
}
export interface PostgreSqlOrder {
  id: string;
  quantity: number;
  price: number;
  item_category: string;
  item_id: string;
}
export class PostgreSqlOrderMapper
  implements
    IMapper<
      { data: PostgreSqlOrder; item: IIdentifiableItem },
      IdentifiableOrderItem
    >
{
  map({
    data,
    item,
  }: {
    data: PostgreSqlOrder;
    item: IIdentifiableItem;
  }): IdentifiableOrderItem {
    const order = OrderBuilder.newBuilder()
      .setId(data.id)
      .setPrice(data.price)
      .setQuantity(data.quantity)
      .setItem(item)
      .build();
    return IdentifiableOrderItemBuider.newBuilder()
      .setOrder(order)
      .setItem(item)
      .build();
  }
  reverseMap(data: IdentifiableOrderItem): {
    data: PostgreSqlOrder;
    item: IIdentifiableItem;
  } {
    return {
      data: {
        id: data.getId(),
        price: data.getPrice(),
        quantity: data.getQuantity(),
        item_category: data.getItems().getCategory(),
        item_id: data.getItems().getId(),
      },
      item: data.getItems(),
    };
  }
}
