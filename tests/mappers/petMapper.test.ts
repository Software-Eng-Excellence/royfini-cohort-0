import { JSONPetMapper } from "../../src/mappers/PetMapper"
import { PetOrder } from "../../src/models/json/petOrder";
import { Pet } from "../../src/models/Pet.model";
describe("Pet Mapper", () => {
    let petMapper: JSONPetMapper;
    petMapper = new JSONPetMapper();

    const mockData: PetOrder = {
        "Order ID": "1234",
        "Product Type": "Food",
        "Pet Type": "Dog",
        Brand: "Purina",
        Size: "Large",
        Flavor: "Chicken",
        "Eco-Friendly": "Yes",
        "Price": "27",
        "Quantity": "27"
    };

    it("should create Pet model", () => {
        const data = petMapper.map(mockData);
        expect(data).toBeInstanceOf(Pet);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            productType: "Food",
            petType: "Dog",
            brand: "Purina",
            size: "Large",
            flavor: "Chicken",
            ecoFriendly: "Yes",
        });
    });
    it("should throw an error when required fields are missing", () => {
        const incompleteData = {
            "Product Type": "Food",
            "Pet Type": "Dog",
            // Missing Brand, Size, and other required fields
        } as unknown as PetOrder;
        
        expect(() => petMapper.map(incompleteData)).toThrowError();
    });
});