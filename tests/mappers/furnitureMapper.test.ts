import { FurnitureOrder } from "../../src/models/xml/furnitureOrder";
import { PostgreSqlFurniture, PostgreSqlFurnitureMapper, XMLFurnitureMapper } from "../../src/mappers/FurnitureMapper";
import { Furniture } from "../../src/models/Furniture.model";
import { FurnitureBuilder, IdentifiableFurnitureBuilder } from "../../src/models/builders/furniture.builder";

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
    const mapper = new PostgreSqlFurnitureMapper();

    const dbFurniture: PostgreSqlFurniture = {
        id: 'furn-303',
        type: 'Chair',
        material: 'Wood',
        color: 'Brown',
        size: 'Medium',
        style: 'Modern',
        assemblyrequired: 'Yes',
        warranty: '2 years'
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
    it('should map PostgreSqlFurniture to IdentifiableFurniture', () => {
        const result = mapper.map(dbFurniture);

        expect(result.getId()).toBe(dbFurniture.id);
        expect(result.getType()).toBe(dbFurniture.type);
        expect(result.getMaterial()).toBe(dbFurniture.material);
        expect(result.getColor()).toBe(dbFurniture.color);
        expect(result.getSize()).toBe(dbFurniture.size);
        expect(result.getStyle()).toBe(dbFurniture.style);
        expect(result.getAssemblyRequired()).toBe(dbFurniture.assemblyrequired);
        expect(result.getWarranty()).toBe(dbFurniture.warranty);
    });

    it('should reverseMap IdentifiableFurniture to PostgreSqlFurniture', () => {
        const furniture = FurnitureBuilder.newBuilder()
            .setType(dbFurniture.type)
            .setMaterial(dbFurniture.material)
            .setColor(dbFurniture.color)
            .setSize(dbFurniture.size)
            .setStyle(dbFurniture.style)
            .setAssemblyRequired(dbFurniture.assemblyrequired)
            .setWarranty(dbFurniture.warranty)
            .build();

        const identifiableFurniture = IdentifiableFurnitureBuilder.newBuilder()
            .setId(dbFurniture.id)
            .setFurniture(furniture)
            .build();

        const result = mapper.reverseMap(identifiableFurniture);

        expect(result).toEqual(dbFurniture);
    });
});
