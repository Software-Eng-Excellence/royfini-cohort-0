import { IdentifiableToyBuilder, ToyBuilder } from "../../../src/models/builders/toy.builder";
import { IdentifiableToy, Toy } from "../../../src/models/Toy.model";

describe("ToyBuilder", () => {
  let toyBuilder: ToyBuilder;

  beforeAll(() => {
    toyBuilder = new ToyBuilder();
  });
  it("should build a Toy class if all data is passed", () => {
    const randomToy = toyBuilder
      .setType("Building")
      .setAgeGroup("4-7")
      .setBrand("Lego")
      .setMaterial("Plastic")
      .setBatteryRequired("Yes")
      .setEducational("Yes")
      .build();
    expect(randomToy).toBeDefined();
    expect(randomToy).toBeInstanceOf(Toy);
    expect(randomToy).toMatchObject({
      type: "Building",
      ageGroup: "4-7",
      brand: "Lego",
      material: "Plastic",
      batteryRequired: "Yes",
      educational: "Yes",
    });
  });
  it("should throw an error if not all data are set", () => {
    expect(() => {
      ToyBuilder.newBuilder().setAgeGroup("4-7").build();
    }).toThrow("Missing required properties");
  });
  const mockToy = {
    getType: jest.fn(() => 'Puzzle'),
    getAgeGroup: jest.fn(() => '3-5'),
    getBrand: jest.fn(() => 'Lego'),
    getMaterial: jest.fn(() => 'Plastic'),
    getBatteryRequired: jest.fn(() => false),
    getEducational: jest.fn(() => true),
  } as unknown as Toy;

  it('should build an IdentifiableToy with all properties', () => {
    const toy = IdentifiableToyBuilder
      .newBuilder()
      .setId('toy-123')
      .setToy(mockToy)
      .build();

    expect(toy).toBeInstanceOf(IdentifiableToy);
    expect(toy.getId()).toBe('toy-123');
    expect(toy.getType()).toBe('Puzzle');
    expect(toy.getAgeGroup()).toBe('3-5');
    expect(toy.getBrand()).toBe('Lego');
    expect(toy.getMaterial()).toBe('Plastic');
    expect(toy.getBatteryRequired()).toBe(false);
    expect(toy.getEducational()).toBe(true);
  });

  it('should throw error if id is missing', () => {
    expect(() => {
      IdentifiableToyBuilder
        .newBuilder()
        .setToy(mockToy)
        .build();
    }).toThrowError('Missing required properties');
  });

  it('should throw error if toy is missing', () => {
    expect(() => {
      IdentifiableToyBuilder
        .newBuilder()
        .setId('toy-456')
        .build();
    }).toThrowError('Missing required properties');
  });
});
