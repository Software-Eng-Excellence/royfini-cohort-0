import { OrderBuilder } from "../models/builders/order.builder";
import { CakeOrder } from "../models/csv/cakeOrder";
import { ClothingOrder } from "../models/csv/clothingOrder";
import { IOrder } from "../models/IOrder";
import { ToyOrder } from "../models/xml/toyOrder";
import { FurnitureOrder } from "../models/xml/furnitureOrder";
import { IMapper } from "./IMapper";
import { PetOrder } from "../models/json/petOrder";
import { BookOrder } from "../models/json/bookOrder";
import { IItem } from "../models/IItem";

export class CSVCakeOrderMapper implements IMapper<CakeOrder, IOrder> {
  constructor(private itemMapper: IMapper<CakeOrder, IItem>) {}
  map(data: CakeOrder): IOrder {
    const item: IItem = this.itemMapper.map(data);
    return OrderBuilder.newBuilder()
      .setId(data.id)
      .setPrice(parseInt(data.Price))
      .setQuantity(parseInt(data.Quantity))
      .setItem(item)
      .build();
  }
}
export class CSVClothingOrderMapper implements IMapper<ClothingOrder, IOrder> {
  constructor(private itemMapper: IMapper<ClothingOrder, IItem>) {}
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
  constructor(private itemMapper: IMapper<ToyOrder, IItem>) {}
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
  implements IMapper<FurnitureOrder, IOrder>
{
  constructor(private itemMapper: IMapper<FurnitureOrder, IItem>) {}
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
  constructor(private itemMapper: IMapper<PetOrder, IItem>) {}
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
  constructor(private itemMapper: IMapper<BookOrder, IItem>) {}
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
