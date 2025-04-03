import { IIdentifiableItem, IItem, ItemCategory } from "./IItem";
import { id } from "../repository/IRepository";

export class Clothing implements IItem {
    constructor(
        private clothingType: string,
        private size: string,
        private color: string,
        private material: string,
        private pattern: string,
        private brand: string,
        private gender: string,
        private packaging: string,
        private specialRequest: string,
    ) { }

    getCategory(): ItemCategory {
        return ItemCategory.CLOTHING;
    }

    getClothingType(): string {
        return this.clothingType;
    }

    getSize(): string {
        return this.size;
    }

    getColor(): string {
        return this.color;
    }

    getMaterial(): string {
        return this.material;
    }

    getPattern(): string {
        return this.pattern;
    }

    getBrand(): string {
        return this.brand;
    }

    getGender(): string {
        return this.gender;
    }

    getPackaging(): string {
        return this.packaging;
    }

    getSpecialRequest(): string {
        return this.specialRequest;
    }
}
export class IdentifiableClothing extends Clothing implements IIdentifiableItem {
    constructor(
        private id: id,
        clothingType: string,
        size: string,
        color: string,
        material: string,
        pattern: string,
        brand: string,
        gender: string,
        packaging: string,
        specialRequest: string,
    ) {
        super(
            clothingType,
            size,
            color,
            material,
            pattern,
            brand,
            gender,
            packaging,
            specialRequest,
        );
    }

    getId(): string {
        return this.id;
    }
}