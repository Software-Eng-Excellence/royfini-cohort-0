import { CSVClothingMapper } from "../../src/mappers/ClothingMapper"
import { Clothing } from "../../src/models/Clothing.model";
import { ClothingOrder } from "../../src/models/csv/clothingOrder";
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
})