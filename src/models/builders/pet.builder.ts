import { IdentifiablePet, Pet } from "../Pet.model";

export class PetBuilder {
  private productType!: string;
  private petType!: string;
  private brand!: string;
  private size!: string;
  private flavor!: string;
  private ecoFriendly!: string;

  public static newBuilder(): PetBuilder {
    return new PetBuilder();
  }

  setProductType(productType: string): this {
    this.productType = productType;
    return this;
  }

  setPetType(petType: string): this {
    this.petType = petType;
    return this;
  }

  setBrand(brand: string): this {
    this.brand = brand;
    return this;
  }

  setSize(size: string): this {
    this.size = size;
    return this;
  }

  setFlavor(flavor: string): this {
    this.flavor = flavor;
    return this;
  }

  setEcoFriendly(ecoFriendly: string): this {
    this.ecoFriendly = ecoFriendly;
    return this;
  }

  build(): Pet {
    const requiredProperties = [
      this.productType,
      this.petType,
      this.brand,
      this.size,
      this.flavor,
      this.ecoFriendly,
    ];

    if (
      requiredProperties.some(
        (prop) => prop === undefined || prop === null || prop === ""
      )
    ) {
      console.error("Missing required properties, could not build Pet");
      throw new Error("Missing required properties");
    }

    return new Pet(
      this.productType,
      this.petType,
      this.brand,
      this.size,
      this.flavor,
      this.ecoFriendly
    );
  }
}
export class IdentifiablePetBuilder {
  private id!: string;
  private pet!: Pet;

  static newBuilder(): IdentifiablePetBuilder {
    return new IdentifiablePetBuilder();
  }

  setId(id: string): IdentifiablePetBuilder {
    this.id = id;
    return this;
  }
  setPet(pet: Pet): IdentifiablePetBuilder {
    this.pet = pet;
    this.pet.getPetType();
    this.pet.getSize();
    this.pet.getEcoFriendly();
    this.pet.getFlavor();
    this.pet.getBrand();
    this.pet.getProductType();
    return this;
  }
  build(): IdentifiablePet {
    if (!this.id || !this.pet) {
      throw new Error("Missing required properties");
    }
    return new IdentifiablePet(
      this.id,
      this.pet.getProductType(),
      this.pet.getPetType(),
      this.pet.getBrand(),
      this.pet.getSize(),
      this.pet.getFlavor(),
      this.pet.getEcoFriendly()
    );
  }
}
