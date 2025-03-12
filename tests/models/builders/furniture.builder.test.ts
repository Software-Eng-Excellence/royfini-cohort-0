import { FurnitureBuilder } from "../../../src/models/builders/furniture.builder";
import { Furniture } from "../../../src/models/Furniture.model";
describe("furnitureBuilder", () => {
  let furnitureBuilder: FurnitureBuilder;
  beforeEach(() => {
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
    expect(()=>furnitureBuilder
      .setAssemblyRequired("Yes")
      .setWarranty("5 Years")
      .build()
    ).toThrow("Missing required properties");
  });
  it("should allow chaining method", () => {
    furnitureBuilder.setAssemblyRequired("Yes").setWarranty("5 Years");
    expect(furnitureBuilder).toBeInstanceOf(FurnitureBuilder);
  });
});
