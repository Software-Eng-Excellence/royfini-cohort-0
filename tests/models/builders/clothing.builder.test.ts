import { ClothingBuilder, IdentifiableClothingBuilder } from "../../../src/models/builders/clothing.builder";
import { Clothing, IdentifiableClothing } from "../../../src/models/Clothing.model";

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
    expect(() => ClothingBuilder.newBuilder()
      .setPackaging("Box")
      .setSpecialRequest("Gift Wrap")
      .build()).toThrow("Missing required properties");
  });
  const mockClothing = {
    getClothingType: jest.fn(() => 'T-Shirt'),
    getSize: jest.fn(() => 'L'),
    getColor: jest.fn(() => 'Black'),
    getMaterial: jest.fn(() => 'Cotton'),
    getPattern: jest.fn(() => 'Solid'),
    getBrand: jest.fn(() => 'Nike'),
    getGender: jest.fn(() => 'Unisex'),
    getPackaging: jest.fn(() => 'Bag'),
    getSpecialRequest: jest.fn(() => 'Gift wrap'),
  } as unknown as Clothing;

  it('should build an IdentifiableClothing with all properties', () => {
    const clothing = IdentifiableClothingBuilder
      .newBuilder()
      .setId('cloth-123')
      .setClothing(mockClothing)
      .build();

    expect(clothing).toBeInstanceOf(IdentifiableClothing);
    expect(clothing.getId()).toBe('cloth-123');
    expect(clothing.getClothingType()).toBe('T-Shirt');
    expect(clothing.getSize()).toBe('L');
    expect(clothing.getColor()).toBe('Black');
    expect(clothing.getMaterial()).toBe('Cotton');
    expect(clothing.getPattern()).toBe('Solid');
    expect(clothing.getBrand()).toBe('Nike');
    expect(clothing.getGender()).toBe('Unisex');
    expect(clothing.getPackaging()).toBe('Bag');
    expect(clothing.getSpecialRequest()).toBe('Gift wrap');
  });

  it('should throw error if id is missing', () => {
    expect(() => {
      IdentifiableClothingBuilder
        .newBuilder()
        .setClothing(mockClothing)
        .build();
    }).toThrowError('Missing required properties');
  });

  it('should throw error if clothing is missing', () => {
    expect(() => {
      IdentifiableClothingBuilder
        .newBuilder()
        .setId('cloth-456')
        .build();
    }).toThrowError('Missing required properties');
  });
});
