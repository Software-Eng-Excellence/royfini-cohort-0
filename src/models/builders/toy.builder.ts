import { Toy } from "../Toy.model";

export class ToyBuilder {
  private type!: string;
  private ageGroup!: string;
  private brand!: string;
  private material!: string;
  private batteryRequired!: string;
  private educational!: string;

  public static newBuilder(): ToyBuilder {
    return new ToyBuilder();
  }

  setType(type: string): this {
    this.type = type;
    return this;
  }

  setAgeGroup(ageGroup: string): this {
    this.ageGroup = ageGroup;
    return this;
  }

  setBrand(brand: string): this {
    this.brand = brand;
    return this;
  }

  setMaterial(material: string): this {
    this.material = material;
    return this;
  }

  setBatteryRequired(batteryRequired: string): this {
    this.batteryRequired = batteryRequired;
    return this;
  }

  setEducational(educational: string): this {
    this.educational = educational;
    return this;
  }

  build(): Toy {
    const requiredProperties = [
      this.type,
      this.ageGroup,
      this.brand,
      this.material,
      this.batteryRequired,
      this.educational,
    ];

    if (
      requiredProperties.some(
        (prop) => prop === undefined || prop === null || prop === ""
      )
    ) {
      console.error("Missing required properties, could not build Toy");
      throw new Error("Missing required properties");
    }

    return new Toy(
      this.type,
      this.ageGroup,
      this.brand,
      this.material,
      this.batteryRequired,
      this.educational
    );
  }
}
