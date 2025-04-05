import { IdentifiablePetBuilder, PetBuilder } from "../models/builders/pet.builder";
import { PetOrder } from "../models/json/petOrder";
import { IdentifiablePet, Pet } from "../models/Pet.model";
import { IMapper } from "./IMapper";

export class JSONPetMapper implements IMapper<PetOrder, Pet> {
  reverseMap(data: Pet): PetOrder {
    throw new Error("Method not implemented.");
  }
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
export interface PostgreSqlPet {
  id: string,
  producttype: string,
  pettype: string,
  brand: string,
  size: string,
  flavor: string,
  ecofriendly: string
}
export class PostgreSqlPetMapper implements IMapper<PostgreSqlPet, IdentifiablePet> {
  map(data: PostgreSqlPet): IdentifiablePet {
    return IdentifiablePetBuilder.newBuilder().setPet(
      PetBuilder.newBuilder().setProductType(data.producttype).setBrand(data.brand).setEcoFriendly(data.ecofriendly).setPetType(data.pettype).setSize(data.size).setFlavor(data.flavor).build()
    ).setId(data.id).build()
  }
  reverseMap(data: IdentifiablePet): PostgreSqlPet {
    return {
      id: data.getId(),
      producttype: data.getProductType(),
      pettype: data.getPetType(),
      brand: data.getBrand(),
      size: data.getSize(),
      flavor: data.getFlavor(),
      ecofriendly: data.getEcoFriendly()
    }
  }

}
