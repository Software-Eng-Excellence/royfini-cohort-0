import { ToyBuilder } from "../models/builders/toy.builder";
import { Toy } from "../models/Toy.model";
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
