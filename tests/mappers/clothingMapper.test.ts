import { CSVClothingMapper } from "../../src/mappers/ClothingMapper"
import { Clothing } from "../../src/models/Clothing.model";
import { ClothingOrder } from "../../src/models/csv/clothingOrder";
import { PostgreSqlClothingMapper } from "../../src/mappers/ClothingMapper";
import { ClothingBuilder, IdentifiableClothingBuilder } from "../../src/models/builders/clothing.builder";
describe("Clothing Mapper", () => {
    let clothingMapper: CSVClothingMapper;
    clothingMapper = new CSVClothingMapper();
    const mockData = {
        "Order ID": "1234",
        "Clothing Type": "Jeans",
        Size: "XL",
        Color: "Red",
        Material: "Cotton",
        Pattern: "Camouflage",
        Brand: "Modern Wear",
        Gender: "Unisex",
        Packaging: "Eco-Friendly Packaging",
        "Special Request": "None",
        Price: "29",
        Quantity: "5",
    }
    const mapper = new PostgreSqlClothingMapper();

    const dbObject = {
        id: '123',
        clothingtype: 'Shirt',
        size: 'M',
        color: 'Blue',
        material: 'Cotton',
        pattern: 'Striped',
        brand: 'Uniqlo',
        gender: 'Unisex',
        packaging: 'Plastic',
        specialrequest: 'None'
    };
    it("should create Clothing Model", () => {
        const data = clothingMapper.map(mockData as ClothingOrder)
        expect(data).toBeDefined();
        expect(data).toBeInstanceOf(Clothing);
        expect(data).toMatchObject({
            clothingType: "Jeans",
            size: "XL",
            color: "Red",
            material: "Cotton",
            pattern: "Camouflage",
            brand: "Modern Wear",
            gender: "Unisex",
            packaging: "Eco-Friendly Packaging",
            specialRequest: "None"
        });
    })
    it("should throw an error when required fields are missing", () => {
        const incompleteData = {
            "Clothing Type": "Jeans",
            Size: "XL",
            Color: "Red",
            // Missing Material, Pattern, and other required fields
        } as unknown as ClothingOrder;

        expect(() => clothingMapper.map(incompleteData)).toThrowError();
    });
    it('should map PostgreSqlClothing to IdentifiableClothing', () => {
        const result = mapper.map(dbObject);

        expect(result.getId()).toBe(dbObject.id);
        expect(result.getClothingType()).toBe(dbObject.clothingtype);
        expect(result.getSize()).toBe(dbObject.size);
        expect(result.getColor()).toBe(dbObject.color);
        expect(result.getMaterial()).toBe(dbObject.material);
        expect(result.getPattern()).toBe(dbObject.pattern);
        expect(result.getBrand()).toBe(dbObject.brand);
        expect(result.getGender()).toBe(dbObject.gender);
        expect(result.getPackaging()).toBe(dbObject.packaging);
        expect(result.getSpecialRequest()).toBe(dbObject.specialrequest);
    });

    it('should reverseMap IdentifiableClothing to PostgreSqlClothing', () => {
        const clothing = ClothingBuilder.newBuilder()
            .setClothingType(dbObject.clothingtype)
            .setSize(dbObject.size)
            .setColor(dbObject.color)
            .setMaterial(dbObject.material)
            .setPattern(dbObject.pattern)
            .setBrand(dbObject.brand)
            .setGender(dbObject.gender)
            .setPackaging(dbObject.packaging)
            .setSpecialRequest(dbObject.specialrequest)
            .build();

        const identifiableClothing = IdentifiableClothingBuilder.newBuilder()
            .setId(dbObject.id)
            .setClothing(clothing)
            .build();

        const result = mapper.reverseMap(identifiableClothing);

        expect(result).toEqual(dbObject);
    });
})