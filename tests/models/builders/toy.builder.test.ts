import { ToyBuilder } from "../../../src/models/builders/toy.builder";
import { Toy } from "../../../src/models/Toy.model";

describe("ToyBuilder", () => {
  let toyBuilder: ToyBuilder;

  beforeEach(() => {
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
  it("should allow chaining methods", () => {
    toyBuilder.setType("Building").setAgeGroup("4-7").setBrand("Lego");

    expect(toyBuilder).toBeInstanceOf(ToyBuilder);
  });
});
