import { ClothingBuilder, IdentifiableClothingBuilder } from "../models/builders/clothing.builder";
import { Clothing, IdentifiableClothing } from "../models/Clothing.model";
import { ClothingOrder } from "../models/csv/clothingOrder";
import { IMapper } from "./IMapper";
export class CSVClothingMapper implements IMapper<ClothingOrder, Clothing> {
  reverseMap(data: Clothing): ClothingOrder {
    throw new Error("Method not implemented.");
  }
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
export interface PostgreSqlClothing {
  id: string,
  clothingtype: string,
  size: string,
  color: string,
  material: string,
  pattern: string,
  brand: string,
  gender: string,
  packaging: string,
  specialrequest: string
}
export class PostgreSqlClothingMapper implements IMapper<PostgreSqlClothing, IdentifiableClothing> {
  map(data: PostgreSqlClothing): IdentifiableClothing {
    return IdentifiableClothingBuilder.newBuilder().setClothing(
      ClothingBuilder.newBuilder().setClothingType(data.clothingtype).setBrand(data.brand).setColor(data.color).setGender(data.gender).setMaterial(data.material).setPackaging(data.packaging).setPattern(data.pattern).setSize(data.size).setSpecialRequest(data.specialrequest).build()
    ).setId(data.id).build()
  }
  reverseMap(data: IdentifiableClothing): PostgreSqlClothing {
    return {
      id: data.getId(),
      clothingtype: data.getClothingType(),
      size: data.getSize(),
      color: data.getColor(),
      material: data.getMaterial(),
      pattern: data.getPattern(),
      brand: data.getBrand(),
      gender: data.getGender(),
      packaging: data.getPackaging(),
      specialrequest: data.getSpecialRequest()
    }
  }

}
