import { FurnitureOrder } from "../../src/models/xml/furnitureOrder";
import { XMLFurnitureMapper } from "../../src/mappers/FurnitureMapper";
import { Furniture } from "../../src/models/Furniture.model";

describe("Furniture Mapper", () => {
    let furnitureMapper: XMLFurnitureMapper;
    furnitureMapper = new XMLFurnitureMapper();

    const mockData: FurnitureOrder = {
        OrderID: "1234",
        Type: "Chair",
        Material: "Wood",
        Color: "Brown",
        Size: "Medium",
        Style: "Modern",
        AssemblyRequired: "Yes",
        Warranty: "2 years",
        Price: 24,
        Quantity: 4
    };

    it("should create Furniture model", () => {
        const data = furnitureMapper.map(mockData);
        expect(data).toBeInstanceOf(Furniture);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            type: "Chair",
            material: "Wood",
            color: "Brown",
            size: "Medium",
            style: "Modern",
            assemblyRequired: "Yes",
            warranty: "2 years",
        });
    });
    it("should throw an error when required fields are missing", () => {
        const incompleteData = {
            Type: "Chair",
            Material: "Wood",
            // Missing Color, Size, Style, etc.
        } as unknown as FurnitureOrder;
        
        expect(() => furnitureMapper.map(incompleteData)).toThrowError();
    });
});
