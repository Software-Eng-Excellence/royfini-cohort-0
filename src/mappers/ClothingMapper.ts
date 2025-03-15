import { ClothingBuilder } from "../models/builders/clothing.builder";
import { Clothing } from "../models/Clothing.model";
import { ClothingOrder } from "../models/csv/clothingOrder";
import { IMapper } from "./IMapper";
export class CSVClothingMapper implements IMapper<ClothingOrder, Clothing> {
  map(data: ClothingOrder): Clothing {
    return ClothingBuilder.newBuilder()
      .setClothingType(data["Clothing Type"])
      .setSize(data.Size)
      .setColor(data.Color)
      .setMaterial(data.Material)
      .setPattern(data.Pattern)
      .setBrand(data.Brand)
      .setGender(data.Gender)
      .setPackaging(data.Packaging)
      .setSpecialRequest(data["Special Request"])
      .build();
  }
}
