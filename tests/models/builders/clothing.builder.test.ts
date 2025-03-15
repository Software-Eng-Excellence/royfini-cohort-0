import { ClothingBuilder } from "../../../src/models/builders/clothing.builder";
import { Clothing } from "../../../src/models/Clothing.model";

describe("ClothingBuilder", () => {
  let clothingBuilder: ClothingBuilder;
  beforeAll(() => {
    clothingBuilder = new ClothingBuilder();
  });
  it("should build Clothing class if all date are set", () => {
    const randomClothing = clothingBuilder
      .setClothingType("T-Shirt")
      .setSize("M")
      .setColor("Blue")
      .setMaterial("Cotton")
      .setPattern("Striped")
      .setBrand("Nike")
      .setGender("Unisex")
      .setPackaging("Box")
      .setSpecialRequest("Gift Wrap")
      .build();

    expect(randomClothing).toBeDefined();
    expect(randomClothing).toBeInstanceOf(Clothing);
    expect(randomClothing).toMatchObject({
      clothingType: "T-Shirt",
      size: "M",
      color: "Blue",
      material: "Cotton",
      brand: "Nike",
      gender: "Unisex",
      packaging: "Box",
      specialRequest: "Gift Wrap",
    });
  });
  it("should throw an error if not all data are set", () => {
    expect(()=>clothingBuilder
      .setPackaging("Box")
      .setSpecialRequest("Gift Wrap")
      .build()).toThrow("Missing required properties");
  });
});
