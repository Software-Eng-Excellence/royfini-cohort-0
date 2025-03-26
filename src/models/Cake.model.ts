import { IIdentifiableItem, IItem, ItemCategory } from "./IItem";
import { id } from "../repository/IRepository";

export class Cake implements IItem {
  constructor(
    private type: string,
    private flavor: string,
    private filling: string,
    private size: number,
    private layers: number,
    private frostingType: string,
    private frostingFlavor: string,
    private decorationType: string,
    private decorationColor: string,
    private customMessage: string,
    private shape: string,
    private allergies: string,
    private specialIngredients: string,
    private packagingType: string
  ) {}

  getCategory(): ItemCategory {
    return ItemCategory.CAKE;
  }

  getType(): string {
    return this.type;
  }

  getFlavor(): string {
    return this.flavor;
  }

  getFilling(): string {
    return this.filling;
  }

  getSize(): number {
    return this.size;
  }

  getLayers(): number {
    return this.layers;
  }

  getFrostingType(): string {
    return this.frostingType;
  }

  getFrostingFlavor(): string {
    return this.frostingFlavor;
  }

  getDecorationType(): string {
    return this.decorationType;
  }

  getDecorationColor(): string {
    return this.decorationColor;
  }

  getCustomMessage(): string {
    return this.customMessage;
  }

  getShape(): string {
    return this.shape;
  }

  getAllergies(): string {
    return this.allergies;
  }

  getSpecialIngredients(): string {
    return this.specialIngredients;
  }

  getPackagingType(): string {
    return this.packagingType;
  }
}

export class IdentifiableCake extends Cake implements IIdentifiableItem {
  constructor(
    private id: id,
    type: string,
    flavor: string,
    filling: string,
    size: number,
    layers: number,
    frostingType: string,
    frostingFlavor: string,
    decorationType: string,
    decorationColor: string,
    customMessage: string,
    shape: string,
    allergies: string,
    specialIngredients: string,
    packagingType: string
  ) {
    super(
      type,
      flavor,
      filling,
      size,
      layers,
      frostingType,
      frostingFlavor,
      decorationType,
      decorationColor,
      customMessage,
      shape,
      allergies,
      specialIngredients,
      packagingType
    );
  }

  getId(): string {
    return this.id;
  }
}
