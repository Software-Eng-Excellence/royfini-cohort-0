import { IdentifiableToyBuilder, ToyBuilder } from "../models/builders/toy.builder";
import { IdentifiableToy, Toy } from "../models/Toy.model";
import { ToyOrder } from "../models/xml/toyOrder";
import { IMapper } from "./IMapper";

export class XMLToyMapper implements IMapper<ToyOrder, Toy> {
  reverseMap(data: Toy): ToyOrder {
    throw new Error("Method not implemented.");
  }
  map(data: ToyOrder): Toy {
    return ToyBuilder.newBuilder()
      .setType(data.Type)
      .setAgeGroup(data.AgeGroup)
      .setBrand(data.Brand)
      .setMaterial(data.Material)
      .setBatteryRequired(data.BatteryRequired)
      .setEducational(data.Educational)
      .build();
  }
}
export interface PostgreSqlToy {
  id: string,
  type: string,
  agegroup: string,
  brand: string,
  material: string,
  batteryrequired: string,
  educational: string,
}
export class PostgreSqlToyMapper implements IMapper<PostgreSqlToy, IdentifiableToy> {
  map(data: PostgreSqlToy): IdentifiableToy {
    return IdentifiableToyBuilder.newBuilder().setToy(
      ToyBuilder.newBuilder().setType(data.type).setAgeGroup(data.agegroup).setBrand(data.brand).setMaterial(data.material).setBatteryRequired(data.batteryrequired).setEducational(data.educational).build()
    ).setId(data.id).build()
  }
  reverseMap(data: IdentifiableToy): PostgreSqlToy {
    return {
      id: data.getId(),
      type: data.getType(),
      agegroup: data.getAgeGroup(),
      brand: data.getBrand(),
      material: data.getMaterial(),
      batteryrequired: data.getBatteryRequired(),
      educational: data.getEducational()
    }
  }

}
