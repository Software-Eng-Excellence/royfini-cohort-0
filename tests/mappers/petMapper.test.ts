import { JSONPetMapper, PostgreSqlPet, PostgreSqlPetMapper } from "../../src/mappers/PetMapper"
import { IdentifiablePetBuilder, PetBuilder } from "../../src/models/builders/pet.builder";
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
    const mapper = new PostgreSqlPetMapper();

    const dbPet: PostgreSqlPet = {
        id: 'pet-101',
        producttype: 'Food',
        pettype: 'Dog',
        brand: 'Purina',
        size: 'Large',
        flavor: 'Chicken',
        ecofriendly: 'Yes'
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
    it('should map PostgreSqlPet to IdentifiablePet', () => {
        const result = mapper.map(dbPet);

        expect(result.getId()).toBe(dbPet.id);
        expect(result.getProductType()).toBe(dbPet.producttype);
        expect(result.getPetType()).toBe(dbPet.pettype);
        expect(result.getBrand()).toBe(dbPet.brand);
        expect(result.getSize()).toBe(dbPet.size);
        expect(result.getFlavor()).toBe(dbPet.flavor);
        expect(result.getEcoFriendly()).toBe(dbPet.ecofriendly);
    });

    it('should reverseMap IdentifiablePet to PostgreSqlPet', () => {
        const pet = PetBuilder.newBuilder()
            .setProductType(dbPet.producttype)
            .setPetType(dbPet.pettype)
            .setBrand(dbPet.brand)
            .setSize(dbPet.size)
            .setFlavor(dbPet.flavor)
            .setEcoFriendly(dbPet.ecofriendly)
            .build();

        const identifiablePet = IdentifiablePetBuilder.newBuilder()
            .setId(dbPet.id)
            .setPet(pet)
            .build();

        const result = mapper.reverseMap(identifiablePet);

        expect(result).toEqual(dbPet);
    });
});