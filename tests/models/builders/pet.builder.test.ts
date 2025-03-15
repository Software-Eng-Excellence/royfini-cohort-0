import { PetBuilder } from "../../../src/models/builders/pet.builder";
import { Pet } from "../../../src/models/Pet.model";

describe("PetBuilder", () => {
  let petBuilder = new PetBuilder();

  beforeAll(() => {
    petBuilder = new PetBuilder();
  });

  it("should build a Pet class if all data is passed", () => {
    const randomPet = petBuilder
      .setProductType("Food")
      .setPetType("Dog")
      .setBrand("PetCare")
      .setSize("Medium")
      .setFlavor("Chicken")
      .setEcoFriendly("Yes")
      .build();
    expect(randomPet).toBeDefined();
    expect(randomPet).toMatchObject({
      productType: "Food",
      petType: "Dog",
      brand: "PetCare",
      size: "Medium",
      flavor: "Chicken",
      ecoFriendly: "Yes",
    });
    expect(randomPet).toBeInstanceOf(Pet);
  });
  it("should throw an error if not all data are set", () => {
    expect(() => {
      petBuilder
        .setProductType("Food")
        .setPetType("Dog")
        .build();
    }).toThrow("Missing required properties")
  });
});
