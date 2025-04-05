import { FurnitureBuilder, IdentifiableFurnitureBuilder } from "../../../src/models/builders/furniture.builder";
import { Furniture, IdentifiableFurniture } from "../../../src/models/Furniture.model";
describe("furnitureBuilder", () => {
  let furnitureBuilder: FurnitureBuilder;
  beforeAll(() => {
    furnitureBuilder = new FurnitureBuilder();
  });
  it("shoud build Furniture if all data are set", () => {
    const randomFurniture = furnitureBuilder
      .setType("Table")
      .setMaterial("Wood")
      .setColor("Brown")
      .setSize("Medium")
      .setStyle("Modern")
      .setAssemblyRequired("Yes")
      .setWarranty("5 Years")
      .build();
    expect(randomFurniture).toBeDefined();
    expect(randomFurniture).toBeInstanceOf(Furniture);
    expect(randomFurniture).toMatchObject({
      type: "Table",
      material: "Wood",
      color: "Brown",
      size: "Medium",
      style: "Modern",
      assemblyRequired: "Yes",
      warranty: "5 Years",
    });
  });
  it("should throw an error if not all data are set", () => {
    expect(() => FurnitureBuilder.newBuilder()
      .setAssemblyRequired("Yes")
      .setWarranty("5 Years")
      .build()
    ).toThrow("Missing required properties");
  });
  const mockFurniture = {
    getType: jest.fn(() => 'Chair'),
    getMaterial: jest.fn(() => 'Wood'),
    getColor: jest.fn(() => 'Brown'),
    getSize: jest.fn(() => 'Medium'),
    getStyle: jest.fn(() => 'Modern'),
    getAssemblyRequired: jest.fn(() => true),
    getWarranty: jest.fn(() => '2 years'),
  } as unknown as Furniture;

  it('should build an IdentifiableFurniture with all properties', () => {
    const furniture = IdentifiableFurnitureBuilder
      .newBuilder()
      .setId('furniture-123')
      .setFurniture(mockFurniture)
      .build();

    expect(furniture).toBeInstanceOf(IdentifiableFurniture);
    expect(furniture.getId()).toBe('furniture-123');
    expect(furniture.getType()).toBe('Chair');
    expect(furniture.getMaterial()).toBe('Wood');
    expect(furniture.getColor()).toBe('Brown');
    expect(furniture.getSize()).toBe('Medium');
    expect(furniture.getStyle()).toBe('Modern');
    expect(furniture.getAssemblyRequired()).toBe(true);
    expect(furniture.getWarranty()).toBe('2 years');
  });

  it('should throw error if id is missing', () => {
    expect(() => {
      IdentifiableFurnitureBuilder
        .newBuilder()
        .setFurniture(mockFurniture)
        .build();
    }).toThrowError('Missing required properties');
  });

  it('should throw error if furniture is missing', () => {
    expect(() => {
      IdentifiableFurnitureBuilder
        .newBuilder()
        .setId('furniture-456')
        .build();
    }).toThrowError('Missing required properties');
  });
});
