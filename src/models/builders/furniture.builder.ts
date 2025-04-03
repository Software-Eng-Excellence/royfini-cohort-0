import { Furniture, IdentifiableFurniture } from "../Furniture.model";

export class FurnitureBuilder {
  private type!: string;
  private material!: string;
  private color!: string;
  private size!: string;
  private style!: string;
  private assemblyRequired!: string;
  private warranty!: string;

  public static newBuilder(): FurnitureBuilder {
    return new FurnitureBuilder();
  }

  setType(type: string): this {
    this.type = type;
    return this;
  }

  setMaterial(material: string): this {
    this.material = material;
    return this;
  }

  setColor(color: string): this {
    this.color = color;
    return this;
  }

  setSize(size: string): this {
    this.size = size;
    return this;
  }

  setStyle(style: string): this {
    this.style = style;
    return this;
  }

  setAssemblyRequired(assemblyRequired: string): this {
    this.assemblyRequired = assemblyRequired;
    return this;
  }

  setWarranty(warranty: string): this {
    this.warranty = warranty;
    return this;
  }

  build(): Furniture {
    const requiredProperties = [
      this.type,
      this.material,
      this.color,
      this.size,
      this.style,
      this.assemblyRequired,
      this.warranty,
    ];

    if (
      requiredProperties.some(
        (prop) => prop === undefined || prop === null || prop === ""
      )
    ) {
      console.error("Missing required properties, could not build Furniture");
      throw new Error("Missing required properties");
    }

    return new Furniture(
      this.type,
      this.material,
      this.color,
      this.size,
      this.style,
      this.assemblyRequired,
      this.warranty
    );
  }
}
export class IdentifiableFurnitureBuilder {
  private id!: string;
  private furniture!: Furniture;

  static newBuilder(): IdentifiableFurnitureBuilder {
    return new IdentifiableFurnitureBuilder();
  }

  setId(id: string): IdentifiableFurnitureBuilder {
    this.id = id;
    return this;
  }
  setFurniture(furniture: Furniture): IdentifiableFurnitureBuilder {
    this.furniture = furniture;
    this.furniture.getType();
    this.furniture.getMaterial();
    this.furniture.getColor();
    this.furniture.getSize();
    this.furniture.getStyle();
    this.furniture.getAssemblyRequired();
    this.furniture.getWarranty();
    return this;
  }
  build(): IdentifiableFurniture {
    if (!this.id || !this.furniture) {
      throw new Error("Missing required properties");
    }
    return new IdentifiableFurniture(
      this.id,
      this.furniture.getType(),
      this.furniture.getMaterial(),
      this.furniture.getColor(),
      this.furniture.getSize(),
      this.furniture.getStyle(),
      this.furniture.getAssemblyRequired(),
      this.furniture.getWarranty(),
    );
  }
}
