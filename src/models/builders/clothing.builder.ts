import { Clothing, IdentifiableClothing } from "../Clothing.model";

export class ClothingBuilder {
  private clothingType!: string;
  private size!: string;
  private color!: string;
  private material!: string;
  private pattern!: string;
  private brand!: string;
  private gender!: string;
  private packaging!: string;
  private specialRequest!: string;

  public static newBuilder(): ClothingBuilder {
    return new ClothingBuilder();
  }

  setClothingType(clothingType: string): this {
    this.clothingType = clothingType;
    return this;
  }

  setSize(size: string): this {
    this.size = size;
    return this;
  }

  setColor(color: string): this {
    this.color = color;
    return this;
  }

  setMaterial(material: string): this {
    this.material = material;
    return this;
  }

  setPattern(pattern: string): this {
    this.pattern = pattern;
    return this;
  }

  setBrand(brand: string): this {
    this.brand = brand;
    return this;
  }

  setGender(gender: string): this {
    this.gender = gender;
    return this;
  }

  setPackaging(packaging: string): this {
    this.packaging = packaging;
    return this;
  }

  setSpecialRequest(specialRequest: string): this {
    this.specialRequest = specialRequest;
    return this;
  }

  build(): Clothing {
    const requiredProperties = [
      this.clothingType,
      this.size,
      this.color,
      this.material,
      this.pattern,
      this.brand,
      this.gender,
      this.packaging,
      this.specialRequest,
    ];
    console.log(requiredProperties)
    if (
      requiredProperties.some(
        (prop) => prop === undefined || prop === null || prop === ""
      )
    ) {
      console.error("Missing required properties, could not build Clothing");
      throw new Error("Missing required properties");
    }

    return new Clothing(
      this.clothingType,
      this.size,
      this.color,
      this.material,
      this.pattern,
      this.brand,
      this.gender,
      this.packaging,
      this.specialRequest
    );
  }
}
export class IdentifiableClothingBuilder {
  private id!: string;
  private clothing!: Clothing;

  static newBuilder(): IdentifiableClothingBuilder {
    return new IdentifiableClothingBuilder();
  }

  setId(id: string): IdentifiableClothingBuilder {
    this.id = id;
    return this;
  }
  setClothing(clothing: Clothing): IdentifiableClothingBuilder {
    this.clothing = clothing;
    this.clothing.getClothingType();
    this.clothing.getSize();
    this.clothing.getColor();
    this.clothing.getMaterial();
    this.clothing.getPattern();
    this.clothing.getBrand();
    this.clothing.getGender();
    this.clothing.getPackaging();
    this.clothing.getSpecialRequest();
    return this;
  }
  build(): IdentifiableClothing {
    if (!this.id || !this.clothing) {
      throw new Error("Missing required properties");
    }
    return new IdentifiableClothing(
      this.id,
      this.clothing.getClothingType(),
      this.clothing.getSize(),
      this.clothing.getColor(),
      this.clothing.getMaterial(),
      this.clothing.getPattern(),
      this.clothing.getBrand(),
      this.clothing.getGender(),
      this.clothing.getPackaging(),
      this.clothing.getSpecialRequest(),
    );
  }
}
