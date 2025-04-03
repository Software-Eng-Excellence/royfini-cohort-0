import { IdentifiableToy, Toy } from "../Toy.model";

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
export class IdentifiableToyBuilder {
  private id!: string;
  private toy!: Toy;

  static newBuilder(): IdentifiableToyBuilder {
    return new IdentifiableToyBuilder();
  }

  setId(id: string): IdentifiableToyBuilder {
    this.id = id;
    return this;
  }
  setToy(toy: Toy): IdentifiableToyBuilder {
    this.toy = toy;
    this.toy.getType();
    this.toy.getAgeGroup();
    this.toy.getBrand();
    this.toy.getMaterial();
    this.toy.getBatteryRequired();
    this.toy.getEducational();
    return this;
  }
  build(): IdentifiableToy {
    if (!this.id || !this.toy) {
      throw new Error("Missing required properties");
    }
    return new IdentifiableToy(
      this.id,
      this.toy.getType(),
      this.toy.getAgeGroup(),
      this.toy.getBrand(),
      this.toy.getMaterial(),
      this.toy.getBatteryRequired(),
      this.toy.getEducational(),
    );
  }
}