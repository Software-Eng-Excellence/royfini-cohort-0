import { FurnitureBuilder } from "../models/builders/furniture.builder";
import { Furniture } from "../models/Furniture.model";
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
