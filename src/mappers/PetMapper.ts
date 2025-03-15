import { PetBuilder } from "../models/builders/pet.builder";
import { PetOrder } from "../models/json/petOrder";
import { Pet } from "../models/Pet.model";
import { IMapper } from "./IMapper";

export class JSONPetMapper implements IMapper<PetOrder, Pet> {
  map(data: PetOrder): Pet {
    return PetBuilder.newBuilder()
      .setProductType(data["Product Type"])
      .setPetType(data["Pet Type"])
      .setBrand(data.Brand)
      .setSize(data.Size)
      .setFlavor(data.Flavor)
      .setEcoFriendly(data["Eco-Friendly"])
      .build();
  }
}
