import { FurnitureBuilder, IdentifiableFurnitureBuilder } from "../models/builders/furniture.builder";
import { Furniture, IdentifiableFurniture } from "../models/Furniture.model";
import { FurnitureOrder } from "../models/xml/furnitureOrder";
import { IMapper } from "./IMapper";

export class XMLFurnitureMapper implements IMapper<FurnitureOrder, Furniture> {
  reverseMap(data: Furniture): FurnitureOrder {
    throw new Error("Method not implemented.");
  }
  map(data: FurnitureOrder): Furniture {
    return FurnitureBuilder.newBuilder()
      .setType(data.Type)
      .setMaterial(data.Material)
      .setColor(data.Color)
      .setSize(data.Size)
      .setStyle(data.Style)
      .setAssemblyRequired(data.AssemblyRequired)
      .setWarranty(data.Warranty)
      .build();
  }
}
export interface PostgreSqlFurniture {
  id: string,
  type: string,
  material: string,
  color: string,
  size: string,
  style: string,
  assemblyrequired: string,
  warranty: string,
}
export class PostgreSqlFurnitureMapper implements IMapper<PostgreSqlFurniture, IdentifiableFurniture> {
  map(data: PostgreSqlFurniture): IdentifiableFurniture {
    return IdentifiableFurnitureBuilder.newBuilder().setFurniture(
      FurnitureBuilder.newBuilder().setType(data.type).setMaterial(data.material).setColor(data.color).setSize(data.size).setStyle(data.style).setAssemblyRequired(data.assemblyrequired).setWarranty(data.warranty).build()
    ).setId(data.id).build()
  }
  reverseMap(data: IdentifiableFurniture): PostgreSqlFurniture {
    return {
      id: data.getId(),
      type: data.getType(),
      material: data.getMaterial(),
      color: data.getColor(),
      size: data.getSize(),
      style: data.getStyle(),
      assemblyrequired: data.getAssemblyRequired(),
      warranty: data.getWarranty(),
    }
  }

}
