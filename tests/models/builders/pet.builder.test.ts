import { IdentifiablePetBuilder, PetBuilder } from "../../../src/models/builders/pet.builder";
import { IdentifiablePet, Pet } from "../../../src/models/Pet.model";

describe("PetBuilder", () => {
  let petBuilder = new PetBuilder();

  beforeAll(() => {
    petBuilder = new PetBuilder();
  });

  it("should build a Pet class if all data is passed", () => {
    const randomPet = petBuilder
      .setProductType("Food")
      .setPetType("Dog")
      .setBrand("PetCare")
      .setSize("Medium")
      .setFlavor("Chicken")
      .setEcoFriendly("Yes")
      .build();
    expect(randomPet).toBeDefined();
    expect(randomPet).toMatchObject({
      productType: "Food",
      petType: "Dog",
      brand: "PetCare",
      size: "Medium",
      flavor: "Chicken",
      ecoFriendly: "Yes",
    });
    expect(randomPet).toBeInstanceOf(Pet);
  });
  it("should throw an error if not all data are set", () => {
    expect(() => {
      PetBuilder
        .newBuilder()
        .setProductType("Food")
        .setPetType("Dog")
        .build();
    }).toThrow("Missing required properties")
  });
  const mockPet = {
    getProductType: jest.fn(() => 'Food'),
    getPetType: jest.fn(() => 'Dog'),
    getBrand: jest.fn(() => 'Purina'),
    getSize: jest.fn(() => 'Large'),
    getFlavor: jest.fn(() => 'Chicken'),
    getEcoFriendly: jest.fn(() => true),
  } as unknown as Pet;

  it('should build an IdentifiablePet with all properties', () => {
    const pet = IdentifiablePetBuilder
      .newBuilder()
      .setId('pet-001')
      .setPet(mockPet)
      .build();

    expect(pet).toBeInstanceOf(IdentifiablePet);
    expect(pet.getId()).toBe('pet-001');
    expect(pet.getProductType()).toBe('Food');
    expect(pet.getPetType()).toBe('Dog');
    expect(pet.getBrand()).toBe('Purina');
    expect(pet.getSize()).toBe('Large');
    expect(pet.getFlavor()).toBe('Chicken');
    expect(pet.getEcoFriendly()).toBe(true);
  });

  it('should throw error if id is missing', () => {
    expect(() => {
      IdentifiablePetBuilder
        .newBuilder()
        .setPet(mockPet)
        .build();
    }).toThrowError('Missing required properties');
  });

  it('should throw error if pet is missing', () => {
    expect(() => {
      IdentifiablePetBuilder
        .newBuilder()
        .setId('pet-002')
        .build();
    }).toThrowError('Missing required properties');
  });
});
